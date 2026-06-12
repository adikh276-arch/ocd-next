"use client";
import React, { useState, useEffect, useRef } from "react";
import i18n, { SUPPORTED_LANGUAGES } from "@/lib/i18n";

export function LanguageDropdown() {
  const [currentLang, setCurrentLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sync language from URL param on mount
  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");
    const activeLang = langParam || i18n.language || "en";
    const normalised = activeLang.split("-")[0];
    const matched = SUPPORTED_LANGUAGES.find(
      (l) => l.code === normalised || l.code === activeLang
    );
    const resolvedCode = matched ? matched.code : "en";
    if (resolvedCode !== i18n.language) {
      i18n.changeLanguage(resolvedCode);
    }
    setCurrentLang(resolvedCode);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setCurrentLang(code);
    setOpen(false);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", code);
      window.history.replaceState({}, "", url.toString());
    } catch (_) {}
  };

  if (!mounted) return null;

  const current =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) ||
    SUPPORTED_LANGUAGES[0];

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: "12px",
        right: "12px",
        zIndex: 9999,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch language"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px 6px 10px",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.32)",
          borderRadius: "999px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
          color: "inherit",
          boxShadow:
            "0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.2)",
          transition: "background 0.2s, box-shadow 0.2s",
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
      >
        <span style={{ fontSize: "15px", lineHeight: 1 }}>🌐</span>
        <span style={{ fontSize: "14px", lineHeight: 1 }}>{current.flag}</span>
        <span>{current.name}</span>
        <span
          style={{
            fontSize: "9px",
            opacity: 0.65,
            marginLeft: "2px",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(15, 15, 25, 0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "14px",
            padding: "6px",
            minWidth: "190px",
            maxHeight: "340px",
            overflowY: "auto",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
            zIndex: 10000,
            scrollbarWidth: "none",
          }}
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleChange(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "8px 10px",
                  background: isActive
                    ? "rgba(255,255,255,0.13)"
                    : "transparent",
                  border: "none",
                  borderRadius: "9px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                  textAlign: "left",
                  transition: "background 0.12s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>
                  {lang.flag}
                </span>
                <span style={{ flex: 1 }}>{lang.name}</span>
                {isActive && (
                  <span
                    style={{
                      fontSize: "11px",
                      opacity: 0.6,
                      color: "#4ade80",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
