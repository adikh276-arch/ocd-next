import React, { useState } from 'react';
import { Target, Timer, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (goal: string) => void;
}

const Screen9BuildHabit: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [selected, setSelected] = useState<string | null>(null);

  const goalOptions = [
    { key: '2min', label: t("try_2_minutes_next_time"), icon: Timer },
    { key: '5min', label: t("try_5_minutes_next_time"), icon: Timer },
    { key: '7min', label: t("try_7_minutes_next_time"), icon: Timer },
    { key: '10min', label: t("try_10_minutes_next_time"), icon: Timer },
  ];

  const handleNext = () => {
    const goal = goalOptions.find(g => g.key === selected);
    onNext(goal?.label || '');
  };

  return (
    <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
      <header className="text-center space-y-4 mb-10 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_09_growth")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("it_gets_easier")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4 italic opacity-80">
           {t("each_practice_strengthens_your_resilience_muscles")}</p>
      </header>

      <div className="flex-1 space-y-8 mb-8 w-full">
        <div className="space-y-4">
           <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px flex-1 bg-slate-100" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 flex items-center gap-2">
                <Target size={14} className="text-primary/60" /> {t("choose_your_next_target")}</label>
              <div className="h-px flex-1 bg-slate-100" />
           </div>
           
           <div className="grid grid-cols-1 gap-2.5">
             {goalOptions.map((g) => {
               const active = selected === g.key;
               const Icon = g.icon;
               return (
                 <button
                   key={g.key}
                   onClick={() => setSelected(g.key)}
                   className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${active 
                     ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-primary/20 hover:bg-slate-50/50'
                   }`}
                 >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-white/20' : 'bg-slate-50 text-primary group-hover:bg-white group-hover:shadow-sm'}`}>
                      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                   </div>
                   <span className={`text-[13px] font-bold uppercase tracking-wider flex-1 ${active ? 'text-white' : 'text-slate-600'}`}>{g.label}</span>
                   <Trophy size={16} className={`transition-all ${active ? 'text-white scale-110' : 'text-slate-200 group-hover:text-primary/40'}`} />
                 </button>
               );
             })}
           </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex items-start gap-4 text-left relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
           <Sparkles className="text-primary/40 shrink-0 mt-1" size={18} />
           <p className="text-[12px] font-medium text-slate-500 leading-relaxed italic relative z-10">
             {t("over_time_your_brain_learns_that_it_can_handle_the")}</p>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 shrink-0 w-full">
        <button 
          onClick={handleNext} 
          disabled={!selected}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {t("review_session")}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen9BuildHabit;
