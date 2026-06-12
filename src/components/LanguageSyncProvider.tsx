"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import i18n from "@/lib/i18n";

/**
 * Inner component that reads the ?lang= URL param and syncs it
 * to i18next + localStorage/cookie so all activities share the same language.
 * Must be wrapped in Suspense because useSearchParams requires it.
 */
function LanguageSyncInner() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang");

  useEffect(() => {
    if (langParam) {
      // URL has ?lang=xx — apply and persist
      if (i18n.language !== langParam) {
        i18n.changeLanguage(langParam);
      }
      try {
        localStorage.setItem("i18nextLng", langParam);
        // Cookie valid for 1 year; path=/ so it covers all routes
        document.cookie = `i18next=${langParam}; path=/; max-age=31536000; SameSite=Lax`;
      } catch (_) {}
    } else {
      // No URL param — restore from storage so language doesn't reset
      try {
        const cookieMatch = document.cookie.match(/(?:^|;\s*)i18next=([^;]+)/);
        const saved =
          localStorage.getItem("i18nextLng") ||
          (cookieMatch ? cookieMatch[1] : null);
        if (saved && i18n.language !== saved) {
          i18n.changeLanguage(saved);
        }
      } catch (_) {}
    }
  }, [langParam]);

  return null;
}

/**
 * Drop this inside <Providers> to enable app-wide language sync.
 * It transparently renders children; the Suspense boundary is internal.
 */
export function LanguageSyncProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <LanguageSyncInner />
      </Suspense>
      {children}
    </>
  );
}
