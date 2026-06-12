import { LadderStep } from "./LadderBuilder";
import { DayLog } from "@/app/fear_ladder/_src/hooks/useFearLadderStorage";
import { Calendar, Leaf } from "lucide-react";

interface TodaysPracticeProps {
  currentDay: number;
  todayStep: LadderStep | null;
  todayLog: DayLog | undefined;
  onLogSave: (log: DayLog) => void;
}

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const TodaysPractice = ({
  currentDay,
  todayStep,
  todayLog,
  onLogSave,
}: TodaysPracticeProps) => {
    const { t } = useTranslation("fear_ladder");
      const [anxietyBefore, setAnxietyBefore] = useState(todayLog?.anxietyBefore ?? 50);
  const [anxietyAfter, setAnxietyAfter] = useState(todayLog?.anxietyAfter ?? 50);
  const [notes, setNotes] = useState(todayLog?.notes ?? "");

  useEffect(() => {
    if (todayLog) {
      setAnxietyBefore(todayLog.anxietyBefore);
      setAnxietyAfter(todayLog.anxietyAfter);
      setNotes(todayLog.notes);
    }
  }, [todayLog]);

  // Day 1: disclaimer
  if (currentDay <= 1 || !todayStep) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-serif font-semibold text-foreground">{t("today_s_practice")}</h2>
        <div className="bg-therapy-glow border border-primary/20 rounded-xl p-6 text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-base font-serif font-medium text-foreground">
            {t("today_is_for_preparation")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {t("take_your_time_building_your_f")}<br />
            {t("your_exposure_practice_will_be")}<span className="font-medium text-foreground">{t("day_2")}</span>{t("where_you_ll_work_through_your")}</p>
          <p className="text-xs text-muted-foreground/70 italic">
            {t("setting_up_thoughtfully_is_its")}</p>
        </div>
      </section>
    );
  }

  const handleSave = () => {
    onLogSave({
      day: currentDay,
      stepId: todayStep.id,
      anxietyBefore,
      anxietyAfter,
      notes,
      completedAt: new Date().toISOString(),
    });
  };

  const isCompleted = !!todayLog;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-serif font-semibold text-foreground">{t("today_s_practice")}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("here_s_your_step_for_today_tak")}</p>

      <div className="bg-card border border-border rounded-xl p-5 space-y-5 shadow-sm">
        {/* Assigned step */}
        <div className="bg-therapy-glow border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-wide">{t("day")}{currentDay} {t("step")}</p>
              <p className="text-sm font-medium text-foreground mt-1">{todayStep.situation}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t("anxiety_level")}{todayStep.anxiety}</p>
            </div>
          </div>
        </div>

        {/* Anxiety Before */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t("anxiety_before")}<span className="text-muted-foreground font-normal">({anxietyBefore})</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={anxietyBefore}
            onChange={(e) => setAnxietyBefore(Number(e.target.value))}
            className="w-full h-1.5 accent-primary cursor-pointer"
          />
        </div>

        {/* Anxiety After */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t("anxiety_after")}<span className="text-muted-foreground font-normal">({anxietyAfter})</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={anxietyAfter}
            onChange={(e) => setAnxietyAfter(Number(e.target.value))}
            className="w-full h-1.5 accent-primary cursor-pointer"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t("notes")}<span className="text-muted-foreground font-normal">{t("optional")}</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("how_did_it_go_what_did_you_not")}
            rows={3}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
            maxLength={500}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isCompleted
              ? "bg-therapy-progress-done text-primary-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isCompleted ? "✓ Practice Logged — Update" : "Log Today's Practice"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground/70 italic text-center">
        {t("progress_happens_through_repet")}</p>
    </section>
  );
};

export default TodaysPractice;
