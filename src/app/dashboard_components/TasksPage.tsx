import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Filter,
  ChevronRight,
  Star,
  Target,
  Flame,
  TrendingUp,
  BookOpen,
  Headphones,
  Play,
  BarChart3,
  Pencil,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  Sparkles,
  Heart,
  Zap,
  RotateCcw,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChooseFocusAreaModal } from "./ChooseFocusAreaModal";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { MobileAppModal } from "./MobileAppModal";
import { SessionRatingModal } from "./SessionRatingModal";
import { ServicesFilterModal } from "./ServicesFilterModal";

// ─── Types ───────────────────────────────────────────────────────────────────
type TaskStatus = "todo" | "done";
type TaskType = "Video" | "Article" | "Tracker" | "Assessment" | "Activity" | "Audio";
type FilterKey = "All" | TaskType;

interface Task {
  id: number;
  title: string;
  subtitle: string;
  type: TaskType;
  points: number;
  duration: string;
  status: TaskStatus;
  service: string;
  icon: string;
  date?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_TASKS: Task[] = [
  { id: 1,  title: "Future Storyboarding",            subtitle: "Visualise your ideal future self",        type: "Activity",   points: 10, duration: "5 min",  status: "todo", service: "Coaching",       icon: "🎨", date: "Today" },
  { id: 2,  title: "Discomfort Zone Dare",             subtitle: "Step outside your comfort zone today",    type: "Article",    points: 10, duration: "3 min",  status: "todo", service: "Emotional Wellbeing",  icon: "📖", date: "Today" },
  { id: 3,  title: "Mindful Breathing",                subtitle: "5-minute guided breathing session",       type: "Audio",      points: 10, duration: "5 min",  status: "todo", service: "Meditation",           icon: "🎧", date: "Today" },
  { id: 4,  title: "Mood Tracker",                     subtitle: "Log how you're feeling right now",        type: "Tracker",    points: 10, duration: "2 min",  status: "todo", service: "Emotional Wellbeing",  icon: "😊", date: "Today" },
  { id: 5,  title: "Know What is Stress?",             subtitle: "Learn about stress and how to manage it", type: "Article",    points: 5,  duration: "4 min",  status: "todo", service: "Emotional Wellbeing",  icon: "📚", date: "Today" },
  { id: 6,  title: "Meditation on Gratitude",          subtitle: "10-minute gratitude meditation",          type: "Audio",      points: 5,  duration: "10 min", status: "done", service: "Meditation",           icon: "🎵", date: "Today" },
  { id: 7,  title: "Daily Gratitude Journal",          subtitle: "Write three things you're grateful for",  type: "Activity",   points: 10, duration: "5 min",  status: "done", service: "Coaching",       icon: "✍️", date: "Today" },
  { id: 8,  title: "How to Book & Join a Session",     subtitle: "Learn how to connect with your expert",   type: "Video",      points: 10, duration: "2 min",  status: "done", service: "Care Team",            icon: "🎥", date: "Jan 14, 2025" },
  { id: 9,  title: "How TherapyMantra Works?",         subtitle: "Overview of the platform & features",     type: "Video",      points: 20, duration: "3 min",  status: "done", service: "Care Team",            icon: "📹", date: "Dec 24, 2023" },
  { id: 10, title: "Fitness Level Assessment",         subtitle: "Evaluate your current fitness level",     type: "Assessment", points: 15, duration: "10 min", status: "todo", service: "Fitness",              icon: "📋", date: "Today" },
  { id: 11, title: "Morning Yoga Flow",                subtitle: "Energising 20-minute yoga session",       type: "Video",      points: 15, duration: "20 min", status: "todo", service: "Yoga",                 icon: "🧘", date: "Today" },
  { id: 12, title: "Blood Sugar Log",                  subtitle: "Log your morning reading",                type: "Tracker",    points: 10, duration: "2 min",  status: "todo", service: "Diabetes Care",        icon: "📊", date: "Today" },
  { id: 13, title: "Heart-Healthy Recipe Guide",       subtitle: "Explore today's meal suggestions",        type: "Article",    points: 5,  duration: "5 min",  status: "done", service: "Hypertension",         icon: "🥗", date: "Jan 14, 2025" },
  { id: 14, title: "Refer a Provider",                 subtitle: "Refer a healthcare provider & earn",      type: "Activity",   points: 50, duration: "3 min",  status: "todo", service: "General",              icon: "🤝", date: "Jan 1, 2023" },
  { id: 15, title: "Publish a Post About MantraCare",  subtitle: "Share on LinkedIn and earn points",       type: "Activity",   points: 0,  duration: "5 min",  status: "todo", service: "General",              icon: "📣", date: "Nov 14, 2023" },
];

const TYPE_ICONS: Record<TaskType, React.ElementType> = {
  Video:      Play,
  Article:    BookOpen,
  Tracker:    BarChart3,
  Assessment: Pencil,
  Activity:   Zap,
  Audio:      Headphones,
};

const TYPE_COLORS: Record<TaskType, { iconBg: string; badgeBg: string; badgeText: string; iconColor: string }> = {
  Video:      { iconBg: "bg-[#DBEAFE]", badgeBg: "bg-[#f3faff]", badgeText: "text-[#00c0ff]", iconColor: "text-[#2563EB]" },
  Article:    { iconBg: "bg-[#E0E7FF]", badgeBg: "bg-[#f3faff]", badgeText: "text-[#00c0ff]", iconColor: "text-[#6366F1]" },
  Tracker:    { iconBg: "bg-[#D1FAE5]", badgeBg: "bg-[#f3faff]", badgeText: "text-[#00c0ff]", iconColor: "text-[#10B981]" },
  Assessment: { iconBg: "bg-[#FEF3C7]", badgeBg: "bg-[#f3faff]", badgeText: "text-[#00c0ff]", iconColor: "text-[#F59E0B]" },
  Activity:   { iconBg: "bg-[#FED7AA]", badgeBg: "bg-[#f3faff]", badgeText: "text-[#00c0ff]", iconColor: "text-[#F97316]" },
  Audio:      { iconBg: "bg-[#DDD6FE]", badgeBg: "bg-[#f3faff]", badgeText: "text-[#00c0ff]", iconColor: "text-[#8B5CF6]" },
};

const FILTERS: FilterKey[] = ["All", "Video", "Article", "Audio", "Tracker", "Assessment", "Activity"];

// Service-specific focus areas
const SERVICE_FOCUS_AREAS: Record<string, string[]> = {
  "Emotional Wellbeing": ["Depression", "Relationship", "Anger", "Postpartum", "Anxiety", "Stress", "Workplace", "Sleep", "Grief", "PTSD", "Sexuality", "Eating Disorder", "Adolescent", "Parenting", "Acceptance", "OCD"],
  "Coaching": ["Career", "Executive", "Wellness", "Leadership", "Finance", "Performance", "Mindset", "Spiritual", "Transform", "场", "Communicate", "Organization", "Creativity", "Confidence", "Employee", "Corporate"],
  "Diabetes Care": ["Pre-diabetes", "Type 1", "Type 2", "Hypertension"],
  "Meditation": ["Music", "Sleep"],
};

const DEFAULT_FOCUS_AREAS = ["Leadership", "Stress", "Work Performance", "Career", "OCD", "Diabetes", "Back Pain", "Neck Pain", "Elbow Pain", "Fitness"];

// ─── Component ────────────────────────────────────────────────────────────────
export function TasksPage() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useSearchParams();
  const userString = localStorage.getItem("mantraUser");
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || "User";
  const firstName = userName.split(" ")[0];

