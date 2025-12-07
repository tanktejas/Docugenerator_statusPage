// index.ts
import dotenv from 'dotenv';
import { runHealthChecks } from './helper/monitor.js';

dotenv.config();

const INTERVAL = parseInt(process.env.CHECK_INTERVAL_SECONDS || '60', 10) * 1000;

console.log(`Starting Status Monitor Server. Checking every ${INTERVAL / 1000} seconds...`);

// Run immediately on start
runHealthChecks();

// Schedule repeated checks
setInterval(() => {
    runHealthChecks();
}, INTERVAL);