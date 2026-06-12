import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Brain, Hand, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";

const HabitReversal = () => {
    const { t } = useTranslation("tricho_ocd");
  const [step, setStep] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const steps = [
    {
      id: "welcome",
      title: t("habit_reversal_training"),
      description: t("hrt_desc", "Break the cycle of hair pulling by training your brain to choose a competing response."),
      icon: <Scissors className="w-12 h-12 text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      id: "awareness",
      title: t("awareness_training"),
      description: t("awareness_desc", "Identify the moments when the urge to pull is strongest. Notice the physical sensations — an itch, tension, or restlessness."),
      icon: <Brain className="w-12 h-12 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      id: "competing_response",
      title: t("competing_response"),
      description: t("competing_desc", "When the urge strikes, immediately engage in a physical action that makes pulling impossible, like clenching your fists or sitting on your hands."),
      icon: <Hand className="w-12 h-12 text-emerald-500" />,
      color: "bg-emerald-50"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans selection:bg-primary/10 relative">
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center space-y-12"
          >
            {/* Icon */}
            <div className={`p-8 rounded-[40px] ${steps[step].color} shadow-sm`}>
              {steps[step].icon}
            </div>

            {/* Content */}
            <div className="text-center space-y-6 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                {steps[step].title}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                {steps[step].description}
              </p>
            </div>

            {/* Illustration Placeholder (Optional) */}
            <div className="w-full h-48 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center italic text-slate-400 text-sm">
              {t("interactive_exercise_visualization")}
            </div>

            {/* Navigation */}
            <div className="w-full max-w-md flex flex-col space-y-4 pt-8">
              <button
                onClick={handleNext}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                {step === steps.length - 1 ? t("complete_session") : t("next_step")}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleBack}
                className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                {t("back")}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress Dots */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === step ? "w-8 bg-slate-900" : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="💪"
        title={t("practice_makes_permanent")}
        description={t("hrt_completion_desc", "You've completed this introductory session. The key to habit reversal is consistent practice during real-world urges.")}
        onDone={() => window.history.back()}
        onStartOver={() => setStep(0)}
        showHome={false}
      />
    </div>
  );
};

export default HabitReversal;
