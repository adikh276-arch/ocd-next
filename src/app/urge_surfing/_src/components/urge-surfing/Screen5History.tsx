import { useEffect, useState } from "react";

import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface UrgeSession {
  id: string;
  created_at: string;
  completed: boolean;
  body_location?: string;
  sensation_description?: string;
  reflection_note?: string;
}

const fetchSessions = async (): Promise<UrgeSession[]> => {
    const { t } = useTranslation("urge_surfing");
      return [];
};

interface Props {
  onBack: () => void;
}

const Screen5History = ({ onBack }: Props) => {
    const { t } = useTranslation("urge_surfing");
      const [sessions, setSessions] = useState<UrgeSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions()
      .then((data) => setSessions(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="pt-4 px-6 flex items-center justify-between">
        <button onClick={onBack} className="text-muted-foreground active:scale-95 transition-transform p-1">
          <ArrowLeft size={20} />
        </button>
        <span className="text-[11px] text-hint tracking-[0.06em]">{t("screen5header_label")}</span>
        <span className="text-[11px] text-primary font-medium">{t("screen5sessions_count")}</span>
      </div>

      <div className="px-6 pt-4">
        <h2 className="text-[20px] font-medium text-foreground text-center mb-4">{t("screen5title")}</h2>
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-8">
        {loading ? (
          <div className="flex justify-center pt-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center pt-20">
            <p className="text-[13px] text-hint italic text-center leading-relaxed whitespace-pre-line">
              {t("screen5empty_message")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-surface border border-border rounded-xl p-3"
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] text-hint">
                    {new Date(s.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(s.created_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                  {s.completed ? (
                    <span className="text-[10px] bg-accent text-secondary-foreground px-2 py-0.5 rounded-full">
                      {t("screen5completed")}</span>
                  ) : (
                    <span className="text-[10px] bg-surface border border-border text-hint px-2 py-0.5 rounded-full">
                      {t("screen5partial")}</span>
                  )}
                </div>
                {s.body_location && (
                  <p className="text-[12px] font-medium text-foreground capitalize">{s.body_location}</p>
                )}
                {s.sensation_description && (
                  <p className="text-[11px] text-muted-foreground italic mt-0.5">{s.sensation_description}</p>
                )}
                {s.reflection_note && (
                  <p className="text-[10px] text-hint mt-1">{s.reflection_note}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen5History;
