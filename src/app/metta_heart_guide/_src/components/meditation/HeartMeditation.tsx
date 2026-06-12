import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Heart, ArrowLeft } from "lucide-react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("metta_heart_guide");
  return (
    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
      {children}
    </div>
  );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("metta_heart_guide");
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

const decodeQuotes = (text: string) => {
  if (!text) return "";
  return text
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&bdquo;/g, "„")
    .replace(/&ldqu;/g, "“")
    .replace(/&quo;/g, '"')
    .replace(/&ldquo/g, "“")
    .replace(/&rdquo/g, "”");
};

const HeartMeditation = () => {
    const { t } = useTranslation("metta_heart_guide");
  // Data arrays defined inside the main component so t() works correctly
  const stages = [
    {
      id: "self",
      label: t("yourself", "Yourself"),
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      phrase: "May I be happy and free from suffering",
      emoji: "💚",
    },
    {
      id: "loved",
      label: t("loved_one", "Loved One"),
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      phrase: "May you be safe and protected",
      emoji: "🧡",
    },
    {
      id: "neutral",
      label: t("someone_neutral", "Someone Neutral"),
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      phrase: "May you find peace and ease",
      emoji: "💛",
    },
    {
      id: "all",
      label: t("all_beings", "All Beings"),
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      phrase: "May all beings everywhere be well",
      emoji: "💜",
    },
  ];

  const breathPhases = [
    { name: t("breathe_in", "Breathe In"), duration: 5, scale: 1.25 },
    { name: t("hold", "Hold"), duration: 4, scale: 1.25 },
    { name: t("breathe_out", "Breathe Out"), duration: 7, scale: 1 },
    { name: t("rest", "Rest"), duration: 3, scale: 1 },
  ];

  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [countdown, setCountdown] = useState(breathPhases[0].duration);
  const [cycleCount, setCycleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'metta_heart_guide',
          payload: { completed: true, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log metta practice:", e);
    } finally {
      setSaving(false);
    }
  };

  const totalCycles = 2;

  const reset = useCallback(() => {
    setShowIntro(true);
    setIsPlaying(false);
    setCurrentStage(0);
    setCurrentPhase(0);
    setCountdown(breathPhases[0].duration);
    setCycleCount(0);
    setIsComplete(false);
    setShowCompletion(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextPhase = (currentPhase + 1) % breathPhases.length;
          
          if (nextPhase === 0) {
            const nextCycleCount = cycleCount + 1;
            
            if (nextCycleCount >= totalCycles) {
              const nextStage = currentStage + 1;
              
              if (nextStage >= stages.length) {
                setIsPlaying(false);
                setIsComplete(true);
                return 0;
              }
              
              setCurrentStage(nextStage);
              setCycleCount(0);
            } else {
              setCycleCount(nextCycleCount);
            }
          }
          
          setCurrentPhase(nextPhase);
          return breathPhases[(currentPhase + 1) % breathPhases.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentPhase, currentStage, cycleCount]);

  const getHeartScale = () => {
    if (!isPlaying) return 1;
    return breathPhases[currentPhase].scale;
  };

  const stage = stages[currentStage];
  const phase = breathPhases[currentPhase];

  const totalProgress = isComplete ? 100 : ((currentStage * totalCycles + cycleCount) / (stages.length * totalCycles)) * 100;

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-md flex flex-col gap-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-white/50 transition-colors text-muted-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
               <div 
                 className="h-full bg-primary transition-all duration-700 ease-out shadow-sm"
                 style={{ width: `${totalProgress}%` }}
               />
            </div>
          </div>

          <ActivityHistoryDrawer slug="metta_heart_guide" title={t("kindness_history", "Kindness History")} />
        </div>
      </div>

      <div className="w-full max-w-md z-10 animate-fade-card-in">
        <div className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm min-h-[520px] flex flex-col">
          
          {showIntro && (
            <div className="flex flex-col flex-1 h-full">
              <div className="flex items-center gap-3 mb-6">
                <GradientBadge>
                  <Heart className="text-primary" size={16} />
                </GradientBadge>
                <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
                  {t("loving_kindness", "Loving Kindness")}</p>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <motion.div
                  className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-primary/5 flex items-center justify-center text-5xl shadow-sm border border-primary/10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  ❤️
                </motion.div>

                <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4 leading-tight">
                  {t("heart_kindness", "Heart Kindness")}</h1>
                
                <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-10">
                  {t("a_3-minute_journey_of_sending_love_and_compassion_", "A 3-minute journey of sending love and compassion to yourself and the world.")}</p>

                <div className="grid grid-cols-4 gap-3 mb-10 w-full">
                  {stages.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center justify-center text-2xl">
                        {s.emoji}
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{s.label.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground italic mb-2">
                  {t("find_a_comfortable_position_and_take_a_deep_breath", "Find a comfortable position and take a deep breath.")}</p>
              </div>

              <div className="mt-auto">
                <ActivityButton onClick={() => { setShowIntro(false); setIsPlaying(true); }}>
                  {t("begin_practice", "Begin Practice")}
                </ActivityButton>
              </div>
            </div>
          )}

          {!showIntro && !isComplete && (
            <div className="flex flex-col flex-1 h-full">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <GradientBadge>
                      <Heart className="text-primary" size={16} />
                    </GradientBadge>
                    <div className="flex flex-col">
                       <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{t("sending_love_to", "Sending Love To")}</p>
                       <p className="text-sm font-semibold text-foreground">{stage.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalCycles }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          i < cycleCount ? "bg-primary scale-110 shadow-sm" : "bg-primary/20"
                        }`}
                      />
                    ))}
                  </div>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center text-center">
                  {/* Heart Animation */}
                  <div className="relative mb-12">
                    <motion.div
                      className={`absolute inset-[-40px] rounded-full bg-gradient-to-r ${stage.color} blur-[60px] opacity-20`}
                      animate={{ scale: getHeartScale() }}
                      transition={{ duration: phase.duration, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white shadow-xl shadow-primary/10 flex items-center justify-center relative z-10 border-4 border-white"
                      animate={{ scale: getHeartScale() }}
                      transition={{ duration: phase.duration, ease: "easeInOut" }}
                    >
                      <span className="text-7xl sm:text-8xl drop-shadow-md select-none">{stage.emoji}</span>
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentPhase}-${currentStage}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-8"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] font-black text-primary/60 mb-2">{phase.name}</p>
                      <p className="text-6xl font-serif text-foreground tabular-nums">{countdown}</p>
                    </motion.div>
                  </AnimatePresence>

                  <motion.p
                    key={stage.phrase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-serif italic text-muted-foreground max-w-[280px]"
                  >
                    {decodeQuotes(t("ldquo"))}{stage.phrase}{decodeQuotes(t("rdquo"))}</motion.p>
               </div>

               <div className="mt-auto flex items-center justify-center gap-4 pt-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-white border border-border/50 shadow-sm flex items-center justify-center text-foreground hover:bg-secondary/40 transition-all active:scale-95"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                  <button
                    onClick={reset}
                    className="w-14 h-14 rounded-full bg-white border border-border/50 shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all active:scale-95"
                  >
                    <RotateCcw size={20} />
                  </button>
               </div>
            </div>
          )}

          {isComplete && (
            <div className="flex flex-col flex-1 h-full items-center justify-center text-center">
               <div className="mb-8 w-24 h-24 rounded-3xl bg-green-500/10 flex items-center justify-center text-5xl shadow-sm border border-green-500/20">
                💖
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4 leading-tight">
                {t("beautiful_practice", "Beautiful Practice")}</h1>
              
              <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-10 max-w-[300px]">
                {t("youve_sent_kindness_to_yourself_and_the_world_this", "You've sent kindness to yourself and the world. This ripples outward.")}</p>

              <div className="w-full max-w-[280px] bg-primary/5 rounded-2xl p-5 border border-primary/10 mb-10">
                <p className="text-[11px] uppercase tracking-widest font-black text-primary/60 mb-3 italic">{t("final_reflection", "Final Reflection")}</p>
                <p className="text-sm font-serif italic text-foreground/80 leading-relaxed">
                  {t("may_all_beings_everywhere_be_happy_and_free", "May all beings everywhere be happy and free.")}</p>
              </div>

              <div className="w-full mt-auto">
                <ActivityButton onClick={handleComplete} disabled={saving}>
                  {saving ? t("saving", "Saving...") : t("complete_session", "Complete Session")}
                </ActivityButton>
              </div>
            </div>
          )}

        </div>
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="💖"
        title={t("inner_peace_shared", "Inner Peace Shared")}
        description={t("your_compassion_has_ripples_by_practicing_kindness", "Your compassion has ripples. By practicing kindness inward, you spread it outward.")}
        onStartOver={reset}
        startOverText={t("practice_again", "Practice Again")}
        showHome={false}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default HeartMeditation;
