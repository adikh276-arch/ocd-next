// @ts-nocheck
export interface LogEntry {
    id: string;
    timestamp: string;
    location: string;
    customLocation?: string;
    urge: string;
    response: string;
}

const apiBase = '/ocd/api';

export const saveEntry = async (entry: Omit<LogEntry, 'id' | 'timestamp'>): Promise<void> => {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const res = await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: ocd_user_id, activity_slug: 'ocd_moments',
            payload: {
                location: entry.location,
                customLocation: entry.customLocation,
                urge: entry.urge,
                response: entry.response,
                timestamp: new Date().toISOString(),
            },
        }),
    });
    if (!res.ok) throw new Error('Failed to save entry');
};

export const getEntriesGroupedByDay = async (): Promise<Record<string, LogEntry[]>> => {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const res = await fetch(`${apiBase}/logs?slug=ocd_moments${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch entries');
    const result = await res.json();
    const entries: LogEntry[] = (result.data || []).map((row: any) => ({
        id: row.id,
        timestamp: row.created_at,
        ...row.payload,
    }));
    // Group by date
    const grouped: Record<string, LogEntry[]> = {};
    for (const entry of entries) {
        const day = entry.timestamp?.slice(0, 10) || 'unknown';
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(entry);
    }
    return grouped;
};

export const getRecentEntriesByLocation = async (location: string, limit = 4): Promise<LogEntry[]> => {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const res = await fetch(`${apiBase}/logs?slug=ocd_moments${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch recent entries');
    const result = await res.json();
    return (result.data || [])
        .filter((row: any) => row.payload?.location === location)
        .slice(0, limit)
        .map((row: any) => ({ id: row.id, timestamp: row.created_at, ...row.payload }));
};

export const getWeekEntries = async (weeksAgo = 0): Promise<LogEntry[]> => {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const res = await fetch(`${apiBase}/logs?slug=ocd_moments${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch week entries');
    const result = await res.json();
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - (weeksAgo * 7 + 7));
    const end = new Date(now);
    end.setDate(end.getDate() - weeksAgo * 7);
    return (result.data || [])
        .filter((row: any) => {
            const d = new Date(row.created_at);
            return d >= start && d <= end;
        })
        .map((row: any) => ({ id: row.id, timestamp: row.created_at, ...row.payload }));
};

