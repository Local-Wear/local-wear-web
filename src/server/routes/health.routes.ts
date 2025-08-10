import { Hono } from 'hono';
import { container } from '../container';
import { HealthController } from '../controllers/health.controller';
import type { Variables, Bindings } from '../factory';

type HonoApp = Hono<{ Variables: Variables; Bindings: Bindings }>;

export const createHealthRoutes = (app: HonoApp) => {
  // Resolve controller from DI container using type-safe token
  const healthController = container.resolve(HealthController);
  
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