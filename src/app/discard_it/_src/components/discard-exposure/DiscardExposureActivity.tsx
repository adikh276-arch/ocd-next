import { useState, useCallback, useEffect } from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { type LadderItem, type LadderData, getLadderFromNeon, saveLadderToNeon } from "./types";
import Screen1Welcome from "./Screen1Welcome";
import Screen2BuildLadder from "./Screen2BuildLadder";
import Screen3TodaysItem from "./Screen3TodaysItem";
import Screen4Breathe from "./Screen4Breathe";
import Screen5Discard from "./Screen5Discard";
import Screen6CheckIn from "./Screen6CheckIn";
import Screen7WellDone from "./Screen7WellDone";
import Screen8Ladder from "./Screen8Ladder";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";

const DiscardExposureActivity = () => {
    const { t } = useTranslation("discard_it");
      const [screen, setScreen] = useState(1);
  const [ladder, setLadder] = useState<LadderData>({ items: [], currentStep: 1, sessions: [] });
  const [loading, setLoading] = useState(true);
  const [sessionAction, setSessionAction] = useState("");
  const [beforeAnxiety] = useState(7); 
  const [afterAnxiety, setAfterAnxiety] = useState(5);

  const totalScreens = 8;

  useEffect(() => {
    getLadderFromNeon().then(data => {
      if (data) setLadder(data);
      setLoading(false);
    });
  }, []);

  const go = useCallback((s: number) => setScreen(s), []);
  const goBack = useCallback(() => {
    if (screen > 1) setScreen(s => s - 1);
  }, [screen]);

  const handleBuildLadder = useCallback(async (items: LadderItem[]) => {
    const newLadder: LadderData = { ...ladder, items, currentStep: 1 };
    setLadder(newLadder);
    await saveLadderToNeon(newLadder);
    go(3);
  }, [ladder, go]);

  const handleDiscard = useCallback((action: string) => {
    setSessionAction(action);
    go(6);
  }, [go]);

  const handleCheckIn = useCallback(async (anxiety: number) => {
    setAfterAnxiety(anxiety);
    const session = {
      step: ladder.currentStep,
      beforeAnxiety,
      afterAnxiety: anxiety,
      action: sessionAction,
      date: new Date().toISOString().slice(0, 10),
    };
    const updated: LadderData = {
      ...ladder,
      sessions: [...ladder.sessions, session],
    };
    setLadder(updated);
    await saveLadderToNeon(updated);
    go(7);
  }, [ladder, beforeAnxiety, sessionAction, go]);

  const handleKeepGoing = useCallback(async () => {
    const updated: LadderData = {
      ...ladder,
      currentStep: Math.min(ladder.currentStep + 1, 5),
    };
    setLadder(updated);
    await saveLadderToNeon(updated);
    go(3);
  }, [ladder, go]);

  const handleDoneToday = useCallback(async () => {
    const updated: LadderData = {
      ...ladder,
      currentStep: Math.min(ladder.currentStep + 1, 6),
    };
    setLadder(updated);
    await saveLadderToNeon(updated);
    go(8);
  }, [ladder, go]);

  const currentItem = ladder.items[ladder.currentStep - 1];

  if (loading) {
    return (
      <div className="flex w-full h-[400px] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-discard-it">
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
          <ActivityHistoryDrawer slug="discard_it" title={t("discard_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("discard_it")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("hoarding_exposure_tool")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-12 font-sans min-h-[550px] relative flex flex-col justify-center">
          
          {/* Internal Previous Button (<) */}
          {screen > 1 && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Card Message / Quote */}
          <header className="text-center space-y-3 mb-10 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">
              {t("every_item_you_release_is_a_step_toward_freedom_yo")}</p>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
            {(() => {
              switch (screen) {
                case 1: return <Screen1Welcome onNext={() => go(2)} />;
                case 2: return <Screen2BuildLadder onNext={handleBuildLadder} />;
                case 3: return currentItem ? <Screen3TodaysItem item={currentItem} stepNumber={ladder.currentStep} onNext={() => go(4)} /> : <Screen2BuildLadder onNext={handleBuildLadder} />;
                case 4: return <Screen4Breathe onNext={() => go(5)} />;
                case 5: return <Screen5Discard onNext={handleDiscard} />;
                case 6: return <Screen6CheckIn onNext={handleCheckIn} />;
                case 7: return <Screen7WellDone beforeAnxiety={beforeAnxiety} afterAnxiety={afterAnxiety} onKeepGoing={handleKeepGoing} onDone={handleDoneToday} />;
                case 8: return <Screen8Ladder ladder={ladder} onContinue={() => go(3)} />;
                default: return null;
              }
            })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DiscardExposureActivity;
