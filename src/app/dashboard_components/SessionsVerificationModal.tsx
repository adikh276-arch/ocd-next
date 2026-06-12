import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Calendar, Clock, Video, MessageCircle, Phone, MapPin } from "lucide-react";

type SessionMode = "Video" | "Chat" | "Call" | "In-Person";

interface SessionsVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  appointment: {
    providerName: string;
    providerAvatar: string;
    service: string;
    date: string;
    time: string;
    duration: number;
    mode: SessionMode;
  };
}

const MODE_ICON: Record<SessionMode, React.ElementType> = {
  Video: Video,
  Chat: MessageCircle,
  Call: Phone,
  "In-Person": MapPin,
};

export function SessionsVerificationModal({
  isOpen,
  onClose,
  onSubmit,
  appointment,
}: SessionsVerificationModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  // Get user name from localStorage or use default
  const userName = localStorage.getItem("userName") || "Client Name";

  const ModeIconComponent = MODE_ICON[appointment.mode];

  const reasons = [
    "Provider didn't show up",
    "I couldn't attend",
    "Technical issues",
    "Rescheduled to another time",
    "Other",
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      const fullReason = selectedReason === "Other" && additionalDetails
        ? `${selectedReason}: ${additionalDetails}`
        : selectedReason;
      onSubmit(fullReason);
      // Reset state
      setSelectedReason("");
      setAdditionalDetails("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setAdditionalDetails("");
    onClose();
  };

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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#043570] to-[#00c0ff] px-6 py-5 rounded-t-2xl">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-semibold text-white">
                    Session Verification
                  </h2>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-white/90">
                  Session ID: S-{appointment.service.substring(0, 4).toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Profile Images - Overlapping */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {/* Provider Image - Left */}
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                      <img
                        src={appointment.providerAvatar}
                        alt={appointment.providerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Client Image - Right, overlapping */}
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg -ml-8 relative z-0">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Names with Session Mode Icon */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  {/* Session Mode Icon */}
                  <div className="w-10 h-10 bg-[#00c0ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <ModeIconComponent size={18} className="text-white" />
                  </div>
                  
                  {/* Provider Name */}
                  <span className="text-base font-semibold text-[#020817]">
                    {appointment.providerName}
                  </span>
                  
                  {/* Two-way Arrows Icon */}
                  <svg
                    className="w-5 h-5 text-[#020817] flex-shrink-0"
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

                {/* Session Details */}
                <div className="bg-[#f3faff] rounded-xl p-4 space-y-3 mb-6">
                  {/* Service */}
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-[#043570] flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#043570]">Service:</span>
                      <span className="text-sm text-[#020817]">{appointment.service}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-[#043570] flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#043570]">Time:</span>
                      <span className="text-sm text-[#020817]">
                        {appointment.date} at {appointment.time} at {appointment.time}
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#043570] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#043570]">Duration:</span>
                      <span className="text-sm text-[#020817]">{appointment.duration} mins</span>
                    </div>
                  </div>
                </div>

                {/* Reason Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#020817] mb-3">
                    What happened?
                  </label>
                  <div className="space-y-2">
                    {reasons.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => setSelectedReason(reason)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          selectedReason === reason
                            ? "border-[#2563EB] bg-[#DBEAFE] text-[#2563EB]"
                            : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{reason}</span>
                          {selectedReason === reason && (
                            <div className="w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center">
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
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Details (shown when "Other" is selected) */}
                {selectedReason === "Other" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#020817] mb-2">
                      Please provide details
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Describe what happened..."
                      className="w-full h-24 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#020817] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] resize-none transition-all"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onSubmit("Valid");
                      handleClose();
                    }}
                    className="flex-1 px-4 py-3 bg-white border-2 border-[#10B981] text-[#10B981] rounded-xl font-semibold hover:bg-[#10B981] hover:text-white transition-colors"
                  >
                    Mark as Valid
                  </button>
                  <button
                    onClick={() => {
                      if (selectedReason) {
                        const fullReason = selectedReason === "Other" && additionalDetails
                          ? `${selectedReason}: ${additionalDetails}`
                          : selectedReason;
                        onSubmit(fullReason);
                        setSelectedReason("");
                        setAdditionalDetails("");
                        onClose();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-[#EF4444] text-white rounded-xl font-semibold hover:bg-[#DC2626] transition-colors"
                  >
                    Mark as Invalid
                  </button>
                </div>

                {/* Note */}
                <p className="text-xs text-[#94A3B8] text-center mt-4">
                  Our team will review this report and contact you within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
