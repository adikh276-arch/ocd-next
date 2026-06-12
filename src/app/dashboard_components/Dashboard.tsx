const diabetesImage = "/dashboard_assets/91dbe8cecb5f672168babe94f24eac5cccf48ad0.png";
const womenWellnessImage = "/dashboard_assets/c39122e04c431f548460579ebdec6a387f7df5ea.png";
const physiotherapyImage = "/dashboard_assets/e51fc3e8217cf426ea0c88f270a947c7e97714be.png";
const coachingImage = "/dashboard_assets/39155f0b553955354f674976ec1117a22aa31797.png";
const hypertensionImage = "/dashboard_assets/e239cb150a261d6c99f7923f801ed59265e16c50.png";
const fitnessImage = "/dashboard_assets/73e50ba9387c995471815225d75ef04542ecf6b3.png";
const mindfulnessImage = "/dashboard_assets/92c5c89847ceb2ec890576b669aa7f3028faadae.png";
const yogaImage = "/dashboard_assets/25704d77f9230099e7e2ed99d8b403427423d949.png";
const substanceUseImage = "/dashboard_assets/053456def2ef9585532f77acb7ad883f51b89a04.png";
const stepathonImage = "/dashboard_assets/c3db946589032c4d460afdacb46453dac82265e8.png";
const financialWellnessImage = "/dashboard_assets/219a91f6cb797050ba6e76c981465e83feab902a.png";
const ocdImage = "/dashboard_assets/0217773b597250536d8103046a8326ff250b59a1.png";
const lgbtqImage = "/dashboard_assets/e0f076d0ecf5fe290b0635a5fd91759350abcced.png";
const teleconsultationImage = "/dashboard_assets/213b533a0871b286e97b3a9b6a0ea9e8fd4ee504.png";
const healthChecksImage = "/dashboard_assets/6bc8b7e0c2a001b03919821fb1b81e910fba8754.png";
const hotlineImage = "/dashboard_assets/1fc4f3f00e51caa9dc9eec96228ef61d0181ce35.png";
const emotionalWellbeingImage = "/dashboard_assets/d72b9dc2b438609f930014f0ab0d0557cd9807a4.png";
const ctaDonationImage = "/dashboard_assets/ad9770a57919dd35529282700469e4cde35152c4.png";

import { useRouter } from "next/navigation";
import { MessageCircle, ArrowRight, Activity, Heart, TrendingUp, Calendar, Video, ChevronRight, Smartphone, Download, Star, Sparkles, Clock, Check, User, CheckSquare, Headphones, BarChart3, FileText, BookOpen, Play, Award, CheckCircle, Globe, ChevronDown, AlertCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChooseProviderModal } from "./ChooseProviderModal";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";
import { MobileAppModal } from "./MobileAppModal";
import { AppointmentDeclinedModal } from "./AppointmentDeclinedModal";
import { AppointmentConfirmationModal } from "./AppointmentConfirmationModal";
import { SessionsVerificationModal } from "./SessionsVerificationModal";
import { BuyPlanModal } from "./BuyPlanModal";

interface Service {
  id: string;
  name: string;
  image: string;
  icon: string;
  color: string;
}

const services: Service[] = [
  { 
    id: "ocd", 
    name: "OCD", 
    image: ocdImage,
    icon: "🔄",
    color: "#EC4899"
  },
];


const getServiceDescription = (id: string) => {
  const descriptions: Record<string, string> = {
    "emotional-wellbeing": "Professional counseling & therapy",
    "diabetes": "Monitor & manage blood sugar",
    "women-wellness": "Comprehensive women's health",
    "physiotherapy": "Recovery & mobility support",
    "coach": "Personalized wellness guidance",
    "hypertension": "Blood pressure management",
    "fitness": "Custom workout programs",
    "meditation": "Mindfulness & relaxation",
    "yoga": "Mind-body balance practice",
    "quit-smoking": "Substance use support",
    "stepathon": "Daily walking challenges",
    "financial-wellness": "Financial wellness planning",
    "ocd": "Obsessive-Compulsive Disorder management",
    "lgbtq": "LGBTQ+ support and resources",
    "teleconsultation": "Virtual medical consultations",
    "health-checks": "Regular health assessments",
    "hotline": "Emergency support hotline",
    "nutrition": "Personalized diet & nutrition plans"
  };
  return descriptions[id] || "Explore this service";
};

