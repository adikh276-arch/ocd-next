import React, { useState } from "react";
import { MessageSquare, ShieldAlert, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (data: { doubtText: string; discomfortBefore: number }) => void;
}

const Screen2NameDoubt: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("uncertainity_acceptance");
      const [text, setText] = useState("");
  const [level, setLevel] = useState<number>(5);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-12 text-center md:text-left">
        
        {/* Left Side: The Input */}
        <div className="flex-1 w-full space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">{t("step_1_identify")}</span>
               <div className="h-px w-8 bg-primary/20 md:hidden" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
               {t("what_is_the_doubt")}</h2>
            <p className="text-lg text-slate-500 font-medium italic">
               {t("briefly_name_the_thought_or_what_if_that_is_trigge")}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 space-y-6 shadow-xl shadow-slate-100/50 group hover:border-primary/20 transition-all">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                     <MessageSquare size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("the_uncertainty")}</span>
               </div>
               <textarea
                 autoFocus
                 value={text}
                 onChange={(e) => setText(e.target.value)}
                 placeholder={t("eg_what_if_i_made_a_mistake")}
                 className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-lg font-bold text-slate-900 outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner italic resize-none placeholder:text-slate-300"
               />
            </div>
          </div>
        </div>

        {/* Right Side: Rating and Action */}
        <div className="flex-1 w-full space-y-10">
          <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-10 shadow-xl shadow-slate-100/50">
             <div className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                   <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <ShieldAlert size={20} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{t("discomfort_level")}</span>
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
                  <div className="flex justify-between mt-4 px-1">
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("mild")}</span>
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("intense")}</span>
                  </div>
                </div>
             </div>
          </div>

          <div className="w-full pt-4">
            <button
              onClick={() => text.trim() && onNext({ doubtText: text, discomfortBefore: level })}
              disabled={!text.trim()}
              className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
            >
              {t("begin_acceptance")}<ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen2NameDoubt;
