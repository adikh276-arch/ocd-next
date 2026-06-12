import { useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReportProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  onSubmit: (reasons: string[], otherReason?: string) => void;
}

const reportReasons = [
  "Posted inappropriate content",
  "Missed scheduled sessions",
  "Engaged in violent or threatening behavior",
  "Unprofessional conduct",
  "Poor communication",
  "Other"
];

export function ReportProviderModal({ isOpen, onClose, providerName, onSubmit }: ReportProviderModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggleReason = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
      if (reason === "Other") {
        setOtherReason("");
      }
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleSubmit = async () => {
    if (selectedReasons.length === 0) {
      return;
    }

    if (selectedReasons.includes("Other") && !otherReason.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(selectedReasons, otherReason);
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setSelectedReasons([]);
    setOtherReason("");
    setShowSuccess(false);
    onClose();
  };

  const isSubmitDisabled = selectedReasons.length === 0 || 
    (selectedReasons.includes("Other") && !otherReason.trim()) ||
    isSubmitting;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-0 md:p-4">
        {/* Modal Container - Bottom Sheet on Mobile, Centered on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "90vh" }}
        >
          {/* Drag Handle - Mobile Only */}
          <div className="md:hidden flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-[#CBD5E1] rounded-full" />
          </div>

          {showSuccess ? (
            /* Success View */
            <>
              {/* Success Header */}
              <div className="px-6 pt-8 pb-4">
                <div className="flex flex-col items-center">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mb-4"
                  >
                    <CheckCircle size={32} className="text-[#10B981]" />
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-semibold text-[#020817] mb-2"
                  >
                    Report submitted
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-[#64748B] text-center"
                  >
                    We'll review it shortly
                  </motion.p>
                </div>
              </div>

              {/* Success Content */}
              <div className="flex-1 px-6 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#f3faff] rounded-xl p-4 border border-[#E2ECF5]"
                >
                  <p className="text-sm text-[#020817] leading-relaxed">
                    Thank you for bringing this to our attention. Our team will carefully review your report and take appropriate action to ensure the safety and quality of our platform.
                  </p>
                </motion.div>
              </div>

              {/* Success Footer */}
              <div className="bg-white border-t border-[#E2ECF5] px-6 py-4">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold bg-[#043570] text-white hover:bg-[#032656] transition-all"
                >
                  Done
                </motion.button>
              </div>
            </>
          ) : (
            /* Report Form View */
            <>
              {/* Header */}
              <div className="px-6 pt-4 pb-4">
                <div className="flex flex-col items-center">
                  {/* Alert Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="text-[#EF4444]" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-[#020817] mb-1">Report provider</h2>
                  <p className="text-sm text-[#64748B] text-center">
                    Help us understand the issue with {providerName}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {/* Reasons Section */}
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-3">
                    Reason for reporting:
                  </label>
                  
                  <div className="space-y-3">
                    {reportReasons.map((reason) => {
                      const isSelected = selectedReasons.includes(reason);
                      
                      return (
                        <label
                          key={reason}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          {/* Custom Checkbox */}
                          <button
                            type="button"
                            onClick={() => handleToggleReason(reason)}
                            className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all mt-0.5 ${
                              isSelected
                                ? "bg-[#00c0ff] border-[#00c0ff]"
                                : "bg-white border-[#CBD5E1] group-hover:border-[#00c0ff]"
                            }`}
                          >
                            {isSelected && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full text-white"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path d="M4 10l4 4 8-8" />
                              </motion.svg>
                            )}
                          </button>
                          
                          <span className="text-sm text-[#020817] select-none">
                            {reason}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Other Reason Text Area */}
                <AnimatePresence>
                  {selectedReasons.includes("Other") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 overflow-hidden"
                    >
                      <label className="block text-sm font-medium text-[#64748B] mb-2">
                        Specify the reason
                      </label>
                      <textarea
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Please describe the issue in detail..."
                        rows={4}
                        className="w-full px-4 py-3 bg-[#f3faff] border border-[#E2ECF5] rounded-xl text-sm text-[#020817] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent resize-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="bg-white border-t border-[#E2ECF5] px-6 py-4">
                <motion.button
                  whileHover={{ scale: isSubmitDisabled ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    isSubmitDisabled
                      ? "bg-[#E2ECF5] text-[#94A3B8] cursor-not-allowed"
                      : "bg-[#043570] text-white hover:bg-[#032656]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </motion.button>
                
                <p className="text-xs text-center text-[#64748B] mt-3 leading-relaxed">
                  *Your request will be reviewed and the provider will be blocked from the platform
                </p>
              </div>
            </>
          )}

          {/* Close Button - Desktop Only */}
          <button
            onClick={handleClose}
            className="hidden md:flex absolute top-4 right-4 w-8 h-8 items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
