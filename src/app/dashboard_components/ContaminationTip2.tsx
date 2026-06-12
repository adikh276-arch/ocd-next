import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Lightbulb } from "lucide-react";

export function ContaminationTip2() {
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
                <p className="text-sm text-[#10B981] mb-1">Tip #2</p>
                <h1 className="text-2xl font-bold text-[#020817]">Reduce Washing and Cleaning Rituals Gradually</h1>
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
                One of the most defining features of contamination OCD is excessive washing — of hands, body, surfaces, clothes, or objects. While washing is a normal and healthy behavior, in contamination OCD it becomes a compulsion that provides only temporary relief before the anxiety returns, often stronger than before. The goal of recovery is not to stop washing entirely, but to bring washing back to a healthy, functional level.
              </p>

              <p>
                A practical approach is ritual delay — instead of washing immediately after a trigger, you delay the ritual by a set amount of time. Start with just 5 minutes, then gradually increase to 10, 20, and eventually an hour or more. During this delay, resist the urge and allow the anxiety to rise and fall naturally. Over time you will discover something powerful — the anxiety does peak, but it always comes back down, even without washing. This teaches your brain that washing is not actually what makes you safe.
              </p>

              <p>
                Another strategy is ritual reduction — gradually shortening your washing rituals rather than eliminating them all at once. If you currently wash your hands for 5 minutes, reduce it to 4, then 3, then 2, working toward a normal 20–30 second wash. This slow, consistent reduction is far more sustainable than trying to stop cold turkey, which can lead to overwhelming anxiety and relapse.
              </p>

              <p>
                It is important to be honest with yourself about which washing behaviors are truly hygiene-related and which are compulsive. If you are washing the same area repeatedly, washing in a rigid or ritualistic way, or feeling like the washing never feels "complete enough," those are signs of OCD compulsions — not healthy hygiene practices.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
