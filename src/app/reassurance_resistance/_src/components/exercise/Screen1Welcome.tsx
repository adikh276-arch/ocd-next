import React from 'react';
import { ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const Screen1Welcome: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  return (
    <div className="text-center flex flex-col items-center max-w-lg mx-auto py-4">
      {/* Premium Badge */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
        <div className="relative w-20 h-20 rounded-3xl bg-white border border-slate-100 shadow-xl flex items-center justify-center text-primary group transition-all hover:scale-105">
          <ShieldCheck size={40} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-8 h-[1px] bg-slate-200" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            {t("therapeutic_session")}
          </span>
          <span className="w-8 h-[1px] bg-slate-200" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t("reassurance_resistance")}
        </h1>
        
        <p className="text-slate-500 font-medium text-base leading-relaxed max-w-[320px] mx-auto italic opacity-80">
          {t("that_urge_to_check_just_one_more_time_feels_real__")}
        </p>
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100 text-slate-500 transition-colors hover:bg-white hover:shadow-sm">
          <Clock size={16} className="text-primary/70" />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            {t("approx_5_minutes")}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="w-full max-w-sm py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-3 group"
      >
        {t("lets_begin")}
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
      
      <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-50">
        10 {t("steps_to_recovery")}
      </p>
    </div>
  );
};

export default Screen1Welcome;
