'server only';

import { cors } from 'hono/cors';
import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';

export interface Variables {
  lang: string;
  requestId: string;
  startTime: number;
}

export interface Bindings {
  API_KEY: string;
  ENV: string;
}

export const HonoFactory = createFactory<{
  Variables: Variables;
  Bindings: Bindings;
}>();

export const createBaseApp = () => {
  const app = HonoFactory.createApp();

  app.use('*', logger());
  app.use('*', cors());
  app.use('*', secureHeaders());
  app.use('*', prettyJSON());

  app.use('*', async (c, next) => {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();

    c.set('requestId', requestId);
    c.set('startTime', startTime);

    c.header('X-Request-ID', requestId);

    await next();

    const duration = Date.now() - startTime;
    c.header('X-Response-Time', `${duration}ms`);
  });

  return app;
};

// Alias for backward compatibility and cleaner API
export const createApp = createBaseApp;
