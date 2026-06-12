import React, { useState } from 'react';
import { Quote, Smile, MessageCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (response: string) => void;
}

const Screen4NameIt: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [selected, setSelected] = useState<string | null>(null);

  const responseOptions = [
    { key: 'grounding', label: t("yes_that_felt_grounding"), icon: Smile },
    { key: 'anxious', label: t("kind_of_still_anxious"), icon: MessageCircle },
    { key: 'strong', label: t("no_urge_is_strong"), icon: AlertCircle },
  ];

  return (
    <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
      <header className="space-y-4 mb-10 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_04_labeling")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("call_it_out")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4 italic opacity-80">
           {t("read_this_slowly_out_loud_if_possible")}</p>
      </header>

      <div className="flex-1 space-y-12 mb-8 w-full">
        {/* Affirmation Card */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <Quote className="absolute -top-4 -left-4 w-24 h-24 text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0" />
          <p className="text-2xl font-medium leading-relaxed italic text-white relative z-10">
            {t("this_is_my_ocd_asking_for_reassurance_this_is_not_")}</p>
          <div className="mt-8 flex justify-center gap-1.5 relative z-10">
             <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
             <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          </div>
        </div>

        <div className="space-y-6 w-full">
           <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-slate-100" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                {t("does_this_feel_true")}</p>
              <div className="h-px flex-1 bg-slate-100" />
           </div>
           
           <div className="grid grid-cols-1 gap-3">
             {responseOptions.map((r) => {
               const active = selected === r.key;
               const Icon = r.icon;
               return (
                 <button
                   key={r.key}
                   onClick={() => setSelected(r.key)}
                   className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${active 
                     ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-primary/20 hover:bg-slate-50/50'
                   }`}
                 >
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-white/20' : 'bg-slate-50 text-primary group-hover:bg-white group-hover:shadow-sm'}`}>
                      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                   </div>
                   <span className={`text-[13px] font-bold uppercase tracking-wider ${active ? 'text-white' : 'text-slate-600'}`}>{r.label}</span>
                 </button>
               );
             })}
           </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 shrink-0 w-full">
        <button 
          onClick={() => onNext(selected || '')} 
          disabled={!selected}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {t("continue")}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen4NameIt;
