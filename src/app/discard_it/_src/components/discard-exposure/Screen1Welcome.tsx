import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
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

const Screen1Welcome = ({ onNext }: Props) => {
    const { t } = useTranslation("discard_it");
      return (
        <>
          <div className="flex items-center gap-3 mb-5">
            <GradientBadge>
              <Leaf className="text-primary" size={16} />
            </GradientBadge>
            <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
              {t("erp_exercise")}</p>
          </div>
          
          <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-5 leading-snug">
            {t("discard_exposure")}</h2>
          
          <div className="space-y-4 text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
            <p>
              {t("start_small_and_build_your_courage_step_by_step_th")}</p>
            <div className="p-5 rounded-2xl bg-secondary/30 border-l-4 border-primary/30">
              <p className="text-foreground/80 font-medium italic">
                {t("you_go_at_your_own_pace_nobody_knows_your_items_be")}</p>
            </div>
          </div>

          <ActivityButton onClick={onNext}>
            {t("im_ready_to_begin")}</ActivityButton>
        </>
      );
};

export default Screen1Welcome;
