import React, { useState } from 'react';
import { Check, Waves, Wind, Brain, Shield, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

/* ─── Shared UI Components ─── */
function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("reassurance_resistance");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3"
        >
          {children}
        </button>
      );
}

const Screen7DuringWait: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const interactionStatements = [
    { key: 'wave', text: t("anxiety_feels_like_a_wave__rising_and_falling"), icon: Waves },
    { key: 'breath', text: t("my_breathing_is_slowing_down"), icon: Wind },
    { key: 'notice', text: t("the_urge_is_there_but_i_havent_acted"), icon: Brain },
    { key: 'stay', text: t("i_am_sitting_with_this_and_i_am_okay"), icon: Shield },
  ];

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm p-8 md:p-10 flex flex-col items-center text-center font-sans max-h-[85vh]">
      <header className="space-y-4 mb-10 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              {t("step_07_support")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight italic">
           {t("you_are_doing_it")}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed px-4 italic">
           {t("check_each_statement_as_it_becomes_true_for_you")}</p>
      </header>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar mb-8 w-full">
        {interactionStatements.map((s) => {
          const active = checked.has(s.key);
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${active 
                ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-primary/20'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-primary/5 text-primary'}`}>
                 <Icon size={18} />
              </div>
              <span className="flex-1 text-[11px] font-bold uppercase tracking-wider leading-snug">
                 {s.text}
              </span>
              {active && (
                 <Check size={16} strokeWidth={3} className="shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-8 border-t border-slate-100 shrink-0 w-full">
        <ActivityButton onClick={onNext}>
           {t("continue")}<ArrowRight size={18} />
        </ActivityButton>
      </div>
    </div>
  );
};

export default Screen7DuringWait;
