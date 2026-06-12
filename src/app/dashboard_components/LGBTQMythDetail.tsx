import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Key } from "lucide-react";

interface MythDetail {
  id: string;
  category: string;
  myth: string;
  fact: string;
  whyExists: string;
  remember: string;
}

const mythsData: MythDetail[] = [
  {
    id: "phase",
    category: "IDENTITY",
    myth: "Being LGBTQ+ is just a phase.",
    fact: "Sexual orientation and gender identity are consistent and enduring aspects of who a person is. Research consistently shows that LGBTQ+ identities remain stable across the lifespan for the vast majority of people.",
    whyExists: "This myth often comes from a place of hoping someone will 'change back' — usually from family members who haven't yet accepted the person. It can also stem from conflating early exploration with the identity itself.",
    remember: "Exploration is real, but so is identity. One doesn't erase the other.",
  },
  {
    id: "mental-illness",
    category: "HEALTH",
    myth: "Being gay is a mental illness.",
    fact: "Major health organizations worldwide — including the American Psychiatric Association, World Health Organization, and American Psychological Association — declassified homosexuality as a mental disorder decades ago. Being LGBTQ+ is a natural variation of human sexuality and gender identity.",
    whyExists: "This harmful myth stems from outdated medical classifications from the mid-20th century and continues to be perpetuated by those who oppose LGBTQ+ rights. It has been thoroughly debunked by modern science and medicine.",
    remember: "Love and identity are not illnesses. Science has been clear on this for over 50 years.",
  },
  {
    id: "bisexual",
    category: "ORIENTATION",
    myth: "Bisexual people are just confused or going through a phase.",
    fact: "Bisexuality is a real, stable, and well-documented sexual orientation. Bisexual individuals are attracted to more than one gender, and this attraction is as valid and consistent as any other orientation.",
    whyExists: "This myth comes from a binary view of sexuality that assumes people must be either gay or straight. It's also perpetuated by bi-erasure in both straight and LGBTQ+ communities, where bisexual people's identities are invalidated based on who they're currently dating.",
    remember: "Your orientation is about who you're attracted to, not who you're currently with.",
  },
  {
    id: "parenting",
    category: "FAMILY",
    myth: "Same-sex couples can't raise healthy, happy children.",
    fact: "Decades of research consistently show that children raised by same-sex couples thrive just as well as those raised by different-sex couples. What matters most for child development is a loving, stable home environment — not the parents' gender or sexual orientation.",
    whyExists: "This myth is rooted in traditional assumptions about family structure and is often used to justify discrimination against LGBTQ+ parents. It persists despite overwhelming scientific evidence to the contrary.",
    remember: "Children need love, stability, and support — not a specific parental gender configuration.",
  },
  {
    id: "trans-confusion",
    category: "GENDER",
    myth: "Trans people are just confused about their gender.",
    fact: "Gender identity is a deeply held, consistent sense of one's gender. For transgender people, this identity doesn't match the sex they were assigned at birth. Research shows that trans identities are stable over time and that supporting trans people in their authentic identity leads to significantly better mental health outcomes.",
    whyExists: "This myth comes from conflating gender identity with biological sex, and from a lack of understanding about the difference between the two. It's also perpetuated by those who are uncomfortable with gender diversity.",
    remember: "Trans people know who they are. Confusion comes from others, not from within.",
  },
  {
    id: "western-import",
    category: "CULTURE",
    myth: "LGBTQ+ identities are a Western import.",
    fact: "Diverse expressions of gender and sexuality have existed across all cultures throughout human history. From Two-Spirit people in Indigenous North American cultures to hijra in South Asia, muxe in Mexico, and fa'afafine in Samoa — LGBTQ+ identities are universal and timeless.",
    whyExists: "This myth is used to delegitimize LGBTQ+ rights by framing them as foreign or colonial. In reality, it was often colonialism that imposed rigid Western gender and sexuality norms on cultures that previously had more fluid understandings.",
    remember: "LGBTQ+ people have always existed, everywhere. What's imported is often the prejudice, not the identity.",
  },
];

export function LGBTQMythDetail() {
  const router = useRouter();
  const { mythId } = useParams<{ mythId: string }>();
  
  const currentIndex = mythsData.findIndex((m) => m.id === mythId);
  const mythDetail = mythsData[currentIndex];

  if (!mythDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Myth not found</p>
      </div>
    );
  }

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < mythsData.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      router.push(`/lgbtq-myth/${mythsData[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      router.push(`/lgbtq-myth/${mythsData[currentIndex + 1].id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F9F6FE] via-[#FBF8FF] to-[#F5F3FF]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#020817] hover:bg-white transition-all shadow-sm hover:shadow-md border border-gray-100 mb-6"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </motion.button>

          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E0E7FF] to-[#DDD6FE] text-[#5B21B6] text-xs font-bold uppercase tracking-wider border border-[#C4B5FD]/30">
              {mythDetail.category}
            </span>
          </motion.div>

          {/* Common Myth Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-2xl p-6 md:p-8 mb-6 border border-[#FCA5A5]/30"
          >
            <div className="flex items-start gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2"></div>
              <h2 className="text-[#DC2626] text-sm font-bold uppercase tracking-wider">
                Common Myth
              </h2>
            </div>
            <p className="text-[#991B1B] text-xl md:text-2xl italic leading-relaxed">
              "{mythDetail.myth}"
            </p>
          </motion.div>

          {/* The Fact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-2xl p-6 md:p-8 mb-6 border border-[#86EFAC]/30"
          >
            <div className="flex items-start gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-2"></div>
              <h2 className="text-[#16A34A] text-sm font-bold uppercase tracking-wider">
                The Fact
              </h2>
            </div>
            <p className="text-[#065F46] text-base md:text-lg leading-relaxed">
              {mythDetail.fact}
            </p>
          </motion.div>

          {/* Why This Myth Exists Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-4">
              <Key className="text-[#2563EB] flex-shrink-0 mt-0.5" size={20} strokeWidth={2.5} />
              <h2 className="text-[#2563EB] text-sm font-bold uppercase tracking-wider">
                Why this myth exists
              </h2>
            </div>
            <p className="text-[#475569] text-base md:text-lg leading-relaxed">
              {mythDetail.whyExists}
            </p>
          </motion.div>

          {/* Remember This Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] rounded-2xl p-6 md:p-8 mb-8 border border-[#C4B5FD]/30"
          >
            <h3 className="text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-3">
              Remember This
            </h3>
            <p className="text-[#5B21B6] text-lg md:text-xl italic leading-relaxed">
              {mythDetail.remember}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between gap-4 pb-8"
          >
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                hasPrev
                  ? "text-[#64748B] hover:text-[#334155] hover:bg-white/80 bg-white/60"
                  : "text-[#CBD5E1] bg-gray-50 cursor-not-allowed"
              }`}
            >
              ← Prev
            </button>
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                hasNext
                  ? "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02]"
                  : "bg-gray-200 text-[#CBD5E1] cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#BE51F5]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#EE4F84]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
