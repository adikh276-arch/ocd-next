import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function LifeBeyondPilesStory() {
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
              <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#64748B] mb-1">Anonymous</p>
                <h1 className="text-2xl font-bold text-[#020817]">"I Wanted a Life Beyond Piles" — A Retired Woman's Journey</h1>
              </div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4 text-[#64748B] text-sm leading-relaxed">
              <p>
                This is one of the most moving and honest accounts of hoarding OCD ever written. The author, a woman who shared her story at retirement age, describes how her condition built up silently over the years — hidden behind the excuse of a busy work life, while her home slowly turned into what she calls a "clutter maze."
              </p>

              <p>
                She reached a breaking point where she felt that death would be a welcome release. She was depressed, unable to problem-solve, and her doctor was not recognizing her problem — blaming her excessive work habits instead. She began to realize that work was just a wonderful excuse for the clutter and decided she would have to begin searching seriously for an answer herself.
              </p>

              <p>
                The turning point came when she made a phone call and connected with someone who understood OCD. She found a doctor who dealt only with OCD clients. There were no instant cures — she took small steps, saw her doctor twice a week, and worked on assignments he suggested. It took months of work, but her husband started to see changes and she began to laugh again.
              </p>

              <p>
                She reclaimed her home room by room, and her biggest success came in keeping those areas clean and uncluttered.
              </p>

              <p>
                Her message at the end is deeply encouraging — she urges others to start with one small victory at a time and build on those achievements.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
