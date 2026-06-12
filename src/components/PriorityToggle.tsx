"use client";
import { Check, X, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/translation';

interface PriorityToggleProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  textValue: string;
  onTextChange: (value: string) => void;
}

export default function PriorityToggle({ value, onChange, textValue, onTextChange }: PriorityToggleProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="section-icon section-icon-purple">
            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <label className="text-sm font-bold text-foreground">
            {t('Did you complete your most important task today?')}
          </label>
        </div>
        <span className="text-xs font-semibold text-destructive tracking-wide">{t('Required')}</span>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 border ${
            value === true
              ? 'text-primary-foreground border-transparent shadow-lg shadow-primary/20'
              : 'border-border bg-card text-secondary-foreground hover:border-primary/30 hover:shadow-md'
          }`}
          style={value === true ? { background: 'var(--gradient-primary)' } : undefined}
        >
          {value === true && <Check className="w-4 h-4" />}
          {t('Yes, I did')}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 border ${
            value === false
              ? 'text-white border-transparent shadow-lg shadow-destructive/20'
              : 'border-border bg-card text-secondary-foreground hover:border-primary/30 hover:shadow-md'
          }`}
          style={value === false ? { background: 'linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)' } : undefined}
        >
          {value === false && <X className="w-4 h-4" />}
          {t('Not yet')}
        </button>
      </div>

      {value === true && (
        <div className="animate-fade-in pt-2">
          <textarea
            value={textValue}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={t('What is one thing you did well today?')}
            rows={3}
            className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none font-medium text-center"
          />
        </div>
      )}
    </div>
  );
}

