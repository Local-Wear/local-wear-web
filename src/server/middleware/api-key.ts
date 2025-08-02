import { Context, Next } from 'hono';
import { sendApiResponse } from '../common/api-response';

const API_KEY = process.env.API_KEY;
const API_KEY_HEADER = 'x-api-key';

if (!API_KEY) {
  throw new Error('API_KEY environment variable is not set');
}

const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 100;

export const apiKeyMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header(API_KEY_HEADER);
  const clientIp = c.req.header('x-forwarded-for') || 'unknown';

  if (!apiKey) {
    return sendApiResponse(c, 401, 'API key is required');
  }

  if (apiKey !== API_KEY) {
    return sendApiResponse(c, 401, 'Invalid API key');
  }

  const now = Date.now();
  const clientRateLimit = rateLimit.get(clientIp);

  if (clientRateLimit) {
    if (now > clientRateLimit.resetTime) {
      rateLimit.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else if (clientRateLimit.count >= MAX_REQUESTS) {
      return sendApiResponse(
        c,
        429,
        'Too many requests. Please try again later.',
      );
    } else {
      clientRateLimit.count++;
      rateLimit.set(clientIp, clientRateLimit);
    }
  } else {
    rateLimit.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  await next();
};
