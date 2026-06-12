import type { LadderItem } from "./types";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  item: LadderItem;
  stepNumber: number;
  onNext: () => void;
}

/* ─── Gradient icon badge ─── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("discard_it");
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
          {children}
        </div>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("discard_it");
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

const Screen3TodaysItem = ({ item, stepNumber, onNext }: Props) => {
    const { t } = useTranslation("discard_it");
      return (
        <>
          <div className="flex items-center gap-3 mb-5">
            <GradientBadge>
              <Star className="text-primary" size={16} />
            </GradientBadge>
            <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
              {t("step")}{stepNumber} {t("of_5")}</p>
          </div>

          <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
            {t("todays_exposure")}</h2>
          <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
            {t("take_a_moment_to_find_this_item_hold_it_in_your_ha")}</p>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-[2rem] p-10 flex flex-col items-center text-center mb-10 border border-primary/10 shadow-inner">
            <span className="text-6xl mb-6 drop-shadow-sm">{item.emoji}</span>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">{item.label}</h3>
          </div>

          <div className="text-center space-y-4 mb-10">
            <p className="text-muted-foreground font-body text-[15px] leading-relaxed">
              {t("focus_on_your_breath_as_you_hold_the_item_you_dont")}</p>
            <p className="text-xs text-muted-foreground italic font-body">
              {t("observe_the_thoughts_that_arise_without_judgment")}</p>
          </div>

          <ActivityButton onClick={onNext}>
            {t("im_holding_it")}</ActivityButton>
        </>
      );
};

export default Screen3TodaysItem;
