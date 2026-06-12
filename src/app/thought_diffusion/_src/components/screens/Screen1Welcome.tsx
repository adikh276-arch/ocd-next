import React from "react";
import { Cloud, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const Screen1Welcome: React.FC<Props> = ({ onNext }) => {
    const { t } = useTranslation("thought_diffusion");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
               <Cloud size={64} strokeWidth={1.5} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t("thought_diffusion")}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                {t("learn_to_observe_your_thoughts_without_being_consu")}</p>
            </div>

            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[32px] p-8 relative group overflow-hidden">
                 <Cloud className="absolute -top-4 -right-4 text-primary/10 group-hover:scale-110 transition-transform duration-700" size={100} />
                 <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed italic relative z-10">
                   {t("thoughts_are_like_clouds_passing_in_the_sky_you_ar")}</p>
              </div>
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onNext}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {t("start_practice")}<ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      );
};

export default Screen1Welcome;
