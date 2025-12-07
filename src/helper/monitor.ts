// monitor.ts
import axios from 'axios';
import { services } from '../config/config.js';
import { updateComponentStatus } from './statusPageClient.js';
import { ServiceStatus } from '../constants/types.js';

// Store previous status to avoid spamming the API if nothing changed
const statusCache: Record<string, ServiceStatus> = {};

const checkServiceHealth = async (url: string): Promise<boolean> => {
    try {
        // We set a timeout of 5 seconds. If it takes longer, consider it down.
        const response = await axios.get(url, { timeout: 5000 });
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        return false;
    }
};

export const runHealthChecks = async () => {
    console.log('--- Starting Health Checks ---');
    
    for (const service of services) {
        const isHealthy = await checkServiceHealth(service.healthUrl);
        const newStatus: ServiceStatus = isHealthy ? 'operational' : 'major_outage';

        // Only make API call if status has changed
        if (statusCache[service.name] !== newStatus) {
            console.log(`[Monitor] Change detected for ${service.name}. Old: ${statusCache[service.name]}, New: ${newStatus}`);
            await updateComponentStatus(service.componentId, newStatus, service.name);
            statusCache[service.name] = newStatus;
        } else {
            console.log(`[Monitor] ${service.name} is still ${newStatus}. No update needed.`);
        }
    }
};