"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

/**
 * Auth Utilities & Context
 * 
 * Strategy:
 * 1. user_id -> sessionStorage (Handshake Protocol)
 * 2. APP_REDIRECT_PATH -> localStorage (Persistent Redirection)
 */

export const AUTH_USER_KEY = 'user_id';
export const REDIRECT_KEY = 'APP_REDIRECT_PATH';
export const RETURN_PATH_QUERY = 'return_path';

// --- Helper Functions ---

const safeStorage = {
  getItem: (storage: Storage, key: string): string | null => {
    try { return storage.getItem(key); } catch (e) { return null; }
  },
  setItem: (storage: Storage, key: string, value: string): void => {
    try { storage.setItem(key, value); } catch (e) { /* ignore */ }
  },
  removeItem: (storage: Storage, key: string): void => {
    try { storage.removeItem(key); } catch (e) { /* ignore */ }
  }
};

export function getStoredUserId(): string | null {
  if (typeof window === 'undefined') return null;
  // Try sessionStorage first
  let id = safeStorage.getItem(sessionStorage, AUTH_USER_KEY);
  // Fallback to localStorage for iframe persistence
  if (!id) id = safeStorage.getItem(localStorage, AUTH_USER_KEY);
  return id;
}

export function storeUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  // Store in both for maximum reliability in iframes
  safeStorage.setItem(sessionStorage, AUTH_USER_KEY, userId);
  safeStorage.setItem(sessionStorage, 'ocd_user_id', userId);
  safeStorage.setItem(localStorage, AUTH_USER_KEY, userId);
  safeStorage.setItem(localStorage, 'ocd_user_id', userId);
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  safeStorage.removeItem(sessionStorage, AUTH_USER_KEY);
  safeStorage.removeItem(sessionStorage, 'ocd_user_id');
  safeStorage.removeItem(localStorage, AUTH_USER_KEY);
  safeStorage.removeItem(localStorage, 'ocd_user_id');
  safeStorage.removeItem(localStorage, REDIRECT_KEY);
}

/**
 * Saves the intended deep link to localStorage so it survives 
 * the cross-domain redirect to the Auth Portal.
 */
export function saveReturnPath(pathname: string, search: string = ""): void {
  if (typeof window === 'undefined') return;
  
  // Never save the token bridge or logout paths
  if (pathname.includes('/token') || pathname.includes('/logout')) return;
  
  const fullPath = pathname + search;
  console.log(`[Auth] 💾 Saving return path to localStorage: ${fullPath}`);
  safeStorage.setItem(localStorage, REDIRECT_KEY, fullPath);
}

export function getReturnPath(): string | null {
  if (typeof window === 'undefined') return null;
  return safeStorage.getItem(localStorage, REDIRECT_KEY);
}

/**
 * Retrieves and clears the saved path from localStorage.
 */
export function consumeReturnPath(): string | null {
  if (typeof window === 'undefined') return null;
  const path = safeStorage.getItem(localStorage, REDIRECT_KEY);
  if (path) {
    console.log(`[Auth] 🧹 Consuming return path from localStorage: ${path}`);
    safeStorage.removeItem(localStorage, REDIRECT_KEY);
  }
  return path;
}

// --- Context Provider ---

interface AuthContextType {
  userId: string | null;
  login: (newUserId: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUserId();
    if (stored) setUserId(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback((newUserId: string) => {
    storeUserId(newUserId);
    setUserId(newUserId);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
