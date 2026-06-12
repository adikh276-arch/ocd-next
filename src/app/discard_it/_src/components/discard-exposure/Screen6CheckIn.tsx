import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (anxiety: number) => void;
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

const Screen6CheckIn = ({ onNext }: Props) => {
    const { t } = useTranslation("discard_it");
  const [anxiety, setAnxiety] = useState(5);

  const getEmoji = (val: number) => {
    if (val <= 3) return "😌";
    if (val <= 6) return "😐";
    return "😰";
  };

  const getLabel = (val: number) => {
    if (val <= 3) return t("calm", "Calm");
    if (val <= 6) return t("a_little_anxious", "A little anxious");
    return t("still_anxious_and_thats_okay", "Still anxious — and that's okay");
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <GradientBadge>
          <MessageSquareText className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("check_in")}</p>
      </div>

      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        {t("how_do_you_feel_now")}</h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
        {t("take_a_moment_to_check_in_with_yourself_notice_any")}</p>

      <div className="flex-1 flex flex-col items-center justify-center py-10">
        <div className="text-7xl mb-6 transition-all duration-300 drop-shadow-sm">
          {getEmoji(anxiety)}
        </div>
        <p className="text-foreground font-semibold text-xl mb-12 transition-all duration-300 text-center">
          {getLabel(anxiety)}
        </p>

        <div className="w-full space-y-6">
          <input
            type="range"
            min={0}
            max={10}
            value={anxiety}
            onChange={(e) => setAnxiety(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
          />
          <div className="flex justify-between px-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tighter">{t("0_calm")}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tighter">{t("10_anxious")}</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground font-body italic">
          {t("whatever_you_feel_you_did_it_thats_what_matters")}</p>
      </div>

      <ActivityButton onClick={() => onNext(anxiety)}>
        {t("see_how_i_did")}</ActivityButton>
    </>
  );
};

export default Screen6CheckIn;
