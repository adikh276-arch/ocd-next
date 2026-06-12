export interface JournalEntry {
  objectName: string;
  insight: string;
  date: string;
}

export async function saveEntry(entry: JournalEntry): Promise<void> {
  try {
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const apiBase = '/ocd/api';
    await fetch(`${apiBase}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId, activity_slug: 'clutter_journal',
        payload: entry,
      }),
    });
  } catch (e) {
    console.error('Failed to save journal entry:', e);
  }
}

export async function getEntries(): Promise<JournalEntry[]> {
  try {
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const apiBase = '/ocd/api';
    const res = await fetch(`${apiBase}/logs?slug=clutter_journal${userId ? `&user_id=${userId}` : ''}`);
    const result = await res.json();
    if (result.success) {
      return result.data.map((row: any) => row.payload as JournalEntry);
    }
    return [];
  } catch {
    return [];
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
