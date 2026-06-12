import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Wind, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

type BreathPhase = 'in' | 'hold' | 'out';

const Screen3Breathing: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [breathCount, setBreathCount] = useState(1);
  const [phase, setPhase] = useState<BreathPhase>('in');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let currentBreath = 1;
    let isMounted = true;

    const cycle = async () => {
      while (currentBreath <= 3 && isMounted) {
        setBreathCount(currentBreath);
        
        setPhase('in');
        await new Promise(r => setTimeout(r, 4000));
        if (!isMounted) return;

        setPhase('hold');
        await new Promise(r => setTimeout(r, 2000));
        if (!isMounted) return;

        setPhase('out');
        await new Promise(r => setTimeout(r, 4000));
        if (!isMounted) return;

        currentBreath++;
      }
      if (isMounted) setCompleted(true);
    };

    cycle();
    return () => { isMounted = false; };
  }, []);

  const phaseLabel = phase === 'in' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out';

  return (
    <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
      <header className="space-y-4 mb-10 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_03_centering")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("first_just_breathe")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4 italic opacity-80">
           {t("follow_the_rhythm_to_settle_your_nervous_system")}</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[380px] relative">
        <div className="relative flex items-center justify-center w-64 h-64 md:w-72 md:h-72">
          {/* Animated Glow */}
          <motion.div
            animate={{
              scale: phase === 'in' ? [1, 1.2, 1.3] : phase === 'hold' ? 1.3 : [1.3, 1.1, 1],
              opacity: phase === 'in' ? [0.1, 0.2, 0.3] : phase === 'hold' ? 0.3 : [0.3, 0.15, 0.1],
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="flex flex-col items-center gap-2">
                 <Wind size={32} className="text-primary/60 mb-2 animate-bounce" />
                 <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">
                    {phaseLabel}
                 </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={{
              scale: phase === 'in' ? 1.2 : phase === 'hold' ? 1.2 : 0.8,
            }}
            transition={{
              duration: phase === 'hold' ? 0.2 : 4,
              ease: "easeInOut",
            }}
            className="w-full h-full rounded-full border-2 border-primary/10 flex items-center justify-center relative shadow-2xl bg-white/50 backdrop-blur-sm"
          >
             <div className="absolute inset-4 rounded-full border border-slate-50" />
          </motion.div>
        </div>

        <div className="mt-12 space-y-6">
           <div className="flex gap-3 justify-center">
              {[1, 2, 3].map((b) => (
                <div 
                   key={b}
                   className={`h-1.5 rounded-full transition-all duration-700 ${
                      b <= breathCount ? 'w-10 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]' : 'w-4 bg-slate-100'
                   }`}
                />
              ))}
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              {t("breath")} {Math.min(breathCount, 3)} {t("of_3")}</p>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 shrink-0 w-full mt-4">
        <button 
          onClick={onNext} 
          disabled={!completed}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {completed ? "Continue" : "Settling..."}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen3Breathing;
