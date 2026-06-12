import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Lightbulb } from "lucide-react";

export function ContaminationTip5() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lightbulb size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#10B981] mb-1">Tip #5</p>
                <h1 className="text-2xl font-bold text-[#020817]">Build a Support System and Educate Your Loved Ones</h1>
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
                Contamination OCD thrives in isolation and secrecy. Many people with this condition hide their rituals from everyone around them, feeling too ashamed to explain why they wash their hands for 20 minutes or why they cannot touch certain objects. This isolation makes recovery significantly harder — and makes the condition significantly worse.
              </p>

              <p>
                Building a genuine support system starts with opening up to at least one trusted person about your OCD. This could be a partner, a family member, a close friend, or a support group. You do not need to explain everything at once — even a simple "I struggle with OCD and it makes me feel that things are contaminated. I am working on it, and I wanted you to know" is a powerful first step.
              </p>

              <p>
                Equally important is educating your loved ones about what actually helps. Well-meaning family and friends often make contamination OCD worse without realizing it — by cleaning things on your behalf, confirming that something is probably not contaminated, or accommodating rituals to keep the peace. This is called family accommodation, and research consistently shows that it maintains and worsens OCD symptoms over time, no matter how loving the intention behind it.
              </p>

              <p>
                Ask your loved ones to gently decline to reassure you when you ask contamination-related questions, and to avoid participating in or enabling your rituals. This can be a difficult conversation, but it is a deeply loving and important one. Additionally, consider joining an OCD support group — either in person or online through organizations like the International OCD Foundation (IOCDF). Hearing from others who truly understand what you are going through can be profoundly validating and motivating on the hardest days of recovery.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
