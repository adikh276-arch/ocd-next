import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (action: string) => void;
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

const Screen5Discard = ({ onNext }: Props) => {
    const { t } = useTranslation("discard_it");
  const ACTIONS = [
    { emoji: "🗑️", label: t("binned_it") },
    { emoji: "🤝", label: t("donated_it") },
    { emoji: "📦", label: t("placed_it_outside") },
  ];

  const [selected, setSelected] = useState(ACTIONS[0].label);

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <GradientBadge>
          <Trash2 className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("let_it_go")}</p>
      </div>

      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        {t("take_a_breath_and_release")}</h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
        {t("youve_held_the_item_youve_sat_with_the_feeling_now")}</p>

      <div className="flex flex-col gap-3 mb-8">
        {ACTIONS.map((action) => {
          const isSelected = selected === action.label;
          return (
            <button
              key={action.label}
              onClick={() => setSelected(action.label)}
              className={`w-full flex items-center p-4 rounded-xl border text-left flex-row gap-3 transition-all active:scale-[0.98] ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border/50 text-foreground hover:bg-secondary/40 hover:border-border"
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                <span className="text-lg">{action.emoji}</span>
              </div>
              <span className="font-body text-[15px] font-medium">{action.label}</span>
              {isSelected && <Check size={18} className="ml-auto opacity-90" />}
            </button>
          );
        })}
      </div>

      <div className="text-center mb-10">
        <p className="text-sm text-muted-foreground font-body italic">
          {t("whatever_you_feel_right_now_it_will_pass_you_are_d")}</p>
      </div>

      <ActivityButton onClick={() => onNext(selected)}>
        {t("i_did_it")}</ActivityButton>
    </>
  );
};

export default Screen5Discard;
