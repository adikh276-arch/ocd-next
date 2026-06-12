import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function PureOArticle4() {
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
                <p className="text-sm text-[#3B82F6] mb-1">Made of Millions Foundation</p>
                <h1 className="text-2xl font-bold text-[#020817]">Pure O — An Exploration into a Lesser-Known Form of OCD</h1>
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
                This is one of the most human and relatable articles on Pure O OCD — written in an accessible, compassionate tone and covering a wide range of subtypes that many people have never heard of. It is particularly valuable for people who are trying to understand whether their own experiences match what Pure O describes.
              </p>

              <p>
                The article highlights a crucial reason why Pure O goes undiagnosed for so long: many people spend years or even decades living with undiagnosed OCD because they are unfamiliar with Pure O — since OCD is frequently thought of as a disorder that causes hyper-organized or germaphobia-related behaviors, which is not always the case.
              </p>

              <p>
                It also sheds important light on Relationship OCD (ROCD), one of the most commonly misunderstood subtypes of Pure O: ROCD is often misdiagnosed or seen as an underlying attachment disorder in treatment providers who simply don't have a solid grasp of the complexities of OCD and all its variations — with many clinicians mistakenly suggesting the person "may not be right for you" or "should really listen to your doubts," which often leads the ROCD sufferer into a panic.
              </p>

              <p>
                The article ends on an empowering note — emphasizing that recovery is fully possible when the right treatment and the right understanding are in place.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
