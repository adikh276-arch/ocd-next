const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

const statements = [
  // Core schema
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
  `CREATE INDEX IF NOT EXISTS idx_logs_user_slug ON core.user_activity_logs (user_id, activity_slug)`,
  `CREATE INDEX IF NOT EXISTS idx_logs_created ON core.user_activity_logs (created_at DESC)`,

  // App schemas
  `CREATE SCHEMA IF NOT EXISTS anxiety_cycle`,
  `CREATE SCHEMA IF NOT EXISTS brave_steps`,
  `CREATE SCHEMA IF NOT EXISTS calm_space_visualizer`,
  `CREATE SCHEMA IF NOT EXISTS clutter_journal`,
  `CREATE SCHEMA IF NOT EXISTS cognitive_distortions`,
  `CREATE SCHEMA IF NOT EXISTS contamination_ocd`,
  `CREATE SCHEMA IF NOT EXISTS daily_focus`,
  `CREATE SCHEMA IF NOT EXISTS daily_life`,
  `CREATE SCHEMA IF NOT EXISTS did_you_know`,
  `CREATE SCHEMA IF NOT EXISTS discard_it`,
  `CREATE SCHEMA IF NOT EXISTS fear_ladder`,
  `CREATE SCHEMA IF NOT EXISTS feelings_fact`,
  `CREATE SCHEMA IF NOT EXISTS gratitude_logs`,
  `CREATE SCHEMA IF NOT EXISTS grounded_techniques`,
  `CREATE SCHEMA IF NOT EXISTS guided_imagery`,
  `CREATE SCHEMA IF NOT EXISTS hoarding_ocd`,
  `CREATE SCHEMA IF NOT EXISTS letter_to_ocd`,
  `CREATE SCHEMA IF NOT EXISTS metta_heart_guide`,
  `CREATE SCHEMA IF NOT EXISTS mirror_moments`,
  `CREATE SCHEMA IF NOT EXISTS mood_tracker`,
  `CREATE SCHEMA IF NOT EXISTS ocd_treatment_guide`,
  `CREATE SCHEMA IF NOT EXISTS ocd_cycle`,
  `CREATE SCHEMA IF NOT EXISTS ocd_moments`,
  `CREATE SCHEMA IF NOT EXISTS ocd_success_stories`,
  `CREATE SCHEMA IF NOT EXISTS ocd_tips`,
  `CREATE SCHEMA IF NOT EXISTS one_thing_out`,
  `CREATE SCHEMA IF NOT EXISTS pure_ocd`,
  `CREATE SCHEMA IF NOT EXISTS quiet_focus_tool`,
  `CREATE SCHEMA IF NOT EXISTS reassurance_resistance`,
  `CREATE SCHEMA IF NOT EXISTS reframe_thoughts`,
  `CREATE SCHEMA IF NOT EXISTS response_guide`,
  `CREATE SCHEMA IF NOT EXISTS ritual_cost`,
  `CREATE SCHEMA IF NOT EXISTS self_compassion`,
  `CREATE SCHEMA IF NOT EXISTS thought_diffusion`,
  `CREATE SCHEMA IF NOT EXISTS thought_surfing`,
  `CREATE SCHEMA IF NOT EXISTS thought_truth`,
  `CREATE SCHEMA IF NOT EXISTS tricho_ocd`,
  `CREATE SCHEMA IF NOT EXISTS trigger_map`,
  `CREATE SCHEMA IF NOT EXISTS truth_seeker_quiz`,
  `CREATE SCHEMA IF NOT EXISTS uncertainity_acceptance`,
  `CREATE SCHEMA IF NOT EXISTS uncertainity_tolerance`,
  `CREATE SCHEMA IF NOT EXISTS urge_surfing`,
  `CREATE SCHEMA IF NOT EXISTS what_is_health_ocd`,
  `CREATE SCHEMA IF NOT EXISTS confidence_tracker`,

  // Activity-specific tables
  `CREATE TABLE IF NOT EXISTS daily_focus.performance_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    execution_score INTEGER,
    mental_clarity INTEGER,
    priority_completed BOOLEAN,
    priority_completion_text TEXT,
    primary_blocker TEXT,
    custom_blocker_text TEXT,
    productivity_depth TEXT,
    custom_work_depth_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS ocd_moments.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    location TEXT NOT NULL,
    custom_location TEXT,
    urge TEXT NOT NULL,
    response TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS clutter_journal.clutter_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
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
    avoided BOOLEAN DEFAULT FALSE,
    avoidance_reason TEXT,
    custom_reason_text TEXT,
    context TEXT,
    created_at BIGINT,
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS mood_tracker.mood_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    mood TEXT NOT NULL,
    mood_score INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
  )`,
  `CREATE TABLE IF NOT EXISTS fear_ladder.ladder_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    fear_item TEXT NOT NULL,
    suds_score INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS gratitude_logs.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    entry_text TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS trigger_map.triggers (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    trigger_text TEXT NOT NULL,
    intensity INTEGER,
    category TEXT,
    coping_used TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS ritual_cost.rituals (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    ritual_name TEXT NOT NULL,
    time_spent INTEGER,
    distress_before INTEGER,
    distress_after INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS reframe_thoughts.thought_records (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    automatic_thought TEXT NOT NULL,
    cognitive_distortion TEXT,
    reframed_thought TEXT,
    belief_before INTEGER,
    belief_after INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS letter_to_ocd.letters (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    mood_after TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS urge_surfing.sessions (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    urge_description TEXT,
    peak_intensity INTEGER,
    duration_seconds INTEGER,
    outcome TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  // Public schema fallback tables
  `CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_slug TEXT NOT NULL,
    user_id TEXT,
    payload JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`
];

async function run() {
  console.log("🚀 Rebuilding full OCD Suite schema...\n");
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
