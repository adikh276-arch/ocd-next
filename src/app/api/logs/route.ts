import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * Mapping of activity slugs to their dedicated table and column aliases.
 * This allows the central API to route data into structured tables for better history tracking.
 */
const TABLE_MAP: Record<string, { table: string; columns: string[]; aliases?: Record<string, string> }> = {
  anxiety_cycle: {
    table: 'public.anxiety_cycle_entries',
    columns: ['completed', 'date', 'user_id'],
  },
  brave_steps: {
    table: 'public.brave_steps_entries',
    columns: ['surface', 'duration', 'anxiety_before', 'anxiety_after', 'anxiety_drop', 'note', 'completed_at', 'user_id'],
    aliases: { anxiety_before: 'beforeAnxiety', anxiety_after: 'afterAnxiety' }
  },
  clutter_journal: {
    table: 'public.clutter_journal_entries',
    columns: ['category', 'item_description', 'emotion_score', 'action_taken', 'user_id'],
    aliases: { objectName: 'item_description', insight: 'category' }
  },
  daily_life: {
    table: 'public.daily_life_entries',
    columns: ['work_score', 'social_score', 'sleep_score', 'selfcare_score', 'date', 'user_id'],
  },
  discard_it: {
    table: 'public.discard_it_entries',
    columns: ['items', 'current_step', 'sessions', 'user_id'],
    aliases: { currentStep: 'current_step' }
  },
  fear_ladder: {
    table: 'public.fear_ladder_entries',
    columns: ['fear_item', 'suds_score', 'completed', 'user_id'],
  },
  gratitude_logs: {
    table: 'public.gratitude_logs_entries',
    columns: ['entry_text', 'user_id'],
    aliases: { items: 'entry_text' }
  },
  letter_to_ocd: {
    table: 'public.letter_to_ocd_letters',
    columns: ['content', 'user_id'],
    aliases: { letterContent: 'content' }
  },
  mood_tracker: {
    table: 'public.mood_tracker_entries',
    columns: ['mood_value', 'mood_label', 'mood_emoji', 'day_name', 'note', 'user_id'],
  },
  ocd_moments: {
    table: 'public.ocd_moments_entries',
    columns: ['location', 'urge', 'response', 'timestamp', 'user_id'],
  },
  one_thing_out: {
    table: 'public.one_thing_out_entries',
    columns: ['item_name', 'thoughts', 'feeling', 'prompt', 'user_id'],
    aliases: { itemName: 'item_name', selectedThoughts: 'thoughts', selectedFeeling: 'feeling' }
  },
  reassurance_resistance: {
    table: 'public.reassurance_resistance_entries',
    columns: ['worry_text', 'urge_type', 'timer_duration', 'mood_emoji', 'reflection_note', 'next_goal', 'user_id'],
  },
  reframe_thoughts: {
    table: 'public.reframe_thoughts_records',
    columns: ['automatic_thought', 'reframed_thought', 'distortions', 'user_id'],
    aliases: { original_thought: 'automatic_thought', reframed_thought: 'reframed_thought' }
  },
  ritual_cost: {
    table: 'public.ritual_cost_entries',
    columns: ['ritual_name', 'time_spent', 'user_id'],
  },
  thought_diffusion: {
    table: 'public.thought_diffusion_entries',
    columns: ['guided_rewrite', 'own_thought', 'own_rewrite', 'feeling', 'user_id'],
  },
  trigger_map: {
    table: 'public.trigger_map_entries',
    columns: ['trigger_text', 'intensity', 'category', 'user_id'],
  },
  uncertainity_acceptance: {
    table: 'public.uncertainity_acceptance_entries',
    columns: ['doubt_text', 'statement_text', 'date', 'user_id'],
    aliases: { doubt: 'doubt_text', statement: 'statement_text' }
  },
  uncertainity_tolerance: {
    table: 'public.uncertainity_tolerance_entries',
    columns: ['uncertainty_text', 'discomfort_before', 'discomfort_after', 'timer_duration', 'statements_checked', 'reflection_note', 'user_id'],
  },
  urge_surfing: {
    table: 'public.urge_surfing_sessions',
    columns: ['body_location', 'sensation_description', 'completed', 'reflection_note', 'user_id'],
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(`[API] POST /api/logs | activity: ${body.activity_slug} | user: ${body.user_id}`);
    const { activity_slug, payload, user_id } = body;

    if (!activity_slug || !payload) {
      console.warn(`[API] POST failed: missing slug or payload`);
      return NextResponse.json({ error: "activity_slug and payload are required" }, { status: 400 });
    }

    // Always ensure user exists
    if (user_id) {
      await sql`
        INSERT INTO public.ocd_users (id, created_at, updated_at)
        VALUES (${user_id}, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
      `;
    }

    // Check if this activity has a dedicated table
    const meta = (TABLE_MAP as any)[activity_slug];
    if (meta) {
// ... [logic remains same but using meta.table which is now public.whatever]

      const data: Record<string, any> = { user_id };
      
      Object.keys(payload).forEach(key => {
        // 1. Check explicit alias
        let dbKey = meta.aliases?.[key] || key;
        
        // 2. Check suffix conventions or camelCase to snake_case mapping
        if (dbKey === key) {
           dbKey = meta.columns.includes(`${key}_score`) ? `${key}_score` : 
                   meta.columns.includes(`${key}_text`) ? `${key}_text` : 
                   meta.columns.includes(key.replace(/([A-Z])/g, "_$1").toLowerCase()) ? key.replace(/([A-Z])/g, "_$1").toLowerCase() : key;
        }

        if (meta.columns.includes(dbKey)) {
          let val = payload[key];
          if (val !== null && typeof val === 'object') {
            val = JSON.stringify(val);
          }
          data[dbKey] = val;
        }
      });

      // Special handling for date types
      if (data.date) data.date = new Date(data.date).toISOString().split('T')[0];
      if (data.timestamp) data.timestamp = new Date(data.timestamp).toISOString();

      const columns = Object.keys(data);
      const values = Object.values(data);
      if (columns.length > 1) {
        const query = `INSERT INTO ${meta.table} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
        const result = await sql(query, values);
        return NextResponse.json({ success: true, data: result[0], mode: 'dedicated' });
      }
    }

    // Fallback/Standard logging in public.ocd_activity_logs
    const result = await sql`
      INSERT INTO public.ocd_activity_logs (activity_slug, user_id, payload)
      VALUES (${activity_slug}, ${user_id ?? null}, ${JSON.stringify(payload)})
      RETURNING *
    `;

    return NextResponse.json({ success: true, data: result[0], mode: 'generic' });
  } catch (error: any) {
    console.error(`[API] POST error:`, {
      message: error.message,
      stack: error.stack,
      activity: body?.activity_slug,
      user_id: body?.user_id
    });
    return NextResponse.json({ 
      error: error.message,
      details: "Check server logs for full trace"
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const activity_slug = searchParams.get('slug');
    const user_id = searchParams.get('user_id');
    console.log(`[API] GET /api/logs | slug: ${activity_slug} | user: ${user_id}`);

    if (!activity_slug) {
      return NextResponse.json({ error: "slug query parameter is required" }, { status: 400 });
    }

    const meta = TABLE_MAP[activity_slug];
    let results;

    if (!user_id) {
      return NextResponse.json({ success: true, data: [] });
    }

    if (meta) {
      // Query from dedicated table - Fix syntax for parameters
      const query = `SELECT * FROM ${meta.table} WHERE user_id = $1 ORDER BY id DESC LIMIT 100`;
      results = await sql(query, [user_id]);
      
      // Transform back to generic payload format so History UI remains compatible
      results = results.map((row: any) => {
        const payload: Record<string, any> = { ...row };
        
        // Apply reverse aliases if they exist
        if (meta.aliases) {
          Object.entries(meta.aliases as Record<string, string>).forEach(([frontendKey, dbKey]) => {
            if (row[dbKey] !== undefined) {
              payload[frontendKey] = row[dbKey];
            }
          });
        }

        return {
          id: row.id,
          created_at: row.created_at || row.timestamp || row.date || new Date().toISOString(),
          payload
        };
      });
    } else {
      // Query generic logs from flattened table
      results = await sql`
            SELECT * FROM public.ocd_activity_logs
            WHERE activity_slug = ${activity_slug}
              AND user_id = ${user_id}
            ORDER BY created_at DESC
            LIMIT 100
          `;
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    console.error("Failed to fetch logs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
