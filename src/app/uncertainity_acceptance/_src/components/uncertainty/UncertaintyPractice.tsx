import { useState, useCallback, useRef } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { toast } from "sonner";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Screen1Intro from "./Screen1Intro";
import Screen2NameDoubt from "./Screen2NameDoubt";
import Screen3Acceptance from "./Screen3Acceptance";
import { useTranslation } from "react-i18next";

type Screen = "intro" | "name" | "acceptance";

const UncertaintyPractice = () => {
    const { t } = useTranslation("uncertainity_acceptance");
      const [screen, setScreen] = useState<Screen>("intro");
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const sessionDataRef = useRef<any>({});

  const handleNext = async (data?: any) => {
    if (data) sessionDataRef.current = { ...sessionDataRef.current, ...data };
    
    if (screen === "intro") setScreen("name");
    else if (screen === "name") setScreen("acceptance");
  };

  const handleComplete = async (data: any) => {
    const finalData = { 
      ...sessionDataRef.current, 
      ...data, 
      date: new Date().toISOString() 
    };
    
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'uncertainity_acceptance',
          payload: finalData,
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      toast.error("Failed to save progress.");
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
    if (screen === 'acceptance') setScreen('name');
    else if (screen === 'name') setScreen('intro');
  }, [screen]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-uncertainty bg-transparent">
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
            {t("uncertainty_acceptance")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase opacity-60">{t("learning_to_live_with_maybe")}</p>
            <div className="h-[1px] w-8 bg-slate-200" />
         </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Internal Previous Button (<) */}
          {screen !== "intro" && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-30 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="flex-1 flex flex-col overflow-y-auto px-8 md:px-12 py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {screen === "intro" && (
                  <Screen1Intro onBegin={() => handleNext()} />
                )}
                {screen === "name" && (
                  <Screen2NameDoubt onNext={(data) => handleNext(data)} />
                )}
                {screen === "acceptance" && (
                  <Screen3Acceptance onComplete={handleComplete} saving={saving} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <StandardCompletionModal 
        showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🛡️"
        title={t("uncertainty_accepted")}
        description={t("you_have_chosen_to_live_with_the_maybe_instead_of_")}
        onStartOver={() => {
          setScreen("intro");
          sessionDataRef.current = {};
        }}
        startOverText={t("practice_again")}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default UncertaintyPractice;
