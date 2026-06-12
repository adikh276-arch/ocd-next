import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChallengeScreenProps {
  onNext: (challenge: string) => void;
  onBack: () => void;
}

const ChallengeScreen = ({ onNext, onBack }: ChallengeScreenProps) => {
    const { t } = useTranslation("brave_steps");
    const challenges = [
      { emoji: "🟢", label: t("touch_a_doorknob"), difficulty: t("easy"), color: "bg-green-50 text-green-700 border-green-100" },
      { emoji: "🟡", label: t("touch_a_shoe_sole"), difficulty: t("medium"), color: "bg-amber-50 text-amber-700 border-amber-100" },
      { emoji: "🟠", label: t("touch_a_dustbin_lid"), difficulty: t("hard"), color: "bg-orange-50 text-orange-700 border-orange-100" },
      { emoji: "🔴", label: t("touch_a_toilet_handle"), difficulty: t("very_hard"), color: "bg-red-50 text-red-700 border-red-100" },
    ];
      
      const [selected, setSelected] = useState(1);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("choose_your_challenge")}</h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
            {t("pick_something_that_feels_like_a_stretch__not_impo")}</p>
        </div>

        <div className="w-full space-y-4">
          {challenges.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-6 p-6 rounded-[24px] border-2 transition-all group ${
                selected === i
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {c.emoji}
              </div>
              
              <div className="flex-1 text-left">
                <p className={`text-lg font-bold ${selected === i ? 'text-primary' : 'text-slate-900'}`}>
                  {c.label}
                </p>
                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider border ${c.color} mt-2 inline-block`}>
                  {c.difficulty}
                </span>
              </div>

              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === i ? 'bg-primary border-primary text-white' : 'border-slate-100 text-slate-200'
              }`}>
                {selected === i && <ChevronRight size={20} />}
              </div>
            </button>
          ))}
        </div>

        <div className="w-full max-w-md pt-6">
          <button
            onClick={() => onNext(challenges[selected].label)}
            className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
          >
            {t("start_exposure")}<ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeScreen;
