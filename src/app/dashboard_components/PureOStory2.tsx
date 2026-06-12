import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Users } from "lucide-react";

export function PureOStory2() {
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
                <p className="text-sm text-[#EC4899] mb-1">Harley Therapy Blog</p>
                <h1 className="text-2xl font-bold text-[#020817]">Jenni Brooks — Overlooked as a Child, Recovered as an Adult</h1>
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
                Jenni's story is particularly powerful because it exposes a heartbreaking failure of the mental health system — a young girl whose Pure O symptoms were dismissed and misunderstood by the very professionals who should have helped her. She shares her story so that fewer children like her get overlooked.
              </p>

              <p>
                When Jenni was seven, she began experiencing disturbing intrusive thoughts after watching a TV show — wondering what would happen if she swallowed a knife, and then being unable to stop the thought the more she tried. After that, she started getting many other disturbing thoughts, such as what if she stabbed her sister while she was sleeping, or what if she gorged her own eyes out.
              </p>

              <p>
                When she finally saw a psychologist, the outcome was devastating: after one appointment at the hospital, the psychologist decided not to proceed with any treatment because her symptoms were too puzzling — she was not displaying typical OCD symptoms like excessive handwashing, and instead her main symptoms were excruciating intrusive thoughts with no overt compulsions. After being discharged, her symptoms did not get better but got worse, and she also had the added guilt of believing she had made up her symptoms — left to assume that she had put it on for attention, and after that no longer felt able to tell anyone what she was going through.
              </p>

              <p>
                Recovery finally came years later through private integrative therapy. Her story is a call to action for better training among mental health professionals when it comes to recognizing Pure O in children.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
