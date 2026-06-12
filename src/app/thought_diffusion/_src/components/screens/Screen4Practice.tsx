import React, { useState } from "react";
import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  guidedRewrite: string;
  ownThought: string;
  ownRewrite: string;
  onGuidedChange: (v: string) => void;
  onOwnThoughtChange: (v: string) => void;
  onOwnRewriteChange: (v: string) => void;
  onNext: () => void;
}

const Screen4Practice: React.FC<Props> = ({
  guidedRewrite, ownThought, ownRewrite,
  onGuidedChange, onOwnThoughtChange, onOwnRewriteChange, onNext
}) => {
    const { t } = useTranslation("thought_diffusion");
      const [step, setStep] = useState(1);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
             <div className="h-px w-8 bg-primary/20" />
             <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                {step === 1 ? 'Step 1: Practice' : 'Step 2: Your Turn'}
             </span>
             <div className="h-px w-8 bg-primary/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
             {step === 1 ? 'Notice the Thought' : 'Apply it to Yourself'}
          </h2>
          <p className="text-lg text-slate-500 font-medium italic max-w-xl mx-auto">
             {step === 1 
               ? "Instead of believing a thought is a fact, we label it as just something our brain is saying."
               : "Now, try it with a thought that has been bothering you lately."}
          </p>
        </div>

        {/* Practice Content */}
        <div className="w-full">
          {step === 1 ? (
            <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-10 shadow-2xl shadow-slate-100/50 relative overflow-hidden group hover:border-primary/20 transition-all">
               <div className="flex items-center gap-3 relative z-10 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                     <ShieldCheck size={24} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t("example_practice")}</span>
               </div>

               <div className="space-y-6">
                  <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 text-center space-y-3">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{t("the_intrusive_thought")}</p>
                     <p className="text-2xl font-bold text-slate-900 italic leading-tight">
                       {t("i_am_a_bad_person_for_having_this_thought")}</p>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-2 px-4">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t("add_the_distance")}</span>
                     </div>
                     <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                           <span className="text-lg font-bold text-slate-400 italic">{t("i_am_having_the_thought_that")}</span>
                        </div>
                        <input
                          autoFocus
                          className="w-full h-20 pl-[270px] pr-8 bg-slate-50 border-2 border-slate-100 rounded-[28px] text-lg font-bold text-slate-900 outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner italic"
                          value={guidedRewrite}
                          onChange={(e) => onGuidedChange(e.target.value)}
                          placeholder={t("")}
                        />
                     </div>
                  </div>
               </div>

               <div className="pt-6">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!guidedRewrite.trim()}
                    className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
                  >
                    {t("got_it_lets_try_mine")}<ChevronRight size={20} />
                  </button>
               </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-10 shadow-2xl shadow-slate-100/50 relative overflow-hidden group hover:border-amber-200 transition-all">
               <div className="flex items-center gap-3 relative z-10 mb-2">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:rotate-12 transition-transform">
                     <Sparkles size={24} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t("your_turn")}</span>
               </div>

               <div className="space-y-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 px-4">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{t("what_is_the_thought")}</span>
                     </div>
                     <input
                        autoFocus
                        className="w-full h-20 px-8 bg-slate-50 border-2 border-slate-100 rounded-[28px] text-lg font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-amber-200 focus:bg-white transition-all shadow-inner italic"
                        placeholder={t("eg_i_might_lose_my_job")}
                        value={ownThought}
                        onChange={(e) => onOwnThoughtChange(e.target.value)}
                     />
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-2 px-4">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{t("now_add_the_distance")}</span>
                     </div>
                     <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                           <span className="text-lg font-bold text-slate-400 italic">{t("i_am_having_the_thought_that")}</span>
                        </div>
                        <input
                          className="w-full h-20 pl-[270px] pr-8 bg-slate-50 border-2 border-slate-100 rounded-[28px] text-lg font-bold text-slate-900 outline-none focus:border-amber-200 focus:bg-white transition-all shadow-inner italic"
                          value={ownRewrite}
                          onChange={(e) => onOwnRewriteChange(e.target.value)}
                          placeholder={t("")}
                        />
                     </div>
                  </div>
               </div>

               <div className="pt-6">
                  <button
                    onClick={onNext}
                    disabled={!ownThought.trim() || !ownRewrite.trim()}
                    className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
                  >
                    {t("finish_practice")}<ChevronRight size={20} />
                  </button>
               </div>
            </div>
          )}
        </div>

        <p className="text-[11px] font-bold text-slate-400 text-center px-4 italic max-w-xl">
           {step === 1 
             ? "By adding 'I am having the thought that...', you create a gap between yourself and the noise."
             : "Remember: You are the sky, the thoughts are just clouds passing through."}
        </p>
      </div>
    </div>
  );
};

export default Screen4Practice;
