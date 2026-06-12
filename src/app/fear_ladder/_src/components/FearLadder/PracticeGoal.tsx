import { Target } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PracticeGoalProps {
  goal: string;
  onGoalChange: (val: string) => void;
}

const PracticeGoal = ({ goal, onGoalChange }: PracticeGoalProps) => {
    const { t } = useTranslation("fear_ladder");
      return (
        <section className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
             <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <Target size={12} className="text-blue-500" /> 
             </div>
             {t("set_your_practice_goal")}</label>
          
          <div className="space-y-1">
            <p className="text-[14px] font-bold text-slate-700 leading-tight">{t("what_fear_would_you_like_to_practice")}</p>
            <p className="text-[12px] text-slate-400 font-medium italic italic">{t("focus_on_learning_to_tolerate_the_uncertainty")}</p>
          </div>

          <input
            type="text"
            value={goal}
            onChange={(e) => onGoalChange(e.target.value)}
            placeholder={t("eg_touching_door_handles_without_washing")}
            className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-xl px-5 py-4 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner"
            maxLength={200}
          />
          <p className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest pl-1 italic">
            {t("face_what_shows_up_without_judgment")}</p>
        </section>
      );
};

export default PracticeGoal;
