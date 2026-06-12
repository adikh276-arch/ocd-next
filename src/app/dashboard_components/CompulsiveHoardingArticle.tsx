import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, FileText } from "lucide-react";

export function CompulsiveHoardingArticle() {
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
                <p className="text-sm text-[#64748B] mb-1">International OCD Foundation (IOCDF)</p>
                <h1 className="text-2xl font-bold text-[#020817]">What is Compulsive Hoarding?</h1>
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
                This is one of the most beginner-friendly and widely referenced articles on Hoarding OCD, written by leading researchers from Boston University and Smith College. It explains the condition in a clear, compassionate, and non-judgmental way.
              </p>

              <p>
                The article clarifies that compulsive hoarding was commonly considered a type of OCD, with estimates suggesting that as many as 1 in 4 people with OCD also have compulsive hoarding, and nearly 1 in 5 compulsive hoarders have non-hoarding OCD symptoms.
              </p>

              <p>
                It also addresses a very common mistake people make — thinking you can solve hoarding by simply cleaning out the home. The article explains that attempts to "clean out" the homes of people who hoard without treating the underlying problem usually fail, and hoarders whose homes are cleared without their consent often experience extreme distress and may become further attached to their possessions.
              </p>

              <p>
                It also covers what people most commonly hoard, how hoarding differs from collecting, how to have a sensitive conversation with a loved one who hoards, and what treatment strategies actually work.
              </p>

              <p className="font-medium text-[#020817]">
                A must-read for anyone new to understanding this condition.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
