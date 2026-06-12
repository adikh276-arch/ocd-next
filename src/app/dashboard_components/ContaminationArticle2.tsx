import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function ContaminationArticle2() {
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
                <p className="text-sm text-[#3B82F6] mb-1">Deconstructing Stigma</p>
                <h1 className="text-2xl font-bold text-[#020817]">Contamination OCD — Symptoms, Causes, and Treatment</h1>
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
                This is a beautifully written and highly compassionate article that explains contamination OCD from the perspective of what it actually feels like to live with it — making it one of the most relatable and human accounts available online.
              </p>

              <p>
                The article puts the scale of contamination OCD into perspective right away: contamination OCD is one of the most common and recognizable forms of OCD, with up to 46% of people with OCD experiencing contamination-related fears.
              </p>

              <p>
                It also does an excellent job of explaining why compulsions never truly help: regardless of the safety behaviors people use — avoidance, compulsions, or reassurance-seeking — these behaviors, while comforting in the short term, do not tackle the root cause of the feared situation, and actually reinforce OCD. Over time, the person's fears become stronger, avoidance becomes more pronounced, and their compulsions become more frequent.
              </p>

              <p>
                The article also highlights the important role trauma plays: research suggests that people with a history of trauma, such as physical or sexual abuse, may be more likely to experience contamination-related OCD symptoms, with compulsions sometimes serving as a way to cope by restoring a sense of control, predictability, or distraction from trauma-related fears.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
