import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ImageIcon } from "lucide-react";

export function TrichMyth1() {
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
                <ImageIcon size={28} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-[#64748B] mb-1">Myth #1</p>
                <h1 className="text-2xl font-bold text-[#020817]">"Trichotillomania is just a bad habit you can stop anytime"</h1>
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
                This is perhaps the most widespread and damaging myth about trichotillomania. Many people — including friends, family members, and even some healthcare providers — assume that hair pulling is simply a nervous habit, like biting nails or tapping fingers, and that the person can stop whenever they choose to. This could not be further from the truth.
              </p>

              <p>
                Trichotillomania is a clinically recognized mental health disorder listed in the DSM-5 under Obsessive-Compulsive and Related Disorders. It involves powerful, recurring urges to pull hair from the scalp, eyebrows, eyelashes, or other parts of the body — urges that feel overwhelming and often impossible to resist without professional intervention. Many people who pull their hair do so automatically, without even being fully aware that it is happening in the moment.
              </p>

              <p>
                The condition is rooted in brain chemistry and neurological patterns. Research has shown that people with trichotillomania have differences in the areas of the brain associated with habit formation, impulse control, and emotional regulation. This means that the pulling behavior is not a choice — it is a deeply ingrained neurological response to stress, anxiety, boredom, or emotional discomfort. Telling someone to "just stop" is as unhelpful as telling someone with asthma to "just breathe." It dismisses the very real struggle behind the condition and prevents people from seeking the proper treatment they need.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
