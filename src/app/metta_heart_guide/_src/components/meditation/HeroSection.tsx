// @ts-nocheck
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
    const { t } = useTranslation("metta_heart_guide");
      return (
        <section className="relative min-h-[85vh] gradient-hero flex items-center justify-center overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
              animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full bg-accent/5 blur-3xl"
              animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/3 right-[25%] w-40 h-40 rounded-full bg-warmth/5 blur-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Heart icon with breathing animation */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-8"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 text-accent" fill="currentColor" />
              </motion.div>

              <motion.span
                className="inline-block text-primary font-medium tracking-wide uppercase text-sm mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t("guided_meditation_practice")}</motion.span>

              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t("loving_kindness")}<span className="block text-gradient-primary">{t("meditation")}</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t("also_known_as")}<em className="text-foreground">{t("metta")}</em> {t("meditation_this_ancient_practi")}</motion.p>

              <motion.div
                className="flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[t("reduce_stress"), t("self-compassion"), t("inner_peace"), t("emotional_balance")].map((tag, index) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>
      );
};

export default HeroSection;
