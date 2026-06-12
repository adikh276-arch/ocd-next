import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Clock, Video, MessageCircle, Phone, MapPin, Check, XCircle, CalendarDays, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

type SessionMode = "Video" | "Chat" | "Call" | "In-Person";

interface AppointmentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    providerName: string;
    providerTitle: string;
    providerAvatar: string;
    service: string;
    date: string;
    time: string;
    duration: number;
    mode: SessionMode;
    isAccepted?: boolean;
  } | null;
  onAccept?: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
}

const MODE_ICON: Record<SessionMode, React.ElementType> = {
  Video: Video,
  Chat: MessageCircle,
  Call: Phone,
  "In-Person": MapPin,
};

export function AppointmentConfirmationModal({
  isOpen,
  onClose,
  appointment,
  onAccept,
  onCancel,
  onReschedule,
}: AppointmentConfirmationModalProps) {
  // Get user name from localStorage or use default
  const userName = localStorage.getItem("userName") || "Client Name";
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Reset success message when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccessMessage(false);
    }
  }, [isOpen]);

  if (!isOpen || !appointment) return null;

  const ModeIconComponent = MODE_ICON[appointment.mode];
  const showAcceptButton = onAccept && !appointment.isAccepted;
  const showRescheduleButton = onReschedule && appointment.isAccepted;

  const handleAccept = () => {
    setShowSuccessMessage(true);
    onAccept?.();
    // Auto close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#043570] to-[#00c0ff] px-6 py-5 rounded-t-2xl">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-semibold text-white">
                    Appointment Details
                  </h2>
                  <button
                    onClick={onClose}
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
                {!showSuccessMessage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    {/* Profile Images */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex items-center">
                        {/* Client Image - Left */}
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                            alt="Client"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Expert Image - Right, overlapping */}
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg -ml-8 relative z-0">
                          <img
                            src={appointment.providerAvatar}
                            alt={appointment.providerName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Names with Icon */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      {/* Session Mode Icon */}
                      <div className="w-10 h-10 bg-[#00c0ff] rounded-full flex items-center justify-center">
                        <ModeIconComponent size={18} className="text-white" />
                      </div>
                      
                      {/* Expert Name */}
                      <span className="text-base font-semibold text-[#020817]">
                        {appointment.providerName}
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
                    <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-6 text-left space-y-4">
                      {/* Service */}
                      <div className="flex items-start gap-3">
                        <CalendarIcon size={20} className="text-[#043570] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-semibold text-[#043570]">Service:</span>
                          <span className="text-sm text-[#020817] ml-2">{appointment.service}</span>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-start gap-3">
                        <Clock size={20} className="text-[#043570] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-semibold text-[#043570]">Time:</span>
                          <span className="text-sm text-[#020817] ml-2">
                            {appointment.date} at {appointment.time}
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <span className="text-sm font-semibold text-[#043570]">Duration:</span>
                          <span className="text-sm text-[#020817] ml-2">{appointment.duration} mins</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {/* Accept Button (for non-accepted appointments) */}
                      {showAcceptButton && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAccept}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                        >
                          <Check size={18} />
                          Accept
                        </motion.button>
                      )}

                      {/* Reschedule Button (for accepted appointments) */}
                      {showRescheduleButton && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onReschedule?.();
                            onClose();
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                        >
                          <CalendarDays size={18} />
                          Reschedule
                        </motion.button>
                      )}

                      {/* Cancel Button (always show) */}
                      {onCancel && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onCancel?.();
                            onClose();
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                        >
                          <XCircle size={18} />
                          Cancel
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={48} className="text-white" />
                    </motion.div>
                    
                    {/* Success Message */}
                    <h3 className="text-2xl font-bold text-[#020817] mb-3">
                      Appointment Confirmed!
                    </h3>
                    <p className="text-base text-[#64748B]">
                      Your appointment has been successfully confirmed
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
