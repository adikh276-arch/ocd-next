import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface Feeling {
  emoji: string;
  label: string;
}

interface FeelingScreenProps {
  onNext: (feeling: Feeling) => void;
  onBack: () => void;
}

function BackBadge({ onClick }: { onClick: () => void }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <button
          onClick={onClick}
          className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm hover:bg-primary/20 transition-colors"
        >
          <ChevronLeft className="text-primary" size={18} />
        </button>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-primary/20"
        >
          {children}
        </button>
      );
}

const FeelingScreen = ({ onNext, onBack }: FeelingScreenProps) => {
    const { t } = useTranslation("guided_imagery");
      const [selected, setSelected] = useState<Feeling | null>(null);

      const feelings: Feeling[] = [
        { emoji: '😌', label: t("peaceful") },
        { emoji: '🌬️', label: t("like_i_can_breathe") },
        { emoji: '🥲', label: t("emotional__in_a_good_way") },
        { emoji: '😟', label: t("strange__i_feel_guilty") },
        { emoji: '🤔', label: t("unsure__i_dont_know") },
        { emoji: '✨', label: t("light_and_free") },
        { emoji: '🏠', label: t("like_home") },
      ];

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <BackBadge onClick={onBack} />
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("observation")}</p>
      </div>

      <div className="flex-1 flex flex-col items-center text-center">
        <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
          {t("how_does_that_space_make_you_feel")}</h2>
        <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
          {t("just_notice_what_comes_up_whatever_you_feel_is_val")}</p>

        <div className="flex w-full flex-col gap-2 mb-10">
          {feelings.map((f) => {
            const isSelected = selected?.label === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setSelected(f)}
                className={`flex items-center gap-4 rounded-2xl border transition-all duration-300 px-5 py-4 text-left active:scale-[0.98] ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border/50 bg-card text-foreground hover:bg-secondary/40 hover:border-border'
                }`}
              >
                <span className="text-2xl drop-shadow-sm">{f.emoji}</span>
                <span className="text-[15px] font-semibold font-body">{f.label}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground/60 italic leading-relaxed px-6">
          {t("the_goal_is_to_notice_not_to_judge_every_emotion_i")}</p>
      </div>

      <div className="pt-8">
        <ActivityButton
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
        >
          {t("ive_noticed")}</ActivityButton>
      </div>
    </div>
  );
};

export default FeelingScreen;
