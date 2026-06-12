import type { LadderData } from "./types";
import { BarChart3, CheckCircle2, Circle, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  ladder: LadderData;
  onContinue: () => void;
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

const Screen8Ladder = ({ ladder, onContinue }: Props) => {
    const { t } = useTranslation("discard_it");
      const { items, currentStep, sessions } = ladder;
  const totalDays = new Set(sessions.map((s) => s.date)).size || 0;
  const stepsDone = Math.max(currentStep - 1, 0);
  const avgDrop =
    sessions.length > 0
      ? (sessions.reduce((sum, s) => sum + (s.beforeAnxiety - s.afterAnxiety), 0) / sessions.length).toFixed(1)
      : "0";

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <GradientBadge>
          <BarChart3 className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("progress")}</p>
      </div>

      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        {t("your_exposure_ladder")}</h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
        {t("every_rung_you_climb_is_proof_of_your_growing_stre")}</p>

      <div className="flex flex-col gap-3 mb-10">
        {[...items].reverse().map((item, revIdx) => {
          const stepNum = items.length - revIdx;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isLocked = stepNum > currentStep;

          return (
            <div
              key={item.label}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all ${
                isCurrent 
                  ? "bg-primary/5 border-primary shadow-sm" 
                  : isDone 
                  ? "bg-white border-border/50 opacity-100" 
                  : "bg-muted/30 border-transparent opacity-40"
              }`}
            >
              <div className="shrink-0">
                 {isDone ? (
                   <CheckCircle2 size={20} className="text-primary" />
                 ) : isCurrent ? (
                   <Circle size={20} className="text-primary animate-pulse fill-primary/20" />
                 ) : (
                   <Lock size={20} className="text-muted-foreground" />
                 )}
              </div>
              
              <div className="flex-1">
                 <p className={`text-[13px] font-bold uppercase tracking-widest ${isCurrent ? 'text-primary' : 'text-muted-foreground/60'}`}>
                   {t("step")}{stepNum}
                 </p>
                 <p className={`text-[15px] font-semibold ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                   {item.emoji} {item.label}
                 </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="bg-secondary/40 rounded-2xl p-4 text-center border border-border/50">
          <p className="text-2xl font-black text-foreground tracking-tighter">{totalDays}</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t("days")}</p>
        </div>
        <div className="bg-secondary/40 rounded-2xl p-4 text-center border border-border/50">
          <p className="text-2xl font-black text-foreground tracking-tighter">{stepsDone}/5</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t("steps")}</p>
        </div>
        <div className="bg-primary/10 rounded-2xl p-4 text-center border border-primary/10">
          <p className="text-2xl font-black text-primary tracking-tighter">-{avgDrop}</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-primary/60">{t("drop")}</p>
        </div>
      </div>

      <ActivityButton onClick={onContinue}>
        {t("continue_my_ladder")}</ActivityButton>
    </>
  );
};

export default Screen8Ladder;
