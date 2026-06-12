import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function PureOStory5() {
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
                <p className="text-sm text-[#EC4899] mb-1">Anxiety & Depression Association of America (ADAA)</p>
                <h1 className="text-2xl font-bold text-[#020817]">Hussain — From Bedridden at 22 to a Beacon of Hope</h1>
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
                Hussain's story is one of the most complete and emotionally powerful recovery accounts available — spanning from his first intrusive thought at age 10, through his complete breakdown in early adulthood, to his eventual recovery and decision to share his journey publicly to help others.
              </p>

              <p>
                Hussain encountered his first obsessive thought at around 10 years old, centered around God and religion — and as a shy kid, he kept these feelings to himself, hiding his fear and guilt while continuing to attend school. His teenage years were tough, with obsessive urges and intrusive thoughts about sex and scrupulosity growing as his responsibilities increased.
              </p>

              <p>
                By his early twenties, Pure O OCD had consumed his entire life: in college studying electrical and electronics engineering, his stress and obsessions increased, leading to immense pain and academic failure — he feared social interactions, group projects were a nightmare, and driving triggered fears of running over imaginary bodies. As he began to fall courses he quit, and OCD led to poor hygiene, overeating, and staying bedridden — wasting his supposedly wonderful years at age 22, with OCD taking everything from him.
              </p>

              <p>
                Recovery came when his mother insisted on getting him professional help: he found a well-respected mental health therapist who treated him like a son and explained everything about OCD — and gradually his symptoms became more tolerable and controllable, he regained confidence, resumed daily activities, focused on his studies, and began to understand his OCD triggers and learned to differentiate between intrusive thoughts and normal ones.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
