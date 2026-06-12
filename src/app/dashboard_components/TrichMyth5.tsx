import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ImageIcon } from "lucide-react";

export function TrichMyth5() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-2xl flex items-center justify-center flex-shrink-0">
                <ImageIcon size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#64748B] mb-1">Myth #5</p>
                <h1 className="text-2xl font-bold text-[#020817]">"There is no effective treatment — you just have to live with it"</h1>
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
                This myth, while deeply discouraging, is one that many people with trichotillomania have heard or have come to believe on their own — often after years of struggling without support or after seeing professionals who were unfamiliar with the condition. The truth is that effective, evidence-based treatments do exist, and many people experience significant improvement or full recovery with the right help.
              </p>

              <p>
                The most well-supported treatment for trichotillomania is Habit Reversal Training (HRT), a behavioral therapy that helps people become more aware of their pulling behavior and develop competing responses to interrupt the urge. HRT has been studied in numerous clinical trials and consistently shows strong results in reducing the frequency and severity. A related approach, Comprehensive Behavioral Treatment (ComB), takes HRT further by identifying the specific sensory, cognitive, emotional, and environmental triggers for each individual — allowing for a highly personalized treatment plan.
              </p>

              <p>
                Acceptance and Commitment Therapy (ACT) has also shown strong results, helping people change their relationship with the urge to pull rather than fighting it directly. On the medication front, while SSRIs have shown limited results, other medications such as N-acetylcysteine (NAC) — a supplement that affects glutamate in the brain — have shown promising results in clinical trials.
              </p>

              <p>
                The biggest barrier to recovery is not a lack of effective treatment — it is a lack of awareness, availability of trained specialists, and the shame that prevents people from ever seeking help. Finding a therapist trained specifically in body-focused repetitive behaviors (BFRBs) is the most important first step toward a life with significantly less suffering.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
