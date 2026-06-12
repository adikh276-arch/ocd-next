import { Card as UICard } from '@/components/ui/card';
// @ts-nocheck
import { useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Brain } from "lucide-react";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { useTranslation } from "react-i18next";

const SWIPE_THRESHOLD = 80;

function Card({
  tip,
  isTop,
  onSwipe,
  tipNumber,
}: {
  tip: string;
  isTop: boolean;
  onSwipe: () => void;
  tipNumber: number;
}) {
    const { t } = useTranslation("ocd_tips");
      const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-4, 0, 4]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
        const direction = info.offset.x > 0 ? 1 : -1;
        animate(x, direction * 500, {
          duration: 0.3,
          onComplete: onSwipe,
        });
      } else {
        animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
      }
    },
    [x, onSwipe]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4"
      style={{ zIndex: isTop ? 10 : 5 }}
    >
      <motion.div
        className="w-full max-w-[380px] aspect-[4/5] rounded-[32px] flex flex-col items-center justify-center relative overflow-hidden bg-white border-2 border-slate-100 shadow-xl"
        style={{
          x: isTop ? x : 0,
          rotate: isTop ? rotate : 0,
          opacity: isTop ? opacity : 1,
          scale: isTop ? 1 : 0.95,
          cursor: isTop ? "grab" : "default",
          y: isTop ? 0 : 8, // Stack effect
        }}
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={isTop ? handleDragEnd : undefined}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Background Symbol */}
        <div className="absolute top-[-5%] right-[-5%] opacity-[0.05] rotate-12 pointer-events-none text-primary">
          <Brain size={240} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-10 py-12 relative z-10 w-full">
          <div className="mb-8 flex flex-col items-center">
             <div className="w-12 h-1.5 bg-primary/20 rounded-full mb-3" />
             <span className="text-[11px] font-black tracking-[0.3em] text-primary/60 uppercase">
               {t("tip")}{tipNumber}
             </span>
          </div>
          
          <p
            className="text-slate-800 text-center leading-relaxed font-medium italic select-none"
            style={{
              fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
            }}
          >
            "{tip}"
          </p>
        </div>

        {/* Swipe hint at bottom */}
        {isTop && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.span
              className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-300"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("swipe_to_discover")}</motion.span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SwipeableCards({ tips = [], onComplete }: { tips?: string[], onComplete?: () => void }) {
    const { t } = useTranslation("ocd_tips");
      const [index, setIndex] = useState(0);

  if (!tips || tips.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-muted-foreground">
        {t("no_tips_available")}</div>
    );
  }

  // Use a stable next index for the background card
  const nextIndex = (index + 1) % tips.length;

  const handleSwipe = useCallback(() => {
    if (index === tips.length - 1) {
      if (onComplete) onComplete();
      else setIndex(0);
      return;
    }
    setIndex((prev) => (prev + 1) % tips.length);
  }, [index, tips.length, onComplete]);

  return (
    <div className="flex-1 flex flex-col w-full min-h-[500px]">
      {/* Header Info */}
      <div className="px-6 py-2 flex items-center justify-center">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
           <ActivityIcon size={12} className="text-primary" />
           <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">
             {t("insight")}{index + 1} {t("of")}{tips.length}
           </span>
        </div>
      </div>

      {/* Main Area */}
      <div className="relative w-full flex-1 min-h-[450px]">
        <AnimatePresence initial={false}>
          {/* Background Card */}
          <Card
            key={`next-${nextIndex}`}
            tip={tips[nextIndex]}
            isTop={false}
            onSwipe={() => {}}
            tipNumber={nextIndex + 1}
          />
          
          {/* Top Card */}
          <Card
            key={`current-${index}`}
            tip={tips[index]}
            isTop={true}
            onSwipe={handleSwipe}
            tipNumber={index + 1}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="px-10 pb-8 pt-4 flex justify-between items-center">
         <button 
           onClick={() => setIndex(prev => (prev - 1 + tips.length) % tips.length)}
           className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border-2 border-slate-100 shadow-sm active:scale-95 transition-all text-slate-400 hover:text-primary hover:border-primary/20"
         >
           <ChevronLeft size={24} />
         </button>

         <div className="flex flex-col items-center opacity-40">
            <div className="w-1 h-6 bg-slate-200 rounded-full mb-1" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">{t("swipe")}</span>
         </div>

         <button 
           onClick={handleSwipe}
           className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-95 transition-all"
         >
           <ChevronRight size={24} />
         </button>
      </div>
    </div>
  );
}

function ActivityIcon({ size, className }: { size: number; className?: string }) {
    const { t } = useTranslation("ocd_tips");
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
}
