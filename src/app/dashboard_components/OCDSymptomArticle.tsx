import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function OCDSymptomArticle() {
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
                <p className="text-sm text-[#64748B] mb-1">PubMed (National Library of Medicine)</p>
                <h1 className="text-2xl font-bold text-[#020817]">Compulsive Hoarding — OCD Symptom, Distinct Syndrome, or Both?</h1>
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
                This is a deeper, research-based article that explores one of the most debated questions in the field — is hoarding truly a part of OCD, or is it its own separate condition altogether? It is ideal for readers who want a more scientific and clinical perspective.
              </p>

              <p>
                The study compared patients with hoarding who also had OCD against those who hoarded without any other OCD symptoms. It found that approximately one-fourth of participants in the compulsive hoarding with OCD group showed a different psychopathological profile, characterized by the hoarding of bizarre items and the presence of other obsessions and compulsions related to their hoarding, such as fear of catastrophic consequences, the need to perform checking rituals, and the need to perform mental compulsions before discarding any item — and these patients had a more severe and disabling form of the disorder.
              </p>

              <p>
                The article ultimately concludes that in most individuals, compulsive hoarding appears to be a syndrome separate from OCD, associated with substantial levels of disability and social isolation.
              </p>

              <p>
                A thought-provoking read for anyone wanting to understand the nuances of diagnosis.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
