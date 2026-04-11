export function validate(config: Record<string, unknown>) {
  const required = [
    'DATABASE_URL',
    'FRONTEND_URL',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'PGADMIN_DEFAULT_EMAIL',
    'PGADMIN_DEFAULT_PASSWORD',
  ];

  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  console.log(config.DATABASE_URL);

  return {
    ...config,
  };
}
