import { useRouter } from "next/navigation";
import { MessageCircle, ArrowRight, Activity, Heart, ChevronRight, Sparkles, Clock, Check, Award, CheckCircle, Headphones, BarChart3, FileText, BookOpen, Play, ChevronDown, AlertCircle, Library, Wind, Target, Video, Box, Weight, Gauge, Utensils, Droplet, GlassWater, CalendarDays, Smile, Baby, Moon, Ruler, Cigarette, Zap, Eye, BarChart, ClipboardCheck, Star, Beer, Pill, Leaf, Waves, Moon as MoonIcon, Sparkle, Calculator, User, BookOpenCheck, DollarSign, Wind as Breathing, ThermometerSun, UtensilsCrossed, Focus, Pencil, X } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useState } from "react";
import { MobileAppModal } from "./MobileAppModal";

export function DeaddictionPage() {
  const router = useRouter();
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showTodaysPlan, setShowTodaysPlan] = useState(false);
  const [activeSubstance, setActiveSubstance] = useState("alcohol");
  const [showTabSelector, setShowTabSelector] = useState(false);
  const [selectedTabs, setSelectedTabs] = useState<string[]>([
    'alcohol', 'tobacco', 'opioids', 'cannabis', 'stimulants', 'benzodiazepines', 'kratom', 'mdma'
  ]);

  // Service data
  const service = {
    name: "Deaddiction",
    description: "Comprehensive deaddiction support to help you overcome substance use and lead a healthier life.",
    longDescription: "Break free from addiction with our comprehensive deaddiction program. Our team of deaddiction therapists, counselors, and support specialists work together to create a personalized recovery plan that addresses your unique challenges and helps you maintain long-term sobriety.",
    features: [
      "24/7 craving support and crisis intervention",
      "Personalized recovery plans from certified therapists",
      "Evidence-based therapy and counseling sessions",
      "Relapse prevention strategies and coping tools",
      "Support groups and peer connections",
      "Educational resources on addiction and recovery"
    ],
    image: "https://images.unsplash.com/photo-1620148222862-b95cf7405a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGRpY3Rpb24lMjByZWNvdmVyeSUyMHN1cHBvcnQlMjB0aGVyYXB5fGVufDF8fHx8MTc3NDUwMjg4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: "🛡️",
    color: "#8B5CF6",
    stats: [
      { value: "10K+", label: "Patients" },
      { value: "85%", label: "Recovery Rate" },
      { value: "100+", label: "Specialists" }
    ],
    pathways: [
      { title: "Addiction Risk Assessment", type: "Assessment", points: "0 Points", icon: "📋", duration: "8 min", completed: false },
      { title: "Understanding Triggers", type: "Tips", points: "10 Points", icon: "💡", duration: "5 min", completed: false },
      { title: "Breaking the Cycle of Addiction", type: "Video", points: "10 Points", icon: "▶️", duration: "7 min", completed: false },
      { title: "Healthy Coping Mechanisms", type: "Video", points: "10 Points", icon: "▶️", duration: "4 min", completed: false },
      { title: "Recovery Journey Q&A", type: "Tips", points: "10 Points", icon: "💡", duration: "6 min", completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Deaddiction Therapist", subtitle: "Get professional support for recovery", iconType: "chat" },
    ],
    trackers: [
      { label: "Consumption Tracker", iconKey: "assessment", grad: "#E74C3C", link: "https://web.mantracare.com/app/consumption_tracker" },
      { label: "Smoking Craving", iconKey: "craving", grad: "#3498DB", link: "https://web.mantracare.com/app/smoke_craving_tracker" },
      { label: "Withdrawal", iconKey: "withdrawal", grad: "#9B59B6", link: "https://web.mantracare.com/app/withdrawal_tracker" },
      { label: "Urge Watcher", iconKey: "watch", grad: "#F97316", link: "https://web.mantracare.com/app/urge-watcher" },
      { label: "Smoking Index", iconKey: "index", grad: "#F39C12", link: "https://web.mantracare.com/app/smoking-index/" },
      { label: "Mood", iconKey: "mood", grad: "#FF9F43", link: "https://platform.mantracare.org/ocd/mood_tracker" },
    ],
  };

  const t = {
    bg: "bg-[#F9FAFB]",
    cardBg: "bg-white",
    headingText: "text-[#020817]",
    subText: "text-[#64748B]",
    seeAllBtn: "text-[#00c0ff] hover:bg-[#00c0ff]/5",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Mobile Nav - mobile only */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-20 md:pt-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-start gap-3 mb-6">
              {/* Back Button */}
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#020817] transition-colors mt-1"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 mt-0.5"
                style={{ backgroundColor: service.color }}
              >
                {service.icon}
              </div>
              
              {/* Title and Description */}
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl mb-2 ${t.headingText}`}>
                  {service.name}
                </h1>
                <p className={`text-sm md:text-base ${t.subText} leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature Links */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              {service.featureLinks.map((link, i) => {
                const iconConfig = {
                  chat: {
                    Icon: MessageCircle,
                    cardBg: "bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]",
                    iconBg: "bg-white/20 backdrop-blur-sm",
                    iconColor: "text-white",
                    titleColor: "text-white",
                    subColor: "text-white/90",
                    arrowColor: "text-white",
                    arrowBg: "bg-white/20 backdrop-blur-sm",
                  },
                  brain: {
                    Icon: Library,
                    cardBg: "bg-white border border-slate-200",
                    iconBg: "bg-[#FF9F43]/10",
                    iconColor: "text-[#FF9F43]",
                    titleColor: "text-[#020817]",
                    subColor: "text-[#64748B]",
                    arrowColor: "text-[#020817]",
                    arrowBg: "bg-[#FF9F43]/10",
                  },
                };

                const s = iconConfig[link.iconType] || iconConfig.brain;

                return (
                  <div key={link.title}>
                    <motion.button
                      onClick={() => {
                        if (link.title === "Talk to a Deaddiction Therapist") {
                          router.push("/care-team");
                        } else if (link.title === "Self Care") {
                          router.push("/substance-use-self-care");
                        }
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                      className={`relative w-full flex items-center justify-between px-5 py-5 text-left ${s.cardBg} rounded-2xl shadow-sm hover:shadow-lg transition-all group overflow-hidden`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-12 h-12 ${s.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                          <s.Icon className={s.iconColor} size={24} strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className={`font-semibold text-base mb-1 ${s.titleColor}`}>
                            {link.title}
                          </h3>
                          <p className={`text-sm ${s.subColor}`}>
                            {link.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className={`relative z-10 w-10 h-10 ${s.arrowBg} rounded-[14px] flex items-center justify-center shadow-sm`}>
                        <ArrowRight className={`${s.arrowColor} group-hover:translate-x-1 transition-transform flex-shrink-0`} size={20} strokeWidth={2} />
                      </div>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Today's Plan Section */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden`}>
              <motion.button
                onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className="w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Star className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                        Today's Plan
                      </h3>
                      <p className={`text-xs md:text-sm ${t.subText}`}>
                        Complete your daily wellness activities
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                </div>
              </motion.button>

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

                      const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                        'Audio': {
                          bgColor: '#FEF3C7',
                          iconBg: 'bg-[#F59E0B]',
                          textColor: '#F59E0B',
                          icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                        },
                        'Tracker': {
                          bgColor: '#DBEAFE',
                          iconBg: 'bg-[#3B82F6]',
                          textColor: '#3B82F6',
                          icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                        },
                        'Assessment': {
                          bgColor: '#F3E8FF',
                          iconBg: 'bg-[#A855F7]',
                          textColor: '#A855F7',
                          icon: <FileText size={20} className="text-white" strokeWidth={2} />
                        },
                        'Activity': {
                          bgColor: '#D1FAE5',
                          iconBg: 'bg-[#10B981]',
                          textColor: '#10B981',
                          icon: <Activity size={20} className="text-white" strokeWidth={2} />
                        },
                        'Tips': {
                          bgColor: '#FEF3C7',
                          iconBg: 'bg-[#F59E0B]',
                          textColor: '#F59E0B',
                          icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                        },
                        'Video': {
                          bgColor: '#FEE2E2',
                          iconBg: 'bg-[#EF4444]',
                          textColor: '#EF4444',
                          icon: <Play size={20} className="text-white" strokeWidth={2} />
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
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-[#E5E7EB]'
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
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                          >
                            {config.icon}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm md:text-base mb-1 font-medium text-[#374151]">
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
                                <span className="text-[#9CA3AF] flex items-center gap-1">
                                  <Clock size={12} />
                                  {pathway.duration}
                                </span>
                              )}
                              <span className="text-[#10B981] flex items-center gap-1 font-medium">
                                <Award size={12} className="text-[#10B981]" />
                                {pathway.points}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight
                            className="flex-shrink-0 transition-all text-[#E5E7EB] group-hover:text-[#9CA3AF]"
                            size={20}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Substances Section with Tabs */}
          <motion.div
            className="rounded-2xl mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-3 md:mb-4 mt-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-[22px] flex items-center gap-2 mb-1 ${t.headingText}`}>
                    <Sparkles className="text-[#00c0ff]" size={16} />
                    Substances
                  </h2>
                  <p className={`text-sm ${t.subText}`}>
                    Monitor and track your substance use
                  </p>
                </div>
                <button
                  onClick={() => setShowTabSelector(!showTabSelector)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Edit visible tabs"
                >
                  <Pencil size={18} className="text-[#64748B]" />
                </button>
              </div>

              {/* Tab Selector Modal */}
              {showTabSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 w-80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Select Substances</h3>
                    <button
                      onClick={() => setShowTabSelector(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {[
                      { id: 'alcohol', label: 'Alcohol', Icon: Beer },
                      { id: 'tobacco', label: 'Tobacco', Icon: Cigarette },
                      { id: 'opioids', label: 'Opioids', Icon: Pill },
                      { id: 'cannabis', label: 'Cannabis', Icon: Leaf },
                      { id: 'stimulants', label: 'Stimulants', Icon: Zap },
                      { id: 'benzodiazepines', label: 'Benzodiazepines', Icon: Pill },
                      { id: 'kratom', label: 'Kratom', Icon: Leaf },
                      { id: 'mdma', label: 'MDMA', Icon: Sparkles },
                    ].map((tab) => {
                      const TabIcon = tab.Icon;
                      const isSelected = selectedTabs.includes(tab.id);
                      return (
                        <label
                          key={tab.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTabs([...selectedTabs, tab.id]);
                              } else {
                                const newTabs = selectedTabs.filter(t => t !== tab.id);
                                if (newTabs.length > 0) {
                                  setSelectedTabs(newTabs);
                                  if (activeSubstance === tab.id) {
                                    setActiveSubstance(newTabs[0]);
                                  }
                                }
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <TabIcon size={16} className="text-gray-600" />
                          <span className="text-sm text-gray-700">{tab.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Substance Tabs */}
            <div className="flex justify-between mb-2 pb-2 pt-2 gap-2">
              {[
                { id: 'alcohol', label: 'Alcohol', subtitle: '', Icon: Beer, color: '#FF6B35' },
                { id: 'tobacco', label: 'Tobacco', subtitle: '', Icon: Cigarette, color: '#3B82F6' },
                { id: 'opioids', label: 'Opioids', subtitle: '', Icon: Pill, color: '#E91E63' },
                { id: 'cannabis', label: 'Cannabis', subtitle: '', Icon: Leaf, color: '#10B981' },
                { id: 'stimulants', label: 'Stimulants', subtitle: 'Cocaine · Meth · Adderall', Icon: Zap, color: '#F43F5E' },
                { id: 'benzodiazepines', label: 'Benzodiazepines', subtitle: 'Xanax · Valium · Klonopin', Icon: Pill, color: '#8B5CF6' },
                { id: 'kratom', label: 'Kratom', subtitle: 'Mitragyna speciosa', Icon: Leaf, color: '#84CC16' },
                { id: 'mdma', label: 'MDMA', subtitle: 'Ecstasy · Molly', Icon: Sparkles, color: '#EC4899' },
              ].filter((substance) => selectedTabs.includes(substance.id)).map((substance) => {
                const isActive = activeSubstance === substance.id;
                return (
                  <motion.button
                    key={substance.id}
                    onClick={() => setActiveSubstance(substance.id)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex flex-col items-center gap-2.5 px-5 py-3.5 rounded-2xl transition-all group overflow-visible flex-1 ${
                      isActive 
                        ? 'shadow-md' 
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: isActive ? substance.color : undefined,
                    }}
                  >
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full shadow-md"
                        style={{ backgroundColor: '#2563EB' }}
                      />
                    )}
                    
                    {/* Icon with background */}
                    <div 
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                        isActive 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}
                    >
                      <substance.Icon 
                        size={20} 
                        strokeWidth={2.5} 
                        className={isActive ? 'text-white' : 'text-gray-600'}
                      />
                    </div>
                    
                    {/* Label */}
                    <span className={`text-xs font-semibold transition-colors ${
                      isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {substance.label}
                    </span>
                    
                    {/* Bottom border indicator for active tab */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-b-2xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Tracker Cards Container */}
            <motion.div 
              key={activeSubstance}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              {/* Trackers Grid */}
              <div className="space-y-6">
                {activeSubstance === 'alcohol' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Consumption', Icon: Droplet, color: '#EF4444' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Sleep', Icon: MoonIcon, color: '#3B82F6' },
                        { label: 'Withdrawal', Icon: Zap, color: '#A855F7' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Energy', Icon: Sparkle, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'tobacco' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Usage', Icon: Cigarette, color: '#3B82F6' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Irritability', Icon: AlertCircle, color: '#EF4444' },
                        { label: 'Breathing', Icon: Wind, color: '#14B8A6' },
                        { label: 'Motivation', Icon: Heart, color: '#F97316' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Sleep', Icon: MoonIcon, color: '#A855F7' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Savings', Icon: DollarSign, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'opioids' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Dosage', Icon: Pill, color: '#E91E63' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Pain Level', Icon: ThermometerSun, color: '#A855F7' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Withdrawal', Icon: Zap, color: '#A855F7' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Energy', Icon: Sparkle, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'cannabis' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Usage', Icon: Leaf, color: '#10B981' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Focus', Icon: Target, color: '#14B8A6' },
                        { label: 'Sleep', Icon: MoonIcon, color: '#A855F7' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Appetite', Icon: UtensilsCrossed, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'stimulants' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Consumption', Icon: Droplet, color: '#EF4444' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Sleep', Icon: MoonIcon, color: '#A855F7' },
                        { label: 'Crash Log', Icon: AlertCircle, color: '#EF4444' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Energy', Icon: Sparkle, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'benzodiazepines' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Consumption', Icon: Droplet, color: '#EF4444' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Sleep', Icon: MoonIcon, color: '#A855F7' },
                        { label: 'Crash Log', Icon: AlertCircle, color: '#EF4444' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Energy', Icon: Sparkle, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'kratom' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Consumption', Icon: Droplet, color: '#EF4444' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Sleep', Icon: MoonIcon, color: '#A855F7' },
                        { label: 'Crash Log', Icon: AlertCircle, color: '#EF4444' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Energy', Icon: Sparkle, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}

                {activeSubstance === 'mdma' && (
                  <>
                    {/* Self Care Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <Heart className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Self Care
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Consumption', Icon: Droplet, color: '#EF4444' },
                        { label: 'Craving', Icon: Waves, color: '#3B82F6' },
                        { label: 'Mood', Icon: Smile, color: '#F97316' },
                        { label: 'Sleep', Icon: MoonIcon, color: '#A855F7' },
                        { label: 'Crash Log', Icon: AlertCircle, color: '#EF4444' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                    
                    {/* Trackers Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff]/10 to-[#00c0ff]/5 flex items-center justify-center">
                          <BarChart3 className="text-[#00c0ff]" size={16} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-base font-semibold text-[#020817]">
                          Trackers
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: 'Energy', Icon: Sparkle, color: '#F97316' },
                        { label: 'Assess', Icon: ClipboardCheck, color: '#EF4444' },
                        { label: 'Calculate', Icon: Calculator, color: '#14B8A6' },
                        { label: 'Activities', Icon: User, color: '#A855F7' },
                        { label: 'Learn', Icon: BookOpenCheck, color: '#3B82F6' },
                      ].map((tracker, i) => (
                        <motion.button
                          key={tracker.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (5 + i) * 0.05 }}
                          onClick={() => setShowMobileAppModal(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white cursor-pointer"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: tracker.color }}
                          >
                            <tracker.Icon className="text-white" size={20} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm font-medium text-[#020817]">{tracker.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-white via-[#F8FCFF] to-[#F3FAFF] rounded-2xl p-6 md:p-8 shadow-lg border border-[#E2E8F0] relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00c0ff]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#043570]/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

            {/* Blue wave decoration at bottom right */}
            <div className="absolute bottom-0 right-0 w-48 h-40 opacity-100 pointer-events-none">
              <svg viewBox="0 0 192 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0 160C0 160 48 96 96 96C144 96 192 48 192 48V160H0Z" fill="url(#wave1)" fillOpacity="0.6" />
                <path d="M24 160C24 160 60 114 96 114C132 114 168 78 168 78L192 102V160H24Z" fill="url(#wave2)" fillOpacity="0.4" />
                <defs>
                  <linearGradient id="wave1" x1="0" y1="0" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00c0ff" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="wave2" x1="24" y1="78" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#043570" stopOpacity="0.15" />
                    <stop offset="1" stopColor="#043570" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-start gap-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#00c0ff]/10 text-[#043570] border-[#00c0ff]/20 px-3 py-1.5 rounded-full text-xs font-semibold border">
                <Sparkles size={14} className="text-[#00c0ff]" />
                Professional Recovery Support
              </div>

              {/* Heading */}
              <h3 className="text-[#020817] text-2xl md:text-3xl font-bold leading-tight">
                Start Your Recovery Journey Today
              </h3>

              {/* Description */}
              <p className="text-[#64748B] text-sm md:text-base max-w-2xl leading-relaxed">
                Connect with certified deaddiction therapists and counselors who understand your journey. Get personalized support, evidence-based treatment, and the tools you need for lasting recovery.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/plans")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00c0ff] to-[#0EA5E9] text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Mobile App Modal */}
      <MobileAppModal isOpen={showMobileAppModal} onClose={() => setShowMobileAppModal(false)} />
    </div>
  );
}