  const [tasks, setTasks] = useState<Task[]>(ALL_TASKS);
  const [filter, setFilter] = useState<FilterKey>("All");
  const [planExpanded, setPlanExpanded] = useState(true);
  const [journeyPage, setJourneyPage] = useState(1);
  const [selectedFocus, setSelectedFocus] = useState<string[]>(["Stress"]);
  const [showFocusModal, setShowFocusModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [appointmentToRate, setAppointmentToRate] = useState<{ 
    id: number; 
    providerName: string; 
    providerAvatar: string;
    service: string;
    date: string;
    time: string;
    duration: number;
    mode: "Video" | "Chat" | "Call" | "In-Person";
    sessionId: string;
    rating?: number;
    note?: string;
  } | null>(null);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);

  const todayTasks = tasks.filter((t) => t.date === "Today");
  const journeyTasks = tasks.filter((t) => t.date !== "Today");

  const filteredTodayTasks = filter === "All" ? todayTasks : todayTasks.filter((t) => t.type === filter);

  const completedToday = todayTasks.filter((t) => t.status === "done").length;
  const totalToday = todayTasks.length;
  const progressPct = Math.round((completedToday / totalToday) * 100);
  const totalPoints = tasks.filter((t) => t.status === "done").reduce((s, t) => s + t.points, 0);
  const activityCompleted = tasks.filter((t) => t.status === "done").length;

