import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function PureOStory3() {
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
                <p className="text-sm text-[#EC4899] mb-1">Rethink Mental Illness</p>
                <h1 className="text-2xl font-bold text-[#020817]">Shaun — Diagnosed at 27 After Months of Torment</h1>
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
                Shaun's story is one of the most courageous and candid accounts of Pure O OCD available online. He was 27 years old when he finally received his diagnosis — after months of suffering in silence, convinced he was losing his mind.
              </p>

              <p>
                Shaun's life was thrown upside down by his Pure OCD diagnosis at 27 years old, after months of obsessive thoughts about his sexual orientation, violence, and suicide that tormented and exhausted him mentally — eventually leading to a breakdown where he told his friends "I want to die" after aggressive suicide thoughts, at which point his therapist Emma explained he had OCD and it was Pure O.
              </p>

              <p>
                Shaun is deeply passionate about breaking the stigma around OCD, pointing out how underfunded and misunderstood the condition remains: so many people in the UK have OCD, yet shockingly only 89 pence is spent on research each year for every person affected — and many individuals with OCD stay hidden, which in turn makes symptoms worse, because hiding never works as it prevents people from accessing the help they need.
              </p>

              <p>
                His closing words are both honest and deeply inspiring: despite the hardship, life is hopeful — some days are tough, but the good days allow him to continue pushing through recovery, and he could have never imagined his life where he would be speaking about himself having a mental illness, with his suffering having brought out his why, and his why being stronger than his why not.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
