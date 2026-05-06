export function validate(config: Record<string, unknown>) {
  const required = [
    'DATABASE_URL',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'PGADMIN_DEFAULT_EMAIL',
    'PGADMIN_DEFAULT_PASSWORD',
    'AMQP_HOST',
    'AMQP_PORT',
    'AMQP_USERNAME',
    'AMQP_PASSWORD',
  ];

  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    ...config,
  };
}

