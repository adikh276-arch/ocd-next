import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, MessageCircle, BookOpen, Video, FileText, Heart, Shield, ChevronRight, ChevronDown, Sparkles, Target, Award, Crown, Clock, Timer, Activity, Music, Moon, Sunrise, Headphones } from "lucide-react";
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

interface YogaLevelCard {
  id: string;
  icon: any;
  label: string;
}

interface DurationCard {
  id: string;
  icon: any;
  label: string;
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
  { id: "beginner", icon: Sparkles, label: "Beginner Tour", image: "https://images.unsplash.com/photo-1758599879910-3e67dc9a40b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWdpbm5lciUyMHlvZ2ElMjBwb3NlJTIwbWF0fGVufDF8fHx8MTc3MzE0MTg1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "flexibility", icon: Activity, label: "Increase Flexibility", image: "https://images.unsplash.com/photo-1597768233422-18832f306895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHlvZ2ElMjBmbGV4aWJpbGl0eSUyMHN0cmV0Y2h8ZW58MXx8fHwxNzczMTQxODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "tone", icon: Target, label: "Tone Up", image: "https://images.unsplash.com/photo-1758599879661-a656f9678ce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY29yZSUyMHN0cmVuZ3RoJTIwd29ya291dHxlbnwxfHx8fDE3NzMxNDE4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "healthcare", icon: Heart, label: "Health Care", image: "https://images.unsplash.com/photo-1722094250550-4993fa28a51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHlvZ2ElMjBtZWRpdGF0aW9uJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzczMTQxODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const yogaLevelCards: YogaLevelCard[] = [
  { id: "beginner", icon: Sparkles, label: "Beginner" },
  { id: "intermediate", icon: Target, label: "Intermediate" },
  { id: "advanced", icon: Award, label: "Advanced" },
  { id: "expert", icon: Crown, label: "Expert" },
];

const durationCards: DurationCard[] = [
  { id: "0-10", icon: Clock, label: "0-10 mins" },
  { id: "10-20", icon: Timer, label: "10-20 mins" },
  { id: "20-30", icon: Activity, label: "20-30 mins" },
  { id: "30-plus", icon: Award, label: "30+ mins" },
];

const mindfulnessCards: MindfulnessCard[] = [
  { id: "meditate", icon: Sunrise, label: "Meditate", subtitle: "Calm your mind" },
  { id: "sleep", icon: Moon, label: "Sleep", subtitle: "Rest better" },
  { id: "relax", icon: Heart, label: "Relax", subtitle: "Unwind deeply" },
  { id: "music", icon: Headphones, label: "Music", subtitle: "Soothing sounds" },
];

export function YogaSelfCare() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
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
                <MessageCircle size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Self-Care Resources</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Explore tools and guidance for your wellness journey
                </p>
              </div>
            </div>
          </motion.div>

          {/* Choose Your Yoga Level */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#043570]">Choose Your Yoga Level</h2>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {yogaLevelCards.map((level, index) => {
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
              <h2 className="text-xl font-semibold text-[#043570]">Categories</h2>
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
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Duration */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#043570]">Duration</h2>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {durationCards.map((duration, index) => {
                  const IconComponent = duration.icon;
                  
                  return (
                    <motion.button
                      key={duration.id}
                      variants={item}
                      layout
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        console.log(`Navigate to ${duration.id}`);
                      }}
                      className="bg-white rounded-2xl px-4 py-3.5 hover:shadow-lg shadow-sm transition-all flex items-center gap-3 border border-[#E2E8F0]"
                    >
                      <div className="w-10 h-10 bg-[#E0F2FE] rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent size={20} className="text-[#0284c7]" strokeWidth={2.5} />
                      </div>
                      <span className="text-[#043570] font-medium text-sm whitespace-nowrap">{duration.label}</span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mindfulness Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#043570]">Mindfulness</h2>
              <button
                onClick={() => router.push("/service/meditation")}
                className="flex items-center gap-1 text-sm text-[#00c0ff] hover:text-[#0284c7] font-semibold transition-colors group"
              >
                Explore
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {mindfulnessCards.map((card, index) => {
                const IconComponent = card.icon;
                
                return (
                  <motion.button
                    key={card.id}
                    variants={item}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (card.id === "meditate" || card.id === "sleep" || card.id === "relax") {
                        router.push("/service/meditation");
                      }
                    }}
                    className="bg-white rounded-2xl p-6 hover:shadow-2xl shadow-md transition-all text-center group border border-[#E2E8F0]/50 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff]/0 to-[#00c0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-16 h-16 bg-[#E0F2FE] rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all group-hover:scale-110 group-hover:rotate-3 relative z-10">
                      <IconComponent size={28} className="text-[#0284c7]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[#043570] font-semibold text-sm mb-1 relative z-10">{card.label}</h3>
                    <p className="text-[#64748B] text-xs relative z-10">{card.subtitle}</p>
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
