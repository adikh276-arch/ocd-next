// @ts-nocheck
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, CircleDot, Heart, Users, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
const MeditationSteps = () => {
    const { t } = useTranslation("metta_heart_guide");
    const steps = [
      {
        id: 1,
        icon: CircleDot,
        title: t("settle__breathe"),
        subtitle: t("find_your_anchor"),
        content: `Find a comfortable position—sitting or lying down—where you can relax yet stay alert. Gently close your eyes or soften your gaze.

Take a few deep breaths. Inhale slowly through your nose, feeling your belly expand. Exhale fully, releasing any tension.

Allow your breath to find its natural rhythm. Simply notice the rise and fall of your chest, the gentle flow of air. There's nothing to fix or change—just breathe and be.`,
      },
      {
        id: 2,
        icon: Heart,
        title: t("kindness_to_self"),
        subtitle: t("begin_within"),
        content: `Now, bring your attention to your heart center. Imagine a warm, gentle light glowing there.

Picture yourself—perhaps as you are now, or as a child who needs comfort. Hold this image with tenderness.

Silently repeat these phrases, letting each one sink in:

"May I be safe and protected."
"May I be healthy and strong."
"May I live with ease and happiness."
"May I know peace."

There's no need to force feelings. Simply plant these seeds of kindness, trusting they will grow.`,
      },
      {
        id: 3,
        icon: Users,
        title: t("extend_to_others"),
        subtitle: t("widen_the_circle"),
        content: `Now think of someone you love—a friend, family member, or mentor. Picture them clearly, feeling the warmth of your connection.

Offer them the same wishes:

"May you be safe and protected."
"May you be healthy and strong."
"May you live with ease and happiness."
"May you know peace."

Next, bring to mind a neutral person—perhaps someone you see regularly but don't know well. A neighbor, barista, or passerby. Extend the same loving wishes to them.

Finally, if you're ready, think of someone with whom you have difficulty. Start small. Offer what kindness you can:

"May you find peace."`,
      },
      {
        id: 4,
        icon: Globe,
        title: t("all_beings_everywhere"),
        subtitle: t("universal_compassion"),
        content: `Now, expand your awareness outward—beyond yourself, beyond those you know.

Imagine your loving-kindness as a warm, gentle wave, spreading in all directions:

"May all beings be safe."
"May all beings be healthy."
"May all beings live with ease."
"May all beings know peace and love."

Let this feeling of universal goodwill fill you. You are connected to all of life—one thread in an infinite tapestry of being.

Rest here for a few breaths, bathed in this boundless compassion.`,
      },
    ];
      
      const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 md:py-28 gradient-warmth">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-primary font-medium tracking-wide uppercase text-sm mb-4">
            {t("step_by_step_guide")}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {t("your_meditation_journey")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("move_through_each_stage_at_you")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Step Navigation */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 md:gap-4 bg-card rounded-full p-2 shadow-soft">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                  <span className="hidden md:inline font-medium text-sm">{t("step")}{step.id}</span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="hidden md:block w-4 h-4 text-border absolute -right-3" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                opacity: activeStep === step.id ? 1 : 0,
                x: activeStep === step.id ? 0 : 20,
                display: activeStep === step.id ? "block" : "none",
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-primary font-medium">{step.subtitle}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground">{step.title}</h3>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {step.content.split('\N\N').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className={`text-foreground/80 leading-relaxed mb-6 last:mb-0 ${
                        paragraph.startsWith('"') ? "text-primary font-medium italic pl-4 border-l-2 border-primary/30" : ""
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-border">
                  <button
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeStep === 1
                        ? "opacity-50 cursor-not-allowed text-muted-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    disabled={activeStep === 1}
                  >
                    {t("previous_step")}</button>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      activeStep === steps.length
                        ? "opacity-50 cursor-not-allowed text-muted-foreground"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    disabled={activeStep === steps.length}
                  >
                    {t("next_step")}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeditationSteps;
