import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Lightbulb } from "lucide-react";

export function ContaminationTip4() {
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
                <p className="text-sm text-[#10B981] mb-1">Tip #4</p>
                <h1 className="text-2xl font-bold text-[#020817]">Manage the Mental Side — Challenge Contamination Thinking</h1>
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
                Contamination OCD is not just a behavioral problem — it is also driven by deeply ingrained patterns of thinking that make the fear feel real and urgent even when logic suggests otherwise. Learning to recognize and challenge these thinking patterns is a vital part of recovery alongside behavioral work.
              </p>

              <p>
                Some of the most common contamination OCD thought patterns include magical thinking — the belief that something can be contaminated simply by proximity or association, even without any logical mechanism. For example, believing that a shirt worn during a stressful situation is now permanently "contaminated" with bad feelings or danger. Another common pattern is catastrophizing — automatically jumping to the worst possible outcome, such as assuming that touching a surface in a public place will inevitably lead to serious illness.
              </p>

              <p>
                Thought defusion, a technique from Acceptance and Commitment Therapy (ACT), can be extremely helpful here. Instead of arguing with the contamination thought or trying to prove it wrong, you simply observe it from a distance — "I am noticing a thought telling me this is contaminated. This is OCD talking, not reality." This creates a small but important gap between you and the thought, reducing its power without requiring you to engage in a mental debate that OCD almost always wins.
              </p>

              <p>
                Keeping a thought record — writing down the trigger, the thought, how believable it felt, and what actually happened — can also be powerful over time. Looking back at previous entries and seeing that feared outcomes never came true gradually erodes the brain's belief that contamination fears are credible warnings rather than OCD noise.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
