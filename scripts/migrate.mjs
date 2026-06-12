/**
 * Migration Runner — runs all SQL files in db/migrations/ in order.
 * Usage: node scripts/migrate.mjs
 *
 * Uses pg (node-postgres) for raw multi-statement execution which neon's
 * serverless driver doesn't support in scripts.
 */
import pg from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const { Client } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Load env vars
config({ path: join(root, '.env') });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌  DATABASE_URL is not set in .env');
  process.exit(1);
}

async function runMigration(client, filePath, label) {
  console.log(`\n▶  Running: ${label}`);
  const content = readFileSync(filePath, 'utf-8');

  try {
    // pg client can handle multi-statement strings!
    await client.query(content);
    console.log(`   ✓  Successfully applied.`);
  } catch (err) {
    const msg = err.message ?? '';
    console.error(`   ✗  FAILED:`);
    console.error(`      Error: ${msg}`);
  }
}

async function main() {
  const migrationsDir = join(root, 'db', 'migrations');

  const files = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort(); // alphabetical → chronological (001_, 002_, …)

  const host = DATABASE_URL.match(/@([^/]+)\//)?.[1] ?? 'Neon DB';
  console.log(`\n🚀  Neon Migration Runner`);
  console.log(`   Host:  ${host}`);
  console.log(`   Files: ${files.join(', ')}\n`);

  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  console.log('   ✓  Connected to Neon\n');

  for (const file of files) {
    await runMigration(client, join(migrationsDir, file), file);
  }

  await client.end();
  console.log('\n✅  All migrations complete.\n');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
