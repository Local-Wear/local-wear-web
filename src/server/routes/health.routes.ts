import { Hono } from 'hono';
import { getInstance } from '../container.config';
import { CONTROLLER_TOKENS } from '../common/tokens';
import type { IHealthController } from '../interfaces/health.interface';
import type { Variables, Bindings } from '../factory';

type HonoApp = Hono<{ Variables: Variables; Bindings: Bindings }>;

export const createHealthRoutes = (app: HonoApp) => {
  // Resolve controller from DI container using type-safe token
  const healthController = getInstance<IHealthController>(CONTROLLER_TOKENS.Health);
  
  // Basic ping endpoint
  app.get('/ping', (c) => healthController.ping(c));
  
  // Detailed health check
  app.get('/health', (c) => healthController.healthCheck(c));
  
  // Kubernetes/Docker readiness probe
  app.get('/ready', (c) => healthController.ready(c));
  
  // Kubernetes/Docker liveness probe
  app.get('/live', (c) => healthController.live(c));
  
  return app;
};