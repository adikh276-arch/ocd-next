import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QuestionScreenProps {
  questionIndex: number;
  statement: string;
  onAnswer: (answer: "myth" | "fact") => void;
}

const QuestionScreen = ({ questionIndex, statement, onAnswer }: QuestionScreenProps) => {
    const { t } = useTranslation("truth_seeker_quiz");
      return (
        <div className="card-therapeutic animate-fade-card-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex items-center justify-center shadow-sm">
              <HelpCircle className="text-primary" size={18} />
            </div>
            <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
              {t("round")}{questionIndex + 1}
            </p>
          </div>

          <div className="bg-secondary/40 border border-border/50 rounded-3xl p-8 mb-8 text-center shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl" />
            <p className="font-heading text-lg sm:text-xl font-semibold text-foreground leading-relaxed relative z-10">
              "{statement}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onAnswer("myth")}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-red-100 bg-red-50/50 text-red-600 font-heading font-bold transition-all hover:bg-red-50 hover:border-red-200 active:scale-[0.98] group"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">❌</span>
              <span className="text-sm uppercase tracking-widest">{t("myth")}</span>
            </button>

            <button
              onClick={() => onAnswer("fact")}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 text-emerald-600 font-heading font-bold transition-all hover:bg-emerald-50 hover:border-emerald-200 active:scale-[0.98] group"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">✅</span>
              <span className="text-sm uppercase tracking-widest">{t("fact")}</span>
            </button>
          </div>
        </div>
      );
};

export default QuestionScreen;
