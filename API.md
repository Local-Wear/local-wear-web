# Local Wear API Documentation

## Overview

The Local Wear API is built with Hono.js and Next.js, providing a robust and scalable backend service. All endpoints require API key authentication and return standardized JSON responses.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All API endpoints require authentication via API key in the request header:

```http
X-API-Key: your-api-key-here
```

### Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Window**: 60 seconds
- **Response**: 429 Too Many Requests when exceeded

## Response Format

All API responses follow a standardized format:

```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "uuid-v4-request-id"
}
```

### Response Headers

- `X-Request-ID`: Unique identifier for request tracing
- `X-Response-Time`: Request processing time in milliseconds
- `X-Content-Type-Options`: nosniff
- `X-Frame-Options`: DENY
- `X-XSS-Protection`: 1; mode=block
- `Strict-Transport-Security`: max-age=31536000; includeSubDomains

## Health Check Endpoints

### 1. Basic Ping

**Endpoint**: `GET /api/ping`

**Description**: Simple health check endpoint that returns a basic "pong" response.

**Request**:
```http
GET /api/ping
X-API-Key: your-api-key
```

**Response**:
```json
{
  "statusCode": 200,
  "message": "Service is healthy",
  "data": {
    "message": "Pong!",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 2. Detailed Health Check

**Endpoint**: `GET /api/health`

**Description**: Comprehensive health check with system information including uptime, memory usage, and environment details.

**Request**:
```http
GET /api/health
X-API-Key: your-api-key
```

**Response**:
```json
{
  "statusCode": 200,
  "message": "Health check completed",
  "data": {
    "status": "healthy",
    "uptime": "3600s",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "memory": {
      "used": "45MB",
      "total": "128MB"
    },
    "environment": "development"
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 3. Readiness Probe

**Endpoint**: `GET /api/ready`

**Description**: Kubernetes/Docker readiness probe endpoint. Indicates if the service is ready to receive traffic.

**Request**:
```http
GET /api/ready
X-API-Key: your-api-key
```

**Response**:
```json
{
  "statusCode": 200,
  "message": "Service is ready",
  "data": {
    "ready": true,
    "timestamp": "2024-01-01T12:00:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 4. Liveness Probe

**Endpoint**: `GET /api/live`

**Description**: Kubernetes/Docker liveness probe endpoint. Indicates if the service is alive and functioning.

**Request**:
```http
GET /api/live
X-API-Key: your-api-key
```

**Response**:
```json
{
  "statusCode": 200,
  "message": "Service is alive",
  "data": {
    "alive": true,
    "timestamp": "2024-01-01T12:00:00.000Z",
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Error Responses

### 401 Unauthorized

**Scenario**: Missing or invalid API key

```json
{
  "statusCode": 401,
  "message": "API key is required",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 429 Too Many Requests

**Scenario**: Rate limit exceeded

```json
{
  "statusCode": 429,
  "message": "Too many requests. Please try again later.",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 500 Internal Server Error

**Scenario**: Server-side error

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Usage Examples

### cURL Examples

```bash
# Basic ping
curl -H "X-API-Key: your-api-key" http://localhost:3000/api/ping

# Health check
curl -H "X-API-Key: your-api-key" http://localhost:3000/api/health

# Readiness probe
curl -H "X-API-Key: your-api-key" http://localhost:3000/api/ready

# Liveness probe
curl -H "X-API-Key: your-api-key" http://localhost:3000/api/live
```

### JavaScript/TypeScript Examples

```typescript
const API_KEY = 'your-api-key';
const BASE_URL = 'http://localhost:3000/api';

const headers = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json'
};

// Basic ping
const pingResponse = await fetch(`${BASE_URL}/ping`, { headers });
const pingData = await pingResponse.json();

// Health check
const healthResponse = await fetch(`${BASE_URL}/health`, { headers });
const healthData = await healthResponse.json();

// Readiness check
const readyResponse = await fetch(`${BASE_URL}/ready`, { headers });
const readyData = await readyResponse.json();

// Liveness check
const liveResponse = await fetch(`${BASE_URL}/live`, { headers });
const liveData = await liveResponse.json();
```

### Python Example

```python
import requests

API_KEY = 'your-api-key'
BASE_URL = 'http://localhost:3000/api'

headers = {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json'
}

# Health check
response = requests.get(f'{BASE_URL}/health', headers=headers)
data = response.json()
print(f"Status: {data['data']['status']}")
print(f"Uptime: {data['data']['uptime']}")
```

## Monitoring and Observability

### Request Tracing

Each request includes a unique `requestId` that can be used for:
- Log correlation
- Distributed tracing
- Debugging and troubleshooting

### Performance Metrics

Response headers include:
- `X-Response-Time`: Processing time in milliseconds
- Memory usage information in health check responses
- Uptime tracking

### Container Orchestration

The API provides standard health check endpoints for:
- **Kubernetes**: Use `/api/ready` for readiness probes and `/api/live` for liveness probes
- **Docker**: Health check can use any of the ping endpoints
- **Load Balancers**: Use `/api/ping` for simple health checks

## Security Features

- API key authentication
- Rate limiting per IP address
- Security headers (HSTS, XSS protection, etc.)
- Request ID tracking for audit trails
- CORS protection
- Input validation and sanitization

## Development

### Environment Variables

```env
API_KEY=your-secret-api-key
NODE_ENV=development|production
```

### Architecture

The API follows a clean architecture pattern:
- **Controllers**: Business logic (`/src/server/controllers/`)
- **Routes**: HTTP routing (`/src/server/routes/`)
- **Middleware**: Cross-cutting concerns (`/src/server/middleware/`)
- **Common**: Shared utilities (`/src/server/common/`)

---

*Last updated: 2024*
*API Version: 1.0.0*