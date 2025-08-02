import { createApp } from '@/server/factory';
import { apiKeyMiddleware } from '@/server/middleware/api-key';
import { createHealthRoutes } from '@/server/routes/health.routes';
import { handle } from 'hono/vercel';
export const runtime = 'nodejs';

const app = createApp().basePath('/api');
app.use('*', apiKeyMiddleware);

// Register health routes
createHealthRoutes(app);


export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);
