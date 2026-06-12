import { sql } from './db';

export interface PerformanceEntry {
  id?: number;
  user_id: string;
  date: string; // YYYY-MM-DD
  execution_score: number;
  mental_clarity: number;
  priority_completed: boolean;
  priority_completion_text: string | null;
  primary_blocker: string;
  custom_blocker_text: string | null;
  productivity_depth: 'surface' | 'focused' | 'deep' | 'custom' | '';
  custom_work_depth_text: string | null;
  created_at: string;
}

export async function getEntries(userId: string): Promise<PerformanceEntry[]> {
  try {
    const result = await sql`
      SELECT * FROM performance_entries 
      WHERE user_id = ${userId} 
      ORDER BY date DESC
    `;
    return result.map(row => ({
      ...row,
      date: new Date(row.date).toISOString().slice(0, 10),
      priority_completed: Boolean(row.priority_completed),
      priority_completion_text: row.priority_completion_text || null
    })) as PerformanceEntry[];
  } catch (err) {
    console.error('Error fetching entries from Neon:', err);
    return [];
  }
}

export async function getTodayEntry(userId: string): Promise<PerformanceEntry | null> {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const result = await sql`
      SELECT * FROM performance_entries 
      WHERE user_id = ${userId} AND date = ${today}
      LIMIT 1
    `;
    if (result.length === 0) return null;
    const row = result[0];
    return {
      ...row,
      date: new Date(row.date).toISOString().slice(0, 10),
      priority_completed: Boolean(row.priority_completed),
      priority_completion_text: row.priority_completion_text || null
    } as PerformanceEntry;
  } catch (err) {
    console.error('Error fetching today entry:', err);
    return null;
  }
}

export async function saveEntry(userId: string, entry: Omit<PerformanceEntry, 'date' | 'created_at' | 'user_id'>): Promise<PerformanceEntry> {
  const today = new Date().toISOString().slice(0, 10);

  try {
    await sql`
      INSERT INTO performance_entries (
        user_id, date, execution_score, mental_clarity, 
        priority_completed, priority_completion_text,
        primary_blocker, custom_blocker_text, 
        productivity_depth, custom_work_depth_text
      ) VALUES (
        ${userId}, ${today}, ${entry.execution_score}, ${entry.mental_clarity}, 
        ${entry.priority_completed}, ${entry.priority_completion_text},
        ${entry.primary_blocker}, ${entry.custom_blocker_text}, 
        ${entry.productivity_depth}, ${entry.custom_work_depth_text}
      )
      ON CONFLICT (user_id, date) DO UPDATE SET
        execution_score = EXCLUDED.execution_score,
        mental_clarity = EXCLUDED.mental_clarity,
        priority_completed = EXCLUDED.priority_completed,
        priority_completion_text = EXCLUDED.priority_completion_text,
        primary_blocker = EXCLUDED.primary_blocker,
        custom_blocker_text = EXCLUDED.custom_blocker_text,
        productivity_depth = EXCLUDED.productivity_depth,
        custom_work_depth_text = EXCLUDED.custom_work_depth_text,
        created_at = CURRENT_TIMESTAMP
    `;
    
    return {
      ...entry,
      user_id: userId,
      date: today,
      created_at: new Date().toISOString()
    } as PerformanceEntry;
  } catch (err) {
    console.error('Error saving entry:', err);
    throw err;
  }
}

export async function getLast7Days(userId: string): Promise<PerformanceEntry[]> {
  try {
    const result = await sql`
      SELECT * FROM performance_entries 
      WHERE user_id = ${userId} AND date >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY date ASC
    `;
    return result.map(row => ({
      ...row,
      date: new Date(row.date).toISOString().slice(0, 10),
      priority_completed: Boolean(row.priority_completed)
    })) as PerformanceEntry[];
  } catch (err) {
    console.error('Error fetching last 7 days:', err);
    return [];
  }
}

export async function getLast14Days(userId: string): Promise<PerformanceEntry[]> {
  try {
    const result = await sql`
      SELECT * FROM performance_entries 
      WHERE user_id = ${userId} AND date >= CURRENT_DATE - INTERVAL '14 days'
      ORDER BY date ASC
    `;
    return result.map(row => ({
      ...row,
      date: new Date(row.date).toISOString().slice(0, 10),
      priority_completed: Boolean(row.priority_completed)
    })) as PerformanceEntry[];
  } catch (err) {
    console.error('Error fetching last 14 days:', err);
    return [];
  }
}


export function getConsistencyZone(avg: number): { label: string; zone: 'high' | 'moderate' | 'low' } {
  if (avg >= 8) return { label: 'High Performance Zone', zone: 'high' };
  if (avg >= 5) return { label: 'Moderate Zone', zone: 'moderate' };
  return { label: 'Improvement Needed', zone: 'low' };
}

export const BLOCKERS = [
  'Distraction',
  'Emotional State',
  'Lack of Clarity',
  'External Dependency',
  'Low Energy',
  'No Major Blocker',
] as const;

export const DEPTH_OPTIONS = [
  { value: 'surface' as const, label: 'Surface-Level Tasks', description: 'Admin, emails, quick tasks' },
  { value: 'focused' as const, label: 'Focused Work', description: 'Structured, goal-oriented work' },
  { value: 'deep' as const, label: 'Deep Work', description: 'High-intensity, creative work' },
];
