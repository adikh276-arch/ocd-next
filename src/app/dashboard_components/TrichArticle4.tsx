import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function TrichArticle4() {
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
                <p className="text-sm text-[#64748B] mb-1">Scientific Reports (Nature), March 2025</p>
                <h1 className="text-2xl font-bold text-[#020817]">Sociodemographic & Clinical Characteristics of 1,234 Trichotillomania Patients</h1>
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
                This is a landmark large-scale study from Sweden — one of the biggest real-world datasets on trichotillomania ever published. It draws from the Swedish National Patient Register and covers over 1,200 diagnosed individuals, offering rare insight into who actually gets this disorder and what their lives look like.
              </p>

              <p>
                Trichotillomania is an understudied, underrecognized, and difficult-to-treat psychiatric disorder that affects about 1–2% of the population, predominantly women. The cohort of 1,234 individuals had a median age at first diagnosis of 25 years, with most individuals being female (85%) and single (82%).
              </p>

              <p>
                The study also reveals just how rarely trichotillomania occurs in isolation. Most individuals (75%) had a comorbid psychiatric disorder diagnosed during the study period — with anxiety-related disorders (65%), depressive disorders (48%), and neurodevelopmental disorders (39%) being the most frequently co-occurring diagnoses.
              </p>

              <p>
                This study is particularly valuable because it moves beyond theoretical models and shows what trichotillomania actually looks like in real populations — making it essential reading for clinicians and policymakers alike.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
