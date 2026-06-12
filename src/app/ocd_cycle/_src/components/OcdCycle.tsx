import { useState, useCallback } from "react";
import { Brain, Zap, RefreshCw, Heart, ArrowLeft } from "lucide-react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

type StageType = "obsession" | "anxiety" | "compulsion" | "relief" | "mantra";

interface Stage {
  type: StageType;
  label: string;
  text: string;
  button: string;
}

const STAGE_COLORS: Record<StageType, string> = {
  obsession: "hsl(var(--stage-obsession))",
  anxiety: "hsl(var(--stage-anxiety))",
  compulsion: "hsl(var(--stage-compulsion))",
  relief: "hsl(var(--stage-relief))",
  mantra: "hsl(var(--stage-mantra))",
};

const STAGE_ICONS: Record<StageType, React.ReactNode> = {
  obsession: <Brain size={14} />,
  anxiety: <Zap size={14} />,
  compulsion: <RefreshCw size={14} />,
  relief: <Heart size={14} />,
  mantra: <Heart size={14} />,
};

const R = 150;
const SVG = 400;
const C = SVG / 2;

const LABELS: { type: StageType; x: number; y: number }[] = [
  { type: "obsession", x: C, y: C - R - 10 },
  { type: "anxiety", x: C + R + 10, y: C },
  { type: "compulsion", x: C, y: C + R + 10 },
  { type: "relief", x: C - R - 10, y: C },
];

// Pure utility functions — no hooks
function polar(cx: number, cy: number, r: number, deg: number) {
    const { t } = useTranslation("ocd_cycle");
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
    const { t } = useTranslation("ocd_cycle");
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

const decodeQuotes = (text: string) => {
  if (!text) return "";
  return text
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&bdquo;/g, "„")
    .replace(/&ldqu;/g, "“")
    .replace(/&quo;/g, '"')
    .replace(/&ldquo/g, "“")
    .replace(/&rdquo/g, "”");
};

