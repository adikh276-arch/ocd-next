import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (areas: string[]) => void;
}

const Screen5BodyCheck: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [selected, setSelected] = useState<string[]>([]);

  const bodyAreas = [
    { id: 'head', label: t("head"), top: '12%', left: '50%' },
    { id: 'shoulders', label: t("shoulders"), top: '27%', left: '50%' },
    { id: 'chest', label: t("chest"), top: '40%', left: '50%' },
    { id: 'stomach', label: t("stomach"), top: '55%', left: '50%' },
    { id: 'hands-left', label: t("hands"), top: '58%', left: '15%' },
    { id: 'hands-right', label: t("hands"), top: '58%', left: '85%' },
  ];

  const toggleArea = (id: string) => {
    const normalizedId = id.startsWith('hands') ? 'hands' : id;
    setSelected((prev) =>
      prev.includes(normalizedId) ? prev.filter((a) => a !== normalizedId) : [...prev, normalizedId]
    );
  };

  const isSelected = (id: string) => {
    const normalizedId = id.startsWith('hands') ? 'hands' : id;
    return selected.includes(normalizedId);
  };

  return (
    <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
      <header className="space-y-4 mb-8 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_05_awareness")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("where_is_the_tension")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4 italic opacity-80">
           {t("tap_the_areas_where_you_feel_the_anxiety_sitting_r")}</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[380px] relative">
        {/* Minimal human silhouette with tap zones */}
        <div className="relative mx-auto" style={{ width: 220, height: 320 }}>
          <svg viewBox="0 0 200 320" className="w-full h-full opacity-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M100 20 L100 45 M100 50 C115 50 125 60 125 75 L125 90 M100 50 C85 50 75 60 75 75 L75 90 M75 90 L50 160 M125 90 L150 160 M75 90 L125 90 M100 90 L100 220 M100 220 L75 300 M100 220 L125 300" />
            <circle cx="100" cy="30" r="15" />
            <rect x="75" y="90" width="50" height="130" rx="25" />
          </svg>

          {bodyAreas.map((area) => {
            const active = isSelected(area.id);
            return (
              <motion.button
                key={area.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleArea(area.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1.5 p-3 min-w-[80px] border-2 ${
                  active
                    ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30 z-20 scale-105'
                    : 'bg-white text-slate-500 border-slate-100 hover:border-primary/20 shadow-sm z-10'
                }`}
                style={{ top: area.top, left: area.left }}
              >
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-white animate-pulse' : 'bg-slate-200'}`} />
                <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${active ? 'text-white' : 'text-slate-400'}`}>{area.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 shrink-0 w-full mt-4">
        <div className="mb-6">
           <p className="text-slate-400 text-[11px] font-medium italic opacity-70">
             {t("just_notice_you_dont_need_to_fix_anything__just_be")}</p>
        </div>
        <button 
          onClick={() => onNext(selected)} 
          disabled={selected.length === 0}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {t("ive_noticed")}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen5BodyCheck;
