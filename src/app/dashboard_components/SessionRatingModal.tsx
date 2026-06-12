import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ThumbsUp, Send, XCircle, Calendar, Clock, Video, MessageCircle, Phone, MapPin } from "lucide-react";
import { SessionsVerificationModal } from "./SessionsVerificationModal";

type SessionMode = "Video" | "Chat" | "Call" | "In-Person";

const MODE_ICON: Record<SessionMode, React.ElementType> = {
  Video: Video,
  Chat: MessageCircle,
  Call: Phone,
  "In-Person": MapPin,
};

interface SessionRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: number;
    providerName: string;
    providerAvatar: string;
    service: string;
    date: string;
    time: string;
    duration: number;
    mode: SessionMode;
    rating?: number;
    note?: string;
  };
  onSubmitRating: (appointmentId: number, rating: number, feedback: string) => void;
}

export function SessionRatingModal({
  isOpen,
  onClose,
  appointment,
  onSubmitRating,
}: SessionRatingModalProps) {
  const [rating, setRating] = useState(appointment.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState(appointment.note || "");
  const [hasSubmitted, setHasSubmitted] = useState(!!appointment.rating);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Get user name from localStorage or use default
  const userName = localStorage.getItem("userName") || "Client Name";

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitRating(appointment.id, rating, feedback);
      setHasSubmitted(true);
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setRating(appointment.rating || 0);
    setFeedback(appointment.note || "");
    setHasSubmitted(!!appointment.rating);
    onClose();
  };

  const handleVerificationSubmit = (reason: string) => {
    console.log("Session verification submitted:", reason);
    // Handle the verification submission (e.g., update appointment status, notify admin, etc.)
  };

  if (!isOpen) return null;

  // Show rated view if already rated or just submitted
  if (hasSubmitted && rating > 0) {
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
                      Session Rating
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

                {/* Content - Rated View */}
                <div className="px-6 py-8 text-center">
                  {/* Row 1: Thumb Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 bg-[#10B981]/10 rounded-full flex items-center justify-center"
                  >
                    <ThumbsUp size={32} className="text-[#10B981]" />
                  </motion.div>

                  {/* Row 2: Heading */}
                  <h3 className="text-xl font-semibold text-[#020817] mb-6">
                    You rated this session
                  </h3>

                  {/* Row 3: User Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={32}
                        className={
                          i < rating
                            ? "text-[#F59E0B] fill-[#F59E0B]"
                            : "text-[#E2E8F0] fill-[#E2E8F0]"
                        }
                      />
                    ))}
                  </div>

                  {/* Row 4: User Comments (if present) */}
                  {feedback && (
                    <div className="bg-[#F8FAFC] rounded-xl p-4 mb-6 text-left">
                      <p className="text-sm text-[#64748B] mb-1 font-medium">Your feedback:</p>
                      <p className="text-sm text-[#020817]">{feedback}</p>
                    </div>
                  )}

                  {/* Row 5: Share feedback on app stores */}
                  <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                    <p className="text-sm text-[#64748B] mb-4">Share feedback on:</p>
                    <div className="flex items-center justify-center gap-4">
                      {/* Play Store */}
                      <a
                        href="https://play.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-[#CBD5E1] hover:bg-white transition-all"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"
                            fill="#32BBFF"
                          />
                          <path
                            d="M20.538 10.476l-3.058-1.744-3.71 3.268 3.71 3.268 3.058-1.744a1 1 0 000-1.744v-.304z"
                            fill="#F4B400"
                          />
                          <path
                            d="M3.609 1.814l10.183 10.186-3.71 3.268L3 8.186V2.734a1 1 0 01.609-.92z"
                            fill="#37C684"
                          />
                          <path
                            d="M10.082 15.268L3 22.186V8.186l7.082 7.082z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span className="text-sm font-medium text-[#020817]">Play Store</span>
                      </a>

                      {/* App Store */}
                      <a
                        href="https://apps.apple.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-[#CBD5E1] hover:bg-white transition-all"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path
                            d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
                            className="text-[#020817]"
                          />
                        </svg>
                        <span className="text-sm font-medium text-[#020817]">App Store</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Show rating input view if not yet rated
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
                    Rate Session
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

              {/* Content - Rating Input View */}
              <div className="px-6 py-8">
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
                    {(() => {
                      const ModeIconComponent = MODE_ICON[appointment.mode];
                      return <ModeIconComponent size={18} className="text-white" />;
                    })()}
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
                    <div className="flex items-start gap-1.5">
                      <span className="text-sm font-medium text-[#043570]">Service:</span>
                      <span className="text-sm text-[#020817]">{appointment.service}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-[#043570] flex-shrink-0" />
                    <div className="flex items-start gap-1.5">
                      <span className="text-sm font-medium text-[#043570]">Time:</span>
                      <span className="text-sm text-[#020817]">
                        {appointment.date} at {appointment.time}
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-[#043570] flex-shrink-0" />
                    <div className="flex items-start gap-1.5">
                      <span className="text-sm font-medium text-[#043570]">Duration:</span>
                      <span className="text-sm text-[#020817]">{appointment.duration} mins</span>
                    </div>
                  </div>
                </div>

                {/* Heading and Rating in Single Row */}
                <div className="flex items-center justify-between mb-6">
                  {/* Heading on Left */}
                  <h3 className="text-base font-medium text-[#020817]">
                    How was the Session?
                  </h3>

                  {/* Rating Input on Right */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        onMouseEnter={() => setHoverRating(i + 1)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={
                            i < (hoverRating || rating)
                              ? "text-[#F59E0B] fill-[#F59E0B]"
                              : "text-[#E2E8F0] fill-[#E2E8F0]"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 3: Comments Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#020817] mb-2">
                    Additional Feedback (Optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your experience with this session..."
                    className="w-full h-32 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#020817] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] resize-none transition-all"
                  />
                </div>

                {/* Row 4: Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E2E8F0] text-[#64748B] rounded-xl font-semibold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors"
                  >
                    <XCircle size={18} />
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: rating > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: rating > 0 ? 0.98 : 1 }}
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors ${
                      rating > 0
                        ? "bg-[#2563EB] hover:bg-[#1E40AF] text-white"
                        : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                    }`}
                  >
                    <Send size={18} />
                    Submit
                  </motion.button>
                </div>

                {/* Session didn't happen? Link */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowVerificationModal(true)}
                    className="text-sm text-[#2563EB] hover:text-[#1E40AF] font-medium transition-colors"
                  >
                    Session didn't happen?
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sessions Verification Modal */}
          <SessionsVerificationModal
            isOpen={showVerificationModal}
            onClose={() => setShowVerificationModal(false)}
            onSubmit={handleVerificationSubmit}
            appointment={{
              providerName: appointment.providerName,
              providerAvatar: appointment.providerAvatar,
              service: appointment.service,
              date: appointment.date,
              time: appointment.time,
              duration: appointment.duration,
              mode: appointment.mode,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
