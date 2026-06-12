import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, Timer as TimerIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (duration: number) => void;
}

const timerOptions = [
  { label: '2', sub: 'MIN', value: 2 },
  { label: '5', sub: 'MIN', value: 5 },
  { label: '10', sub: 'MIN', value: 10 },
];

const Screen6TheWait: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerDone, setTimerDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (!selectedDuration) return;
    setSecondsLeft(selectedDuration * 60);
    setTimerStarted(true);
  };

  useEffect(() => {
    if (!timerStarted || timerDone) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerStarted, timerDone]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = (selectedDuration || 1) * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
      <header className="space-y-4 mb-10 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_06_the_resistance")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("wait_dont_check")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4 italic opacity-80">
           {timerStarted ? "Stay right here. Observe the urge." : "Commit to sitting with this feeling for a set time."}
        </p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[380px] relative">
        {timerStarted ? (
          <div className="space-y-12 w-full">
            <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto flex items-center justify-center">
               <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse scale-110" />
               <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
                 <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="6" />
                 <motion.circle
                   cx="100" cy="100" r="90"
                   fill="none"
                   stroke="currentColor"
                   className="text-primary"
                   strokeWidth="8"
                   strokeLinecap="round"
                   strokeDasharray={circumference}
                   animate={{ strokeDashoffset: dashOffset }}
                   transition={{ duration: 1, ease: "linear" }}
                 />
               </svg>
               <div className="z-10 bg-white w-48 h-48 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center shadow-2xl border border-slate-50">
                 <span className="text-5xl md:text-6xl font-black text-slate-900 tabular-nums tracking-tighter">
                   {formatTime(secondsLeft)}
                 </span>
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mt-4">
                   {t("remaining")}</span>
               </div>
            </div>

            <div className="space-y-4">
               <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2">
                 {timerDone ? (
                   <span className="flex items-center gap-2 text-primary">
                     <Trophy size={14} /> {t("challenge_complete")}</span>
                 ) : "Observing the urge, without acting."}
               </p>
               <div className="flex justify-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${timerDone ? 'bg-primary' : 'bg-slate-200'}`} />
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${timerDone ? 'bg-primary' : 'bg-slate-200'}`} />
                  <div className={`w-1.5 h-1.5 rounded-full ${timerDone ? 'bg-primary' : 'bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]'}`} />
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10 w-full">
            <div className="grid grid-cols-3 gap-4 w-full">
              {timerOptions.map((opt) => {
                const active = selectedDuration === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedDuration(opt.value)}
                    className={`flex flex-col items-center justify-center gap-3 py-10 rounded-[2.5rem] transition-all border-2 ${
                      active 
                        ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30 scale-105 z-10' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:bg-slate-50/50 shadow-sm'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mb-1 ${active ? 'bg-white/20' : 'bg-slate-50'}`}>
                      <TimerIcon size={18} strokeWidth={2.5} className={active ? 'text-white' : 'text-primary/60'} />
                    </div>
                    <span className="text-4xl font-black tracking-tighter leading-none">{opt.label}</span>
                    <span className="text-[10px] font-black opacity-50 uppercase tracking-widest">{opt.sub}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-start gap-4 text-left relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
               <Zap className="text-primary/40 shrink-0 mt-1" size={18} />
               <p className="text-[12px] font-medium text-slate-500 leading-relaxed italic relative z-10">
                 {t("choose_a_duration_that_feels_challenging_but_manag")}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-8 border-t border-slate-50 shrink-0 w-full mt-4">
        <button 
          onClick={timerDone ? () => onNext(selectedDuration!) : startTimer} 
          disabled={!selectedDuration || (timerStarted && !timerDone)}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {timerStarted ? (timerDone ? "Claim Victory" : "Resisting...") : "Start Resistance Wait"}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen6TheWait;
