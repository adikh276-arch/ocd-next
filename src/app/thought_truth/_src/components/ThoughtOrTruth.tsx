import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { Brain, Sparkles, Heart, ChevronRight, RotateCcw, Info, AlertCircle, CheckCircle2, ArrowLeft, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

type Screen = "welcome" | "before" | "quiz" | "results";

const QUESTIONS = [
  { 
    q: "Having a violent thought means you're a dangerous person.", 
    answer: false,
    explain: "Thoughts are not facts. Everyone has intrusive thoughts — they don't define your character.",
    gradient: "from-rose-400 to-orange-400"
  },
  { 
    q: "Intrusive thoughts are experienced by over 90% of people.", 
    answer: true,
    explain: "Research confirms that almost everyone has intrusive thoughts; OCD just makes them feel more important.",
    gradient: "from-indigo-500 to-purple-500"
  },
  { 
    q: "The more you try to suppress a thought, the stickier it becomes.", 
    answer: true,
    explain: "This is the 'White Bear' effect. Suppression signals to the brain that the thought is dangerous.",
    gradient: "from-cyan-400 to-blue-500"
  },
  { 
    q: "If a thought feels urgent and real, it must be true.", 
    answer: false,
    explain: "OCD uses 'Emotional Reasoning.' Just because a thought feels scary doesn't make it a fact.",
    gradient: "from-amber-400 to-rose-500"
  },
  { 
    q: "Accepting a thought means you are giving in to it.", 
    answer: false,
    explain: "Acceptance means letting the thought exist without fighting it — which actually makes it fade away.",
    gradient: "from-emerald-400 to-cyan-500"
  }
];

const ThoughtOrTruth = () => {
    const { t } = useTranslation("thought_truth");
      const [screen, setScreen] = useState<Screen>("welcome");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<null | { correct: boolean; body: string }>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFinalComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'thought_truth',
          payload: { score, total: QUESTIONS.length, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      toast.error("Failed to save progress.");
    } finally {
      setSaving(false);
    }
  };

  const handleAnswer = (userAnswer: boolean) => {
    const q = QUESTIONS[questionIdx];
    const isCorrect = userAnswer === q.answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({ correct: true, body: q.explain });
    } else {
      setHearts(h => Math.max(0, h - 1));
      setFeedback({ correct: false, body: q.explain });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (questionIdx < QUESTIONS.length - 1) {
      setQuestionIdx(i => i + 1);
    } else {
      setScreen("results");
    }
  };

  const restart = () => {
    setQuestionIdx(0);
    setHearts(3);
    setScore(0);
    setFeedback(null);
    setScreen("welcome");
  };

  const handleExit = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  const goBack = useCallback(() => {
    if (screen === 'results') setScreen('quiz');
    else if (screen === 'quiz') {
      if (feedback) setFeedback(null);
      else if (questionIdx > 0) setQuestionIdx(q => q - 1);
      else setScreen('before');
    }
    else if (screen === 'before') setScreen('welcome');
  }, [screen, feedback, questionIdx]);

  const progress = screen === 'welcome' ? 0 : screen === 'before' ? 10 : ((questionIdx + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-thought-truth bg-transparent">
      {/* Global Exit Button */}
      <div className="w-full flex items-center justify-between mb-8 z-20 relative">
        <button 
          onClick={handleExit}
          className="p-2 rounded-full hover:bg-slate-100/50 transition-all text-slate-500 bg-white shadow-sm border border-slate-100"
          aria-label={t("exit")}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="w-full flex flex-col items-center text-center space-y-3 mb-10">
         <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("thought_or_truth")}</h1>
         <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase opacity-60">{t("can_you_spot_the_difference")}</p>
            <div className="h-[1px] w-8 bg-slate-200" />
         </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 font-sans min-h-[550px] relative flex flex-col overflow-hidden">
          
          {/* Previous Button Container */}
          <div className="absolute left-6 top-8 z-30">
            {screen !== "welcome" && (
              <button
                onClick={goBack}
                className="p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors border border-slate-100"
                title={t("previous_screen")}
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto px-8 md:px-12 py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="wait">
              {screen === "welcome" && (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
                >
                  <div className="w-32 h-32 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Brain size={64} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-6 max-w-xl">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                       {t("build_the_muscle")}</h2>
                    <p className="text-lg text-slate-500 font-medium italic leading-relaxed">
                       {t("ocd_disguises_thoughts_as_facts_this_quiz_helps_yo")}</p>
                  </div>

                  <div className="w-full max-w-md pt-6">
                    <button
                      onClick={() => setScreen("before")}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {t("start_quiz")}<ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {screen === "before" && (
                <motion.div 
                  key="before"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col md:flex-row items-center gap-12 text-center md:text-left"
                >
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                         <div className="h-px w-8 bg-primary/20" />
                         <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">{t("briefing")}</span>
                         <div className="h-px w-8 bg-primary/20 md:hidden" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                         {t("the_signal")}</h2>
                      <p className="text-lg text-slate-500 font-medium italic">
                         {t("thoughts_are_just_signals_they_dont_have_power_unl")}</p>
                    </div>

                    <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-10 flex flex-col items-center md:items-start gap-6 group hover:border-slate-200 transition-all">
                       <p className="text-base font-bold text-slate-600 leading-relaxed italic">
                          {t("having_a_scary_thought_doesnt_mean_anything_is_wro")}</p>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-8">
                    <div className="bg-primary/5 border-2 border-primary/20 rounded-[40px] p-10 space-y-6">
                       <p className="text-2xl font-black text-primary tracking-tight leading-tight italic">
                          {t("the_problem_is_not_the_thought_but_the_importance_")}</p>
                    </div>
                    <button
                      onClick={() => setScreen("quiz")}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {t("im_ready")}<ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {screen === "quiz" && (
                <motion.div 
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col"
                >
                  <AnimatePresence mode="wait">
                    {!feedback ? (
                      <motion.div 
                        key={`q-${questionIdx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 flex flex-col md:flex-row items-center gap-12"
                      >
                         <div className={`flex-1 aspect-square bg-gradient-to-br ${QUESTIONS[questionIdx].gradient} p-12 rounded-[48px] shadow-2xl flex items-center justify-center text-center relative overflow-hidden group`}>
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight italic drop-shadow-lg relative z-10">
                               "{QUESTIONS[questionIdx].q}"
                            </h3>
                         </div>

                         <div className="flex-1 w-full space-y-6">
                            <div className="space-y-4 text-center md:text-left">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t("is_this_true")}</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <button
                                    onClick={() => handleAnswer(false)}
                                    className="h-32 rounded-[32px] bg-white border-2 border-slate-100 text-rose-500 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-100/50 hover:border-rose-200 hover:bg-rose-50 transition-all active:scale-95 flex flex-col items-center justify-center gap-2"
                                  >
                                     <AlertCircle size={24} />
                                     {t("false")}</button>
                                  <button
                                    onClick={() => handleAnswer(true)}
                                    className="h-32 rounded-[32px] bg-white border-2 border-slate-100 text-emerald-500 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-100/50 hover:border-emerald-200 hover:bg-emerald-50 transition-all active:scale-95 flex flex-col items-center justify-center gap-2"
                                  >
                                     <CheckCircle2 size={24} />
                                     {t("true")}</button>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center space-y-10"
                      >
                         <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl ${feedback.correct ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100/50' : 'bg-rose-100 text-rose-600 shadow-rose-100/50'}`}>
                            {feedback.correct ? <CheckCircle2 size={48} /> : <AlertCircle size={48} />}
                         </div>
                         <div className="space-y-4 max-w-xl">
                            <h4 className={`text-3xl md:text-5xl font-black tracking-tight ${feedback.correct ? 'text-emerald-900' : 'text-rose-900'}`}>
                               {feedback.correct ? "Spot on!" : "Not quite!"}
                            </h4>
                            <p className="text-xl font-bold leading-relaxed text-slate-500 italic">
                               {feedback.body}
                            </p>
                         </div>
                         <div className="w-full max-w-md pt-4">
                            <button
                              onClick={handleNext}
                              className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                              {t("next_question")}<ChevronRight size={20} />
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {screen === "results" && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
                >
                   <div className="w-32 h-32 bg-emerald-50 text-emerald-500 rounded-[48px] border-2 border-emerald-100 flex items-center justify-center shadow-2xl shadow-emerald-100/50">
                      <Trophy size={64} strokeWidth={1.5} />
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                         <div className="h-px w-8 bg-emerald-200" />
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">{t("level_complete")}</span>
                         <div className="h-px w-8 bg-emerald-200" />
                      </div>
                      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                         {score >= 4 ? "Distinction Master!" : "Great Practice!"}
                      </h1>
                      <p className="text-xl font-bold text-slate-400 italic">
                         {t("you_identified")}{score} {t("out_of_5_patterns_correctly")}</p>
                   </div>

                   <div className="w-full max-w-md space-y-4">
                      <button
                        onClick={handleFinalComplete}
                        disabled={saving}
                        className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
                      >
                        {saving ? "Saving..." : "Complete Journey"} <ChevronRight size={20} />
                      </button>
                      <button
                        onClick={restart}
                        className="w-full py-4 rounded-[24px] bg-white text-slate-500 font-bold text-[10px] uppercase tracking-widest border-2 border-slate-100 transition-all hover:bg-slate-50 active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={16} /> {t("try_again")}</button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji={score >= 4 ? "🎉" : "💪"}
        title={score >= 4 ? "Distinction Master!" : "Good Effort"}
        description={t("every_time_you_label_an_intrusive_thought_as_just_")}
        onStartOver={restart}
        startOverText={t("try_again")}
        showHome={false}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default ThoughtOrTruth;
