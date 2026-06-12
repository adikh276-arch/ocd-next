import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Play,
  Circle,
  Smile,
  Sparkles,
  Star,
  Heart,
  Brain,
  Mail,
  FileText,
  Lightbulb,
  BookOpen,
  Info,
  ChevronRight
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
const depressionIcon = "/dashboard_assets/9bf1f8df86a3e4ea2495de00da50989960d460f4.png";

interface ExerciseCard {
  id: string;
  icon: any;
  label: string;
  iconColor: string;
  bgColor: string;
  url: string;
}

interface TodoCard {
  id: string;
  icon: any;
  label: string;
  iconColor: string;
  bgColor: string;
  url: string;
}

interface ResourceItem {
  id: string;
  icon: any;
  label: string;
  iconColor: string;
  bgColor: string;
  url: string;
}

const exerciseCards: ExerciseCard[] = [
  { id: "grounding", icon: Circle, label: "5-4-3-2-1 Grounding", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/5-4-3-2-1-grounding" },
  { id: "guided-imagery", icon: Play, label: "Guided Imagery", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.org/ocd/guided_imagery?lang=en" },
  { id: "affirmations", icon: Smile, label: "Affirmations", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/affirmations/?lang=en" },
  { id: "joyful-activities", icon: Sparkles, label: "Joyful Activities", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/joyful_activities/?lang=en" },
];

const todoCards: TodoCard[] = [
  { id: "gratitude-tracker", icon: Star, label: "Gratitude Tracker", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://web.mantracare.com/app/gratitude_tracker" },
  { id: "daily-self-care", icon: Heart, label: "Daily Self Care Tracker", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://web.mantracare.com/app/daily_self_care_tracker" },
  { id: "brain-dump", icon: Brain, label: "Brain Dump & Sort", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://web.mantracare.com/app/brain_dump_and_sort" },
  { id: "letter-to-self", icon: Mail, label: "Letter to Self", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://web.mantracare.com/app/letter_to_self" },
];

const resourceItems: ResourceItem[] = [
  { id: "articles", icon: FileText, label: "Articles", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/depression_articles/?lang=en" },
  { id: "tips", icon: Lightbulb, label: "Tips", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/depression_tips/?lang=en" },
  { id: "stories", icon: BookOpen, label: "Stories", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/depression_stories/?lang=en" },
  { id: "myths", icon: Info, label: "Myths", iconColor: "#3B82F6", bgColor: "#EFF6FF", url: "https://platform.mantracare.com/depression_myths/?lang=en" },
];

export function DepressionPage() {
  const router = useRouter();

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
              <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={depressionIcon} alt="Depression" className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b]">Depression</h1>
                <p className="text-sm text-[#62748e]">
                  Evidence-based exercises and resources to help you manage depression symptoms and build resilience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Guided Series */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <button
              onClick={() => window.open("https://app.mantracare.com/therapy/depression/depr-guided-series/", "_blank")}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Play size={24} className="text-[#3B82F6]" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-[#0f172b] font-medium">Guided Series</h3>
                  <p className="text-sm text-[#62748e]">Step-by-step guided program</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#94A3B8] group-hover:text-[#043570] transition-colors" />
            </button>
          </motion.div>

          {/* Exercises */}
          <div className="mb-8">
            <h2 className="text-lg text-[#0f172b] mb-4">Exercises</h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {exerciseCards.map((exercise) => {
                const IconComponent = exercise.icon;
                return (
                  <motion.button
                    key={exercise.id}
                    variants={item}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(exercise.url, "_blank")}
                    className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-all text-left"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: exercise.bgColor }}
                    >
                      <IconComponent size={24} style={{ color: exercise.iconColor }} strokeWidth={2} />
                    </div>
                    <h3 className="text-[#1E293B] text-sm">{exercise.label}</h3>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* To Do's */}
          <div className="mb-8">
            <h2 className="text-lg text-[#0f172b] mb-4">To Do's</h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {todoCards.map((todo) => {
                const IconComponent = todo.icon;
                return (
                  <motion.button
                    key={todo.id}
                    variants={item}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(todo.url, "_blank")}
                    className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-all text-left"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: todo.bgColor }}
                    >
                      <IconComponent size={24} style={{ color: todo.iconColor }} strokeWidth={2} />
                    </div>
                    <h3 className="text-[#1E293B] text-sm">{todo.label}</h3>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Resources */}
          <div className="mb-8">
            <h2 className="text-lg text-[#0f172b] mb-4">Resources</h2>

            <motion.div
              className="space-y-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {resourceItems.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <motion.button
                    key={resource.id}
                    variants={item}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(resource.url, "_blank")}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: resource.bgColor }}
                      >
                        <IconComponent size={24} style={{ color: resource.iconColor }} strokeWidth={2} />
                      </div>
                      <h3 className="text-[#1E293B]">{resource.label}</h3>
                    </div>
                    <ChevronRight size={20} className="text-[#94A3B8] group-hover:text-[#043570] transition-colors" />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
