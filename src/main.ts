import { NestFactory } from '@nestjs/core';
import { StoryModule } from './story.module.js';

async function bootstrap() {
  const app = await NestFactory.create(StoryModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
