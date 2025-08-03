export interface IHealthService {
  ping(requestId: string): Promise<PingResponse>;
  getHealthCheck(requestId: string): Promise<SystemHealthResponse>;
  checkReadiness(requestId: string): Promise<ReadinessResponse>;
  checkLiveness(requestId: string): Promise<LivenessResponse>;
}

export interface PingResponse {
  message: string;
  timestamp: string;
  requestId: string;
}

export interface SystemHealthResponse {
  status: 'healthy' | 'unhealthy';
  uptime: string;
  memory: {
    used: string;
    total: string;
  };
  environment: string;
  timestamp: string;
  requestId: string;
}

export interface ReadinessResponse {
  ready: boolean;
  timestamp: string;
  requestId: string;
}

export interface LivenessResponse {
  alive: boolean;
  timestamp: string;
  requestId: string;
}