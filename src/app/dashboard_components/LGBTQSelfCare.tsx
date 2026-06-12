import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, CheckSquare, BookOpen, Compass, Lightbulb, Info, FileText, Target, HeartPulse, Smile, Moon, Sparkles, Activity, Heart, Users2, Star, Shield } from "lucide-react";

interface ResourceCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

interface TrackerCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

interface GuideCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  link: string | null;
}

const resources: ResourceCard[] = [
  { id: "assessments", icon: CheckSquare, label: "Assessments", bgColor: "linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)", link: "https://lgbtqiacounseling.com/assessments/" },
  { id: "stories", icon: BookOpen, label: "Stories", bgColor: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)", link: "https://platform.mantracare.com/lgbtq_stories/" },
  { id: "identity", icon: Compass, label: "Identity Exploration", bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "https://web.mantracare.com/app/identity_exploration" },
  { id: "tips", icon: Lightbulb, label: "Tips", bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "/lgbtq-tips" },
  { id: "myths", icon: Info, label: "Myths & Facts", bgColor: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)", link: "/lgbtq-myths-facts" },
  { id: "articles", icon: FileText, label: "Articles", bgColor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", link: "/lgbtq-articles" },
];

const trackers: TrackerCard[] = [
  { id: "identity-journey", icon: Target, label: "Identity Journey", bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "https://web.mantracare.com/app/identity_journey" },
  { id: "daily-care", icon: HeartPulse, label: "Daily Care", bgColor: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)", link: "https://web.mantracare.com/app/daily_self_care_tracker" },
  { id: "mood", icon: Smile, label: "Mood", bgColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", link: "https://platform.mantracare.org/ocd/mood_tracker" },
  { id: "sleep", icon: Moon, label: "Sleep", bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "https://web.mantracare.com/app/sleep_tracker" },
  { id: "gratitude", icon: Sparkles, label: "Gratitude", bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "https://web.mantracare.com/app/gratitude_tracker" },
  { id: "vibe", icon: Activity, label: "Vibe", bgColor: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", link: "https://web.mantracare.com/app/vibe_tracker" },
];

const guides: GuideCard[] = [
  { id: "lesbian", icon: Heart, label: "Lesbian", bgColor: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)", link: "/lesbian-guide" },
  { id: "gay", icon: Users2, label: "Gay", bgColor: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", link: "/gay-guide" },
  { id: "bisexual", icon: Star, label: "Bi-sexual", bgColor: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)", link: "/bisexual-guide" },
  { id: "trans", icon: Shield, label: "Trans", bgColor: "linear-gradient(135deg, #10B981 0%, #059669 100%)", link: "/trans-guide" },
];

export function LGBTQSelfCare() {
  const router = useRouter();

  const handleCardClick = (link: string | null) => {
    if (link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else {
        router.push(link);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FAF5FF] via-[#F9F6FE] to-[#FFF1F2]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#A855F7] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100/50 mb-6"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>

            <div className="relative">
              <div className="absolute -left-2 top-0 w-1 h-14 bg-gradient-to-b from-[#EC4899] via-[#A855F7] to-[#3B82F6] rounded-full"></div>
              <div className="pl-5">
                <h1 className="text-3xl md:text-4xl font-bold text-[#020817] mb-2 bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
                  LGBTQ+ Self-Care
                </h1>
                <p className="text-[#64748B] text-base md:text-lg">
                  Explore resources, track your journey, and embrace your authentic self
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center shadow-md">
                <Sparkles className="text-white" size={20} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#020817]">Resources</h2>
                <p className="text-[#64748B] text-xs">Essential tools and information</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                const bgColors = ['#FFF1F2', '#EFF6FF', '#FAF5FF', '#FFF4ED', '#FFF1F2', '#F5F3FF'];
                const borderColors = ['#EC4899', '#3B82F6', '#A855F7', '#F59E0B', '#EC4899', '#8B5CF6'];
                return (
                  <motion.button
                    key={resource.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 + 0.05 * index, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -6, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(resource.link)}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 border-2 group relative overflow-hidden"
                    style={{ borderColor: `${borderColors[index]}30` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${bgColors[index]} 0%, white 100%)` }}
                    ></div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: resource.bgColor }}
                    >
                      <IconComponent className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#020817] text-center leading-tight relative z-10">
                      {resource.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Trackers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-md">
                <Activity className="text-white" size={20} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#020817]">Trackers</h2>
                <p className="text-[#64748B] text-xs">Monitor your wellness journey</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {trackers.map((tracker, index) => {
                const IconComponent = tracker.icon;
                const bgColors = ['#FAF5FF', '#FFF1F2', '#FFF4ED', '#EFF6FF', '#F0FDF4', '#FFF0F0'];
                const borderColors = ['#A855F7', '#EC4899', '#F59E0B', '#3B82F6', '#10B981', '#F97316'];
                return (
                  <motion.button
                    key={tracker.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.05 * index, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -6, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(tracker.link)}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 border-2 group relative overflow-hidden"
                    style={{ borderColor: `${borderColors[index]}30` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${bgColors[index]} 0%, white 100%)` }}
                    ></div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: tracker.bgColor }}
                    >
                      <IconComponent className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#020817] text-center leading-tight relative z-10">
                      {tracker.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Wellness Guides Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-md">
                <Heart className="text-white" size={20} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#020817]">Wellness Guides</h2>
                <p className="text-[#64748B] text-xs">Identity-specific support and resources</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {guides.map((guide, index) => {
                const IconComponent = guide.icon;
                const bgColors = ['#FFF1F2', '#EFF6FF', '#FAF5FF', '#F0FDF4'];
                const borderColors = ['#EC4899', '#3B82F6', '#A855F7', '#10B981'];
                return (
                  <motion.button
                    key={guide.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + 0.08 * index, type: "spring", stiffness: 180 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(guide.link)}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 flex flex-col items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 border-2 group relative overflow-hidden"
                    style={{ borderColor: `${borderColors[index]}40` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${bgColors[index]} 0%, white 100%)` }}
                    ></div>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                      style={{ background: guide.bgColor }}
                    >
                      <IconComponent className="text-white" size={28} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold text-[#020817] text-center leading-tight relative z-10">
                      {guide.label}
                    </span>
                    <div className="w-full h-0.5 rounded-full relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: guide.bgColor }}
                    ></div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-80 h-80 bg-gradient-to-br from-[#EC4899]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#A855F7]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
