const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function test() {
  try {
    const user_id = "test-user-123";
    const meta = { table: 'clutter_journal.clutter_entries' };
    
    // Exact code from api/logs/route.ts GET method
    const results = await sql(`SELECT * FROM ${meta.table} WHERE user_id = $1 ORDER BY id DESC LIMIT 100`, user_id);
    console.log("Success:", results.length);
  } catch(e) {
    console.error("Failed:", e.message);
  }
}

test();
