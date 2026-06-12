import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ChevronDown, Lightbulb, MessageSquare, TrendingUp, BookOpen, Smile, User, Users, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

interface InteractiveTool {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

const interactiveTools: InteractiveTool[] = [
  { id: "affirmations", icon: Sparkles, label: "Affirmations", bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "https://platform.mantracare.com/bi-identity-affirmations/" },
  { id: "mental-health", icon: BookOpen, label: "Bisexuality and Mental Health", bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "https://platform.mantracare.com/bi-mental-health/" },
  { id: "coming-out-practice", icon: Users, label: "Coming Out Practice", bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "https://platform.mantracare.com/bi-coming-out/" },
  { id: "talk-to-family", icon: User, label: "Talk to Your Family", bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "https://platform.mantracare.com/bi-family-friends-convo/" },
  { id: "handle-reactions", icon: Heart, label: "Handle Reactions of Others", bgColor: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)", link: "https://platform.mantracare.com/when-they-react/" },
  { id: "confidence-mirror", icon: Smile, label: "Confidence Mirror", bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "https://platform.mantracare.com/confidence-mirror/" },
];

interface Tip {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const tips: Tip[] = [
  {
    id: "validate-identity",
    title: "Validate Your Identity",
    description: "Remind yourself that your attraction is real, regardless of others' assumptions or labels.",
    bgColor: "#D1F4E0",
    iconColor: "#059669"
  },
  {
    id: "navigate-bi-erasure",
    title: "Navigate Bi-Erasure",
    description: "Be mindful of spaces that invalidate bisexuality and choose environments that acknowledge your identity.",
    bgColor: "#D4E4F7",
    iconColor: "#2563EB"
  },
  {
    id: "build-inclusive-support",
    title: "Build Inclusive Support Systems",
    description: "Connect with people who understand or respect fluid identities.",
    bgColor: "#FFE0EC",
    iconColor: "#DB2777"
  },
  {
    id: "allow-fluidity",
    title: "Allow Yourself Fluidity",
    description: "Your experiences may evolve, and that's okay. Give yourself permission to grow without pressure.",
    bgColor: "#FFF4D6",
    iconColor: "#D97706"
  }
];

interface Myth {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const myths: Myth[] = [
  {
    id: "confusion",
    title: "Myth: Bisexuality is Confusion",
    description: "Bisexuality is a valid identity, not uncertainty.",
    bgColor: "#FFE0EC",
    iconColor: "#DB2777"
  },
  {
    id: "indecisive",
    title: "Myth: Bisexual People Are Indecisive",
    description: "Attraction to more than one gender does not mean inability to commit.",
    bgColor: "#FFF4D6",
    iconColor: "#D97706"
  },
  {
    id: "doesnt-exist",
    title: "Myth: Bisexuality Doesn't Exist",
    description: "Bi-erasure ignores real experiences of millions of people.",
    bgColor: "#D4E4F7",
    iconColor: "#2563EB"
  },
  {
    id: "promiscuous",
    title: "Myth: Bisexual People Are More Promiscuous",
    description: "This stereotype is harmful and untrue.",
    bgColor: "#FFE0EC",
    iconColor: "#DB2777"
  }
];

export function BisexualGuide() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<'tips' | 'myths' | null>(null);

  const handleToolClick = (link: string | null) => {
    if (link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else {
        router.push(link);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FDF4FF] via-[#FCF7FF] to-[#FAF5FF]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(-1)}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white backdrop-blur-sm text-[#64748B] hover:text-[#EC4899] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100 mb-8"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </motion.button>

          {/* Header with decorative element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 relative"
          >
            <div className="absolute -left-2 top-0 w-1 h-16 bg-gradient-to-b from-[#EC4899] to-[#DB2777] rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#020817] mb-3 pl-4">
              Bisexual
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl pl-4">
              Resources and support for your journey
            </p>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')}
              className="w-full bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left flex items-center gap-4 shadow-sm group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#A855F7] flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-white" size={24} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#020817] mb-0.5">Tips</h2>
                <p className="text-[#64748B] text-sm">Daily wisdom for your wellbeing</p>
              </div>
              <ChevronDown
                className={`text-[#64748B] transition-all duration-300 flex-shrink-0 ${
                  expandedSection === 'tips' ? "rotate-180" : ""
                }`}
                size={20}
                strokeWidth={2}
              />
            </button>

            {expandedSection === 'tips' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {tips.map((tip, index) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl p-5 border border-[#A855F7]/20 shadow-sm bg-[#FAF5FF]"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="text-white" size={16} strokeWidth={2} />
                      </div>
                      <h3 className="text-base font-bold text-[#020817] leading-tight flex-1">{tip.title}</h3>
                    </div>
                    <p className="text-[#64748B] leading-relaxed text-sm">
                      {tip.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Myths Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === 'myths' ? null : 'myths')}
              className="w-full bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left flex items-center gap-4 shadow-sm group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                <MessageSquare className="text-white" size={24} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#020817] mb-0.5">Myths</h2>
                <p className="text-[#64748B] text-sm">Debunking harmful stereotypes</p>
              </div>
              <ChevronDown
                className={`text-[#64748B] transition-all duration-300 flex-shrink-0 ${
                  expandedSection === 'myths' ? "rotate-180" : ""
                }`}
                size={20}
                strokeWidth={2}
              />
            </button>

            {expandedSection === 'myths' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {myths.map((myth, index) => (
                  <motion.div
                    key={myth.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl p-5 border border-[#EC4899]/20 shadow-sm bg-[#FFF1F2]"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#EC4899] flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="text-white" size={16} strokeWidth={2} />
                      </div>
                      <h3 className="text-base font-bold text-[#020817] leading-tight flex-1">{myth.title}</h3>
                    </div>
                    <p className="text-[#64748B] leading-relaxed text-sm">
                      {myth.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Interactive Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#F97316] flex items-center justify-center">
                <TrendingUp className="text-white" size={24} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#020817] mb-0.5">Interactive Tools</h2>
                <p className="text-[#64748B] text-sm">Exercises for recovery and wellness</p>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {interactiveTools.map((tool, index) => {
                const IconComponent = tool.icon;
                const bgColors = ['#FFF4ED', '#EFF6FF', '#F0FDF4', '#FAF5FF', '#FFF1F2', '#F5F3FF'];
                const iconColors = ['#F97316', '#3B82F6', '#10B981', '#A855F7', '#EC4899', '#8B5CF6'];
                const borderColors = ['#F97316', '#3B82F6', '#10B981', '#A855F7', '#EC4899', '#8B5CF6'];
                return (
                  <motion.button
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + 0.05 * index }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToolClick(tool.link)}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-md hover:shadow-xl transition-all duration-300 border-2 group relative overflow-hidden"
                    style={{ borderColor: `${borderColors[index]}20` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${bgColors[index]} 0%, white 100%)` }}
                    ></div>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: bgColors[index] }}
                    >
                      <IconComponent style={{ color: iconColors[index] }} size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#020817] text-center leading-tight relative z-10 group-hover:text-[#020817]/90">
                      {tool.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#EC4899]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#10B981]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
