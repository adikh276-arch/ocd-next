const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function census() {
  try {
    const results = await sql(`
      SELECT table_schema, table_name, column_name 
      FROM information_schema.columns 
      WHERE table_name IN ('user_activity_logs', 'users')
      ORDER BY table_schema, table_name
    `);
    console.log(JSON.stringify(results, null, 2));
  } catch (e) {
    console.error(e);
  }
}
census();
