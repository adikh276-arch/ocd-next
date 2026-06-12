// @ts-nocheck
import { useState } from 'react';
import { getWeekEntries } from '../lib/storage';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";

interface InsightsProps {
  onBack: () => void;
}

export default function Insights({ onBack }: InsightsProps) {
    const { t } = useTranslation("ocd_moments");
    const periods = [
      { label: t("this_week"), weeksAgo: 0 },
      { label: t("last_week"), weeksAgo: 1 },
      { label: t("2_weeks_ago"), weeksAgo: 2 },
    ];
      
      const [periodIndex, setPeriodIndex] = useState(0);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: [t("weekentries"), periods[periodIndex].weeksAgo],
    queryFn: () => getWeekEntries(periods[periodIndex].weeksAgo)
  });

  const acted = entries.filter(e => e.response === 'acted').length;
  const waited = entries.filter(e => e.response === 'waited').length;
  const resisted = entries.filter(e => e.response === 'resisted').length;
  const total = entries.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-8 pb-20 max-w-4xl mx-auto"
    >
      <header className="flex flex-col gap-1">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-[10px] font-bold uppercase tracking-[0.2em] bg-white w-fit px-4 py-2 rounded-xl border border-border/50 shadow-sm"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("back_to_journal")}</button>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none mb-2 font-heading">
          {t("discovery")}<span className="text-blue-600">{t("analytics")}</span>
        </h1>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-60">{t("your_growth_trends")}</p>
      </header>

      {/* Period Selector Tabs */}
      <div className="flex gap-1 p-1 bg-slate-200/50 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-sm max-w-md mx-auto w-full">
        {periods.map((p, i) => (
          <button
            key={i}
            onClick={() => setPeriodIndex(i)}
            className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${i === periodIndex
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {total === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-therapeutic p-12 text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-[28px] bg-slate-100 flex items-center justify-center mb-6">
              <BarChart3 className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <p className="text-xl font-bold text-foreground mb-2 font-heading">{t("waiting_for_data")}</p>
            <p className="text-[13px] text-muted-foreground font-medium leading-relaxed max-w-[240px]">
              {t("log_entries_during_this_period_to_see_your_progres")}</p>
          </motion.div>
        ) : (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Stats Card */}
            <div className="card-therapeutic p-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground/60 mb-2">
                    <TrendingUp size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{t("total_flow")}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground tracking-tight tabular-nums font-heading">
                    {total} <span className="text-xs font-bold text-muted-foreground/40 tracking-widest uppercase">{t("entries")}</span>
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              <div className="space-y-6">
                <BarRow label={t("resisted")} count={resisted} total={total} color="bg-emerald-500" />
                <BarRow label={t("delayed")} count={waited} total={total} color="bg-amber-500" />
                <BarRow label={t("acted")} count={acted} total={total} color="bg-rose-500" />
              </div>
            </div>

            {/* Performance Prediction Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary rounded-[32px] p-8 shadow-xl shadow-primary/20 relative overflow-hidden"
            >
               <DiscoveryIcon className="absolute -top-4 -right-4 w-32 h-32 text-white opacity-5" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">{t("discovery_insight")}</span>
              </div>
              
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90 relative z-10">
                 {resisted >= acted ? "Resilience Growth" : "Observation Phase"}
              </h4>

              <p className="font-heading text-lg font-medium leading-relaxed italic mb-8 text-white relative z-10">
                {resisted > acted
                  ? "You noticed urges without acting more often than you acted on them. That is proof of strength."
                  : acted > resisted
                    ? "You acted on urges more often this period. This is simply a phase—awareness is your first step."
                    : "Your responses were evenly balanced. You are finding your middle ground."}
              </p>

              <div className="flex justify-between items-center py-4 border-t border-white/10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 relative z-10">
                 <span>{t("strategy_consistency")}</span>
                 <span className="text-white/80 font-mono">{Math.round((resisted/total)*100)}{t("_resilience_rate")}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BarRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
    const { t } = useTranslation("ocd_moments");
      const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{label}</span>
        <span className="text-[9px] font-bold text-muted-foreground/50 tracking-widest uppercase">{count} {count === 1 ? 'MOMENT' : 'MOMENTS'}</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex items-center px-0.5 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, 4)}%` }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className={`h-2 rounded-full ${color} shadow-sm`}
        />
      </div>
    </div>
  );
}

const DiscoveryIcon = ({ className }: { className?: string }) => (
  <TrendingUp className={className} />
);
