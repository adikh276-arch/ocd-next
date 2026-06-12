import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ArrowLeft, PenLine, RotateCcw, CheckCircle2, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

type Screen = "welcome" | "writing" | "preview";

const PROMPT_TEXT = `Dear OCD,

You've taken up too much of my time. You've made me question everything. But today I'm writing back.

I want you to know that…`;

const DearOCD = () => {
    const { t } = useTranslation("letter_to_ocd");
      const [screen, setScreen] = useState<Screen>("welcome");
  const [letterContent, setLetterContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleDoneWriting = async () => {
    if (!letterContent.trim()) return;
    setSaving(true);
    try {
      const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId, activity_slug: 'letter_to_ocd',
          payload: { letterContent: letterContent.trim() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      toast.error("Failed to save letter.");
    } finally {
      setSaving(false);
    }
  };

  const handleExit = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  const goBack = useCallback(() => {
    if (screen === 'preview') setScreen('writing');
    else if (screen === 'writing') setScreen('welcome');
  }, [screen]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-letter bg-transparent">
      {/* Global Exit Button */}
      <div className="w-full flex items-center justify-between mb-8 z-20 relative">
        <button 
          onClick={handleExit}
          className="p-2 rounded-full hover:bg-slate-100/50 transition-all text-slate-500 bg-white shadow-sm border border-slate-100"
          aria-label={t("exit")}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="w-full flex flex-col items-center text-center space-y-3 mb-10">
         <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("letter_to_ocd")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase opacity-60">{t("reclaim_your_voice")}</p>
            <div className="h-[1px] w-8 bg-slate-200" />
         </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Previous Button Container */}
          <div className="absolute left-6 top-8 z-30">
            {screen !== "welcome" && (
              <button
                onClick={goBack}
                className="p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors border border-slate-100"
                title={t("previous_screen")}
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          {/* History Toggle */}
          <div className="absolute right-6 top-8 z-30">
            <ActivityHistoryDrawer slug="letter_to_ocd" title={t("journal_history")} />
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto px-8 md:px-12 py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="wait">
              {screen === "welcome" && (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
                >
                  <div className="w-32 h-32 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Mail size={64} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-6 max-w-xl">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                       {t("write_back")}</h2>
                    <p className="text-lg text-slate-500 font-medium italic leading-relaxed">
                       {t("this_is_your_private_space_reclaim_your_voice_by_w")}</p>
                  </div>

                  <div className="w-full max-w-md pt-6">
                    <button
                      onClick={() => setScreen("writing")}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {t("start_writing")}<ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {screen === "writing" && (
                <motion.div 
                  key="writing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col md:flex-row items-center gap-12 text-center md:text-left"
                >
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                         <div className="h-px w-8 bg-primary/20" />
                         <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">{t("drafting")}</span>
                         <div className="h-px w-8 bg-primary/20 md:hidden" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                         {t("the_letter")}</h2>
                      <p className="text-lg text-slate-500 font-medium italic">
                         {t("speak_your_truth_ocd_has_had_its_turn__now_its_you")}</p>
                    </div>

                    <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 flex flex-col items-center md:items-start gap-6 group hover:border-slate-200 transition-all">
                       <p className="text-base font-bold text-slate-400 leading-relaxed italic whitespace-pre-wrap">
                          {t("prompt_text")}
                       </p>
                    </div>
                  </div>

                  <div className="flex-[1.5] w-full space-y-8">
                    <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 space-y-6 shadow-xl shadow-slate-100/50 group hover:border-primary/20 transition-all">
                       <textarea
                         autoFocus
                         value={letterContent}
                         onChange={(e) => setLetterContent(e.target.value)}
                         placeholder={t("continue_writing_here")}
                         className="w-full h-[350px] bg-slate-50 border-2 border-slate-100 rounded-[24px] p-8 text-lg font-bold text-slate-900 outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner italic resize-none placeholder:text-slate-300"
                       />
                    </div>
                    <button
                      onClick={handleDoneWriting}
                      disabled={!letterContent.trim() || saving}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
                    >
                      {saving ? t("common:saving") : t("common:save")} <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <StandardCompletionModal 
        showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="💌"
        title={t("letter_sent")}
        description={t("writing_your_truth_is_an_act_of_defiance_youve_rec")}
        onStartOver={() => {
           setLetterContent("");
           setScreen("welcome");
        }}
        startOverText={t("write_another")}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default DearOCD;
