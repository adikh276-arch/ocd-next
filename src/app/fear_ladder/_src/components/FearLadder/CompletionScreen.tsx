import { DayLog } from "@/app/fear_ladder/_src/hooks/useFearLadderStorage";
import { LadderStep } from "./LadderBuilder";
import { useEffect, useState } from "react";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";

interface CompletionScreenProps {
  logs: DayLog[];
  steps: LadderStep[];
  onStartNew: () => void;
  onReviewProgress: () => void;
}

// Simple confetti particle
const ConfettiParticle = ({ delay, left }: { delay: number; left: number }) => (
  <div
    className="absolute w-2 h-2 rounded-full opacity-0 animate-confetti"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      backgroundColor: `hsl(${160 + Math.random() * 40}, ${40 + Math.random() * 20}%, ${40 + Math.random() * 30}%)`,
    }}
  />
);

const CompletionScreen = ({ logs, steps, onStartNew, onReviewProgress }: CompletionScreenProps) => {
    const { t } = useTranslation("fear_ladder");
      const [showConfetti, setShowConfetti] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);

  // Map step data for easy lookup
  const stepMap = new Map(steps.map(s => [s.id, s]));

  // Derive steps from logs for the summary ladder (ordered by day)
  const completedSteps = [...logs].sort((a, b) => a.day - b.day);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden py-10">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiParticle key={i} delay={i * 0.1} left={Math.random() * 100} />
          ))}
        </div>
      )}

      <div className="bg-card border border-border rounded-[30px] p-8 md:p-12 text-center max-w-xl w-full shadow-xl space-y-8 relative z-10 mx-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex flex-col items-center justify-center mx-auto mb-2">
          <span className="text-4xl">👑</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            {t("10_practices_complete")}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {t("you_showed_up_and_faced_your_f")}</p>
        </div>

        {/* Centerpiece */}
        <div className="bg-therapy-glow rounded-2xl p-6 border border-primary/10">
          <p className="text-sm font-medium text-primary">
            {t("you_faced_all")}{logs.length} {t("fears_on_your_ladder")}<br />
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{t("total_mastery")}</span>
          </p>
        </div>

        {/* Final Ladder View */}
        <div className="space-y-4 text-left">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">{t("your_therapeutic_journey")}</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar p-1">
            {completedSteps.map((log, idx) => {
              const step = stepMap.get(log.stepId);
              return (
                <div key={log.stepId} className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-border/60 hover:border-primary/20 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/20 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-primary font-black text-[10px]">{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-foreground leading-tight">
                      {step?.situation || log.notes || `${t("practice")} ${idx + 1}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium text-muted-foreground">{t("anxiety")}{log.anxietyBefore} → {log.anxietyAfter}</span>
                      <span className="text-[10px] text-primary/40 font-black">✓</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standard Finishing Experience */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <button
            onClick={() => setShowCompletion(true)}
            className="w-full py-5 rounded-[2rem] bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("complete_journey")}</button>
        </div>
      </div>
      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="👑"
        title={t("journey_mastered")}
        description={t("youve_successfully_climbed_your_fear_ladder_every_")}
        onStartOver={onStartNew}
        startOverText={t("start_a_new_journey")}
        showHome={false}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default CompletionScreen;
