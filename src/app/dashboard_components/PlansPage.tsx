import { motion } from "framer-motion";
import {
  Brain,
  MessageCircle,
  Users,
  HeartPulse,
  Heart,
  Dumbbell,
  Apple,
  Salad,
  Activity,
  Stethoscope,
  Pill,
  Cigarette,
  Package,
  ArrowLeft,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Program {
  id: string;
  name: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

interface Category {
  title: string;
  description: string;
  bgColor: string;
  programs: Program[];
}

const CATEGORIES: Category[] = [
  {
    title: "Mental Wellbeing",
    description: "Skills for psychologists, therapists, and psychiatrists.",
    bgColor: "bg-[#F3F4FF]",
    programs: [
      {
        id: "individual-therapy",
        name: "Individual/Group Therapy",
        description: "Trial and group sessions for therapy.",
        icon: Brain,
        iconBg: "bg-[#6366F1]",
        iconColor: "text-white",
      },
      {
        id: "counseling-internal",
        name: "Counseling (by Interns)",
        description: "Counseling from young interns at 1/3 the cost.",
        icon: MessageCircle,
        iconBg: "bg-[#06B6D4]",
        iconColor: "text-white",
      },
      {
        id: "psychiatry",
        name: "Psychiatry",
        description: "Medication management for mental health.",
        icon: Users,
        iconBg: "bg-[#8B5CF6]",
        iconColor: "text-white",
      },
      {
        id: "lgbtq-counseling",
        name: "LGBTQ+ Counseling",
        description: "LGBTQ-affirmative emotional support.",
        icon: Heart,
        iconBg: "bg-[#A78BFA]",
        iconColor: "text-white",
      },
    ],
  },
  {
    title: "Emotional Wellbeing",
    description: "Center for your mind, emotions, and personal growth.",
    bgColor: "bg-[#F0F9FF]",
    programs: [
      {
        id: "psychiatric-assessment",
        name: "Psychiatric/Clinical Assessment",
        description: "Evaluations for accurate diagnosis.",
        icon: Stethoscope,
        iconBg: "bg-[#3B82F6]",
        iconColor: "text-white",
      },
      {
        id: "mindfulness-yoga",
        name: "Mindfulness/Yoga",
        description: "Breath work & yoga & mindfulness.",
        icon: Activity,
        iconBg: "bg-[#EC4899]",
        iconColor: "text-white",
      },
      {
        id: "ocd-care",
        name: "OCD Care",
        description: "Manage obsessive thoughts (using).",
        icon: Brain,
        iconBg: "bg-[#06B6D4]",
        iconColor: "text-white",
      },
      {
        id: "coaching",
        name: "Coaching",
        description: "Evidence based skills for behaviour coaching.",
        icon: Users,
        iconBg: "bg-[#A855F7]",
        iconColor: "text-white",
      },
    ],
  },
  {
    title: "Physical Wellbeing",
    description: "Strengthen your body and enjoy good health.",
    bgColor: "bg-[#F0FDF4]",
    programs: [
      {
        id: "diabetes-consult",
        name: "Diabetes Consult",
        description: "Comprehensive diabetic care.",
        icon: Activity,
        iconBg: "bg-[#10B981]",
        iconColor: "text-white",
      },
      {
        id: "nutrition-weight",
        name: "Nutrition/Weight",
        description: "Get your weight.",
        icon: Apple,
        iconBg: "bg-[#8B5CF6]",
        iconColor: "text-white",
      },
      {
        id: "womens-wellness",
        name: "Women's Wellness",
        description: "PCOS, reproductive, maternity & more!",
        icon: HeartPulse,
        iconBg: "bg-[#F59E0B]",
        iconColor: "text-white",
      },
      {
        id: "fitness",
        name: "Fitness",
        description: "Stay active, feel strong.",
        icon: Dumbbell,
        iconBg: "bg-[#EC4899]",
        iconColor: "text-white",
      },
    ],
  },
  {
    title: "Specialised Care",
    description: "Focused programs for unique conditions.",
    bgColor: "bg-[#FFF7ED]",
    programs: [
      {
        id: "diabetes",
        name: "Diabetes",
        description: "Diabetic-reverse meals smart.",
        icon: Salad,
        iconBg: "bg-[#F97316]",
        iconColor: "text-white",
      },
      {
        id: "physiotherapy",
        name: "Physiotherapy",
        description: "Restore your body's mobility.",
        icon: Activity,
        iconBg: "bg-[#3B82F6]",
        iconColor: "text-white",
      },
      {
        id: "hypertension",
        name: "Hypertension",
        description: "Fresh care for blood pressure related.",
        icon: HeartPulse,
        iconBg: "bg-[#06B6D4]",
        iconColor: "text-white",
      },
      {
        id: "substance-use",
        name: "Substance Use",
        description: "Quit smoking, vaping, and tobacco.",
        icon: Cigarette,
        iconBg: "bg-[#8B5CF6]",
        iconColor: "text-white",
      },
    ],
  },
];

export function PlansPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navigation */}
        <MobileNav />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <button
                onClick={() => router.push(-1)}
                className="flex items-center gap-2 text-[#64748B] hover:text-[#043570] mb-4 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0 self-center">
                  <Package size={20} className="text-[#1E293B]" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl text-[#0f172b] font-medium">Wellness Programs</h1>
                  <p className="text-sm text-[#62748e] font-normal">
                    Discover expert-led programs for mind, body, and specialized health
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
              {CATEGORIES.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  className={`${category.bgColor} rounded-2xl p-6 shadow-sm`}
                >
                  {/* Category Header */}
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
                      {category.title}
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      {category.description}
                    </p>
                  </div>

                  {/* Programs List */}
                  <div className="space-y-3">
                    {category.programs.map((program, programIndex) => {
                      const IconComponent = program.icon;
                      return (
                        <motion.button
                          key={program.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: categoryIndex * 0.1 + programIndex * 0.05,
                          }}
                          onClick={() => {
                            // Navigate to therapy plans page for all programs
                            router.push("/therapy-plans");
                          }}
                          className="w-full bg-white rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-all group"
                        >
                          {/* Icon */}
                          <div
                            className={`w-10 h-10 rounded-full ${program.iconBg} flex items-center justify-center flex-shrink-0`}
                          >
                            <IconComponent
                              size={18}
                              className={program.iconColor}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-left">
                            <h3 className="text-sm font-semibold text-[#0F172A] mb-0.5 group-hover:text-[#00c0ff] transition-colors">
                              {program.name}
                            </h3>
                            <p className="text-xs text-[#64748B] leading-relaxed">
                              {program.description}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
