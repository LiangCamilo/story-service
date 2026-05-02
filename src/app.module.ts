import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import rabbitmqConfig from './config/rabbitmq.config';
import { validate } from './config/env.validate';
import { StoryModule } from './story/story.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, rabbitmqConfig],
      cache: true,
      validate,
    }),
    RabbitMQModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('rabbitmq.url'),
        };
      },
    }),
    StoryModule,
  ],
})
export class AppModule {}
