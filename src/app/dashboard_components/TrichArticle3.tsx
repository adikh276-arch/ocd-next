import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function TrichArticle3() {
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
                <p className="text-sm text-[#64748B] mb-1">Expert Review of Neurotherapeutics (Taylor & Francis), September 2025</p>
                <h1 className="text-2xl font-bold text-[#020817]">Trichotillomania and Its Treatment — An Updated Review</h1>
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
                This is one of the most up-to-date and authoritative reviews on trichotillomania, written by leading researchers from the University of Pennsylvania and Kent State University, based on a comprehensive review of studies published through April 2025.
              </p>

              <p>
                Trichotillomania is an impulse control disorder in which individuals fail to resist urges to pull out their own hair, and is associated with significant psychiatric comorbidity and functional impairment in affected children, adolescents, and adults.
              </p>

              <p>
                On the topic of medications, the review presents an honest and nuanced picture: pharmacological treatments for TTM have yielded inconsistent results — SSRIs show limited benefit, while clomipramine and clomipramine show greater efficacy but not without adverse side effects, and newer agents such as NAC or memantine show potential but require more rigorous evaluation.
              </p>

              <p>
                The article ends on a critical note about awareness: dissemination of information about trichotillomania and its treatment remains a critical next step in the field, since many affected individuals and their families experience difficulties finding local treatment providers with sufficient knowledge to deliver effective interventions.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
