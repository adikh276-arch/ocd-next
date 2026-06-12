import React from 'react';
import { CheckCircle2, ArrowRight, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onComplete: () => void;
  saving: boolean;
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

const Screen10Closing: React.FC<Props> = ({ onComplete, saving }) => {
    const { t } = useTranslation("reassurance_resistance");
      return (
        <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-emerald-100/50 animate-in zoom-in duration-700">
             <CheckCircle2 size={40} strokeWidth={1.5} />
          </div>

          <header className="space-y-4 mb-10 shrink-0 w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                  {t("journey_complete")}</span>
               <div className="h-px w-8 bg-primary/20" />
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight italic">
               {t("resilience_built")}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed px-4 italic">
               {t("every_second_you_wait_is_a_victory_over_the_obsess")}</p>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0 py-2">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-4 relative overflow-hidden group">
               <Heart className="absolute -top-4 -right-4 text-primary/5 group-hover:scale-110 transition-transform duration-700" size={100} />
               <p className="text-sm font-medium text-slate-700 leading-relaxed italic relative z-10">
                 {t("you_stayed_with_the_discomfort_by_resisting_the_ur")}</p>
            </div>
          </div>

          <div className="pt-10 shrink-0 w-full">
            <ActivityButton onClick={onComplete} disabled={saving}>
               {saving ? "Saving Victory..." : "Complete Session"} <ArrowRight size={18} />
            </ActivityButton>
          </div>
        </div>
      );
};

export default Screen10Closing;
