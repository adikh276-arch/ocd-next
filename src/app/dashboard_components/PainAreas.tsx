import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Activity, ChevronRight } from "lucide-react";
import { GiNightSleep } from "react-icons/gi";
import { FaRunning, FaDumbbell } from "react-icons/fa";

const painAreas = [
  { id: 1, name: "Neck", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Neck-150x150.png" },
  { id: 2, name: "Upper Back", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Upper-Back-150x150.png" },
  { id: 3, name: "Lower Back", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Lower-Back-150x150.png" },
  { id: 4, name: "Foot", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Foot-150x150.png" },
  { id: 5, name: "Ankle", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Ankle-150x150.png" },
  { id: 6, name: "Elbow", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Elbow-150x150.png" },
  { id: 7, name: "Forearm", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Forearm-150x150.png" },
  { id: 8, name: "Hand", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Hand-150x150.png" },
  { id: 9, name: "Hamstring", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Hamstring-150x150.png" },
  { id: 10, name: "Heel", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Heel-150x150.png" },
  { id: 11, name: "Shoulder", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Shoulder-150x150.png" },
  { id: 12, name: "Hip", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Hip-150x150.png" },
  { id: 13, name: "Shin", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Shin-150x150.png" },
  { id: 14, name: "Thigh", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Thigh-150x150.png" },
  { id: 15, name: "Upper Arm", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Upper-Arm-150x150.png" },
  { id: 16, name: "Wrist", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Wrist-150x150.png" },
];

export function PainAreas() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Nav */}
        <MobileNav />

        {/* Page Content */}
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Header - Matching WomenWellnessSelfCare style */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => router.push(-1)}
                className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                <Activity size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Area of Pain</h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Select the area where you're experiencing pain
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pain Areas Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mb-8"
          >
            {painAreas.map((area, index) => (
              <motion.button
                key={area.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.03 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:border-[#00c0ff]/40 hover:shadow-lg transition-all group"
              >
                {/* Pain Image or Icon */}
                <div className="w-full aspect-square bg-gradient-to-br from-[#f3faff] to-[#E0F2FE] rounded-xl flex items-center justify-center mb-3 group-hover:from-[#E0F2FE] group-hover:to-[#BAE6FD] transition-all overflow-hidden">
                  {area.imageUrl ? (
                    <img 
                      src={area.imageUrl} 
                      alt={area.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Activity className="text-[#00c0ff]" size={32} strokeWidth={2} />
                  )}
                </div>
                <h3 className="text-[#043570] font-semibold text-sm text-center">
                  {area.name}
                </h3>
              </motion.button>
            ))}
          </motion.div>

          {/* Recommended Exercise Plans */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-[#0f172b] mb-4 border-l-4 border-[#00c0ff] pl-3">
              Recommended Exercise Plans
            </h2>

            <div className="space-y-4">
              {/* Lower back exercises */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#FCE7F3] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaDumbbell className="text-[#EC4899]" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0f172b] font-semibold text-base mb-1">Lower back exercises</h3>
                    <p className="text-[#64748B] text-sm">6 exercises · 14 mins · 3x week</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border-2 border-[#00c0ff] text-[#00c0ff] px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#00c0ff]/5 transition-all">
                    Quick Start
                  </button>
                  <button className="bg-[#00c0ff] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#0284c7] transition-all">
                    Explore
                  </button>
                </div>
              </motion.div>

              {/* Neck rehabilitation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#CCFBF1] rounded-full flex items-center justify-center flex-shrink-0">
                    <GiNightSleep className="text-[#14B8A6]" size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0f172b] font-semibold text-base mb-1">Neck rehabilitation</h3>
                    <p className="text-[#64748B] text-sm">4 exercises · 8 mins · Daily</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border-2 border-[#00c0ff] text-[#00c0ff] px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#00c0ff]/5 transition-all">
                    Quick Start
                  </button>
                  <button className="bg-[#00c0ff] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#0284c7] transition-all">
                    Explore
                  </button>
                </div>
              </motion.div>

              {/* Upper back exercises */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#FFF4ED] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRunning className="text-[#FB923C]" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0f172b] font-semibold text-base mb-1">Upper back exercises</h3>
                    <p className="text-[#64748B] text-sm">6 exercises · 12 mins · 3x week</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border-2 border-[#00c0ff] text-[#00c0ff] px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#00c0ff]/5 transition-all">
                    Quick Start
                  </button>
                  <button className="bg-[#00c0ff] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#0284c7] transition-all">
                    Explore
                  </button>
                </div>
              </motion.div>
            </div>

            {/* View All Link */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#00c0ff] hover:text-[#0284c7] font-semibold text-sm mt-4 flex items-center gap-1 mx-auto"
            >
              View All Exercise Plans →
            </motion.button>
          </motion.div>

          {/* CTA Banner - Matching WomenWellnessSelfCare style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#043570] to-[#00c0ff] rounded-2xl p-8 shadow-xl relative overflow-hidden"
          >
            {/* Background decoration circles */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 right-20 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-1/3 right-32 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-1/3 right-24 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-2/3 right-16 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="text-white" size={20} strokeWidth={2.5} />
                  <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                    Professional Care
                  </span>
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight">
                  Suffering from Physical Pain?
                </h3>
                <p className="text-white/90 text-sm mb-6 max-w-md leading-relaxed">
                  Get online Physio care for back pain, neck pain, shoulder pain, arthritis & more by personalized PTs
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/plans")}
                  className="flex items-center gap-2 bg-white text-[#043570] px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-xl transition-all"
                >
                  Book a Session Now
                  <ChevronRight size={18} strokeWidth={2.5} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/30 text-right">
                  <div className="text-3xl font-bold text-white mb-1">300+</div>
                  <div className="text-white/90 text-xs">Expert Therapists</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/30 text-right">
                  <div className="text-3xl font-bold text-white mb-1">8K+</div>
                  <div className="text-white/90 text-xs">Recoveries</div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
