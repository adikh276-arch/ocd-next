import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function TrichArticle2() {
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
                <p className="text-sm text-[#64748B] mb-1">ScienceDirect (Cognitive and Behavioral Practice Journal), 2025</p>
                <h1 className="text-2xl font-bold text-[#020817]">Psychosocial Treatment of Trichotillomania — A Review</h1>
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
                This article is a thorough academic review of all the psychological treatments that have been studied for trichotillomania — making it an invaluable resource for therapists, researchers, and anyone wanting to understand what recovery actually involves.
              </p>

              <p>
                There are six treatments that have been studied for trichotillomania — including habit reversal training (HRT), ACT-enhanced behavior therapy (A-EBT), dialectical behavior therapy (DBT), enhanced cognitive behavioral therapy, comprehensive behavioral treatment (ComB), and metacognitive therapy (MCT) — and of these, acceptance-enhanced behavior therapy has the most empirical support.
              </p>

              <p>
                The article is honest about the current state of research, noting that trichotillomania can be an impactful disorder, yet compared to a multitude of diagnoses, intervention research is notably underdeveloped — particularly for youth, where treatments have limited empirical support.
              </p>

              <p>
                This is a must-read for anyone who wants to understand exactly which therapies work, for whom, and why — backed by decades of clinical trial data.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
