import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function PureOArticle5() {
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
                <p className="text-sm text-[#3B82F6] mb-1">Beyond OCD</p>
                <h1 className="text-2xl font-bold text-[#020817]">Pure O — Fact or Fiction?</h1>
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
                This is a fascinating and thought-provoking article written by a leading OCD clinician who directly confronts the most debated question in the field — does Pure O actually exist? Written from the perspective of years of clinical experience, it offers one of the most honest and nuanced takes on this subject available online.
              </p>

              <p>
                The author makes a powerful clinical observation: in their own experience, they have had many OCD sufferers who believe or have been told that they have purely obsessional OCD — supposedly suffering only from obsessional thoughts but doing nothing in response to them — yet without fail, they have always been able to identify some sort of thought or image being performed in response to the obsession, leading to the conclusion that everyone with OCD has both obsessions and compulsions.
              </p>

              <p>
                The article also makes an important distinction that helps many people finally understand their own experience: what was being called Pure O was really typical mental obsessions with mental compulsions being mislabeled as obsessions — and from a treatment perspective, individuals with obsessions and mental compulsions are no different from more typical OCD cases with obsessions and behavioral compulsions.
              </p>

              <p>
                A grounding, clarifying, and ultimately hopeful read for anyone navigating the confusing world of Pure O labels and diagnoses.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
