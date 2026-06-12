import { getEntriesServer, getTodayEntryServer, saveEntryServer, getLast7DaysServer, getLast14DaysServer } from './tracker-data-actions';

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
  return getEntriesServer(userId);
}

export async function getTodayEntry(userId: string): Promise<PerformanceEntry | null> {
  return getTodayEntryServer(userId);
}

export async function saveEntry(userId: string, entry: Omit<PerformanceEntry, 'date' | 'created_at' | 'user_id'>): Promise<PerformanceEntry> {
  return saveEntryServer(userId, entry);
}

export async function getLast7Days(userId: string): Promise<PerformanceEntry[]> {
  return getLast7DaysServer(userId);
}

export async function getLast14Days(userId: string): Promise<PerformanceEntry[]> {
  return getLast14DaysServer(userId);
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
