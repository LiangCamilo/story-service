import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { EUREKA_MODULE_OPTIONS } from './eureka.constants';
import {
  EurekaModuleAsyncOptions,
  EurekaModuleOptions,
  EurekaOptionsFactory,
} from './eureka.interfaces';
import { EurekaService } from './eureka.service';

@Module({})
export class EurekaModule {
  static forRoot(options: EurekaModuleOptions): DynamicModule {
    return {
      module: EurekaModule,
      providers: [
        {
          provide: EUREKA_MODULE_OPTIONS,
          useValue: options,
        },
        EurekaService,
      ],
      exports: [EurekaService],
    };
  }

  static forRootAsync(options: EurekaModuleAsyncOptions): DynamicModule {
    return {
      module: EurekaModule,
      imports: options.imports ?? [],
      providers: [...this.createAsyncProviders(options), EurekaService],
      exports: [EurekaService],
    };
  }

  private static createAsyncProviders(
    options: EurekaModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: EUREKA_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: EUREKA_MODULE_OPTIONS,
          useFactory: async (factory: EurekaOptionsFactory) =>
            await factory.createEurekaOptions(),
          inject: [options.useExisting],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
        {
          provide: EUREKA_MODULE_OPTIONS,
          useFactory: async (factory: EurekaOptionsFactory) =>
            await factory.createEurekaOptions(),
          inject: [options.useClass],
        },
      ];
    }

    throw new Error(
      'Invalid EurekaModuleAsyncOptions: useFactory, useClass or useExisting is required.',
    ); 
  }
}
