import { Gift } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface RewardSectionProps {
  reward: string;
  onRewardChange: (val: string) => void;
}

const RewardSection = ({ reward, onRewardChange }: RewardSectionProps) => {
    const { t } = useTranslation("fear_ladder");
    const suggestions = [
      t("watching_a_favorite_show"),
      t("calling_a_friend"),
      t("taking_a_walk"),
      t("a_small_treat"),
    ];
      
      const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (s: string) => {
    if (selectedChip === s) {
      setSelectedChip(null);
      onRewardChange("");
    } else {
      setSelectedChip(s);
      onRewardChange(s);
    }
  };

  return (
    <section className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
         <div className="w-6 h-6 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-100">
            <Gift size={12} className="text-pink-500" /> 
         </div>
         {t("plan_your_reward")}</label>

      <div className="space-y-1">
        <p className="text-[14px] font-bold text-slate-700 leading-tight">{t("after_practicing_how_will_you_celebrate")}</p>
        <p className="text-[12px] text-slate-400 font-medium italic">{t("plan_something_kind_for_yourself")}</p>
      </div>

      <input
        type="text"
        value={reward}
        onChange={(e) => {
          onRewardChange(e.target.value);
          setSelectedChip(null);
        }}
        placeholder={t("something_kind_for_yourself")}
        className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-xl px-5 py-4 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner"
        maxLength={150}
      />

      <div className="flex flex-wrap gap-2 pt-1">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleChipClick(s)}
            className={`text-[11px] font-bold px-4 py-2 rounded-full border-2 transition-all ${
              selectedChip === s || reward === s
                ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105"
                : "bg-white border-slate-100 text-slate-400 hover:border-primary/30"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest pl-1 italic">
        {t("rewards_are_for_your_effort_not_just_for_the_outco")}</p>
    </section>
  );
};

export default RewardSection;
