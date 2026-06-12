import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function ContaminationArticle5() {
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
                <p className="text-sm text-[#3B82F6] mb-1">BMC Psychiatry (Springer), 2025</p>
                <h1 className="text-2xl font-bold text-[#020817]">Self-Contamination — A Distinct Subtype of Contamination OCD</h1>
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
                This is a cutting-edge clinical research study that explores a lesser-known but critically important aspect of contamination OCD — the self-contamination subtype, where the person fears that they themselves are the source of contamination rather than the external environment. This is one of the most nuanced and clinically detailed articles on the subject available today.
              </p>

              <p>
                The study examined 71 OCD patients divided into self-contamination, contamination, and checking symptom groups, and found important clinical differences between them. Self-contamination, a subtype within the contamination and washing dimension of OCD, remains poorly understood — and its identification is crucial for understanding the pathophysiological and treatment response differences in affected patients.
              </p>

              <p>
                The research also highlights the broader complexity of OCD as a condition: there is increasing evidence that OCD is a heterogeneous condition with a diverse clinical presentation, varying in terms of type of symptoms, symptom severity, comorbidities, neurofunctional findings, and treatment responsiveness.
              </p>

              <p>
                This article is especially valuable for clinicians, therapists, and researchers — as it pushes the field forward by showing that not all contamination OCD is the same, and that treatment approaches may need to be tailored to specific subtypes for the best outcomes.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
