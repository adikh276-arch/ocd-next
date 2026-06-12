import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Video, MessageCircle, Phone, MapPin, CheckCircle, XCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  isAccepted?: boolean;
}

interface PendingSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

const MODE_ICON: Record<SessionMode, any> = {
  Video: Video,
  Chat: MessageCircle,
  Call: Phone,
  "In-Person": MapPin,
};

export function PendingSessionModal({ isOpen, onClose, appointment }: PendingSessionModalProps) {
  if (!isOpen || !appointment) return null;

  const ModeIcon = MODE_ICON[appointment.mode];

  const handleMarkAsValid = () => {
    console.log("Marked as valid:", appointment.id);
    // Add your logic here to mark the session as valid
    onClose();
  };

  const handleMarkAsInvalid = () => {
    console.log("Marked as invalid:", appointment.id);
    // Add your logic here to mark the session as invalid/disputed
    onClose();
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
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#043570] to-[#00c0ff] px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Session Verification</h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-white/90 text-sm">Session ID: {appointment.sessionId}</p>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Provider Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100">
                      <ImageWithFallback
                        src={appointment.providerAvatar}
                        alt={appointment.providerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00c0ff] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <ModeIcon size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0F172A] text-base font-semibold">{appointment.providerName}</h3>
                    <p className="text-[#64748B] text-sm">{appointment.providerTitle}</p>
                    <p className="text-[#2563EB] text-sm mt-1">{appointment.service}</p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="bg-[#f3faff] rounded-xl p-4 mb-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#00c0ff]" />
                    <span className="text-[#0F172A] text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#00c0ff]" />
                    <span className="text-[#0F172A] text-sm">{appointment.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ModeIcon size={16} className="text-[#00c0ff]" />
                    <span className="text-[#0F172A] text-sm">{appointment.mode}</span>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-6">
                  <h3 className="text-[#0F172A] text-lg font-semibold mb-2">
                    Did this session happen?
                  </h3>
                  <p className="text-[#64748B] text-sm">
                    Please verify if this session was completed as scheduled
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMarkAsValid}
                    className="flex items-center justify-center gap-2 bg-[#10B981] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#059669] transition-colors shadow-sm"
                  >
                    <CheckCircle size={18} />
                    Mark as Valid
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMarkAsInvalid}
                    className="flex items-center justify-center gap-2 bg-[#EF4444] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#DC2626] transition-colors shadow-sm"
                  >
                    <XCircle size={18} />
                    Mark as Invalid
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
