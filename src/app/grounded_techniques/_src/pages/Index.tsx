import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, ChevronRight, Wind, Droplets, Hand, Utensils, Coffee, Footprints, Snowflake, Flower, Move, Ear, Heart } from "lucide-react";
import { techniques } from "@/app/grounded_techniques/_src/data/techniques";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ICON_MAP: Record<string, any> = {
  water: Droplets,
  touch: Hand,
  breathe: Wind,
  food: Utensils,
  drink: Coffee,
  walk: Footprints,
  ice: Snowflake,
  scent: Flower,
  move: Move,
  listen: Ear,
  body: Heart,
};

const Index = () => {
    const { t } = useTranslation("grounded_techniques");
      const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden font-sans">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-primary/4 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tl from-accent/8 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-md mx-auto mb-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => window.history.back()}
            className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
            aria-label={t("go_back")}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="shrink-0">
            <ActivityHistoryDrawer slug="grounded_techniques" title={t("grounding_history")} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-md mx-auto mb-8 relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex items-center justify-center shadow-sm">
            <Wind className="text-primary" size={24} />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3 tracking-tight">
          {t("grounding")}</h1>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-[280px] mx-auto">
          {t("techniques_to_help_bring_your_attention_back_to_th")}</p>
      </div>

      {/* Technique Grid */}
      <div className="w-full max-w-md mx-auto grid grid-cols-1 gap-3 relative z-10 pb-10">
        {techniques.map((tech, i) => {
          const Icon = ICON_MAP[tech.id] || Sparkles;
          return (
            <motion.button
              key={tech.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/technique/${tech.id}`)}
              className="group relative overflow-hidden bg-card border border-border/50 rounded-2xl p-5 text-left transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-foreground text-[15px] leading-tight mb-0.5">
                      {tech.title}
                    </h3>
                    <p className="text-muted-foreground text-[12px] font-medium font-body opacity-70">
                      {tech.steps.length} {t("steps_practice")}</p>
                  </div>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" size={18} />
              </div>
              
              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
