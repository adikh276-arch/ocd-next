import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedSessions, SessionData } from "@/app/uncertainity_tolerance/_src/hooks/useActivitySession";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from "react-i18next";

interface Props {
  onBack: () => void;
}

const ProgressDashboard = ({ onBack }: Props) => {
    const { t } = useTranslation("uncertainity_tolerance");
      const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getSavedSessions().then(data => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const chartData = sessions.map(s => ({
    date: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    before: s.discomfortBefore,
    after: s.discomfortAfter,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen px-6 pt-8 pb-8"
    >
      <div className="flex-1 space-y-8 overflow-y-auto">
        <h1 className="text-xl font-bold text-foreground text-center">
          {t("my_uncertainty_journey")}</h1>

        {/* Sessions count */}
        <div className="text-center space-y-2">
          <p className="text-5xl font-bold text-primary">{sessions.length}</p>
          <p className="text-lg font-semibold text-foreground">
            🔥 {sessions.length} {t("session")}{sessions.length !== 1 ? 's' : ''} {t("completed")}</p>
          <p className="text-sm text-muted-foreground">
            {t("every_session_is_your_brain_ge")}</p>
        </div>

        {/* Chart */}
        {sessions.length >= 2 && (
          <div className="space-y-3">
            <p className="text-sm text-foreground font-medium text-center">
              {t("how_your_discomfort_shifted_ov")}</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                    width={24}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="before"
                    stroke="hsl(var(--peach-dark))"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: 'hsl(var(--peach-dark))' }}
                    name="Before"
                  />
                  <Line
                    type="monotone"
                    dataKey="after"
                    stroke="hsl(var(--sage))"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: 'hsl(var(--sage))' }}
                    name="After"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Past entries */}
        {sessions.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-foreground font-medium text-center">
              {t("your_previous_sessions")}</p>
            {[...sessions].reverse().map(s => (
              <button
                key={s.id}
                onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                className="pill-card w-full text-left space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    📅 {new Date(s.date).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    📊 {s.discomfortBefore} → {s.discomfortAfter}
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  💭 {s.uncertaintyText || '—'}
                </p>
                <AnimatePresence>
                  {expandedId === s.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-1 pt-2"
                    >
                      <p className="text-xs text-muted-foreground">
                        {t("timer")}{s.timerDuration} {t("min")}</p>
                      {s.statementsChecked.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          ✓ {s.statementsChecked.join(', ')}
                        </p>
                      )}
                      {s.reflectionNote && (
                        <p className="text-xs text-muted-foreground">
                          📝 {s.reflectionNote}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        )}

        {sessions.length === 0 && (
          <p className="text-center text-muted-foreground text-sm italic">
            {t("complete_your_first_session_to")}</p>
        )}
      </div>

      <button onClick={onBack} className="btn-primary-activity mt-4">
        {t("back")}</button>
    </motion.div>
  );
};

export default ProgressDashboard;
