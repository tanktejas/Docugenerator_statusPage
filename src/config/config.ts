// config.ts
import { ServiceConfig } from '../constants/types.js';

export const services: ServiceConfig[] = [
    {
        name: 'Auth_services',
        healthUrl: 'http://localhost:3005/api/health',
        componentId: 'wk5yl37psrk1'
    },
    {
        name: 'Docugenerator',
        healthUrl: 'http://localhost:3004/api/health', 
        componentId: 'km7jgf3gdy2p' 
    },
    {
        name: 'McpServer',
        healthUrl: 'http://localhost:3000/health',
        componentId: 'byyfxryjm2g7'
    }
];