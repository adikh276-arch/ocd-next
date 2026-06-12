import React from "react";
import { Waves, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const Screen2Defusion: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("thought_diffusion");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            
            {/* Left Side: The Concept */}
            <div className="flex-1 w-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <div className="h-px w-8 bg-primary/20" />
                   <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                      {t("the_concept")}</span>
                   <div className="h-px w-8 bg-primary/20 md:hidden" />
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                   {t("breaking_fusion")}</h2>
                <p className="text-lg text-slate-500 font-medium italic">
                   {t("we_often_believe_and_obey_our_thoughts_automatical")}</p>
              </div>

              <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-10 flex flex-col items-center md:items-start gap-6 group hover:border-slate-200 transition-all">
                 <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    <Waves size={32} />
                 </div>
                 <p className="text-base font-bold text-slate-600 leading-relaxed italic">
                    {t("defusion_is_about_noticing_the_process_of_thinking")}</p>
              </div>
            </div>

            {/* Right Side: The Shift */}
            <div className="flex-1 w-full space-y-8">
              <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-10 shadow-xl shadow-slate-100/50">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("fused")}</p>
                    <p className="text-2xl font-black text-slate-300 line-through tracking-tight">{t("i_am_a_failure")}</p>
                 </div>

                 <div className="flex justify-center">
                    <div className="h-px w-12 bg-slate-100" />
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t("defused")}</p>
                    <div className="bg-primary/5 border-2 border-primary/20 rounded-[24px] p-6">
                       <p className="text-2xl font-black text-primary tracking-tight leading-tight">
                          {t("i_am_having_the_thought_that_i_am_a_failure")}</p>
                    </div>
                 </div>
              </div>

              <div className="w-full pt-4">
                <button
                  onClick={onNext}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {t("next_step")}<ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Screen2Defusion;
