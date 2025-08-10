import { Hono } from 'hono';
import { sendSuccess } from '../common/api-response';
import { container } from '../container';
import { HealthController } from '../controllers/health.controller';
import type { Bindings, Variables } from '../factory';

type HonoApp = Hono<{ Variables: Variables; Bindings: Bindings }>;

export const createHealthRoutes = (app: HonoApp) => {
  // Resolve controller lazily per request to avoid initializing dependencies unnecessarily
  const getController = () => container.resolve(HealthController);

  app.get('/ping', c => {
    const requestId = c.get('requestId') || 'unknown';
    return sendSuccess(c, {
      message: 'Pong!',
      timestamp: new Date().toISOString(),
      requestId,
    });
  });
  app.get('/health', c => getController().healthCheck(c));
  app.get('/ready', c => getController().ready(c));
  app.get('/live', c => getController().live(c));

  return app;
};
