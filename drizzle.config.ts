import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const getDatabaseUrl = (): string => {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    return databaseUrl;
  }

  // Construct URL from individual environment variables
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const database = process.env.DB_NAME || 'local_wear';
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const ssl = process.env.DB_SSL === 'true' ? '?sslmode=require' : '';

  return `postgresql://${username}:${password}@${host}:${port}/${database}${ssl}`;
};

export default {
  schema: './src/server/database/schema.ts',
  out: './src/server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  verbose: true,
  strict: true,
} satisfies Config;