import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function ContaminationArticle3() {
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
                <h1 className="text-2xl font-bold text-[#020817]">Contamination OCD and Smartphone Therapies</h1>
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
                This is a forward-thinking and highly relevant academic review that explores the symptoms of contamination OCD while also addressing one of the most pressing questions in recent mental health research — how can technology help treat this condition, especially in a post-pandemic world?
              </p>

              <p>
                This review aims to shed light on the symptoms of contamination-related OCD, review current therapies and their limitations, and discuss how smartphone solutions may provide approaches to novel treatments — especially when considering global mental health challenges and restrictions imposed by pandemics such as COVID-19.
              </p>

              <p>
                The article makes a powerful case for why technology matters in expanding access to treatment: smartphones can potentially make therapy more available to members of lower socioeconomic status communities and developing countries with insufficient access to mental healthcare, and as OCD afflicts up to 2–3% of the general population with economic costs estimated at $10.6 billion per year in the United States alone, low-cost smartphone solutions may facilitate higher treatment uptake, lower drop-out, and early intervention.
              </p>

              <p>
                This is a particularly important read for anyone interested in the future of OCD treatment and how digital tools might bridge the massive gap between those who need help and those who actually receive it.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
