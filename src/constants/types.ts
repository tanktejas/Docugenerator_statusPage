// types.ts
export type ServiceStatus = 'operational' | 'major_outage' | 'degraded_performance';

export interface ServiceConfig {
    name: string;
    healthUrl: string; // The URL to check (e.g., http://auth-service/health)
    componentId: string; // The specific ID from Statuspage for this service
}