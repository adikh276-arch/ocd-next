"use client";
import { useState, useRef, useCallback, ReactNode } from 'react';
import { useTranslation } from '@/lib/translation';

interface ScoreSliderProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  lowLabel: string;
  highLabel: string;
  icon?: ReactNode;
  iconClass?: string;
  required?: boolean;
}

export default function ScoreSlider({ label, description, value, onChange, lowLabel, highLabel, icon, iconClass = 'section-icon-primary', required = true }: ScoreSliderProps) {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const val = Math.round(pct * 9) + 1;
    onChange(val);
  }, [onChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateValue(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateValue(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const pct = ((value - 1) / 9) * 100;

  const getScoreColor = () => {
    if (value >= 8) return 'text-primary';
    if (value >= 5) return 'text-[hsl(var(--warning))]';
    return 'text-[hsl(var(--danger))]';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className={`section-icon ${iconClass} flex-shrink-0`}>
              {icon}
            </div>
          )}
          <div>
            <label className="text-sm font-bold text-foreground">{label}</label>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed max-w-xs">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {required && (
            <span className="text-xs font-semibold text-destructive tracking-wide">{t('Required')}</span>
          )}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl" style={{ background: 'var(--gradient-primary)' }}>
            <span className="font-mono text-2xl font-extrabold tabular-nums text-white leading-none">
              {value}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={trackRef}
        className="relative h-9 flex items-center cursor-pointer touch-none group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="slider-track w-full" />
        <div className="slider-fill absolute left-0" style={{ width: `${pct}%` }} />
        <div
          className={`slider-thumb absolute -translate-x-1/2 transition-transform duration-200 ${isDragging ? 'scale-125' : ''}`}
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

