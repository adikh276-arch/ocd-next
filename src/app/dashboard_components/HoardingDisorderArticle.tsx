import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function HoardingDisorderArticle() {
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
                <p className="text-sm text-[#64748B] mb-1">Anxiety & Depression Association of America (ADAA)</p>
                <h1 className="text-2xl font-bold text-[#020817]">Hoarding Disorder — Symptoms, Causes, Diagnosis and Treatment</h1>
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
                This article from the ADAA provides a well-rounded, clinically informed overview of Hoarding Disorder — covering everything from its causes to its treatment options in a highly readable format.
              </p>

              <p>
                What makes this article particularly valuable is its explanation of why people develop hoarding tendencies. Hoarding Disorder can develop due to a combination of genetic factors, brain-based differences, stressful life experiences, learned behaviors, and co-occurring mental health conditions such as anxiety, depression, ADHD, or OCD.
              </p>

              <p>
                It also firmly challenges the harmful stereotype that hoarding is simply a lifestyle choice, stating clearly that Hoarding Disorder is not related to laziness or lack of willpower — it is a legitimate and treatable mental health condition.
              </p>

              <p>
                The article also discusses how symptoms often begin in the teenage years and gradually worsen into adulthood, making early recognition and professional intervention critically important.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
