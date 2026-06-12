import { Wind, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onBegin: () => void;
  onBack: () => void;
}

const Screen1Welcome = ({ onBegin }: Props) => {
    const { t } = useTranslation("urge_surfing");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
               <Wind size={64} strokeWidth={1.5} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("urge_surfing")}</h1>

              <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[28px] p-8 text-center italic relative overflow-hidden group max-w-2xl mx-auto">
                <p className="text-lg font-bold text-primary leading-relaxed relative z-10">
                  {t("you_cant_stop_the_waves_but_you_can_learn_to_surf_")}</p>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                {t("an_urge_is_like_an_ocean_wave_it_builds_in_intensi")}</p>
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onBegin}
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
