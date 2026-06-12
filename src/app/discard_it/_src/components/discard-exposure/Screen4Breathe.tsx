import { useState, useEffect, useCallback } from "react";
import { Wind } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

type Phase = "inhale" | "hold" | "exhale";

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

const Screen4Breathe = ({ onNext }: Props) => {
    const { t } = useTranslation("discard_it");
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const PHASES: { phase: Phase; duration: number; label: string }[] = [
    { phase: "inhale", duration: 4000, label: t("breathe_in") },
    { phase: "hold", duration: 2000, label: t("hold") },
    { phase: "exhale", duration: 6000, label: t("breathe_out") },
  ];

  const currentPhase = PHASES[phaseIndex];

  const nextPhase = useCallback(() => {
    setPhaseIndex((prev) => {
      const next = prev + 1;
      if (next >= 3) { // 3 is PHASES.length
        setCycleCount((c) => {
          const newCount = c + 1;
          if (newCount >= 3) setReady(true);
          return newCount;
        });
        return 0;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(nextPhase, currentPhase.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex, cycleCount, ready, currentPhase.duration, nextPhase]);

  const scale = currentPhase.phase === "inhale" ? "scale-100" : currentPhase.phase === "exhale" ? "scale-[0.5]" : "scale-100";

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <GradientBadge>
          <Wind className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("grounding")}</p>
      </div>

      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug text-center">
        {t("breathe_first")}</h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8 text-center">
        {t("before_you_let_go_take_a_moment_to_center_yourself")}</p>

      <div className="flex-1 flex flex-col items-center justify-center py-10">
        <div className="relative w-48 h-48 flex items-center justify-center mb-10">
          <div className={`absolute inset-0 rounded-full bg-primary/5 transition-transform ${scale}`} style={{ transitionDuration: `${currentPhase.duration}ms`, transitionTimingFunction: "ease-in-out" }} />
          <div className={`absolute inset-6 rounded-full bg-primary/10 transition-transform ${scale}`} style={{ transitionDuration: `${currentPhase.duration}ms`, transitionTimingFunction: "ease-in-out" }} />
          <div className={`absolute inset-12 rounded-full bg-primary/20 transition-transform ${scale}`} style={{ transitionDuration: `${currentPhase.duration}ms`, transitionTimingFunction: "ease-in-out" }} />
          <div className="relative z-10 w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
             <Wind className="text-primary/70" size={32} />
          </div>
        </div>

        <div className="text-center space-y-2">
           <p className="text-foreground font-semibold text-xl tracking-tight">
             {ready ? "You're ready. 🌿" : currentPhase.label}
           </p>
           {!ready && (
             <p className="text-muted-foreground text-[13px] font-medium font-body uppercase tracking-wider">
               {t("cycle")}{Math.min(cycleCount + 1, 3)} {t("of_3")}</p>
           )}
        </div>
      </div>

      {ready && (
        <div className="mt-8">
           <ActivityButton onClick={onNext}>
             {t("im_ready_to_let_it_go")}</ActivityButton>
        </div>
      )}
    </>
  );
};

export default Screen4Breathe;
