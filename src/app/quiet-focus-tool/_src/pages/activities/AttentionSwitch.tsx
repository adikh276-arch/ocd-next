import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityLayout from "../../components/ActivityLayout";
import CompletionScreen from "../../components/CompletionScreen";
import { motion } from "framer-motion";
import { Target, Timer, Sparkles, ArrowRight, Zap, CheckCircle2, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ─── Types ─── */
type Difficulty = "easy" | "medium" | "hard";

interface ChallengeItem {
  id: number;
  isTarget: boolean;
  found: boolean;
  shapeType?: "circle" | "square" | "triangle";
  color?: "blue" | "mint" | "lavender" | "peach" | "rose";
  size?: "small" | "medium" | "large";
  question?: string;
  answer?: number;
  word?: string;
  emoji?: string;
  count?: number;
}

interface Challenge {
  id: number;
  type: "shape" | "math" | "word" | "counting";
  instruction: string;
  items: ChallengeItem[];
  targetCount: number;
  timeLimit: number;
}

/* ─── Module-level constants (raw English, never translated — used for logic/CSS) ─── */
const COLORS: ChallengeItem["color"][] = ["blue", "mint", "lavender", "peach", "rose"];
const SHAPES: ChallengeItem["shapeType"][] = ["circle", "square", "triangle"];
const SIZES: ChallengeItem["size"][] = ["small", "medium", "large"];
const CALM_WORDS = ["Peace", "Gentle", "Still", "Breathe", "Calm", "Soft", "Rest", "Safe", "Kind"];
const NOISE_WORDS = ["Rush", "Busy", "Loud", "Fast", "Now", "Hurry", "Noise", "Quick", "Hard"];
const EMOJIS = ["🌸", "🌿", "💙", "✨", "🌊", "🍃", "💫", "🌺", "🌻"];

/* ─── Pure module-level helpers ─── */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateChallenge(difficulty: Difficulty, index: number, timeLimitMap: Record<Difficulty, number>): Challenge {
  const types: Challenge["type"][] = ["shape", "math", "word", "counting"];
  const type = types[Math.floor(Math.random() * types.length)];
  const items: ChallengeItem[] = [];
  const gridSize = 9;
  const targetCount = difficulty === "easy" ? 2 : difficulty === "medium" ? 3 : 4;
  const timeLimit = timeLimitMap[difficulty];

  let instruction = "";

  if (type === "shape") {
    const targetShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    instruction = `Find all ${targetColor} ${targetShape}s`;

    for (let i = 0; i < targetCount; i++) {
      items.push({ id: i, isTarget: true, found: false, shapeType: targetShape, color: targetColor, size: "medium" });
    }
    for (let i = targetCount; i < gridSize; i++) {
      let s, c;
      do {
        s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        c = COLORS[Math.floor(Math.random() * COLORS.length)];
      } while (s === targetShape && c === targetColor);
      items.push({ id: i, isTarget: false, found: false, shapeType: s, color: c, size: "medium" });
    }
  } else if (type === "math") {
    const targetSum = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
    instruction = `Find sums that equal ${targetSum}`;
    for (let i = 0; i < targetCount; i++) {
      const a = Math.floor(Math.random() * (targetSum - 1)) + 1;
      items.push({ id: i, isTarget: true, found: false, question: `${a} + ${targetSum - a}`, answer: targetSum });
    }
    for (let i = targetCount; i < gridSize; i++) {
      const a = Math.floor(Math.random() * 10);
      const b = Math.floor(Math.random() * 10);
      const sum = a + b;
      if (sum === targetSum) { i--; continue; }
      items.push({ id: i, isTarget: false, found: false, question: `${a} + ${b}`, answer: sum });
    }
  } else if (type === "word") {
    instruction = "Tap only the calming words";
    const pool = shuffleArray([...CALM_WORDS]);
    const noisePool = shuffleArray([...NOISE_WORDS]);
    for (let i = 0; i < targetCount; i++) {
      items.push({ id: i, isTarget: true, found: false, word: pool[i % pool.length] });
    }
    for (let i = targetCount; i < gridSize; i++) {
      items.push({ id: i, isTarget: false, found: false, word: noisePool[i % noisePool.length] });
    }
  } else if (type === "counting") {
    const targetN = Math.floor(Math.random() * 3) + 2;
    instruction = `Tap boxes with exactly ${targetN} items`;
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    for (let i = 0; i < targetCount; i++) {
      items.push({ id: i, isTarget: true, found: false, emoji, count: targetN });
    }
    for (let i = targetCount; i < gridSize; i++) {
      let n;
      do { n = Math.floor(Math.random() * 5) + 1; } while (n === targetN);
      items.push({ id: i, isTarget: false, found: false, emoji, count: n });
    }
  }

  return {
    id: index,
    type,
    instruction,
    items: shuffleArray(items).map((it, idx) => ({ ...it, id: idx })),
    targetCount,
    timeLimit,
  };
}

/* ─── Item Component ─── */
const ChallengeItemComponent = ({
  item,
  type,
  onTap,
  shakeId,
  glowId,
}: {
  item: ChallengeItem;
  type: string;
  onTap: (item: ChallengeItem) => void;
  shakeId: number | null;
  glowId: number | null;
}) => {
    const { t } = useTranslation("quiet-focus-tool");
  const isActive = !item.found;

  const getColorHex = (colorName: string) => {
    switch (colorName) {
      case "blue": return "#60a5fa";
      case "mint": return "#34d399";
      case "lavender": return "#818cf8";
      case "peach": return "#fdba74";
      case "rose": return "#fb7185";
      default: return "#60a5fa";
    }
  };

  return (
    <motion.button
      whileTap={isActive ? { scale: 0.9 } : {}}
      onClick={() => isActive && onTap(item)}
      className={`
        relative flex items-center justify-center rounded-2xl transition-all duration-300
        ${isActive ? "bg-white border-slate-100 border hover:border-primary/20 shadow-sm" : "bg-slate-50 border-slate-50 opacity-40"}
        ${shakeId === item.id ? "animate-shake border-red-200" : ""}
        ${glowId === item.id ? "ring-4 ring-primary/20 scale-105" : ""}
        p-4 aspect-square
      `}
    >
      {type === "shape" && (
        <div
          className={`
            ${item.size === "small" ? "w-6 h-6" : item.size === "large" ? "w-12 h-12" : "w-9 h-9"}
            ${item.shapeType === "circle" ? "rounded-full" : item.shapeType === "square" ? "rounded-lg" : ""}
          `}
          style={
            item.shapeType === "triangle"
              ? {
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderLeft: `${item.size === "small" ? 12 : item.size === "large" ? 24 : 18}px solid transparent`,
                  borderRight: `${item.size === "small" ? 12 : item.size === "large" ? 24 : 18}px solid transparent`,
                  borderBottom: `${item.size === "small" ? 20 : item.size === "large" ? 40 : 30}px solid ${getColorHex(item.color || "blue")}`,
                }
              : { backgroundColor: getColorHex(item.color || "blue") }
          }
        />
      )}
      {type === "math" && <span className="text-[13px] font-bold text-slate-800">{item.question}</span>}
      {type === "word" && <span className="text-[9px] font-bold uppercase tracking-wider text-slate-800 text-center">{item.word}</span>}
      {type === "counting" && (
        <div className="flex flex-wrap gap-0.5 justify-center max-w-[40px]">
          {Array.from({ length: item.count || 0 }).map((_, i) => (
            <span key={i} className="text-xs leading-none">{item.emoji}</span>
          ))}
        </div>
      )}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center text-primary/40">
          <CheckCircle2 size={16} />
        </div>
      )}
    </motion.button>
  );
};

