import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function ContaminationArticle1() {
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
                <p className="text-sm text-[#3B82F6] mb-1">International OCD Foundation (IOCDF)</p>
                <h1 className="text-2xl font-bold text-[#020817]">OCD and Contamination — A Complete Expert Guide</h1>
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
                This is one of the most accessible and widely recommended articles on contamination OCD, written by a leading OCD specialist and published by the most trusted OCD organization in the world. It is an excellent starting point for anyone new to understanding this condition.
              </p>

              <p>
                The article makes an important point that many people overlook — contamination OCD is far more complex than just fearing germs. Unlike the popular view, contamination in OCD isn't simply limited to dirt, germs, and viruses — it can also include a wide range of other triggers, and there are practically no limits to the things that can feel contaminating to someone with this condition.
              </p>

              <p>
                On the topic of treatment, the article is clear and direct: behavioral therapy in the form of Exposure and Response Prevention (ERP) remains the most widely used and accepted treatment for OCD, encouraging patients to gradually encounter increasing doses of what feels contaminated while resisting washing, checking, or avoiding — and by staying with the anxiety, sufferers come to learn that nothing really happens when they face their fears.
              </p>

              <p>
                It also addresses the role of medication, noting that because OCD is biochemical in origin, medicine can often be of great help as a tool to assist in doing behavioral therapy, and both treatments together are often more effective than either one alone — with SSRIs being the main family of medicines used.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
