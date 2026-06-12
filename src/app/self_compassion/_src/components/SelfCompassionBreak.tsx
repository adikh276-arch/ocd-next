import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { Heart, User, MessageCircle, ChevronRight, Activity, Info, CheckCircle2, ArrowLeft, ChevronLeft } from "lucide-react";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

const BreathingHeart = () => {
    const { t } = useTranslation("self_compassion");
      const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === "inhale" ? "exhale" : "inhale"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <motion.div 
        animate={{ scale: phase === "inhale" ? 1.2 : 0.9, opacity: phase === "inhale" ? 1 : 0.7 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-32 h-32 bg-primary/5 rounded-[40px] flex items-center justify-center shadow-xl shadow-primary/10">
           <Heart size={64} fill="currentColor" className="text-primary opacity-20" />
           <Heart size={48} className="text-primary absolute" fill="currentColor" strokeWidth={0} />
        </div>
      </motion.div>
      
      <div className="space-y-1 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
            {phase === "inhale" ? t("inhale") : t("exhale")}
         </p>
         <p className="text-[11px] font-medium text-slate-300 italic">{t("let_the_feeling_settle")}</p>
      </div>
    </div>
  );
};

const SelfCompassionBreak = () => {
    const { t } = useTranslation("self_compassion");
      const [screen, setScreen] = useState(1);
  const [personName, setPersonName] = useState("");
  const [selectedPhrase, setSelectedPhrase] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'self_compassion',
          payload: { 
            personName, 
            phrase: phrases[selectedPhrase!], 
            date: new Date().toISOString() 
          },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log practice:", e);
    } finally {
      setSaving(false);
    }
  };

  const phrases = [
    t("may_i_be_kind_to_myself_in_this_moment"),
    t("may_i_accept_myself_as_i_am"),
    t("may_i_give_myself_the_compassion_i_need"),
    t("may_i_find_peace_in_this_breath"),
  ];

  const reset = () => {
    setScreen(1);
    setPersonName("");
    setSelectedPhrase(null);
    setShowCompletion(false);
  };

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

   return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-self-compassion">
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
          <ActivityHistoryDrawer slug="self_compassion" title={t("compassion_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("self-compassion_break")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("emotional_care")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 font-sans min-h-[500px] flex flex-col justify-center relative">
          
          {/* Internal Previous Button (<) */}
          {screen > 1 && (
            <button
              onClick={() => setScreen(screen - 1)}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-10 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("a_moment_of_kindness_for_yourself_when_you_need_it")}</p>
          </header>

          <AnimatePresence mode="wait">
            {screen === 1 && (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                 <div className="flex justify-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-6xl md:text-8xl transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                       🤍
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="space-y-4">
                      <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                         {t("recovery_tool")}</span>
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                         {t("begin_your_compassion_break")}</h2>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed italic">
                         {t("in_ocd_recovery_self-criticism_can_be_a_loud_voice")}</p>
                    </div>

                    <button
                      onClick={() => setScreen(2)}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/10 flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
                    >
                       {t("start_the_practice")}<ChevronRight size={18} />
                    </button>
                 </div>
              </motion.div>
            )}

            {screen === 2 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                 <div className="space-y-8">
                    <header className="space-y-4">
                       <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                            <Info size={12} /> 
                          </div>
                          {t("phase_01_mindful_presence")}</label>
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                          {t("acknowledge_the_moment")}</h2>
                       <p className="text-slate-500 font-medium leading-relaxed italic text-sm border-l-4 border-primary/20 pl-4 py-1">
                          {t("whisper_i_am_having_a_hard_moment_allow_yourself_t")}</p>
                    </header>

                    <button
                      onClick={() => setScreen(3)}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/10 flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
                    >
                       {t("i_am_present")}<ChevronRight size={18} />
                    </button>
                 </div>

                 <div className="bg-slate-50 rounded-[32px] p-8 border-2 border-slate-200/80 border-dashed flex items-center justify-center">
                    <BreathingHeart />
                 </div>
              </motion.div>
            )}

            {screen === 3 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                 <div className="space-y-8">
                    <header className="space-y-4">
                       <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                            <User size={12} /> 
                          </div>
                          {t("phase_02_human_connection")}</label>
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                          {t("common_humanity")}</h2>
                       <p className="text-slate-500 font-medium leading-relaxed italic text-sm border-l-4 border-primary/20 pl-4 py-1">
                          {t("you_are_not_alone_in_this_feeling_many_others_face")}</p>
                    </header>

                    <div className="relative group">
                       <input
                         className="w-full h-16 pl-6 pr-14 bg-slate-50 border-2 border-slate-200/80 rounded-[22px] text-base font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-primary/40 focus:bg-white transition-all italic shadow-inner"
                         placeholder={t("type_a_name")}
                         value={personName}
                         onChange={(e) => setPersonName(e.target.value)}
                       />
                       <User size={20} className="absolute right-6 top-5 text-slate-200 group-focus-within:text-primary transition-colors" />
                    </div>

                    <button
                      onClick={() => setScreen(4)}
                      disabled={!personName.trim()}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/10 flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-20"
                    >
                       {t("i_am_not_alone")}<ChevronRight size={18} />
                    </button>
                 </div>

                 <div className="bg-primary/5 rounded-[32px] p-10 border-2 border-primary/10 text-primary font-bold leading-relaxed text-lg text-center italic flex flex-col items-center gap-6">
                    <User size={40} className="opacity-40" />
                    <p>{t("now_imagine_what_theyd_say_to_you_right_now_you_ar")}</p>
                 </div>
              </motion.div>
            )}

            {screen === 4 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                 <div className="space-y-8">
                    <header className="space-y-4">
                       <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                            <MessageCircle size={12} /> 
                          </div>
                          {t("phase_03_loving_kindness")}</label>
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                          {t("words_of_care")}</h2>
                       <p className="text-slate-500 font-medium leading-relaxed italic text-sm border-l-4 border-primary/20 pl-4 py-1">
                          {t("choose_a_phrase_that_resonates_with_you_right_now_")}</p>
                    </header>

                    <button
                      onClick={() => setScreen(5)}
                      disabled={selectedPhrase === null}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/10 flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-20"
                    >
                       {t("receive_kindness")}<ChevronRight size={18} />
                    </button>
                 </div>

                 <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    {phrases.map((phrase, i) => (
                       <button
                         key={i}
                         onClick={() => setSelectedPhrase(i)}
                         className={`w-full p-6 rounded-[24px] border-2 text-left transition-all group relative overflow-hidden ${
                           selectedPhrase === i 
                             ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                             : 'bg-white border-slate-100 hover:border-primary/30'
                         }`}
                       >
                          <div className="flex items-center justify-between relative z-10">
                             <span className={`text-[15px] font-bold italic ${selectedPhrase === i ? 'text-white' : 'text-slate-600'}`}>
                                "{phrase}"
                             </span>
                             {selectedPhrase === i && <CheckCircle2 size={20} className="text-white opacity-60" />}
                          </div>
                       </button>
                    ))}
                 </div>
              </motion.div>
            )}

            {screen === 5 && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                 <div className="flex justify-center order-2 md:order-1">
                    <div className="w-40 h-40 md:w-56 md:h-56 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex flex-col items-center justify-center gap-4 text-primary">
                       <Heart size={64} fill="currentColor" className="opacity-20" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t("restored")}</span>
                    </div>
                 </div>

                 <div className="space-y-8 order-1 md:order-2">
                    <div className="space-y-4">
                      <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                         {t("session_complete")}</span>
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                         {t("light_restored")}</h2>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed italic">
                         {t("youve_practiced_a_moment_of_self-compassion_this_i")}</p>
                    </div>

                    <div className="w-full space-y-4">
                      <button
                        onClick={handleComplete}
                        disabled={saving}
                        className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/10 flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
                      >
                        {saving ? t("saving") : t("complete_journey")} <ChevronRight size={18} />
                      </button>

                      <button
                        onClick={reset}
                        className="w-full py-4 rounded-[24px] bg-white text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] border-2 border-slate-100 transition-all hover:border-slate-200 flex items-center justify-center gap-2"
                      >
                        {t("restart_practice")}</button>
                    </div>
                 </div>

                 <StandardCompletionModal
                    isOpen={showCompletion}
                    onOpenChange={setShowCompletion}
                    emoji="🤍"
                    title={t("moment_of_kindness")}
                    description={t("every_step_of_self-kindness_rewires_your_brain_for")}
                    onStartOver={reset}
                    startOverText={t("review_guide")}
                    onDone={() => window.history.back()}
                    showHome={false}
                 />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default SelfCompassionBreak;
