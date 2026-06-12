import { getEntriesServer, saveEntryServer } from './tracker-storage-actions';

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



export async function getEntries(): Promise<TrackerEntry[]> {
  const userId = getUserId();
  try {
    const rows = await getEntriesServer(userId);
    return rows;
  } catch (error) {
    console.error('Error fetching entries from Neon, falling back to local storage:', error);
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  }
}

export async function saveEntry(entry: TrackerEntry): Promise<void> {
  const userId = getUserId();
  try {
    await saveEntryServer(userId, entry);
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
