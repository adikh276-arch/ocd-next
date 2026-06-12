import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function TrichArticle1() {
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
                <p className="text-sm text-[#64748B] mb-1">StopPulling.Org</p>
                <h1 className="text-2xl font-bold text-[#020817]">Trichotillomania — A Complete Overview</h1>
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
                This is one of the most comprehensive and clinically reliable overviews of trichotillomania available online — written for both medical professionals and the general public. It covers the history, phases, symptoms, and treatment of the condition from start to finish.
              </p>

              <p>
                Trichotillomania (TTM, also known as hair-pulling disorder, was first described in ancient Greece, but for current medical terms it was noted by a French dermatologist in 1889. The condition is not about appearance or vanity — many say that appearing as hair loss had caused by the action of the patient. At this condition can greatly affect the appearance of the patient. It is associated with social and psychological stigma—creating shame and distress that can last for decades.
              </p>

              <p>
                The article explains that trichotillomania is not simply a bad habit — it is a neurological and psychological condition. Brain studies demonstrate long-lasting genetic, emotional, and cognitive features associated with trichotillomania, and some neuroimaging studies have shown structural brain differences in affected individuals, with research increasingly focusing on the basal ganglia and other motor tracts.
              </p>

              <p>
                A particularly important point the article makes is about treatment: trichotillomania is not a trivial disorder and should be managed by an interprofessional team that includes a psychiatrist, behavior therapist, psychologist, and a dermatologist. Without treatment, the condition is unlikely to remit on its own. With appropriate intervention, the long-term.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
