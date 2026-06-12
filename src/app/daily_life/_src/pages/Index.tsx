import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useState, useEffect } from "react";

import { BarChart3, CheckCircle, Info, TrendingUp, ArrowLeft, Loader2, Calendar } from "lucide-react";
import ImpactSlider from "@/app/daily_life/_src/components/ImpactSlider";
import WeeklyInsights from "@/app/daily_life/_src/components/WeeklyInsights";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
type View = "daily" | "history" | "insights";

const Index = () => {
    const { t, i18n } = useTranslation(["daily_life", "common"]);
    const categories = [
      { id: "work", emoji: "💼", label: t("work__study") },
      { id: "social", emoji: "👥", label: t("relationships__social") },
      { id: "sleep", emoji: "😴", label: t("sleep__routine") },
      { id: "selfcare", emoji: "❤️", label: t("self-care") },
    ];
      
  const apiBase = '/ocd/api';
  const [view, setView] = useState<View>("daily");
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [values, setValues] = useState<Record<string, number>>({
    work: 5,
    social: 5,
    sleep: 5,
    selfcare: 5,
  });

  const todayDate = new Date().toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const res = await fetch(`${apiBase}/logs?slug=daily_life${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
      const result = await res.json();
      if (result.success) setLogs(result.data);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setLoadingLogs(false); 
    }
  };

  useEffect(() => {
    if (view === "history") {
       fetchLogs();
    }
  }, [view]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'daily_life',
          payload: { ...values, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
      fetchLogs();
    } catch {
      // Error handling
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setValues({
      work: 5,
      social: 5,
      sleep: 5,
      selfcare: 5,
    });
    setView("daily");
    setShowCompletion(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-daily_life">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center">
          <button 
            onClick={() => {
              if (window.parent !== window) {
                 window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
              } else {
                 window.location.href = 'https://web.mantracare.com';
              }
             }}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
          
        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("daily_life")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("ocd_impact_tracking")}</p>
        </div>

        <div className="flex gap-1 p-1 bg-slate-200/50 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto w-full">
           <button 
             onClick={() => setView("daily")} 
             className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${view === "daily" ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
           >
              {t("log")}</button>
           <button 
             onClick={() => setView("history")} 
             className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${view === "history" ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
           >
              {t("history")}</button>
            <button 
              onClick={() => setView("insights")} 
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${view === "insights" ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
           >
              {t("insights")}</button>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 font-sans">
          {view === "history" ? (
            <div className="w-full flex-1 flex flex-col min-h-[400px]">
              <div className="text-center mb-8">
                 <h1 className="font-heading text-2xl font-bold text-foreground mb-2">{t("habit_history")}</h1>
                 <p className="font-body text-[14px] text-muted-foreground leading-relaxed">{t("track_your_consistency_over_time")}</p>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[50vh] pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                 {loadingLogs ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">{t("retrieving_history")}</p>
                    </div>
                 ) : logs.length === 0 ? (
                    <div className="py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
                      <Calendar className="w-10 h-10 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground text-[13px] font-semibold text-center px-6">
                        {t("no_daily_entries_found_yet")}</p>
                    </div>
                 ) : (
                    <div className="space-y-4">
                       {logs.map((log) => (
                          <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex items-center justify-between border-b border-border/20 pb-2 mb-3">
                               <div className="flex items-center gap-2 text-muted-foreground font-bold">
                                  <Calendar size={12} />
                                  <span className="text-[11px]">
                                     {new Date(log.created_at).toLocaleDateString(i18n.language, { dateStyle: 'medium' })}
                                  </span>
                               </div>
                               <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">
                                  {new Date(log.created_at).toLocaleTimeString(i18n.language, { timeStyle: 'short' })}
                               </span>
                            </div>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                               {Object.entries(log.payload).filter(([k]) => k !== 'date').map(([key, val]) => (
                                  <div key={key}>
                                     <p className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-0.5">{key}</p>
                                     <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-foreground">{val as any}</span>
                                        <span className="text-[9px] text-muted-foreground/50">/10</span>
                                     </div>
                                  </div>
                               ))}
                            </div>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
            </div>
          ) : view === "insights" ? (
            <WeeklyInsights onBack={() => setView("daily")} />
          ) : (
            <div className="w-full flex flex-col items-center">
              {/* Date Header inside card */}
              <header className="text-center space-y-3 mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                   {todayDate}
                </h2>
                <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("track_your_daily_focus_and_notice_the_impact_of_yo")}</p>
              </header>
              {/* Sliders Area - Now in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
                {categories.map((cat) => (
                  <ImpactSlider
                    key={cat.id}
                    emoji={cat.emoji}
                    label={cat.label}
                    value={values[cat.id]}
                    onChange={(v) => setValues((prev) => ({ ...prev, [cat.id]: v }))}
                  />
                ))}
              </div>

              {/* Save button */}
              <div className="w-full mt-10 shrink-0">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CheckCircle size={18} />
                  )}
                  {saving ? t("common:saving") : t("common:save")}
                </button>

                <div className="flex items-center justify-center gap-2 text-muted-foreground/60 mt-4">
                  <Info size={12} />
                  <p className="text-[10px] font-bold uppercase tracking-wider">{t("daily_check-ins_build_long-term_recovery")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🧠"
        title={t("consistency_is_key")}
        description={t("every_daily_check-in_builds_a_clearer_picture_of_y")}
        showHome={false}
        onStartOver={reset}
      />
    </div>
  );
};

export default Index;
