import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function PureOArticle3() {
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
                <p className="text-sm text-[#3B82F6] mb-1">Expert Review of Neurotherapeutics (Taylor & Francis), 2023</p>
                <h1 className="text-2xl font-bold text-[#020817]">{`How Does Pure O OCD Impact a Patient's Treatment Plan?`}</h1>
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
                This clinical article takes a deeply practical approach — moving beyond the debate over whether Pure O exists and focusing instead on what it means for treatment. It is written by OCD researchers and is particularly valuable for therapists and mental health professionals who work with OCD patients.
              </p>

              <p>
                The article makes a critical point about how the Pure O label can actually harm patients: considering Pure O as a subtype of OCD has no scientific evidence and, moreover, could be potentially harmful or at least confusing for patients seeking treatment — particularly for those with specific obsessions such as doubts about their mental state — as it may cause them to misidentify their compulsions and delay getting the right help.
              </p>

              <p>
                It also clarifies what research has consistently shown about the nature of Pure O: subsequent studies clearly showed that patients with aggressive, sexual, and religious obsessions actually perform compulsions by engaging in mental rituals and through the demand for reassurance — meaning the so-called Pure O subtype is nothing more and nothing less than a typical form of OCD characterized by the co-presence of obsessions and compulsions.
              </p>

              <p>
                This is an essential read for understanding how diagnostic labels can shape — and sometimes complicate — the path to recovery.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
