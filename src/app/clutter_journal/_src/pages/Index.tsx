import { useState } from "react";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import WelcomeScreen from "@/app/clutter_journal/_src/components/journal/WelcomeScreen";
import ExplorationScreen from "@/app/clutter_journal/_src/components/journal/ExplorationScreen";
import InsightScreen from "@/app/clutter_journal/_src/components/journal/InsightScreen";
import ClosingScreen from "@/app/clutter_journal/_src/components/journal/ClosingScreen";
import JournalScreen from "@/app/clutter_journal/_src/components/journal/JournalScreen";
import { ArrowLeft, ChevronLeft, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type Screen = "welcome" | "exploration" | "insight" | "closing" | "journal";

const Index = () => {
    const { t } = useTranslation("clutter_journal");
      const [screen, setScreen] = useState<Screen>("welcome");
  const [objectName, setObjectName] = useState("");
  const [insight, setInsight] = useState("");

  const reset = () => {
    setObjectName("");
    setInsight("");
    setScreen("welcome");
  };

  const goBack = () => {
    if (screen === "exploration") setScreen("welcome");
    else if (screen === "insight") setScreen("exploration");
    else if (screen === "closing") setScreen("insight");
    else if (screen === "journal") setScreen("welcome");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-clutter-journal">
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
          <ActivityHistoryDrawer slug="clutter_journal" title={t("journal_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("clutter_journal")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("hoarding_recovery_tool")}</p>
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
                  <WelcomeScreen
                    onNext={(name) => {
                      setObjectName(name);
                      setScreen("exploration");
                    }}
                    onViewJournal={() => setScreen("journal")}
                    onBack={() => {}} // Not used as we have global back
                  />
                )}
                {screen === "exploration" && (
                  <ExplorationScreen onNext={() => setScreen("insight")} onBack={goBack} />
                )}
                {screen === "insight" && (
                  <InsightScreen
                    onNext={(sel) => {
                      setInsight(sel);
                      setScreen("closing");
                    }}
                    onBack={goBack}
                  />
                )}
                {screen === "closing" && (
                  <ClosingScreen
                    objectName={objectName}
                    insight={insight}
                    onViewJournal={() => setScreen("journal")}
                    onClose={reset}
                    onBack={goBack}
                    onReset={reset}
                  />
                )}
                {screen === "journal" && (
                  <JournalScreen onStartEntry={reset} onBack={goBack} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
