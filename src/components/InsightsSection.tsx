"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus, BarChart3 } from "lucide-react";
import { getLast7DaysEntries, type TrackerEntry } from "@/lib/tracker-storage";
import { useTranslation } from "@/contexts/TranslationContext";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

interface Props { refreshKey?: number; }

export default function InsightsSection({ refreshKey }: Props) {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<TrackerEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLast7DaysEntries();
      setEntries(data);
    };
    fetchData();
  }, [refreshKey]);

  const chartData = entries.map((e) => ({
    day: e.date.slice(5),
    [t("confidence")]: e.confidence_score,
    [t("decisiveness")]: e.decisiveness_score,
  }));

  const avoidCount = entries.filter((e) => e.avoided).length;
  const confAvg = entries.length > 0 ? (entries.reduce((s, e) => s + e.confidence_score, 0) / entries.length).toFixed(1) : "â€”";
  const decAvg = entries.length > 0 ? (entries.reduce((s, e) => s + e.decisiveness_score, 0) / entries.length).toFixed(1) : "â€”";

  const getTrend = (key: "confidence_score" | "decisiveness_score") => {
    if (entries.length < 3) return "stable";
    const half = Math.floor(entries.length / 2);
    const first = entries.slice(0, half).reduce((s, e) => s + e[key], 0) / half;
    const second = entries.slice(half).reduce((s, e) => s + e[key], 0) / (entries.length - half);
    if (second - first > 0.5) return "up";
    if (first - second > 0.5) return "down";
    return "stable";
  };

  const confTrend = getTrend("confidence_score");
  const decTrend = getTrend("decisiveness_score");

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <ArrowUpRight className="h-3 w-3 text-primary" />;
    if (trend === "down") return <ArrowDownRight className="h-3 w-3 text-destructive" />;
    return <Minus className="h-3 w-3 text-muted-foreground/50" />;
  };

  const trendColor = (trend: string) => {
    if (trend === "up") return "text-primary";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground/60";
  };

  const reasons = entries.filter(e => e.avoided && e.avoidance_reason).map(e => e.avoidance_reason!);
  const reasonCounts: Record<string, number> = {};
  reasons.forEach(r => { reasonCounts[r] = (reasonCounts[r] || 0) + 1; });
  const topReason = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="action-button group">
          <div className="action-button-icon bg-primary/[0.08] group-hover:bg-primary/[0.15] group-hover:scale-110">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
          </div>
          <span>{t("view_insights")}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[85vh] overflow-y-auto premium-dialog p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {t("view_insights")}
            </DialogTitle>
          </DialogHeader>
        </div>

        {entries.length === 0 ? (
          <div className="p-6 pt-4">
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground/60">{t("keep_logging")}</p>
            </div>
          </div>
        ) : (
          <div className="p-6 pt-4 space-y-5">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="stat-card">
                <p className="stat-label">{t("avg_confidence")}</p>
                <div className="flex items-baseline gap-2">
                  <span className="stat-value">{confAvg}</span>
                  <TrendIcon trend={confTrend} />
                </div>
                <p className={`text-[10px] mt-1 ${trendColor(confTrend)}`}>
                  {t("conf_trend", { trend: t(`trend_${confTrend}`) })}
                </p>
              </div>
              <div className="stat-card">
                <p className="stat-label">{t("avg_decisiveness")}</p>
                <div className="flex items-baseline gap-2">
                  <span className="stat-value">{decAvg}</span>
                  <TrendIcon trend={decTrend} />
                </div>
                <p className={`text-[10px] mt-1 ${trendColor(decTrend)}`}>
                  {t("dec_trend", { trend: t(`trend_${decTrend}`) })}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-foreground tracking-wide">{t("seven_day_trends")}</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="confFill2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(158 64% 40%)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="hsl(158 64% 40%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="decFill2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(40 85% 58%)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="hsl(40 85% 58%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" opacity={0.15} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                        fontSize: "12px",
                        boxShadow: "0 12px 40px hsl(220 25% 10% / 0.15)",
                        padding: "8px 12px",
                      }}
                    />
                    <Area type="monotone" dataKey={t("confidence")} stroke="hsl(158 64% 40%)" strokeWidth={2.5} fill="url(#confFill2)" dot={{ r: 3.5, fill: "hsl(158 64% 40%)", stroke: "hsl(var(--card))", strokeWidth: 2 }} activeDot={{ r: 5, stroke: "hsl(158 64% 40%)", strokeWidth: 2, fill: "hsl(var(--card))" }} />
                    <Area type="monotone" dataKey={t("decisiveness")} stroke="hsl(40 85% 58%)" strokeWidth={2.5} fill="url(#decFill2)" dot={{ r: 3.5, fill: "hsl(40 85% 58%)", stroke: "hsl(var(--card))", strokeWidth: 2 }} activeDot={{ r: 5, stroke: "hsl(40 85% 58%)", strokeWidth: 2, fill: "hsl(var(--card))" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-5 justify-center">
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
                  <span className="w-2.5 h-[3px] rounded-full" style={{ background: "hsl(158 64% 40%)" }} />
                  {t("confidence")}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
                  <span className="w-2.5 h-[3px] rounded-full" style={{ background: "hsl(40 85% 58%)" }} />
                  {t("decisiveness")}
                </span>
              </div>
            </div>

            {/* Avoidance */}
            <div className="avoidance-insight-card">
              <h3 className="text-xs font-bold text-foreground tracking-wide mb-2">{t("avoidance_rate")}</h3>
              {avoidCount === 0 ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-xs text-muted-foreground/70">{t("no_avoidance")}</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${Math.max((avoidCount / entries.length) * 100, 8)}%`,
                            background: avoidCount / entries.length > 0.5
                              ? "linear-gradient(90deg, hsl(0 72% 55%), hsl(0 60% 65%))"
                              : "linear-gradient(90deg, hsl(40 85% 58%), hsl(40 75% 65%))",
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground tabular-nums">
                      {avoidCount}/{entries.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/60">
                    {t("avoidance_summary", { count: avoidCount, total: entries.length })}
                  </p>
                  {topReason && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive/[0.06] border border-destructive/[0.1]">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50">{t("top_avoidance_reason")}:</span>
                      <span className="text-[11px] font-semibold text-destructive">{topReason}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Correlation */}
            {entries.length >= 3 && (() => {
              const highConf = entries.filter(e => e.confidence_score >= 7);
              const highConfAvoid = highConf.filter(e => e.avoided).length;
              if (highConf.length >= 2 && highConfAvoid < avoidCount) {
                return (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-primary/[0.03] border border-primary/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                    <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{t("high_conf_low_avoid")}</p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

