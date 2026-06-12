import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { illustrations } from "./MoveIllustrations";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { Hand, Timer, ArrowLeft, Zap, Info, CheckCircle2, Waves, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const MOVES = [
  "clench_both_fists",
  "press_palms_flat_on_thighs",
  "tuck_fingers_under_arms",
  "hold_a_stress_ball",
  "press_fingertips_together",
  "hold_a_pen_or_object",
] as const;

type Move = (typeof MOVES)[number];

const INSTRUCTIONS: Record<Move, string> = {
  "clench_both_fists": "Curl your fingers in slowly, one by one. Feel the pressure building in your palms. Hold it firm — not painful, just present.",
  "press_palms_flat_on_thighs": "Place both palms flat on your thighs. Press down gently. Feel the weight of your hands. Stay here.",
  "tuck_fingers_under_arms": "Cross your arms and tuck your fingers snugly under each arm. Feel your hands held and still.",
  "hold_a_stress_ball": "Wrap your fingers around the ball. Squeeze gently. Feel the resistance in your palm. Hold it steady.",
  "press_fingertips_together": "Bring your fingertips together one by one — thumb to thumb, index to index. Feel each point of contact.",
  "hold_a_pen_or_object": "Wrap your fingers loosely around the object. Feel its weight and texture. Let your hands focus here.",
};

const CUES: Record<Move, string> = {
  "clench_both_fists": "Focus on the pressure. Stay strong.",
  "press_palms_flat_on_thighs": "Feel the weight on your thighs.",
  "tuck_fingers_under_arms": "Feel your hands held and still.",
  "hold_a_stress_ball": "Maintain the gentle squeeze.",
  "press_fingertips_together": "Focus on each point of contact.",
  "hold_a_pen_or_object": "Observe the texture and weight.",
};

const CompetingResponsePractice = () => {
    const { t } = useTranslation("response_guide");
      const [screen, setScreen] = useState(1);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'response_guide',
          payload: { move: selectedMove, completed: true, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log response guide:", e);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setScreen(1);
    setSelectedMove(null);
    setShowCompletion(false);
  };

  const handleBack = () => {
    if (screen > 1) setScreen(s => s - 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-response-guide">
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
          <ActivityHistoryDrawer slug="response_guide" title={t("practice_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("response_guide")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("competing_response_practice")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Internal Previous Button (<) */}
          {screen > 1 && screen < 5 && (
            <button
              onClick={handleBack}
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
                {screen === 1 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex justify-center mb-10">
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                         <Hand size={64} strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="w-full flex flex-col items-center text-center space-y-10">
                      <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                          {t("competing_response")}</h1>
                        <p className="text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                          {t("learn_to_switch_the_signal_and_keep_your_hands_bus")}</p>
                      </div>

                      <div className="w-full max-w-md pt-6">
                        <button
                          onClick={() => setScreen(2)}
                          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                          {t("choose_a_move")}<ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {screen === 2 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="text-center mb-10 space-y-2">
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {t("pick_a_physical_anchor")}</h2>
                      <p className="text-sm text-slate-500 font-medium italic">
                        {t("select_a_move_that_feels_comfortable_and_firm")}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mx-auto mb-10">
                      {MOVES.map((move) => (
                        <button
                          key={move}
                          onClick={() => setSelectedMove(move)}
                          className={`flex items-center justify-between p-6 rounded-[24px] border-2 transition-all text-left font-bold text-sm ${
                            selectedMove === move 
                              ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-primary/20 hover:bg-slate-50 italic'
                          }`}
                        >
                          <span>{t(move)}</span>
                          {selectedMove === move && <CheckCircle2 size={18} />}
                        </button>
                      ))}
                    </div>

                    <div className="w-full max-w-md">
                      <button
                        onClick={() => setScreen(3)}
                        disabled={!selectedMove}
                        className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                          selectedMove
                            ? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                            : "bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-200/50 shadow-none"
                        }`}
                      >
                        {t("continue")}<ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {screen === 3 && selectedMove && (
                  <div className="w-full flex flex-col items-center">
                    <div className="text-center mb-10 space-y-2">
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {t(selectedMove)}
                      </h2>
                      <p className="text-sm text-slate-500 font-medium italic">
                        {t("follow_the_technique_below")}</p>
                    </div>

                    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto mb-10">
                      <div className="bg-slate-50 p-10 rounded-[40px] border-2 border-slate-100 w-full flex items-center justify-center shadow-inner overflow-hidden">
                        <div className="transform scale-125 md:scale-150">
                           {illustrations[selectedMove] ? React.createElement(illustrations[selectedMove]) : <div>{t("no_illustration")}</div>}
                        </div>
                      </div>

                      <div className="bg-primary/5 rounded-[28px] p-8 border-2 border-primary/10 border-dashed text-primary font-bold text-lg leading-relaxed italic text-center w-full">
                        {INSTRUCTIONS[selectedMove]}
                      </div>
                    </div>

                    <div className="w-full max-w-md">
                      <button
                        onClick={() => setScreen(4)}
                        className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                      >
                        {t("start_60s_hold")}<ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {screen === 4 && selectedMove && (
                   <TimerScreen move={selectedMove} onComplete={() => setScreen(5)} />
                )}

                {screen === 5 && (
                  <div className="w-full flex flex-col items-center text-center">
                    <div className="flex justify-center mb-10">
                      <div className="w-24 h-24 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center border-2 border-primary/10">
                        <CheckCircle2 size={48} />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-10">
                      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {t("hands_are_still")}</h1>
                      <p className="text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                        {t("youve_successfully_practiced_a_competing_response_")}</p>
                    </div>

                    <div className="w-full max-w-md space-y-3">
                      <button
                        onClick={handleComplete}
                        disabled={saving}
                        className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] transition-all hover:shadow-xl active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                      >
                        {saving ? "Saving..." : "Finish Session"} <ChevronRight size={20} />
                      </button>

                      <button
                        onClick={reset}
                        className="w-full py-4 rounded-[24px] bg-white text-slate-600 border-2 border-slate-100 font-bold text-sm uppercase tracking-widest transition-all hover:bg-slate-50 active:scale-[0.98]"
                      >
                        {t("try_another_move")}</button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <StandardCompletionModal
         isOpen={showCompletion}
         onOpenChange={setShowCompletion}
         emoji="💪"
         title={t("shield_active")}
         description={t("every_second_you_choose_a_competing_response_you_w")}
         onStartOver={reset}
         startOverText={t("practice_again")}
         showHome={false}
         onDone={() => window.history.back()}
      />
    </div>
  );
};

const TimerScreen = ({ move, onComplete }: any) => {
    const { t } = useTranslation("response_guide");
      const [seconds, setSeconds] = useState(60);
   
   useEffect(() => {
     if (seconds <= 0) {
       onComplete();
       return;
     }
     const id = setInterval(() => setSeconds(s => s - 1), 1000);
     return () => clearInterval(id);
   }, [seconds, onComplete]);

   const progress = ((60 - seconds) / 60) * 100;

   return (
      <div className="flex flex-col items-center text-center space-y-12">
         <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t("hold_the_signal")}</h2>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary italic">"{CUES[move]}"</p>
         </div>

         <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute w-full h-full -rotate-90 overflow-visible">
               <circle cx="128" cy="128" r="115" className="stroke-slate-50 fill-none" strokeWidth="8" />
               <motion.circle 
                  cx="128" cy="128" r="115" 
                  className="stroke-primary fill-none" 
                  strokeWidth="8" 
                  strokeDasharray={2 * Math.PI * 115}
                  animate={{ strokeDashoffset: (2 * Math.PI * 115) * (1 - progress / 100) }}
                  transition={{ duration: 1, ease: "linear" }}
                  strokeLinecap="round"
               />
            </svg>
            <div className="relative flex flex-col items-center">
               <Timer size={28} className="text-slate-200 mb-1" />
               <span className="text-6xl font-extrabold text-slate-900 tabular-nums tracking-tighter">{seconds}</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{t("seconds")}</span>
            </div>
            <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.08, 0.03] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute w-full h-full rounded-full bg-primary"
            />
         </div>

         <div className="bg-primary/5 border-2 border-primary/10 border-dashed p-8 rounded-[28px] flex gap-4 items-start text-left max-w-lg">
            <Waves size={20} className="text-primary mt-1 flex-shrink-0" />
            <p className="text-[15px] font-medium text-primary/80 leading-relaxed italic">
               {t("focus_on_the_physical_sensation_in_your_hands_let_")}</p>
         </div>
      </div>
   );
};

export default CompetingResponsePractice;
