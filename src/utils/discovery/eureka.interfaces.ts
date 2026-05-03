import { ModuleMetadata, Type } from '@nestjs/common';

export interface EurekaInstancePortObject {
  $: number;
  '@enabled': 'true' | 'false';
}

export interface EurekaInstanceConfig {
  app: string;
  hostName: string;
  ipAddr?: string;
  vipAddress?: string;
  statusPageUrl?: string;
  healthCheckUrl?: string;
  homePageUrl?: string;
  port: number | EurekaInstancePortObject;
  dataCenterInfo?: {
    name: string;
    '@class'?: string;
  };
  metadata?: Record<string, string>;
}

export interface EurekaServerConfig {
  host: string;
  port: number;
  servicePath?: string;
  maxRetries?: number;
  requestRetryDelay?: number;
  registryFetchInterval?: number;
  fetchRegistry?: boolean;
  registerWithEureka?: boolean;
  preferIpAddress?: boolean;
  requestMiddleware?: (
    requestOpts: any,
    done: (requestOpts: any) => void,
  ) => void;
}

export interface EurekaModuleOptions {
  instance: EurekaInstanceConfig;
  eureka: EurekaServerConfig;
}

export interface EurekaOptionsFactory {
  createEurekaOptions(): Promise<EurekaModuleOptions> | EurekaModuleOptions;
}

export interface EurekaModuleAsyncOptions extends Pick<
  ModuleMetadata,
  'imports'
> {
  useExisting?: Type<EurekaOptionsFactory>;
  useClass?: Type<EurekaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EurekaModuleOptions> | EurekaModuleOptions;
  inject?: any[];
}
