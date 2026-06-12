import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, BookOpen, Clock, Play, FileText, Award, ChevronRight } from "lucide-react";

export function DiabetesAcademy() {
  const router = useRouter();

  const exploreCards = [
    {
      title: "Glycemic Index",
      subtitle: "Track & understand GI values",
      icon: Clock,
      color: "#FF6B35",
      bgColor: "#FFF4F0",
    },
    {
      title: "Videos",
      subtitle: "Watch expert tutorials",
      icon: Play,
      color: "#9333EA",
      bgColor: "#F3E8FF",
    },
    {
      title: "Q & A",
      subtitle: "Get answers from experts",
      icon: FileText,
      color: "#00c0ff",
      bgColor: "#E0F7FF",
    },
    {
      title: "Quick Tips",
      subtitle: "Daily health insights",
      icon: Award,
      color: "#10B981",
      bgColor: "#ECFDF5",
    },
  ];

  const resources = [
    {
      title: "Knowing Diabetes",
      subtitle: "Know about what you are dealing with",
      icon: BookOpen,
      iconColor: "#043570",
      iconBg: "#E3F2FD",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
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
                <BookOpen size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Diabetes Academy</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Learn everything you need to know about diabetes management
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Explore Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-[#043570]">Explore</h2>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
              >
                {exploreCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.button
                      key={card.title}
                      variants={item}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-2xl p-5 md:p-6 flex flex-col items-center text-center border border-[#E2E8F0] hover:border-[#00c0ff]/30 hover:shadow-lg transition-all group"
                    >
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: card.bgColor }}
                      >
                        <Icon size={32} style={{ color: card.color }} strokeWidth={2} />
                      </div>
                      <h3 className="font-semibold text-[#043570] mb-1 text-sm md:text-base">{card.title}</h3>
                      <p className="text-xs text-[#64748B]">{card.subtitle}</p>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-[#043570]">Resources</h2>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full"
              >
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.button
                      key={resource.title}
                      variants={item}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white rounded-2xl p-5 flex items-center gap-4 border border-[#E2E8F0] hover:border-[#00c0ff]/30 hover:shadow-md transition-all group text-left"
                    >
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: resource.iconBg }}
                      >
                        <Icon size={24} style={{ color: resource.iconColor }} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#043570] mb-1 text-sm md:text-base">{resource.title}</h3>
                        <p className="text-xs text-[#64748B] line-clamp-1">{resource.subtitle}</p>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[#64748B] group-hover:text-[#00c0ff] group-hover:translate-x-1 transition-all flex-shrink-0"
                      />
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Additional Learning Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8"
            >
              <div className="bg-gradient-to-br from-[#043570] to-[#065a9e] rounded-2xl p-6 md:p-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Ready to Learn More?</h3>
                    <p className="text-white/80 text-sm md:text-base mb-6">
                      Access our comprehensive diabetes education program with personalized learning paths
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-[#043570] px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
                    >
                      Start Learning
                    </motion.button>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen size={48} className="text-white/80" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
