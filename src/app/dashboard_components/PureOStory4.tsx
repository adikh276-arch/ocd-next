import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function PureOStory4() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#EC4899] mb-1">Made of Millions Foundation</p>
                <h1 className="text-2xl font-bold text-[#020817]">Anonymous — "I Couldn't Believe I Wasn't a Complete Monster"</h1>
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
                This anonymous story is one of the most searingly honest and deeply moving accounts of Pure O OCD ever published online. The author describes years of living with intrusive, taboo thoughts that felt too shameful to share with anyone — convinced they were fundamentally broken or dangerous.
              </p>

              <p>
                The author describes how they could be having a perfectly normal conversation while obsessing about something and experiencing a tremendous wave of anxiety and fear with their fight-or-flight response totally set off — and nobody would know. They became an expert at hiding their OCD, exhausted by having their attention constantly split and desperate for a resolution.
              </p>

              <p>
                The turning point came unexpectedly — through a video online: the video described what they were going through in detail, and it still feels like a surreal moment — with so much relief felt upon discovering they had Pure OCD and that their story did not have to end miserably, with an enormous weight lifted off their shoulders and the realization that their brain may be wired differently but their condition was treatable, and that they were not a complete monster.
              </p>

              <p>
                Their message to others still suffering is both practical and profound: OCD themes tend to gravitate towards the taboo, which makes it incredibly difficult for sufferers to open up about their obsessions — but whether the obsession involves thoughts of harming yourself, cheating on a partner, becoming a serial killer, or being obsessed about obsession itself, the themes technically do not matter, and it is not the sufferer's fault that they are having these thoughts, as it is definitely not a choice they are making.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
