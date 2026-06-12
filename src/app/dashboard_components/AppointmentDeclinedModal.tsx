import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface AppointmentDeclinedModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails?: {
    serviceName: string;
    expertName: string;
    date: string;
    time: string;
  };
}

export function AppointmentDeclinedModal({ isOpen, onClose, appointmentDetails }: AppointmentDeclinedModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-[#FEF2F2] px-6 py-8 text-center border-b border-[#FCA5A5]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-[#EF4444]" />
            </button>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-[#FEF2F2] border border-[#FCA5A5] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertTriangle size={32} className="text-[#EF4444]" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Appointment Declined</h2>
            <p className="text-[#64748B] text-sm">The appointment has been declined</p>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {appointmentDetails && (
              <div className="bg-[#FAFBFC] border border-[#E2E8F0] rounded-2xl px-4 py-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-[#64748B]">Service</span>
                    <span className="text-sm text-[#1E293B] font-semibold">{appointmentDetails.serviceName}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-[#64748B]">Provider</span>
                    <span className="text-sm text-[#1E293B]">{appointmentDetails.expertName}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-[#64748B]">Date</span>
                    <span className="text-sm text-[#1E293B]">{appointmentDetails.date}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-[#64748B]">Time</span>
                    <span className="text-sm text-[#1E293B]">{appointmentDetails.time}</span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-sm text-[#64748B] text-center mb-6">
              {appointmentDetails
                ? "You can reschedule a new appointment from the Appointments page."
                : "The appointment request has been declined."}
            </p>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
