import React from "react";
import { ShieldCheck, Target, Wind, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onBegin: () => void;
}

const Screen1Intro: React.FC<Props> = ({ onBegin }) => {
    const { t } = useTranslation("uncertainity_acceptance");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
               <ShieldCheck size={64} strokeWidth={1.5} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t("uncertainty_acceptance")}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                {t("a_quiet_practice_of_sitting_with_a_doubt__and_choo")}</p>
            </div>

            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 flex flex-col items-center md:items-start text-center md:text-left gap-4 group hover:border-slate-200 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                     <Target size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("not_about_convincing")}</h4>
                    <p className="text-base font-bold text-slate-600 leading-tight italic">{t("youre_not_proving_it_wrong_just_letting_it_exist")}</p>
                  </div>
               </div>

               <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 flex flex-col items-center md:items-start text-center md:text-left gap-4 group hover:border-slate-200 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                     <Wind size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("sit_with_the_wave")}</h4>
                    <p className="text-base font-bold text-slate-600 leading-tight italic">{t("discomfort_rises_then_falls_you_dont_have_to_act")}</p>
                  </div>
               </div>
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onBegin}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {t("begin_practice")}<ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      );
};

export default Screen1Intro;
