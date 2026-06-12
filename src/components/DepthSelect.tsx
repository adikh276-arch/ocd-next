"use client";
import { Layers } from 'lucide-react';
import { DEPTH_OPTIONS } from '@/lib/tracker-data';
import { useTranslation } from '@/lib/translation';

interface DepthSelectProps {
  value: string;
  onChange: (value: string) => void;
  customText: string;
  onCustomTextChange: (value: string) => void;
}

export default function DepthSelect({ value, onChange }: DepthSelectProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="section-icon section-icon-accent">
          <Layers className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <label className="text-sm font-bold text-foreground">
            {t('What best describes your work depth today?')}
          </label>
          <span className="ml-2 text-xs text-muted-foreground font-medium">{t('Optional')}</span>
        </div>
      </div>
      <div className="grid gap-2.5">
        {DEPTH_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`text-left px-5 py-4 rounded-2xl border transition-all duration-300 group ${
              value === opt.value
                ? 'border-transparent text-primary-foreground shadow-lg shadow-primary/20'
                : 'border-border bg-card text-secondary-foreground hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5'
            }`}
            style={value === opt.value ? { background: 'var(--gradient-primary)' } : undefined}
          >
            <div className={`text-sm font-bold ${value === opt.value ? '' : 'group-hover:text-foreground transition-colors'}`}>
              {t(opt.label)}
            </div>
            <div className={`text-xs mt-0.5 ${value === opt.value ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {t(opt.description)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

