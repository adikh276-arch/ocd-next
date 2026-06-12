import React, { useState } from 'react';
import { MessageSquare, Zap, Search, Phone, Users, History, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (worryText: string, urgeType: string) => void;
}

const Screen2WhatsHappening: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [worryText, setWorryText] = useState('');
  const [selectedUrge, setSelectedUrge] = useState<string | null>(null);

  const urgeOptions = [
    { key: 'google', label: t("google_symptoms"), icon: Search },
    { key: 'doctor', label: t("consult_professional"), icon: Phone },
    { key: 'reassurance', label: t("ask_someone"), icon: Users },
    { key: 'check', label: t("re-check_something"), icon: History },
  ];

  return (
    <div className="flex flex-col font-sans max-w-2xl mx-auto w-full">
      <header className="text-center space-y-3 mb-10 shrink-0">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_02_identify")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("whats_going_on")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] mx-auto italic opacity-80">
           {t("capture_the_urge_exactly_as_it_is_right_now")}</p>
      </header>

      <div className="flex-1 space-y-10 mb-8">
        {/* Worry Input */}
        <section className="space-y-4">
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <MessageSquare size={14} className="text-primary/60" /> {t("the_worry")}</label>
           <div className="relative group">
              <div className="absolute inset-0 bg-slate-100/50 rounded-2xl -m-0.5 group-focus-within:bg-primary/5 transition-colors" />
              <textarea
                value={worryText}
                onChange={(e) => setWorryText(e.target.value)}
                placeholder={t("eg_if_i_dont_check_something_will_go_wrong")}
                className="relative w-full h-32 p-6 bg-white border border-slate-200 rounded-2xl text-base font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/30 transition-all shadow-sm italic"
              />
           </div>
        </section>

        {/* Urge Selection */}
        <section className="space-y-4">
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Zap size={14} className="text-primary/60" /> {t("the_urge")}</label>
           <div className="grid grid-cols-2 gap-3">
             {urgeOptions.map((option) => {
               const active = selectedUrge === option.key;
               const Icon = option.icon;
               return (
                 <button
                   key={option.key}
                   onClick={() => setSelectedUrge(option.key)}
                   className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all text-center group ${active 
                     ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-primary/20 hover:bg-slate-50/50'
                   }`}
                 >
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-white/20' : 'bg-slate-50 text-primary group-hover:bg-white group-hover:shadow-sm'}`}>
                      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                   </div>
                   <span className={`text-[11px] font-bold uppercase tracking-wider ${active ? 'text-white' : 'text-slate-600'}`}>{option.label}</span>
                 </button>
               );
             })}
           </div>
        </section>
      </div>
      
      <div className="pt-8 border-t border-slate-50 shrink-0">
        <button 
          onClick={() => onNext(worryText, selectedUrge || '')} 
          disabled={!worryText.trim() || !selectedUrge}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {t("begin_prep")}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen2WhatsHappening;
