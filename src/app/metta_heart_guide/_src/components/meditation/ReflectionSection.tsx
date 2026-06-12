import { motion } from "framer-motion";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { useTranslation } from "react-i18next";

const ReflectionSection = () => {
    const { t } = useTranslation("metta_heart_guide");
      return (
        <section className="py-20 md:py-28 gradient-hero relative overflow-hidden flex flex-col items-center justify-center">
          {/* Decorative background atoms */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-warmth/5 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-md mx-auto text-center">
              <StandardFinishCard 
                emoji="💖"
                title={t("carry_kindness_with_you")}
                description={t("youve_practiced_sending_kindness_to_yourself_loved")}
                onStartOver={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                startOverText={t("read_again")}
              />
            </div>
          </div>
        </section>
      );
};

export default ReflectionSection;
