import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { RotateCcw, CheckCircle2, ChevronLeft, ChevronRight, Waves } from "lucide-react";
import { cards } from "./cardData";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";

interface CardsScreenProps {
  onRestart: () => void;
}

const SWIPE_THRESHOLD = 50;

const CardsScreen = ({ onRestart }: CardsScreenProps) => {
    const { t } = useTranslation("did_you_know");
      const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const isLast = current === cards.length - 1;
  const isFirst = current === 0;

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = current + dir;
      if (next < 0 || next >= cards.length) return;
      setDirection(dir);
      setCurrent(next);
    },
    [current]
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && !isLast) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD && !isFirst) go(-1);
  };

  const card = cards[current];

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === current ? 32 : 10,
              height: 10,
              backgroundColor: i === current ? "hsl(var(--primary))" : "#E2E8F0",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Card area */}
      <div className="w-full max-w-5xl overflow-hidden min-h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction * 50, opacity: 0, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction * -50, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            className="w-full bg-white rounded-[40px] p-10 md:p-16 border-2 border-slate-100 border-t-[8px] border-t-primary shadow-xl shadow-slate-200/50 cursor-grab active:cursor-grabbing relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
          >
            {/* Left Side: Illustration / Big Number */}
            <div className="flex flex-col items-center justify-center shrink-0 w-48 h-48 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner group">
               <p className="text-7xl font-black text-primary/10 leading-none italic group-hover:scale-110 transition-transform">
                  {card.number}
               </p>
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-4">
                  {t("insight")}{current + 1}
               </span>
            </div>

            {/* Right Side: Content */}
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-between">
                  <span className="text-[10px] font-black text-primary bg-primary/5 px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
                    {t("psychoeducation")}</span>
                  <span className="hidden md:block text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {current + 1} {t("of_5")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {t(card.title)}
                </h2>
                <p className="text-xl leading-relaxed text-slate-500 font-medium italic">
                  {card.body}
                </p>
              </div>

              <div className="bg-primary/5 rounded-[28px] p-8 border-2 border-primary/10 border-dashed relative group">
                <Waves className="absolute -top-3 -right-3 text-primary/20 w-12 h-12 rotate-12 group-hover:rotate-0 transition-transform" />
                <p className="text-xl italic font-bold text-primary leading-relaxed relative z-10">
                  "{t(card.quote)}"
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation / Actions */}
      <div className="w-full max-w-md pb-12">
        {isLast ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowCompletion(true)}
              className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <CheckCircle2 size={20} />
              {t("finish_insights")}</button>
            <button
              onClick={() => {
                setCurrent(0);
                setDirection(-1);
              }}
              className="w-full py-4 rounded-[24px] bg-white text-slate-600 border-2 border-slate-100 font-bold text-sm uppercase tracking-widest transition-all hover:bg-slate-50 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              {t("read_again")}</button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6">
            <button
              onClick={() => go(-1)}
              disabled={isFirst}
              className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all ${
                isFirst ? 'opacity-0 pointer-events-none' : 'bg-white border-2 border-slate-100 text-slate-400 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft size={28} />
            </button>

            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{t("swipe_to_learn")}</span>
            </div>

            <button
              onClick={() => go(1)}
              className="w-16 h-16 rounded-[24px] bg-primary text-white flex items-center justify-center transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 shadow-md"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>

      <StandardCompletionModal 
        showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🧠"
        title={t("now_you_know")}
        description={t("understanding_your_mind_is_the_first_step_toward_f")}
        onStartOver={() => {
          setShowCompletion(false);
          setCurrent(0);
          onRestart();
        }}
        startOverText={t("back_to_start")}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default CardsScreen;
