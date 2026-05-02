import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => {
  const host = process.env.AMQP_HOST;
  const port = process.env.AMQP_PORT;
  const username = process.env.AMQP_USERNAME;
  const password = process.env.AMQP_PASSWORD;

  return {
    uri: `amqp://${username}:${password}@${host}:${port}`,
  };
});
