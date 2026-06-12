const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

const statements = [
  // Core schemas
  `CREATE SCHEMA IF NOT EXISTS core`,
  `CREATE TABLE IF NOT EXISTS core.users (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS core.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_slug TEXT NOT NULL,
    user_id TEXT REFERENCES core.users(id) ON DELETE SET NULL,
    payload JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,

  // 42 App Schemas
  `CREATE SCHEMA IF NOT EXISTS daily_life`,
  `CREATE SCHEMA IF NOT EXISTS thought_diffusion`,
  `CREATE SCHEMA IF NOT EXISTS uncertainity_acceptance`,
  `CREATE SCHEMA IF NOT EXISTS reassurance_resistance`,
  `CREATE SCHEMA IF NOT EXISTS daily_focus`,
  `CREATE SCHEMA IF NOT EXISTS ocd_moments`,
  `CREATE SCHEMA IF NOT EXISTS clutter_journal`,
  `CREATE SCHEMA IF NOT EXISTS confidence_tracker`,
  `CREATE SCHEMA IF NOT EXISTS mood_tracker`,
  `CREATE SCHEMA IF NOT EXISTS fear_ladder`,
  `CREATE SCHEMA IF NOT EXISTS gratitude_logs`,
  `CREATE SCHEMA IF NOT EXISTS trigger_map`,
  `CREATE SCHEMA IF NOT EXISTS ritual_cost`,
  `CREATE SCHEMA IF NOT EXISTS reframe_thoughts`,
  `CREATE SCHEMA IF NOT EXISTS letter_to_ocd`,
  `CREATE SCHEMA IF NOT EXISTS urge_surfing`,

  // Activity Specific Tables
  `CREATE TABLE IF NOT EXISTS daily_life.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    work_score INTEGER,
    social_score INTEGER,
    sleep_score INTEGER,
    selfcare_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS thought_diffusion.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    guided_thought TEXT,
    guided_rewrite TEXT,
    own_thought TEXT,
    own_rewrite TEXT,
    feeling TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS uncertainity_acceptance.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    doubt_text TEXT,
    statement_text TEXT,
    reflection_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS reassurance_resistance.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    worry_text TEXT,
    reassurance_urge_type TEXT,
    timer_duration INTEGER,
    mood_emoji TEXT,
    reflection_note TEXT,
    next_time_goal TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS daily_focus.performance_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    execution_score INTEGER,
    mental_clarity INTEGER,
    priority_completed BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS ocd_moments.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    location TEXT,
    urge TEXT,
    response TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS clutter_journal.clutter_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    category TEXT,
    item_description TEXT,
    emotion_score INTEGER,
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS confidence_tracker.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    confidence_score INTEGER,
    decisiveness_score INTEGER,
    created_at BIGINT,
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS mood_tracker.mood_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    mood TEXT,
    mood_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS fear_ladder.ladder_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    fear_item TEXT,
    suds_score INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS gratitude_logs.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    entry_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS trigger_map.triggers (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    trigger_text TEXT,
    intensity INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS ritual_cost.rituals (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    ritual_name TEXT,
    time_spent INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS reframe_thoughts.thought_records (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    automatic_thought TEXT,
    reframed_thought TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS letter_to_ocd.letters (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS urge_surfing.sessions (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    urge_description TEXT,
    peak_intensity INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`
];

async function run() {
  console.log("🚀 Rebuilding complete OCD Suite Historical Schemas...\n");
  let ok = 0, fail = 0;
  for (const stmt of statements) {
    try {
      await sql(stmt);
      ok++;
      process.stdout.write("✓ ");
    } catch(e) {
      fail++;
      console.error(`\nFAIL: ${e.message.split("\n")[0]}`);
    }
  }
  console.log(`\n\n✅ Done: ${ok} created, ${fail} failed`);
}
run();
