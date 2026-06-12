import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/app/brave_steps/_src/components/erp/IntroScreen";
import ChallengeScreen from "@/app/brave_steps/_src/components/erp/ChallengeScreen";
import TimerScreen from "@/app/brave_steps/_src/components/erp/TimerScreen";
import WrapUpScreen from "@/app/brave_steps/_src/components/erp/WrapUpScreen";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation("brave_steps");
      const [screen, setScreen] = useState(0);
  const [challenge, setChallenge] = useState("Touch a shoe sole");
  const [anxiety, setAnxiety] = useState(4);
  const [duration, setDuration] = useState(5);

  const handleChallengeNext = (c: string) => {
    setChallenge(c);
    setScreen(2);
  };

  const handleTimerDone = (anx: number, dur: number) => {
    setAnxiety(anx);
    setDuration(dur);
    setScreen(3);
  };

  const reset = () => {
    setScreen(0);
    setChallenge("Touch a shoe sole");
    setAnxiety(4);
    setDuration(5);
  };

  const goBack = () => {
    if (screen > 0) {
      if (screen === 3) setScreen(1);
      else setScreen(screen - 1);
    }
  };

  const handleExit = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-brave_steps bg-transparent">
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
            {t("brave_steps")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">{t("exposure__response_prevention")}</p>
            <div className="h-[1px] w-8 bg-slate-200" />
         </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Internal Previous Button (<) */}
          {screen > 0 && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-30 border border-slate-100"
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
                className="w-full h-full"
              >
                {screen === 0 && <IntroScreen onNext={() => setScreen(1)} onBack={handleExit} />}
                {screen === 1 && <ChallengeScreen onNext={handleChallengeNext} onBack={goBack} />}
                {screen === 2 && <TimerScreen onNext={handleTimerDone} onBack={goBack} />}
                {screen === 3 && (
                  <WrapUpScreen
                    beforeAnxiety={anxiety}
                    surface={challenge.replace("Touch a ", "").replace("Touch ", "")}
                    duration={duration}
                    onTryHarder={() => setScreen(1)}
                    onDone={reset}
                    onBack={goBack}
                    onReset={reset}
                  />
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
