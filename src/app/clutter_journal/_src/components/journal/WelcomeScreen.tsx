import { useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WelcomeScreenProps {
  onNext: (name: string) => void;
  onViewJournal: () => void;
  onBack: () => void;
}

const WelcomeScreen = ({ onNext, onViewJournal }: WelcomeScreenProps) => {
    const { t } = useTranslation("clutter_journal");
      const [objectName, setObjectName] = useState("");

  return (
    <div className="w-full flex flex-col items-center">


      <div className="w-full flex flex-col items-center text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("clutter__emotion_journal")}</h1>

          <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[28px] p-8 text-center italic relative overflow-hidden group max-w-2xl mx-auto">
            <p className="text-lg font-bold text-primary leading-relaxed relative z-10">
              {t("every_object_you_keep_is_keeping_something_for_you")}</p>
          </div>

          <p className="text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
            {t("this_isnt_about_clearing_space_its_about_understan")}</p>
        </div>

        <div className="w-full max-w-2xl space-y-4">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center justify-center gap-2">
            {t("think_of_one_item_youve_been_holding_onto")}</label>
          <input
            autoFocus
            type="text"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            placeholder={t("eg_my_mothers_old_scarf_a_broken_watch")}
            className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-[28px] p-8 text-xl font-bold text-slate-700 text-center outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner italic placeholder:text-slate-300"
          />
        </div>

        <div className="w-full max-w-md pt-6">
          <button
            onClick={() => objectName.trim() && onNext(objectName)}
            disabled={!objectName.trim()}
            className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              objectName.trim()
                ? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                : "bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-200/50 shadow-none"
            }`}
          >
            {t("start_reflection")}<ChevronRight size={20} />
          </button>
          
          <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-[0.1em] opacity-60">
            {!objectName.trim() ? t("please_name_an_object_to_start") : t("ready_to_explore")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
