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
  Wind,
  Compass
} from "lucide-react";
import { PiHandsPrayingFill } from "react-icons/pi";
import { FaBaby } from "react-icons/fa";
import { BsEmojiTear } from "react-icons/bs";

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
  { id: "depression", icon: CloudRain, label: "Depression", bgColor: "#EBF4FF", iconColor: "#4F95FF", url: "https://app-mantra.com/therapy/depression/" },
  { id: "anxiety", icon: Brain, label: "Anxiety", bgColor: "#F3EEFF", iconColor: "#9D6CFF", url: "https://app-mantra.com/therapy/anxiety/" },
  { id: "stress", icon: Zap, label: "Stress", bgColor: "#FFF4E5", iconColor: "#FFB347", url: "https://app-mantra.com/therapy/stress/?" },
  { id: "adolescent", icon: Users, label: "Adolescent", bgColor: "#E8F8F5", iconColor: "#34D399", url: "https://app-mantra.com/therapy/adolescent/" },
  { id: "relationship", icon: Heart, label: "Relationship", bgColor: "#FFEBF0", iconColor: "#FF6B9D", url: "https://app-mantra.com/therapy/relationship/?" },
  { id: "workplace", icon: Briefcase, label: "Workplace", bgColor: "#F1F5F9", iconColor: "#64748B", url: "https://app-mantra.com/therapy/workplace" },
  { id: "sleep", icon: Moon, label: "Sleep", bgColor: "#EDE9FE", iconColor: "#8B5CF6", url: "https://app-mantra.com/therapy/sleep/" },
  { id: "parenting", icon: Baby, label: "Parenting", bgColor: "#FCE7F3", iconColor: "#EC4899", url: "https://app-mantra.com/therapy/parenting/" },
  { id: "anger", icon: Flame, label: "Anger", bgColor: "#FFF0EB", iconColor: "#F97316", url: "https://app-mantra.com/therapy/anger/" },
  { id: "grief", icon: Frown, label: "Grief", bgColor: "#F1F5F9", iconColor: "#475569", url: "https://app-mantra.com/therapy/grief/" },
  { id: "ptsd", icon: BsEmojiTear, label: "PTSD", bgColor: "#E6FAF5", iconColor: "#14B8A6", url: "https://app-mantra.com/therapy/ptsd/" },
  { id: "acceptance", icon: PiHandsPrayingFill, label: "Acceptance", bgColor: "#E0F7FA", iconColor: "#00BCD4", url: "https://app-mantra.com/therapy/acceptance/" },
  { id: "postpartum", icon: FaBaby, label: "Postpartum", bgColor: "#F5E6FF", iconColor: "#B794F4", url: "https://app-mantra.com/therapy/postpartum/?" },
  { id: "self-esteem", icon: Sparkles, label: "Self Esteem", bgColor: "#F0E7FF", iconColor: "#A78BFA", url: "https://app-mantra.com/therapy/sexuality/" },
  { id: "eating-disorder", icon: UtensilsCrossed, label: "Eating Disorder", bgColor: "#F7FEE7", iconColor: "#84CC16", url: "https://app-mantra.com/therapy/eating-disorder/" },
  { id: "ocd", icon: RefreshCw, label: "OCD", bgColor: "#DBEAFE", iconColor: "#3B82F6", url: "/ocd-self-care" },
];

const mindfulnessCards: MindfulnessCard[] = [
  { id: "meditate", icon: BookOpen, label: "Meditate", subtitle: "Calm your mind" },
  { id: "sleep", icon: Video, label: "Sleep", subtitle: "Rest better" },
  { id: "relax", icon: FileText, label: "Relax", subtitle: "Unwind deeply" },
  { id: "music", icon: Heart, label: "Music", subtitle: "Soothing sounds" },
];

const toolCards: TopicCard[] = [
  { id: "box-breathing", icon: Wind, label: "Box Breathing", bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#00BCD4", url: "https://platform.mantracare.com/box_breathing/?lang=en" },
  { id: "gratitude-tracker", icon: Star, label: "Gratitude Tracker", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#F9A825", url: "https://platform.mantracare.com/gratitude_tracker/" },
  { id: "loving-kindness-meditation", icon: Heart, label: "Loving-Kindness Meditation", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", iconColor: "#EC407A", url: "https://platform.mantracare.com/metta-heart-guide/" },
  { id: "affirmations", icon: Smile, label: "Affirmations", bgColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", iconColor: "#AB47BC", url: "https://platform.mantracare.com/affirmations/?lang=en" },
  { id: "mindful-space", icon: Compass, label: "Mindful Space", bgColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconColor: "#66BB6A", url: "https://platform.mantracare.com/calm_space/" },
  { id: "letter-to-self", icon: Mail, label: "A Letter To Self", bgColor: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)", iconColor: "#FF9800", url: "https://platform.mantracare.com/letter_to_self/" },
];

export function SelfCareResources() {
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
                  Explore tools and guidance for your mental wellness journey
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

          {/* Wellness Guides */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4">Wellness Guides</h2>

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
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (topic.url) {
                          if (topic.url.startsWith("/")) {
                            router.push(topic.url);
                          } else {
                            window.open(topic.url, "_blank");
                          }
                        } else {
                          console.log(`Navigate to ${topic.id}`);
                        }
                      }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-md transition-all text-center"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                        style={{ backgroundColor: topic.bgColor }}
                      >
                        <IconComponent size={28} style={{ color: topic.iconColor }} />
                      </div>
                      <h3 className="text-[#1E293B] font-medium text-base">{topic.label}</h3>
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
