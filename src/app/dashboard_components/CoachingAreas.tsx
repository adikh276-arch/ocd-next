import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Target, Briefcase, Heart, TrendingUp, Users, Award, GraduationCap, Lightbulb, Shield, ChevronRight, ChevronDown, Bot, Compass, Brain, HeartPulse, Gauge, TrendingUp as Growth } from "lucide-react";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

interface TopicCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  iconColor: string;
  url?: string;
}

interface MindfulnessCard {
  id: string;
  icon: any;
  label: string;
  subtitle: string;
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Great", value: "great" },
  { emoji: "🙂", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "😟", label: "Down", value: "down" },
  { emoji: "😢", label: "Sad", value: "sad" },
];

const toolCards: TopicCard[] = [
  { id: "grow", icon: Bot, label: "GROW", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", iconColor: "#AB47BC", url: "https://app.mantracare.org/coachapp/grow/" },
  { id: "life-guidance", icon: Compass, label: "Life Guidance", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#00BCD4", url: "https://web.mantracare.com/app/compass-guide-your-life/" },
  { id: "self-awareness", icon: Brain, label: "Self-Awareness", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", iconColor: "#EC407A", url: "https://content.mantracare.com/en/coachapp/self-awareness-assessment/" },
  { id: "stress-wellbeing", icon: HeartPulse, label: "Stress & Wellbeing", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#66BB6A", url: "https://content.mantracare.com/en/coachapp/stress-and-well-being-assessment/" },
  { id: "control-motivation", icon: Gauge, label: "Control & Motivation", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#F9A825", url: "https://content.mantracare.com/en/coachapp/control-and-motivation-assessment/" },
  { id: "professional-growth", icon: Growth, label: "Professional Growth", bgColor: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)", iconColor: "#FF9800", url: "https://content.mantracare.com/en/coachapp/leadership-and-professional-growth-assessment/" },
];

const topicCards: TopicCard[] = [
  { id: "career", icon: Briefcase, label: "Career", bgColor: "bg-[#E0F2FE]", iconColor: "text-[#0EA5E9]" },
  { id: "executive", icon: TrendingUp, label: "Executive", bgColor: "bg-[#F3E8FF]", iconColor: "text-[#A855F7]" },
  { id: "wellness", icon: Heart, label: "Wellness", bgColor: "bg-[#FCE7F3]", iconColor: "text-[#EC4899]" },
  { id: "leadership", icon: Target, label: "Leadership", bgColor: "bg-[#FFF4ED]", iconColor: "text-[#FB923C]" },
  { id: "finance", icon: Award, label: "Finance", bgColor: "bg-[#CCFBF1]", iconColor: "text-[#14B8A6]" },
  { id: "performance", icon: Lightbulb, label: "Performance", bgColor: "bg-[#FEF3C7]", iconColor: "text-[#F59E0B]" },
  { id: "mindset", icon: GraduationCap, label: "Mindset", bgColor: "bg-[#E0F2FE]", iconColor: "text-[#0EA5E9]" },
  { id: "spiritual", icon: Shield, label: "Spiritual", bgColor: "bg-[#F3E8FF]", iconColor: "text-[#A855F7]" },
  { id: "mental-health", icon: Heart, label: "Mental Health", bgColor: "bg-[#DBEAFE]", iconColor: "text-[#3B82F6]" },
  { id: "transform", icon: TrendingUp, label: "Transform", bgColor: "bg-[#FCE7F3]", iconColor: "text-[#EC4899]" },
  { id: "communicate", icon: Users, label: "Communicate", bgColor: "bg-[#FFF4ED]", iconColor: "text-[#FB923C]" },
  { id: "organization", icon: Briefcase, label: "Organization", bgColor: "bg-[#F1F5F9]", iconColor: "text-[#64748B]" },
  { id: "creativity", icon: Lightbulb, label: "Creativity", bgColor: "bg-[#FEF3C7]", iconColor: "text-[#F59E0B]" },
  { id: "employee", icon: Users, label: "Employee", bgColor: "bg-[#CCFBF1]", iconColor: "text-[#14B8A6]" },
  { id: "corporate", icon: Briefcase, label: "Corporate", bgColor: "bg-[#E0F2FE]", iconColor: "text-[#0EA5E9]" },
  { id: "confidence", icon: Award, label: "Confidence", bgColor: "bg-[#F0FDF4]", iconColor: "text-[#22C55E]" },
];

const mindfulnessCards: MindfulnessCard[] = [
  { id: "meditate", icon: Award, label: "Meditate", subtitle: "Calm your mind" },
  { id: "sleep", icon: Award, label: "Sleep", subtitle: "Rest better" },
  { id: "relax", icon: Award, label: "Relax", subtitle: "Unwind deeply" },
  { id: "music", icon: Award, label: "Music", subtitle: "Soothing sounds" },
];

export function CoachingAreas() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => router.push(-1)}
                className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                <Target size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Select Coaching Area</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Choose the area where you need guidance and support
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tools */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4">Tools</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-6 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {toolCards.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <motion.button
                      key={tool.id}
                      variants={item}
                      layout
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (tool.url) {
                          window.open(tool.url, '_blank');
                        }
                      }}
                      className="rounded-2xl p-5 shadow-sm flex flex-col items-start justify-between h-28"
                      style={{ background: tool.bgColor }}
                    >
                      <IconComponent size={32} className="text-white mb-auto" strokeWidth={2} />
                      <h3 className="text-white font-semibold text-xs text-left leading-tight">{tool.label}</h3>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* What coaching focus interests you? */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4">What coaching focus interests you?</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {topicCards.map((topic) => {
                  const IconComponent = topic.icon;
                  return (
                    <motion.button
                      key={topic.id}
                      variants={item}
                      layout
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        console.log(`Navigate to ${topic.id}`);
                      }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#3B82F6]/40 hover:shadow-lg transition-all text-center group"
                    >
                      <div className={`w-16 h-16 ${topic.bgColor} rounded-3xl flex items-center justify-center mb-3 mx-auto transition-all group-hover:scale-110`}>
                        <IconComponent size={28} className={topic.iconColor} strokeWidth={2} />
                      </div>
                      <h3 className="text-[#475569] font-medium text-sm">{topic.label}</h3>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
