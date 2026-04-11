import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '3000'),
  frontendUrl: parseInt(process.env.FRONTEND_URL ?? 'http://localhost:5173'),
}));
