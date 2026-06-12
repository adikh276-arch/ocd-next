import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function HoardingPhenotypeArticle() {
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
                <h1 className="text-2xl font-bold text-[#020817]">Characterizing the Hoarding Phenotype in Individuals with OCD</h1>
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
                This research article dives deep into what makes Hoarding OCD uniquely different from OCD without hoarding — looking at symptom severity, gender differences, and co-occurring conditions. It is one of the most detailed scientific studies on the subject.
              </p>

              <p>
                The study, which examined 473 OCD patients, found that hoarders suffered from significantly more severe OCD symptoms — especially compulsions — and had greater impairment and dysphoria, as well as more comorbid psychiatric disorders.
              </p>

              <p>
                It also revealed important gender-based differences, finding that compared to female non-hoarders, female hoarders were more likely to suffer from bipolar disorder, substance abuse, panic disorder, and binge-eating disorder, and had greater OCD severity.
              </p>

              <p>
                This article is particularly useful for healthcare professionals, caregivers, and researchers looking to understand the full clinical picture of hoarding within the context of OCD.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
