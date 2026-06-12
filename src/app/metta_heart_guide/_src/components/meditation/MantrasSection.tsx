// @ts-nocheck
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const mantras = [
  {
    phrase: "May I be safe and protected from harm.",
    meaning: "A wish for physical and emotional security",
  },
  {
    phrase: "May I be healthy and strong.",
    meaning: "Embracing wellness of body and mind",
  },
  {
    phrase: "May I live with ease and happiness.",
    meaning: "Freedom from struggle and suffering",
  },
  {
    phrase: "May I know peace.",
    meaning: "Deep inner tranquility and acceptance",
  },
];

const MantrasSection = () => {
    const { t } = useTranslation("metta_heart_guide");
      return (
        <section className="py-20 md:py-28 bg-calm">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary font-medium tracking-wide uppercase text-sm mb-4">
                {t("sacred_phrases")}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                {t("loving_kindness_mantras")}</h2>
              <p className="text-muted-foreground text-lg">
                {t("these_gentle_phrases_are_the_h")}</p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {mantras.map((mantra, index) => (
                <motion.div
                  key={mantra.phrase}
                  className="bg-card rounded-2xl p-6 md:p-8 shadow-soft relative overflow-hidden"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                  
                  <p className="font-serif text-xl md:text-2xl text-foreground mb-3 italic">
                    "{mantra.phrase}"
                  </p>
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">
                    {mantra.meaning}
                  </p>

                  {/* Decorative gradient bar */}
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-warmth"
                    style={{ width: `${25 + index * 25}%` }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-muted-foreground italic">
                {t("adapt_these_phrases_to_words_t")}</p>
            </motion.div>
          </div>
        </section>
      );
};

export default MantrasSection;
