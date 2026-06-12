import { neon } from '@neondatabase/serverless';

export interface TrackerEntry {
  date: string;
  confidence_score: number;
  decisiveness_score: number;
  avoided: boolean;
  avoidance_reason: string | null;
  custom_reason_text: string | null;
  context: string | null;
  created_at: number;
}

const STORAGE_KEY = "confidence_tracker_entries";
const DATABASE_URL = process.env.DATABASE_URL!;

const sql = neon(DATABASE_URL);

/**
 * Gets the current authenticated user ID from sessionStorage.
 * All subsequent Neon queries must include a filter for the validated user_id.
 */
function getUserId(): string {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) {
    // In a real app, this should probably throw or cause a redirect, 
    // but the AuthProvider already handles the redirect.
    return "0"; 
  }
  return userId;
}

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

export async function getEntries(): Promise<TrackerEntry[]> {
  const userId = getUserId();
  try {
    const rows = await sql`
      SELECT date, confidence_score, decisiveness_score, avoided, avoidance_reason, custom_reason_text, context, created_at
      FROM confidence_tracker_entries
      WHERE user_id = ${userId}
      ORDER BY date DESC
    `;
    return rows as unknown as TrackerEntry[];
  } catch (error) {
    console.error('Error fetching entries from Neon, falling back to local storage:', error);
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  }
}

export async function saveEntry(entry: TrackerEntry): Promise<void> {
  const userId = getUserId();
  
  // Ensure user exists before saving data (User Initialization)
  await ensureUserInitialized(userId);

  try {
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
  } catch (error) {
    console.error('Error saving entry to Neon, direct saving to local storage:', error);
  } finally {
    // Always update local storage for redundancy/offline support, scoped by userId
    const entries = await getLocalEntries(userId);
    const idx = entries.findIndex((e) => e.date === entry.date);
    if (idx >= 0) {
      entries[idx] = entry;
    } else {
      entries.push(entry);
    }
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(entries));
  }
}

async function getLocalEntries(userId: string): Promise<TrackerEntry[]> {
  const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  return raw ? JSON.parse(raw) : [];
}

export async function getTodayEntry(): Promise<TrackerEntry | undefined> {
  const today = new Date().toISOString().split("T")[0];
  const entries = await getEntries();
  return entries.find((e) => e.date === today);
}

export async function getLast7DaysEntries(): Promise<TrackerEntry[]> {
  const entries = await getEntries();
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  return entries
    .filter((e) => new Date(e.date).getTime() >= sevenDaysAgo)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function computeConfidenceIndex(entries: TrackerEntry[]): number | null {
  if (entries.length < 3) return null;
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const confAvg = avg(entries.map((e) => e.confidence_score));
  const decAvg = avg(entries.map((e) => e.decisiveness_score));
  const avoidRate = entries.filter((e) => e.avoided).length / entries.length;
  // Composite: conf 50%, dec 30%, avoidance inverse 20%
  return confAvg * 0.5 + decAvg * 0.3 + (1 - avoidRate) * 10 * 0.2;
}
