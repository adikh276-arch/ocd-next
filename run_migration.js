const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'postgresql://neondb_owner:npg_HlQU8XwRAi7v@ep-soft-wave-am2apflj-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function runMigration() {
  const sql = neon(DATABASE_URL);
  const migrationPath = path.join(__dirname, 'db', 'migrations', '001_initial_merge.sql');
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');

  // Split by semicolon, but be careful with functions/strings. 
  // For this simple script, splitting by semicolon on new lines is safe.
  const statements = migrationSql.split(';').map(s => s.trim()).filter(s => s.length > 0);

  console.log(`Applying ${statements.length} SQL statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    try {
      await sql(statements[i]);
      // console.log(`Statement ${i + 1} SUCCESS`);
    } catch (err) {
      console.error(`FAILURE on Statement ${i + 1}:`, err.message);
      console.error('SQL:', statements[i]);
      // Continue or break? For schemas, we usually want to continue.
    }
  }
  console.log('Migration process finished.');
}

runMigration();
