// config.ts
import { ServiceConfig } from '../constants/types.js';

export const services: ServiceConfig[] = [
    {
        name: 'Auth_services',
        healthUrl: process.env.AUTH_SERVICE_HEALTH_URL,
        componentId: 'wk5yl37psrk1'
    },
    {
        name: 'Docugenerator',
        healthUrl: process.env.DOCUGENERATOR_SERVICE_HEALTH_URL,
        componentId: 'km7jgf3gdy2p' 
    },
    {
        name: 'McpServer',
        healthUrl: process.env.MCP_SERVER_HEALTH_URL,
        componentId: 'byyfxryjm2g7'
    }
];