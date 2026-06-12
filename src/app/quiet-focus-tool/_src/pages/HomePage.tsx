import React from "react";
import { useNavigate } from "react-router-dom";
import { Target, Pause, Tag, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  badge: string;
}

const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => {
    const { t } = useTranslation("quiet-focus-tool");
  const navigate = useNavigate();
  const Icon = activity.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(activity.path)}
      className="w-full text-left bg-white border border-slate-100 rounded-3xl p-6 flex items-center gap-5 transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 px-2 py-0.5 bg-primary/5 rounded-full">
            {activity.badge}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">{activity.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed italic">{activity.description}</p>
      </div>
      <div className="p-2 rounded-full bg-slate-50 text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
        <ArrowRight size={18} />
      </div>
    </motion.button>
  );
};

const HomePage = () => {
    const { t } = useTranslation("quiet-focus-tool");
  // activities defined here so t() is in scope
  const activities: Activity[] = [
    {
      id: "attention-switch",
      title: t("attention_switch"),
      description: t("redirect_scattered_thoughts_through_focused_engagement"),
      icon: Target,
      path: "/activity/attention-switch",
      badge: "Cognitive",
    },
    {
      id: "do-nothing",
      title: t("resist_the_urge"),
      description: t("practice_the_profound_strength_of_peaceful_stillness"),
      icon: Pause,
      path: "/activity/do-nothing",
      badge: "Mindfulness",
    },
    {
      id: "label-the-noise",
      title: t("label_the_noise"),
      description: t("gain_clarity_by_categorizing_intrusive_thoughts"),
      icon: Tag,
      path: "/activity/label-the-noise",
      badge: "Insight",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-therapeutic relative overflow-hidden font-sans text-slate-900 flex flex-col items-center py-12 px-6">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        <button 
          onClick={() => {
            if (window.parent !== window) {
              window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
            } else {
              window.location.href = 'https://web.mantracare.com';
            }
          }}
          className="absolute top-8 left-8 p-3 rounded-full bg-white/20 hover:bg-white/50 text-slate-500 transition-all border border-slate-100/50"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-2xl shadow-primary/5 border border-slate-50 flex items-center justify-center text-3xl mx-auto mb-6">
            🧘
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tighter leading-tight italic mb-4">
            {t("quiet_focus")}
          </h1>
          <p className="text-slate-500 font-medium text-base leading-relaxed max-w-[280px] mx-auto italic">
            {t("find_your_center_amidst_the_noise_gentle_exercises")}
          </p>
        </header>

        {/* Activity Cards */}
        <nav className="space-y-4 mb-16" aria-label={t("wellness_activities")}>
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </nav>

        {/* Footer */}
        <footer className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-100 shadow-sm">
            <Sparkles size={14} className="text-primary" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t("take_your_time_youre_doing_great")}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
