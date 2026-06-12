import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function BrainBehindHoardingStory() {
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
                <p className="text-sm text-[#64748B] mb-1">Clinical Neuroscience Study</p>
                <h1 className="text-2xl font-bold text-[#020817]">The Brain Behind the Hoarding — Three Clinical Cases</h1>
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
                This account comes from a neuroscientist and clinician who shares three real cases from their practice, offering a rare window into what hoarding actually looks and feels like from the inside — and what recovery requires at a brain level.
              </p>

              <p>
                These stories highlight the emotional weight of hoarding, the mental roadblocks that keep people stuck, and how neuroscience-backed techniques helped them regain control. Hoarding disorder is often misunderstood as just a habit of accumulating too much stuff, but in reality it is a deeply ingrained psychological and neurological condition.
              </p>

              <p>
                One of the most striking insights from these cases is how the brain of someone with hoarding disorder physically responds differently when asked to discard possessions. Studies from the University of California, San Diego show that people diagnosed with hoarding disorder experience extreme distress when discarding objects, even those with no real value — and this heightened emotional response reinforces compulsive accumulation, trapping individuals in a self-perpetuating cycle.
              </p>

              <p>
                The good news from these cases is that through neuroplasticity, individuals with hoarding disorder can learn how to rewire their thought patterns and regain control over their environment — and that small victories like donating a single item, clearing one surface, or resisting the urge to bring something unnecessary home begin to reshape neural pathways over time.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
