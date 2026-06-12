import React from 'react';
import { Trigger, CATEGORIES } from './types';
import { CheckCircle2, TrendingUp, Trophy, Plus, Home, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  triggers: Trigger[];
  onAddMore: () => void;
  onDone: () => void;
  onComplete: () => void;
}

const ScreenComplete: React.FC<Props> = ({ triggers, onAddMore, onDone, onComplete }) => {
    const { t } = useTranslation("trigger_map");
      const highTriggers = triggers.filter((t) => t.rating >= 7);
  const categoryCounts: Record<string, number> = {};
  const categoryHighCounts: Record<string, number> = {};

  triggers.forEach((t) => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });
  highTriggers.forEach((t) => {
    categoryHighCounts[t.category] = (categoryHighCounts[t.category] || 0) + 1;
  });

  const categoriesMapped = Object.keys(categoryCounts).length;

  let topCategoryKey = '';
  let topCount = 0;
  Object.entries(categoryHighCounts).forEach(([k, v]) => {
    if (v > topCount) { topCount = v; topCategoryKey = k; }
  });
  if (!topCategoryKey && triggers.length > 0) {
    Object.entries(categoryCounts).forEach(([k, v]) => {
      if (v > topCount) { topCount = v; topCategoryKey = k; }
    });
  }

  const topCat = CATEGORIES.find((c) => c.key === topCategoryKey);
  const sorted = [...triggers].sort((a, b) => b.rating - a.rating);
  const top2Array = sorted.slice(0, 2);
  const top2Formatted = top2Array.map((t) => t.name).join(' and ');

  const StatItem = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-center space-y-1">
       <span className={`text-3xl font-black tracking-tighter ${color} tabular-nums leading-none`}>{value}</span>
       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{label}</span>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        
        {/* Left Side: Success Reveal */}
        <div className="flex-1 w-full space-y-8">
          <div className="flex justify-center md:justify-start">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[32px] flex items-center justify-center shadow-xl shadow-emerald-100/50">
               <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                  {t("analysis_complete")}</span>
               <div className="h-px w-8 bg-primary/20 md:hidden" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
               {t("map_locked")}</h2>
            <p className="text-lg text-slate-500 font-medium italic">
               {t("your_triggers_have_been_successfully_visualized_kn")}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <StatItem value={triggers.length} label={t("total")} color="text-slate-900" />
             <StatItem value={highTriggers.length} label={t("high")} color="text-rose-500" />
             <StatItem value={categoriesMapped} label={t("areas")} color="text-primary" />
          </div>
        </div>

        {/* Right Side: Insights and Actions */}
        <div className="flex-1 w-full space-y-8">
           <div className="bg-white border-2 border-slate-100 rounded-[32px] p-10 space-y-8 relative group overflow-hidden shadow-xl shadow-slate-100/50">
              <Trophy className="absolute -top-4 -right-4 text-primary/10 group-hover:scale-110 transition-transform duration-700" size={100} />
              
              <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t("diagnostic_insight")}</span>
                 </div>
                 <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed italic">
                    {t("your_highest_triggers_are_centered_around")}<span className="text-primary not-italic"> {topCat?.label ? t(topCat.label) : 'your environment'}</span>
                    {t("_particularly")}<span className="text-primary not-italic"> {top2Formatted || 'your detected items'}</span>
                    {t("_these_areas_represent_your_most_effective_startin")}</p>
              </div>
           </div>

           <div className="w-full space-y-4">
             <button
               onClick={onComplete}
               className="w-full py-6 rounded-[24px] bg-slate-900 text-white font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98] flex items-center justify-center gap-3"
             >
               {t("complete_journey")}<ChevronRight size={20} />
             </button>
             
             <div className="w-full">
                <button
                  onClick={onAddMore}
                  className="w-full py-4 rounded-[24px] bg-white text-slate-500 font-bold text-[10px] uppercase tracking-widest border-2 border-slate-100 transition-all hover:bg-slate-50 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> {t("add_more")}</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenComplete;
