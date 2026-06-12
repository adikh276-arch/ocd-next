const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.group("🚀 Final Database Consolidation (Corrected)");
  try {
    // 1. Merge Users
    console.log(" - Merging users from public to core...");
    await sql(`
      INSERT INTO core.users (id, created_at, updated_at)
      SELECT id, created_at, updated_at 
      FROM public.users
      ON CONFLICT (id) DO UPDATE SET
        updated_at = NOW();
    `);

    // 2. Merge Logs
    console.log(" - Merging activity logs from public to core...");
    await sql(`
      INSERT INTO core.user_activity_logs (id, activity_slug, user_id, payload, created_at)
      SELECT id, activity_slug, user_id, payload, created_at 
      FROM public.user_activity_logs
      ON CONFLICT (id) DO NOTHING;
    `);

    // 3. DROP redundant public tables to eliminate console ambiguity
    console.log(" - Dropping redundant public tables...");
    await sql(`DROP TABLE IF EXISTS public.user_activity_logs CASCADE;`);
    await sql(`DROP TABLE IF EXISTS public.users CASCADE;`);

    console.log("✅ Consolidation Successful!");
  } catch (e) {
    console.error("❌ Migration Failed:", e);
    process.exit(1);
  }
  console.groupEnd();
}
migrate();
