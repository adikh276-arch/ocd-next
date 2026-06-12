import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { questions } from "./QuizData";
import IntroScreen from "./IntroScreen";
import QuestionScreen from "./QuestionScreen";
import RevealScreen from "./RevealScreen";
import ResultsScreen from "./ResultsScreen";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

type Screen = "intro" | "question" | "reveal" | "results";

const transition = { duration: 0.6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] };

const MythOrFactQuiz = () => {
    const { t } = useTranslation("truth_seeker_quiz");
      const [screen, setScreen] = useState<Screen>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<("myth" | "fact")[]>([]);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(false);

  const totalSteps = questions.length;

  const handleStart = () => setScreen("question");

  const handleAnswer = (answer: "myth" | "fact") => {
    const correct = answer === questions[questionIndex].answer;
    setAnswers((prev) => [...prev, answer]);
    if (correct) setScore((s) => s + 1);
    setLastCorrect(correct);
    setScreen("reveal");
  };

  const handleNext = () => {
    if (questionIndex < totalSteps - 1) {
      setQuestionIndex((i) => i + 1);
      setScreen("question");
    } else {
      setScreen("results");
    }
  };

  const handleBack = () => {
    if (screen === "question") {
      if (questionIndex === 0) {
        setScreen("intro");
      } else {
        setQuestionIndex((i) => i - 1);
      }
    } else if (screen === "reveal") {
      setScreen("question");
    } else if (screen === "results") {
      setScreen("intro");
    }
  };

  const handlePlayAgain = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setLastCorrect(false);
    setScreen("question");
  };

  const handleDone = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setLastCorrect(false);
    setScreen("intro");
  };

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden font-sans">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-primary/4 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tl from-accent/8 to-transparent blur-3xl pointer-events-none" />

      {/* Header with back + progress + history */}
      <div className="w-full max-w-md mx-auto mb-6 relative z-20">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => window.history.back()}
            className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
            aria-label={t("go_back")}
          >
            <ArrowLeft size={16} />
          </button>
          
          <div className="flex-1">
            <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-700 ease-out"
                style={{ width: screen === "intro" ? "0%" : `${((questionIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          <ActivityHistoryDrawer slug="truth_seeker_quiz" title={t("quiz_history")} />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col items-center justify-center pb-4 relative z-10">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen + questionIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
              className="w-full"
            >
              {screen === "intro" && <IntroScreen onStart={handleStart} />}
              {screen === "question" && (
                <QuestionScreen
                  questionIndex={questionIndex}
                  statement={questions[questionIndex].statement}
                  onAnswer={handleAnswer}
                />
              )}
              {screen === "reveal" && (
                <RevealScreen
                  questionIndex={questionIndex}
                  correct={lastCorrect}
                  correctAnswer={questions[questionIndex].answer}
                  explanation={questions[questionIndex].explanation}
                  score={score}
                  onNext={handleNext}
                />
              )}
              {screen === "results" && (
                <ResultsScreen
                  answers={answers}
                  score={score}
                  onPlayAgain={handlePlayAgain}
                  onDone={handleDone}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MythOrFactQuiz;
