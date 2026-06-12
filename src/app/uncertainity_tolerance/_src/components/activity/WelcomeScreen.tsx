import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

interface Props {
  onBegin: () => void;
  onBack: () => void;
}

const WelcomeScreen = ({ onBegin, onBack }: Props) => {
    const { t } = useTranslation("uncertainity_tolerance");
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col min-h-screen px-6 pt-6 pb-8"
        >
          <button
            onClick={onBack}
            className="self-start text-muted-foreground text-xl mb-8 hover:text-foreground transition-colors"
          >
            ←
          </button>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {t("uncertainty_tolerance_exercise")}</h1>

            <p className="text-lg text-muted-foreground italic leading-relaxed max-w-[300px]">
              {t("not_knowing_feels_unbearable_b")}</p>

            <p className="text-sm text-muted-foreground">
              {t("this_will_take_about_3_minutes")}</p>
          </div>

          <button onClick={onBegin} className="btn-primary-activity">
            {t("begin")}</button>
        </motion.div>
      );
};

export default WelcomeScreen;
