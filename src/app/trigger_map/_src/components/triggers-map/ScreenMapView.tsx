import React from 'react';
import { Trigger, CATEGORIES } from './types';
import { ChevronRight, Plus, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  triggers: Trigger[];
  onAddMore: () => void;
  onFinish: () => void;
}

const getIntensityColor = (rating: number) => {
    const { t } = useTranslation("trigger_map");
      if (rating >= 8) return "text-rose-500 bg-rose-50 border-rose-100";
  if (rating >= 5) return "text-amber-500 bg-amber-50 border-amber-100";
  return "text-emerald-500 bg-emerald-50 border-emerald-100";
};

const ScreenMapView: React.FC<Props> = ({ triggers, onAddMore, onFinish }) => {
    const { t } = useTranslation("trigger_map");
      const sorted = [...triggers].sort((a, b) => b.rating - a.rating);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-10">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
             <div className="h-px w-8 bg-primary/20" />
             <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                {t("topology")}</span>
             <div className="h-px w-8 bg-primary/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
             {t("trigger_landscape")}</h2>
          <p className="text-lg text-slate-500 font-medium italic">
             {t("this_is_the_terrain_your_ocd_is_currently_using_vi")}</p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* Map List */}
          <div className="flex-1 w-full space-y-8 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {CATEGORIES.map((cat) => {
              const catTriggers = sorted.filter(t => t.category === cat.key);
              if (catTriggers.length === 0) return null;

              return (
                <div key={cat.key} className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                     <span className="text-lg">{cat.emoji}</span>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(cat.label)}</span>
                     <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {catTriggers.map((t) => (
                      <div key={t.id} className="flex items-center justify-between bg-white border-2 border-slate-100 p-5 rounded-[24px] hover:border-primary/20 hover:shadow-lg hover:shadow-slate-100 transition-all group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                               {t.emoji}
                            </div>
                            <span className="text-base font-black text-slate-900 tracking-tight">{t.name}</span>
                         </div>
                         <div className={`px-4 py-1.5 rounded-full text-[12px] font-black border-2 ${getIntensityColor(t.rating)}`}>
                            {t.rating}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Actions and Summary */}
          <div className="w-full md:w-80 space-y-8">
             <div className="bg-slate-900 rounded-[32px] p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-sm">
                      <MapPin size={28} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{t("total_mapped")}</p>
                     <p className="text-3xl font-black text-white tracking-tight">
                        {triggers.length} <span className="text-base font-bold uppercase text-primary">{t("points")}</span>
                     </p>
                   </div>
                </div>

                <div className="space-y-4 relative z-10 pt-4">
                   <button 
                     onClick={onFinish}
                     className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] flex items-center justify-center gap-2"
                   >
                      {t("lock_map_data")}<ChevronRight size={18} />
                   </button>
                   <button 
                     onClick={onAddMore}
                     className="w-full py-4 rounded-2xl bg-white/5 text-white/60 border border-white/10 font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:text-white active:scale-[0.98] flex items-center justify-center gap-2"
                   >
                      <Plus size={16} /> {t("add_more_triggers")}</button>
                </div>
             </div>

             <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[32px] p-8 italic text-center space-y-2">
                <p className="text-sm font-bold text-primary leading-relaxed">
                  {t("knowing_the_landscape_is_half_the_battle_your_reco")}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenMapView;
