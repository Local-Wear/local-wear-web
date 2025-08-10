import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_KEY: z.string().min(1, 'API_KEY is required').optional(),
  DATABASE_URL: z.string().optional(),
  DB_HOST: z.string().optional(),
  DB_PORT: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_SSL: z.string().optional(),
  DB_MAX_CONNECTIONS: z.string().optional(),
  DB_IDLE_TIMEOUT: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

let cachedConfig: Readonly<Env> | null = null;

export const getConfig = (): Readonly<Env> => {
  if (cachedConfig) return cachedConfig;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // Do not throw at import time elsewhere; caller can decide
    console.error('Invalid environment variables', parsed.error.flatten());
    cachedConfig = {} as Env;
    return cachedConfig;
  }
  cachedConfig = Object.freeze(parsed.data);
  return cachedConfig;
};
