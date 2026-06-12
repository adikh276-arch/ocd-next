import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Circle, Moon, Music, Target, Waves, Clock, ArrowRight, Volume2, GraduationCap, Heart, ChevronRight, Play } from "lucide-react";
import { WiHorizonAlt } from "react-icons/wi";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DarkSidebar } from "./DarkSidebar";
import { MobileNav } from "./MobileNav";

export function MindfulnessSelfCare() {
  const router = useRouter();

  const featuredContent = [
    {
      title: "Calming Anxiety",
      duration: "5 min",
      type: "Meditation",
      tags: ["Mindfulness", "Restore"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBvY2VhbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Skills for Deep Relaxation",
      duration: "10 min",
      type: "Guided",
      tags: ["Curated by Mind", "Restorative"],
      image: "https://images.unsplash.com/photo-1597589022928-bb4002c099d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBmbG93ZXIlMjBzdW5saWdodHxlbnwxfHx8fDE3NzI3ODA4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Inner Peace Journey",
      duration: "8 min",
      type: "Guided",
      tags: ["Peace", "Breath"],
      image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxhbmNlJTIwc3RvbmVzJTIwemVufGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Mountain Stillness",
      duration: "12 min",
      type: "Sleep",
      tags: ["Nature", "Relax"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBtaXN0fGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const browseByGoal = [
    {
      title: "For Beginners",
      description: "Start your mindfulness journey",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMG91dGRvb3JzfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Coping with Grief",
      description: "Find peace and healing",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBiZW5jaCUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "For Beginners",
      description: "Start your mindfulness journey",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMG91dGRvb3JzfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Coping with Grief",
      description: "Find peace and healing",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBiZW5jaCUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const featuredCollections = [
    {
      title: "For Students",
      description: "Focus and study better",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMG91dGRvb3JzfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Coping with Grief",
      description: "Find peace and healing",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBiZW5jaCUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Better Sleep",
      description: "Rest and recharge deeply",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMG91dGRvb3JzfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Stress Relief",
      description: "Calm your mind and body",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBiZW5jaCUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjYyOTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const categories = [
    { name: "Meditation", icon: Circle, id: "meditation" },
    { name: "Concentration", icon: Moon, id: "concentration" },
    { name: "Music", icon: Music, id: "music" },
    { name: "Creatures", icon: Target, id: "focus" },
    { name: "Soundscapes", icon: Volume2, id: "soundscapes" },
    { name: "Students", icon: GraduationCap, id: "focus" },
    { name: "Affirmations", icon: Heart, id: "affirmations" }
  ];

  const timeRanges = [
    { label: "3 min", icon: Clock },
    { label: "5 min", icon: Clock },
    { label: "10 min", icon: Clock },
    { label: "15 min", icon: Clock },
    { label: "20 min", icon: Clock },
    { label: "30 min", icon: Clock },
    { label: "45 min", icon: Clock },
    { label: "60 min", icon: Clock }
  ];

  return (
    <>
      <div className="flex min-h-screen bg-[#0a1628]">
        {/* Sidebar */}
        <DarkSidebar />

        {/* Mobile Nav */}
        <MobileNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
            {/* Header */}
            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                {/* Back Arrow */}
                <button
                  onClick={() => router.push(-1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
                >
                  <ChevronLeft size={24} />
                </button>
                
                {/* Search Icon */}
                <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]">
                  <Search size={20} />
                </button>

                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl text-white">Mindfulness Self-Care</h1>
                </div>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-slate-300 pl-[108px]">
                Expert mindfulness tools and guided sessions for your wellness journey
              </p>
            </motion.div>

            {/* Featured on Mantra */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl text-white">Featured on Mantra</h2>
                <button 
                  onClick={() => router.push('/see-all/featured-on-mantra')}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  See All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {featuredContent.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => router.push('/meditation-detail/1')}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    className="group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-lg">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm text-white mb-1 text-left">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                      <span>•</span>
                      <span className="truncate">{item.tags[0]}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Browse by Category */}
            <motion.div
              className="mb-10 w-[1000px] max-w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4">
                <h2 className="text-lg md:text-xl text-white">Browse by Category</h2>
              </div>
              
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.name}
                      onClick={() => router.push(`/subcategory/${cat.id}`)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#1a2744] hover:bg-[#1f3060] rounded-xl text-white transition-colors whitespace-nowrap"
                    >
                      <Icon size={16} strokeWidth={2} />
                      <span className="text-sm">{cat.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* New & Noteworthy */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl text-white">New & Noteworthy</h2>
                <button 
                  onClick={() => router.push('/see-all/new-and-noteworthy')}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  See All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {featuredContent.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => router.push('/meditation-detail/1')}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                    className="group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-lg">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm text-white mb-1 text-left">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                      <span>•</span>
                      <span className="truncate">{item.tags[0]}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Browse by Goal */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl text-white">Browse by Goal</h2>
                <button 
                  onClick={() => router.push('/see-all/browse-by-goal')}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  See All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {browseByGoal.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => router.push('/browse-by-goal-detail/1')}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    className="group"
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-2 relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Browse by Time */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="mb-4">
                <h2 className="text-lg md:text-xl text-white">Browse by Time</h2>
              </div>
              
              <div className="flex gap-2 md:gap-3">
                {timeRanges.map((time, i) => {
                  const timeValue = parseInt(time.label);
                  return (
                    <motion.button
                      key={i}
                      onClick={() => router.push(`/time/${timeValue}`)}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                      className="flex-1 px-5 py-2.5 bg-gradient-to-br from-[#1a2744] to-[#0f172a] hover:from-[#1f3060] hover:to-[#1a2744] rounded-md text-white transition-all border border-slate-600/50"
                    >
                      <span className="text-sm whitespace-nowrap">{time.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Find a Daily Program */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                onClick={() => router.push('/daily-program/1')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-gradient-to-br from-[#1a2744] to-[#0f172a] border-2 border-[#1E293B]/50 rounded-2xl px-5 py-5 flex items-center justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md">
                    <WiHorizonAlt className="text-white" size={32} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-white">Find a daily program</h4>
                    <p className="text-xs mt-1 text-slate-300 font-medium">Mind your intentions for each program</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-[14px] flex items-center justify-center shadow-sm">
                  <ArrowRight className="text-white group-hover:translate-x-1 transition-transform flex-shrink-0" size={20} strokeWidth={2} />
                </div>
              </motion.button>
            </motion.div>

            {/* Favourites */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h2 className="text-lg md:text-xl px-1 text-white font-semibold">Favourites</h2>
                <button
                  onClick={() => router.push('/favorites')}
                  className="text-xs md:text-sm flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-white/60 hover:text-white hover:bg-white/5"
                >
                  See All <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  {
                    title: "Calming Anxiety",
                    duration: "5 min",
                    type: "Meditation",
                    category: "Mindfulness",
                    image: "https://images.unsplash.com/photo-1743112943399-fc221eefd181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtaW5nJTIwYW54aWV0eSUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzUzODc0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  },
                  {
                    title: "Skills for Deep Relaxation",
                    duration: "10 min",
                    type: "Guided",
                    category: "Curated by Mind",
                    image: "https://images.unsplash.com/photo-1772198809323-d942f958b4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwcmVsYXhhdGlvbiUyMHplbiUyMHRyYW5xdWlsfGVufDF8fHx8MTc3NTM4NzQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  },
                  {
                    title: "Inner Peace Journey",
                    duration: "8 min",
                    type: "Guided",
                    category: "Peace",
                    image: "https://images.unsplash.com/photo-1761273218291-ff0daf1e6a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHBlYWNlZnVsJTIwbWVkaXRhdGlvbiUyMGpvdXJuZXl8ZW58MXx8fHwxNzc1Mzg3NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  },
                  {
                    title: "Mountain Stillness",
                    duration: "12 min",
                    type: "Sleep",
                    category: "Nature",
                    image: "https://images.unsplash.com/photo-1570002635809-7b7926e7236d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnJpc2UlMjBzdGlsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc3NTM4NzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  }
                ].map((favorite, i) => (
                  <motion.button
                    key={favorite.title}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.45 + i * 0.08 }}
                    className="bg-[#1A2744] hover:bg-[#1f3060] rounded-2xl overflow-hidden transition-all group text-left shadow-lg hover:shadow-xl border border-[#1E293B]/30"
                    onClick={() => router.push('/meditation-detail/1')}
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={favorite.image}
                        alt={favorite.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                          <Play size={20} className="text-[#043570] ml-0.5" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20">
                        <span className="text-xs text-white font-medium flex items-center gap-1">
                          <Clock size={11} />
                          {favorite.duration}
                        </span>
                      </div>

                      {/* Heart icon */}
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <Heart size={13} className="text-white fill-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 md:p-4">
                      <h4 className="text-sm md:text-base font-semibold text-white mb-2 line-clamp-2 leading-snug">
                        {favorite.title}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-[#00c0ff]/15 text-[#00c0ff] border border-[#00c0ff]/25">
                          {favorite.type}
                        </span>
                        <span className="text-[10px] md:text-xs text-slate-400">
                          • {favorite.category}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
