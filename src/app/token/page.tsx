"use client";

import { useEffect } from "react";
import { getReturnPath, RETURN_PATH_QUERY } from "@/lib/auth";

/**
 * /token — Intermediate Auth Bridge Page
 *
 * Flow:
 *  1. User lands here because they have no active session.
 *  2. This page reads the saved intended slug from sessionStorage.
 *  3. Builds the full return URL so MantraCare knows where to redirect back.
 *  4. Hard-redirects to web.mantracare.com/app/ocd with the return URL encoded.
 *
 * When MantraCare finishes auth, it sends the user BACK to:
 *   platform.mantracare.com/ocd?token=UUID&return_path=/slug
 * which re-triggers the AuthGate handshake.
 */
export default function TokenPage() {
  useEffect(() => {
    const savedPath = getReturnPath();
    const origin = window.location.origin;
    const finalPath = savedPath || "/";
    
    console.group("[TokenBridge] 🚀 Initiating Auth Redirect");
    
    const sanitizedPath = finalPath.startsWith("/") ? finalPath : `/${finalPath}`;
    const returnUrl = `${origin}/ocd/?${RETURN_PATH_QUERY}=${encodeURIComponent(sanitizedPath)}`;
    const authUrl = `https://web.mantracare.com/app/ocd?redirect_url=${encodeURIComponent(returnUrl)}`;

    console.log(" - Destination Portal:", "web.mantracare.com");
    console.log(" - Full Redirect URL:", authUrl);
    console.groupEnd();

    // Primary Redirect
    window.location.replace(authUrl);

    // Failsafe: if replace() is slow, trigger a hard href click after 500ms
    const timer = setTimeout(() => {
      window.location.href = authUrl;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#f8fafc] flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-[24px] bg-white border border-slate-50 shadow-xl flex items-center justify-center">
          <span className="text-3xl">🔐</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
          Connecting you securely…
        </p>
      </div>
    </div>
  );
}
