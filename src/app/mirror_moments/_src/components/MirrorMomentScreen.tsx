import { Button } from "@/app/mirror_moments/_src/components/ui/button";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface MirrorMomentScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const emojiMap = ["🌿", "💙", "🌊", "✨", "🤍", "🌸", "💛"];

const MirrorMomentScreen = ({ onBack, onComplete }: MirrorMomentScreenProps) => {
    const { t } = useTranslation("mirror_moments");
      const [currentIndex, setCurrentIndex] = useState(0);
  const [maxViewed, setMaxViewed] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const affirmationsRaw = 'Mirror.Affirmations';
  const affirmations: string[] = Array.isArray(affirmationsRaw) ? affirmationsRaw : [];
  const affirmationsCount = affirmations.length || 1;
  const allViewed = maxViewed >= affirmationsCount - 1;

  useEffect(() => {
    if (currentIndex > maxViewed) setMaxViewed(currentIndex);
  }, [currentIndex, maxViewed]);

  const goTo = useCallback((idx: number, dir: "left" | "right") => {
    if (idx < 0 || idx >= affirmationsCount) return;
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(idx);
      setDirection(null);
    }, 200);
  }, [affirmationsCount]);

  const handleComplete = () => {
    setShowFinalModal(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) goTo(currentIndex - 1, "right");
    else if (diff < -50) goTo(currentIndex + 1, "left");
    setTouchStart(null);
  };

  const affirmation = affirmations[currentIndex] || '';
  const emoji = emojiMap[currentIndex % emojiMap.length];

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background bg-texture">
      
      {/* Back */}
      <button
        onClick={onBack}
        className="absolute left-4 top-4 text-muted-foreground font-body text-xl hover:text-foreground transition-colors z-10"
        aria-label={t("mirrorback")}
      >
        ←
      </button>

      {/* Header */}
      <div className="pt-14 px-8 text-center max-w-full">
        <h1 className="font-display text-2xl font-semibold text-warm-rose mb-3">
          {t("mirrortitle")}</h1>
        <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6 max-w-[300px] mx-auto">
          {t("mirrordescription")}</p>
      </div>

      {/* Card area */}
      <div className="flex flex-1 items-center justify-center w-full max-w-full px-4 relative">
        {/* Left arrow */}
        <button
          onClick={() => goTo(currentIndex - 1, "right")}
          disabled={currentIndex === 0}
          className="absolute left-2 text-2xl text-muted-foreground disabled:opacity-20 hover:text-warm-rose transition-colors z-10"
          aria-label={t("mirrorprev")}
        >
          ‹
        </button>

        {/* Card */}
        <div
          className={`w-full max-w-[280px] mx-auto transition-all duration-200 ease-out ${
            direction === "left" ? "opacity-0 -translate-x-4" :
            direction === "right" ? "opacity-0 translate-x-4" :
            "opacity-100 translate-x-0"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="rounded-2xl border border-warm-peach bg-card p-8 shadow-lg shadow-warm-rose/10 text-center">
            <div className="text-5xl mb-5">{emoji}</div>
            <p className="font-display text-xl text-foreground leading-relaxed whitespace-pre-line">
              {affirmation}
            </p>
          </div>
          <p className="font-body italic text-xs text-muted-foreground text-center mt-4">
            {t("mirrorread_again")}</p>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(currentIndex + 1, "left")}
          disabled={currentIndex === affirmationsCount - 1}
          className="absolute right-2 text-2xl text-muted-foreground disabled:opacity-20 hover:text-warm-rose transition-colors z-10"
          aria-label={t("mirrornext")}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center py-4">
        {Array.from({ length: affirmationsCount }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === currentIndex ? "bg-warm-rose" : "bg-warm-peach"
            }`}
          />
        ))}
      </div>

      {/* Bottom button */}
      <div className="w-full max-w-full px-8 pb-10">
        {allViewed ? (
          <Button variant="warm-complete" size="lg" className="h-14 text-lg" onClick={handleComplete}>
            {t("mirrorcomplete")}</Button>
        ) : (
          <div className="h-14" />
        )}
      </div>
      <StandardCompletionModal
        isOpen={showFinalModal}
        onOpenChange={setShowFinalModal}
        emoji="✨"
        title={t("self-love_reflected")}
        description={t("youve_looked_in_the_mirror_and_seen_your_true_wort")}
        
        showHome={false}
        onStartOver={() => window.location.reload()}/>
    </div>
  );
};

export default MirrorMomentScreen;
