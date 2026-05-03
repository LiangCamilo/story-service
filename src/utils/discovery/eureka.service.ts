import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
  INestApplication,
} from '@nestjs/common';
import { AddressInfo } from 'net';
import { EUREKA_MODULE_OPTIONS } from './eureka.constants';
import type { EurekaModuleOptions } from './eureka.interfaces';

const { Eureka } = require('eureka-js-client');

export interface EurekaRegisterOptions {
  port: number;
  hostName?: string;
  ipAddr?: string;
  statusPageUrl?: string;
  healthCheckUrl?: string;
  homePageUrl?: string;
}

@Injectable()
export class EurekaService implements OnApplicationShutdown {
  private readonly logger = new Logger(EurekaService.name);
  private client: any | null = null;
  private started = false;

  constructor(
    @Inject(EUREKA_MODULE_OPTIONS)
    private readonly options: EurekaModuleOptions,
  ) {}

  async register(runtime: EurekaRegisterOptions): Promise<void> {
    if (this.started) {
      this.logger.warn('Eureka client already started');
      return;
    }

    const instance = this.buildInstance(runtime);

    this.client = new Eureka({
      instance,
      eureka: this.options.eureka,
    });

    await new Promise<void>((resolve, reject) => {
      this.client.start((error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });

    this.started = true;
    this.logger.log(
      `Registered in Eureka: ${instance.app} on ${instance.hostName}:${runtime.port}`,
    );
  }

  async registerNestApp(
    app: INestApplication,
    overrides?: Omit<EurekaRegisterOptions, 'port'>,
  ): Promise<void> {
    const address = app.getHttpServer().address() as
      | AddressInfo
      | string
      | null;

    if (!address) {
      throw new Error(
        'Could not determine bound address. Make sure app.listen(...) was called before registering in Eureka.',
      );
    }

    if (typeof address === 'string') {
      throw new Error(
        'Unix socket addresses are not supported for Eureka registration.',
      );
    }

    const port = address.port;

    await this.register({
      port,
      hostName: overrides?.hostName,
      ipAddr: overrides?.ipAddr,
      statusPageUrl: overrides?.statusPageUrl,
      healthCheckUrl: overrides?.healthCheckUrl,
      homePageUrl: overrides?.homePageUrl,
    });
  }

  async stop(): Promise<void> {
    if (!this.client || !this.started) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      this.client.stop((error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });

    this.client = null;
    this.started = false;
    this.logger.log('Deregistered from Eureka');
  }

  async onApplicationShutdown(): Promise<void> {
    try {
      await this.stop();
    } catch (error) {
      this.logger.error('Failed to deregister from Eureka on shutdown', error);
    }
  }

  getClient() {
    return this.client;
  }

  isStarted(): boolean {
    return this.started;
  }

  private buildInstance(runtime: EurekaRegisterOptions) {
    const baseInstance = this.options.instance;

    const hostName = runtime.hostName ?? baseInstance.hostName;
    const ipAddr = runtime.ipAddr ?? baseInstance.ipAddr;

    return {
      ...baseInstance,
      hostName,
      ipAddr,
      vipAddress: baseInstance.vipAddress ?? baseInstance.app,
      dataCenterInfo: baseInstance.dataCenterInfo ?? {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      port: {
        $: runtime.port,
        '@enabled': 'true',
      },
      statusPageUrl:
        runtime.statusPageUrl ??
        baseInstance.statusPageUrl ??
        `http://${hostName}:${runtime.port}/info`,
      healthCheckUrl:
        runtime.healthCheckUrl ??
        baseInstance.healthCheckUrl ??
        `http://${hostName}:${runtime.port}/health`,
      homePageUrl:
        runtime.homePageUrl ??
        baseInstance.homePageUrl ??
        `http://${hostName}:${runtime.port}`,
    };
  }
}
