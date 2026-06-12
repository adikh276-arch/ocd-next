"use client";

import { getStoredUserId } from "@/lib/auth";

/**
 * useAuth — access the current user's identity anywhere in an activity.
 *
 * Returns the user_id from sessionStorage (set after the AuthGate handshake).
 * Safe to call in any client component; returns null during SSR or before auth.
 *
 * Usage:
 *   const { userId, withUserId } = useAuth();
 *   await fetch('/ocd/api/logs', {
 *     method: 'POST',
 *     body: JSON.stringify({ activity_slug: 'anxiety_cycle', user_id: userId, payload: {...} })
 *   });
 */
export function useAuth() {
  const userId = getStoredUserId();

  /**
   * Helper that merges user_id into any fetch body automatically.
   * Useful so activities don't need to manually thread user_id everywhere.
   */
  const logActivity = async (activitySlug: string, payload: Record<string, unknown>) => {
    try {
      await fetch("/ocd/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_slug: activitySlug,
          user_id: userId,
          payload,
        }),
      });
    } catch (e) {
      console.error("[useAuth] logActivity failed:", e);
    }
  };

  return { userId, logActivity };
}
