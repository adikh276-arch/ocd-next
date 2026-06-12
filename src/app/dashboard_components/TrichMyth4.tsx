import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ImageIcon } from "lucide-react";

export function TrichMyth4() {
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
                <p className="text-sm text-[#64748B] mb-1">Myth #4</p>
                <h1 className="text-2xl font-bold text-[#020817]">"Trichotillomania is caused by vanity or a desire to self-harm"</h1>
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
                People sometimes assume that hair pulling must be connected to self-harm — that the person is hurting themselves on purpose as a form of punishment or release, similar to cutting. While it is true that trichotillomania and self-harm can sometimes co-occur, they are fundamentally different in their nature, motivation, and treatment approach.
              </p>

              <p>
                For most people with trichotillomania, the pulling is not about pain — in fact, many people report feeling little or no physical discomfort during the act. The behavior is driven primarily by tension relief, sensory satisfaction, or automatic, unconscious habit — not by a desire to cause injury or hurt oneself. The pleasure or relief associated with pulling is neurological, similar to the satisfaction loop seen in other body-focused repetitive behaviors like skin picking or nail biting.
              </p>

              <p>
                Similarly, trichotillomania has nothing to do with vanity or a desire to change one's appearance. No one pulls their hair because they think it makes them look better. The pulling is compulsive and ego-dystonic — meaning the person does not want to be doing it and is often distressed by the results. Many people cry when they see the patches of hair loss in the mirror, feel deep regret immediately after pulling, and desperately wish they could stop. Conflating trichotillomania with self-harm or vanity creates stigma that discourages people from accurately describing their experience and getting correctly diagnosed and treated.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
