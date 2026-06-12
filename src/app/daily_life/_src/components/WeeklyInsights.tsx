import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, BarChart3, Loader2, Calendar, TrendingUp, AlertCircle, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WeeklyInsightsProps {
  onBack: () => void;
}

const WeeklyInsights = ({ onBack }: WeeklyInsightsProps) => {
    const { t } = useTranslation("daily_life");
      const apiBase = '/ocd/api';
  const [period, setPeriod] = useState<string>("this-week");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
        const res = await fetch(`${apiBase}/logs?slug=daily_life${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
        const result = await res.json();
        if (result.success) {
          setLogs(result.data);
        }
      } catch (e) {
        console.error("Failed to fetch logs:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const insights = useMemo(() => {
    if (logs.length === 0) return null;

    const totals: Record<string, number> = {};
    const counts: Record<string, number> = {};
    
    // Areas we track - stable keys
    const trackingKeys = ["work", "social", "sleep", "selfcare"];

    logs.forEach(log => {
      trackingKeys.forEach(key => {
        const val = log.payload[key];
        if (typeof val === 'number') {
          totals[key] = (totals[key] || 0) + val;
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    });

    const averages: Record<string, number> = {};
    trackingKeys.forEach(key => {
      if (counts[key]) {
        averages[key] = Number((totals[key] / counts[key]).toFixed(1));
      }
    });

    const mostAffected = Object.entries(averages).sort((a, b) => b[1] - a[1])[0];

    return {
      averages,
      mostAffected,
      entryCount: logs.length
    };
  }, [logs]);

  const periods = [
    { id: "this-week", label: t("this_week") },
    { id: "last-week", label: t("last_week") },
    { id: "2-weeks", label: t("2_weeks_ago") },
  ];

  return (
    <div className="w-full space-y-8">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4 py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-widest">{t("harvesting_insights")}</p>
        </div>
      ) : !insights ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 w-full">
          <BarChart3 className="w-10 h-10 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-[13px] font-semibold text-center px-8">
            {t("no_check-ins_found_for_this_period_yet")}</p>
          <button 
            onClick={onBack}
            className="mt-6 text-[11px] font-bold text-primary uppercase tracking-widest hover:underline"
          >
            {t("return_to_tracker")}</button>
        </div>
      ) : (
        <div className="space-y-10 w-full">
          {/* Period selector */}
          <div className="flex gap-1 p-1 mb-4 bg-slate-200/50 rounded-2xl border border-slate-200 shadow-sm w-full max-w-md mx-auto">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                  period === p.id
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Top Analysis Card */}
            <div className="bg-primary text-primary-foreground rounded-[24px] p-8 shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col justify-center">
               <TrendingUp className="absolute -top-4 -right-4 w-32 h-32 text-white opacity-10" />
               <div className="flex items-center gap-2 mb-4 text-white/70 relative z-10">
                  <AlertCircle size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t("primary_focus_area")}</span>
               </div>
               <p className="text-3xl font-bold mb-3 uppercase tracking-tight font-heading relative z-10">
                  {insights.mostAffected ? t(insights.mostAffected[0]) : 'N/A'}
               </p>
               <p className="font-body text-[14px] text-white/90 leading-relaxed italic relative z-10">
                  {t("this_area_was_impacted_the_most_by_ocd_this_week_a")}</p>
            </div>

            {/* Area Averages Section */}
            <div className="w-full">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                  <Zap size={14} className="text-amber-500 fill-amber-500" />
                  {t("area_impact_analysis")}</h3>
               
               <div className="space-y-8">
                  {Object.entries(insights.averages).map(([key, avg]) => (
                    <div key={key} className="space-y-3">
                       <div className="flex justify-between items-end px-1">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{t(key)}</span>
                          <span className="text-sm font-bold text-slate-900 tabular-nums">{avg}<span className="text-[10px] text-slate-400 ml-0.5">/10</span></span>
                       </div>
                       <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                             className={`h-full rounded-full transition-all duration-1000 ${
                                avg > 7 ? 'bg-red-500' : avg > 4 ? 'bg-amber-500' : 'bg-primary'
                             }`}
                             style={{ width: `${(avg / 10) * 100}%` }}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 text-center">
             <p className="font-body text-[13px] text-slate-500 leading-relaxed italic max-w-lg mx-auto">
               {t("each_day_you_track_is_a_step_towards_understanding")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyInsights;
