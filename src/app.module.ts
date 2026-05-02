import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { validate } from './config/env.validate';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      cache: true,
      validate,
    }),
    StoryModule,
  ],
})
export class AppModule {}