  const JOURNEY_PER_PAGE = 5;
  const journeyPages = Math.ceil(journeyTasks.length / JOURNEY_PER_PAGE);
  const pagedJourney = journeyTasks.slice((journeyPage - 1) * JOURNEY_PER_PAGE, journeyPage * JOURNEY_PER_PAGE);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t))
    );
  };

  const toggleFocus = (area: string) => {
    setSelectedFocus((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleService = (service: string) => {
    if (service === "" || service === "All Services") {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  const handleRateSubmit = (appointmentId: number, rating: number, feedback: string) => {
    // Here you would typically send the rating and feedback to the server
    console.log(`Rating: ${rating}, Feedback: ${feedback} for appointment ${appointmentId}`);
    setShowRateModal(false);
  };

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, [searchParams]);

  // Get the appropriate focus areas based on selected service
  const availableFocusAreas = selectedService && SERVICE_FOCUS_AREAS[selectedService]
    ? SERVICE_FOCUS_AREAS[selectedService]
    : DEFAULT_FOCUS_AREAS;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl text-[#0f172b] font-medium">Tasks</h1>
                <p className="text-sm text-[#62748e] font-normal">Track your daily wellness tasks & earn points</p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white border border-[#00c0ff]/30 rounded-xl px-3 py-2 text-sm text-[#043570] shadow-sm cursor-pointer hover:border-[#00c0ff] transition-colors" onClick={() => setShowServicesModal(true)}>
                <CalendarDays size={15} className="text-[#00c0ff]" />
                <span>{selectedService || "All Services"}</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </motion.div>

          {/* ── Focus Area ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-white border border-[#00c0ff]/20 rounded-2xl p-4 md:p-6 mb-5 md:mb-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#f3faff] rounded-xl flex items-center justify-center">
                  <Target size={16} className="text-[#00c0ff]" />
                </div>
                <div>
                  <p className="text-[#043570] text-sm font-semibold">Focus Area</p>
                  <p className="text-[#64748B] text-xs">Select the key concern areas for you</p>
                </div>
              </div>
              <button
                onClick={() => setShowFocusModal(true)}
                className="w-8 h-8 bg-[#f3faff] rounded-xl flex items-center justify-center hover:bg-[#00c0ff]/10 transition-colors"
              >
                <Pencil size={14} className="text-[#00c0ff]" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedFocus.length > 0 ? (
                selectedFocus.map((area) => (
                  <div
                    key={area}
                    className="px-3 py-1 rounded-full text-xs border border-[#00c0ff] bg-[#f3faff] text-[#00c0ff] shadow-sm"
                  >
                    {area}
                  </div>
                ))
              ) : (
                <p className="text-[#94A3B8] text-xs italic">Please select Focus Areas</p>
              )}
            </div>
          </motion.div>

          {/* ── Today's Tasks ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="bg-white border border-[#00c0ff]/20 rounded-2xl shadow-sm mb-5 md:mb-6 overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setPlanExpanded((e) => !e)}
              className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 hover:bg-[#f3faff]/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#f3faff] rounded-xl flex items-center justify-center">
                  <CalendarDays size={16} className="text-[#00c0ff]" />
                </div>
                <div className="text-left">
                  <p className="text-[#043570] text-sm font-semibold">Today's Tasks</p>
                  <p className="text-[#64748B] text-xs">Take just a few minutes each day to prioritise your health and wellness.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <span className="text-xs text-[#64748B] hidden sm:block">{completedToday}/{totalToday} done</span>
                {planExpanded ? <ChevronUp size={16} className="text-[#00c0ff]" /> : <ChevronDown size={16} className="text-[#00c0ff]" />}
              </div>
            </button>

            <AnimatePresence>
              {planExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {/* Task list */}
                  <div className="px-4 md:px-6 pb-5 pt-3 space-y-2 border-t border-[#00c0ff]/20">
                    <AnimatePresence>
                      {todayTasks.map((task, idx) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          index={idx}
                          onToggle={toggleTask}
                          onAssessmentClick={() => setShowMobileAppModal(true)}
                          isLast={idx === todayTasks.length - 1}
                        />
                      ))}
                    </AnimatePresence>
                    {todayTasks.length === 0 && (
                      <div className="text-center py-8 text-[#E2E8F0] text-sm">No tasks for today.</div>
                    )}
                  </div>

                  {/* View More */}
                  <div className="border-t border-[#E2E8F0] px-4 md:px-6 py-3 flex justify-center">
                    <button className="text-[#2563EB] text-sm hover:text-[#1E293B] flex items-center gap-1 hover:underline transition-colors">
                      View More <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Activity Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="bg-white border border-[#00c0ff]/20 rounded-2xl p-4 md:p-6 mb-5 md:mb-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#f3faff] rounded-xl flex items-center justify-center">
                  <TrendingUp size={16} className="text-[#00c0ff]" />
                </div>
                <div>
                  <p className="text-[#043570] text-sm font-semibold">Activity Stats</p>
                  <p className="text-[#64748B] text-xs">Complete daily activity to get more reward points.</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#00c0ff] hover:bg-[#043570] text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex-shrink-0"
              >
                <Star size={16} />
                <span className="hidden sm:inline">Redeem</span>
              </motion.button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Completed", value: activityCompleted, color: "text-[#043570]", bg: "bg-[#f3faff] border-[#00c0ff]/30", iconBg: "bg-[#043570]", icon: CheckCircle2 },
                { label: "Today",     value: `${completedToday}/${totalToday}`, color: "text-[#043570]", bg: "bg-[#f3faff] border-[#00c0ff]/30", iconBg: "bg-[#00c0ff]", icon: Zap },
                { label: "Points",    value: totalPoints, color: "text-[#043570]", bg: "bg-[#f3faff] border-[#00c0ff]/30", iconBg: "bg-[#00c0ff]", icon: Star },
              ].map((s) => (
                <div key={s.label} className={`relative border rounded-xl p-3 overflow-hidden ${s.bg}`}>
                  <div className={`absolute -top-4 -right-4 w-14 h-14 rounded-full ${s.bg.split(" ")[0]} opacity-60`} />
                  <div className="flex items-center gap-2 relative z-10">
                    <div className={`w-9 h-9 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <s.icon size={18} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold leading-none ${s.color}`}>{s.value}</p>
                      <p className={`text-[10px] mt-1 ${s.color}`}>{s.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Your Journey So Far ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="bg-white border border-[#00c0ff]/20 rounded-2xl shadow-sm mb-5 md:mb-6 overflow-hidden"
          >
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-[#00c0ff]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#f3faff] rounded-xl flex items-center justify-center">
                  <Flame size={16} className="text-[#00c0ff]" />
                </div>
                <div>
                  <p className="text-[#043570] text-sm font-semibold">Your Journey So Far</p>
                  <p className="text-[#64748B] text-xs">Completed activity following pathway.</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[#00c0ff]/10">
              {pagedJourney.map((task, idx) => (
                <JourneyRow key={task.id} task={task} index={idx} />
              ))}
            </div>

            {/* Pagination */}
            <div className="px-4 md:px-6 py-3 flex items-center justify-center gap-3 border-t border-[#00c0ff]/20">
              <button
                onClick={() => setJourneyPage((p) => Math.max(1, p - 1))}
                disabled={journeyPage === 1}
                className="text-xs text-[#64748B] hover:text-[#00c0ff] disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-[#f3faff] transition-colors"
              >
                Prev
              </button>
              <span className="text-xs text-[#64748B]">
                Page {journeyPage} of {journeyPages}
              </span>
              <button
                onClick={() => setJourneyPage((p) => Math.min(journeyPages, p + 1))}
                disabled={journeyPage === journeyPages}
                className="text-xs text-[#64748B] hover:text-[#00c0ff] disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-[#f3faff] transition-colors"
              >
                Next
              </button>
            </div>
          </motion.div>

        </main>
      </div>

      {/* Modals */}
      <ChooseFocusAreaModal
        isOpen={showFocusModal}
        onClose={() => setShowFocusModal(false)}
        selectedFocus={selectedFocus}
        onToggleFocus={toggleFocus}
        availableFocusAreas={availableFocusAreas}
      />

      <ServicesFilterModal
        isOpen={showServicesModal}
        onClose={() => setShowServicesModal(false)}
        selectedService={selectedService}
        onSelectService={toggleService}
      />

      {appointmentToRate && (
        <SessionRatingModal
          isOpen={showRateModal}
          onClose={() => setShowRateModal(false)}
          appointment={{
            id: appointmentToRate.id,
            providerName: appointmentToRate.providerName,
            providerAvatar: appointmentToRate.providerAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
            service: appointmentToRate.service,
            date: appointmentToRate.date,
            time: appointmentToRate.time,
            duration: appointmentToRate.duration,
            mode: appointmentToRate.mode,
            rating: appointmentToRate.rating,
            note: appointmentToRate.note,
          }}
          onSubmitRating={handleRateSubmit}
        />
      )}

      <MobileAppModal isOpen={showMobileAppModal} onClose={() => setShowMobileAppModal(false)} />
    </div>
  );
}

// ─── Task Row ────────────────────────────────────────────────────────────────
function TaskRow({
  task,
  index,
  onToggle,
  onAssessmentClick,
  isLast,
}: {
  task: Task;
  index: number;
  onToggle: (id: number) => void;
  onAssessmentClick: () => void;
  isLast: boolean;
}) {
  const TypeIcon = TYPE_ICONS[task.type];
  const typeColors = TYPE_COLORS[task.type];
  const isDone = task.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={() => {
        if (task.type === "Assessment") {
          onAssessmentClick();
        } else {
          onToggle(task.id);
        }
      }}
      className="relative flex items-center gap-3 py-3 cursor-pointer group hover:bg-[#F8FAFC] transition-colors"
    >
      {/* Checkbox - Simple Circle */}
      <motion.div
        whileTap={{ scale: 0.88 }}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          isDone ? "bg-[#10B981] border-[#10B981]" : "border-[#CBD5E1] group-hover:border-[#10B981]"
        }`}
      >
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle2 className="text-white" size={12} strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Type Icon with colored background */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${typeColors.iconBg}`}>
        <TypeIcon size={18} className={typeColors.iconColor} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isDone ? "line-through text-[#94A3B8]" : "text-[#1E293B]"}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {/* Type Badge */}
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium ${typeColors.badgeBg} ${typeColors.badgeText}`}>
            {task.type}
          </span>
          {/* Duration */}
          <span className="text-xs text-[#64748B] flex items-center gap-1">
            <Clock size={12} className="text-[#64748B]" />
            {task.duration}
          </span>
          {/* Points */}
          <span className="text-xs text-[#10B981] flex items-center gap-1 font-medium">
            <Award size={12} className="text-[#10B981]" />
            {task.points} Points
          </span>
        </div>
      </div>

      {/* Chevron Right */}
      <ChevronRight
        size={18}
        className="flex-shrink-0 text-[#CBD5E1] group-hover:text-[#64748B] transition-colors"
      />
    </motion.div>
  );
}

// ─── Journey Row ─────────────────────────────────────────────────────────────
function JourneyRow({ task, index }: { task: Task; index: number }) {
  const TypeIcon = TYPE_ICONS[task.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between px-4 md:px-6 py-3 hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 bg-[#F1F5F9] rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={14} className="text-[#0D9488]" />
        </div>
        <div className="min-w-0">
          <p className="text-[#020817] text-sm hover:text-[#2563EB] truncate group-hover:underline transition-colors">
            {task.title}
          </p>
          <p className="text-[#64748B]/50 text-xs mt-0.5">{task.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
        <div className="text-right hidden sm:block">
          <p className="text-[#22C55E] text-xs">{task.points} Points</p>
          <p className="text-[#64748B]/50 text-[10px] flex items-center gap-1 justify-end">
            <TypeIcon size={10} />
            {task.type}
          </p>
        </div>
        <ChevronRight size={14} className="text-[#E2E8F0] group-hover:text-[#64748B] group-hover:translate-x-0.5 transition-all" />
      </div>
    </motion.div>
  );
}
