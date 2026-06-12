-- Master Initialization Script for Fresh OCD Database (FLAT STRUCTURE)
-- All tables in 'public' schema for maximum visibility in Neon Dashboard

-- 0. Core tables
CREATE TABLE IF NOT EXISTS public.ocd_users (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ocd_activity_logs (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    activity_slug TEXT NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. Anxiety Cycle
CREATE TABLE IF NOT EXISTS public.anxiety_cycle_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    completed BOOLEAN DEFAULT TRUE,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Brave Steps (ERP)
CREATE TABLE IF NOT EXISTS public.brave_steps_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    surface TEXT,
    duration INTEGER,
    anxiety_before INTEGER,
    anxiety_after INTEGER,
    anxiety_drop INTEGER,
    note TEXT,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Clutter Journal
CREATE TABLE IF NOT EXISTS public.clutter_journal_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    category TEXT NOT NULL,
    item_description TEXT,
    emotion_score INTEGER,
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Daily Life Habit Tracker
CREATE TABLE IF NOT EXISTS public.daily_life_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    work_score INTEGER,
    social_score INTEGER,
    sleep_score INTEGER,
    selfcare_score INTEGER,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Discard It (Hoarding)
CREATE TABLE IF NOT EXISTS public.discard_it_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    completed BOOLEAN DEFAULT TRUE,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Fear Ladder
CREATE TABLE IF NOT EXISTS public.fear_ladder_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    fear_item TEXT NOT NULL,
    suds_score INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Gratitude Logs
CREATE TABLE IF NOT EXISTS public.gratitude_logs_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    entry_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Letter to OCD
CREATE TABLE IF NOT EXISTS public.letter_to_ocd_letters (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Mood Tracker
CREATE TABLE IF NOT EXISTS public.mood_tracker_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    mood_value TEXT,
    mood_label TEXT,
    mood_emoji TEXT,
    day_name TEXT,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. OCD Moments
CREATE TABLE IF NOT EXISTS public.ocd_moments_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    location TEXT,
    urge TEXT,
    response TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. One Thing Out
CREATE TABLE IF NOT EXISTS public.one_thing_out_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    item_name TEXT NOT NULL,
    thoughts TEXT,
    feeling TEXT,
    prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Reassurance Resistance
CREATE TABLE IF NOT EXISTS public.reassurance_resistance_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    worry_text TEXT,
    urge_type TEXT,
    timer_duration INTEGER,
    mood_emoji TEXT,
    reflection_note TEXT,
    next_goal TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Reframe Thoughts
CREATE TABLE IF NOT EXISTS public.reframe_thoughts_records (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    automatic_thought TEXT NOT NULL,
    reframed_thought TEXT,
    distortions JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Ritual Cost
CREATE TABLE IF NOT EXISTS public.ritual_cost_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    ritual_name TEXT NOT NULL,
    time_spent INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Thought Diffusion
CREATE TABLE IF NOT EXISTS public.thought_diffusion_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    guided_rewrite TEXT,
    own_thought TEXT,
    own_rewrite TEXT,
    feeling TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Trigger Map
CREATE TABLE IF NOT EXISTS public.trigger_map_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    trigger_text TEXT NOT NULL,
    intensity INTEGER,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Uncertainty Acceptance
CREATE TABLE IF NOT EXISTS public.uncertainity_acceptance_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    doubt_text TEXT NOT NULL,
    statement_text TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Uncertainty Tolerance
CREATE TABLE IF NOT EXISTS public.uncertainity_tolerance_entries (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    uncertainty_text TEXT,
    discomfort_before INTEGER,
    discomfort_after INTEGER,
    timer_duration INTEGER,
    statements_checked JSONB,
    reflection_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Urge Surfing
CREATE TABLE IF NOT EXISTS public.urge_surfing_sessions (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES public.ocd_users(id),
    urge_description TEXT,
    peak_intensity INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
