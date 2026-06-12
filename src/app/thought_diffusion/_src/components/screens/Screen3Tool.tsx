import React from "react";
import { Quote, ChevronRight, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const Screen3Tool: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("thought_diffusion");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            
            {/* Left Side: The Tool */}
            <div className="flex-1 w-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <div className="h-px w-8 bg-primary/20" />
                   <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                      {t("the_tool")}</span>
                   <div className="h-px w-8 bg-primary/20 md:hidden" />
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                   {t("label_the_noise")}</h2>
                <p className="text-lg text-slate-500 font-medium italic">
                   {t("the_simplest_way_to_defuse_is_using_this_frame_it_")}</p>
              </div>

              <div className="bg-slate-900 rounded-[40px] p-10 text-center shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                 <Quote className="absolute -top-4 -left-4 text-white/10 group-hover:scale-110 transition-transform duration-700" size={120} />
                 <p className="text-3xl md:text-4xl font-black text-white tracking-tight italic relative z-10 leading-tight">
                    {t("i_am_having_the_thought_that")}</p>
              </div>
            </div>

            {/* Right Side: Why it Works */}
            <div className="flex-1 w-full space-y-8">
              <div className="bg-amber-50 border-2 border-amber-100 rounded-[32px] p-10 space-y-6 group hover:border-amber-200 transition-all">
                 <div className="w-14 h-14 rounded-2xl bg-white border-2 border-amber-100 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-sm">
                    <Zap size={28} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{t("why_it_works")}</h4>
                    <p className="text-lg font-bold text-amber-900/80 leading-relaxed italic">
                       {t("this_phrase_reminds_you_that_the_thought_is_an_occ")}</p>
                 </div>
              </div>

              <div className="w-full pt-4">
                <button
                  onClick={onNext}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {t("try_it_yourself")}<ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Screen3Tool;
