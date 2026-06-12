import React, { useState } from "react";
import { CheckCircle2, MessageCircle, Star, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onComplete: (data: { reflection: string; discomfortAfter: number }) => void;
  saving?: boolean;
}

const Screen3Acceptance: React.FC<Props> = ({ onComplete, saving }) => {
    const { t } = useTranslation("uncertainity_acceptance");
      const [reflection, setReflection] = useState("");
  const [level, setLevel] = useState<number>(5);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-12 text-center md:text-left">
        
        {/* Left Side: The Commitment */}
        <div className="flex-1 w-full space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">{t("step_2_accept")}</span>
               <div className="h-px w-8 bg-primary/20 md:hidden" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
               {t("choosing_peace")}</h2>
            <p className="text-lg text-slate-500 font-medium italic">
               {t("let_the_doubt_exist_without_resolving_it_this_is_y")}</p>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 border-dashed rounded-[40px] p-10 text-center space-y-6 relative group overflow-hidden">
             <div className="w-16 h-16 bg-white border-2 border-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform shadow-sm relative z-10">
                <CheckCircle2 size={32} />
             </div>
             <p className="text-2xl md:text-3xl font-black text-primary tracking-tight leading-tight italic relative z-10">
                {t("i_am_willing_to_let_this_maybe_be_i_dont_need_an_a")}</p>
          </div>
        </div>

        {/* Right Side: Reflection and Final Rating */}
        <div className="flex-1 w-full space-y-10">
          <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-10 shadow-xl shadow-slate-100/50">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                      <MessageCircle size={20} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("reflection")}</span>
                </div>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder={t("how_do_you_feel_now")}
                  className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-lg font-bold text-slate-900 outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner italic resize-none placeholder:text-slate-300"
                />
             </div>

             <div className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                   <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                      <Star size={20} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{t("final_discomfort")}</span>
                </div>
                
                <div className="text-center space-y-2">
                   <p className="text-6xl font-black text-slate-900 tracking-tighter">{level}</p>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("scale_of_0-10")}</p>
                </div>

                <div className="px-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={level}
                    onChange={(e) => setLevel(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary transition-all hover:accent-primary-hover"
                  />
                </div>
             </div>
          </div>

          <div className="w-full pt-4">
            <button
              onClick={() => onComplete({ reflection, discomfortAfter: level })}
              disabled={saving || !reflection.trim()}
              className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
            >
              {saving ? "Saving..." : "Finish Practice"} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen3Acceptance;
