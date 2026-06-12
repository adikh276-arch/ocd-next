import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/app/did_you_know/_src/components/DidYouKnow/WelcomeScreen";
import CardsScreen from "@/app/did_you_know/_src/components/DidYouKnow/CardsScreen";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

type Screen = "welcome" | "cards";

const Index = () => {
    const { t } = useTranslation("did_you_know");
      const [screen, setScreen] = useState<Screen>("welcome");

  const goBack = () => {
    if (screen === "cards") setScreen("welcome");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative font-sans theme-did-you-know bg-transparent">
      {/* Global Exit-Logic Back Button */}
      <div className="w-full flex items-center justify-between mb-8 z-20 relative">
        <button 
          onClick={() => {
            if (window.parent !== window) {
               window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
            } else {
               window.location.href = 'https://web.mantracare.com';
            }
           }}
          className="p-2 rounded-full hover:bg-slate-100/50 transition-all text-slate-500 bg-white shadow-sm border border-slate-100"
          aria-label={t("exit")}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="w-full flex flex-col items-center text-center space-y-3 mb-10">
         <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("did_you_know")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">{t("psychoeducation__insights")}</p>
            <div className="h-[1px] w-8 bg-slate-200" />
         </div>
      </div>

      <main className="w-full z-10 relative">
        <div className="relative w-full">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {screen === "welcome" && (
                  <WelcomeScreen key="welcome" onStart={() => setScreen("cards")} />
                )}
                {screen === "cards" && (
                  <CardsScreen key="cards" onRestart={() => setScreen("welcome")} />
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
