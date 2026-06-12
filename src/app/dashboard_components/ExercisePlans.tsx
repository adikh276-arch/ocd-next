import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle, Play, ChevronRight, ChevronLeft, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { FaDumbbell, FaRunning } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { QuickStartModal } from "./QuickStartModal";

interface ExercisePlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  exercises: number;
  difficulty: string;
  iconColor: string;
  iconBg: string;
  IconComponent: React.ComponentType<{ className?: string; size?: number }>;
  benefits: string[];
  exerciseList: string[];
}

const exercisePlans: ExercisePlan[] = [
  {
    id: "lower-back",
    title: "Lower back exercises",
    description: "Strengthen and stabilize your lower back",
    duration: "14 mins",
    frequency: "3x week",
    exercises: 6,
    difficulty: "Beginner",
    iconColor: "#EC4899",
    iconBg: "from-[#FCE7F3] to-[#FBCFE8]",
    IconComponent: FaDumbbell,
    benefits: ["Reduce pain", "Improve posture", "Build core strength"],
    exerciseList: [
      "Pelvic Tilts",
      "Cat-Cow Stretch",
      "Bird Dog Exercise",
      "Bridge Exercise",
      "Knee-to-Chest Stretch",
      "Superman Exercise"
    ]
  },
  {
    id: "neck-rehabilitation",
    title: "Neck rehabilitation",
    description: "Gentle exercises to relieve neck tension",
    duration: "8 mins",
    frequency: "Daily",
    exercises: 4,
    difficulty: "Gentle",
    iconColor: "#14B8A6",
    iconBg: "from-[#CCFBF1] to-[#99F6E4]",
    IconComponent: GiNightSleep,
    benefits: ["Reduce stiffness", "Improve flexibility", "Ease neck tension"],
    exerciseList: [
      "Neck Rotations",
      "Chin Tucks",
      "Side Neck Stretch",
      "Shoulder Shrugs"
    ]
  },
  {
    id: "upper-back",
    title: "Upper back exercises",
    description: "Strengthen your upper back and shoulders",
    duration: "12 mins",
    frequency: "3x week",
    exercises: 6,
    difficulty: "Moderate",
    iconColor: "#FB923C",
    iconBg: "from-[#FFF4ED] to-[#FFEDD5]",
    IconComponent: FaRunning,
    benefits: ["Improve posture", "Reduce tension", "Build strength"],
    exerciseList: [
      "Wall Angels",
      "Scapular Squeezes",
      "Thoracic Extension",
      "Resistance Band Rows",
      "Reverse Flys",
      "Prone Y-T-W Exercise"
    ]
  },
  {
    id: "shoulder-mobility",
    title: "Shoulder mobility",
    description: "Increase range of motion and flexibility",
    duration: "10 mins",
    frequency: "Daily",
    exercises: 5,
    difficulty: "Gentle",
    iconColor: "#3B82F6",
    iconBg: "from-[#DBEAFE] to-[#BFDBFE]",
    IconComponent: FaDumbbell,
    benefits: ["Increase mobility", "Reduce stiffness", "Prevent injury"],
    exerciseList: [
      "Arm Circles",
      "Pendulum Swings",
      "Cross-Body Stretch",
      "Doorway Stretch",
      "Shoulder Rolls"
    ]
  },
  {
    id: "core-strengthening",
    title: "Core strengthening",
    description: "Build a strong and stable core foundation",
    duration: "15 mins",
    frequency: "4x week",
    exercises: 8,
    difficulty: "Moderate",
    iconColor: "#EF4444",
    iconBg: "from-[#FEE2E2] to-[#FECACA]",
    IconComponent: FaRunning,
    benefits: ["Build core strength", "Improve stability", "Better balance"],
    exerciseList: [
      "Plank",
      "Side Plank",
      "Dead Bug",
      "Russian Twists",
      "Bicycle Crunches",
      "Leg Raises",
      "Mountain Climbers",
      "Bird Dog"
    ]
  },
  {
    id: "hip-flexibility",
    title: "Hip flexibility",
    description: "Improve hip mobility and reduce tightness",
    duration: "12 mins",
    frequency: "Daily",
    exercises: 6,
    difficulty: "Beginner",
    iconColor: "#A855F7",
    iconBg: "from-[#F3E8FF] to-[#E9D5FF]",
    IconComponent: GiNightSleep,
    benefits: ["Increase flexibility", "Reduce tightness", "Improve mobility"],
    exerciseList: [
      "Hip Circles",
      "Pigeon Pose",
      "Figure-4 Stretch",
      "Butterfly Stretch",
      "Hip Flexor Stretch",
      "Seated Hip Stretch"
    ]
  }
];

export function ExercisePlans() {
  const router = useRouter();
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [quickStartPlan, setQuickStartPlan] = useState<ExercisePlan | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F8FB]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNav />
        
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1000px] mx-auto p-4 md:p-6 lg:p-8 pt-[72px] md:pt-8">
            {/* Header - Standard Format */}
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
                  <Activity size={20} className="text-[#1E293B]" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl text-[#0f172b] font-medium">Recommended Exercise Plans</h1>
                  <p className="text-sm text-[#62748e] font-normal">
                    Personalized programs designed for your recovery journey
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Exercise Plans List */}
            <div className="space-y-4">
              {exercisePlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border shadow-sm overflow-hidden"
                >
                  {/* Plan Header */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-start gap-3 md:gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div 
                          className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${plan.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}
                        >
                          <plan.IconComponent 
                            className={`text-[${plan.iconColor}]`}
                            size={24}
                            style={{ color: plan.iconColor }}
                          />
                        </div>
                        <div 
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                          style={{ backgroundColor: plan.iconColor }}
                        >
                          {plan.exercises}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-[#043570] mb-1">
                          {plan.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#043570]/60 mb-2">
                          {plan.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-[#043570]/70">
                            {plan.exercises} exercises
                          </span>
                          <span className="text-[#E2E8F0]">•</span>
                          <span className="text-xs text-[#043570]/70">
                            {plan.duration}
                          </span>
                          <span className="text-[#E2E8F0]">•</span>
                          <span className="text-xs text-[#043570]/70">
                            {plan.frequency}
                          </span>
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: `${plan.iconColor}15`,
                              color: plan.iconColor
                            }}
                          >
                            {plan.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#043570]/80 mb-2">
                        Benefits / Goals
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {plan.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 bg-[#f3faff] text-[#043570]/70 rounded-full border"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Exercise List */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#043570]/80 mb-2">
                        Exercises
                      </p>
                      <div className="space-y-1.5">
                        {plan.exerciseList.map((exercise, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Circle size={14} className="text-[#043570]/20" strokeWidth={2} />
                            <span className="text-xs md:text-sm text-[#043570]/70">
                              {exercise}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all flex items-center justify-center gap-1.5 bg-white"
                        style={{ 
                          borderColor: plan.iconColor,
                          color: plan.iconColor
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${plan.iconColor}10`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                        onClick={() => setQuickStartPlan(plan)}
                      >
                        <Play size={14} /> Start
                      </motion.button>
                      <motion.button
                        onClick={() => router.push(`/exercise-details/neck-rotations`)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-white py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                        style={{ 
                          backgroundColor: plan.iconColor
                        }}
                      >
                        Details <ChevronRight size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom spacing */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>

      {/* Quick Start Modal */}
      {quickStartPlan && (
        <QuickStartModal
          isOpen={!!quickStartPlan}
          planTitle={quickStartPlan.title}
          planColor={quickStartPlan.iconColor}
          onClose={() => setQuickStartPlan(null)}
        />
      )}
    </div>
  );
}
