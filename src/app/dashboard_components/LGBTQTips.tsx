import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ChevronRight, Users, Shield, Leaf, Sparkles, Home, Moon } from "lucide-react";

interface Tip {
  id: string;
  icon: any;
  iconBg: string;
  title: string;
  description: string;
}

const tips: Tip[] = [
  {
    id: "community",
    icon: Users,
    iconBg: "from-[#A855F7] to-[#9333EA]",
    title: "Find Your Community",
    description: "Connection with people who get it can ease loneliness and fear.",
  },
  {
    id: "boundaries",
    icon: Shield,
    iconBg: "from-[#3B82F6] to-[#2563EB]",
    title: "Set Gentle Boundaries",
    description: "Protecting your energy isn't selfish — it's survival.",
  },
  {
    id: "identity",
    icon: Leaf,
    iconBg: "from-[#10B981] to-[#059669]",
    title: "Honor Your Identity",
    description: "Your identity is valid — even when the world questions it.",
  },
  {
    id: "self-talk",
    icon: Sparkles,
    iconBg: "from-[#F59E0B] to-[#D97706]",
    title: "Affirming Self-Talk",
    description: "Replace internalized shame with words that actually fit you.",
  },
  {
    id: "safe-spaces",
    icon: Home,
    iconBg: "from-[#EF4444] to-[#DC2626]",
    title: "Create Safe Spaces",
    description: "Build small pockets of safety — physical and emotional.",
  },
  {
    id: "grief",
    icon: Moon,
    iconBg: "from-[#06B6D4] to-[#0891B2]",
    title: "Process Grief & Loss",
    description: "Rejection and coming-out losses are real grief. Tend to them.",
  },
];

export function LGBTQTips() {
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F9F6FE] via-[#FBF8FF] to-[#F5F3FF]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#020817] hover:bg-white transition-all shadow-sm hover:shadow-md border border-gray-100"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </motion.button>
              <div>
                <h1 className="text-3xl md:text-4xl text-[#1E293B] font-bold tracking-tight">
                  Care for Your Whole Self
                </h1>
                <p className="text-base md:text-lg text-[#64748B] mt-2">
                  Small, gentle steps for LGBTQ+ wellbeing at your own pace.
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#BE51F5] via-[#EE4F84] to-[#F472B6] rounded-full"></div>
          </motion.div>

          {/* Tips List */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4 mb-12"
          >
            {tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <motion.button
                  key={tip.id}
                  variants={item}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (tip.id === "community") {
                      router.push("/find-your-community");
                    } else if (tip.id === "boundaries") {
                      router.push("/set-gentle-boundaries");
                    } else if (tip.id === "identity") {
                      router.push("/honor-your-identity");
                    } else if (tip.id === "self-talk") {
                      router.push("/affirming-self-talk");
                    } else if (tip.id === "safe-spaces") {
                      router.push("/create-safe-spaces");
                    } else if (tip.id === "grief") {
                      router.push("/process-grief-loss");
                    }
                  }}
                  className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-7 flex items-center gap-5 shadow-sm hover:shadow-xl transition-all border border-gray-100/50 hover:border-[#BE51F5]/20 group relative overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#BE51F5]/0 via-[#EE4F84]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${tip.iconBg} rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-110 duration-300`}>
                    <IconComponent className="text-white" size={32} strokeWidth={2} />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left relative z-10">
                    <h3 className="text-lg md:text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#BE51F5] transition-colors duration-300">
                      {tip.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
                      {tip.description}
                    </p>
                  </div>

                  {/* Arrow with animated background */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#F3E1FD] to-[#FAE8FF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <ChevronRight 
                        className="text-[#BE51F5] group-hover:translate-x-1 transition-transform duration-300" 
                        size={24}
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center py-8 md:py-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#BE51F5]/10 via-[#EE4F84]/10 to-[#F472B6]/10 rounded-2xl border border-[#BE51F5]/20">
              <Sparkles className="text-[#BE51F5]" size={20} />
              <p className="text-[#64748B] text-sm md:text-base font-medium">
                You're doing great. Take your time.
              </p>
              <Sparkles className="text-[#EE4F84]" size={20} />
            </div>
          </motion.div>

          {/* Decorative background elements */}
          <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#BE51F5]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#EE4F84]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
        </main>
      </div>
    </div>
  );
}
