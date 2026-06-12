import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ActivityLayout from "../../components/ActivityLayout";
import CompletionScreen from "../../components/CompletionScreen";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Heart, Zap, CheckCircle2, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ─── Types ─── */
// Category identifiers are always raw English strings — never translated —
// so that comparison logic (selectedCard.category === targetCategory) stays correct.
type Category = "thought" | "feeling" | "urge";

interface NoiseCard {
  id: number;
  text: string;
  category: Category;
  placed: boolean;
  placedIn?: Category;
}

/* ─── Pure module-level helper ─── */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ─── Main Component ─── */
const LabelTheNoise = () => {
    const { t } = useTranslation("quiet-focus-tool");
    const navigate = useNavigate();
  // allCards defined here so t() is in scope for display text.
  // IMPORTANT: category is always a raw English string ("urge" | "feeling" | "thought")
  // so that drop-target comparison works correctly in all languages.
  const allCards: Omit<NoiseCard, "placed" | "placedIn">[] = [
    { id: 1, text: t("i_should_check_my_phone"), category: "urge" },
    { id: 2, text: t("i_need_to_do_something"), category: "urge" },
    { id: 3, text: t("i_want_to_wash_my_hands_again"), category: "urge" },
    { id: 4, text: t("i_should_double-check_the_door"), category: "urge" },
    { id: 5, text: t("i_need_to_fix_this_right_now"), category: "urge" },
    { id: 9, text: t("i_feel_restless"), category: "feeling" },
    { id: 10, text: t("im_anxious_about_tomorrow"), category: "feeling" },
    { id: 11, text: t("i_feel_uncertain"), category: "feeling" },
    { id: 12, text: t("im_uncomfortable_with_this"), category: "feeling" },
    { id: 13, text: t("i_feel_overwhelmed"), category: "feeling" },
    { id: 17, text: t("what_if_i_forget_something"), category: "thought" },
    { id: 18, text: t("this_is_taking_too_long"), category: "thought" },
    { id: 19, text: t("did_i_do_that_correctly"), category: "thought" },
    { id: 20, text: t("something_doesnt_feel_right"), category: "thought" },
    { id: 21, text: t("maybe_i_should_start_over"), category: "thought" },
  ];

  // categories use id as raw English (for drop logic), label as translated (for display)
  const categories: { id: Category; label: string; icon: React.ElementType; color: string }[] = [
    { id: "thought", label: t("thought"), icon: Brain, color: "text-blue-500" },
    { id: "feeling", label: t("feeling"), icon: Heart, color: "text-emerald-500" },
    { id: "urge", label: t("urge"), icon: Zap, color: "text-indigo-500" },
  ];

  // Build the session card set inside the component (allCards is in scope)
  const getSessionCards = (): NoiseCard[] => {
    const urges = shuffleArray(allCards.filter((c) => c.category === "urge")).slice(0, 2);
    const feelings = shuffleArray(allCards.filter((c) => c.category === "feeling")).slice(0, 2);
    const thoughts = shuffleArray(allCards.filter((c) => c.category === "thought")).slice(0, 2);
    return shuffleArray([...urges, ...feelings, ...thoughts]).map((card, idx) => ({
      ...card,
      id: idx + 1,
      placed: false,
    }));
  };

  const [cards, setCards] = useState<NoiseCard[]>(() => getSessionCards());
  const [selectedCard, setSelectedCard] = useState<NoiseCard | null>(null);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean; cardId: number } | null>(null);

  const showFeedback = (message: string, isCorrect: boolean, cardId: number) => {
    setFeedback({ message, isCorrect, cardId });
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleDrop = useCallback(
    async (targetCategory: Category) => {
      if (!selectedCard) return;

      const isCorrect = selectedCard.category === targetCategory;

      if (isCorrect) {
        showFeedback("Well noticed! ✨", true, selectedCard.id);

        setCards((prev) => {
          const updated = prev.map((c) =>
            c.id === selectedCard.id ? { ...c, placed: true, placedIn: targetCategory } : c
          );
          if (updated.every((c) => c.placed)) {
            // Log completion
            const userId = typeof window !== "undefined" ? sessionStorage.getItem("user_id") : null;
            fetch("/ocd/api/logs", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: userId,
                activity_slug: "quiet_focus_tool",
                payload: {
                  exercise: "Label the Noise",
                  cards_sorted: updated.length,
                  date: new Date().toISOString(),
                },
              }),
            }).catch((e) => console.error("Log failed", e));

            setTimeout(() => setCompleted(true), 1000);
          }
          return updated;
        });
      } else {
        showFeedback("Try a different category 💙", false, selectedCard.id);
      }
      setSelectedCard(null);
    },
    [selectedCard]
  );

  if (completed) {
    return (
      <CompletionScreen
        title={t("mindful_clarity")}
        message={t("naming_whats_in_your_mind_creates_space_between_you_and_your")}
      />
    );
  }

  const unplacedCards = cards.filter((c) => !c.placed);
  const correctCount = cards.filter((c) => c.placed).length;
  const progressPercent = (correctCount / cards.length) * 100;

  return (
    <ActivityLayout
      title={t("label_the_noise")}
      slug="quiet_focus_tool"
      subtitle={t("gain_clarity_through_categorization")}
      progress={progressPercent}
    >
      <div className="card-therapeutic shadow-2xl p-8 pt-16 flex flex-col items-center gap-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors text-slate-400"
          aria-label={t("go_back_home")}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center w-full relative overflow-hidden">
          <Sparkles className="absolute -top-2 -right-2 text-primary/10" size={40} />
          <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed">
            {t("recognize_these_as_common_mental_events_you_are_th")}
          </p>
        </div>

        {/* Category drop targets */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isTarget = !!selectedCard;
            return (
              <button
                key={cat.id}
                onClick={() => isTarget && handleDrop(cat.id)}
                className={`
                  flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all
                  ${isTarget ? "bg-primary/5 border-primary/20 scale-105 cursor-pointer" : "bg-slate-50 border-slate-100"}
                  ${!isTarget ? "grayscale-[0.5] opacity-80" : ""}
                `}
              >
                <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${cat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selection instruction */}
        <AnimatePresence mode="wait">
          {selectedCard ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse"
            >
              {t("now_tap_the_correct_category")}
            </motion.p>
          ) : (
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              {t("tap_a_card_to_start_labeling")}
            </p>
          )}
        </AnimatePresence>

        {/* Card to sort */}
        <div className="w-full space-y-3 min-h-[120px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {unplacedCards.length > 0 ? (
              <motion.button
                key={unplacedCards[0].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setSelectedCard(unplacedCards[0])}
                className={`
                  w-full p-6 rounded-2xl border-2 transition-all text-center
                  ${
                    selectedCard?.id === unplacedCards[0].id
                      ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                      : "bg-white border-slate-100 text-slate-900 hover:border-primary/20"
                  }
                  ${feedback?.cardId === unplacedCards[0].id && !feedback.isCorrect ? "animate-shake" : ""}
                `}
              >
                <p className="text-sm font-bold italic leading-relaxed">"{unplacedCards[0].text}"</p>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <CheckCircle2 size={32} className="text-emerald-400" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("all_sorted")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feedback toast */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`
                px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg
                ${feedback.isCorrect ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"}
              `}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ActivityLayout>
  );
};

export default LabelTheNoise;
