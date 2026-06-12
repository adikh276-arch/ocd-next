import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Wind, Sparkles, Droplets, Hand, Utensils, Coffee, Footprints, Snowflake, Flower, Move, Ear, Heart } from "lucide-react";
import { techniques } from "@/app/grounded_techniques/_src/data/techniques";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const ICON_MAP: Record<string, any> = {
  water: Droplets,
  touch: Hand,
  breathe: Wind,
  food: Utensils,
  drink: Coffee,
  walk: Footprints,
  ice: Snowflake,
  scent: Flower,
  move: Move,
  listen: Ear,
  body: Heart,
};

export default function TechniqueDetail() {
    const { t } = useTranslation("grounded_techniques");
      const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const technique = techniques.find((tech) => tech.id === id);

  if (!technique) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground font-body">{t("technique_not_found")}</p>
      </div>
    );
  }

  const totalSteps = technique.steps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const handleBack = () => {
    if (isFirstStep) {
      navigate("/");
    } else {
      setCurrentStep(s => s - 1);
    }
  };

  const Icon = technique.id ? (ICON_MAP[technique.id] || Sparkles) : Sparkles;

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden font-sans">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-primary/4 to-transparent blur-3xl pointer-events-none" />

      {/* Header with back + progress */}
      <div className="w-full max-w-md mx-auto mb-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
            aria-label={t("go_back")}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ 
                  width: `${((currentStep + 1) / totalSteps) * 100}%`
                }}
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground font-body tabular-nums shrink-0 w-9 text-right mr-1">
            {currentStep + 1}/{totalSteps}
          </p>
          <div className="shrink-0">
            <ActivityHistoryDrawer slug="grounded_techniques" title={t("grounding_history")} />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col items-center justify-center pb-4 relative z-10">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="card-therapeutic"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm text-primary bg-primary/10">
                  <Icon size={18} />
                </div>
                <div>
                   <p className="text-xs uppercase tracking-widest font-body font-bold text-primary/70">
                    {technique.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center mb-10 pt-4">
                <div className="w-16 h-16 rounded-[24px] flex items-center justify-center text-2xl font-heading font-bold mb-8 shadow-inner bg-secondary/50 text-primary">
                  {currentStep + 1}
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 leading-relaxed px-2 min-h-[80px]">
                  {technique.steps[currentStep]}
                </h2>
              </div>

              <div className="flex gap-3">
                {!isFirstStep && (
                  <button
                    onClick={() => setCurrentStep(s => s - 1)}
                    className="w-14 h-14 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center border border-border/30 transition-all hover:bg-secondary/70 active:scale-95"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (isLastStep) {
                      setShowCompletion(true);
                    } else {
                      setCurrentStep(s => s + 1);
                    }
                  }}
                  className="flex-1 py-4 rounded-2xl text-white font-body text-sm font-semibold transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 shadow-primary/20"
                >
                  {isLastStep ? (
                    <>{t("finish_practice")}<CheckCircle2 size={16} /></>
                  ) : (
                    <>{t("next_step")}<ChevronRight size={16} /></>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <StandardCompletionModal 
        showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌬️"
        title={t("grounded_and_calm")}
        description={t("youve_successfully_grounded_yourself_this_peace_is")}
        onStartOver={() => {
          setShowCompletion(false);
          setCurrentStep(0);
        }}
        startOverText={t("practice_again")}
        onDone={() => window.history.back()}
      />
    </div>
  );
}
