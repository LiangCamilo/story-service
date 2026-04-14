import { NestFactory } from '@nestjs/core';
import { StoryModule } from './story/story.module.js';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
