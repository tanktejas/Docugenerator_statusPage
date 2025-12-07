// statusPageClient.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { ServiceStatus } from '../constants/types.js';
import { APP_CONSTANTS } from '../constants/appConstants.js';

dotenv.config();

const API_KEY = process.env.STATUSPAGE_API_KEY;
const PAGE_ID = process.env.STATUSPAGE_PAGE_ID;
const BASE_URL = `${APP_CONSTANTS.STATUS_PAGE_API_URL}/${PAGE_ID}`;

export const updateComponentStatus = async (
    componentId: string, 
    status: ServiceStatus,
    serviceName: string
) => {
    try {
        const url = `${BASE_URL}/components/${componentId}`;
        
        await axios.patch(
            url,
            {
                component: {
                    status: status,
                },
            },
            {
                headers: {
                    'Authorization': `OAuth ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`[StatusPage] Updated ${serviceName} to ${status}`);
    } catch (error: any) {
        console.error(`[Error] Failed to update Statuspage for ${serviceName}:`, error.message);
    }
};