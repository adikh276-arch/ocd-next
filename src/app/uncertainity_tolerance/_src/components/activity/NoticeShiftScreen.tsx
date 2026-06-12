import { useState } from 'react';
import { motion } from 'framer-motion';
import DiscomfortScale from './DiscomfortScale';
import { useTranslation } from "react-i18next";

interface Props {
  discomfortBefore: number | null;
  discomfortAfter: number | null;
  statementsChecked: string[];
  reflectionNote: string;
  onUpdate: (data: Partial<{
    discomfortAfter: number;
    statementsChecked: string[];
    reflectionNote: string;
  }>) => void;
  onComplete: () => void;
  onViewProgress: () => void;
}

const NoticeShiftScreen = ({
  discomfortBefore,
  discomfortAfter,
  statementsChecked,
  reflectionNote,
  onUpdate,
  onComplete,
  onViewProgress,
}: Props) => {
    const { t } = useTranslation("uncertainity_tolerance");
    const STATEMENTS = [
      { id: 'survived', emoji: '💙', text: t("i_sat_with_uncertainty_and_i_survived") },
      { id: 'passed', emoji: '🌊', text: t("the_feeling_was_uncomfortable_but_it_passed") },
      { id: 'okay', emoji: '💪', text: t("i_didnt_check__and_i_am_okay") },
    ];
      
      const [note, setNote] = useState(reflectionNote);

  const shiftMessage = () => {
    if (discomfortAfter === null || discomfortBefore === null) return null;
    if (discomfortAfter < discomfortBefore) {
      return "📉 That's a shift. Your brain is learning something new.";
    }
    if (discomfortAfter === discomfortBefore) {
      return "💙 Staying steady is still progress. You showed up.";
    }
    return "That's okay — sitting with uncertainty is hard. You still did it.";
  };

  const toggleStatement = (id: string) => {
    const next = statementsChecked.includes(id)
      ? statementsChecked.filter(s => s !== id)
      : [...statementsChecked, id];
    onUpdate({ statementsChecked: next });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen px-6 pt-8 pb-8"
    >
      <div className="flex-1 space-y-6 overflow-y-auto">
        <h1 className="text-xl font-bold text-foreground text-center">
          {t("how_do_you_feel_now")}</h1>

        <p className="text-center text-muted-foreground">
          {t("rate_your_discomfort_again")}</p>

        <DiscomfortScale
          score={discomfortAfter}
          onSelect={n => onUpdate({ discomfortAfter: n })}
        />

        {shiftMessage() && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-foreground font-medium text-sm"
          >
            {shiftMessage()}
          </motion.p>
        )}

        <div className="w-full h-px bg-border" />

        <p className="text-center text-foreground font-medium">
          {t("tap_anything_that_feels_true_r")}</p>

        <div className="space-y-3">
          {STATEMENTS.map(st => (
            <button
              key={st.id}
              onClick={() => toggleStatement(st.id)}
              className={`pill-card w-full text-left flex items-center gap-3 ${
                statementsChecked.includes(st.id) ? 'pill-card-selected' : ''
              }`}
            >
              <span className="text-xl">{st.emoji}</span>
              <span className="flex-1 text-sm font-medium">{st.text}</span>
              {statementsChecked.includes(st.id) && (
                <span className="text-primary font-bold">✓</span>
              )}
            </button>
          ))}
        </div>

        <div>
          <label className="text-sm text-muted-foreground block mb-2">
            {t("any_thoughts_you_want_to_save")}</label>
          <textarea
            value={note}
            onChange={e => {
              setNote(e.target.value);
              onUpdate({ reflectionNote: e.target.value });
            }}
            placeholder={t("write_here_optional")}
            className="w-full rounded-2xl p-4 bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <button onClick={onViewProgress} className="btn-secondary-activity">
          {t("view_my_progress")}</button>
        <button
          onClick={onComplete}
          disabled={discomfortAfter === null}
          className={`btn-primary-activity ${discomfortAfter === null ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {t("complete")}</button>
      </div>
    </motion.div>
  );
};

export default NoticeShiftScreen;