export function Dashboard() {
  const router = useRouter();
  const userString = localStorage.getItem("mantraUser");
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || "User";
  const firstName = userName.split(" ")[0];

  // Mock upcoming appointment data
  const upcomingAppointment = {
    serviceName: "OCD",
    expertName: "Dr. Robert Wilson",
    expertTitle: "OCD Specialist",
    expertImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTczMjkxMjQwfDA&ixlib=rb-4.1.0&q=80&w=400"
  };


  // Calculate minutes until next appointment (mock upcoming appointment)
  const nextAppointmentDate = new Date("2026-03-12T10:00:00"); // Mock: Mar 12 at 10:00 AM
  const now = new Date();
  const diffMs = nextAppointmentDate.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));
  
  // Format time as hours and minutes
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;
  const timeText = hours > 0 
    ? `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`
    : `${minutes} min${minutes !== 1 ? 's' : ''}`;

  const handleServiceClick = (serviceId: string) => {
    // Only OCD is active in this focused UI
    if (serviceId === "ocd") {
      router.push("/ocd");
      return;
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("mantraUser");
    router.push("/");
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

  const [isProviderModalOpen, setProviderModalOpen] = useState(false);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);
  const [showBuyPlanModal, setShowBuyPlanModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<{
    id: string;
    name: string;
    title: string;
    image: string;
    nextAvailable: string;
  } | null>(null);

  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  // State for modal visibility and button hiding
  const [showAppointmentConfirmationModal, setShowAppointmentConfirmationModal] = useState(false);
  const [showAppointmentDeclinedModal, setShowAppointmentDeclinedModal] = useState(false);
  const [showSessionVerificationModal, setShowSessionVerificationModal] = useState(false);
  const [hideConfirmAppointment, setHideConfirmAppointment] = useState(false);
  const [hidePendingAppointment, setHidePendingAppointment] = useState(false);
  const [hideUpcomingAppointment, setHideUpcomingAppointment] = useState(false);

  const todaysPlan = [
    { title: "Mindful Breathing Exercise", type: "Audio", points: "10 Points", duration: "5 min" },
    { title: "Meditation on Gratitude", type: "Audio", points: "5 Points", duration: "10 min" },
    { title: "Track Your Mood Today", type: "Tracker", points: "10 Points", duration: "2 min" },
    { title: "Assess Your Stress Levels", type: "Assessment", points: "10 Points", duration: "8 min" },
    { title: "Daily Gratitude Journal", type: "Activity", points: "10 Points", duration: "5 min" }
  ];

  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider);
    setProviderModalOpen(false);
    setScheduleModalOpen(true);
  };

  const handleScheduleClose = () => {
    setScheduleModalOpen(false);
    setSelectedProvider(null);
    setHideUpcomingAppointment(true); // Hide upcoming appointments when modal closes
  };

  const [showTodaysPlan, setShowTodaysPlan] = useState(false);

  // Check localStorage on mount to see if appointment was joined
  useEffect(() => {
    const appointmentJoined = localStorage.getItem("appointmentJoined");
    if (appointmentJoined === "true") {
      setHideUpcomingAppointment(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Mobile Nav - mobile only */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        {/* Main Content */}
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-20 md:pt-8">
          {/* Welcome Section */}
          <motion.div 
            className="mb-6 md:mb-8 px-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">
                  Hello, {firstName}!
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions - Top */}
          <motion.div 
            className="grid md:grid-cols-1 gap-3 md:gap-4 mb-6 md:mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Talk to Care Team Card */}
            <motion.div 
              variants={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/care-team")}
              className="bg-[#F5FBFF] border-2 border-[#D6EEFF] rounded-2xl p-5 flex items-center justify-between hover:border-[#2D9CDB] hover:shadow-xl hover:shadow-[#2D9CDB]/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2D9CDB] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2D9CDB]/20 group-hover:scale-110 transition-transform">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-[#020817] font-semibold mb-1 text-base">Talk to Care Team</h3>
                  <p className="text-sm text-[#64748B]">Connect with an expert via video or chat</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#F0F9FF] transition-colors">
                <ArrowRight size={18} className="text-[#2D9CDB]" />
              </div>
            </motion.div>

            {/* Today's Plan Section */}
            <motion.div 
              variants={item}
              className="border bg-white rounded-2xl shadow-sm overflow-hidden"
            >
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
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Star className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-base mb-0.5 text-[#020817]">
                        Today's Plan
                      </h3>
                      <p className="text-xs md:text-sm text-[#64748B]">
                        Complete your daily wellness activities
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
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
              {todaysPlan.map((pathway, index) => {
                const isCompleted = completedTasks.has(index);
                
                // Map activity types to colors and icon components
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
                  'Exercise': { 
                    bgColor: '#DBEAFE', 
                    iconBg: 'bg-[#3B82F6]', 
                    textColor: '#3B82F6',
                    icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
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
                  'To do': { 
                    bgColor: '#D1FAE5', 
                    iconBg: 'bg-[#10B981]', 
                    textColor: '#10B981',
                    icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
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
                        isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-[#E5E7EB]'
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
            {/* Edit Plan Button - Only shown when Today's Plan is expanded */}
            {showTodaysPlan && (
              <div className="px-5 md:px-6 pb-4 flex justify-end">
                <button 
                  onClick={() => router.push('/tasks')}
                  className="text-[#00c0ff] hover:text-[#043570] font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  Edit Plan
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            </motion.div>

            {/* Upcoming Appointment Card */}
            {!hideUpcomingAppointment && (
            <motion.div 
              variants={item}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#00c0ff]/30 hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-[#3B82F6] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1a1a1a] font-semibold mb-1 text-base">
                      Upcoming {upcomingAppointment.serviceName} Appointment with {upcomingAppointment.expertName}
                    </h3>
                    <p className="text-sm text-[#9ca3af]">Starts in {timeText}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto md:flex-shrink-0">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHideUpcomingAppointment(true); // Hide appointments when Join is clicked
                      // Navigate to chat with the expert
                      router.push(`/chat/${upcomingAppointment.expertName.replace(/\s+/g, '-').toLowerCase()}`);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] border border-[#2563EB] rounded-lg px-3 py-2 hover:shadow-sm transition-all"
                  >
                    <Check size={14} className="text-white" />
                    <span className="text-xs text-white font-medium">Join</span>
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Directly open schedule modal with existing appointment provider
                      setScheduleModalOpen(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-white border border-[#2563EB] rounded-lg px-3 py-2 hover:border-[#1d4ed8] hover:shadow-sm transition-all"
                  >
                    <Calendar size={14} className="text-[#2563EB]" />
                    <span className="text-xs text-[#2563EB] font-medium">Reschedule</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            )}

            {/* Upcoming Appointment Card - Duplicate */}
            {!hideConfirmAppointment && (
            <motion.div 
              variants={item}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#00c0ff]/30 hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1a1a1a] font-semibold mb-1 text-base">
                      Confirm {upcomingAppointment.serviceName} Appointment with {upcomingAppointment.expertName}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-[#9ca3af]" />
                        <span>March 12, 2026</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-[#9ca3af]" />
                        <span>10:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto md:flex-shrink-0">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle approve appointment
                      setShowAppointmentConfirmationModal(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#10B981] hover:bg-[#059669] border border-[#10B981] rounded-lg px-3 py-2 hover:shadow-sm transition-all"
                  >
                    <Check size={14} className="text-white" />
                    <span className="text-xs text-white font-medium">Approve</span>
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle decline appointment
                      setShowAppointmentDeclinedModal(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#EF4444] hover:bg-[#DC2626] border border-[#EF4444] rounded-lg px-3 py-2 hover:shadow-sm transition-all"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs text-white font-medium">Decline</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            )}

            {/* Upcoming Appointment Card - Second Duplicate */}
            {!hidePendingAppointment && (
            <motion.div 
              variants={item}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#00c0ff]/30 hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-[#F59E0B] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1a1a1a] font-semibold mb-1 text-base">
                      Pending {upcomingAppointment.serviceName} Appointment with {upcomingAppointment.expertName}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-[#9ca3af]" />
                        <span>March 12, 2026</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-[#9ca3af]" />
                        <span>10:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto md:flex-shrink-0">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle valid session
                      setShowSessionVerificationModal(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#10B981] hover:bg-[#059669] border border-[#10B981] rounded-lg px-3 py-2 hover:shadow-sm transition-all"
                  >
                    <Check size={14} className="text-white" />
                    <span className="text-xs text-white font-medium">Valid</span>
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle invalid session
                      setShowSessionVerificationModal(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#EF4444] hover:bg-[#DC2626] border border-[#EF4444] rounded-lg px-3 py-2 hover:shadow-sm transition-all"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs text-white font-medium">Invalid</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            )}

          </motion.div>

          {/* Your Services Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#020817] mb-4 px-0">Your Services</h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={item}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceClick(service.id)}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-[#00c0ff] h-44"
                >
                  {/* Image Background */}
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Service Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-base text-white">
                      {service.name}
                    </h3>
                  </div>
                  
                  {/* Arrow button on hover */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ChevronRight size={20} className="text-[#020817]" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Banner with Professional */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white via-[#F8FCFF] to-[#F3FAFF] rounded-2xl p-6 md:p-8 shadow-lg border border-[#E2E8F0] relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 mb-6"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00c0ff]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#043570]/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Blue wave decoration at bottom right */}
            <div className="absolute bottom-0 right-0 w-48 h-40 opacity-100 pointer-events-none">
              <svg viewBox="0 0 192 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0 160C0 160 48 96 96 96C144 96 192 48 192 48V160H0Z" fill="url(#wave1-home)" fillOpacity="0.6"/>
                <path d="M24 160C24 160 60 114 96 114C132 114 168 78 168 78L192 102V160H24Z" fill="url(#wave2-home)" fillOpacity="0.4"/>
                <defs>
                  <linearGradient id="wave1-home" x1="0" y1="0" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00c0ff" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="wave2-home" x1="24" y1="78" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#043570" stopOpacity="0.15"/>
                    <stop offset="1" stopColor="#043570" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              <div className="flex-1 space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#00c0ff]/10 text-[#043570] border-[#00c0ff]/20 px-3 py-1.5 rounded-full text-xs font-semibold border">
                  <Sparkles size={14} className="text-[#00c0ff]" />
                  Support Mental Health
                </div>

                {/* Heading */}
                <h3 className="text-[#020817] text-2xl md:text-3xl font-bold leading-tight">
                  Be the Reason Someone Feels Better Tomorrow
                </h3>

                {/* Description */}
                <p className="text-[#64748B] text-sm md:text-base max-w-lg leading-relaxed">
                  Your contribution to Mantra Foundation helps individuals access professional therapy, emotional support, and a path toward healing—when they need it most.
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00c0ff] to-[#0EA5E9] border-2 border-white flex items-center justify-center">
                          <Users size={14} className="text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-[#64748B] font-medium">
                      50,000+ People Supported Globally
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <motion.a
                    href="https://mantrafoundations.org/donate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00c0ff] to-[#0EA5E9] text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    Donate Now
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </motion.a>
                </div>
              </div>

              {/* Profile Image with decoration */}
              <div className="hidden md:block flex-shrink-0 relative mx-auto w-auto md:w-64">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00c0ff] to-[#0EA5E9] rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                
                {/* Image container */}
                <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-[#00c0ff]/20">
                  <ImageWithFallback
                    src={ctaDonationImage}
                    alt="Supporting Mental Health"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upgrade to Complete Wellness Care Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-3xl p-8 shadow-lg group hover:shadow-xl transition-all mb-6"
          >
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00c0ff]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#043570]/5 rounded-full blur-2xl"></div>
            
            {/* Blue wave decoration at bottom right */}
            <div className="absolute bottom-0 right-0 w-48 h-40 opacity-100 pointer-events-none">
              <svg viewBox="0 0 192 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0 160C0 160 48 96 96 96C144 96 192 48 192 48V160H0Z" fill="url(#wave1-corporate)" fillOpacity="0.6"/>
                <path d="M24 160C24 160 60 114 96 114C132 114 168 78 168 78L192 102V160H24Z" fill="url(#wave2-corporate)" fillOpacity="0.4"/>
                <defs>
                  <linearGradient id="wave1-corporate" x1="0" y1="0" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00c0ff" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="wave2-corporate" x1="24" y1="78" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#043570" stopOpacity="0.15"/>
                    <stop offset="1" stopColor="#043570" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-3">
                {/* Heading */}
                <h3 className="text-[#043570] text-2xl md:text-3xl font-bold leading-tight">
                  Upgrade to Complete Wellness Care
                </h3>

                {/* Description */}
                <p className="text-[#043570]/70 text-sm md:text-base max-w-lg leading-relaxed">
                  Enjoy therapy, nutrition, doctor consultations, fitness, and chronic care in one seamless plan. Get an exclusive <span className="font-bold text-[#00c0ff]">20% corporate discount</span> with Mantra Wellness Plans.
                </p>
              </div>

              {/* Right side - Button */}
              <div className="flex-shrink-0">
                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBuyPlanModal(true)}
                  className="inline-flex items-center gap-2 bg-[#043570] text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Plans
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* App is Better Banner */}
          <div className="bg-[#E8F4FD] border-2 border-[#C5E2F7] rounded-2xl px-4 md:px-6 py-4 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-[#2D9CDB] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2D9CDB]/20">
                  <Smartphone className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#020817] font-semibold text-sm mb-0.5">
                    App is better
                  </h3>
                  <p className="text-[#64748B] text-xs">
                    AI features, Trackers, and notifications are available only in the app.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10 w-auto hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-10 w-auto hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#F9FAFB] px-4 md:px-6 py-4 md:py-5">
          <div className="max-w-[1000px] mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] font-normal text-[#64748B]">
              {/* Left side - Copyright and policy links */}
              <div className="flex items-center gap-2 md:gap-4">
                <span>© 2026 Mantra</span>
                <span className="hidden md:inline">•</span>
                <a href="https://content.mantracare.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-[#020817] transition-colors text-[12px]">Privacy Policy</a>
                <span className="hidden md:inline">•</span>
                <a href="https://content.mantracare.com/terms-conditions-1/" target="_blank" rel="noopener noreferrer" className="hover:text-[#020817] transition-colors text-[12px]">Terms of Service</a>
                <span className="hidden md:inline">•</span>
                <a href="https://content.mantracare.com/refund-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-[#020817] transition-colors text-[12px]">Refund Policy</a>
              </div>


            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <ChooseProviderModal
        isOpen={isProviderModalOpen}
        onClose={() => setProviderModalOpen(false)}
        onSelectProvider={handleProviderSelect}
      />

      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={handleScheduleClose}
        expertName={upcomingAppointment.expertName}
        expertTitle={upcomingAppointment.expertTitle}
        expertImage={upcomingAppointment.expertImage}
      />

      <MobileAppModal isOpen={showMobileAppModal} onClose={() => setShowMobileAppModal(false)} />
      
      <AppointmentDeclinedModal
        isOpen={showAppointmentDeclinedModal}
        onClose={() => {
          setShowAppointmentDeclinedModal(false);
          setHideConfirmAppointment(true);
        }}
      />
      
      <AppointmentConfirmationModal
        isOpen={showAppointmentConfirmationModal}
        onClose={() => setShowAppointmentConfirmationModal(false)}
        appointment={{
          providerName: upcomingAppointment.expertName,
          providerTitle: upcomingAppointment.expertTitle,
          providerAvatar: upcomingAppointment.expertImage,
          service: upcomingAppointment.serviceName,
          date: "March 12, 2026",
          time: "10:00 AM",
          duration: 30,
          mode: "Video",
          isAccepted: false,
        }}
        onAccept={() => {
          // Don't close immediately - let the modal show success message first
          setHideConfirmAppointment(true);
        }}
      />
      
      <SessionsVerificationModal
        isOpen={showSessionVerificationModal}
        onClose={() => {
          setShowSessionVerificationModal(false);
          setHidePendingAppointment(true);
        }}
        appointment={{
          providerName: upcomingAppointment.expertName,
          providerAvatar: upcomingAppointment.expertImage,
          service: upcomingAppointment.serviceName,
          date: "March 12, 2026",
          time: "10:00 AM",
          duration: 30,
          mode: "Video",
        }}
        onSubmit={(reason) => {
          console.log("Session verification reason:", reason);
          setShowSessionVerificationModal(false);
          setHidePendingAppointment(true);
        }}
      />
      
      <BuyPlanModal 
        isOpen={showBuyPlanModal} 
        onClose={() => setShowBuyPlanModal(false)} 
        userType="corporate"
        userName={firstName}
        serviceName="Therapy"
      />
    </div>
  );
}
