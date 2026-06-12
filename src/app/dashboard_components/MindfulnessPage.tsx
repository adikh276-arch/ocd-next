import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle, ChevronRight, ChevronLeft, Headphones, BookOpen, Play, Target, Moon, Briefcase, Music, Circle, Sunrise, Waves, Coffee, Clock, Award, Sparkles, Heart, Wind, BarChart3, MessageCircle, ArrowRight, Star, Check, FileText, Activity, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DarkSidebar } from "./DarkSidebar";
import { MobileNav } from "./MobileNav";
import { MobileAppModal } from "./MobileAppModal";
const meditationInstructor = "/dashboard_assets/47db5590b60a149044811969902735d9f1d5d598.png";

export function MindfulnessPage() {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);
  const [showTodaysPlan, setShowTodaysPlan] = useState(false);

  const isDark = true; // Mindfulness uses dark theme

  // Mindfulness service data
  const service = {
    name: "Mindfulness",
    description: "Find inner peace with guided meditation sessions and mindfulness practices.",
    longDescription: "Discover the transformative power of meditation. Our guided sessions help reduce stress, improve focus, enhance sleep quality, and promote overall mental wellbeing through ancient practices adapted for modern life.",
    features: [
      "Guided meditation sessions for all levels",
      "Breathing exercises and techniques",
      "Sleep meditation and bedtime stories",
      "Stress relief programs",
      "Mindfulness training courses",
      "Daily meditation reminders"
    ],
    image: "https://images.unsplash.com/photo-1766524791322-8753e582e652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB6ZW58ZW58MXx8fHwxNzcyNjI5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🧘",
    color: "#F59E0B",
    stats: [
      { value: "1000+", label: "Sessions" },
      { value: "92%", label: "Stress Relief" },
      { value: "30K+", label: "Users" }
    ],
    pathways: [
      { title: "Gratitude Meditation Session", type: "Audio", points: "5 Points", icon: "🎧", duration: "8 min", completed: false },
      { title: "Meditation for Inner Peace", type: "Audio", points: "10 Points", icon: "🎧", duration: "12 min", completed: false },
      { title: "Thought Patterns", type: "Exercise", points: "5 Points", icon: "📖", duration: "6 min", completed: false },
      { title: "Emotional Awareness", type: "Exercise", points: "5 Points", icon: "📖", duration: "5 min", completed: false },
      { title: "Nervous System Check", type: "Exercise", points: "5 Points", icon: "📖", duration: "7 min", completed: false },
    ],
    popularCategories: [
      { name: "Meditation", iconKey: "meditate" },
      { name: "Sleep", iconKey: "sleep" },
      { name: "Music", iconKey: "music" },
      { name: "Dailies", iconKey: "dailies" },
      { name: "Soundscapes", iconKey: "soundscapes" },
      { name: "For Work", iconKey: "work" },
    ],
  };

  // Icon mapping for popular categories
  const catIconMap: Record<string, any> = {
    meditate: Circle,
    sleep: Moon,
    music: Music,
    dailies: Sunrise,
    soundscapes: Waves,
    work: Coffee,
  };

  // Map category names to subcategory IDs for navigation
  const categoryToSubcategoryMap: Record<string, string> = {
    "Meditation": "meditation",
    "Sleep": "sleep",
    "Music": "music",
    "Dailies": "focus",
    "Soundscapes": "soundscapes",
    "For Work": "focus",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <>
      {showMobileAppModal && <MobileAppModal onClose={() => setShowMobileAppModal(false)} />}

      <div className="flex min-h-screen bg-[#0a1628]">
        {/* Sidebar */}
        <DarkSidebar />

        {/* Mobile Nav */}
        <MobileNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
            {/* Service Header */}
            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                {/* Back Arrow */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-lg flex-shrink-0" style={{ backgroundColor: service.color }}>
                  {service.icon}
                </div>
                <h1 className="text-xl md:text-2xl text-white">{service.name}</h1>
              </div>
              <p className="text-xs md:text-sm leading-relaxed max-w-xl text-slate-300 pl-[54px]">{service.description}</p>
            </motion.div>

            {/* Expert Support Section */}
            <motion.div
              className="mb-[10px]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-[10px]">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/mindfulness-self-care")}
                  className="w-full bg-[#1a2744] border border-[#1E293B]/25 rounded-2xl px-5 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Sparkles className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-white">Resources</h4>
                      <p className="text-xs mt-1 text-slate-400">Mindfulness & guided sessions</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} strokeWidth={2} />
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Today's Plan Section */}
            <div className="border bg-[#1a2744] rounded-2xl mb-[10px] shadow-sm overflow-hidden">
              {/* Today's Plan Accordion Button */}
              <motion.button
                onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className="w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Star className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-base mb-0.5 text-white">
                        Today's Plan
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300">
                        Complete your daily wellness activities
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-white flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                </div>
              </motion.button>

              {/* Today's Plan Content (Collapsible) */}
              {showTodaysPlan && (
              <motion.div 
                className="px-5 md:px-6 pb-5 md:pb-6 pt-2.5"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
              >
              <motion.div 
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {service.pathways.map((pathway, index) => {
                const isCompleted = completedTasks.has(index);
                
                // Map activity types to colors and icon components
                const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                  'Audio': { 
                    bgColor: '#FEF3C7', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#F59E0B',
                    icon: <Headphones size={24} className="text-white" strokeWidth={2} />
                  },
                  'Tracker': { 
                    bgColor: '#DBEAFE', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#3B82F6',
                    icon: <BarChart3 size={24} className="text-white" strokeWidth={2} />
                  },
                  'Assessment': { 
                    bgColor: '#F3E8FF', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#A855F7',
                      icon: <FileText size={24} className="text-white" strokeWidth={2} />
                  },
                  'Activity': { 
                    bgColor: '#D1FAE5', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#10B981',
                    icon: <Activity size={24} className="text-white" strokeWidth={2} />
                  },
                  'Exercise': { 
                    bgColor: '#DBEAFE', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#3B82F6',
                    icon: <BookOpen size={24} className="text-white" strokeWidth={2} />
                  },
                  'Tips': { 
                    bgColor: '#FEF3C7', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#F59E0B',
                    icon: <Sparkles size={24} className="text-white" strokeWidth={2} />
                  },
                  'Video': { 
                    bgColor: '#FEE2E2', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#EF4444',
                    icon: <Play size={24} className="text-white" strokeWidth={2} />
                  },
                  'To do': { 
                    bgColor: '#D1FAE5', 
                    iconBg: 'bg-white/10 backdrop-blur-sm', 
                    textColor: '#10B981',
                    icon: <CheckCircle size={24} className="text-white" strokeWidth={2} />
                  },
                };

                const config = activityConfig[pathway.type] || activityConfig['Activity'];

                return (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => {
                      // If it's an Assessment, show the mobile app modal
                      if (pathway.type === "Assessment") {
                        setShowMobileAppModal(true);
                        return;
                      }
                      setCompletedTasks(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(index)) {
                          newSet.delete(index);
                        } else {
                          newSet.add(index);
                        }
                        return newSet;
                      });
                    }}
                    className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                  >
                    {/* Checkbox */}
                    <div 
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-white/25'
                      }`}
                    >
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="text-white" size={12} strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Icon */}
                    <div 
                      className={`w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md ${config.iconBg}`}
                    >
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base mb-1 font-medium text-white">
                        {pathway.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span 
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: config.bgColor, color: config.textColor }}
                        >
                          {pathway.type}
                        </span>
                        {pathway.duration && (
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock size={12} />
                            {pathway.duration}
                          </span>
                        )}
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <Award size={12} className="text-slate-400" />
                          {pathway.points}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight 
                      className="flex-shrink-0 transition-all text-white/20 group-hover:text-[#9CA3AF]" 
                      size={20} 
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
            )}
            </div>

            {/* Popular Categories */}
            {service.popularCategories && (
              <motion.div
                className="mb-5 md:mb-6 mt-6 md:mt-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg px-1 text-white">Popular Categories</h3>
                  <button 
                    onClick={() => router.push("/categories")}
                    className="text-xs md:text-sm flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-white/60 hover:text-white hover:bg-white/5"
                  >
                    See All <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                  {service.popularCategories.map((cat, i) => {
                    const Icon = catIconMap[cat.iconKey] ?? Circle;
                    return (
                      <motion.button
                        key={cat.name}
                        onClick={() => router.push(`/subcategory/${categoryToSubcategoryMap[cat.name]}`)}
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.28 + i * 0.06 }}
                        className="bg-[#1A2744] hover:bg-[#1f3060] rounded-2xl py-6 px-3 flex flex-col items-center gap-3 transition-all group"
                      >
                        <Icon size={26} className="text-white group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                        <span className="text-xs md:text-sm text-center leading-tight text-white">{cat.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Favourites Section */}
            <motion.div
              className="mb-6 md:mb-8 mt-6 md:mt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h3 className="text-base md:text-lg px-1 text-white font-semibold">Favourites</h3>
                <button 
                  onClick={() => router.push("/favorites")}
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
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.08 }}
                    className="bg-[#1A2744] hover:bg-[#1f3060] rounded-2xl overflow-hidden transition-all group text-left shadow-lg hover:shadow-xl border border-[#1E293B]/30"
                    onClick={() => setShowMobileAppModal(true)}
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

            {/* CTA Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#1a2744] via-[#0f172a] to-[#1a2744] rounded-2xl p-6 md:p-8 shadow-lg border border-[#1E293B]/50 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 mb-6 md:mb-8"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00c0ff]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#0EA5E9]/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                <div className="flex-1 space-y-4">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#00c0ff]/10 text-[#00c0ff] border-[#00c0ff]/20 px-3 py-1.5 rounded-full text-xs font-semibold border">
                    <Sparkles size={14} className="text-[#00c0ff]" />
                    Certified Mindfulness Instructors
                  </div>

                  {/* Heading */}
                  <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                    Find peace and clarity through guided mindfulness
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
                    Reduce stress, improve focus, and enhance wellbeing with guided meditation sessions and mindfulness practices led by certified instructors.
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((_, idx) => (
                          <div key={idx} className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-[#1a2744]">
                            <Users size={14} className="text-white" />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        250+ Mindfulness Instructors
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={16} className="text-[#FFA500] fill-[#FFA500]" />
                      <span className="text-sm font-semibold text-white">4.9</span>
                      <span className="text-xs text-slate-400">
                        (2.8k reviews)
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push("/care-team")}
                    className="bg-[#00c0ff] hover:bg-[#00aae6] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(0,192,255,0.5)] group/btn"
                  >
                    Book Your First Session
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Profile Image with decoration */}
                <div className="hidden md:block flex-shrink-0 relative mx-auto w-auto md:w-64">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff] to-[#0EA5E9] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  
                  {/* Image container */}
                  <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#1a2744] shadow-2xl ring-4 ring-[#00c0ff]/20">
                    <ImageWithFallback
                      src={meditationInstructor}
                      alt="Mindfulness Instructor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Tools - REMOVED */}
          </main>
        </div>
      </div>
    </>
  );
}
