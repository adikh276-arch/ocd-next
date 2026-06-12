import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { GiFemale, GiMeditation } from "react-icons/gi";
import { FaBaby, FaBrain, FaAppleAlt, FaBabyCarriage, FaNotesMedical, FaSeedling, FaUserClock } from "react-icons/fa";

interface TopicCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  iconColor: string;
  circleBg: string;
}

const topicCards: TopicCard[] = [
  { id: "pcos", icon: GiFemale, label: "PCOS", bgColor: "bg-[#FCE7F3]", iconColor: "text-[#EC4899]", circleBg: "bg-[#FBCFE8]" },
  { id: "reproductive-health", icon: FaBaby, label: "Reproductive Health", bgColor: "bg-[#F3E8FF]", iconColor: "text-[#A855F7]", circleBg: "bg-[#E9D5FF]" },
  { id: "mental-health", icon: FaBrain, label: "Mental Health", bgColor: "bg-[#E0F2FE]", iconColor: "text-[#0EA5E9]", circleBg: "bg-[#BAE6FD]" },
  { id: "nutrition-weight", icon: FaAppleAlt, label: "Nutrition & Weight", bgColor: "bg-[#FFF4ED]", iconColor: "text-[#FB923C]", circleBg: "bg-[#FED7AA]" },
  { id: "pregnancy-postpartum", icon: FaBabyCarriage, label: "Pregnancy & Postpartum", bgColor: "bg-[#DCFCE7]", iconColor: "text-[#22C55E]", circleBg: "bg-[#BBF7D0]" },
  { id: "medical-conditions", icon: FaNotesMedical, label: "Medical Conditions", bgColor: "bg-[#F1F5F9]", iconColor: "text-[#64748B]", circleBg: "bg-[#E2E8F0]" },
  { id: "fertility", icon: FaSeedling, label: "Fertility", bgColor: "bg-[#FCE7F3]", iconColor: "text-[#EC4899]", circleBg: "bg-[#FBCFE8]" },
  { id: "menopause", icon: FaUserClock, label: "Menopause", bgColor: "bg-[#CCFBF1]", iconColor: "text-[#14B8A6]", circleBg: "bg-[#99F6E4]" },
];

export function WomenWellnessSelfCare() {
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

          {/* What's on your mind? */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4">Find support for your health</h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
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
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        console.log(`Navigate to ${topic.id}`);
                      }}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:border-[#3B82F6]/40 hover:shadow-lg transition-all text-center group"
                    >
                      <div className={`w-full aspect-square ${topic.bgColor} rounded-2xl flex items-center justify-center mb-3 relative`}>
                        <div className={`w-16 h-16 rounded-full ${topic.circleBg} flex items-center justify-center transition-all group-hover:scale-110`}>
                          <IconComponent size={32} className={topic.iconColor} strokeWidth={2} />
                        </div>
                      </div>
                      <h3 className="text-[#475569] font-medium text-base">{topic.label}</h3>
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
