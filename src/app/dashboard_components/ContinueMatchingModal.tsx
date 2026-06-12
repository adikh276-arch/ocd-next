import { X, Sparkles, Headphones, Clock, Award, ChevronRight, Play, Calendar, MessageCircle, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface ContinueMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const intakeTasks = [
  {
    id: "1",
    title: "How TherapyMantra Works?",
    description: "Watch this short video to see how TherapyMantra can support your mental well-being!",
    icon: Play,
    iconColor: "text-[#00c0ff]",
    bgColor: "bg-[#E0F2FE]",
  },
  {
    id: "2",
    title: "How to Book & Join a Session",
    description: "Learn how to easily book and join a session in just a few simple steps.",
    icon: Calendar,
    iconColor: "text-[#00c0ff]",
    bgColor: "bg-[#E0F2FE]",
  },
  {
    id: "3",
    title: "How can Therapy Help?",
    description: "Therapy offers a safe space to understand your thoughts and emotions, build healthy coping strategies",
    icon: MessageCircle,
    iconColor: "text-[#00c0ff]",
    bgColor: "bg-[#E0F2FE]",
  },
  {
    id: "4",
    title: "Create Your Personalized Wellbeing Plan",
    description: "Get a personalized mental well-being plan tailored to your goals and needs.",
    icon: ClipboardList,
    iconColor: "text-[#00c0ff]",
    bgColor: "bg-[#E0F2FE]",
  },
];

export function ContinueMatchingModal({ isOpen, onClose }: ContinueMatchingModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="bg-[#F0F4F8] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/50 text-[#64748B] transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="px-8 py-10">
                {/* Icon with underline */}
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <Sparkles size={32} className="text-[#00c0ff] mb-2" />
                    <div className="w-12 h-1 bg-[#00c0ff] rounded-full" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-semibold text-[#043570] mb-3">
                  While we're matching you with an expert, we recommend exploring these:
                </h2>

                {/* Subtitle Message */}
                <p className="text-center text-sm text-[#00c0ff] mb-8 font-medium">
                  Complete the intake tasks in the meanwhile
                </p>

                {/* Tasks List */}
                <div className="space-y-4 mb-6">
                  {intakeTasks.map((task, index) => (
                    <motion.button
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all text-left border-l-4 border-[#00c0ff] group"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 bg-[#E0F2FE] rounded-full flex items-center justify-center flex-shrink-0">
                        <task.icon size={24} className="text-[#00c0ff]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#00c0ff] mb-2">
                          {task.title}
                        </h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          {task.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight size={20} className="text-[#CBD5E1] group-hover:text-[#00c0ff] transition-colors flex-shrink-0" />
                    </motion.button>
                  ))}
                </div>

                {/* View All Link */}
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      onClose();
                      router.push('/tasks');
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-[#00c0ff] hover:text-[#0284c7] transition-colors"
                  >
                    <span>View All</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
