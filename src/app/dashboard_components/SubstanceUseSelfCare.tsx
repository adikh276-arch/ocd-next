import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { 
  ChevronLeft, 
  MessageCircle, 
  BookOpen, 
  Video, 
  FileText, 
  Heart, 
  Shield, 
  ChevronRight, 
  ChevronDown,
  CloudRain,
  Brain,
  Zap,
  Users,
  Briefcase,
  Moon,
  Baby,
  Flame,
  Frown,
  TrendingUp,
  HeartPulse,
  Sparkles,
  UtensilsCrossed,
  RefreshCw,
  Waves,
  RotateCcw,
  Star,
  FolderTree,
  Mail,
  Smile,
  Cigarette,
  Eye,
  CheckCircle,
  Activity,
  AlertTriangle,
  Battery,
  Wind,
  Bed,
  SmilePlus,
  Footprints,
  PauseCircle,
  Anchor
} from "lucide-react";

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

const topicCards: TopicCard[] = [
  { id: "depression", icon: CloudRain, label: "Depression", bgColor: "#EBF4FF", iconColor: "#4F95FF" },
  { id: "anxiety", icon: Brain, label: "Anxiety", bgColor: "#F3EEFF", iconColor: "#9D6CFF" },
  { id: "stress", icon: Zap, label: "Stress", bgColor: "#FFF4E5", iconColor: "#FFB347" },
  { id: "adolescent", icon: Users, label: "Adolescent", bgColor: "#E8F8F5", iconColor: "#34D399" },
  { id: "relationship", icon: Heart, label: "Relationship", bgColor: "#FFEBF0", iconColor: "#FF6B9D" },
  { id: "workplace", icon: Briefcase, label: "Workplace", bgColor: "#F1F5F9", iconColor: "#64748B" },
  { id: "sleep", icon: Moon, label: "Sleep", bgColor: "#EDE9FE", iconColor: "#8B5CF6" },
  { id: "parenting", icon: Baby, label: "Parenting", bgColor: "#FCE7F3", iconColor: "#EC4899" },
  { id: "anger", icon: Flame, label: "Anger", bgColor: "#FFF0EB", iconColor: "#F97316" },
  { id: "grief", icon: Frown, label: "Grief", bgColor: "#F1F5F9", iconColor: "#475569" },
  { id: "ptsd", icon: Shield, label: "PTSD", bgColor: "#E6FAF5", iconColor: "#14B8A6" },
  { id: "acceptance", icon: TrendingUp, label: "Acceptance", bgColor: "#E0F7FA", iconColor: "#00BCD4" },
  { id: "postpartum", icon: HeartPulse, label: "Postpartum", bgColor: "#F5E6FF", iconColor: "#B794F4" },
  { id: "sexuality", icon: Sparkles, label: "Sexuality", bgColor: "#F0E7FF", iconColor: "#A78BFA" },
  { id: "eating-disorder", icon: UtensilsCrossed, label: "Eating Disorder", bgColor: "#F7FEE7", iconColor: "#84CC16" },
  { id: "ocd", icon: RefreshCw, label: "OCD", bgColor: "#DBEAFE", iconColor: "#3B82F6" },
];

const mindfulnessCards: MindfulnessCard[] = [
  { id: "meditate", icon: BookOpen, label: "Meditate", subtitle: "Calm your mind" },
  { id: "sleep", icon: Video, label: "Sleep", subtitle: "Rest better" },
  { id: "relax", icon: FileText, label: "Relax", subtitle: "Unwind deeply" },
  { id: "music", icon: Heart, label: "Music", subtitle: "Soothing sounds" },
];

const toolCards: TopicCard[] = [
  { id: "smoking-index", icon: Cigarette, label: "Smoking Index", bgColor: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", iconColor: "#EF4444", url: "https://web.mantracare.com/app/smoking-index/" },
  { id: "urge-watcher", icon: Eye, label: "Urge Watcher", bgColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", iconColor: "#F59E0B", url: "https://web.mantracare.com/app/urge-watcher/" },
  { id: "consumption-check", icon: CheckCircle, label: "Consumtion Check", bgColor: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", iconColor: "#8B5CF6", url: "https://platform.mantracare.com/consumption_tracker" },
  { id: "habits-check", icon: Activity, label: "Habits Check", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#06B6D4", url: "https://web.mantracare.com/app/what_are_your_habits/" },
  { id: "withdrawal-tracker", icon: AlertTriangle, label: "Withdrawal Tracker", bgColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", iconColor: "#EC4899", url: "https://platform.mantracare.com/withdrawal_tracker" },
  { id: "energy-track", icon: Battery, label: "Energy Track", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#10B981", url: "https://web.mantracare.com/app/energy_tracker/" },
  { id: "craving-check", icon: Wind, label: "Craving Check", bgColor: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", iconColor: "#F97316", url: "https://web.mantracare.com/app/smoke_craving_tracker/" },
  { id: "sleep-check", icon: Bed, label: "Sleep Check", bgColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", iconColor: "#6366F1", url: "https://web.mantracare.com/app/sleep_tracker" },
  { id: "mood-check", icon: SmilePlus, label: "Mood Check", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#FBBF24", url: "https://platform.mantracare.org/ocd/mood_tracker" },
  { id: "pause-button", icon: PauseCircle, label: "Pause Button", bgColor: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)", iconColor: "#A855F7", url: "https://web.mantracare.com/app/pause_button/" },
  { id: "grounding", icon: Anchor, label: "Grounding", bgColor: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", iconColor: "#0EA5E9", url: "https://platform.mantracare.org/ocd/grounded_techniques" },
  { id: "affirmations", icon: Smile, label: "Affirmations", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", iconColor: "#F472B6", url: "https://web.mantracare.com/app/affirmations/" },
];

export function SubstanceUseSelfCare() {
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
                <MessageCircle size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Self-Care Resources</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Tools and guidance for your recovery journey
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

          {/* Learn */}
          <div className="mb-8">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://platform.mantracare.com/quit_learn/', '_blank')}
              className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 group transition-shadow hover:shadow-md"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#fb923c] to-[#f97316] rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={28} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#0f172b] font-semibold text-base mb-0.5">Learn</h3>
                <p className="text-[#62748e] text-sm font-normal">Learn healthy habits and coping skills</p>
              </div>
              <ChevronRight size={20} className="text-[#fb923c] group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  );
}
