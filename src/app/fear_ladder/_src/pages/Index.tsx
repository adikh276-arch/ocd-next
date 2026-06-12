import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Trophy, Zap, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import PracticeGoal from "@/app/fear_ladder/_src/components/FearLadder/PracticeGoal";
import ThoughtSection from "@/app/fear_ladder/_src/components/FearLadder/ThoughtSection";
import RewardSection from "@/app/fear_ladder/_src/components/FearLadder/RewardSection";
import LadderBuilder from "@/app/fear_ladder/_src/components/FearLadder/LadderBuilder";
import ExampleLadderModal from "@/app/fear_ladder/_src/components/FearLadder/ExampleLadderModal";
import PracticeScreen from "@/app/fear_ladder/_src/components/FearLadder/PracticeScreen";
import CompletionScreen from "@/app/fear_ladder/_src/components/FearLadder/CompletionScreen";
import ProgressPanel from "@/app/fear_ladder/_src/components/FearLadder/ProgressPanel";
import { useFearLadderStorage } from "@/app/fear_ladder/_src/hooks/useFearLadderStorage";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation("fear_ladder");
      const [showExample, setShowExample] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const performHandshake = async () => {
      const storedUserId = sessionStorage.getItem("user_id");
      setUserId(storedUserId);
      setIsAuthenticating(false);
    };
    performHandshake();
  }, []);

  const {
    data,
    phase,
    completedCount,
    sortedSteps,
    currentStep,
    completedStepIds,
    currentStepAlreadyLogged,
    updateField,
    updateSteps,
    saveSession,
    addLog,
    resetLadder,
    justSaved,
    setJustSaved,
    loading,
  } = useFearLadderStorage(userId);

  if (loading || isAuthenticating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("your_courage_journey_continues")}</p>
      </div>
    );
  }

  const canSave =
    data.goal.trim() !== "" &&
    data.thought.trim() !== "" &&
    data.reward.trim() !== "" &&
    data.steps.some((s) => s.situation.trim() !== "");

  const currentProgress = phase === "build" ? 25 : phase === "completed" ? 100 : justSaved ? 50 : 50 + (completedCount / (sortedSteps.length || 1) * 50);

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-fear-ladder">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.parent !== window) {
                   window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                } else {
                   window.location.href = 'https://web.mantracare.com';
                }
               }}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <ActivityHistoryDrawer slug="fear_ladder" title={t("fear_ladder_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("fear_ladder")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("exposure__resilience")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative pb-20">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 font-sans min-h-[600px]">
          
          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-12 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("breaking_down_big_fears_into_small_manageable_step")}</p>
          </header>

          <AnimatePresence mode="wait">
            {/* ============ BUILD PHASE ============ */}
            {phase === "build" && (
              <motion.div 
                key="build"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[24px] border-2 border-slate-200/60 border-dashed">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                    <TrendingUp size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{t("build_your_ladder")}</h2>
                    <p className="text-[13px] text-slate-500 font-medium italic">{t("start_small_and_gradually_build_your_way_up_to_you")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  <PracticeGoal goal={data.goal} onGoalChange={(v) => updateField("goal", v)} />
                  <ThoughtSection thought={data.thought} onThoughtChange={(v) => updateField("thought", v)} />
                  <RewardSection reward={data.reward} onRewardChange={(v) => updateField("reward", v)} />
                </div>

                <LadderBuilder
                  steps={data.steps}
                  onStepsChange={updateSteps}
                  onShowExample={() => setShowExample(true)}
                />

                <button
                  type="button"
                  disabled={!canSave}
                  onClick={async () => {
                    const result = await saveSession();
                    if (result.success) {
                      // toast.success("Your fear ladder is saved!");
                    }
                  }}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-20 mt-8"
                >
                  {t("save_my_fear_ladder")}</button>
              </motion.div>
            )}

            {/* ============ JUST SAVED SUCCESS / REVIEW ============ */}
            {phase !== "build" && justSaved && (
              <motion.div 
                key="saved"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10 py-4"
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-500 border-2 border-emerald-100 mb-2 shadow-inner">
                    <span className="text-4xl">🌱</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-900">{t("ladder_ready")}</h2>
                    <p className="text-[14px] text-slate-500 font-medium italic px-10">
                      {t("weve_organized_your_fears_from_least_to_most_distr")}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">{t("the_therapeutic_path")}</h3>
                  <div className="space-y-3">
                    {sortedSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-primary/20">
                        <span className="text-[11px] font-black text-primary w-6">{idx + 1}.</span>
                        <span className="flex-1 text-sm font-bold text-slate-700">{step.situation}</span>
                        <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-primary/10 text-primary uppercase tracking-widest">
                          {step.anxiety} / 10
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setJustSaved(false)}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  {t("start_practice_day")}{completedCount + 1}
                </button>
              </motion.div>
            )}

            {/* ============ PRACTICE PHASE ============ */}
            {phase === "practice" && !justSaved && currentStep && (
              <motion.div 
                key="practice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border-2 border-slate-200/60 border-dashed">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900">{t("day")}{completedCount + 1} {t("practice")}</h2>
                    <p className="text-[13px] text-slate-500 font-medium italic">{t("step")}{completedCount + 1} {t("of")}{sortedSteps.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                    <Zap size={24} strokeWidth={2.5} />
                  </div>
                </div>

                <PracticeScreen
                  completedCount={completedCount}
                  currentStep={currentStep}
                  alreadyLogged={currentStepAlreadyLogged}
                  onSave={addLog}
                />
              </motion.div>
            )}

            {/* ============ COMPLETED PHASE ============ */}
            {phase === "completed" && (
              <motion.div 
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CompletionScreen
                  logs={data.logs}
                  steps={sortedSteps}
                  onStartNew={resetLadder}
                  onReviewProgress={() => { }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ============ PROGRESS PANEL ============ */}
          {data.sessionId && sortedSteps.length > 0 && phase !== "completed" && (
            <div className="mt-12 pt-12 border-t-2 border-slate-100">
              <ProgressPanel
                steps={sortedSteps}
                completedStepIds={completedStepIds}
                currentStepId={currentStep?.id ?? null}
              />
            </div>
          )}
        </div>
      </main>

      <ExampleLadderModal open={showExample} onClose={() => setShowExample(false)} />
    </div>
  );
};

export default Index;
