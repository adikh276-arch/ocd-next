import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const WelcomeScreen = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
    const { t } = useTranslation("anxiety_cycle");
      return (
        <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden">
          {/* Header */}
          <div className="w-full max-w-md mx-auto mb-6 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={onBack}
                className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center pb-4 relative z-10">
            <div className="card-therapeutic animate-fade-card-in w-full max-w-md flex flex-col items-center text-center">
              <div className="flex-1 flex flex-col gap-5 pb-4">
                <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                  {t("understanding_health_anxiety")}</h1>

                <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
                  {t("ever_wondered_why_health_worries_never_go_away__no")}</p>

                <div className="w-full h-px bg-border/40 my-2" />

                <div className="space-y-4">
                  <p className="font-body text-[15px] font-medium text-foreground/80">
                    {t("the_cycle_of_worry")}</p>
                  <div className="bg-secondary/50 rounded-2xl p-4 border border-border/30">
                    <p className="font-body text-sm text-foreground/70 leading-relaxed italic">
                      {t("checking_gives_relief__but_never_freedom")}</p>
                  </div>
                </div>
              </div>

              <div className="w-full mt-8 shrink-0">
                <button
                  onClick={onNext}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/20"
                >
                  {t("show_me_")}</button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default WelcomeScreen;
