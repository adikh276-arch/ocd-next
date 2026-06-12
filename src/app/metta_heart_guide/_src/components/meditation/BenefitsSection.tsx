// @ts-nocheck
import { motion } from "framer-motion";
import { Brain, Heart, Sparkles, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
const BenefitsSection = () => {
    const { t } = useTranslation("metta_heart_guide");
    const benefits = [
      {
        icon: Brain,
        title: t("calms_the_mind"),
        description: t("quiets_racing_thoughts_and_mental_chatter_creating_space_for"),
      },
      {
        icon: Shield,
        title: t("reduces_worry"),
        description: t("eases_anxiety_and_stress_by_shifting_focus_from_fear_to_warm"),
      },
      {
        icon: Heart,
        title: t("builds_self-compassion"),
        description: t("replaces_self-criticism_with_kindness_nurturing_a_healthier_"),
      },
      {
        icon: Sparkles,
        title: t("emotional_balance"),
        description: t("cultivates_resilience_and_steadiness_helping_you_navigate_li"),
      },
    ];
      
      return (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary font-medium tracking-wide uppercase text-sm mb-4">
                {t("why_practice_metta")}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                {t("benefits_of_loving_kindness")}</h2>
              <p className="text-muted-foreground text-lg">
                {t("regular_practice_transforms_ho")}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="gradient-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
};

export default BenefitsSection;