/* ─── Main Component ─── */
const AttentionSwitch = () => {
    const { t } = useTranslation("quiet-focus-tool");
  const navigate = useNavigate();

  // difficultySettings defined inside the component so t() is in scope
  const difficultySettings: Record<Difficulty, { label: string; rounds: number; description: string; timeLimit: number; icon: React.ElementType }> = {
    easy: { label: t("gentle"), rounds: 10, description: t("a_calm_start_for_scattered_thoughts"), timeLimit: 20, icon: Sparkles },
    medium: { label: t("balanced"), rounds: 10, description: t("a_steady_pace_to_ground_your_mind"), timeLimit: 12, icon: Target },
    hard: { label: t("focused"), rounds: 10, description: t("stay_present_with_intense_clarity"), timeLimit: 8, icon: Zap },
  };

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [glowId, setGlowId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const totalRounds = 10;
  const currentChallenge = challenges[currentChallengeIndex] || null;

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      setTimeout(() => moveToNextChallenge(), 1000);
    }
  }, [timerActive, timeLeft]);

  const timeLimitMap: Record<Difficulty, number> = {
    easy: difficultySettings.easy.timeLimit,
    medium: difficultySettings.medium.timeLimit,
    hard: difficultySettings.hard.timeLimit,
  };

  const startWithDifficulty = (diff: Difficulty) => {
    const generated = Array.from({ length: 10 }).map((_, i) => generateChallenge(diff, i, timeLimitMap));
    setDifficulty(diff);
    setChallenges(generated);
    setCurrentChallengeIndex(0);
    setTimeLeft(difficultySettings[diff].timeLimit);
    setTimerActive(true);
  };

  const moveToNextChallenge = useCallback(async () => {
    if (currentChallengeIndex < totalRounds - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      if (difficulty) setTimeLeft(difficultySettings[difficulty].timeLimit);
      setTimerActive(true);
    } else {
      try {
        const userId = typeof window !== "undefined" ? sessionStorage.getItem("user_id") : null;
        await fetch("/ocd/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            activity_slug: "quiet_focus_tool",
            payload: {
              exercise: "Attention Switch",
              difficulty,
              rounds_completed: totalRounds,
              date: new Date().toISOString(),
            },
          }),
        });
      } catch (e) {
        console.error("Failed to log session:", e);
      }
      setCompleted(true);
    }
  }, [difficulty, currentChallengeIndex]);

  const handleTap = useCallback(
    (tappedItem: ChallengeItem) => {
      if (!currentChallenge) return;

      if (tappedItem.isTarget) {
        setGlowId(tappedItem.id);
        setTimeout(() => setGlowId(null), 300);

        setChallenges((prev) => {
          const updated = [...prev];
          const ch = { ...updated[currentChallengeIndex] };
          ch.items = ch.items.map((s) => (s.id === tappedItem.id ? { ...s, found: true } : s));
          updated[currentChallengeIndex] = ch;

          const allFound = ch.items.filter((s) => s.isTarget).every((s) => s.found);
          if (allFound) {
            setTimerActive(false);
            setTimeout(() => moveToNextChallenge(), 500);
          }
          return updated;
        });
      } else {
        setShakeId(tappedItem.id);
        setTimeout(() => setShakeId(null), 400);
      }
    },
    [currentChallenge, currentChallengeIndex, moveToNextChallenge]
  );

  if (completed) {
    return (
      <CompletionScreen
        title={t("focus_restored")}
        message={t("you_directed_your_attention_with_intention_your_mind_feels_c")}
      />
    );
  }

  if (!difficulty) {
    return (
      <ActivityLayout title={t("attention_switch")} slug="quiet_focus_tool" subtitle={t("exercise_your_cognitive_control")}>
        <div className="card-therapeutic shadow-2xl p-8 md:p-10 text-center relative pt-16">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-100 bg-slate-50 border border-slate-100 text-slate-400 transition-colors"
            aria-label={t("go_back_home")}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="w-16 h-16 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-8">
            <Target size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 italic">{t("choose_your_pace")}</h2>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed italic">
            {t("this_exercise_helps_you_practice_redirecting_scatt")}
          </p>

          <div className="space-y-3">
            {(Object.keys(difficultySettings) as Difficulty[]).map((diff) => {
              const settings = difficultySettings[diff];
              const Icon = settings.icon;
              return (
                <button
                  key={diff}
                  onClick={() => startWithDifficulty(diff)}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-sm">{settings.label}</h3>
                    <p className="text-[10px] text-muted-foreground italic">{settings.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-200 group-hover:text-primary transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      </ActivityLayout>
    );
  }

  const progressPercent = ((currentChallengeIndex + 1) / totalRounds) * 100;

  return (
    <ActivityLayout
      title={t("attention_switch")}
      slug="quiet_focus_tool"
      subtitle={`${difficultySettings[difficulty].label} · Round ${currentChallengeIndex + 1}/${totalRounds}`}
      progress={progressPercent}
    >
      <div className="card-therapeutic shadow-2xl p-8 flex flex-col items-center relative pt-16">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-100 bg-slate-50 border border-slate-100 text-slate-400 transition-colors"
          aria-label={t("go_back_home")}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`px-4 py-2 rounded-full border ${
              timeLeft <= 5 ? "bg-rose-50 border-rose-100 text-rose-500" : "bg-slate-50 border-slate-100 text-slate-400"
            } transition-colors duration-300 flex items-center gap-2`}
          >
            <Timer size={14} />
            <span className="text-sm font-bold tabular-nums">{timeLeft}s</span>
          </div>
        </div>

        <div className="text-center mb-8 h-12 flex flex-col justify-center">
          <h3 className="text-base font-bold text-slate-900 mb-1 leading-tight">{currentChallenge?.instruction}</h3>
          <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">
            {t("round")} {currentChallengeIndex + 1} {t("of")} {totalRounds}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-[300px]">
          {currentChallenge?.items.map((item) => (
            <ChallengeItemComponent
              key={item.id}
              item={item}
              type={currentChallenge.type}
              onTap={handleTap}
              shakeId={shakeId}
              glowId={glowId}
            />
          ))}
        </div>

        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-10 italic">
          {t("take_your_time_every_focused_moment_counts")}
        </p>
      </div>
    </ActivityLayout>
  );
};

export default AttentionSwitch;
