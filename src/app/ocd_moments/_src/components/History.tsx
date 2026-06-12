// @ts-nocheck
import { useState } from 'react';
import { getEntriesGroupedByDay, LogEntry } from '../lib/storage';
import { ChevronLeft, ChevronRight, Zap, Clock, Shield, MapPin, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";

const locationLabels: Record<string, string> = { 
  home: 'home', 
  work: 'work', 
  social: 'social', 
  other: 'other' 
};

export default function History({ onBack }: { onBack: () => void }) {
    const { t, i18n } = useTranslation("ocd_moments");
    const responseConfig: Record<string, { label: string, icon: any, color: string, lightBg: string, text: string, border: string }> = {
      acted: { label: t("acted"), icon: Zap, color: 'bg-rose-500', lightBg: 'bg-rose-100', text: t("text-rose-700"), border: 'border-rose-200' },
      waited: { label: t("delayed"), icon: Clock, color: 'bg-amber-500', lightBg: 'bg-amber-100', text: t("text-amber-700"), border: 'border-amber-200' },
      resisted: { label: t("resisted"), icon: Shield, color: 'bg-emerald-500', lightBg: 'bg-emerald-100', text: t("text-emerald-700"), border: 'border-emerald-200' },
    };
      
    const { data: grouped, isLoading } = useQuery({
      queryKey: [t("entriesgroupedbyday")],
      queryFn: getEntriesGroupedByDay,
      initialData: {}
    });

  const days = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const [dayIndex, setDayIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <div className="w-20 h-20 rounded-[2.5rem] bg-secondary/50 flex items-center justify-center mb-6 shadow-inner">
          <Clock className="w-10 h-10 text-muted-foreground/30" />
        </div>
        <p className="font-heading text-xl font-bold text-muted-foreground/50">{t("no_entries_yet")}</p>
        <p className="text-[10px] text-muted-foreground/40 mt-1 uppercase tracking-widest font-bold">{t("start_tracking_today")}</p>
      </motion.div>
    );
  }

  const currentDay = days[dayIndex];
  const entries = grouped[currentDay] || [];

  let dateLabel = currentDay;
  try {
    const lang = i18n.language || "en";
    dateLabel = new Date(currentDay + 'T00:00:00').toLocaleDateString(lang, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
  } catch (e) {
    console.error("Invalid date", currentDay);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 pb-12"
    >
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">{t("your_journey")}</h1>
        <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase opacity-60">{t("a_record_of_your_resilience")}</p>
      </header>

      {/* Day Selector */}
      <div className="flex items-center justify-between bg-white border border-border/50 rounded-3xl p-2 shadow-sm">
        <button
          onClick={() => setDayIndex(i => Math.min(i + 1, days.length - 1))}
          disabled={dayIndex >= days.length - 1}
          className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-secondary disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex flex-col items-center gap-0.5 px-4 text-center">
          <div className="flex items-center gap-1.5 text-muted-foreground/40">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{t("journal_date")}</span>
          </div>
          <p className="font-heading text-sm font-bold text-foreground">{dateLabel}</p>
        </div>

        <button
          onClick={() => setDayIndex(i => Math.max(i - 1, 0))}
          disabled={dayIndex <= 0}
          className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-secondary disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Entries List */}
      <div className="grid gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3"
          >
            {entries.map((entry) => (
              <div
                key={entry.id}
                className={`bg-white border ${responseConfig[entry.response]?.border || 'border-border/50'} p-6 rounded-[28px] flex flex-col gap-4 shadow-sm transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 bg-secondary/80 rounded-full">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                      {entry.location === 'other' ? (entry.customLocation || t('other')) : t(locationLabels[entry.location])}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground/50 tabular-nums">
                    {format(new Date(entry.timestamp), 'h:mm a')}
                  </span>
                </div>

                <p className="text-sm text-foreground font-medium leading-relaxed italic">
                  "{entry.urge}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                  <div className={`w-2 h-2 rounded-full ${responseConfig[entry.response]?.color || 'bg-muted'}`} />
                  <span className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">
                    {responseConfig[entry.response]?.label || entry.response}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
