import { Hono } from 'hono';
import { HealthController } from '../controllers/health.controller';
import type { Variables, Bindings } from '../factory';

type HonoApp = Hono<{ Variables: Variables; Bindings: Bindings }>;

export const createHealthRoutes = (app: HonoApp) => {
  // Basic ping endpoint
  app.get('/ping', HealthController.ping);
  
  // Detailed health check
  app.get('/health', HealthController.healthCheck);
  
  // Kubernetes/Docker readiness probe
  app.get('/ready', HealthController.ready);
  
  // Kubernetes/Docker liveness probe
  app.get('/live', HealthController.live);
  
  return app;
};