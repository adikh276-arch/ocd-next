import { questions } from "./QuizData";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { Trophy, CheckCircle2, RefreshCw, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ResultsScreenProps {
  answers: ("myth" | "fact")[];
  score: number;
  onPlayAgain: () => void;
  onDone: () => void;
}

const ResultsScreen = ({ answers, score, onPlayAgain, onDone }: ResultsScreenProps) => {
    const { t } = useTranslation("truth_seeker_quiz");
      const [showCompletion, setShowCompletion] = useState(false);

  useState(() => {
    // Log results on mount
    const logResults = async () => {
      try {
        const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
        await fetch('/ocd/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            activity_slug: 'truth_seeker_quiz',
            payload: {
              score: score,
              total_questions: 5,
              date: new Date().toISOString()
            }
          })
        });
      } catch (e) {
        console.error("Failed to log results:", e);
      }
    };
    logResults();
  });

  return (
    <div className="card-therapeutic animate-fade-card-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 rounded-[32px] bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 flex items-center justify-center mb-6 shadow-xl shadow-primary/5">
          <Trophy size={40} className="text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          {t("quiz_complete")}</h2>
        <p className="text-muted-foreground font-body text-sm">
          {t("you_identified")}{score} {t("out_of_5_statements_correctly")}</p>
      </div>

      <div className="space-y-3 mb-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">{t("summary")}</p>
        <div className="grid gap-2">
          {questions.map((q, i) => {
            const isMyth = q.answer === "myth";
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-secondary/30 border border-border/50 rounded-xl"
              >
                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${isMyth ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {isMyth ? "MYTH" : "FACT"}
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-snug flex-1 italic">
                  "{q.statement.slice(0, 45)}..."
                </p>
                <CheckCircle2 size={14} className="text-emerald-500 opacity-60" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setShowCompletion(true)}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body text-sm font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          {t("finish_practice")}</button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-secondary text-foreground font-body text-[13px] font-semibold border border-border/50 transition-all hover:bg-secondary/70 active:scale-[0.98]"
          >
            <RefreshCw size={14} /> {t("try_again")}</button>
          <button
            onClick={onDone}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-muted-foreground font-body text-[13px] font-semibold border border-border/50 transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            <LogOut size={14} /> {t("exit")}</button>
        </div>
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🏆"
        title={t("myth_buster")}
        description={`You successfully identified ${score} out of 5 myths today. Every truth you learn is a weapon against doubt. Share your knowledge to help others bust their own myths.`}
        onStartOver={onPlayAgain}
        startOverText={t("play_again")}
        showHome={false}
      />
    </div>
  );
};

export default ResultsScreen;
