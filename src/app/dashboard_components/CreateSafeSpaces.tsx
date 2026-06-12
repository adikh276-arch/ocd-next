import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft } from "lucide-react";

const steps = [
  "Identify one person, place, or group where you feel safe",
  "Invest in making your own space feel like yours",
  "Keep a small 'comfort kit' for hard days",
  "Know your nearest LGBTQ+ affirming resource or hotline",
];

export function CreateSafeSpaces() {
  const router = useRouter();

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
              <h1 className="text-3xl md:text-4xl text-[#1E293B] font-bold tracking-tight">
                Create Safe Spaces
              </h1>
            </div>

            {/* Decorative element - blue color */}
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"></div>
          </motion.div>

          {/* Why It Helps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 md:mb-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-4">
              Why It Helps
            </h2>
            <p className="text-[#64748B] text-base md:text-lg leading-relaxed">
              Safety isn't just physical — it's emotional, too. Even one corner of your life where you can fully exhale makes an enormous difference to your nervous system and mental health.
            </p>
          </motion.div>

          {/* What You Can Do Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-6">
              What You Can Do
            </h2>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  {/* Number Circle */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center flex-shrink-0 text-[#1D4ED8] font-bold text-base md:text-lg shadow-sm group-hover:shadow-md transition-all group-hover:scale-110 duration-300">
                    {index + 1}
                  </div>

                  {/* Text */}
                  <div className="flex-1 pt-2">
                    <p className="text-[#1E293B] text-base md:text-lg leading-relaxed">
                      {step}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Spacing */}
          <div className="h-12"></div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#60A5FA]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
