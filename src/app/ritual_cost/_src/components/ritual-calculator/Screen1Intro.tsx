import { Clock, BarChart3, Heart, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const Screen1Intro = ({ onNext }: Props) => {
    const { t } = useTranslation("ritual_cost");
    const features = [
      { icon: Clock, title: t("track_rituals"), subtitle: t("log_frequency_and_duration") },
      { icon: BarChart3, title: t("see_the_impact"), subtitle: t("daily_weekly_and_yearly_cost") },
      { icon: Heart, title: t("reclaim_your_life"), subtitle: t("visualize_what_you_could_do_instead") },
    ];
      
      return (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
               <BarChart3 size={64} strokeWidth={1.5} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t("the_ritual_cost")}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                {t("what_is_ocd_really_taking_understanding_the_hidden")}</p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-[24px] border-2 border-slate-100 p-6 flex flex-col items-center gap-4 text-center group hover:border-primary/20 transition-all"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <f.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{f.title}</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{f.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onNext}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {t("calculate_my_cost")}<ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      );
};

export default Screen1Intro;
