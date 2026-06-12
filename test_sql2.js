const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function test() {
  try {
    const res2 = await sql('SELECT 1 as num WHERE 1 = $1 AND 2 = $2', 1, 2);
    console.log("Spread version:", res2);
  } catch(e) {
    console.log("Spread version failed:", e.message);
  }
}

test();
