import React, { useState } from 'react';
import { CATEGORIES, Trigger, CategoryKey } from './types';
import { ChevronRight, Target, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  triggers: Trigger[];
  onNext: (data: { name: string; category: string }) => void;
  onComplete: () => void;
}

const ScreenAddTriggers: React.FC<Props> = ({ triggers, onNext, onComplete }) => {
    const { t } = useTranslation("trigger_map");
      const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(CATEGORIES[0].key);

  const handleAdd = () => {
    if (text.trim()) {
      onNext({ name: text.trim(), category: selectedCategory });
      setText('');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
             <div className="h-px w-8 bg-primary/20" />
             <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                {t("capture_trigger")}</span>
             <div className="h-px w-8 bg-primary/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
             {t("what_triggers_you")}</h2>
          <p className="text-lg text-slate-500 font-medium italic">
             {t("think_of_a_specific_situation_place_or_thought_tha")}</p>
        </div>

        <div className={`w-full flex flex-col md:flex-row items-start gap-12 text-left ${triggers.length === 0 ? 'justify-center' : ''}`}>
          
          {/* Main Input Area */}
          <div className={`w-full space-y-12 ${triggers.length === 0 ? 'max-w-2xl' : 'flex-1'}`}>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t("1_describe_it")}</label>
              <div className="relative group">
                 <input
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                   placeholder={t("eg_using_a_public_restroom")}
                   className="w-full h-20 pl-16 pr-8 bg-slate-50 border-2 border-slate-100 rounded-[28px] text-lg font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
                 />
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={24} />
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t("2_category")}</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-5 py-2.5 rounded-full text-xs font-black transition-all border-2 flex items-center gap-2 ${
                      selectedCategory === cat.key
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    {t(cat.label)}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-md pt-4">
              <button
                onClick={handleAdd}
                disabled={!text.trim()}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
              >
                {t("add_trigger")}<ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Map Progress - Only shown when triggers exist */}
          {triggers.length > 0 && (
            <div className="w-full md:w-80 space-y-6">
              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[32px] p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="space-y-4 relative z-10 text-center md:text-left">
                   <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm mx-auto md:mx-0">
                      <Target size={28} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{t("map_progress")}</p>
                     <p className="text-3xl font-black text-emerald-800 tracking-tight">
                        {triggers.length} <span className="text-base font-bold uppercase">{triggers.length === 1 ? 'Trigger' : 'Triggers'}</span>
                     </p>
                   </div>
                </div>

                <div className="pt-4 relative z-10">
                   <button 
                     onClick={onComplete}
                     className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-[0.98] flex items-center justify-center gap-2"
                   >
                      {t("visualize_map")}<ChevronRight size={16} />
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenAddTriggers;
