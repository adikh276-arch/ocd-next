import React from "react";
import { Sparkles, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WelcomeScreenProps {
  onNext: () => void;
  onBack: () => void;
}

/* ─── Gradient icon badge ─── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
          {children}
        </div>
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

const WelcomeScreen = ({ onNext, onBack }: WelcomeScreenProps) => {
    const { t } = useTranslation("guided_imagery");
      return (
        <div className="flex flex-1 flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <GradientBadge>
              <Home className="text-primary" size={16} />
            </GradientBadge>
            <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
              {t("visualization")}</p>
          </div>

          <div className="flex-1 flex flex-col items-center text-center">
            <div className="mb-8 w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center text-5xl shadow-sm border border-primary/10">
              🏠
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4 leading-tight">
              {t("imagining_a_clutter-free_space")}</h1>

            <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
              {t("what_if_your_space_could_feel_calm_and_organized_t")}</p>

            <div className="w-full rounded-2xl border border-primary/10 bg-primary/5 p-5 text-left flex gap-4 items-start mb-10">
              <div className="mt-1">
                <Sparkles className="text-primary/60" size={18} />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-1">{t("gentle_practice")}</p>
                <p className="text-muted-foreground text-[13px] leading-relaxed italic">
                  {t("it_takes_less_than_3_minutes_to_shift_your_perspec")}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <ActivityButton onClick={onNext}>
              {t("lets_see_it")}</ActivityButton>
          </div>
        </div>
      );
};

export default WelcomeScreen;
