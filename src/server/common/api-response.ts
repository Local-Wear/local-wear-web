import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';

type ApiStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 429 | 500;

export interface ApiResponse<T = unknown> {
  statusCode: ApiStatusCode;
  message: string;
  data?: T;
  timestamp: string;
  requestId: string;
}

export class ApiError extends HTTPException {
  constructor(status: ApiStatusCode, message: string) {
    super(status, { message });
  }
}

export const createApiResponse = <T>(
  c: Context,
  statusCode: ApiStatusCode,
  message: string,
  data?: T,
): ApiResponse<T> => ({
  statusCode,
  message,
  data,
  timestamp: new Date().toISOString(),
  requestId: c.get('requestId') || 'unknown',
});

export const sendApiResponse = <T>(
  c: Context,
  statusCode: ApiStatusCode,
  message: string,
  data?: T,
) => {
  const response = createApiResponse(c, statusCode, message, data);
  return c.json(response, statusCode as ContentfulStatusCode);
};

export const sendSuccess = <T>(c: Context, data: T, message = 'Success') =>
  sendApiResponse(c, 200, message, data);

export const sendCreated = <T>(
  c: Context,
  data: T,
  message = 'Resource created',
) => sendApiResponse(c, 201, message, data);

export const sendNoContent = (c: Context) => {
  c.status(204);
  return c.body(null);
};

export const sendBadRequest = (c: Context, message = 'Bad request') =>
  sendApiResponse(c, 400, message);

export const sendUnauthorized = (c: Context, message = 'Unauthorized') =>
  sendApiResponse(c, 401, message);

export const sendForbidden = (c: Context, message = 'Forbidden') =>
  sendApiResponse(c, 403, message);

export const sendNotFound = (c: Context, message = 'Not found') =>
  sendApiResponse(c, 404, message);

export const sendTooManyRequests = (
  c: Context,
  message = 'Too many requests',
) => sendApiResponse(c, 429, message);

export const sendInternalError = (
  c: Context,
  message = 'Internal server error',
) => sendApiResponse(c, 500, message);
