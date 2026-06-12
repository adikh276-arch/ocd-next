import { useState, useRef, useCallback } from "react";
import type { RoomType } from "./PickSpaceScreen";
import { roomImages } from "./roomImages";
import { ChevronLeft, MoveHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RevealScreenProps {
  room: RoomType;
  onNext: () => void;
  onBack: () => void;
}

function BackBadge({ onClick }: { onClick: () => void }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <button
          onClick={onClick}
          className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm hover:bg-primary/20 transition-colors"
        >
          <ChevronLeft className="text-primary" size={18} />
        </button>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-primary/20"
        >
          {children}
        </button>
      );
}

const RevealScreen = ({ room, onNext, onBack }: RevealScreenProps) => {
    const { t } = useTranslation("guided_imagery");
      const [sliderPos, setSliderPos] = useState(50);
  const [hasReached100, setHasReached100] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const images = roomImages[room] || { clean: "", cluttered: "" };

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
    if (percent >= 98) {
       setSliderPos(100);
       setHasReached100(true);
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const getMessage = () => {
    if (sliderPos >= 100) return "This is what's possible. ✨";
    if (sliderPos >= 70) return "Almost there…";
    if (sliderPos >= 30) return "Notice what's changing…";
    return "Start sliding to reveal the calm space.";
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <BackBadge onClick={onBack} />
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("the_reveal")}</p>
      </div>

      <div className="flex-1 flex flex-col items-center text-center">
        <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
          {t("drag_to_reveal_your_calm_space")}</h2>
        <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-6">
          {t("slowly_uncover_the_potential_of_your_environment")}</p>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-3xl shadow-xl border-4 border-white/40 ring-1 ring-primary/10"
          style={{ aspectRatio: '4/5', touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Clean (right/background) */}
          {images.clean && (
            <img
              src={typeof images.clean === 'string' ? images.clean : (images.clean as any).src}
              alt={t("clean_room")}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          )}

          {/* Cluttered (left/foreground) — clipped */}
          <div
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            {images.cluttered && (
              <img
                src={typeof images.cluttered === 'string' ? images.cluttered : (images.cluttered as any).src}
                alt={t("cluttered_room")}
                className="h-full w-full object-cover grayscale-[0.2]"
                draggable={false}
              />
            )}
          </div>

          {/* Labels */}
          <div className="absolute z-20 bottom-4 left-4 rounded-xl bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-white backdrop-blur-md">
            {t("current")}</div>
          <div className="absolute z-20 bottom-4 right-4 rounded-xl bg-primary/80 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-white backdrop-blur-md">
            {t("potential")}</div>

          {/* Slider handle */}
          <div
            className="absolute z-30 top-0 bottom-0 flex items-center"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="h-full w-0.5 bg-white/60 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl cursor-ew-resize border-2 border-primary ring-4 ring-primary/20">
               <MoveHorizontal className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 py-3 rounded-2xl bg-primary/5 border border-primary/5 min-h-[50px] flex items-center justify-center">
           <p className="activity-body text-sm font-medium italic text-primary/80">{getMessage()}</p>
        </div>
      </div>

      <div className="pt-6">
        <ActivityButton
          onClick={onNext}
          disabled={!hasReached100}
        >
          {t("i_can_feel_it")}</ActivityButton>
      </div>
    </div>
  );
};

export default RevealScreen;
