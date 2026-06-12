import { Map, Zap, Target, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onBegin: () => void;
}

const ScreenIntro = ({ onBegin }: Props) => {
    const { t } = useTranslation("trigger_map");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
               <Map size={64} strokeWidth={1.5} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t("trigger_spotter")}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                {t("a_diagnostic_tool_to_help_you_visualize_the_situat")}</p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-[24px] border-2 border-slate-100 p-6 flex items-start gap-4 text-left group hover:border-primary/20 transition-all">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                   <Target size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("categorize")}</p>
                  <p className="text-sm font-bold text-slate-900 leading-tight">{t("map_your_triggers_to_specific_areas_of_your_life")}</p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] border-2 border-slate-100 p-6 flex items-start gap-4 text-left group hover:border-primary/20 transition-all">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shrink-0">
                   <Zap size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("rate_intensity")}</p>
                  <p className="text-sm font-bold text-slate-900 leading-tight">{t("identify_which_triggers_need_the_most_attention_fi")}</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onBegin}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {t("begin_analysis")}<ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      );
};

export default ScreenIntro;
