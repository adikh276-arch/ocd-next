import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Timer, CheckCircle2, MessageCircle, Star, ChevronLeft } from 'lucide-react';
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useActivitySession } from "../hooks/useActivitySession";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useSearchParams } from 'next/navigation';

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("uncertainity_tolerance");
  return (
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex flex-col items-center justify-center shadow-inner text-primary mb-6 mx-auto border-2 border-slate-100">
      {children}
    </div>
  );
}

function ActivityButton({ children, onClick, disabled, variant = 'primary', loading = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; variant?: 'primary' | 'secondary'; loading?: boolean }) {
    const { t } = useTranslation("uncertainity_tolerance");
  const baseStyles = "w-full py-5 rounded-[24px] font-sans text-sm font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/20",
    secondary: "bg-slate-100 text-slate-900 border-2 border-slate-200 hover:bg-slate-200"
  };

  return (
    <button onClick={onClick} disabled={disabled || loading} className={`${baseStyles} ${variants[variant]}`}>
      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
    </button>
  );
}

const Index = () => {
  const { t, i18n } = useTranslation(["uncertainity_tolerance", "common"]);
  const searchParams = useSearchParams();

  // Force language change if lang param is present
  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  // steps must be defined inside Index so it's in scope throughout the component
  const steps = [
    { id: 'welcome', title: t("start", "Start") },
    { id: 'define',  title: t("define", "Define") },
    { id: 'accept',  title: t("accept", "Accept") },
    { id: 'sit',     title: t("sit", "Sit") },
    { id: 'reflect', title: t("reflect", "Reflect") },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const { session, update, complete } = useActivitySession();
  const [saving, setSaving] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);

  const next = () => setStepIndex(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStepIndex(s => Math.max(s - 1, 0));

  const handleFinish = async () => {
    setSaving(true);
    try {
      await complete();
      setShowCompletion(true);
    } catch (e) {
      toast.error("Failed to save progress.");
    } finally {
      setSaving(false);
    }
  };

  // Timer logic for 'Sit' step
  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-uncertainty-tolerance">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          <ActivityHistoryDrawer slug="uncertainity_tolerance" title={t("tolerance_history", "Tolerance History")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("uncertainty_tolerance", "Uncertainty Tolerance")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("rewiring_for_peace", "Rewiring for Peace")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-12 font-sans min-h-[550px] relative flex flex-col justify-center">
          
          {/* Internal Previous Button (<) */}
          {stepIndex > 0 && (
            <button
              onClick={prev}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen", "Previous")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-12 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">
              {t("acceptance_doesnt_mean_you_like_the_thought_it_mea", "Acceptance doesn't mean you like the thought — it means you stop fighting the feeling of uncertainty.")}</p>
          </header>

          <AnimatePresence mode="wait">
            {/* STEP 0: WELCOME */}
            {stepIndex === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full text-center space-y-10"
              >
                <div className="flex justify-center">
                   <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-6xl transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                      🧠
                   </div>
                </div>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t("rewire_your_brain", "Rewire Your Brain")}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    {t("ocd_thrives_on_the_need_for_absolute_certainty_thi", "OCD thrives on the need for absolute certainty. This practice helps you build tolerance for the unknown.")}</p>
                </div>
                <div className="max-w-md mx-auto pt-4">
                  <ActivityButton onClick={next}>{t("begin_practice", "Begin Practice")}</ActivityButton>
                </div>
              </motion.div>
            )}

            {/* STEP 1: DEFINE */}
            {stepIndex === 1 && (
              <motion.div
                key="define"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full space-y-10"
              >
                <header className="text-center space-y-4">
                  <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                     {t("step_01_identification", "Step 01 — Identification")}</label>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("name_the_uncertainty", "Name the Uncertainty")}</h2>
                  <p className="text-sm text-slate-500 font-medium italic px-4">
                    {t("what_is_the_maybe_or_what_if_that_is_bothering_you", "What is the 'maybe' or 'what if' that is bothering you right now?")}</p>
                </header>
                <div className="space-y-8 max-w-2xl mx-auto">
                  <textarea
                    value={session.uncertaintyText}
                    onChange={e => update({ uncertaintyText: e.target.value })}
                    placeholder={t("eg_maybe_i_didnt_lock_the_door_maybe_i_said_someth", "E.g. Maybe I didn't lock the door. Maybe I said something wrong...")}
                    className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-[28px] p-8 text-lg font-medium text-slate-700 outline-none focus:border-primary/40 focus:bg-white transition-all min-h-[160px] resize-none leading-relaxed placeholder:text-slate-300 shadow-inner italic"
                  />
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                        <ShieldAlert size={14} /> {t("discomfort_level_0-10", "Discomfort Level (0–10)")}</label>
                     <div className="flex justify-between gap-2">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <button
                            key={n}
                            onClick={() => update({ discomfortBefore: n })}
                            className={`flex-1 aspect-square rounded-xl font-bold text-xs transition-all border-2 ${
                              session.discomfortBefore === n
                                ? 'bg-primary border-primary text-white scale-110 shadow-lg'
                                : 'bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:bg-slate-50'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                     </div>
                  </div>
                </div>
                <div className="max-w-md mx-auto pt-4">
                  <ActivityButton onClick={next} disabled={!session.uncertaintyText.trim() || session.discomfortBefore === null}>
                    {t("continue", "Continue")}</ActivityButton>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ACCEPT */}
            {stepIndex === 2 && (
              <motion.div
                key="accept"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full text-center space-y-10"
              >
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center text-primary border-2 border-primary/10">
                     <CheckCircle2 size={40} />
                  </div>
                </div>
                <div className="space-y-6 max-w-2xl mx-auto">
                   <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("openness__acceptance", "Openness & Acceptance")}</h2>
                   <p className="text-slate-500 font-medium leading-relaxed italic">
                      {t("acceptance_doesnt_mean_you_like_the_thought_it_mea", "Acceptance doesn't mean you like the thought — it means you stop fighting the")}<span className="font-bold text-primary"> {t("feeling", "feeling")}</span> {t("of_uncertainty", "of uncertainty.")}</p>
                   <div className="bg-slate-50 border-2 border-slate-100 border-dashed rounded-[28px] p-8 text-center italic">
                      <p className="text-lg font-medium text-slate-600 leading-relaxed">
                        {t("i_dont_know_for_sure_and_that_is_okay_for_right_no", "\"I don't know for sure, and that is okay for right now.\"")}</p>
                   </div>
                </div>
                <div className="max-w-md mx-auto pt-4">
                   <ActivityButton onClick={next}>{t("im_ready", "I'm Ready")}</ActivityButton>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SIT */}
            {stepIndex === 3 && (
              <motion.div
                key="sit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full text-center space-y-10"
              >
                <div className="flex justify-center">
                   <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center text-primary border-2 border-primary/10">
                      <Timer size={40} />
                   </div>
                </div>
                <div className="space-y-4 max-w-2xl mx-auto">
                   <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("sit_with_the_maybe", "Sit With the Maybe")}</h2>
                   <p className="text-sm text-slate-500 font-medium italic">
                      {t("dont_check_dont_research_just_sit_with_the_feeling", "Don't check. Don't research. Just sit with the feeling for 2 minutes.")}</p>
                </div>
                
                <div className="py-8 max-w-2xl mx-auto">
                  {!isTimerActive && timer === 120 ? (
                    <ActivityButton variant="secondary" onClick={() => setIsTimerActive(true)}>
                      {t("start_2_minute_timer", "Start 2-Minute Timer")}
                    </ActivityButton>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl font-black text-primary tabular-nums tracking-tighter">
                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                      </div>
                      <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest">
                         {timer > 0 ? t("breathe_slowly", "Breathe slowly...") : t("timer_complete", "Timer Complete")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="max-w-md mx-auto pt-4">
                   <ActivityButton onClick={next} disabled={timer > 0 && isTimerActive}>
                     {timer === 0 ? t("i_survived_it", "I Survived It") : t("skip_to_reflection", "Skip to Reflection")}
                   </ActivityButton>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REFLECT */}
            {stepIndex === 4 && (
              <motion.div
                key="reflect"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full space-y-10"
              >
                <header className="text-center space-y-4">
                  <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                     {t("final_step_integration", "Final Step — Integration")}</label>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("session_reflection", "Session Reflection")}</h2>
                  <p className="text-sm text-slate-500 font-medium italic px-4">
                     {t("how_did_that_feel_usually_the_anxiety_peaks_and_th", "How did that feel? Usually the anxiety peaks and then starts to ease — that's your brain learning.")}</p>
                </header>
                <div className="space-y-8 max-w-2xl mx-auto">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       <MessageCircle size={14} /> {t("brief_note", "Brief Note")}</label>
                    <textarea
                      value={session.reflectionNote}
                      onChange={e => update({ reflectionNote: e.target.value })}
                      placeholder={t("eg_it_was_hard_at_first_but_i_didnt_check_i_feel_s", "E.g. It was hard at first, but I didn't check. I feel slightly more at ease...")}
                      className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-[28px] p-8 text-lg font-medium text-slate-700 outline-none focus:border-primary/40 focus:bg-white transition-all min-h-[160px] resize-none leading-relaxed placeholder:text-slate-300 shadow-inner italic"
                    />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                        <Star size={14} /> {t("new_discomfort_level", "New Discomfort Level")}</label>
                     <div className="flex justify-between gap-2">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <button
                            key={n}
                            onClick={() => update({ discomfortAfter: n })}
                            className={`flex-1 aspect-square rounded-xl font-bold text-xs transition-all border-2 ${
                              session.discomfortAfter === n
                                ? 'bg-primary border-primary text-white scale-110 shadow-lg'
                                : 'bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:bg-slate-50'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                     </div>
                  </div>
                </div>
                <div className="max-w-md mx-auto pt-10">
                  <ActivityButton onClick={handleFinish} loading={saving} disabled={session.discomfortAfter === null}>
                    {t("finish_practice", "Finish Practice")}</ActivityButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌟"
        title={t("tolerance_built", "Tolerance Built")}
        description={t("you_showed_up_for_yourself_today_sitting_with_unce", "You showed up for yourself today. Sitting with uncertainty is a real skill — and you just practiced it.")}
        onStartOver={() => setStepIndex(0)}
        startOverText={t("practice_again", "Practice Again")}
        onDone={() => window.history.back()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
