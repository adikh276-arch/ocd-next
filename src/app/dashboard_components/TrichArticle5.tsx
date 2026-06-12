import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function TrichArticle5() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#A855F7] to-[#9333EA] rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#64748B] mb-1">Psychology International (MDPI), April 2024</p>
                <h1 className="text-2xl font-bold text-[#020817]">Behavioral and Pharmacological Treatments for Trichotillomania</h1>
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
                This open-access review from Rocky Vista University is ideal for anyone wanting a complete, balanced, and accessible overview of both psychological and medication-based treatments for trichotillomania — all in one place.
              </p>

              <p>
                Trichotillomania is a psychiatric disorder involving chronic, recurrent urges to pull out one's own hair, arising frequently in childhood and early adolescence — predominantly affecting women and carrying a high co-morbidity with many other psychiatric conditions. Currently, the etiology is unknown, which makes treating TTM extremely difficult.
              </p>

              <p>
                On the treatment front, the review is clear about what works best: of the behavioral interventions, cognitive behavioral therapy (CBT) and habit reversal training (HRT) have demonstrated the greatest improvements in hair-pulling severity, with HRT showing the most efficacy for long-term maintenance of progress.
              </p>

              <p>
                The article also points to an exciting direction for future research: future research directions include larger placebo-controlled pharmacological trials, exploring the efficacy of combined behavioral and pharmacological approaches compared to monotherapy, and delving into the potential genetic and neurochemical contributions that may underlie TTM.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
