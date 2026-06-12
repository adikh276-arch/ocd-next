"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Shield, Zap, AlertCircle } from "lucide-react";
import { getEntries, type TrackerEntry } from "@/lib/tracker-storage";
import { useTranslation } from "@/contexts/TranslationContext";

interface Props { refreshKey?: number; }

export default function HistorySection({ refreshKey }: Props) {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<TrackerEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEntries();
      setEntries(data.sort((a, b) => b.date.localeCompare(a.date)));
    };
    fetchData();
  }, [refreshKey]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const getColor = (v: number) => {
    if (v <= 3) return "hsl(0 72% 55%)";
    if (v <= 5) return "hsl(40 85% 58%)";
    if (v <= 7) return "hsl(158 50% 50%)";
    return "hsl(158 64% 40%)";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="action-button group">
          <div className="action-button-icon bg-accent/[0.08] group-hover:bg-accent/[0.15] group-hover:scale-110">
            <Clock className="h-3.5 w-3.5 text-accent" />
          </div>
          <span>{t("history")}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] max-h-[85vh] overflow-y-auto premium-dialog p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              {t("history")}
            </DialogTitle>
          </DialogHeader>
        </div>

        {entries.length === 0 ? (
          <div className="p-6 pt-4">
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground/60">{t("no_entries")}</p>
            </div>
          </div>
        ) : (
          <div className="p-6 pt-4 space-y-2">
            {entries.map((entry, i) => (
              <div
                key={entry.date}
                className="history-entry animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Date header */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-foreground">{formatDate(entry.date)}</span>
                  {entry.avoided && (
                    <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-destructive/[0.08] text-destructive font-semibold uppercase tracking-wider border border-destructive/[0.1]">
                      <AlertCircle className="h-2.5 w-2.5" />
                      {t("avoided_label")}
                    </span>
                  )}
                </div>

                {/* Scores */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3 w-3" style={{ color: getColor(entry.confidence_score) }} />
                    <span className="text-lg font-bold tabular-nums" style={{ color: getColor(entry.confidence_score) }}>
                      {entry.confidence_score}
                    </span>
                    <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">{t("conf")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3 w-3" style={{ color: getColor(entry.decisiveness_score) }} />
                    <span className="text-lg font-bold tabular-nums" style={{ color: getColor(entry.decisiveness_score) }}>
                      {entry.decisiveness_score}
                    </span>
                    <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">{t("dec")}</span>
                  </div>
                </div>

                {/* Reason */}
                {entry.avoided && entry.avoidance_reason && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">{t("reason")}:</span>
                    <span className="text-[11px] text-muted-foreground/70">{entry.avoidance_reason}</span>
                  </div>
                )}

                {/* What stood out */}
                {entry.context && (
                  <div className="mt-2 pt-2 border-t border-border/10">
                    <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider block mb-0.5">{t("what_stood_out")}</span>
                    <p className="text-[11px] text-muted-foreground/70 leading-relaxed">"{entry.context}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

