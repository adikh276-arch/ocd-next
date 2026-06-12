import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import { useState } from "react";

interface Provider {
  id: string;
  name: string;
  title: string;
}

interface RateProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
  onSubmit?: (rating: number, feedback: string) => void;
}

export function RateProviderModal({
  isOpen,
  onClose,
  provider,
  onSubmit,
}: RateProviderModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (onSubmit) {
      onSubmit(rating, feedback);
    }
    // Show success message
    setShowSuccess(true);
    
    // Close after 3 seconds
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setRating(0);
    setFeedback("");
    setShowSuccess(false);
    onClose();
  };

  const handleCancel = () => {
    setRating(0);
    setFeedback("");
    setShowSuccess(false);
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-[#0F172A]">
                  Rate {provider.name}
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    /* Success View */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center py-8"
                    >
                      {/* Green Thumbs Up Icon */}
                      <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mb-6">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                      </div>

                      {/* Success Message */}
                      <h3 className="text-[#0F172A] text-lg font-semibold mb-6 text-center">
                        Thanks for the feedback
                      </h3>

                      {/* Share Feedback */}
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-[#64748B] text-sm">Share feedback on:</p>
                        <div className="flex items-center gap-4">
                          {/* Play Store */}
                          <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all"
                          >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z"
                                fill="#00D7FF"
                              />
                              <path
                                d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z"
                                fill="#FFCE00"
                              />
                              <path
                                d="M3.84 2.15C4.25 1.93 4.73 1.92 5.16 2.11L16.81 8.88L14.54 11.15L3.84 2.15Z"
                                fill="#00F076"
                              />
                              <path
                                d="M16.81 8.88L5.16 2.11C5.45 2.25 5.71 2.46 5.91 2.73L18.09 21.27C18.29 21.54 18.55 21.75 18.84 21.89L16.81 15.12L14.54 12.85L16.81 8.88Z"
                                fill="#FF3A44"
                              />
                            </svg>
                            <span className="text-sm text-[#0F172A] font-medium">Play Store</span>
                          </a>

                          {/* App Store */}
                          <a
                            href="https://www.apple.com/app-store/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all"
                          >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M17.05 20.28C16.07 21.23 15.06 21.08 14.09 20.63C13.08 20.17 12.15 20.15 11.09 20.63C9.79 21.22 9.07 21.04 8.21 20.28C2.78 14.67 3.51 6.12 9.58 5.82C11.04 5.9 12.05 6.66 12.91 6.72C14.18 6.45 15.4 5.67 16.77 5.76C18.43 5.89 19.69 6.54 20.51 7.71C17.14 9.72 17.91 14.42 21 15.76C20.35 17.38 19.53 18.99 17.05 20.29V20.28ZM12.83 5.77C12.67 3.67 14.39 1.96 16.34 1.8C16.63 4.19 14.07 6.01 12.83 5.77Z"
                                fill="#0F172A"
                              />
                            </svg>
                            <span className="text-sm text-[#0F172A] font-medium">App Store</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Rating Form */
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Provider Info */}
                      <div className="text-center mb-4">
                        <p className="text-sm text-[#64748B]">{provider.title}</p>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center justify-center gap-2 mb-6">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const starValue = index + 1;
                          const isActive = starValue <= (hoveredRating || rating);
                          return (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHoveredRating(starValue)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="focus:outline-none"
                            >
                              <Star
                                size={40}
                                className={`transition-colors ${
                                  isActive
                                    ? "text-[#F59E0B] fill-[#F59E0B]"
                                    : "text-[#E2E8F0] fill-[#E2E8F0]"
                                }`}
                              />
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Feedback Input */}
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write something nice about your provider"
                        rows={4}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all resize-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer - Only show when not in success state */}
              {!showSuccess && (
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 text-sm font-medium text-[#0F172A] border border-[#E2E8F0] rounded-xl hover:bg-white hover:border-[#CBD5E1] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#043570] rounded-xl hover:bg-[#032852] transition-all"
                  >
                    Submit
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
