import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Award, Timer, Ban, TrendingUp, Sparkles, Pencil, RotateCcw } from "lucide-react";
import { SobrietyTrackerModal, SobrietyFormData } from "./SobrietyTrackerModal";

export function SobrietyTracker() {
  const [quitDate, setQuitDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<SobrietyFormData | null>(null);
  const [stats, setStats] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    moneySaved: 0,
    timeSaved: 0,
    scout: 0,
    progress: 0
  });

  // Load quit date and form data from localStorage on mount or set default
  useEffect(() => {
    const savedDate = localStorage.getItem("quitSmokingDate");
    const savedFormData = localStorage.getItem("sobrietyFormData");
    
    if (savedDate) {
      setQuitDate(savedDate);
    } else {
      // Set default quit date to 4 hours ago for demo
      const now = new Date();
      const fourHoursAgo = new Date(now.getTime() - (4 * 60 * 60 * 1000));
      const defaultDate = fourHoursAgo.toISOString().slice(0, 16);
      setQuitDate(defaultDate);
      localStorage.setItem("quitSmokingDate", defaultDate);
    }

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Calculate stats based on quit date
  useEffect(() => {
    if (!quitDate) return;

    const calculateStats = () => {
      const now = new Date();
      const quit = new Date(quitDate);
      const diffMs = now.getTime() - quit.getTime();
      
      if (diffMs < 0) return; // Future date

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      // Calculate money and time saved based on user input from form
      let moneySaved = 0;
      let timeSaved = 0;

      if (formData) {
        // Calculate money saved using user's daily amount
        if (!formData.moneyDoesNotApply && formData.moneyPerDay > 0) {
          const totalDays = days + (hours / 24) + (minutes / (24 * 60));
          moneySaved = Math.floor(totalDays * formData.moneyPerDay);
        }

        // Calculate time saved using user's daily hours (convert to minutes for display)
        if (!formData.timeDoesNotApply && formData.timePerDay > 0) {
          const totalDays = days + (hours / 24) + (minutes / (24 * 60));
          timeSaved = Math.floor(totalDays * formData.timePerDay * 60); // Convert hours to minutes
        }
      } else {
        // Fallback to default calculations if no form data exists
        const cigarettesNotSmoked = days * 20 + hours * 0.83;
        moneySaved = Math.floor((days * 10) + (hours * 0.42));
        timeSaved = Math.floor(cigarettesNotSmoked * 5);
      }
      
      // Scout system: 0-1 day = 0, 1-7 days = 1, 8-30 days = 2, etc.
      let scout = 0;
      if (days >= 365) scout = 7;
      else if (days >= 180) scout = 6;
      else if (days >= 90) scout = 5;
      else if (days >= 30) scout = 4;
      else if (days >= 14) scout = 3;
      else if (days >= 7) scout = 2;
      else if (days >= 1) scout = 1;

      // Progress through current day (0-100%)
      const progressThroughDay = ((hours * 60 + minutes) / (24 * 60)) * 100;

      setStats({
        days,
        hours,
        minutes,
        seconds,
        moneySaved,
        timeSaved,
        scout,
        progress: Math.round(progressThroughDay)
      });
    };

    calculateStats();
    const interval = setInterval(calculateStats, 1000);

    return () => clearInterval(interval);
  }, [quitDate, formData]);

  const formatTime = () => {
    return `${stats.days}d ${stats.hours}h ${stats.minutes}m ${stats.seconds}s`;
  };

  const getMilestoneMessage = () => {
    // Get addiction name(s) from form data
    const addictionNames = formData?.addictions && formData.addictions.length > 0
      ? formData.addictions.length === 1
        ? formData.addictions[0]
        : formData.addictions.slice(0, 2).join(" & ") + (formData.addictions.length > 2 ? "..." : "")
      : "your habits";

    if (stats.days < 1) return { message: `Keep going! You can successfully quit ${addictionNames}`, emoji: "💪" };
    if (stats.days < 7) return { message: "Great start! Week 1 in progress", emoji: "🌟" };
    if (stats.days < 14) return { message: "Amazing! Two weeks ahead", emoji: "🎯" };
    if (stats.days < 30) return { message: "Incredible! One month coming up", emoji: "🏆" };
    if (stats.days < 90) return { message: "Fantastic! 90 days milestone ahead", emoji: "💎" };
    if (stats.days < 180) return { message: "Outstanding! Half year approaching", emoji: "⭐" };
    if (stats.days < 365) return { message: "Phenomenal! One year in sight", emoji: "👑" };
    return { message: "You're a champion!", emoji: "🎖️" };
  };

  const milestone = getMilestoneMessage();

  const handleFormSave = (data: SobrietyFormData) => {
    // Save the sober start date to localStorage
    localStorage.setItem("quitSmokingDate", data.soberStartDate);
    setQuitDate(data.soberStartDate);
    
    // Save additional form data to localStorage
    localStorage.setItem("sobrietyFormData", JSON.stringify(data));
    
    // Update formData state immediately to recalculate stats
    setFormData(data);
  };

  // Get user name from localStorage (if available from signup)
  const getUserName = () => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.name || "there";
    }
    return "there";
  };

  // Get currency symbol based on currency code
  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      INR: "₹",
      CAD: "$",
      AUD: "$"
    };
    return symbols[currency] || currency;
  };

  const displayCurrency = formData?.moneyCurrency || "INR";
  const currencySymbol = getCurrencySymbol(displayCurrency);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-blue-100/20 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-100/20 via-blue-100/20 to-purple-100/20 rounded-full blur-3xl -z-0" />

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] font-medium">YOUR JOURNEY</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="text-purple-400" size={14} />
                </motion.div>
              </div>
              <motion.h2 
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
                key={stats.days}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                Day {stats.days}
              </motion.h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                <p className="text-xs text-gray-500 font-medium">{milestone.emoji} {milestone.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset your sobriety tracker? This will clear all your progress and data.")) {
                    localStorage.removeItem("quitSmokingDate");
                    localStorage.removeItem("sobrietyFormData");
                    setFormData(null);
                    // Set default quit date to 4 hours ago for demo
                    const now = new Date();
                    const fourHoursAgo = new Date(now.getTime() - (4 * 60 * 60 * 1000));
                    const defaultDate = fourHoursAgo.toISOString().slice(0, 16);
                    setQuitDate(defaultDate);
                    localStorage.setItem("quitSmokingDate", defaultDate);
                  }
                }}
                className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                title="Reset tracker"
              >
                <RotateCcw className="text-gray-400 group-hover:text-red-500 transition-colors" size={18} />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                title="Edit sobriety settings"
              >
                <Pencil className="text-gray-400 group-hover:text-purple-500 transition-colors" size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Stats Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 lg:gap-x-20 lg:gap-y-10 flex-1">
              {/* Abstinence Time */}
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-red-200/50 group-hover:shadow-xl group-hover:shadow-red-300/60 transition-shadow duration-300"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Ban className="text-red-600" size={28} strokeWidth={2.5} />
                </motion.div>
                <motion.p 
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontSize: '24px' }}
                  key={formatTime()}
                >
                  {formatTime()}
                </motion.p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">Abstinence Time</p>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Money Saved */}
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-emerald-200/50 group-hover:shadow-xl group-hover:shadow-emerald-300/60 transition-shadow duration-300"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <DollarSign className="text-emerald-600" size={28} strokeWidth={2.5} />
                </motion.div>
                <motion.p 
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontSize: '24px' }}
                  key={stats.moneySaved}
                >
                  {currencySymbol}{stats.moneySaved}
                </motion.p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">Money Saved</p>
                <div className="mt-2 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className="text-emerald-500" size={12} />
                  <span className="text-[10px] text-emerald-600 font-semibold">Growing!</span>
                </div>
              </motion.div>

              {/* Scout Rank */}
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-purple-200/50 group-hover:shadow-xl group-hover:shadow-purple-300/60 transition-shadow duration-300"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="text-purple-600" size={28} strokeWidth={2.5} />
                </motion.div>
                <motion.p 
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontSize: '24px' }}
                  key={stats.scout}
                >
                  Scout: {stats.scout} ⭐
                </motion.p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">Current Rank</p>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Time Saved */}
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-blue-200/50 group-hover:shadow-xl group-hover:shadow-blue-300/60 transition-shadow duration-300"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Timer className="text-blue-600" size={28} strokeWidth={2.5} />
                </motion.div>
                <motion.p 
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontSize: '24px' }}
                  key={stats.timeSaved}
                >
                  {Math.floor(stats.timeSaved / 60)} Hrs
                </motion.p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">Time Saved</p>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>

            {/* Right side - Circular Progress */}
            <motion.div 
              className="flex flex-col items-center justify-center flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              <div className="relative w-60 h-60 md:w-72 md:h-72">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-2xl" />
                
                {/* SVG Circle */}
                <svg className="w-full h-full transform -rotate-90 relative z-10">
                  {/* Background circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="url(#bgGradient)"
                    strokeWidth="16"
                    fill="none"
                    opacity="0.2"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="url(#progressGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - stats.progress / 100)}`}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - stats.progress / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5E7EB" />
                      <stop offset="100%" stopColor="#D1D5DB" />
                    </linearGradient>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    key={stats.progress}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 bg-clip-text text-transparent mb-1">
                      {stats.progress}%
                    </p>
                    <p className="text-sm text-gray-500 font-medium">24 Hours</p>
                  </motion.div>
                  
                  {/* Pulsing dot indicator */}
                  <motion.div
                    className="absolute -top-2 right-1/2 translate-x-1/2"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/50" />
                  </motion.div>
                </div>
              </div>

              {/* Quote below circle */}
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl px-6 py-4 border border-purple-100">
                  <p className="text-sm text-gray-600 italic font-normal leading-relaxed">
                    "{formData?.goals && formData.goals.length > 0 
                      ? formData.goals[0] 
                      : "I respect my body and my loved ones."}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-600 font-medium">
                {formData?.emotions && formData.emotions.length > 0 
                  ? `I want to overcome feeling of ${formData.emotions.join(", ").toLowerCase()}`
                  : "You're doing amazing! Keep it up 💪"}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Sobriety Tracker Modal */}
      <SobrietyTrackerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleFormSave}
        initialData={{
          soberStartDate: quitDate,
          userName: getUserName()
        }}
      />
    </>
  );
}
