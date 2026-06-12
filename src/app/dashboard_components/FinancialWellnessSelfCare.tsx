import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, MessageCircle, BookOpen, Video, FileText, Heart, Shield, ChevronRight, ChevronDown, Sparkles, Target, Award, Crown, Clock, Timer, Activity, Music, Moon, Sunrise, Headphones, Brain, Users, TrendingUp, Lightbulb, Calculator, AlertTriangle, TrendingDown, BarChart, Newspaper, MessageSquare, Zap, DollarSign, PiggyBank, CreditCard, Wallet, Bot, Compass, HeartPulse, Gauge, TrendingUp as Growth } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

interface TopicCard {
  id: string;
  icon: any;
  label: string;
  image: string;
}

interface ToolCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  iconColor: string;
  url?: string;
}

interface FinancialLevelCard {
  id: string;
  icon: any;
  label: string;
}

const toolCards: ToolCard[] = [
  { id: "grow", icon: Bot, label: "GROW", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", iconColor: "#AB47BC", url: "https://app.mantracare.org/coachapp/grow/" },
  { id: "life-guidance", icon: Compass, label: "Life Guidance", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#00BCD4", url: "https://web.mantracare.com/app/compass-guide-your-life/" },
  { id: "self-awareness", icon: Brain, label: "Self-Awareness", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", iconColor: "#EC407A", url: "https://content.mantracare.com/en/coachapp/self-awareness-assessment/" },
  { id: "stress-wellbeing", icon: HeartPulse, label: "Stress & Wellbeing", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#66BB6A", url: "https://content.mantracare.com/en/coachapp/stress-and-well-being-assessment/" },
  { id: "control-motivation", icon: Gauge, label: "Control & Motivation", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#F9A825", url: "https://content.mantracare.com/en/coachapp/control-and-motivation-assessment/" },
  { id: "professional-growth", icon: Growth, label: "Professional Growth", bgColor: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)", iconColor: "#FF9800", url: "https://content.mantracare.com/en/coachapp/leadership-and-professional-growth-assessment/" },
];

const topicCards: TopicCard[] = [
  { id: "articles", icon: Newspaper, label: "Articles", image: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYXJ0aWNsZXMlMjBtb25leSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzMyMjEwODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "tips", icon: Lightbulb, label: "Tips", image: "https://images.unsplash.com/photo-1768839721776-038d3070721e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0aXBzJTIwYnVkZ2V0aW5nJTIwYWR2aWNlfGVufDF8fHx8MTc3MzIyMTA4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "myths", icon: MessageSquare, label: "Myths", image: "https://images.unsplash.com/photo-1614623072017-924ade10a6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMG15dGhzJTIwZmFjdHMlMjBmaW5hbmNlfGVufDF8fHx8MTc3MzIyMTA4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "stories", icon: MessageSquare, label: "Stories", image: "https://images.unsplash.com/photo-1689903777384-31fd780bef3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzdWNjZXNzJTIwd2VhbHRoJTIwc3Rvcmllc3xlbnwxfHx8fDE3NzMyMjEwODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const financialLevelCards: FinancialLevelCard[] = [
  { id: "budget", icon: Calculator, label: "Budget Calculator" },
  { id: "savings", icon: PiggyBank, label: "Savings Planner" },
  { id: "debt", icon: CreditCard, label: "Debt Manager" },
  { id: "wealth", icon: TrendingUp, label: "Wealth Builder" },
];

export function FinancialWellnessSelfCare() {
  const router = useRouter();
  const [showAllTopics, setShowAllTopics] = useState(false);

  const displayedTopics = showAllTopics ? topicCards : topicCards.slice(0, 8);

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
                <DollarSign size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Financial Wellness Resources</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Tools and guidance for your financial journey
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

          {/* Choose Your Financial Tools */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#043570]">Financial Calculators</h2>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {financialLevelCards.map((level, index) => {
                  const IconComponent = level.icon;
                  const colors = [
                    { number: "text-[#7DD9FF]", icon: "text-[#7DD9FF]", border: "border-[#E5E7EB]", bg: "bg-white", line: "bg-[#E5E7EB]" },
                    { number: "text-[#00c0ff]", icon: "text-[#00c0ff]", border: "border-[#E5E7EB]", bg: "bg-white", line: "bg-[#E5E7EB]" },
                    { number: "text-[#0277A3]", icon: "text-[#0277A3]", border: "border-[#E5E7EB]", bg: "bg-white", line: "bg-[#E5E7EB]" },
                    { number: "text-[#043570]", icon: "text-[#043570]", border: "border-[#E5E7EB]", bg: "bg-white", line: "bg-[#E5E7EB]" },
                  ];
                  const color = colors[index % colors.length];
                  
                  return (
                    <motion.button
                      key={level.id}
                      variants={item}
                      layout
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        console.log(`Navigate to ${level.id}`);
                      }}
                      className={`${color.bg} rounded-2xl p-5 hover:shadow-lg shadow-sm transition-all relative border-2 ${color.border}`}
                    >
                      {/* Top Section: Number and Icon */}
                      <div className="flex items-start justify-between mb-8">
                        <span className={`text-2xl font-bold ${color.number}`}>
                          0{index + 1}
                        </span>
                        <IconComponent size={24} className={color.icon} strokeWidth={2} />
                      </div>
                      
                      {/* Bottom Section: Label */}
                      <div className="text-left">
                        <h3 className="text-[#1F2937] font-bold text-base mb-3">{level.label}</h3>
                        <div className={`h-1 w-full ${color.line} rounded-full`}></div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#043570]">Resources</h2>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {displayedTopics.map((topic, index) => {
                  return (
                    <motion.button
                      key={topic.id}
                      variants={item}
                      layout
                      whileHover={{ y: -6, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        console.log(`Navigate to ${topic.id}`);
                      }}
                      className="relative rounded-2xl overflow-hidden h-40 shadow-md hover:shadow-2xl transition-all group"
                    >
                      {/* Background Image */}
                      <ImageWithFallback
                        src={topic.image}
                        alt={topic.label}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#043570]/0 group-hover:bg-[#043570]/10 transition-colors"></div>
                      
                      {/* Text Content */}
                      <div className="absolute inset-0 flex items-end p-5">
                        <h3 className="text-white font-bold text-base leading-tight drop-shadow-lg relative z-10">
                          {topic.label}
                        </h3>
                      </div>
                    </motion.button>
                  );
                })}</AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
