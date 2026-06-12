import { X, Check, Calendar, Clock, Phone, Video, MessageCircle, ChevronLeft, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type SessionMode = "Video" | "Chat" | "Call" | "In-Person";

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName: string;
  expertTitle: string;
  expertImage: string;
  sessionMode?: SessionMode;
}

const MODE_ICON: Record<SessionMode, React.ElementType> = {
  Video: Video,
  Chat: MessageCircle,
  Call: Phone,
  "In-Person": MapPin,
};

export function ScheduleAppointmentModal({
  isOpen,
  onClose,
  expertName,
  expertTitle,
  expertImage,
  sessionMode = "Video", // Default to Video if not provided
}: ScheduleAppointmentModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Get today's date and format it as "Month-Date"
  const getTodayDate = () => {
    const today = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[today.getMonth()];
    const date = today.getDate();
    return `${month}-${date}`;
  };

  const [selectedDate, setSelectedDate] = useState<string | null>(getTodayDate());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState<"Video" | "Chat">("Video");
  const [callReminder, setCallReminder] = useState(true);
  
  // Get user's timezone
  const getUserTimezone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      return "UTC";
    }
  };
  
  const [selectedTimezone, setSelectedTimezone] = useState(getUserTimezone());
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  
  // Common timezones list
  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Phoenix",
    "America/Anchorage",
    "Pacific/Honolulu",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Europe/Madrid",
    "Europe/Athens",
    "Europe/Moscow",
    "Asia/Dubai",
    "Asia/Karachi",
    "Asia/Kolkata",
    "Asia/Dhaka",
    "Asia/Bangkok",
    "Asia/Singapore",
    "Asia/Hong_Kong",
    "Asia/Tokyo",
    "Asia/Seoul",
    "Australia/Sydney",
    "Australia/Melbourne",
    "Pacific/Auckland",
  ];
  
  const formatTimezone = (tz: string) => {
    // Format timezone for display (e.g., "America/New_York" -> "America/New York")
    return tz.replace(/_/g, " ");
  };

  // Generate week dates dynamically starting from today
  const generateWeekDates = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      dates.push({
        day: days[currentDate.getDay()],
        date: currentDate.getDate(),
        month: months[currentDate.getMonth()]
      });
    }

    return dates;
  };

  const timeSlots = [
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const weekDates = generateWeekDates();

  const handleDateSelect = (dateKey: string) => {
    setSelectedDate(dateKey);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after closing
    setTimeout(() => {
      setStep(1);
      setSelectedDate(getTodayDate());
      setSelectedTime(null);
    }, 300);
  };

  // Get user name from localStorage or use default
  const userName = localStorage.getItem("userName") || "Client Name";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
                {step === 2 && (
                  <button
                    onClick={handleBack}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-[#64748B] hover:text-[#020817] hover:bg-[#f3faff]"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
                {(step === 1 || step === 3) && <div className="w-8" />}
                <h2 className="text-lg font-semibold text-[#020817]">
                  {step === 3 ? "Appointment Requested" : "Schedule Appointment"}
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Expert Info - Hide on confirmation step */}
              {step !== 3 && (
                <div className="px-4 py-3 border-b border-[#E2E8F0]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={expertImage}
                        alt={expertName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-[#020817]">{expertName}</h3>
                        <p className="text-sm text-[#64748B]">{expertTitle}</p>
                      </div>
                    </div>
                    
                    {/* Timezone Dropdown */}
                    <div className="relative self-end md:self-auto">
                      <button
                        onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3faff] hover:bg-[#E2ECF5] border border-[#E2E8F0] rounded-lg transition-colors text-[#043570]"
                      >
                        <Clock size={14} />
                        <span className="text-xs font-medium">{formatTimezone(selectedTimezone)}</span>
                        <ChevronDown size={14} className={`transition-transform ${showTimezoneDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {showTimezoneDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E2E8F0] rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
                          {timezones.map((tz) => (
                            <button
                              key={tz}
                              onClick={() => {
                                setSelectedTimezone(tz);
                                setShowTimezoneDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-xs hover:bg-[#f3faff] transition-colors ${
                                selectedTimezone === tz ? 'bg-[#f3faff] text-[#043570] font-medium' : 'text-[#64748B]'
                              }`}
                            >
                              {formatTimezone(tz)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="px-4 py-4">
                {/* Step 1: Date Selection */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="date-selection"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-lg font-semibold text-[#020817] mb-4">
                        What day works best for you?
                      </h3>

                      {/* Week View */}
                      <div className="grid grid-cols-7 gap-2 mb-6">
                        {weekDates.map((dateInfo, index) => {
                          const dateKey = `${dateInfo.month}-${dateInfo.date}`;
                          const isSelected = selectedDate === dateKey;

                          return (
                            <button
                              key={dateKey}
                              onClick={() => handleDateSelect(dateKey)}
                              className={`
                                flex flex-col items-center justify-center p-3 rounded-lg transition-all
                                ${
                                  isSelected
                                    ? "bg-[#00c0ff] text-white"
                                    : "hover:bg-[#f3faff] text-[#64748B]"
                                }
                              `}
                            >
                              <span className="text-xs font-medium mb-1">
                                {dateInfo.day}
                              </span>
                              <span className="text-lg font-semibold">
                                {dateInfo.date}
                              </span>
                              <span className="text-xs mt-0.5">{dateInfo.month}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Time Slots */}
                      <h3 className="text-lg font-semibold text-[#020817] mb-3">
                        What time works?
                      </h3>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          const isUnavailable = time === "09:30" || time === "11:30"; // Mock unavailable slots

                          return (
                            <button
                              key={time}
                              onClick={() => !isUnavailable && handleTimeSelect(time)}
                              disabled={isUnavailable}
                              className={`
                                py-2 px-3 rounded-lg text-sm font-medium transition-all
                                ${
                                  isUnavailable
                                    ? "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                                    : isSelected
                                    ? "bg-[#00c0ff] text-white"
                                    : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#f3faff] hover:border-[#00c0ff]"
                                }
                              `}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>

                      {/* Session Type Selector */}
                      <div className="mb-4">
                        <label className="text-sm font-medium text-[#020817] mb-2 block">
                          Session type:
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setSelectedSessionType("Video")}
                            className={`
                              flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
                              ${
                                selectedSessionType === "Video"
                                  ? "bg-[#00c0ff] text-white"
                                  : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#f3faff] hover:border-[#00c0ff]"
                              }
                            `}
                          >
                            <Video size={18} />
                            Video
                          </button>
                          <button
                            onClick={() => setSelectedSessionType("Chat")}
                            className={`
                              flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
                              ${
                                selectedSessionType === "Chat"
                                  ? "bg-[#00c0ff] text-white"
                                  : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#f3faff] hover:border-[#00c0ff]"
                              }
                            `}
                          >
                            <MessageCircle size={18} />
                            Chat
                          </button>
                        </div>
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={handleConfirm}
                        disabled={!selectedDate || !selectedTime}
                        className={`
                          w-full py-3 rounded-xl text-sm font-semibold transition-all
                          ${
                            selectedDate && selectedTime
                              ? "bg-[#00c0ff] text-white hover:bg-[#00a8e0]"
                              : "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                          }
                        `}
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Review Appointment Details */}
                  {step === 2 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center"
                    >
                      {/* Profile Images */}
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                          {/* Client Image - Left */}
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                              alt="Client"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Expert Image - Right, overlapping */}
                          <div className="absolute -right-14 top-0 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img
                              src={expertImage}
                              alt={expertName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Names with Icon */}
                      <div className="flex items-center justify-center gap-2 mb-6">
                        {/* Session Mode Icon */}
                        <div className="w-7 h-7 bg-[#00c0ff] rounded-full flex items-center justify-center">
                          {(() => {
                            const ModeIconComponent = MODE_ICON[sessionMode];
                            return <ModeIconComponent size={14} className="text-white" />;
                          })()}
                        </div>
                        
                        {/* Expert Name */}
                        <span className="text-base font-semibold text-[#020817]">
                          {expertName}
                        </span>
                        
                        {/* Two-way Arrows Icon */}
                        <svg
                          className="w-5 h-5 text-[#020817]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                          />
                        </svg>
                        
                        {/* User Name */}
                        <span className="text-base font-semibold text-[#020817]">
                          {userName}
                        </span>
                      </div>

                      {/* Appointment Details Card */}
                      <div className="bg-[#F8FAFC] rounded-xl p-4 mb-4 text-left space-y-3">
                        {/* Service */}
                        <div className="flex items-start gap-3">
                          <CalendarIcon size={20} className="text-[#043570] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-semibold text-[#043570]">Service:</span>
                            <span className="text-sm text-[#020817] ml-2">{expertTitle}</span>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-3">
                          <Clock size={20} className="text-[#043570] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-semibold text-[#043570]">Time:</span>
                            <span className="text-sm text-[#020817] ml-2">
                              {selectedDate} at {selectedTime}
                            </span>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-[#043570] mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 6h12v3c0 1.5-1 3-3 3H9c-2 0-3-1.5-3-3V6zm0 12h12v-3c0-1.5-1-3-3-3H9c-2 0-3 1.5-3 3v3z"
                            />
                          </svg>
                          <div>
                            <span className="text-sm font-semibold text-[#043570]">Duration:</span>
                            <span className="text-sm text-[#020817] ml-2">30 mins</span>
                          </div>
                        </div>
                      </div>

                      {/* Call Reminder Checkbox */}
                      <div className="flex items-center justify-center mb-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={callReminder}
                              onChange={(e) => setCallReminder(e.target.checked)}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-[#CBD5E1] rounded peer-checked:bg-[#00c0ff] peer-checked:border-[#00c0ff] transition-all flex items-center justify-center">
                              {callReminder && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-[#020817] font-medium group-hover:text-[#00c0ff] transition-colors">
                            Get reminder over a call
                          </span>
                        </label>
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={() => setStep(3)}
                        className="w-full py-3 rounded-xl text-sm font-semibold transition-all bg-[#00c0ff] text-white hover:bg-[#00a8e0]"
                      >
                        Confirm
                      </button>
                    </motion.div>
                  )}

                  {/* Step 3: Success Screen */}
                  {step === 3 && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      {/* Success Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-[#fb923c] to-[#f97316] rounded-full flex items-center justify-center shadow-lg">
                          <Clock size={28} className="text-white" />
                        </div>
                      </motion.div>

                      {/* Success Message */}
                      <h3 className="text-lg font-semibold text-[#020817] mb-2 text-center">
                        Appointment Requested!
                      </h3>
                      <div className="text-sm text-[#64748B] leading-relaxed mb-6 text-left">
                        <p className="font-semibold mb-2">Your Next Steps:</p>
                        <ul className="space-y-1.5 mb-3 list-disc pl-5" style={{ fontSize: '15px' }}>
                          <li>The provider will confirm the appointment, and you will receive a notification via email or the app.</li>
                          <li>Please message the provider "I am ready" 5 minutes before the session start time.</li>
                          <li>The provider will share the session joining link.</li>
                        </ul>
                        <div className="flex justify-end">
                          <a
                            href="https://drive.google.com/file/d/140dDyBX3558cFbDeBbelHb1pSt7_Wgxb/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f3faff] text-[#043570] text-xs font-semibold rounded-full border border-[#00c0ff] hover:bg-[#E2ECF5] transition-colors"
                          >
                            <Video size={14} />
                            How it works?
                          </a>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col md:flex-row gap-2 w-full">
                        <button
                          onClick={() => {
                            handleClose();
                            router.push("/appointments");
                          }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-[#043570] text-white hover:bg-[#032656]"
                        >
                          View Appointment
                        </button>
                        <button
                          onClick={() => {
                            // Mock calendar functionality
                            alert("Calendar event would be added here");
                          }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-white border-2 border-[#00c0ff] text-[#00c0ff] hover:bg-[#f3faff] flex items-center justify-center gap-2"
                        >
                          <CalendarIcon size={18} />
                          Add to Calendar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
