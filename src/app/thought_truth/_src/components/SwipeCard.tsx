import { useRef, useState, useCallback } from "react";

interface SwipeCardProps {
  question: string;
  gradient: string;
  onSwipe: (direction: "left" | "right") => void;
  disabled?: boolean;
}

const SwipeCard = ({ question, gradient, onSwipe, disabled }: SwipeCardProps) => {
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flyOff, setFlyOff] = useState<"left" | "right" | null>(null);
  const startX = useRef(0);

  const handleStart = useCallback((clientX: number) => {
    if (disabled || flyOff) return;
    startX.current = clientX;
    setIsDragging(true);
  }, [disabled, flyOff]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || flyOff) return;
    setDragX(clientX - startX.current);
  }, [isDragging, flyOff]);

  const handleEnd = useCallback(() => {
    if (!isDragging || flyOff) return;
    setIsDragging(false);
    if (Math.abs(dragX) > 80) {
      const dir = dragX > 0 ? "right" : "left";
      setFlyOff(dir);
      setTimeout(() => onSwipe(dir), 400);
    } else {
      setDragX(0);
    }
  }, [isDragging, dragX, flyOff, onSwipe]);

  const rotation = flyOff
    ? flyOff === "right" ? 15 : -15
    : dragX * 0.08;
  const translateX = flyOff
    ? flyOff === "right" ? 500 : -500
    : dragX;
  const opacity = flyOff ? 0 : 1;

  return (
    <div
      ref={cardRef}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={() => isDragging && handleEnd()}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      style={{
        background: gradient,
        borderRadius: 22,
        padding: '28px 22px',
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: disabled ? 'default' : 'grab',
        userSelect: 'none',
        transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
        opacity,
        transition: isDragging
          ? 'none'
          : flyOff
            ? 'transform 0.4s ease, opacity 0.4s ease'
            : 'transform 0.3s ease',
        touchAction: 'none',
        position: 'relative',
      }}
    >
      {/* Direction indicators */}
      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          fontSize: 28,
          fontWeight: 900,
          color: '#FF6B9D',
          opacity: dragX < -20 ? Math.min(1, Math.abs(dragX) / 80) : 0,
          transition: isDragging ? 'none' : 'opacity 0.2s',
        }}
      >
        ✕
      </div>
      <div
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          fontSize: 28,
          fontWeight: 900,
          color: '#22C55E',
          opacity: dragX > 20 ? Math.min(1, dragX / 80) : 0,
          transition: isDragging ? 'none' : 'opacity 0.2s',
        }}
      >
        ✓
      </div>

      <p style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
        {question}
      </p>
    </div>
  );
};

export default SwipeCard;
