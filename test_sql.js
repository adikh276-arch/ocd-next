const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function test() {
  try {
    const res1 = await sql('SELECT 1 as num WHERE 1 = $1', [1]);
    console.log("Array version:", res1);
  } catch(e) {
    console.log("Array version failed:", e.message);
  }
}

test();
