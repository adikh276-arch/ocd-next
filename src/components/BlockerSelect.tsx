"use client";
import { AlertTriangle } from 'lucide-react';
import { BLOCKERS } from '@/lib/tracker-data';
import { useTranslation } from '@/lib/translation';

interface BlockerSelectProps {
  value: string;
  onChange: (value: string) => void;
  customText: string;
  onCustomTextChange: (value: string) => void;
}

export default function BlockerSelect({ value, onChange, customText, onCustomTextChange }: BlockerSelectProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="section-icon section-icon-warning">
          <AlertTriangle className="w-4 h-4 text-primary-foreground" />
        </div>
        <label className="text-sm font-bold text-foreground">
          {t('What impacted your performance the most?')}
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {BLOCKERS.map((blocker) => (
          <button
            key={blocker}
            type="button"
            onClick={() => onChange(blocker)}
            className={`chip ${value === blocker ? 'chip-active' : ''}`}
          >
            {t(blocker)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange('Other')}
          className={`chip ${value === 'Other' ? 'chip-active' : ''}`}
        >
          {t('Other')}
        </button>
      </div>
      {value === 'Other' && (
        <div className="space-y-2 animate-fade-in">
          <label className="text-xs text-muted-foreground font-medium">{t('Please specify')}</label>
          <input
            type="text"
            maxLength={150}
            value={customText}
            onChange={(e) => onCustomTextChange(e.target.value)}
            placeholder={t('Describe what impacted your performanceâ€¦')}
            className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          />
        </div>
      )}
    </div>
  );
}

