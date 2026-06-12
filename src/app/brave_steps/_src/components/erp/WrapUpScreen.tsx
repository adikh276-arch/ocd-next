import { useState } from "react";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WrapUpScreenProps {
  beforeAnxiety: number;
  surface: string;
  duration: number;
  onTryHarder: () => void;
  onDone: () => void;
  onBack: () => void;
  onReset: () => void;
}

const WrapUpScreen = ({ beforeAnxiety, surface, duration, onTryHarder, onDone, onBack, onReset }: WrapUpScreenProps) => {
    const { t } = useTranslation("brave_steps");
      const [afterAnxiety] = useState(Math.max(1, beforeAnxiety - 4));
  const drop = beforeAnxiety - afterAnxiety;
  const [note, setNote] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);

  const saveSession = async () => {
    try {
      const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId, activity_slug: 'brave_steps',
          payload: {
            surface,
            duration,
            anxiety_before: beforeAnxiety,
            anxiety_after: afterAnxiety,
            anxiety_drop: drop,
            note,
            completed_at: new Date().toISOString(),
          },
        }),
      });
    } catch (e) {
      console.error('Failed to save brave_steps session:', e);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* History Toggle */}
      <div className="absolute right-6 top-8 z-30">
        <ActivityHistoryDrawer slug="brave_steps" title={t("brave_steps_history")} />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t("how_do_you_feel_now")}</h1>
          <p className="text-lg text-slate-500 font-medium italic">{t("reflect_on_your_progress")}</p>
        </div>

        {/* Results Stats */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-8 bg-slate-50 rounded-[32px] border-2 border-slate-100 shadow-inner gap-8">
          <div className="text-center flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{t("before")}</p>
            <p className="text-4xl font-black text-slate-900">{beforeAnxiety}</p>
          </div>
          <div className="hidden md:block h-12 w-[1px] bg-slate-200" />
          <div className="text-center flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{t("after")}</p>
            <p className="text-4xl font-black text-slate-900">{afterAnxiety}</p>
          </div>
          <div className="hidden md:block h-12 w-[1px] bg-slate-200" />
          <div className="text-center flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{t("dropped")}</p>
            <p className="text-4xl font-black text-emerald-500">-{drop}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4 text-left">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">{t("what_did_you_notice")}</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("write_anything_from_this_session")}
                className="w-full bg-white border-2 border-slate-100 rounded-[24px] p-6 text-lg text-slate-900 placeholder:text-slate-300 resize-none h-40 transition-all focus:outline-none focus:border-primary/30"
              />
           </div>

           <div className="space-y-6">
              <div className="bg-primary/5 rounded-[24px] p-6 border-2 border-primary/10 flex items-center gap-4 text-left">
                <div className="text-4xl">🏅</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-0.5">{t("badge_unlocked")}</p>
                  <p className="text-xl font-black text-primary">{t("brave_hands")}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[24px] p-6 border-2 border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("surface")}</span>
                  <span className="text-sm font-bold text-slate-900">{surface}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("time_held")}</span>
                  <span className="text-sm font-bold text-slate-900">{duration} {t("mins")}</span>
                </div>
              </div>
           </div>
        </div>

        <div className="w-full max-w-md pt-6 space-y-4">
          <button
            onClick={async () => { await saveSession(); setShowCompletion(true); }}
            className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <CheckCircle2 size={20} /> {t("im_done")}</button>
          <button
            onClick={async () => { await saveSession(); onTryHarder(); }}
            className="w-full py-4 rounded-[24px] bg-white text-slate-600 border-2 border-slate-100 font-bold text-sm uppercase tracking-widest transition-all hover:bg-slate-50 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> {t("try_a_harder_level")}</button>
        </div>
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🦁"
        title={t("bravery_unlocked")}
        description={t("you_faced_your_fears_and_won_every_exposure_makes_")}
        showHome={false}
        onStartOver={onReset}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default WrapUpScreen;
