import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ImageIcon } from "lucide-react";

export function TrichMyth3() {
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
                <p className="text-sm text-[#64748B] mb-1">Myth #3</p>
                <h1 className="text-2xl font-bold text-[#020817]">"People with trichotillomania are doing it for attention"</h1>
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
                This myth is particularly cruel and reflects a deep misunderstanding of the condition. Far from seeking attention, most people with trichotillomania go to extraordinary lengths to hide their hair pulling and its effects. They wear hats, wigs, headscarves, and heavy makeup. They avoid swimming, windy days, and intimate situations where their hair loss might be noticed. They cancel social plans and avoid doctors out of shame. The idea that they are pulling for attention is almost the opposite of reality.
              </p>

              <p>
                Trichotillomania carries an immense burden of shame and secrecy. Many sufferers spend years — sometimes decades — hiding their condition from everyone around them, including their closest loved ones. Some people have never told a single person about their pulling before reaching out for professional help. The emotional toll of this secrecy is enormous, contributing to depression, social anxiety, and low self-esteem.
              </p>

              <p>
                The pulling itself typically happens in private — at night, when alone, or in unconscious moments of stress. It is not performed to be seen or noticed. In fact, the fear of being seen or discovered is one of the most paralyzing aspects of the condition. This myth not only invalidates real suffering but also reinforces the very shame that keeps people from ever asking for help in the first place.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
