import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ToyBrick, Fingerprint, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";

const SensorySubstitution = () => {
    const { t } = useTranslation("tricho_ocd");
  const [step, setStep] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const steps = [
    {
      id: "intro",
      title: t("sensory_substitution"),
      description: t("sensory_intro", "Replace the sensation of pulling with a different, safe sensory experience."),
      icon: <Fingerprint className="w-12 h-12 text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      id: "options",
      title: t("find_your_fit"),
      description: t("sensory_options", "Try different textures: a soft velvet cloth, a prickly fidget ball, or a smooth stone. The goal is to satisfy the sensory urge without damage."),
      icon: <ToyBrick className="w-12 h-12 text-orange-500" />,
      color: "bg-orange-50"
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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans relative">
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full flex flex-col items-center space-y-12"
          >
            <div className={`p-8 rounded-[40px] ${steps[step].color} shadow-sm ring-1 ring-slate-200/50`}>
              {steps[step].icon}
            </div>

            <div className="text-center space-y-6 max-w-2xl">
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                {steps[step].title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {steps[step].description}
              </p>
            </div>

            <div className="w-full max-w-md flex flex-col space-y-4 pt-8">
              <button
                onClick={handleNext}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                {step === steps.length - 1 ? t("finish") : t("next")}
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

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="✨"
        title={t("sensory_explorer")}
        description={t("sensory_completion_desc", "Keep exploring different textures until you find the one that works best for you. Carry your sensory tool with you at all times.")}
        onDone={() => window.history.back()}
        onStartOver={() => setStep(0)}
        showHome={false}
      />
    </div>
  );
};

export default SensorySubstitution;
