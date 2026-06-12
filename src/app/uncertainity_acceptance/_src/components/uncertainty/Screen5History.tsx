import React from "react";
import { useTranslation } from "react-i18next";

export interface Session {
  date: Date;
  doubt: string;
  statement: string;
  reflection?: string;
}

interface Screen5Props {
  sessions: Session[];
  onBack: () => void;
}

function getDateLabel(date: Date): { label: string; emoji: string } {
    const { t } = useTranslation("uncertainity_acceptance");
      const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sessionDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((today.getTime() - sessionDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { label: "TODAY", emoji: "🟢" };
  if (diffDays === 1) return { label: "YESTERDAY", emoji: "🌙" };
  return { label: `${diffDays} DAYS AGO`, emoji: "🌙" };
}

function formatDate(date: Date): string {
    const { t } = useTranslation("uncertainity_acceptance");
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const Screen5History: React.FC<Screen5Props> = ({ sessions, onBack }) => {
    const { t } = useTranslation("uncertainity_acceptance");
      const sorted = [...sessions].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen bg-light-sand px-5 py-6 pb-10">
      {/* Back */}
      <button onClick={onBack} className="text-warm-brown text-lg font-heading fade-up stagger-1">←</button>

      <p className="screen-label text-golden-muted mt-4 fade-up stagger-1">{t("my_history")}</p>

      <h1 className="font-heading text-[18px] font-medium text-foreground mt-3 fade-up stagger-2">
        {t("sessions_so_far")}</h1>
      <p className="font-body text-[11px] text-golden-muted mt-1 fade-up stagger-2">
        {t("every_time_you_sat_with_uncert")}</p>

      {/* Sessions */}
      <div className="mt-5 space-y-3">
        {sorted.length === 0 && (
          <p className="font-body text-[12px] text-golden-muted text-center mt-8 fade-up stagger-3">
            {t("no_sessions_yet_begin_your_fir")}</p>
        )}
        {sorted.map((session, i) => {
          const { label, emoji } = getDateLabel(session.date);
          return (
            <div
              key={i}
              className="rounded-[12px] bg-text-input-bg border border-card-warm-border p-4 fade-up"
              style={{ animationDelay: `${0.4 + i * 0.15}s` }}
            >
              <div className="flex items-center justify-between">
                <p className="font-body text-[10px] text-foreground">{emoji} {label}</p>
                <p className="font-body text-[10px] text-golden-muted">{formatDate(session.date)}</p>
              </div>
              <p className="font-heading italic text-[12px] text-foreground leading-[1.7] mt-2">{session.doubt}</p>
              <p className="font-body text-[11px] text-golden-muted mt-1">{session.statement}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {sorted.length > 0 && (
        <p className="font-heading italic text-[12px] text-golden-muted text-center mt-6 fade-up stagger-5">
          🏅 {sorted.length} {t("session")}{sorted.length !== 1 ? "s" : ""} {t("completed")}</p>
      )}
    </div>
  );
};

export default Screen5History;
