import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function ThatHoarderStory() {
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
                <p className="text-sm text-[#64748B] mb-1">That Hoarder (Podcast)</p>
                <h1 className="text-2xl font-bold text-[#020817]">"That Hoarder" — An Anonymous Audio Diary That Became a Community</h1>
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
                This story is unique — it began not as a written account, but as an anonymous podcast. Hoarding disorder is stigmatised and people who hoard feel vast amounts of shame. This podcast began life as an audio diary — an anonymous outlet for somebody with this condition who wanted a safe space to speak honestly about her experiences living with compulsive hoarding.
              </p>

              <p>
                What started as a private coping mechanism grew into something much bigger. The host, known only as "That Hoarder," began interviewing therapists, academics, researchers, children of hoarders, and professional organisers — building a community of people who had never felt understood before.
              </p>

              <p>
                The podcast explores the loneliness and isolation frequently felt by people who hoard, the importance of community and peer support, and the identity shifts that happen during the process of recovery and letting go — including how building new narratives and increased connection through shared experience can be transformative.
              </p>

              <p>
                Her story is a testament to the power of speaking openly about shame. By simply refusing to stay silent, she gave thousands of others permission to do the same.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
