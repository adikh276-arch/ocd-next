const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const connectionString = process.env.DATABASE_URL;
const sql = neon(connectionString);

async function init() {
  console.log('--- Starting Fresh DB Initialization ---');
  const sqlFilePath = path.join(__dirname, 'init-fresh-db.sql');
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

  // Split by semicolon, but be careful with functions/triggers if any (none here yet)
  const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0);

  for (const statement of statements) {
    try {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await sql(statement);
    } catch (err) {
      console.error('Error executing statement:', err.message);
      // Continue on "already exists" errors if schema was partially created
      if (!err.message.includes('already exists')) {
        process.exit(1);
      }
    }
  }

  console.log('--- Fresh DB Initialization Completed Successfully ---');
}

init().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
