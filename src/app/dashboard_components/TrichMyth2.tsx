import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ImageIcon } from "lucide-react";

export function TrichMyth2() {
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
                <p className="text-sm text-[#64748B] mb-1">Myth #2</p>
                <h1 className="text-2xl font-bold text-[#020817]">"Only women and girls get trichotillomania"</h1>
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
                Because trichotillomania is more commonly diagnosed in women and girls, a widespread myth has developed that it is exclusively a female condition. This misconception means that many men and boys who struggle with hair pulling never come forward, never seek help, and suffer in silence for years — convinced that what they are experiencing is too unusual or shameful to talk about.
              </p>

              <p>
                In reality, trichotillomania affects people of all genders. Research suggests that while women do make up the majority of diagnosed cases — with some studies showing up to 85% of clinical samples being female — this skewed ratio may have more to do with reporting patterns than actual prevalence. Men and boys are significantly less likely to seek help for mental health conditions due to societal stigma around masculinity, emotional vulnerability, and asking for help.
              </p>

              <p>
                Studies in community and non-clinical samples, where people are not self-selecting based on help-seeking behavior, show a much more even gender distribution. In children, trichotillomania appears to affect boys and girls at roughly equal rates. It also affects people across all races, ethnicities, cultures, and socioeconomic backgrounds. The myth that it is only a "female disorder" is not only inaccurate — it is actively harmful, as it creates additional barriers that stop men, boys, and non-binary individuals from ever reaching out for support.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
