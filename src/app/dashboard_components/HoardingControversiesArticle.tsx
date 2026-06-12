import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function HoardingControversiesArticle() {
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
                <p className="text-sm text-[#64748B] mb-1">PMC — National Institutes of Health (NIH)</p>
                <h1 className="text-2xl font-bold text-[#020817]">Compulsive Hoarding — Current Controversies and New Directions</h1>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4 text-[#64748B] text-sm leading-relaxed">
              <p>
                This article is a comprehensive review of the evolving scientific understanding of hoarding — exploring debates around its classification, prevalence, brain differences, and treatment. It is a great read for anyone wanting to understand where the science currently stands and where it is heading.
              </p>

              <p>
                The article highlights that patients who hoard, compared with other OCD patients, had different functional neuroimaging findings, response to treatment, and clinical profiles — suggesting that the brain of someone with hoarding disorder may actually work differently from that of a person with typical OCD.
              </p>

              <p>
                On the topic of how widespread hoarding is, the article notes that data from the Baltimore Epidemiologic Catchment Area Follow-up survey suggest that 5% of the general population experiences clinically significant hoarding, while data from the National Comorbidity Survey Replication indicate that the lifetime prevalence of compulsive hoarding may be as high as 14%.
              </p>

              <p>
                This makes hoarding far more common than most people realize — and yet it remains one of the most under-discussed and under-treated mental health conditions today.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
