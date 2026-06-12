"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userId: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(sessionStorage.getItem("user_id"));
  const [isLoading, setIsLoading] = useState(!userId);

  useEffect(() => {
    if (userId) {
      setIsLoading(false);
      return;
    }

    const validateToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        window.location.href = "/token";
        return;
      }

      try {
        const response = await fetch("https://api.mantracare.com/user/user-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error("Handshake failed");

        const data = await response.json();
        // user_id might be numeric or uuid, we store as string
        const id = data.user_id?.toString();
        if (!id) throw new Error("Invalid response");

        sessionStorage.setItem("user_id", id);
        setUserId(id);

        // Clean URL
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        window.history.replaceState({}, "", url.toString());

      } catch (error) {
        console.error("Auth Error:", error);
        window.location.href = "/token";
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
