import { useState } from 'react';
import { motion } from 'framer-motion';
import DiscomfortScale from './DiscomfortScale';
import { useTranslation } from "react-i18next";

interface Props {
  uncertaintyText: string;
  discomfortBefore: number | null;
  onUpdate: (data: { uncertaintyText?: string; discomfortBefore?: number }) => void;
  onNext: () => void;
}

const NameUncertaintyScreen = ({ uncertaintyText, discomfortBefore, onUpdate, onNext }: Props) => {
    const { t } = useTranslation("uncertainity_tolerance");
      const [text, setText] = useState(uncertaintyText);
  const canProceed = text.trim().length > 0 && discomfortBefore !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen px-6 pt-8 pb-8"
    >
      <div className="flex-1 space-y-6">
        <h1 className="text-xl font-bold text-foreground text-center">
          {t("what_is_the_i_don_t_know_today")}</h1>

        <textarea
          value={text}
          onChange={e => {
            setText(e.target.value);
            onUpdate({ uncertaintyText: e.target.value });
          }}
          placeholder={t("write_the_uncertainty_that_s_b")}
          className="w-full rounded-2xl p-4 bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          rows={3}
        />

        <p className="text-center text-foreground font-medium">
          {t("how_uncomfortable_does_it_feel")}</p>

        <DiscomfortScale
          score={discomfortBefore}
          onSelect={n => onUpdate({ discomfortBefore: n })}
        />

        <p className="text-xs text-muted-foreground text-center">
          {t("your_responses_are_saved_priva")}</p>
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`btn-primary-activity ${!canProceed ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {t("this_is_where_i_am")}</button>
    </motion.div>
  );
};

export default NameUncertaintyScreen;
