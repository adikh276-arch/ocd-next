import { neon, neonConfig } from '@neondatabase/serverless';

// Essential for serverless environments
neonConfig.fetchConnectionCache = true;

const connectionString = process.env.DATABASE_URL;

// Export the core SQL client, but guard against missing URL during build
export const sql = connectionString ? neon(connectionString) : ((..._args: any[]) => {
    console.warn("Neon SQL client called without DATABASE_URL. Returning empty array.");
    return Promise.resolve([]);
}) as any;

/**
 * A tagged-template helper that explicitly targets the core schema.
 * Uses native Neon tagged-template syntax — no regex manipulation.
 */
export const coreDb = sql;

export default sql;
