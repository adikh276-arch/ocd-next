import { useState, useCallback } from 'react';

export interface SessionData {
  id: string;
  date: string;
  uncertaintyText: string;
  discomfortBefore: number | null;
  discomfortAfter: number | null;
  timerDuration: number | null;
  statementsChecked: string[];
  reflectionNote: string;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function getSavedSessions(): Promise<SessionData[]> {
  try {
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const apiBase = '/ocd/api';
    const res = await fetch(`${apiBase}/logs?slug=uncertainity_tolerance${userId ? `&user_id=${userId}` : ''}`);
    const result = await res.json();
    if (result.success) {
      return result.data.map((row: any) => row.payload as SessionData);
    }
    return [];
  } catch {
    return [];
  }
}

export function useActivitySession() {
  const [session, setSession] = useState<SessionData>({
    id: generateId(),
    date: new Date().toISOString(),
    uncertaintyText: '',
    discomfortBefore: null,
    discomfortAfter: null,
    timerDuration: null,
    statementsChecked: [],
    reflectionNote: '',
  });

  const update = useCallback((partial: Partial<SessionData>) => {
    setSession(prev => ({ ...prev, ...partial }));
  }, []);

  const complete = useCallback(async () => {
    const finalSession = { ...session, date: new Date().toISOString() };
    try {
      const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId, 
          activity_slug: 'uncertainity_tolerance',
          payload: finalSession,
        }),
      });
    } catch (e) {
      console.error('Failed to save session:', e);
    }
    return finalSession;
  }, [session]);

  return { session, update, complete };
}
