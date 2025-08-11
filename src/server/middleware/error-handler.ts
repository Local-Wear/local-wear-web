import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { sendApiResponse } from '../common/api-response';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (err instanceof HTTPException) {
      return sendApiResponse(
        c,
        err.status as 400 | 401 | 403 | 404 | 429 | 500 | 200 | 201,
        err.message || 'Error'
      );
    }
    console.error('Unhandled error', err);
    return sendApiResponse(c, 500, 'Internal server error');
  }
};
