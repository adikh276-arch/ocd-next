import { CheckCircle2, XCircle, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RevealScreenProps {
  questionIndex: number;
  correct: boolean;
  correctAnswer: "myth" | "fact";
  explanation: string;
  score: number;
  onNext: () => void;
}

const RevealScreen = ({
  questionIndex,
  correct,
  correctAnswer,
  explanation,
  score,
  onNext,
}: RevealScreenProps) => {
    const { t } = useTranslation("truth_seeker_quiz");
      const isLast = questionIndex === 4;

  return (
    <div className="card-therapeutic animate-fade-card-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center mb-6 shadow-xl ${correct ? 'bg-emerald-50 text-emerald-500 shadow-emerald-100' : 'bg-red-50 text-red-500 shadow-red-100'}`}>
          {correct ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
        </div>
        <h2 className={`font-heading text-2xl font-bold mb-2 ${correct ? 'text-emerald-700' : 'text-red-700'}`}>
          {correct ? "Spot On!" : "Not Quite!"}
        </h2>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
           {t("thats_a")}{correctAnswer === "myth" ? "Myth" : "Fact"}
        </div>
      </div>

      <div className="bg-secondary/40 border border-border/50 rounded-2xl p-6 mb-8 relative">
        <div className="flex items-center gap-2 mb-3">
           <Zap size={14} className="text-primary/60" />
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("the_truth")}</span>
        </div>
        <p className="font-body text-sm text-foreground leading-relaxed">
          {explanation}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-8 px-2">
         <div className="flex-1 h-px bg-border/50" />
         <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest bg-white px-3 -mt-1">
            {t("current_score")}{score}/{questionIndex + 1}
         </div>
         <div className="flex-1 h-px bg-border/50" />
      </div>

      <button
        onClick={onNext}
        className={`w-full py-4 rounded-2xl font-body text-sm font-semibold transition-all active:scale-[0.98] shadow-lg ${
           correct 
             ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200/50' 
             : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
        }`}
      >
        {isLast ? "See Final Results →" : "Next Round →"}
      </button>
    </div>
  );
};

export default RevealScreen;