const OcdCycle = () => {
    const { t } = useTranslation("ocd_cycle");
  // STAGES must live inside the component so t() works correctly
  const STAGES: Stage[] = [
    { type: "obsession", label: t("obsession", "Obsession"), text: t("a_sudden_intrusive_thought_appears_what_if_i_lose_control_it", "A sudden intrusive thought appears: \"What if I lose control?\" It feels urgent and threatening."), button: t("button_i_notice_the_thought") },
    { type: "anxiety", label: t("anxiety", "Anxiety"), text: t("your_body_reacts_tension_rises_your_mind_says_fix_this_now", "Your body reacts. Tension rises. Your mind says \"fix this now.\""), button: t("button_anxiety_is_here") },
    { type: "compulsion", label: t("compulsion", "Compulsion"), text: t("you_start_checking_replaying_analyzing_the_thought_to_feel_s", "You start checking, replaying, analyzing the thought to feel safer."), button: t("button_im_doing_a_compulsion") },
    { type: "relief", label: t("relief", "Relief"), text: t("anxiety_drops_a_little_you_feel_temporary_safety", "Anxiety drops a little. You feel temporary safety."), button: t("button_relief_is_temporary") },
    { type: "obsession", label: t("obsession", "Obsession"), text: t("your_brain_learns_thought__checking__relief_so_it_sends_the_", "Your brain learns: thought → checking → relief. So it sends the thought again, stronger."), button: t("button_that_reinforces_the_cycle") },
    { type: "anxiety", label: t("anxiety", "Anxiety"), text: t("the_thought_feels_stronger_now_more_convincing", "The thought feels stronger now — more convincing. The anxiety is louder."), button: t("button_the_urge_is_stronger_now") },
    { type: "compulsion", label: t("compulsion", "Compulsion"), text: t("checking_becomes_automatic_a_habit", "Checking becomes automatic — a habit. You do it without thinking."), button: t("button_its_becoming_automatic") },
    { type: "relief", label: t("relief", "Relief"), text: t("relief_comes_again__but_fades_faster_the_loop_tightens", "Relief comes again — but fades faster. The loop tightens."), button: t("button_the_cycle_is_tightening") },
    { type: "obsession", label: t("obsession", "Obsession"), text: t("the_real_fuel_isnt_the_thought_its_how_important_it_feels", "The real fuel isn't the thought — it's how important it feels. What if you let it pass?"), button: t("button_what_if_i_dont_respond") },
    { type: "anxiety", label: t("anxiety", "Anxiety"), text: t("anxiety_is_uncomfortable__but_not_dangerous_what_if_you_didn", "Anxiety is uncomfortable — but not dangerous. What if you didn't act on the urge?"), button: t("button_can_i_sit_with_the_discomfort") },
    { type: "mantra", label: t("ocd_mantra", "OCD Mantra"), text: t("the_way_out_isnt_more_checking_its_allowing_the_thought_with", "The way out isn't more checking — it's allowing the thought without acting on it."), button: t("button_ill_allow_the_thought") },
  ];

  const TOTAL = STAGES.length;

  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);
  const [cumulativeRotation, setCumulativeRotation] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'ocd_cycle',
          payload: { completed: true, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log ocd cycle:", e);
    } finally {
      setSaving(false);
    }
  };

  const stage = STAGES[step] ?? STAGES[TOTAL - 1];
  const progress = (step + 1) / TOTAL;
  const arcDeg = progress * 360;
  const isMantra = stage.type === "mantra";
  const stageColor = STAGE_COLORS[stage.type];

  const typeToQuarter: Record<StageType, number> = {
    obsession: 0,
    anxiety: 1,
    compulsion: 2,
    relief: 3,
    mantra: 0,
  };

  const advance = useCallback((delta: 1 | -1) => {
    let nextStep = step + delta;
    if (nextStep >= TOTAL && delta === 1) {
      nextStep = 0;
    } else if (nextStep < 0 || nextStep >= TOTAL) {
      return;
    }

    setFading(true);
    const currentType = STAGES[step].type;
    const nextType = STAGES[nextStep].type;
    const currentQ = typeToQuarter[currentType];
    const nextQ = typeToQuarter[nextType];

    let rotDelta;
    if (nextStep === 0 && step === TOTAL - 1) {
      rotDelta = 0;
    } else {
      rotDelta = ((nextQ - currentQ) % 4 + 4) % 4;
      if (delta === -1 && rotDelta > 0) {
        rotDelta = rotDelta - 4;
      }
    }

    setTimeout(() => {
      setStep(nextStep);
      if (nextStep === 0 && delta === 1) {
        setCumulativeRotation(0);
      } else {
        setCumulativeRotation((prev) => prev + rotDelta * 90);
      }
      setFading(false);
    }, 300);
  }, [step, STAGES, TOTAL, typeToQuarter]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-ocd-cycle">
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
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("understanding_the_ocd_cycle", "Understanding the OCD Cycle")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("cognitive_insight", "Cognitive Insight")}</p>
        </div>
      </div>

      <main className="w-full max-w-5xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-12 font-sans min-h-[550px] flex flex-col justify-center">
          
          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-10 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("the_loop_is_powered_by_your_reaction_learn_to_reco", "The loop is powered by your reaction. Learn to recognise it — and break it.")}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Visualization */}
            <div className="relative flex items-center justify-center w-full my-4" style={{ height: SVG }}>
              <div className="absolute scale-[0.8] md:scale-[0.95] transform-origin-center flex justify-center items-center w-full h-full">
                <svg
                  width={SVG}
                  height={SVG}
                  viewBox={`0 0 ${SVG} ${SVG}`}
                  className="absolute"
                  style={{
                    transform: `rotate(${cumulativeRotation}deg)`,
                    transition: "transform 0.65s cubic-bezier(0.34, 1.4, 0.64, 1)",
                  }}
                >
                  <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--stage-obsession))" />
                      <stop offset="35%" stopColor="hsl(var(--stage-anxiety))" />
                      <stop offset="65%" stopColor="hsl(var(--stage-compulsion))" />
                      <stop offset="100%" stopColor="hsl(var(--stage-relief))" />
                    </linearGradient>
                    <linearGradient id="arcGradMantra" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--stage-mantra))" />
                      <stop offset="100%" stopColor="hsl(var(--stage-relief))" />
                    </linearGradient>
                  </defs>
                  <circle cx={C} cy={C} r={R} fill="none" stroke="hsl(var(--muted-foreground) / 0.1)" strokeWidth={2} strokeDasharray="6 5" />
                  {arcDeg > 2 && (
                    <path d={arcPath(C, C, R, 0, Math.min(arcDeg, 359.5))} fill="none" stroke={isMantra ? "url(#arcGradMantra)" : "url(#arcGrad)"} strokeWidth={4} strokeLinecap="round" />
                  )}
                </svg>
                {LABELS.map((item) => {
                  const isActive = item.type === stage.type;
                  const isTop = item.y < C / 2;
                  const isBottom = item.y > SVG - C / 2;
                  const isLeft = item.x < C / 2;
                  const isRight = item.x > SVG - C / 2;
                  let anchor: React.CSSProperties = {};
                  if (isTop) anchor = { bottom: SVG - item.y, left: "50%", transform: "translateX(-50%)" };
                  else if (isBottom) anchor = { top: item.y, left: "50%", transform: "translateX(-50%)" };
                  else if (isRight) anchor = { left: item.x, top: "50%", transform: "translateY(-50%)" };
                  else if (isLeft) anchor = { right: SVG - item.x, top: "50%", transform: "translateY(-50%)" };
                  return (
                    <div key={item.type} className="absolute flex flex-col items-center gap-1 pointer-events-none transition-all duration-400" style={{ ...anchor, opacity: isActive ? 1 : 0.2, color: isActive ? STAGE_COLORS[item.type] : '#cbd5e1' }}>
                      {STAGE_ICONS[item.type]}
                      <span className="text-[10px] font-bold tracking-widest uppercase font-body">
                        {t(item.type)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Content & Controls */}
            <div className="flex flex-col space-y-8">
              <div className="space-y-4">
                <div className={`flex items-center gap-2 transition-all duration-300 ${fading ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`} style={{ color: stageColor }}>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border-2 border-slate-100">
                    {STAGE_ICONS[stage.type]}
                  </div>
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase">{stage.label}</span>
                </div>

                <div className={`transition-all duration-300 ${fading ? "opacity-0 scale-[0.98] translate-y-2" : "opacity-100 scale-100 translate-y-0"}`}>
                  <div className="bg-slate-50/50 rounded-[28px] border-2 border-slate-100 p-8 min-h-[160px] flex items-center justify-center">
                    <p className="font-sans text-lg md:text-xl font-medium leading-relaxed text-slate-700 whitespace-pre-line text-center italic">
                      {decodeQuotes(t("ldquo"))}{stage.text}{decodeQuotes(t("rdquo"))}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <button
                  onClick={() => { if (isMantra) { handleComplete(); } else { advance(1); } }}
                  disabled={saving}
                  className={`w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 ${fading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
                >
                  {saving ? t("saving", "Saving...") : (isMantra ? t("complete_session", "Complete Session") : stage.button)}
                </button>

                {step > 0 && (
                  <button
                    onClick={() => advance(-1)}
                    className="w-full py-4 rounded-[24px] bg-white text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] border-2 border-slate-100 transition-all hover:border-slate-200"
                  >
                    {t("previous_step", "Previous Step")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌬️"
        title={t("breaking_the_cycle", "Breaking the Cycle")}
        description={t("understanding_the_loop_is_the_first_step_out_of_it", "Understanding the loop is the first step out of it. You're already ahead.")}
        onStartOver={() => setStep(0)}
        startOverText={t("restart_tour", "Restart Tour")}
        showHome={false}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default OcdCycle;
