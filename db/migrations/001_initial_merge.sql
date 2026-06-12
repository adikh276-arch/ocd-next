-- ============================================================
-- MASTER INITIAL MIGRATION: 001_INITIAL_MERGE.SQL
-- Combined bootstrap for all 42 OCD therapeutic apps
-- ============================================================

-- 1. CLEANUP & CORE INITIALIZATION
CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.users (
  id         TEXT        PRIMARY KEY, 
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row level logs
CREATE TABLE IF NOT EXISTS core.user_activity_logs (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_slug TEXT        NOT NULL,
  user_id       TEXT        REFERENCES core.users(id) ON DELETE SET NULL,
  payload       JSONB       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CREATE SCHEMAS FOR ALL 42 PROJECTS
CREATE SCHEMA IF NOT EXISTS anxiety_cycle;
CREATE SCHEMA IF NOT EXISTS brave_steps;
CREATE SCHEMA IF NOT EXISTS calm_space_visualizer;
CREATE SCHEMA IF NOT EXISTS clutter_journal;
CREATE SCHEMA IF NOT EXISTS cognitive_distortions;
CREATE SCHEMA IF NOT EXISTS contamination_ocd;
CREATE SCHEMA IF NOT EXISTS daily_focus;
CREATE SCHEMA IF NOT EXISTS daily_life;
CREATE SCHEMA IF NOT EXISTS did_you_know;
CREATE SCHEMA IF NOT EXISTS discard_it;
CREATE SCHEMA IF NOT EXISTS fear_ladder;
CREATE SCHEMA IF NOT EXISTS feelings_fact;
CREATE SCHEMA IF NOT EXISTS gratitude_logs;
CREATE SCHEMA IF NOT EXISTS grounded_techniques;
CREATE SCHEMA IF NOT EXISTS guided_imagery;
CREATE SCHEMA IF NOT EXISTS hoarding_ocd;
CREATE SCHEMA IF NOT EXISTS letter_to_ocd;
CREATE SCHEMA IF NOT EXISTS metta_heart_guide;
CREATE SCHEMA IF NOT EXISTS mirror_moments;
CREATE SCHEMA IF NOT EXISTS mood_tracker;
CREATE SCHEMA IF NOT EXISTS ocd_treatment_guide;
CREATE SCHEMA IF NOT EXISTS ocd_cycle;
CREATE SCHEMA IF NOT EXISTS ocd_moments;
CREATE SCHEMA IF NOT EXISTS ocd_success_stories;
CREATE SCHEMA IF NOT EXISTS ocd_tips;
CREATE SCHEMA IF NOT EXISTS one_thing_out;
CREATE SCHEMA IF NOT EXISTS pure_ocd;
CREATE SCHEMA IF NOT EXISTS quiet_focus_tool;
CREATE SCHEMA IF NOT EXISTS reassurance_resistance;
CREATE SCHEMA IF NOT EXISTS reframe_thoughts;
CREATE SCHEMA IF NOT EXISTS response_guide;
CREATE SCHEMA IF NOT EXISTS ritual_cost;
CREATE SCHEMA IF NOT EXISTS self_compassion;
CREATE SCHEMA IF NOT EXISTS thought_diffusion;
CREATE SCHEMA IF NOT EXISTS thought_surfing;
CREATE SCHEMA IF NOT EXISTS thought_truth;
CREATE SCHEMA IF NOT EXISTS tricho_ocd;
CREATE SCHEMA IF NOT EXISTS trigger_map;
CREATE SCHEMA IF NOT EXISTS truth_seeker_quiz;
CREATE SCHEMA IF NOT EXISTS uncertainity_acceptance;
CREATE SCHEMA IF NOT EXISTS uncertainity_tolerance;
CREATE SCHEMA IF NOT EXISTS urge_surfing;
CREATE SCHEMA IF NOT EXISTS what_is_health_ocd;

-- 3. APP-SPECIFIC TABLES FOR INTERACTIVE APPS

-- Daily Focus History
CREATE TABLE IF NOT EXISTS daily_focus.performance_entries (
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
);

-- OCD Moments History
CREATE TABLE IF NOT EXISTS ocd_moments.entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    location TEXT NOT NULL,
    custom_location TEXT,
    urge TEXT NOT NULL,
    response TEXT NOT NULL
);

-- Clutter Journal History
CREATE TABLE IF NOT EXISTS clutter_journal.clutter_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES core.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    item_description TEXT,
    emotion_score INTEGER,
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. UTILITIES
CREATE INDEX IF NOT EXISTS idx_logs_user_slug ON core.user_activity_logs (user_id, activity_slug);
