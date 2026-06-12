import React, { useState } from 'react';
import { Trigger } from './types';
import { ChevronRight, Gauge } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  trigger: Trigger;
  onNext: (rating: number) => void;
}

const ScreenRateTrigger: React.FC<Props> = ({ trigger, onNext }) => {
    const { t } = useTranslation("trigger_map");
      const [rating, setRating] = useState(5);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        
        {/* Left Side: Trigger Info */}
        <div className="flex-1 w-full space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                  {t("step_02")}</span>
               <div className="h-px w-8 bg-primary/20 md:hidden" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
               {t("how_intense_is_this")}</h2>
            <p className="text-lg text-slate-500 font-medium italic">
               {t("rate_the_anxiety_or_urge_triggered_by_this_situati")}</p>
          </div>

          <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-10 flex flex-col items-center md:items-start gap-6 group hover:border-slate-200 transition-all">
             <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-[28px] flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform">
                {trigger.emoji}
             </div>
             <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                   {trigger.name}
                </h3>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic block">
                   {trigger.category}
                </span>
             </div>
          </div>
        </div>

        {/* Right Side: Rating Scale */}
        <div className="flex-1 w-full space-y-10">
          <div className="bg-white rounded-[32px] p-10 border-2 border-slate-100 flex flex-col items-center space-y-12">
            <div className="text-center">
               <span className="text-8xl font-black text-primary tracking-tighter tabular-nums leading-none">
                  {rating}
               </span>
            </div>

            <div className="w-full space-y-8">
              <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                  style={{ width: `${(rating / 10) * 100}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>
              <div className="flex justify-between items-center px-2">
                 <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t("minimal")}</span>
                 </div>
                 <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t("extreme")}</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="w-full pt-4">
            <button
              onClick={() => onNext(rating)}
              className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {t("confirm_intensity")}<ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenRateTrigger;
