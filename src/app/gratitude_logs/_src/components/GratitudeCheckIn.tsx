import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, Heart } from "lucide-react";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";

const GratitudeHeart = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const GratitudeCheckIn = () => {
  const { t, i18n } = useTranslation("gratitude_logs");
  const heartColors = ["34d399", "60a5fa", "f472b6"];

  const apiBase = '/ocd/api';
  const [items, setItems] = useState(["", "", ""]);
  const [showCompletion, setShowCompletion] = useState(false);

  const allFilled = items.some((item) => item.trim().length > 0);

  const todayDate = new Date().toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleChange = (index: number, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async () => {
    const nonEmpty = items.filter((i) => i.trim().length > 0);
    try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'gratitude_logs',
          payload: { items: nonEmpty, date: new Date().toISOString() },
        }),
      });
    } catch (e) {
      console.error('Failed to save gratitude log:', e);
    }
    setShowCompletion(true);
  };

  const handleReset = () => {
    setItems(["", "", ""]);
    setShowCompletion(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-gratitude_logs">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
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
          <ActivityHistoryDrawer slug="gratitude_logs" title={t("gratitude_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("gratitude_log")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("cultivating_joy__resilience")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 font-sans">
          
          {/* Date Header inside card */}
          <header className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
               {todayDate}
            </h2>
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("write_down_three_things_you_are_thankful_for_today")}</p>
          </header>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block flex items-center gap-2">
                <Heart size={14} className="text-primary fill-primary" /> {t("todays_reflections")}</label>
              <div className="space-y-4">
                {heartColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200/80 p-3 rounded-2xl transition-all focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <GratitudeHeart color={color} />
                    </div>
                    <input
                      className="flex-1 bg-transparent border-none text-base font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:ring-0 italic h-12"
                      placeholder={t("something_im_grateful_for")}
                      value={items[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!allFilled}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-20 shadow-lg shadow-primary/10 group overflow-hidden relative"
                >
                  <span className="relative z-10">{t("log_my_gratitude")}</span>
                  <CheckCircle size={18} className="relative z-10" />
                </button>
              </div>
            </div>

            <div className="flex flex-col h-full justify-center space-y-8 bg-slate-50/50 rounded-[28px] p-8 border-2 border-slate-200/80 border-dashed">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{t("mindfulness_practice")}</h3>
                <p className="text-[15px] font-medium text-slate-600 leading-relaxed italic">
                  {t("gratitude_is_a_powerful_tool_in_recovery_by_focusi")}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Heart size={18} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t("cultivating_resilience")}</span>
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed">
                  {t("regularly_noting_three_positive_things_helps_build")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌻"
        title={t("gratitude_logged")}
        description={t("each_moment_of_gratitude_is_a_seed_of_joy_youre_cu")}
        onStartOver={handleReset}
        startOverText={t("log_another")}
        onDone={() => window.history.back()}
        showHome={false}
      />
    </div>
  );
};

export default GratitudeCheckIn;
