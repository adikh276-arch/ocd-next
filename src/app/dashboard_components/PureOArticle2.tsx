import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function PureOArticle2() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#3B82F6] mb-1">PMC — National Institutes of Health (NIH)</p>
                <h1 className="text-2xl font-bold text-[#020817]">The Myth of the Pure Obsessional Type in OCD</h1>
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
                This is a landmark scientific study that challenges the very foundation of the "Pure O" label — making it one of the most important and thought-provoking articles in the field. It is essential reading for clinicians, researchers, and anyone who wants a deeper, evidence-based understanding of how Pure O actually works.
              </p>

              <p>
                {`The study's central finding is groundbreaking: the concept of the "pure obsessional" — patients with unacceptable or taboo thoughts yet no compulsions — may be a misnomer, as these obsessions were factorially associated with mental compulsions and reassurance-seeking in clinical samples, suggesting that what has been called Pure O is not truly free of compulsions at all.`}
              </p>

              <p>
                The study also puts the numbers into perspective: in the DSM-IV field trial, 96% of adults with OCD had both obsessions and compulsions when evaluated by trained raters using the YBOCS-SC, with only 2% having predominantly obsessions — indicating that the pure obsessional type may be far less common than previously suggested.
              </p>

              <p>
                This article is a crucial read for anyone wanting to understand why the "Pure O" label, while widely used, remains scientifically controversial.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
