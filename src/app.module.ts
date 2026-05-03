import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import rabbitmqConfig from './config/rabbitmq.config';
import { validate } from './config/env.validate';
import { StoryModule } from './story/story.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import cloudinaryConfig from './config/cloudinary.config';
import eurekaConfig from './config/eureka.config';
import { EurekaModule } from './utils/discovery/eureka.module';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        dbConfig,
        rabbitmqConfig,
        cloudinaryConfig,
        eurekaConfig,
      ],
      cache: true,
      validate,
    }),

    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.getOrThrow<string>('rabbitmq.uri'),
        };
      },
    }),
    EurekaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [eurekaConfig.KEY],
      useFactory: (config: ConfigType<typeof eurekaConfig>) => ({
        instance: {
          app: config.serviceName,
          hostName: config.instanceHost,
          ipAddr: config.instanceIp,
          port: {
            $: 3000,
            '@enabled': 'true',
          },
        },
        eureka: {
          host: config.host,
          port: config.port,
          servicePath: '/eureka/apps/',
          maxRetries: 10,
          requestRetryDelay: 2000,
        },
      }),
    }),
    StoryModule,
  ],
})
export class AppModule {}
