const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function test() {
  try {
    const user_id = "test-user-123";
    await sql`
        INSERT INTO core.users (id, created_at, updated_at)
        VALUES (${user_id}, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
    `;

    const columns = ['category', 'item_description', 'user_id'];
    const values = ['Books', 'A heavy book', user_id];
    
    const query = `INSERT INTO clutter_journal.clutter_entries (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
    console.log("Query:", query);
    console.log("Values:", values);

    const result = await sql(query, values);
    console.log("Success:", result);
  } catch(e) {
    console.error("Failed:", e);
  }
}

test();
