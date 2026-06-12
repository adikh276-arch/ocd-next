import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";

interface Story {
  name: string;
  profession: string;
  emoji: string;
  pronoun: "he" | "she";
  struggled: string;
  managed: string;
  gradient: string;
  iconBg: string;
}

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("ocd_success_stories");
  return (
    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm text-primary">
      {children}
    </div>
  );
}

function ActivityButton({ children, onClick, disabled, variant = "primary" }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; variant?: "primary" | "secondary" }) {
    const { t } = useTranslation("ocd_success_stories");
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
        variant === "primary"
          ? "bg-primary text-white shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20"
          : "bg-white text-slate-400 border-2 border-slate-100 hover:border-slate-200"
      }`}
    >
      {children}
    </button>
  );
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

const Index = () => {
    const { t } = useTranslation("ocd_success_stories");
  const stories: Story[] = [
    {
      name: t("howie_mandel"),
      profession: t("howie_mandel_profession"),
      emoji: "🎤",
      pronoun: "he",
      struggled: t("howie_mandel_struggled"),
      managed: t("howie_mandel_managed"),
      gradient: "from-green-50/50 to-emerald-50/30",
      iconBg: "bg-emerald-600",
    },
    {
      name: t("lena_dunham"),
      profession: t("lena_dunham_profession"),
      emoji: "✍️",
      pronoun: "she",
      struggled: t("lena_dunham_struggled"),
      managed: t("lena_dunham_managed"),
      gradient: "from-purple-50/50 to-fuchsia-50/30",
      iconBg: "bg-purple-600",
    },
    {
      name: t("david_beckham"),
      profession: t("david_beckham_profession"),
      emoji: "⚽",
      pronoun: "he",
      struggled: t("david_beckham_struggled"),
      managed: t("david_beckham_managed"),
      gradient: "from-blue-50/50 to-sky-50/30",
      iconBg: "bg-blue-600",
    },
    {
      name: t("marc_summers"),
      profession: t("marc_summers_profession"),
      emoji: "📺",
      pronoun: "he",
      struggled: t("marc_summers_struggled"),
      managed: t("marc_summers_managed"),
      gradient: "from-orange-50/50 to-amber-50/30",
      iconBg: "bg-orange-600",
    },
    {
      name: t("cameron_diaz"),
      profession: t("cameron_diaz_profession"),
      emoji: "🌟",
      pronoun: "she",
      struggled: t("cameron_diaz_struggled"),
      managed: t("cameron_diaz_managed"),
      gradient: "from-pink-50/50 to-rose-50/30",
      iconBg: "bg-pink-600",
    },
    {
      name: t("daniel_radcliffe"),
      profession: t("daniel_radcliffe_profession"),
      emoji: "🎬",
      pronoun: "he",
      struggled: t("daniel_radcliffe_struggled"),
      managed: t("daniel_radcliffe_managed"),
      gradient: "from-cyan-50/50 to-sky-50/30",
      iconBg: "bg-cyan-600",
    },
    {
      name: t("leonardo_dicaprio"),
      profession: t("leonardo_dicaprio_profession"),
      emoji: "🎭",
      pronoun: "he",
      struggled: t("leonardo_dicaprio_struggled"),
      managed: t("leonardo_dicaprio_managed"),
      gradient: "from-emerald-50/50 to-teal-50/30",
      iconBg: "bg-emerald-600",
    },
    {
      name: t("charlie_puth"),
      profession: t("charlie_puth_profession"),
      emoji: "🎵",
      pronoun: "he",
      struggled: t("charlie_puth_struggled"),
      managed: t("charlie_puth_managed"),
      gradient: "from-indigo-50/50 to-violet-50/30",
      iconBg: "bg-indigo-600",
    },
    {
      name: t("hrithik_roshan"),
      profession: t("hrithik_roshan_profession"),
      emoji: "💪",
      pronoun: "he",
      struggled: t("hrithik_roshan_struggled"),
      managed: t("hrithik_roshan_managed"),
      gradient: "from-amber-50/50 to-yellow-50/30",
      iconBg: "bg-amber-600",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showCompletion, setShowCompletion] = useState(false);
  const isLast = current === stories.length - 1;
  const story = stories[current];

  const go = (to: number) => {
    setDirection(to > current ? 1 : -1);
    setCurrent(to);
  };

  const next = () => !isLast && go(current + 1);
  const prev = () => current > 0 && go(current - 1);
  const goFirst = () => go(0);

  const variants = {
    enter: (d: number) => ({ x: d * 100, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: -d * 100, opacity: 0, scale: 0.98 }),
  };

  const currentProgress = ((current + 1) / stories.length) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-success-stories">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>

          </div>
        </div>

        <div className="text-center mb-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-1">
              {t("hope__resilience")}</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
              {t("ocd_success_stories")}</h1>
            <p className="text-[14px] md:text-[16px] text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
              {t("real_people_real_struggles_real_recovery_these_sto")}</p>
          </div>
        </div>
      </div>

      <main className="w-full max-w-5xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border border-slate-200 border-t-[6px] border-t-primary shadow-xl shadow-slate-200/50 p-8 md:p-12 font-sans min-h-[550px] flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Hero/Profile */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
              >
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[40px] ${story.iconBg} flex items-center justify-center text-5xl md:text-6xl shadow-xl ring-8 ring-slate-50`}>
                  {story.emoji}
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                    {story.name}
                  </h2>
                  <p className="text-primary text-[11px] font-black uppercase tracking-[0.3em]">
                    {story.profession}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("profile")} {current + 1} {t("of")} {stories.length}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Column: Narrative */}
            <div className="flex flex-col space-y-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current + "-text"}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="bg-slate-50/50 rounded-[28px] border border-slate-100 p-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                        {t("the_struggle")}</h3>
                      <p className="text-slate-600 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                        {decodeQuotes(t("ldquo"))}{story.struggled}{decodeQuotes(t("rdquo"))}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                        {t("the_journey_to_management")}</h3>
                      <p className="text-slate-600 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                        {decodeQuotes(t("ldquo"))}{story.managed}{decodeQuotes(t("rdquo"))}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="space-y-6 pt-4">
                 <div className="flex items-center justify-between">
                    <button
                      onClick={prev}
                      disabled={current === 0}
                      className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-20 transition-all active:scale-90 shadow-sm"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-2.5">
                      {stories.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => go(i)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === current
                              ? "w-8 bg-primary shadow-sm"
                              : "w-1.5 bg-primary/10 hover:bg-primary/30"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={isLast ? goFirst : next}
                      className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90 shadow-sm"
                    >
                      {isLast ? <RotateCcw size={22} /> : <ChevronRight size={24} />}
                    </button>
                 </div>

                 {isLast && (
                   <div className="pt-2">
                     <ActivityButton onClick={() => setShowCompletion(true)}>
                       {t("finish_inspiration_journey")}
                     </ActivityButton>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="✨"
        title={t("inspiration_is_power")}
        description={t("seeing_others_succeed_shows_us_whats_possible_reco")}
        onStartOver={goFirst}
        startOverText={t("read_again")}
        onDone={() => window.history.back()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
