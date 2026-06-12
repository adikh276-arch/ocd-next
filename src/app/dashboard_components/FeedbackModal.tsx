import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  expertRole: string;
}

const feedbackOptions = [
  "Unavailable time slots",
  "Ineffective ExpertRole/ compatibility issues",
  "Language barrier",
  "Unresponsive ExpertRole",
  "Other (Please specify)"
];

export function FeedbackModal({ isOpen, onClose, onSubmit, expertRole }: FeedbackModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherText, setOtherText] = useState<string>("");

  const handleSubmit = () => {
    if (selectedReasons.length === 0) return;
    
    // Log or send feedback data here if needed
    console.log("Feedback:", {
      reasons: selectedReasons,
      otherDetails: selectedReasons.includes("Other (Please specify)") ? otherText : null
    });

    // Close this modal and open Preferences modal
    onSubmit();
  };

  const handleClose = () => {
    setSelectedReasons([]);
    setOtherText("");
    onClose();
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#f3faff] border-b border-[#E2ECF5] px-6 py-5">
            <h2 className="text-xl font-semibold text-[#020817]">
              Why do you want to switch this {expertRole}?
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Your feedback helps us improve your experience
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="space-y-3">
              {feedbackOptions.map((option) => (
                <div key={option}>
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedReasons.includes(option)
                        ? "border-[#00c0ff] bg-[#f3faff]"
                        : "border-[#E2ECF5] hover:border-[#00c0ff]/30 hover:bg-[#f3faff]/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="feedback"
                      value={option}
                      checked={selectedReasons.includes(option)}
                      onChange={(e) => toggleReason(e.target.value)}
                      className="mt-0.5 w-4 h-4 text-[#00c0ff] border-[#E2ECF5] focus:ring-[#00c0ff] focus:ring-offset-0"
                    />
                    <span className="text-sm font-medium text-[#020817]">{option}</span>
                  </label>

                  {/* Show text input when "Other" is selected */}
                  {option === "Other (Please specify)" && selectedReasons.includes(option) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 ml-7"
                    >
                      <textarea
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        placeholder="Please describe your reason..."
                        className="w-full px-4 py-3 border-2 border-[#E2ECF5] rounded-xl text-sm text-[#020817] placeholder:text-[#94A3B8] focus:border-[#00c0ff] focus:outline-none focus:ring-0 resize-none transition-colors"
                        rows={3}
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#F9FAFB] flex items-center justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 border border-[#E2ECF5] rounded-lg text-sm font-medium text-[#64748B] hover:bg-white hover:text-[#020817] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedReasons.length === 0 || (selectedReasons.includes("Other (Please specify)") && !otherText.trim())}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                selectedReasons.length === 0 || (selectedReasons.includes("Other (Please specify)") && !otherText.trim())
                  ? "bg-[#E2ECF5] text-[#94A3B8] cursor-not-allowed"
                  : "bg-[#043570] text-white hover:bg-[#032656]"
              }`}
            >
              Submit
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-[#64748B] hover:text-[#043570] transition-colors"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
