import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function PureOArticle1() {
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
                <p className="text-sm text-[#3B82F6] mb-1">NOCD (TreatMyOCD), January 2025</p>
                <h1 className="text-2xl font-bold text-[#020817]">Pure O OCD — What It Is, Symptoms, and How It's Treated</h1>
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
                This is one of the most thorough and beginner-friendly articles on Pure O OCD available online. Written by OCD specialists, it breaks down what Pure O actually is, how its symptoms differ from classic OCD, and what recovery looks like — making it an ideal starting point for anyone new to understanding this condition.
              </p>

              <p>
                The article immediately addresses the most common misconception: Pure OCD is a type of OCD in which a person's compulsions are largely mental or covert. In a study of 225 patients with OCD, 12.9% reported mental compulsions as their main compulsion. Unlike more visible compulsions like checking or handwashing, the rituals in Pure O OCD are often thought-based — with common mental compulsions including reassuring yourself, analyzing memories, or silently repeating phrases to reduce anxiety.
              </p>

              <p>
                It also offers a powerful message of hope: ERP therapy works for all OCD subtypes including Pure O, with 80% of people showing significant improvement in their symptoms — making Pure O OCD highly treatable, and early intervention can dramatically improve quality of life.
              </p>

              <p>
                A must-read for anyone who suspects they may have Pure O or knows someone who does.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
