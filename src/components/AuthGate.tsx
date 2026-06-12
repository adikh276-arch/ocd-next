"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { 
  getStoredUserId, 
  storeUserId, 
  saveReturnPath, 
  consumeReturnPath, 
  RETURN_PATH_QUERY 
} from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";


// Routes that are always public — no token required
const PUBLIC_PATHS = ['/token'];

type AuthState = "loading" | "authenticated" | "redirecting";

const LOADING_MESSAGES = [
  "Preparing your space…",
  "Getting things ready for you…",
  "Setting up your therapeutic environment…",
];

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#fdfdfd] flex items-center justify-center z-50">
      <div className="w-8 h-8 border-3 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
    </div>
  );
}

function AuthGateInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<AuthState>("loading");

  // Capture webhook payload params from URL
  useEffect(() => {
    const upaId = searchParams.get('upa_id');
    const uid = searchParams.get('uid');
    if (upaId) sessionStorage.setItem('upa_id', upaId);
    if (uid) sessionStorage.setItem('uid', uid);
  }, [searchParams]);

  /**
   * 3. The "Smart" Restore & Navigate (Crucial Step)
   *
   * ROOT CAUSE FIX: We NEVER call setState("authenticated") before navigating.
   * Doing so would render children (the dashboard at "/") before router.replace
   * fires — causing a visible flash of the wrong page, or the wrong page
   * staying visible entirely.
   *
   * Instead: resolve the target, then do a HARD window.location.replace so the
   * browser loads the correct Next.js route from scratch. The loading screen
   * stays visible the entire time. The target page's own AuthGate run will then
   * find the userId in sessionStorage and immediately set state → authenticated.
   */
  const restoreAndNavigate = useCallback((currentPathname: string) => {
    console.group("[AuthGate] 🏁 Restore & Navigate");

    // Priority 1: return_path query param forwarded by MantraCare in the redirect URL
    const urlReturnPath = searchParams.get(RETURN_PATH_QUERY);

    // Priority 2: path we saved to localStorage before the cross-domain redirect
    const storedPath = consumeReturnPath();

    // Priority 3: fallback to wherever the user physically is (magic-link entry)
    const fallbackPath = currentPathname !== '/' ? currentPathname : null;

    const prefix = process.env.NODE_ENV === 'production' ? '/ocd' : '';
    const targetPath = urlReturnPath || storedPath || fallbackPath || "/";

    // Build the full URL with the Next.js basePath prepended in production
    const normalised = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
    
    // In development, if the path already starts with /ocd, we might want to strip it 
    // to avoid double prefixing or 404s if the dev server doesn't use the prefix.
    let cleanPath = normalised;
    if (process.env.NODE_ENV !== 'production' && normalised.startsWith('/ocd')) {
      cleanPath = normalised.replace('/ocd', '') || '/';
    }

    const fullUrl = `${prefix}${cleanPath === '/' ? (prefix ? '' : '/') : cleanPath}`;

    console.log(" - URL return_path param:", urlReturnPath);
    console.log(" - localStorage stored path:", storedPath);
    console.log(" - Fallback pathname:", fallbackPath);
    console.log(" - Final hard-redirect target:", fullUrl);
    console.groupEnd();

    // Hard redirect — reliable, no React state race condition possible
    window.location.replace(fullUrl);
  }, [searchParams]);

  useEffect(() => {

    const isPublicPath = PUBLIC_PATHS.some(p => {
      const prefix = process.env.NODE_ENV === 'production' ? '/ocd' : '';
      return pathname === p || pathname === `${prefix}${p}` || pathname === `${prefix}${p}/`;
    });



    if (isPublicPath) {
      setState("authenticated");
      return;
    }

    const urlToken = searchParams.get("token");
    const sessionUserId = getStoredUserId();

    // Loop Detection Failsafe
    const redirectCount = parseInt(sessionStorage.getItem('auth_redirect_count') || '0');
    if (redirectCount > 3) {
      console.error("[AuthGate] 🛑 Potential redirect loop detected. Stopping.");
      if (sessionUserId) {
        setState("authenticated");
        return;
      }
    }

    // 2. Handle Auth Portal Return & Magic Links
    if (urlToken) {
      console.log("[AuthGate] 🎫 Token found in URL. Verifying...");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s client-side timeout

      fetch("/ocd/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: urlToken }),
        signal: controller.signal
      })
      .then(r => r.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data.success && data.user_id) {
          console.log("[AuthGate] ✅ Token verified successfully");
          storeUserId(data.user_id);
          sessionStorage.removeItem('auth_redirect_count'); // Clear loop detector on success
          restoreAndNavigate(pathname);
        } else {
          throw new Error(data.error || "Validation failed");
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error("[AuthGate] ❌ Token validation error:", err.message);
        
        // If we already have a session, just use it instead of looping
        if (sessionUserId) {
          console.log("[AuthGate] 🔄 Falling back to existing session");
          setState("authenticated");
          return;
        }

        const newCount = redirectCount + 1;
        sessionStorage.setItem('auth_redirect_count', newCount.toString());
        
        const prefix = process.env.NODE_ENV === 'production' ? '/ocd' : '';
        saveReturnPath(pathname, window.location.search);
        setState("redirecting");
        window.location.assign(`${prefix}/token`);
      });
      return;
    }

    // Already authenticated
    if (sessionUserId) {
      setState("authenticated");
      return;
    }

    const prefix = process.env.NODE_ENV === 'production' ? '/ocd' : '';
    console.log(`[AuthGate] 🔒 Unauthenticated access to ${pathname}. Redirecting...`);
    saveReturnPath(pathname, window.location.search);
    setState("redirecting");
    window.location.href = `${prefix}/token`;
  }, [pathname, searchParams, restoreAndNavigate]);

  /**
   * 4. Stale Token Cleanup (Failsafe)
   * Instantly cleans the URL bar if a token is present but user is already authenticated.
   */
  useEffect(() => {
    const urlToken = searchParams.get("token");
    const sessionUserId = getStoredUserId();

    if (sessionUserId && urlToken && state === "authenticated") {
      console.log("[AuthGate] 🧹 Cleaning stale token from URL bar");
      router.replace(pathname);
    }
  }, [pathname, searchParams, state, router]);

  if (state === "loading" || state === "redirecting") {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthGateInner>{children}</AuthGateInner>
    </Suspense>
  );
}
