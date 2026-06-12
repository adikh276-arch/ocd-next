import { Brain, Swords, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
    const { t } = useTranslation("truth_seeker_quiz");
      return (
        <div className="card-therapeutic animate-fade-card-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex items-center justify-center shadow-sm">
              <Swords className="text-primary" size={18} />
            </div>
            <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
              {t("knowledge_challenge")}</p>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-[32px] bg-secondary/50 flex items-center justify-center mb-6 shadow-inner">
              <Brain size={40} className="text-primary/60" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3 tracking-tight">
              {t("truth_seeker_quiz")}</h1>
            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-[280px]">
              {t("ocd_twists_the_truth_can_you_separate_the_myths_fr")}</p>
          </div>

          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                <span className="font-bold text-sm">5</span>
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">{t("5_key_rounds")}</p>
                <p className="text-[11px] text-muted-foreground font-body">{t("common_ocd_myths_explored")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-amber-500">
                <Zap size={18} />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">{t("instant_insights")}</p>
                <p className="text-[11px] text-muted-foreground font-body">{t("learn_the_reality_after_each_answer")}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body text-sm font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            {t("lets_play")}</button>
        </div>
      );
};

export default IntroScreen;
