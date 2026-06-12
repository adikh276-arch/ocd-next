import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Play, Lock, Heart, Share2, RotateCcw, RotateCw, Square, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { DarkSidebar } from "./DarkSidebar";
import { MobileNav } from "./MobileNav";

export function LifeIsKindDetailPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Life is Kind meditation data
  const meditationData = {
    title: "Life is Kind",
    subtitle: "Open Your Heart and Let Life's Kindness Bring You Calm.",
    image: "https://images.unsplash.com/photo-1647010828568-53b035ba81e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHlvZ2ElMjBzdW5zZXQlMjBiZWFjaHxlbnwxfHx8fDE3NzUzODg0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Emma Thompson",
      title: "Mindfulness Teacher",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    sessions: [
      { id: 1, title: "Embracing Kindness", duration: "5m", isLocked: false, isPlaying: true },
      { id: 2, title: "Compassion for Self", duration: "5m", isLocked: true, isPlaying: false },
      { id: 3, title: "Spreading Love", duration: "5m", isLocked: true, isPlaying: false }
    ]
  };

  const toggleFavorite = (sessionId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(sessionId)) {
        newFavorites.delete(sessionId);
      } else {
        newFavorites.add(sessionId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0a1628] relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={meditationData.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Sidebar */}
      <DarkSidebar />

      {/* Mobile Nav */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <main className="max-w-[500px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10 pb-[200px] flex flex-col min-h-screen">
          {/* Back Button */}
          <motion.button
            onClick={() => router.push(-1)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Header Section - Vertically Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center flex-1 flex flex-col items-center justify-center"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl text-white mb-3">
              {meditationData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-base md:text-lg mb-6">
              {meditationData.subtitle}
            </p>
          </motion.div>
        </main>

        {/* Media Player - Fixed to Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-0 left-0 right-0 md:left-[240px] z-20"
        >
          <div className="max-w-[500px] mx-auto p-6 space-y-4">
            {/* Top Row - Heart, Share, Language */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Heart size={20} className="text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Share2 size={20} className="text-white" />
                </button>
              </div>
              <button className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm flex items-center gap-1.5 hover:bg-white/20 transition-colors">
                <Globe size={16} className="text-white" />
                <span className="text-white text-sm font-medium">EN</span>
              </button>
            </div>

            {/* Playback Controls */}
            <div className="flex justify-center items-center gap-6">
              <button className="text-white hover:text-white/80 transition-colors">
                <RotateCcw size={24} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                <Play size={24} className="text-black ml-1" fill="black" />
              </button>
              <button className="text-white hover:text-white/80 transition-colors">
                <RotateCw size={24} />
              </button>
              <button className="text-white hover:text-white/80 transition-colors">
                <Square size={20} fill="white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-[40%] bg-white rounded-full"></div>
              </div>
              <div className="flex justify-between text-white text-xs">
                <span>04:07</span>
                <span>10:17</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
