import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function JoanTeacherStory() {
  const router = useRouter();

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
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => router.push(-1)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#64748B] hover:text-[#043570] hover:bg-white/80 transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#64748B] mb-1">Clinical Case Study</p>
                <h1 className="text-2xl font-bold text-[#020817]">Joan — A Retired Teacher Who Couldn't Let Go</h1>
              </div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4 text-[#64748B] text-sm leading-relaxed">
              <p>
                Joan, a 58-year-old retired teacher, had struggled with hoarding for over 20 years. Her home was filled with newspapers, books, and various items she believed she might need someday. The clutter was so overwhelming that she had to navigate narrow pathways through her house.
              </p>

              <p>
                Joan's story is a powerful example of how hoarding can quietly take over a person's life over decades, without them fully realizing it. She was educated, capable, and caring — yet completely unable to let go of her possessions. The emotional attachment she felt to every item was real and overwhelming.
              </p>

              <p>
                Joan's breakthrough came when her daughter expressed concern about the safety and liveability of her home, fearing for her mother's health and well-being. This prompted Joan to seek help. She enlisted the help of a professional organiser and a therapist specialising in Cognitive Behavioural Therapy, who helped her create a step-by-step plan to declutter one room at a time.
              </p>

              <p>
                The results were life-changing. With a clean and organised home, Joan could perform basic daily tasks easily and efficiently — things she had struggled with for years, like cooking, cleaning, and simply moving around her house.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
