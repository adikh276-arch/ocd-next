import React, { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";

import DistortionCard from "../components/DistortionCard";
import FinishCard from "../components/FinishCard";
import { cognitiveDistortions } from "../data/cognitiveDistortions";
import { useTranslation } from "react-i18next";

const TOTAL = cognitiveDistortions.length;
const TOTAL_SLIDES = TOTAL + 1;

const CognitiveDistortionsCarousel: React.FC = () => {
    const { t } = useTranslation("cognitive_distortions");
      const [current, setCurrent] = useState(0);
  const touchStart = useRef(0);
  const touchDelta = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);


  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.max(0, Math.min(TOTAL_SLIDES - 1, index)));
      setOffset(0);
    },
    []
  );

  const goNext = () => goTo(current + 1);
  const goPrev = () => goTo(current - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
    setOffset(touchDelta.current);
  };
  const onTouchEnd = () => {
    setDragging(false);
    const threshold = 50;
    if (touchDelta.current < -threshold) goTo(current + 1);
    else if (touchDelta.current > threshold) goTo(current - 1);
    else setOffset(0);
    touchDelta.current = 0;
  };

  const mouseStart = useRef(0);
  const mouseDragging = useRef(false);
  const onMouseDown = (e: React.MouseEvent) => {
    mouseStart.current = e.clientX;
    mouseDragging.current = true;
    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDragging.current) return;
    const delta = e.clientX - mouseStart.current;
    touchDelta.current = delta;
    setOffset(delta);
  };
  const onMouseUp = () => {
    if (!mouseDragging.current) return;
    mouseDragging.current = false;
    setDragging(false);
    const threshold = 50;
    if (touchDelta.current < -threshold) goTo(current + 1);
    else if (touchDelta.current > threshold) goTo(current - 1);
    else setOffset(0);
    touchDelta.current = 0;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const isFinishScreen = current === TOTAL;
  const isLastCard = current === TOTAL - 1;

  const handleGlobalBack = () => {
    if (current > 0) goTo(current - 1);
    else window.history.back();
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'cognitive_distortions',
          payload: { completed: true, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log distortions:", e);
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden select-none theme-cognitive_distortions">
      {/* Header */}
      <div className="w-full max-w-md mx-auto mb-6 relative z-10 font-sans">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleGlobalBack}
            className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <h1 className="font-heading text-lg font-semibold text-foreground text-center">
              {t("cognitive_distortions")}</h1>
          </div>
          <ActivityHistoryDrawer slug="cognitive_distortions" title={t("distortion_history")} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-4 relative z-10">
        <div className="w-full max-w-md flex flex-col items-center">
          <p className="text-[13px] text-muted-foreground mb-4 text-center font-body italic">
            {t("notice__respond__not_debate")}</p>

          <div
            className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing flex items-center"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className="flex items-stretch w-full"
              style={{
                transform: `translateX(calc(-${current * 100}% + ${offset}px))`,
                transition: dragging ? "none" : "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {cognitiveDistortions.map((d, i) => (
                <div key={d.id} className="w-full flex-shrink-0 flex items-stretch py-2" style={{ minWidth: "100%" }}>
                  <DistortionCard distortion={d} index={i} total={TOTAL} />
                </div>
              ))}

              <div className="w-full flex-shrink-0 flex items-stretch py-2" style={{ minWidth: "100%" }}>
                <FinishCard 
                   onStartOver={() => goTo(0)} 
                   onComplete={handleComplete} 
                   saving={saving} 
                   showModal={showCompletion} 
                   onModalChange={setShowCompletion}
                />
              </div>

            </div>
          </div>

          <div className="w-full mt-6 flex flex-col items-center gap-5">
            {!isFinishScreen && (
              <div className="flex items-center justify-between w-full gap-3">
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-border text-muted-foreground text-sm font-semibold transition-all active:scale-[0.96] disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={16} />
                  <span>{t("previous")}</span>
                </button>

                {!isLastCard ? (
                  <button
                    onClick={goNext}
                    className="flex-[1.5] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm transition-all active:scale-[0.96]"
                  >
                    <span>{t("next")}</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="flex-[1.5] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm transition-all active:scale-[0.96]"
                  >
                    <span>{t("finish")}</span>
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${i === current
                    ? "w-4 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {!isFinishScreen && (
              <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase opacity-60">
                {t("swipe_or_tap_next_to_continue")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveDistortionsCarousel;
