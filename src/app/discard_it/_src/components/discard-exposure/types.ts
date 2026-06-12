
export interface LadderItem {
  emoji: string;
  label: string;
}

export const ALL_ITEMS: LadderItem[] = [
  { emoji: "📰", label: "Old magazines/newspapers" },
  { emoji: "👕", label: "Clothes I haven't worn in a year" },
  { emoji: "📦", label: "Empty boxes or packaging" },
  { emoji: "🧾", label: "Old receipts or bills" },
  { emoji: "✉️", label: "Junk mail or flyers" },
  { emoji: "🎫", label: "Used tickets or stubs" },
  { emoji: "🎁", label: "Unwanted gifts" },
  { emoji: "📝", label: "Old school or work notes" },
  { emoji: "🛍️", label: "Excess shopping bags" },
  { emoji: "🥫", label: "Expired pantry items" },
];

export interface SessionData {
  step: number;
  beforeAnxiety: number;
  afterAnxiety: number;
  action: string;
  date: string;
}

export interface LadderData {
  items: LadderItem[];
  currentStep: number;
  sessions: SessionData[];
}

export const STORAGE_KEY = "discard_ladder";

export function loadLadder(): LadderData | null {
  // We'll handle loading via useEffect in the component now for Neon
  return null;
}

export async function saveLadderToNeon(data: LadderData) {
  try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    await fetch('/ocd/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: ocd_user_id, activity_slug: 'discard_it',
        payload: data,
      }),
    });
  } catch (e) {
    console.error('Failed to save discard ladder:', e);
  }
}

export async function getLadderFromNeon(): Promise<LadderData | null> {
  try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const res = await fetch(`/ocd/api/logs?slug=discard_it${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
    
    if (!res.ok) {
      console.error('Failed to fetch discard ladder: Server returned', res.status);
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error('Failed to fetch discard ladder: Expected JSON but got', contentType);
      return null;
    }

    const result = await res.json();
    if (result.success && result.data.length > 0) {
      // The most recent log contains the latest full state
      return result.data[0].payload as LadderData;
    }
  } catch (e) {
    console.error('Failed to fetch discard ladder:', e);
  }
  return null;
}
