import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const LadderIcon = () => (
  <svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <line x1="16" y1="8" x2="16" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="48" y1="8" x2="48" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="16" x2="48" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="30" x2="48" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="58" x2="48" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface IntroCardProps {
  day: number;
}

const IntroCard = ({ day }: IntroCardProps) => {
    const { t } = useTranslation("fear_ladder");
      return (
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1" />
            <span className="text-xs font-medium tracking-wide uppercase text-primary bg-therapy-glow px-3 py-1 rounded-full">
              {t("day")}{day} {t("practice")}</span>
          </div>

          <div className="flex items-start gap-6">
            <div className="hidden sm:flex items-center justify-center text-primary/50 flex-shrink-0 mt-1">
              <LadderIcon />
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                {t("build_your_fear_ladder")}</h1>
              <div className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>{t("this_fear_ladder_helps_you_pra")}</p>
                <p>{t("you_ll_start_with_small_manage")}</p>
                <p className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60" />
                  <span>{t("feeling_uncomfortable_or_uncer")}</span>
                </p>
                <p>{t("the_goal_is_not_to_feel_calm_b")}</p>
              </div>
            </div>
          </div>
        </div>
      );
};

export default IntroCard;
