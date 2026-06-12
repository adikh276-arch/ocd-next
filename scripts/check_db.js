const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function check() {
  try {
    const results = await sql(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_name IN ('user_activity_logs', 'users')
    `);
    console.log(JSON.stringify(results, null, 2));
  } catch (e) {
    console.error(e);
  }
}
check();
