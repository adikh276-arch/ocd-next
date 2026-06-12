import { useState, useCallback, useRef } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { toast } from "sonner";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenIntro from "./ScreenIntro";
import ScreenAddTriggers from "./ScreenAddTriggers";
import ScreenRateTrigger from "./ScreenRateTrigger";
import ScreenMapView from "./ScreenMapView";
import ScreenComplete from "./ScreenComplete";
import { Trigger } from "./types";
import { useTranslation } from "react-i18next";

type Screen = "intro" | "add" | "rate" | "map" | "complete";

const TriggersMapActivity = () => {
    const { t } = useTranslation("trigger_map");
      const [screen, setScreen] = useState<Screen>("intro");
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [pendingTrigger, setPendingTrigger] = useState<Trigger | null>(null);
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleNext = async (data?: any) => {
    if (screen === "intro") setScreen("add");
    else if (screen === "add") {
       const newTrigger: Trigger = {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name,
          category: data.category,
          rating: 5,
          emoji: '🎯'
       };
       setPendingTrigger(newTrigger);
       setScreen("rate");
    }
    else if (screen === "rate") {
       if (pendingTrigger) {
         const finalTrigger = { ...pendingTrigger, rating: data.rating };
         setTriggers(prev => [...prev, finalTrigger]);
       }
       setScreen("map");
    }
    else if (screen === "map") {
       setScreen("add");
    }
  };

  const handleFinalComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'trigger_map',
          payload: { triggers, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      toast.error("Failed to save map.");
    } finally {
      setSaving(false);
    }
  };

  const goBack = () => {
    if (screen === "add") setScreen("intro");
    else if (screen === "rate") setScreen("add");
    else if (screen === "map") setScreen("add");
    else if (screen === "complete") setScreen("map");
  };

  const handleExit = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-trigger-map bg-transparent">
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
            {t("trigger_map")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">{t("visualizing_your_recovery_landscape")}</p>
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

          {/* History Toggle */}
          <div className="absolute right-6 top-8 z-30">
            <ActivityHistoryDrawer slug="trigger_map" title={t("trigger_history")} />
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
                {screen === "intro" && (
                  <ScreenIntro onBegin={() => setScreen("add")} />
                )}
                {screen === "add" && (
                  <ScreenAddTriggers 
                    triggers={triggers} 
                    onNext={handleNext} 
                    onComplete={() => setScreen("complete")} 
                  />
                )}
                {screen === "rate" && pendingTrigger && (
                  <ScreenRateTrigger 
                    trigger={pendingTrigger}
                    onNext={(rating) => handleNext({ rating })} 
                  />
                )}
                {screen === "map" && (
                  <ScreenMapView 
                    triggers={triggers} 
                    onAddMore={() => setScreen("add")} 
                    onFinish={() => setScreen("complete")} 
                  />
                )}
                {screen === "complete" && (
                  <ScreenComplete 
                    triggers={triggers} 
                    onAddMore={() => setScreen("add")} 
                    onDone={() => window.history.back()}
                    onComplete={handleFinalComplete}
                  />
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
        emoji="🗺️"
        title={t("map_complete")}
        description={t("knowing_your_triggers_is_the_first_step_to_conquer")}
        onStartOver={() => {
          setScreen("add");
          setTriggers([]);
        }}
        startOverText={t("start_new_map")}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default TriggersMapActivity;
