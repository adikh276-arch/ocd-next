import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function PureOStory1() {
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
                <p className="text-sm text-[#EC4899] mb-1">YoungMinds UK</p>
                <h1 className="text-2xl font-bold text-[#020817]">Elliot — "Just Existing in My Mind Was a Struggle"</h1>
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
                Elliot's story is one of the most relatable and honest accounts of Pure O OCD written from a young person's perspective. It captures perfectly the invisible, isolating nature of a condition that leaves no outward trace — while causing enormous inner turmoil.
              </p>

              <p>
                Elliot describes how just existing in their mind was a struggle because of the influx of intrusive thoughts that came from the most random and minor things — and the compulsions they felt they had to perform to "prevent" these thoughts from becoming a reality. Because Pure O, by definition, happens solely internally, no one around them could tell immediately if they were having a difficult time with it — making it a very solitary, isolating experience, with all the stress and panic and fear happening inside their head while no one around had any idea.
              </p>

              <p>
                The turning point came during university, when the pressures of living alone and starting a degree brought everything to the surface. Walking anywhere was challenging because of an obsession with maintaining a sense of symmetry in every step, seeing friends became difficult because every social event was followed by hours of rumination, and the compulsions went from a relatively minor irritation to a constant and draining battle.
              </p>

              <p>
                Elliot's message about recovery is beautifully realistic: recovery, for them, is about reaching a point where OCD is manageable, not where it is gone — and that a lot of dealing with OCD is about learning to manage the stress of obsessions without fulfilling the associated compulsion, which when it comes to Pure O is a purely internal process that can feel much harder because the compulsions are so easy to do — often just a thought — and there is no one to hold you accountable except yourself.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
