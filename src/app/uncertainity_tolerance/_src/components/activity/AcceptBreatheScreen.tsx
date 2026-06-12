import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const BREATH_IN = 4000;
const HOLD = 2000;
const BREATH_OUT = 4000;
const TOTAL = BREATH_IN + HOLD + BREATH_OUT;

const AcceptBreatheScreen = ({ onNext }: Props) => {
    const { t } = useTranslation("uncertainity_tolerance");
      const [breathPhase, setBreathPhase] = useState<'idle' | 'in' | 'hold' | 'out' | 'done'>('idle');
  const [started, setStarted] = useState(false);

  const startBreathing = useCallback(() => {
    setStarted(true);
    setBreathPhase('in');

    setTimeout(() => setBreathPhase('hold'), BREATH_IN);
    setTimeout(() => setBreathPhase('out'), BREATH_IN + HOLD);
    setTimeout(() => setBreathPhase('done'), TOTAL);
  }, []);

  useEffect(() => {
    if (!started) {
      const t = setTimeout(startBreathing, 1500);
      return () => clearTimeout(t);
    }
  }, [started, startBreathing]);

  const circleScale = breathPhase === 'in' || breathPhase === 'hold' ? 1.4 : breathPhase === 'out' ? 1 : 1;
  const phaseText = breathPhase === 'in' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : breathPhase === 'out' ? 'Breathe Out' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen px-6 pt-8 pb-8"
    >
      <div className="flex-1 flex flex-col items-center space-y-6">
        <h1 className="text-xl font-bold text-foreground text-center">
          {t("say_this_and_mean_it_even_just")}</h1>

        <div className="quote-card-bg rounded-2xl p-6 text-center">
          <p className="text-lg font-medium text-foreground leading-relaxed italic">
            {t("i_don_t_know_for_certain_and_r")}</p>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {t("read_it_slowly_repeat_it_if_yo")}</p>

        <div className="w-16 h-px bg-border" />

        <p className="text-sm text-foreground text-center font-medium">
          {t("now_take_one_slow_breath_with")}</p>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{
              scale: circleScale,
            }}
            transition={{
              duration: breathPhase === 'in' ? 4 : breathPhase === 'hold' ? 0.3 : breathPhase === 'out' ? 4 : 0.5,
              ease: 'easeInOut',
            }}
            className="w-36 h-36 rounded-full breathing-circle-gradient flex items-center justify-center border-2 border-primary/20"
          >
            <AnimatePresence mode="wait">
              {phaseText && (
                <motion.span
                  key={phaseText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-foreground font-semibold text-base"
                >
                  {phaseText}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {breathPhase === 'done' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onNext}
            className="btn-primary-activity"
          >
            {t("i_m_ready")}</motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AcceptBreatheScreen;
