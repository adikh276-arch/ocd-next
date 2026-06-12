"use client";

import { useState, useEffect } from "react";
import { History, Loader2, Calendar } from "lucide-react";
import { getStoredUserId } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ActivityHistoryDrawerProps {
  slug: string;
  title?: string;
  className?: string;
}

export function ActivityHistoryDrawer({ slug, title, className = "" }: ActivityHistoryDrawerProps) {
  const { t } = useTranslation("common");
  const displayTitle = title || t("history");
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchLogs();
    }
  }, [open, slug]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const userId = getStoredUserId() || "";
      const apiBase = '/ocd/api';
      const url = `${apiBase}/logs?slug=${slug}${userId ? `&user_id=${userId}` : ''}`;
      const res = await fetch(url);
      const result = await res.json();
      if (result.success && result.data) {
        setLogs(result.data);
      }
    } catch (e) {
      console.error("Failed to fetch logs:", e);
    } finally {
      setLoading(false);
    }
  };

  const renderPayload = (payload: any, level = 0) => {
    if (payload === null || payload === undefined) return "";
    if (typeof payload !== "object") return String(payload);

    if (Array.isArray(payload)) {
      return (
        <ul className="list-disc list-inside space-y-2 my-1 pl-1">
          {payload.map((item, idx) => (
            <li key={idx} className="text-foreground/90 font-medium text-sm marker:text-primary">
              {typeof item === "object" ? (
                <div className="pl-3 mt-1.5 border-l-2 border-primary/10">
                  {renderPayload(item, level + 1)}
                </div>
              ) : (
                String(item)
              )}
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <div className={`space-y-3 flex flex-col ${level === 0 ? "mt-2" : "mt-1"}`}>
        {Object.entries(payload).map(([key, value]) => {
          // Make keys more readable: "totalDailyMins" -> "total daily mins"
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
          return (
            <div key={key} className={`flex flex-col border-l-2 ${level === 0 ? "border-primary/20" : "border-primary/10"} pl-2.5`}>
              <span className="text-muted-foreground font-semibold uppercase text-[10px] tracking-widest mb-1 opacity-80">{formattedKey}</span>
              <div className="text-foreground/90 font-medium text-[13px] whitespace-pre-wrap leading-relaxed">
                  {typeof value === 'object' ? renderPayload(value, level + 1) : String(value)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button 
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-50 transition-colors z-50 ${className}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          <History size={16} /> {t("history")}
        </button>
      </SheetTrigger>
      
        <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto max-w-[100vw]">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="flex items-center gap-2">
              <History className="text-primary" />
              {displayTitle}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Overview of your past sessions and progress for this activity.
            </SheetDescription>
          </SheetHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="animate-spin mb-4" size={24} />
              <p>{t("loading_history")}</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed border-border">
              <p>{t("no_history_found")}</p>
              <p className="text-sm mt-1">{t("complete_activity_to_see")}</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 pb-2 border-b border-border/50">
                  <Calendar size={12} />
                  {new Date(log.created_at).toLocaleString(undefined, { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </div>
                {renderPayload(log.payload)}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
