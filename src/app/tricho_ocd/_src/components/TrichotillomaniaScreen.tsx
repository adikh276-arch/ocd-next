import { motion } from "framer-motion";
import { Heart, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
  }),
};

interface PointCardProps {
  icon: string;
  text: string;
  index: number;
  variant?: "coral" | "lavender";
}

const PointCard = ({ icon, text, index, variant = "coral" }: PointCardProps) => (
  <motion.div
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 ${
      variant === "lavender" ? "bg-[#f3f0ff]" : "bg-[#fff0f0]"
    }`}
  >
    <span className="mt-0.5 text-xl leading-none shrink-0">{icon}</span>
    <p className="text-sm leading-relaxed text-slate-800">{text}</p>
  </motion.div>
);

const TrichotillomaniaScreen = () => {
    const { t } = useTranslation("tricho_ocd");
      return (
        <div
          className="w-full max-w-3xl mx-auto min-h-screen"
          style={{
            background:
              "linear-gradient(180deg, hsl(25 60% 95%) 0%, hsl(270 25% 95%) 50%, hsl(25 40% 96%) 100%)",
            colorScheme: "light"
          }}
        >
          <div className="px-6 md:px-12 py-8 md:py-16 space-y-8">
            {/* Back button */}
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors -mb-2">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">{t("back")}</span>
            </button>

            {/* Top icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center">
                <Heart className="w-8 h-8 text-rose-500" strokeWidth={2} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {t("what_is_trichotillomania")}</h1>
              <p className="text-xs md:text-sm text-muted-foreground tracking-widest uppercase opacity-70">
                {t("trik_oh_till_oh_may_nee_ah")}</p>
            </motion.div>

            {/* Intro line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display italic text-xl md:text-2xl leading-relaxed text-center text-slate-800"
            >
              {t("you_re_not_doing_it_on_purpose")}<br />
              {t("and_you_are_definitely_not_alo")}</motion.p>

            {/* Body 1 */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base md:text-lg leading-relaxed text-slate-700 text-left"
            >
              {t("trichotillomania_is_a_conditio")}</motion.p>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="font-display text-base md:text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                {t("what_does_it_feel_like")}</h2>
              <div className="space-y-2.5">
                <PointCard icon="😔" text={t("a_building_tension_or_restlessness_just_before_pulling")} index={0} variant="lavender" />
                <PointCard icon="😌" text={t("a_brief_sense_of_relief_or_release_when_pulling_happens")} index={1} variant="lavender" />
                <PointCard icon="😞" text={t("guilt_shame_or_distress_shortly_after")} index={2} variant="lavender" />
                <PointCard icon="🔁" text={t("the_cycle_then_repeats_itself")} index={3} variant="lavender" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="font-display text-base md:text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                {t("it_shows_up_differently_for_ev")}</h2>
              <div className="space-y-2.5">
                <PointCard icon="💇" text={t("hair_pulling_from_the_scalp_eyebrows_or_eyelashes")} index={0} />
                <PointCard icon="💅" text={t("nail_biting_or_picking_at_the_skin")} index={1} />
                <PointCard icon="🔄" text={t("sometimes_automatic_while_watching_tv_or_reading")} index={2} />
                <PointCard icon="🎯" text={t("sometimes_focused_deliberate_ritualistic")} index={3} />
              </div>
            </div>

            {/* Body 2 */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base md:text-lg leading-relaxed text-slate-700 text-left"
            >
              {t("trichotillomania_is_classified")}</motion.p>

            {/* Closing card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white/50 px-5 py-5 border border-slate-200"
            >
              <p className="text-base md:text-lg leading-relaxed text-slate-800 font-medium">
                {t("your_brain_has_learned_that_pu")}</p>
            </motion.div>

            <div className="h-4" />
          </div>
        </div>
      );
};

export default TrichotillomaniaScreen;
