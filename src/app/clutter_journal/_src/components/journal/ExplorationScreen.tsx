import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExplorationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const ExplorationScreen = ({ onNext, onBack }: ExplorationScreenProps) => {
    const { t } = useTranslation("clutter_journal");
    const PROMPTS = [
      t("when_did_this_object_come_into_your_life_what_was_happening_"),
      t("what_do_you_imagine_would_happen_if_this_object_was_gone_tom"),
      t("does_this_object_remind_you_of_a_person_a_time_or_a_version_"),
      t("what_does_keeping_this_object_protect_you_from"),
    ];
      
      const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(PROMPTS.length).fill(""));

  const handleNext = () => {
    if (answers[step].trim()) {
      if (step < PROMPTS.length - 1) setStep(step + 1);
      else onNext();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else onBack();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md mx-auto mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${((step + 1) / PROMPTS.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-black text-slate-400 w-10 text-right tabular-nums tracking-widest">
            {step + 1}/{PROMPTS.length}
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("lets_explore_this_")}</h1>
          <p className="text-sm text-slate-500 font-medium italic">
            {t("be_as_detailed_as_you_like_putting_it_into_words_h")}</p>
        </div>

        <div className="w-full space-y-6">
          <div key={step} className="space-y-6">
            <p className="text-lg font-bold text-slate-800 leading-relaxed text-center px-4 italic">
              {PROMPTS[step]}
            </p>
            <textarea
              autoFocus
              value={answers[step]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[step] = e.target.value;
                setAnswers(newAnswers);
              }}
              placeholder={t("write_freely__this_is_just_for_you_")}
              className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-[28px] p-8 text-[15px] text-slate-700 placeholder:text-slate-300 resize-none h-48 transition-all focus:outline-none focus:border-primary/40 focus:bg-white shadow-inner italic"
            />
          </div>
        </div>

        <div className="w-full mt-10 max-w-md">
          <button
            onClick={handleNext}
            disabled={!answers[step].trim()}
            className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              answers[step].trim()
                ? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                : "bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-200/50 shadow-none"
            }`}
          >
            {step < PROMPTS.length - 1 ? t("next_step") : t("ive_reflected_enough")} <ChevronRight size={20} />
          </button>
          
          <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-[0.1em] opacity-60">
            {!answers[step].trim() ? t("please_write_your_thoughts_to_continue") : t("click_to_proceed")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplorationScreen;
