import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Play, Lock, Heart, Share2, RotateCcw, RotateCw, Square, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { DarkSidebar } from "./DarkSidebar";
import { MobileNav } from "./MobileNav";

export function MeditationDetailPage() {
  const router = useRouter();
  const { meditationId } = useParams();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Meditation data mapping based on ID
  const meditationDatabase: Record<string, any> = {
    "1": {
      title: "Making Your Life Sacred",
      subtitle: "Turn Ordinary Moments Into Sacred Spaces for Reflection and Healing.",
      image: "https://images.unsplash.com/photo-1771257328402-d579d0a2f928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwY2FuZGxlJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzc1Mzg4NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "Dr. Sarah Williams",
        title: "Meditation Guide",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Opening Your Heart", duration: "3m", isLocked: false, isPlaying: true },
        { id: 2, title: "Finding Sacred Moments", duration: "4m", isLocked: true, isPlaying: false },
        { id: 3, title: "Daily Rituals", duration: "5m", isLocked: true, isPlaying: false }
      ]
    },
    "2": {
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
    },
    "3": {
      title: "Learning To Surrender",
      subtitle: "Embrace Calm and Healing by Allowing Life to Unfold Naturally.",
      image: "https://images.unsplash.com/photo-1690673647794-57701e56f038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBtZWRpdGF0aW5nJTIwbmF0dXJlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzUzODg0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "Michael Chen",
        title: "Zen Practitioner",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Letting Go Practice", duration: "3m", isLocked: false, isPlaying: true },
        { id: 2, title: "Trust and Flow", duration: "2m", isLocked: true, isPlaying: false },
        { id: 3, title: "Release Control", duration: "3m", isLocked: true, isPlaying: false }
      ]
    },
    "4": {
      title: "You Are Allowed",
      subtitle: "Allow Yourself the Space to Breathe, Reflect, and Renew.",
      image: "https://images.unsplash.com/photo-1767884161044-e75de514a2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBzdG9uZXMlMjBwZWFjZWZ1bCUyMHNwYXxlbnwxfHx8fDE3NzUzODg0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "Sophia Martinez",
        title: "Wellness Coach",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Permission to Rest", duration: "4m", isLocked: false, isPlaying: true },
        { id: 2, title: "Self-Acceptance", duration: "5m", isLocked: true, isPlaying: false },
        { id: 3, title: "Honoring Your Needs", duration: "4m", isLocked: true, isPlaying: false }
      ]
    },
    "5": {
      title: "Inner Peace Journey",
      subtitle: "Discover Deep Tranquility Through Guided Mindfulness Practice.",
      image: "https://images.unsplash.com/photo-1697112831076-aafc6f67df1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwYnVkZGhhJTIwcGVhY2VmdWwlMjB0ZW1wbGV8ZW58MXx8fHwxNzc1Mzg4NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "David Kumar",
        title: "Buddhist Meditation Teacher",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Finding Your Center", duration: "6m", isLocked: false, isPlaying: true },
        { id: 2, title: "Deep Stillness", duration: "6m", isLocked: true, isPlaying: false },
        { id: 3, title: "Eternal Peace", duration: "6m", isLocked: true, isPlaying: false }
      ]
    },
    "6": {
      title: "Blooming Mindfulness",
      subtitle: "Like a Lotus, Rise Above and Find Clarity in Stillness.",
      image: "https://images.unsplash.com/photo-1762913476157-8717b0701112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMGxvdHVzJTIwZmxvd2VyJTIwd2F0ZXJ8ZW58MXx8fHwxNzc1Mzg4NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "Rachel Green",
        title: "Yoga and Meditation Instructor",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Lotus Meditation", duration: "3m", isLocked: false, isPlaying: true },
        { id: 2, title: "Rising Above", duration: "4m", isLocked: true, isPlaying: false },
        { id: 3, title: "Clarity and Grace", duration: "3m", isLocked: true, isPlaying: false }
      ]
    },
    "7": {
      title: "Forest Bathing",
      subtitle: "Connect with Nature's Wisdom and Find Your Center in Stillness.",
      image: "https://images.unsplash.com/photo-1760857224786-15621b02ea64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGZvcmVzdCUyMG1lZGl0YXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzc1Mzg4NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "James Wilson",
        title: "Nature Connection Guide",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Forest Connection", duration: "8m", isLocked: false, isPlaying: true },
        { id: 2, title: "Nature's Healing", duration: "7m", isLocked: true, isPlaying: false },
        { id: 3, title: "Earth Grounding", duration: "7m", isLocked: true, isPlaying: false }
      ]
    },
    "8": {
      title: "Dawn Awakening",
      subtitle: "Start Your Day with Powerful Intention and Peaceful Awareness.",
      image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbWVkaXRhdGlvbiUyMG1vdW50YWluJTIweW9nYXxlbnwxfHx8fDE3NzUzODg1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        name: "Olivia Brown",
        title: "Morning Ritual Specialist",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop"
      },
      sessions: [
        { id: 1, title: "Morning Intention", duration: "5m", isLocked: false, isPlaying: true },
        { id: 2, title: "Sunrise Energy", duration: "4m", isLocked: true, isPlaying: false },
        { id: 3, title: "Daily Awakening", duration: "5m", isLocked: true, isPlaying: false }
      ]
    }
  };

  // Get meditation data based on ID, fallback to first meditation
  const meditationData = meditationDatabase[meditationId || "1"] || meditationDatabase["1"];

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
        <main className="max-w-[500px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
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

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl text-white mb-3">
              {meditationData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-base md:text-lg mb-6">
              {meditationData.subtitle}
            </p>

            {/* Author Section */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                <img
                  src={meditationData.author.avatar}
                  alt={meditationData.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium text-lg">{meditationData.author.name}</p>
                <p className="text-white/70 text-sm">{meditationData.author.title}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-white/30 mx-auto"></div>
          </motion.div>

          {/* Media Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="p-6 space-y-4">
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

          {/* Sessions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {meditationData.sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`flex items-start justify-between ${
                  session.isLocked ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {/* Left Side - Play Icon and Session Info */}
                <div className="flex items-start gap-3">
                  {/* Play Icon */}
                  {!session.isLocked && (
                    <Play size={20} className="text-white mt-0.5" />
                  )}
                  
                  <div>
                    <h3 className="text-white text-base md:text-lg">
                      {session.id}. {session.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-0.5">
                      {session.duration}
                    </p>
                  </div>
                </div>

                {/* Right Side - Heart or Lock Icon */}
                <div>
                  {session.isLocked ? (
                    <Lock size={20} className="text-white/70" />
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(session.id);
                      }}
                      className="transition-colors"
                    >
                      <Heart
                        size={20}
                        className={
                          favorites.has(session.id)
                            ? "text-red-500 fill-red-500"
                            : "text-white/70 hover:text-red-500"
                        }
                      />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
