import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import rabbitmqConfig from './config/rabbitmq.config';
import { validate } from './config/env.validate';
import { StoryModule } from './story/story.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import cloudinaryConfig from './config/cloudinary.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, rabbitmqConfig, cloudinaryConfig],
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
    StoryModule,
  ],
})
export class AppModule {}
