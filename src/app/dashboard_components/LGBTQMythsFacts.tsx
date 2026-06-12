import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MythFact {
  id: string;
  myth: string;
  fact: string;
}

const mythsFacts: MythFact[] = [
  {
    id: "phase",
    myth: "Being LGBTQ+ is just a phase.",
    fact: "Sexual orientation and gender identity are enduring, not temporary.",
  },
  {
    id: "mental-illness",
    myth: "Being gay is a mental illness.",
    fact: "Major health bodies worldwide declassified this decades ago.",
  },
  {
    id: "bisexual",
    myth: "Bisexual people are just confused or going through a phase.",
    fact: "Bisexuality is a real, stable, and well-documented orientation.",
  },
  {
    id: "parenting",
    myth: "Same-sex couples can't raise healthy, happy children.",
    fact: "Decades of research show children thrive with loving parents regardless of gender.",
  },
  {
    id: "trans-confusion",
    myth: "Trans people are just confused about their gender.",
    fact: "Gender identity is deeply held — trans identities are consistent over time.",
  },
  {
    id: "western-import",
    myth: "LGBTQ+ identities are a Western import.",
    fact: "Diverse gender and sexuality expressions have existed across all cultures through history.",
  },
];

export function LGBTQMythsFacts() {
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F9F6FE] via-[#FBF8FF] to-[#F5F3FF]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#020817] hover:bg-white transition-all shadow-sm hover:shadow-md border border-gray-100"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </motion.button>
              <div>
                <h1 className="text-3xl md:text-4xl text-[#1E293B] font-bold tracking-tight">
                  Myths & Facts
                </h1>
                <p className="text-base md:text-lg text-[#64748B] mt-2">
                  Common misconceptions about LGBTQ+ people and what's actually true.
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#BE51F5] via-[#EE4F84] to-[#F472B6] rounded-full"></div>
          </motion.div>

          {/* Myths & Facts List */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 mb-12"
          >
            {mythsFacts.map((mythFact, index) => (
              <motion.button
                key={mythFact.id}
                variants={item}
                onClick={() => router.push(`/lgbtq-myth/${mythFact.id}`)}
                className="w-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#C4B5FD]/50 cursor-pointer group"
              >
                {/* Myth Section */}
                <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] p-5 md:p-6 border-b border-[#FCA5A5]/30 group-hover:from-[#FEE2E2] group-hover:to-[#FECACA] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#FCA5A5] to-[#F87171] text-[#7F1D1D] text-xs font-bold uppercase tracking-wide shadow-sm">
                      MYTH
                    </span>
                    <p className="flex-1 text-[#991B1B] text-base md:text-lg italic leading-relaxed pt-0.5 text-left">
                      {mythFact.myth}
                    </p>
                  </div>
                </div>

                {/* Fact Section */}
                <div className="p-5 md:p-6 flex items-start gap-4 group-hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-[#334155] text-base md:text-lg leading-relaxed text-left">
                      {mythFact.fact}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] text-[#065F46] text-xs font-bold uppercase tracking-wide shadow-sm whitespace-nowrap">
                    Fact ✓
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center py-8 md:py-12"
          >
            <div className="max-w-2xl mx-auto px-6 py-4 bg-gradient-to-r from-[#F0F9FF] to-[#E0F2FE] rounded-2xl border border-[#BAE6FD]/50">
              <p className="text-[#0369A1] text-sm md:text-base leading-relaxed">
                These facts are grounded in decades of research by medical, psychological, and social science communities worldwide.
              </p>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#BE51F5]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#EE4F84]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
