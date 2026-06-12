"use client";
import { useMemo, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, CartesianGrid } from 'recharts';
import { TrendingUp, Brain, Shield, BarChart3, Loader2 } from 'lucide-react';
import { getLast7Days, getLast14Days, getConsistencyZone, PerformanceEntry } from '@/lib/tracker-data';
import { useTranslation } from '@/lib/translation';
import { useAuth } from '@/lib/auth';

export default function PerformanceInsights() {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [last7, setLast7] = useState<PerformanceEntry[]>([]);
  const [last14, setLast14] = useState<PerformanceEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [d7, d14] = await Promise.all([getLast7Days(userId!), getLast14Days(userId!)]);
        setLast7(d7);
        setLast14(d14);
      } catch (error) {
        console.error('Failed to fetch insights data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const trendData = useMemo(() => {
    return last7.map(e => ({
      date: new Date(e.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      score: e.execution_score,
    }));
  }, [last7]);

  const blockerData = useMemo(() => {
    const counts: Record<string, number> = {};
    last14.forEach(e => {
      counts[e.primary_blocker] = (counts[e.primary_blocker] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [last14]);

  const consistency = useMemo(() => {
    if (last7.length < 3) return null;
    const avg = last7.reduce((s, e) => s + e.execution_score, 0) / last7.length;
    return { avg: Math.round(avg * 10) / 10, ...getConsistencyZone(avg) };
  }, [last7]);

  const correlation = useMemo(() => {
    if (last7.length < 2) return null;
    const highClarity = last7.filter(e => e.mental_clarity >= 7);
    const lowClarity = last7.filter(e => e.mental_clarity < 7);
    if (highClarity.length === 0 || lowClarity.length === 0) return null;
    const highAvg = highClarity.reduce((s, e) => s + e.execution_score, 0) / highClarity.length;
    const lowAvg = lowClarity.reduce((s, e) => s + e.execution_score, 0) / lowClarity.length;
    const improvement = Math.round(((highAvg - lowAvg) / lowAvg) * 100);
    return improvement > 0 ? improvement : null;
  }, [last7]);

  const totalEntries = last14.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (totalEntries < 3) {
    return (
      <div className="stat-card text-center py-12">
        <div className="section-icon section-icon-primary mx-auto w-fit p-3 mb-4">
          <BarChart3 className="w-7 h-7 text-primary-foreground" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          {t('Log at least 3 days to see performance insights.')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 7-Day Trend */}
      <div className="stat-card">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="section-icon section-icon-primary">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="text-sm font-bold text-foreground">{t('7-Day Execution Trend')}</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(158 64% 42%)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(158 64% 42%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 16% 92%)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              width={24}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(0 0% 100%)',
                border: '1px solid hsl(220 16% 90%)',
                borderRadius: '12px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(220 9% 46%)' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(158 64% 42%)"
              strokeWidth={3}
              fill="url(#scoreGradient)"
              dot={{ fill: 'hsl(158 64% 42%)', r: 5, strokeWidth: 3, stroke: '#fff' }}
              activeDot={{ r: 7, fill: 'hsl(158 64% 42%)', stroke: '#fff', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation + Consistency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {correlation && (
          <div className="stat-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="section-icon section-icon-accent">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{t('Focus Ã— Execution')}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('On days your Mental Clarity is above 7, your Execution improves by')}{' '}
              <span className="font-mono font-extrabold text-primary text-lg">{correlation}%</span>.
            </p>
          </div>
        )}

        {consistency && (
          <div className="stat-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="section-icon section-icon-warning">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{t('Consistency Score')}</h3>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-4xl font-extrabold text-foreground">{consistency.avg}</span>
              <span className="text-sm text-muted-foreground font-mono">/10</span>
            </div>
            <p className={`text-xs font-bold mt-2 ${
              consistency.zone === 'high' ? 'zone-high' :
              consistency.zone === 'moderate' ? 'zone-moderate' : 'zone-low'
            }`}>
              {consistency.label}
            </p>
          </div>
        )}
      </div>

      {/* Blocker Frequency */}
      {blockerData.length > 0 && (
        <div className="stat-card">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="section-icon section-icon-warning">
              <BarChart3 className="w-4 h-4 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-bold text-foreground">{t('Blocker Frequency (14 Days)')}</h3>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={blockerData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: 'hsl(220 9% 46%)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Bar dataKey="count" radius={[0, 10, 10, 0]} maxBarSize={22}>
                {blockerData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? 'hsl(35 92% 55%)' : 'hsl(220 16% 88%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

