"use client";
import { useEffect, useState } from 'react';
import { getEntries, BLOCKERS, DEPTH_OPTIONS, PerformanceEntry } from '@/lib/tracker-data';
import { useTranslation } from '@/lib/translation';
import { useAuth } from '@/lib/auth';
import { Calendar, Target, Brain, CheckCircle2, XCircle, AlertTriangle, Layers, Loader2 } from 'lucide-react';

export default function EntryHistory() {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [entries, setEntries] = useState<PerformanceEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const data = await getEntries(userId!);
        setEntries(data.sort((a, b) => b.date.localeCompare(a.date)));
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="tracker-card text-center py-8">
        <p className="text-sm text-muted-foreground">{t('No entries recorded yet.')}</p>
      </div>
    );
  }

  const getDepthLabel = (depth: string) => {
    const found = DEPTH_OPTIONS.find(d => d.value === depth);
    return found ? found.label : depth;
  };

  const getDepthDescription = (depth: string) => {
    const found = DEPTH_OPTIONS.find(d => d.value === depth);
    return found ? found.description : '';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.date} className="tracker-card space-y-4 animate-fade-in">
          {/* Date header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">{formatDate(entry.date)}</span>
          </div>

          {/* Scores row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50">
              <Target className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{t('Execution Score')}</p>
                <p className="text-lg font-bold text-foreground">{entry.execution_score}<span className="text-xs text-muted-foreground">/10</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50">
              <Brain className="w-4 h-4 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">{t('Mental Clarity')}</p>
                <p className="text-lg font-bold text-foreground">{entry.mental_clarity}<span className="text-xs text-muted-foreground">/10</span></p>
              </div>
            </div>
          </div>

          {/* Details row */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {/* Priority */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                entry.priority_completed 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {entry.priority_completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>
                  <span className="text-muted-foreground font-normal">{t('Top Priority:')}</span>{' '}
                  {entry.priority_completed ? t('Completed') : t('Not Completed')}
                </span>
              </div>

              {entry.priority_completion_text && (
                <div className="w-full mt-1.5 p-3 rounded-xl bg-primary/5 border border-primary/10 animate-fade-in">
                  <p className="text-xs font-semibold text-primary/80 mb-1">{t('Success Reflection:')}</p>
                  <p className="text-sm font-medium text-foreground italic">"{entry.priority_completion_text}"</p>
                </div>
              )}

              {/* Blocker */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-warning/10 text-[hsl(var(--warning))]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>
                  <span className="text-muted-foreground font-normal">{t('Blocker:')}</span>{' '}
                  {t(entry.primary_blocker)}{entry.custom_blocker_text ? ` â€” ${entry.custom_blocker_text}` : ''}
                </span>
              </div>

              {/* Depth */}
              {entry.productivity_depth && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/10 text-accent">
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    <span className="text-muted-foreground font-normal">{t('Work Depth:')}</span>{' '}
                    {entry.productivity_depth === 'custom' 
                      ? entry.custom_work_depth_text 
                      : `${t(getDepthLabel(entry.productivity_depth))} â€” ${t(getDepthDescription(entry.productivity_depth))}`
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

