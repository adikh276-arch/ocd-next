import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function JeanneLeierStory() {
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
                <p className="text-sm text-[#64748B] mb-1">Jeanne Leier</p>
                <h1 className="text-2xl font-bold text-[#020817]">Jeanne Leier — When Grief Triggered Hoarding</h1>
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
                Jeanne Leier's experience demonstrates how grief and loss can trigger hoarding tendencies — her compulsive accumulation began after her fiancé was deployed to Iraq. What started as holding onto objects for comfort and emotional security slowly spiraled into a disorder that took over her living space and her life.
              </p>

              <p>
                Jeanne's story is a crucial reminder that hoarding is not always about being messy or disorganized — it is often a deeply emotional response to pain, loss, or trauma. Objects become stand-ins for the people, moments, or feelings that feel impossible to let go of. Each possession carries a memory, a hope, or a fear that throwing it away means losing something irreplaceable.
              </p>

              <p>
                Real-life stories like Jeanne's highlight the interplay between psychological factors and environmental circumstances that contribute to hoarding behaviors, and how the emotional, physical, and social challenges faced by hoarders are far more complex than what meets the eye.
              </p>

              <p>
                Her journey toward recovery involved therapy focused on processing grief alongside addressing the hoarding itself — a reminder that treating the root cause is just as important as clearing the clutter.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
