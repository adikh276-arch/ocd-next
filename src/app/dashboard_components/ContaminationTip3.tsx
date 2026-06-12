import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Lightbulb } from "lucide-react";

export function ContaminationTip3() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lightbulb size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#10B981] mb-1">Tip #3</p>
                <h1 className="text-2xl font-bold text-[#020817]">Identify and Stop Avoidance Behaviors</h1>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4 text-[#64748B] text-sm leading-relaxed">
              <p>
                Avoidance is one of the most sneaky and damaging aspects of contamination OCD because it feels like common sense — if touching the elevator button makes you anxious, simply avoiding it seems like a perfectly logical solution. But avoidance is actually a compulsion in disguise, and every time you avoid a trigger, you strengthen the OCD loop and shrink your world a little more.
              </p>

              <p>
                Over time, avoidance in contamination OCD can become severely limiting. People stop using public restrooms, refuse to shake hands, avoid hospitals, refuse to cook food for fear of contaminating it, stop visiting friends and family, or quit jobs that require contact with the public. What begins as avoiding one or two specific triggers can expand to avoiding entire environments, activities, and relationships.
              </p>

              <p>
                The first step to tackling avoidance is to make a list of everything you currently avoid because of contamination fears. Be specific and honest — this list is for your eyes only. Then, rank each item from least to most anxiety-provoking and begin working through them one by one, starting from the bottom of the list. Each time you face an avoided situation without performing a compulsion, you take back a piece of your life from OCD.
              </p>

              <p>
                It is also worth noting that mental avoidance counts too — reassuring yourself that something is probably not contaminated, distracting yourself to avoid the discomfort, or mentally "undoing" a contamination thought are all forms of avoidance that maintain the cycle just as much as physical avoidance does.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
