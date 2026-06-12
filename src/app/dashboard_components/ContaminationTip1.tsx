import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Lightbulb } from "lucide-react";

export function ContaminationTip1() {
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
                <p className="text-sm text-[#10B981] mb-1">Tip #1</p>
                <h1 className="text-2xl font-bold text-[#020817]">Use ERP — Face the Fear Without Performing the Compulsion</h1>
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
                Exposure and Response Prevention (ERP) is the single most effective tool for contamination OCD and should be the foundation of any recovery plan. The core idea is simple but deeply challenging — you deliberately expose yourself to the things that trigger your contamination fear, and then resist the urge to wash, clean, avoid, or seek reassurance.
              </p>

              <p>
                For someone with contamination OCD, this might look like touching a doorknob and not washing your hands afterward, sitting with the discomfort of feeling "dirty" until the anxiety naturally subsides on its own. This process is called habituation — the brain gradually learns that the feared outcome does not happen, and that the anxiety, while deeply uncomfortable, is not dangerous and will pass.
              </p>

              <p>
                ERP works best when done in a gradual, structured way — starting with situations that cause mild anxiety and slowly working up to more challenging ones. This is called building an anxiety hierarchy or fear ladder. For example, touching your own belongings might be a low-level exposure, while touching a public toilet handle without washing might be near the top of the ladder. The key is to resist the compulsion at every step — because every time you wash or avoid, you teach your brain that the fear was justified and the compulsion was necessary.
              </p>

              <p>
                Working with a trained ERP therapist is highly recommended, but even beginning to delay your washing rituals by just a few minutes is a meaningful first step in breaking the contamination OCD cycle.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
