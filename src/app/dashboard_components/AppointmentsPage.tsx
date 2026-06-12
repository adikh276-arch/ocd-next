import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChooseProviderModal } from "./ChooseProviderModal";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";
import { SessionsDetailsModal } from "./SessionsDetailsModal";
import { AppointmentConfirmationModal } from "./AppointmentConfirmationModal";
import { SessionRatingModal } from "./SessionRatingModal";
import { PendingSessionModal } from "./PendingSessionModal";
import { AppointmentDeclinedModal } from "./AppointmentDeclinedModal";
import { SessionsVerificationModal } from "./SessionsVerificationModal";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Calendar,
  CalendarDays,
  Clock,
  Search,
  Filter,
  Plus,
  Video,
  MessageCircle,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Star,
  ChevronDown,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

// ── Appointments Page with Sessions Management ──────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────
type TabKey = "Upcoming" | "Done" | "Pending" | "All";
type SessionMode = "Video" | "Chat" | "Call" | "In-Person";

interface Appointment {
  id: number;
  providerName: string;
  providerTitle: string;
  providerAvatar: string;
  service: string;
  date: string;
  rawDate: Date;
  time: string;
  duration: number;
  price: number;
  mode: SessionMode;
  status: "upcoming" | "done" | "pending" | "cancelled";
  note?: string;
  rating?: number;
  sessionId: string;
  isAccepted?: boolean; // For upcoming appointments: true if accepted, false if pending provider request
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const APPOINTMENTS: Appointment[] = [
  {
    id: 1, providerName: "Dr. Michael Brown", providerTitle: "Therapist",
    providerAvatar: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Therapy", date: "Mar 12 at 10:00 AM", rawDate: new Date("2026-03-12T10:00"),
    time: "10:00 AM", duration: 30, price: 40, mode: "Video", status: "upcoming",
    note: "", sessionId: "S-1001", isAccepted: false,
  },
  {
    id: 2, providerName: "Dr. Michael Brown", providerTitle: "Therapist",
    providerAvatar: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Emotional Wellbeing", date: "Mar 14 at 03:00 PM", rawDate: new Date("2026-03-14T15:00"),
    time: "03:00 PM", duration: 45, price: 55, mode: "Chat", status: "upcoming",
    note: "", sessionId: "S-1002", isAccepted: true,
  },
  {
    id: 3, providerName: "Coach Alex Turner", providerTitle: "Wellness Coach",
    providerAvatar: "https://images.unsplash.com/photo-1758875569220-6934933d443c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwd2VsbG5lc3MlMjBjb2FjaCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Coaching", date: "Mar 18 at 11:30 AM", rawDate: new Date("2026-03-18T11:30"),
    time: "11:30 AM", duration: 60, price: 70, mode: "Video", status: "upcoming",
    note: "", sessionId: "S-1003", isAccepted: true,
  },
  {
    id: 4, providerName: "Lisa Anderson", providerTitle: "Nutritionist",
    providerAvatar: "https://images.unsplash.com/photo-1742436707321-33fed05590bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBudXRyaXRpb25pc3QlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzI5NTYyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Meditation", date: "Aug 07 at 07:30 PM", rawDate: new Date("2025-08-07T19:30"),
    time: "07:30 PM", duration: 30, price: 40, mode: "Video", status: "done",
    note: "Client faced issues with ADHD and concerns around focus during morning hours.", rating: 5, sessionId: "S-0901",
  },
  {
    id: 5, providerName: "Dr. Michael Brown", providerTitle: "Therapist",
    providerAvatar: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Therapy", date: "Aug 07 at 07:30 PM", rawDate: new Date("2025-08-07T19:30"),
    time: "07:30 PM", duration: 30, price: 40, mode: "Chat", status: "done",
    note: "", rating: 4, sessionId: "S-0902",
  },
  {
    id: 6, providerName: "Coach Alex Turner", providerTitle: "Wellness Coach",
    providerAvatar: "https://images.unsplash.com/photo-1758875569220-6934933d443c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwd2VsbG5lc3MlMjBjb2FjaCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Coaching", date: "Jul 15 at 02:00 PM", rawDate: new Date("2025-07-15T14:00"),
    time: "02:00 PM", duration: 45, price: 55, mode: "Video", status: "done",
    note: "Discussed career stressors and breathing techniques for daily use.", rating: 5, sessionId: "S-0903",
  },
  {
    id: 7, providerName: "Dr. Michael Brown", providerTitle: "Therapist",
    providerAvatar: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Therapy", date: "Aug 07 at 07:30 PM", rawDate: new Date("2025-08-07T19:30"),
    time: "07:30 PM", duration: 30, price: 40, mode: "Video", status: "done",
    note: "Client faced issues with ADHD and concerns around focus during morning hours.", rating: 5, sessionId: "S-0904",
  },
  {
    id: 8, providerName: "Lisa Anderson", providerTitle: "Nutritionist",
    providerAvatar: "https://images.unsplash.com/photo-1742436707321-33fed05590bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBudXRyaXRpb25pc3QlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzI5NTYyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Meditation", date: "Mar 10 at 05:00 PM", rawDate: new Date("2026-03-10T17:00"),
    time: "05:00 PM", duration: 30, price: 40, mode: "Video", status: "pending",
    note: "", sessionId: "S-1004",
  },
  {
    id: 9, providerName: "Coach Alex Turner", providerTitle: "Wellness Coach",
    providerAvatar: "https://images.unsplash.com/photo-1758875569220-6934933d443c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwd2VsbG5lc3MlMjBjb2FjaCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Coaching", date: "Mar 11 at 12:00 PM", rawDate: new Date("2026-03-11T12:00"),
    time: "12:00 PM", duration: 60, price: 70, mode: "Chat", status: "pending",
    note: "", sessionId: "S-1005",
  },
  {
    id: 10, providerName: "Dr. Michael Brown", providerTitle: "Therapist",
    providerAvatar: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Therapy", date: "Aug 07 at 07:30 PM", rawDate: new Date("2025-08-07T19:30"),
    time: "07:30 PM", duration: 30, price: 40, mode: "Video", status: "done",
    note: "", rating: 4, sessionId: "S-0905",
  },
  {
    id: 11, providerName: "Lisa Anderson", providerTitle: "Nutritionist",
    providerAvatar: "https://images.unsplash.com/photo-1742436707321-33fed05590bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBudXRyaXRpb25pc3QlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzI5NTYyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Meditation", date: "Jul 20 at 08:00 AM", rawDate: new Date("2025-07-20T08:00"),
    time: "08:00 AM", duration: 45, price: 55, mode: "Chat", status: "done",
    note: "", sessionId: "S-0906",
  },
];

const MODE_ICON: Record<SessionMode, React.ElementType> = {
  Video: Video, Chat: MessageCircle, Call: Phone, "In-Person": MapPin,
};

const MODE_COLOR: Record<SessionMode, string> = {
  Video:       "bg-[#DBEAFE] text-[#3B82F6]",
  Chat:        "bg-[#D1FAE5] text-[#10B981]",
  Call:        "bg-[#EDE9FE] text-[#8B5CF6]",
  "In-Person": "bg-[#FED7AA] text-[#F97316]",
};

const STATUS_META = {
  upcoming:  { label: "Upcoming",  bg: "bg-[#DBEAFE]", text: "text-[#3B82F6]", dot: "bg-[#3B82F6]",  icon: CalendarDays },
  done:      { label: "Completed", bg: "bg-[#D1FAE5]", text: "text-[#10B981]", dot: "bg-[#10B981]",  icon: CheckCircle2 },
  pending:   { label: "Pending",   bg: "bg-[#FED7AA]", text: "text-[#F97316]", dot: "bg-[#F97316]",  icon: AlertCircle  },
  cancelled: { label: "Cancelled", bg: "bg-[#EDE9FE]", text: "text-[#8B5CF6]", dot: "bg-[#8B5CF6]",  icon: XCircle      },
};

// ── Main Component ────────────────────────────────────────────────────────────
export function AppointmentsPage() {
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("All Services");
  const [providerFilter, setProviderFilter] = useState<string>("All Providers");
  const [showChooseProviderModal, setShowChooseProviderModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSessionRatingModal, setShowSessionRatingModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [appointmentToRate, setAppointmentToRate] = useState<Appointment | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [selectedProvider, setSelectedProvider] = useState<{
    id: string;
    name: string;
    title: string;
    image: string;
    nextAvailable: string;
  } | null>(null);

  // State for appointment cards (from Dashboard)
  const [showAppointmentConfirmationModal, setShowAppointmentConfirmationModal] = useState(false);
  const [showAppointmentDeclinedModal, setShowAppointmentDeclinedModal] = useState(false);
  const [showSessionVerificationModal, setShowSessionVerificationModal] = useState(false);
  const [hideConfirmAppointment, setHideConfirmAppointment] = useState(false);
  const [hidePendingAppointment, setHidePendingAppointment] = useState(false);
  const [hideUpcomingAppointment, setHideUpcomingAppointment] = useState(() => {
    // Check sessionStorage on mount - persists during navigation, clears on refresh
    return sessionStorage.getItem('hideUpcomingAppointment') === 'true';
  });

  // Filter states
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterProviderName, setFilterProviderName] = useState("");
  const [filterSessionStatus, setFilterSessionStatus] = useState<"All" | "Valid" | "Invalid">("All");

  // Mock upcoming appointment data (from Dashboard)
  const upcomingAppointment = {
    serviceName: "Diabetes",
    expertName: "Dr. Sarah Johnson",
    expertTitle: "Endocrinologist",
    expertImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  };

  // Calculate time until appointment
  const nextAppointmentDate = new Date("2026-03-12T10:00:00");
  const now = new Date();
  const diffMs = nextAppointmentDate.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));
  
  let timeText = "";
  if (diffMins < 60) {
    timeText = `${diffMins} minutes`;
  } else if (diffMins < 1440) {
    const hours = Math.floor(diffMins / 60);
    timeText = `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(diffMins / 1440);
    timeText = `${days} day${days !== 1 ? 's' : ''}`;
  }

  // Apply provider filter from URL parameter
  useEffect(() => {
    const providerParam = searchParams.get("provider");
    if (providerParam) {
      setProviderFilter(providerParam);
    }
  }, [searchParams]);

  // Update sessionStorage when hideUpcomingAppointment changes
  useEffect(() => {
    if (hideUpcomingAppointment) {
      sessionStorage.setItem('hideUpcomingAppointment', 'true');
    } else {
      sessionStorage.removeItem('hideUpcomingAppointment');
    }
  }, [hideUpcomingAppointment]);

  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider);
    setShowChooseProviderModal(false);
    setShowScheduleModal(true);
  };

  const handleScheduleClose = () => {
    setShowScheduleModal(false);
    setSelectedProvider(null);
    setHideUpcomingAppointment(true); // Hide upcoming appointment when modal closes
  };

  const handleOpenRatingModal = (appointment: Appointment) => {
    setAppointmentToRate(appointment);
    setShowRateModal(true);
  };

  const handleRateSubmit = (appointmentId: number, rating: number, feedback: string) => {
    // Update the appointment with the rating
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, rating, note: feedback }
          : apt
      )
    );
    setShowRateModal(false);
  };

  const handleOpenConfirmationModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmationModal(true);
  };

  const handleAcceptAppointment = () => {
    if (selectedAppointment) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...apt, isAccepted: true }
            : apt
        )
      );
    }
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== selectedAppointment.id)
      );
    }
  };

  const handleRescheduleAppointment = () => {
    if (selectedAppointment) {
      // Set provider from the appointment
      setSelectedProvider({
        id: String(selectedAppointment.id),
        name: selectedAppointment.providerName,
        title: selectedAppointment.providerTitle,
        image: selectedAppointment.providerAvatar,
        nextAvailable: selectedAppointment.date,
      });
      // Close confirmation modal and open schedule modal
      setShowConfirmationModal(false);
      setShowScheduleModal(true);
    }
  };

  const handleOpenSessionRatingModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowSessionRatingModal(true);
  };

  const handleSessionRatingSubmit = (appointmentId: number, rating: number, feedback: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, rating, note: feedback }
          : apt
      )
    );
  };

  const handleOpenPendingModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowPendingModal(true);
  };

  // Get unique services
  const allServices = ["All Services", ...Array.from(new Set(APPOINTMENTS.map(a => a.service)))];
  
  // Get unique provider names
  const allProviders = ["All Providers", ...Array.from(new Set(APPOINTMENTS.map(a => a.providerName)))];

  const filtered = appointments.filter((a) => {
    const matchTab =
      activeTab === "All" ? true :
      activeTab === "Upcoming" ? a.status === "upcoming" :
      activeTab === "Done" ? a.status === "done" :
      a.status === "pending";
    const matchSearch = search === "" ||
      a.providerName.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    const matchService = serviceFilter === "All Services" || a.service === serviceFilter;
    const matchProvider = (providerFilter === "All Providers" || a.providerName === providerFilter) &&
                          (filterProviderName === "" || a.providerName === filterProviderName);
    
    // Apply additional filters
    let matchDateRange = true;
    if (filterDateFrom || filterDateTo) {
      const aptDate = a.rawDate;
      if (filterDateFrom) {
        const fromDate = new Date(filterDateFrom);
        matchDateRange = matchDateRange && aptDate >= fromDate;
      }
      if (filterDateTo) {
        const toDate = new Date(filterDateTo);
        toDate.setHours(23, 59, 59, 999); // Include the entire end date
        matchDateRange = matchDateRange && aptDate <= toDate;
      }
    }
    
    const matchValidSessions = filterSessionStatus === "All" || 
      (filterSessionStatus === "Valid" && (a.status === "done" || (a.status === "upcoming" && a.isAccepted))) ||
      (filterSessionStatus === "Invalid" && (a.status === "pending" || (a.status === "upcoming" && !a.isAccepted)));
    
    return matchTab && matchSearch && matchService && matchProvider && matchDateRange && matchValidSessions;
  });

  const clearFilters = () => {
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterProviderName("");
    setFilterSessionStatus("All");
    setServiceFilter("All Services");
    setProviderFilter("All Providers");
  };

  const hasActiveFilters = filterDateFrom || filterDateTo || filterProviderName || filterSessionStatus !== "All" || serviceFilter !== "All Services" || providerFilter !== "All Providers";

  const doneCount = appointments.filter((a) => a.status === "done").length;
  const upcomingCount = appointments.filter((a) => a.status === "upcoming").length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  const TABS: { key: TabKey; count?: number }[] = [
    { key: "Upcoming", count: upcomingCount },
    { key: "Done",     count: doneCount     },
    { key: "Pending",  count: pendingCount  },
    { key: "All",      count: appointments.length },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-[#1E293B]" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl text-[#0f172b] font-medium">Appointments</h1>
                  <p className="text-sm text-[#62748e] font-normal">Manage your upcoming and past sessions</p>
                </div>
              </div>
              
              {/* Right side actions */}
              <div className="flex items-center gap-3">
                {/* Appointment Button - Desktop Only */}
                <motion.button
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden md:flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#22C55E] text-white text-sm px-3 py-2 rounded-xl shadow-sm shadow-[#2563EB]/20 transition-colors"
                  onClick={() => setShowChooseProviderModal(true)}
                >
                  <Plus size={14} />
                  <span>Appointment</span>
                </motion.button>
                
                {/* Service Filter */}
                <div className="relative flex-shrink-0 hidden md:block">
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2 bg-white border border-[#E2ECF5] rounded-xl text-sm text-[#043570] hover:border-[#00c0ff] focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all cursor-pointer"
                  >
                    {allServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                </div>
                
                {/* Provider Filter */}
                <div className="relative flex-shrink-0 hidden md:block">
                  <select
                    value={providerFilter}
                    onChange={(e) => setProviderFilter(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2 bg-white border border-[#E2ECF5] rounded-xl text-sm text-[#043570] hover:border-[#00c0ff] focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all cursor-pointer"
                  >
                    {allProviders.map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile-only Appointment Button - Above cards */}
          <div className="w-full md:hidden flex justify-end mb-4">
            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#22C55E] text-white text-sm px-3 py-2 rounded-xl shadow-sm shadow-[#2563EB]/20 transition-colors"
              onClick={() => setShowChooseProviderModal(true)}
            >
              <Plus size={14} />
              <span>Appointment</span>
            </motion.button>
          </div>

          {/* ── Appointment Cards Section ── */}


          {/* ── Search + Filter + Remaining Sessions ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex flex-col md:flex-row items-center gap-3 mb-5"
          >
            {/* Left: Search Bar + Filter Button (70%) */}
            <div className="flex items-center gap-2 w-full md:w-[70%]">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by provider or service…"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all"
                />
              </div>
              
              {/* Filter Button */}
              <button 
                onClick={() => setShowFilterModal(true)}
                className={`relative flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all flex-shrink-0 ${
                  hasActiveFilters ? "border-[#00c0ff] bg-[#f3faff]" : "border-slate-200"
                }`}
              >
                <Filter size={16} className={hasActiveFilters ? "text-[#00c0ff]" : "text-slate-500"} />
                <span className="hidden sm:inline">Filter</span>
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00c0ff] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {[filterDateFrom || filterDateTo, filterProviderName, filterSessionStatus !== "All"].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            {/* Right: Remaining Sessions Container (30%) */}
            <button
              onClick={() => setShowSessionsModal(true)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white rounded-xl hover:bg-[#f3faff] transition-all group w-full md:w-[30%]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00c0ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#00c0ff]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[#020817] text-sm font-semibold whitespace-nowrap">Remaining Sessions</p>
                </div>
              </div>
              <span className="text-[#043570] text-xl font-bold">449</span>
            </button>
          </motion.div>

          {/* ── Tabs + Count Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-2"
          >
            {/* Tab bar */}
            <div className="flex border-b border-slate-200 relative">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 py-3.5 text-sm transition-colors ${
                    activeTab === tab.key
                      ? "text-[#2563EB] font-semibold"
                      : "text-[#64748B] hover:text-[#020817]"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {tab.key}
                    {tab.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        activeTab === tab.key ? "bg-[#F1F5F9] text-[#1E293B]" : "bg-[#F8FAFC] text-[#E2E8F0]"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </span>
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Sub-row: label + total */}
            <div className="flex items-center justify-between px-4 md:px-6 py-2.5 bg-slate-50 border-b border-slate-100">
              <p className="text-xs text-slate-500">
                {activeTab === "Done" && "Session successfully completed"}
                {activeTab === "Upcoming" && "Appointments with experts"}
                {activeTab === "Pending" && "Did these sessions happen? Let us know"}
                {activeTab === "All" && "All sessions"}
              </p>
              <p className="text-xs text-slate-500">Total {filtered.length}</p>
            </div>

            {/* ── Cards Grid ── */}
            <div className="p-3 md:p-4">
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 flex flex-col items-center gap-3 text-slate-400"
                  >
                    <CalendarDays size={40} strokeWidth={1.5} />
                    <p className="text-sm">No appointments found</p>
                    {activeTab === "Upcoming" && (
                      <motion.button
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowChooseProviderModal(true)}
                        className="mt-2 flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-colors"
                      >
                        <Plus size={16} />
                        <span>Book a Session</span>
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filtered.map((apt, idx) => (
                        <AppointmentCard
                          key={apt.id}
                          apt={apt}
                          index={idx}
                          onOpenRatingModal={handleOpenRatingModal}
                          onOpenConfirmationModal={handleOpenConfirmationModal}
                          onOpenSessionRatingModal={handleOpenSessionRatingModal}
                          onOpenPendingModal={handleOpenPendingModal}
                        />
                      ))}
                    </div>

                    {/* Past Appointments Link - Only for Upcoming Tab */}
                    {activeTab === "Upcoming" && (
                      <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        onClick={() => setActiveTab("Done")}
                        className="flex items-center justify-between w-full mt-4 px-4 py-3 hover:opacity-80 transition-opacity group"
                      >
                        <span className="text-sm text-slate-500 font-medium">Past Appointments</span>
                        <ChevronRight size={18} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </main>
      </div>

      {/* ── Modals ── */}
      <ChooseProviderModal
        isOpen={showChooseProviderModal}
        onClose={() => setShowChooseProviderModal(false)}
        onSelectProvider={handleProviderSelect}
      />

      {selectedProvider && (
        <ScheduleAppointmentModal
          isOpen={showScheduleModal}
          onClose={handleScheduleClose}
          expertName={selectedProvider.name}
          expertTitle={selectedProvider.title}
          expertImage={selectedProvider.image}
        />
      )}

      <SessionsDetailsModal
        isOpen={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
      />

      {appointmentToRate && (
        <SessionRatingModal
          isOpen={showRateModal}
          onClose={() => setShowRateModal(false)}
          appointment={{
            id: appointmentToRate.id,
            providerName: appointmentToRate.providerName,
            providerAvatar: appointmentToRate.providerAvatar,
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

      {selectedAppointment && (
        <AppointmentConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          appointment={selectedAppointment}
          onAccept={handleAcceptAppointment}
          onCancel={handleCancelAppointment}
          onReschedule={handleRescheduleAppointment}
        />
      )}

      {selectedAppointment && (
        <SessionRatingModal
          isOpen={showSessionRatingModal}
          onClose={() => setShowSessionRatingModal(false)}
          appointment={{
            id: selectedAppointment.id,
            providerName: selectedAppointment.providerName,
            providerAvatar: selectedAppointment.providerAvatar,
            service: selectedAppointment.service,
            date: selectedAppointment.date,
            time: selectedAppointment.time,
            duration: selectedAppointment.duration,
            mode: selectedAppointment.mode,
            rating: selectedAppointment.rating,
            note: selectedAppointment.note,
          }}
          onSubmitRating={handleSessionRatingSubmit}
        />
      )}

      {selectedAppointment && (
        <PendingSessionModal
          isOpen={showPendingModal}
          onClose={() => setShowPendingModal(false)}
          appointment={selectedAppointment}
          onOpenRatingModal={handleOpenRatingModal}
        />
      )}

      {/* Appointment Cards Modals */}
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
          setShowAppointmentConfirmationModal(false);
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

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filterDateFrom={filterDateFrom}
        setFilterDateFrom={setFilterDateFrom}
        filterDateTo={filterDateTo}
        setFilterDateTo={setFilterDateTo}
        filterProviderName={filterProviderName}
        setFilterProviderName={setFilterProviderName}
        filterSessionStatus={filterSessionStatus}
        setFilterSessionStatus={setFilterSessionStatus}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}

// ── Filter Modal ──────────────────────────────────────────────────────────
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterDateFrom: string;
  setFilterDateFrom: (value: string) => void;
  filterDateTo: string;
  setFilterDateTo: (value: string) => void;
  filterProviderName: string;
  setFilterProviderName: (value: string) => void;
  filterSessionStatus: "All" | "Valid" | "Invalid";
  setFilterSessionStatus: (value: "All" | "Valid" | "Invalid") => void;
  serviceFilter: string;
  setServiceFilter: (value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

function FilterModal({
  isOpen,
  onClose,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  filterProviderName,
  setFilterProviderName,
  filterSessionStatus,
  setFilterSessionStatus,
  serviceFilter,
  setServiceFilter,
  onClear,
  hasActiveFilters,
}: FilterModalProps) {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showSessionStatusDropdown, setShowSessionStatusDropdown] = useState(false);
  const [dateRange, setDateRange] = useState<"Week" | "Month" | "Year" | "Custom">("Week");
  
  // Get unique provider names from appointments
  const uniqueProviders = ["All Providers", ...Array.from(new Set(APPOINTMENTS.map(a => a.providerName)))];
  
  // Get unique services from appointments
  const allServices = ["All Services", ...Array.from(new Set(APPOINTMENTS.map(a => a.service)))];

  if (!isOpen) return null;

  const handleDateRangeSelect = (range: "Week" | "Month" | "Year" | "Custom") => {
    setDateRange(range);
    setShowDateDropdown(false);

    const today = new Date();
    let fromDate = new Date();

    if (range === "Week") {
      fromDate.setDate(today.getDate() - 7);
      setFilterDateFrom(fromDate.toISOString().split("T")[0]);
      setFilterDateTo(today.toISOString().split("T")[0]);
    } else if (range === "Month") {
      fromDate.setMonth(today.getMonth() - 1);
      setFilterDateFrom(fromDate.toISOString().split("T")[0]);
      setFilterDateTo(today.toISOString().split("T")[0]);
    } else if (range === "Year") {
      fromDate.setFullYear(today.getFullYear() - 1);
      setFilterDateFrom(fromDate.toISOString().split("T")[0]);
      setFilterDateTo(today.toISOString().split("T")[0]);
    }
  };

  const handleSessionStatusSelect = (status: "All" | "Valid" | "Invalid") => {
    setFilterSessionStatus(status);
    setShowSessionStatusDropdown(false);
  };

  const handleProviderSelect = (provider: string) => {
    if (provider === "All Providers") {
      setFilterProviderName("");
    } else {
      setFilterProviderName(provider);
    }
    setShowProviderDropdown(false);
  };

  const handleApply = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-[#043570] to-[#00c0ff] flex-shrink-0">
            <h2 className="text-lg font-semibold text-white">Filter Appointments</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="px-6 py-6 space-y-6 overflow-y-auto flex-1">
            {/* Date Range Dropdown */}
            <div>
              <label className="block text-sm font-medium text-[#043570] mb-2">
                Date
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="w-full px-4 py-3 bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] transition-all group"
                >
                  <span className="text-[#043570] font-medium">{dateRange}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#00c0ff] transition-transform duration-300 ${
                      showDateDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showDateDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#00c0ff]/30 rounded-xl shadow-xl overflow-hidden z-10"
                    >
                      {(["Week", "Month", "Year", "Custom"] as const).map((range, index) => (
                        <motion.button
                          key={range}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => handleDateRangeSelect(range)}
                          className={`w-full px-4 py-3 text-left transition-all flex items-center justify-between group ${
                            dateRange === range
                              ? "bg-[#043570] text-white"
                              : "text-[#043570] hover:bg-[#f3faff]"
                          }`}
                        >
                          <span className="font-medium">{range}</span>
                          {dateRange === range && (
                            <Check size={18} className="text-[#00c0ff]" />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Date Inputs */}
              {dateRange === "Custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 grid grid-cols-2 gap-3"
                >
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5">From</label>
                    <input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f3faff] border border-[#00c0ff]/30 rounded-lg text-sm text-[#043570] focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5">To</label>
                    <input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f3faff] border border-[#00c0ff]/30 rounded-lg text-sm text-[#043570] focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Provider Name Dropdown */}
            <div>
              <label className="block text-sm font-medium text-[#043570] mb-2">
                Provider Name
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowProviderDropdown(!showProviderDropdown)}
                  className="w-full px-4 py-3 bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] transition-all group"
                >
                  <span className="text-[#043570] font-medium">
                    {filterProviderName || "All Providers"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#00c0ff] transition-transform duration-300 ${
                      showProviderDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showProviderDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#00c0ff]/30 rounded-xl shadow-xl overflow-hidden z-10 max-h-[200px] overflow-y-auto"
                    >
                      {uniqueProviders.map((provider, index) => (
                        <motion.button
                          key={provider}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => handleProviderSelect(provider)}
                          className={`w-full px-4 py-3 text-left transition-all flex items-center justify-between group ${
                            (provider === "All Providers" && !filterProviderName) ||
                            provider === filterProviderName
                              ? "bg-[#043570] text-white"
                              : "text-[#043570] hover:bg-[#f3faff]"
                          }`}
                        >
                          <span className="font-medium">{provider}</span>
                          {((provider === "All Providers" && !filterProviderName) ||
                            provider === filterProviderName) && (
                            <Check size={18} className="text-[#00c0ff]" />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Session Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-[#043570] mb-2">
                Session Status
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowSessionStatusDropdown(!showSessionStatusDropdown)}
                  className="w-full px-4 py-3 bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] transition-all group"
                >
                  <span className="text-[#043570] font-medium">{filterSessionStatus}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#00c0ff] transition-transform duration-300 ${
                      showSessionStatusDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showSessionStatusDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#00c0ff]/30 rounded-xl shadow-xl overflow-hidden z-10"
                    >
                      {(["All", "Valid", "Invalid"] as const).map((status, index) => (
                        <motion.button
                          key={status}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => handleSessionStatusSelect(status)}
                          className={`w-full px-4 py-3 text-left transition-all flex items-center justify-between group ${
                            filterSessionStatus === status
                              ? "bg-[#043570] text-white"
                              : "text-[#043570] hover:bg-[#f3faff]"
                          }`}
                        >
                          <span className="font-medium">{status}</span>
                          {filterSessionStatus === status && (
                            <Check size={18} className="text-[#00c0ff]" />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Service Filter Dropdown */}
            <div className="md:hidden">
              <label className="block text-sm font-medium text-[#043570] mb-2">
                Service
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className="w-full px-4 py-3 bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] transition-all group"
                >
                  <span className="text-[#043570] font-medium">
                    {serviceFilter}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#00c0ff] transition-transform duration-300 ${
                      showServiceDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showServiceDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#00c0ff]/30 rounded-xl shadow-xl overflow-hidden z-10 max-h-[200px] overflow-y-auto"
                    >
                      {allServices.map((service, index) => (
                        <motion.button
                          key={service}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => {
                            setServiceFilter(service);
                            setShowServiceDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all flex items-center justify-between group ${
                            service === serviceFilter
                              ? "bg-[#043570] text-white"
                              : "text-[#043570] hover:bg-[#f3faff]"
                          }`}
                        >
                          <span className="font-medium">{service}</span>
                          {service === serviceFilter && (
                            <Check size={18} className="text-[#00c0ff]" />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            {hasActiveFilters && (
              <button
                onClick={() => {
                  onClear();
                  setDateRange("Week");
                  setFilterSessionStatus("All");
                  setServiceFilter("All Services");
                  onClose();
                }}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium text-sm"
              >
                Clear All
              </button>
            )}
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-lg transition-colors font-medium text-sm"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ── Appointment Card ──────────────────────────────────────────────────────────
function AppointmentCard({
  apt, index, onOpenRatingModal, onOpenConfirmationModal, onOpenSessionRatingModal, onOpenPendingModal,
}: {
  apt: Appointment;
  index: number;
  onOpenRatingModal: (appointment: Appointment) => void;
  onOpenConfirmationModal: (appointment: Appointment) => void;
  onOpenSessionRatingModal: (appointment: Appointment) => void;
  onOpenPendingModal: (appointment: Appointment) => void;
}) {
  const meta = STATUS_META[apt.status];
  const ModeIcon = MODE_ICON[apt.mode];
  const isDone = apt.status === "done";
  const isPending = apt.status === "pending";
  const isUpcoming = apt.status === "upcoming";

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Cancelled appointment:", apt.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => {
        // Open rating modal for done appointments
        if (isDone) {
          // If already rated, open SessionRatingModal to view details
          if (apt.rating) {
            onOpenSessionRatingModal(apt);
          } 
          // If not rated, open RateSessionModal to add rating
          else {
            onOpenRatingModal(apt);
          }
        }
        // Open confirmation modal for upcoming appointments
        else if (isUpcoming) {
          onOpenConfirmationModal(apt);
        }
        // Open pending modal for pending appointments
        else if (isPending) {
          onOpenPendingModal(apt);
        }
      }}
      className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:shadow-md hover:border-[#CBD5E1] transition-all group cursor-pointer"
    >
      {/* Header: Avatar + Name + Blue Circle */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar with Mode Badge */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100">
            <ImageWithFallback
              src={apt.providerAvatar}
              alt={apt.providerName}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Mode Badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00c0ff] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <ModeIcon size={12} className="text-white" />
          </div>
        </div>

        {/* Name + Service + Date/Time */}
        <div className="flex-1 min-w-0">
          <p className="text-[#0F172A] text-sm font-semibold truncate">{apt.providerName}</p>
          <p className="text-[#2563EB] text-xs truncate mb-1">{apt.service}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#64748B] text-xs flex items-center gap-1">
              <Calendar size={12} className="text-[#94A3B8]" />
              {apt.date}
            </span>
            <span className="text-[#64748B] text-xs flex items-center gap-1">
              <Clock size={12} className="text-[#94A3B8]" />
              {apt.duration} min
            </span>
          </div>
        </div>

        {/* Blue Circle Indicator for Upcoming */}
        {isUpcoming && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] flex-shrink-0 mt-1" />
        )}

        {/* Green Check Icon for Done */}
        {isDone && (
          <CheckCircle2 size={18} className="text-[#10B981] flex-shrink-0 mt-0.5" />
        )}

        {/* Red Exclamation Icon for Pending */}
        {isPending && (
          <AlertCircle size={18} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
        )}
      </div>

      {/* Action buttons for upcoming - not accepted */}
      {isUpcoming && !apt.isAccepted && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenConfirmationModal(apt);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#2563EB] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#1E40AF] transition-colors"
            >
              <Check size={16} />
              <span>Accept</span>
            </motion.button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 text-[#0F172A] text-sm font-medium px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
          <p className="text-[10px] text-[#6366F1]">*Provider requested appointment accept to confirm</p>
        </div>
      )}

      {/* Action buttons for upcoming - accepted */}
      {isUpcoming && apt.isAccepted && (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenConfirmationModal(apt);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 text-[#0F172A] text-sm font-medium px-4 py-2 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors"
          >
            <Calendar size={16} />
            <span>Reschedule</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 text-[#0F172A] text-sm font-medium px-4 py-2 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
        </div>
      )}

      {/* Status badge + Reschedule for pending */}
      {isPending && (
        <div className="pt-1">
          {/* Pending cards have no additional content at bottom */}
        </div>
      )}

      {/* Rating for completed */}
      {isDone && apt.rating && (
        <div className="flex items-center gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < apt.rating! ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#E2E8F0] fill-[#E2E8F0]"}
            />
          ))}
          <span className="text-[10px] text-[#64748B] ml-1">Session rated</span>
        </div>
      )}

      {/* Rate Now for unrated completed sessions */}
      {isDone && !apt.rating && (
        <button
          onClick={() => onOpenRatingModal(apt)}
          className="pt-1 text-[11px] text-[#2563EB] hover:text-[#1E40AF] font-medium hover:underline transition-colors text-left"
        >
          How was the Session? Rate Now!
        </button>
      )}
    </motion.div>
  );
}
