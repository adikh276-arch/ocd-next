"use server";

import { neon } from '@neondatabase/serverless';
import type { TrackerEntry } from './tracker-storage';

const DATABASE_URL = process.env.DATABASE_URL!;
const sql = neon(DATABASE_URL);

/**
 * Ensures the user exists in the Neon database before operating on their data.
 * This is the "User Initialization" upsert required by the handshake protocol.
 */
async function ensureUserInitialized(userId: string): Promise<void> {
  try {
    await sql`
      INSERT INTO public.ocd_users (id) 
      VALUES (${userId}) 
      ON CONFLICT (id) DO NOTHING
    `;
  } catch (error) {
    console.error("Error initializing user in Neon:", error);
  }
}

export async function getEntriesServer(userId: string): Promise<TrackerEntry[]> {
  const rows = await sql`
    SELECT date, confidence_score, decisiveness_score, avoided, avoidance_reason, custom_reason_text, context, created_at
    FROM confidence_tracker_entries
    WHERE user_id = ${userId}
    ORDER BY date DESC
  `;
  return rows as unknown as TrackerEntry[];
}

export async function saveEntryServer(userId: string, entry: TrackerEntry): Promise<void> {
  // Ensure user exists before saving data (User Initialization)
  await ensureUserInitialized(userId);

  await sql`
    INSERT INTO confidence_tracker_entries (
      user_id, date, confidence_score, decisiveness_score, avoided, avoidance_reason, custom_reason_text, context, created_at
    ) VALUES (
      ${userId}, ${entry.date}, ${entry.confidence_score}, ${entry.decisiveness_score}, ${entry.avoided}, ${entry.avoidance_reason}, ${entry.custom_reason_text}, ${entry.context}, ${entry.created_at}
    )
    ON CONFLICT (user_id, date) DO UPDATE SET
      confidence_score = EXCLUDED.confidence_score,
      decisiveness_score = EXCLUDED.decisiveness_score,
      avoided = EXCLUDED.avoided,
      avoidance_reason = EXCLUDED.avoidance_reason,
      custom_reason_text = EXCLUDED.custom_reason_text,
      context = EXCLUDED.context,
      created_at = EXCLUDED.created_at
  `;
}
