import React, { useState, useCallback } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Screen1Welcome from "./screens/Screen1Welcome";
import Screen2Defusion from "./screens/Screen2Defusion";
import Screen3Tool from "./screens/Screen3Tool";
import Screen4Practice from "./screens/Screen4Practice";
import Screen5Reflection from "./screens/Screen5Reflection";
import { useTranslation } from "react-i18next";

const TOTAL_SCREENS = 5;

const DefusionExercise: React.FC = () => {
    const { t } = useTranslation("thought_diffusion");
      const [screen, setScreen] = useState(0);
  const [guidedRewrite, setGuidedRewrite] = useState("");
  const [ownThought, setOwnThought] = useState("");
  const [ownRewrite, setOwnRewrite] = useState("");
  const [feeling, setFeeling] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async (currentFeeling: string = feeling) => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'thought_diffusion',
          payload: {
            step: t("complete"),
            guidedRewrite,
            ownThought,
            ownRewrite,
            feeling: currentFeeling,
            date: new Date().toISOString()
          },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error('Failed to save triggers:', e);
    } finally {
      setSaving(false);
    }
  }, [guidedRewrite, ownThought, ownRewrite, feeling]);

  const goNext = useCallback(() => {
    setScreen(s => Math.min(s + 1, TOTAL_SCREENS - 1));
  }, []);

  const goBack = useCallback(() => {
    setScreen(s => Math.max(s - 1, 0));
  }, []);

  const resetExercise = useCallback(() => {
    setScreen(0);
    setGuidedRewrite("");
    setOwnThought("");
    setOwnRewrite("");
    setFeeling("");
    setShowCompletion(false);
  }, []);

  const handleExit = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-thought-diffusion bg-transparent">
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
            {t("thought_diffusion")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">{t("create_distance_from_intrusive_thoughts")}</p>
            <div className="h-[1px] w-8 bg-slate-200" />
         </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Internal Previous Button (<) */}
          {screen !== 0 && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-30 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* History Toggle */}
          <div className="absolute right-6 top-8 z-30">
            <ActivityHistoryDrawer slug="thought_diffusion" title={t("diffusion_history")} />
          </div>

          <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {screen === 0 && <Screen1Welcome onNext={goNext} />}
                {screen === 1 && <Screen2Defusion onNext={goNext} />}
                {screen === 2 && <Screen3Tool onNext={goNext} />}
                {screen === 3 && (
                  <Screen4Practice
                    guidedRewrite={guidedRewrite} ownThought={ownThought} ownRewrite={ownRewrite}
                    onGuidedChange={setGuidedRewrite} onOwnThoughtChange={setOwnThought} onOwnRewriteChange={setOwnRewrite}
                    onNext={goNext}
                  />
                )}
                {screen === 4 && (
                  <Screen5Reflection
                    feeling={feeling}
                    onFeelingChange={setFeeling}
                    onComplete={handleSave}
                    saving={saving}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="☁️"
        title={t("thought_diffused")}
        description={t("youve_practiced_looking_at_intrusive_thoughts_with")}
        onStartOver={resetExercise}
        startOverText={t("practice_again")}
        onDone={() => window.history.back()}
        showHome={false}
      />
    </div>
  );
};

export default DefusionExercise;
