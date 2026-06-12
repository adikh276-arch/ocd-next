import { useState, useCallback, useRef } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { toast } from "sonner";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Screen1Welcome from "./Screen1Welcome";
import Screen2Notice from "./Screen2Notice";
import Screen3Ride from "./Screen3Ride";
import Screen4Reflect from "./Screen4Reflect";
import { useTranslation } from "react-i18next";

type Screen = "welcome" | "notice" | "ride" | "reflect";

const UrgeSurfingActivity = () => {
    const { t } = useTranslation("urge_surfing");
      const [screen, setScreen] = useState<Screen>("welcome");
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const sessionDataRef = useRef<any>({});

  const handleBegin = async () => {
    setScreen("notice");
  };

  const handleNoticeNext = async (location: string, sensation: string) => {
    sessionDataRef.current = { body_location: location, sensation_description: sensation };
    setScreen("ride");
  };

  const handleRideComplete = useCallback(() => {
    sessionDataRef.current = { ...sessionDataRef.current, completed: true };
    setScreen("reflect");
  }, []);

  const handleFinish = async (reflection: string, surfAgain: boolean) => {
    const finalData = { ...sessionDataRef.current, reflection_note: reflection, date: new Date().toISOString() };
    setSaving(true);
    try {
      const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          activity_slug: 'urge_surfing',
          payload: finalData,
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      toast.error("Failed to save session.");
    } finally {
      setSaving(false);
    }

    if (surfAgain) {
      sessionDataRef.current = {};
      setScreen("notice");
    } else {
      sessionDataRef.current = {};
      setScreen("welcome");
    }
  };

  const goBack = () => {
    if (screen === "notice") setScreen("welcome");
    else if (screen === "ride") setScreen("notice");
    else if (screen === "reflect") setScreen("ride");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-urge-surfing">
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
          <ActivityHistoryDrawer slug="urge_surfing" title={t("surfing_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("urge_surfing")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("riding_the_wave_of_urges")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Internal Previous Button (<) */}
          {screen !== "welcome" && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col"
              >
                {screen === "welcome" && (
                  <Screen1Welcome
                    onBegin={handleBegin}
                    onBack={() => {}} // Handled by global
                  />
                )}
                {screen === "notice" && (
                  <Screen2Notice onNext={handleNoticeNext} />
                )}
                {screen === "ride" && (
                  <Screen3Ride onComplete={handleRideComplete} />
                )}
                {screen === "reflect" && (
                  <Screen4Reflect
                    onSurfAgain={(r) => handleFinish(r, true)}
                    onDone={(r) => handleFinish(r, false)}
                    saving={saving}
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
        emoji="🌊"
        title={t("urge_surfed")}
        description={t("you_successfully_surfed_the_urge_every_wave_you_ri")}
        onStartOver={() => setScreen("notice")}
        startOverText={t("surf_again")}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default UrgeSurfingActivity;
