import React, { useState } from 'react';
import { MessageSquare, Smile, Frown, Meh, Annoyed, Heart, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (emoji: string, note: string) => void;
}

const Screen8Reflection: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("reassurance_resistance");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const moodOptions = [
    { key: 'distressed', emoji: '😰', label: t("distressed"), icon: Frown },
    { key: 'anxious', emoji: '😟', label: t("anxious"), icon: Annoyed },
    { key: 'neutral', emoji: '😐', label: t("neutral"), icon: Meh },
    { key: 'calm', emoji: '🙂', label: t("calming"), icon: Smile },
    { key: 'resolved', emoji: '😌', label: t("resolved"), icon: Heart },
  ];

  const handleNext = () => {
    const mood = moodOptions.find(m => m.key === selectedMood);
    onNext(mood?.emoji || '', note);
  };

  return (
    <div className="flex flex-col items-center text-center font-sans w-full max-w-lg mx-auto">
      <header className="text-center space-y-4 mb-10 shrink-0 w-full">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
              {t("step_08_reflection")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
           {t("how_do_you_feel_now")}</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4 italic opacity-80">
           {t("compare_this_to_when_you_first_started")}</p>
      </header>

      <div className="flex-1 space-y-8 mb-8 w-full">
        <section className="space-y-4">
           <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px flex-1 bg-slate-100" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 flex items-center gap-2">
                <Smile size={14} className="text-primary/60" /> {t("current_state")}</label>
              <div className="h-px flex-1 bg-slate-100" />
           </div>
           
           <div className="grid grid-cols-1 gap-2.5">
             {moodOptions.map((m) => {
               const active = selectedMood === m.key;
               const Icon = m.icon;
               return (
                 <button
                   key={m.key}
                   onClick={() => setSelectedMood(m.key)}
                   className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${active 
                     ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-primary/20 hover:bg-slate-50/50'
                   }`}
                 >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-white/20' : 'bg-slate-50 text-primary group-hover:bg-white group-hover:shadow-sm'}`}>
                      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                   </div>
                   <span className={`text-[13px] font-bold uppercase tracking-wider flex-1 ${active ? 'text-white' : 'text-slate-600'}`}>{m.label}</span>
                   <span className={`text-2xl shrink-0 transition-transform ${active ? 'scale-125' : 'grayscale group-hover:grayscale-0'}`}>{m.emoji}</span>
                 </button>
               );
             })}
           </div>
        </section>

        <section className="space-y-4">
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <MessageSquare size={14} className="text-primary/60" /> {t("notes")}</label>
           <div className="relative group">
              <div className="absolute inset-0 bg-slate-100/50 rounded-2xl -m-0.5 group-focus-within:bg-primary/5 transition-colors" />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("write_a_short_note_about_this_experience")}
                className="relative w-full h-32 p-6 bg-white border border-slate-200 rounded-2xl text-base font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/30 transition-all shadow-sm italic"
              />
           </div>
        </section>
      </div>

      <div className="pt-8 border-t border-slate-50 shrink-0 w-full">
        <button 
          onClick={handleNext} 
          disabled={!selectedMood}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group"
        >
          {t("almost_done")}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Screen8Reflection;
