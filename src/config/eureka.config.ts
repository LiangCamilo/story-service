import { registerAs } from '@nestjs/config';

export default registerAs('eureka', () => ({
  host: process.env.EUREKA_HOST || 'localhost',
  port: parseInt(process.env.EUREKA_PORT || '8761', 10),
  instanceHost: process.env.EUREKA_INSTANCE_HOSTNAME || 'localhost',
  instanceIp: process.env.EUREKA_INSTANCE_IP || '127.0.0.1',
  serviceName: process.env.EUREKA_SERVICE_NAME || 'STORY-SERVICE',
}));
