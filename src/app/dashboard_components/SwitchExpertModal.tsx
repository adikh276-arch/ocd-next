import { useState } from "react";
import { X, ArrowLeft, Settings, Star, MapPin, CheckCircle, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ContinueMatchingModal } from "./ContinueMatchingModal";
import { PreferencesModal } from "./PreferencesModal";
import { FeedbackModal } from "./FeedbackModal";

interface Expert {
  id: string;
  name: string;
  credentials: string;
  location: string;
  status: "online" | "offline";
  rating: number;
  totalReviews: number;
  description: string;
  specialties: string[];
  languages: string[];
  gender: "Male" | "Female" | "Other";
  image: string;
  experience: string;
  isInvited?: boolean;
}

interface SwitchExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentExpertRole: string;
  onExpertSelect: (expertId: string) => void;
  onPreferencesClick?: () => void;
}

const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Shuvendu Pradhan",
    credentials: "Bachelor's",
    location: "Bhubaneswar, Odisha, India",
    status: "online",
    rating: 4.5,
    totalReviews: 127,
    description: "A dedicated and passionate fitness professional with a strong commitment to inspiring and guiding individuals and groups on their wellness journey. I specialize in designing personalized workout plans and nutrition strategies.",
    specialties: ["Entrepreneur/Startup", "Weight Loss", "Weight Gain", "Diabetes", "Personal Training/Exercise", "Muscle building", "PCOS", "Hypertension", "Senior Fitness", "Employee Wellness"],
    languages: ["English", "Hindi", "Odia (Oriya)"],
    gender: "Male",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=faces",
    experience: "8+ years",
    isInvited: false
  },
  {
    id: "2",
    name: "Marwan Abdelfatah",
    credentials: "Bachelor's",
    location: "Dubai, Dubai, United Arab Emirates",
    status: "offline",
    rating: 4.8,
    totalReviews: 243,
    description: "Dedicated and knowledgeable Dietitian with expertise in sports nutrition, weight management, and therapeutic meal planning. Certified in Nutrition Coaching by NASM, ACE, and ISSA.",
    specialties: ["Weight Loss", "Weight Gain", "PCOS/PCOD Diet", "Diabetes Diet", "Cholesterol/Hypertension Diet", "Keto Diet", "Vegan Diet", "Low-Carb Diet", "Thyroid Diet", "Sports Nutrition"],
    languages: ["Arabic", "English"],
    gender: "Male",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    experience: "10+ years",
    isInvited: true
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    credentials: "MD, PhD",
    location: "Mumbai, Maharashtra, India",
    status: "online",
    rating: 4.9,
    totalReviews: 356,
    description: "Board-certified physician specializing in integrative medicine and holistic wellness. Expert in combining traditional medical practices with modern wellness approaches for optimal health outcomes.",
    specialties: ["Holistic Wellness", "Stress Management", "Chronic Disease", "Preventive Care", "Women's Health", "Hormonal Balance", "Sleep Disorders", "Mental Health"],
    languages: ["English", "Hindi", "Marathi"],
    gender: "Female",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
    experience: "12+ years",
    isInvited: false
  },
  {
    id: "4",
    name: "James Rodriguez",
    credentials: "MSc, CSCS",
    location: "Los Angeles, California, USA",
    status: "online",
    rating: 4.7,
    totalReviews: 189,
    description: "Certified Strength and Conditioning Specialist with extensive experience in athletic performance, injury prevention, and rehabilitation. Worked with professional athletes and Olympic teams.",
    specialties: ["Athletic Performance", "Sports Injury", "Strength Training", "Flexibility", "Rehabilitation", "CrossFit", "Functional Training", "Youth Sports"],
    languages: ["English", "Spanish"],
    gender: "Male",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
    experience: "15+ years",
    isInvited: false
  },
  {
    id: "5",
    name: "Sarah Chen",
    credentials: "MS, RD, CSSD",
    location: "Singapore",
    status: "online",
    rating: 4.8,
    totalReviews: 298,
    description: "Registered Dietitian and Board Certified Specialist in Sports Dietetics. Passionate about helping clients achieve their health goals through evidence-based nutrition strategies and sustainable lifestyle changes.",
    specialties: ["Sports Nutrition", "Weight Management", "Plant-Based Diet", "Gut Health", "Food Allergies", "Eating Disorders", "Meal Planning", "Metabolic Health"],
    languages: ["English", "Mandarin", "Cantonese"],
    gender: "Female",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
    experience: "9+ years",
    isInvited: false
  }
];

export function SwitchExpertModal({ isOpen, onClose, currentExpertRole, onExpertSelect, onPreferencesClick }: SwitchExpertModalProps) {
  const router = useRouter();
  const [autoMatching, setAutoMatching] = useState(false);
  const [invitedExperts, setInvitedExperts] = useState<Set<string>>(
    new Set(mockExperts.filter(e => e.isInvited).map(e => e.id))
  );
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleInvite = (expertId: string) => {
    setInvitedExperts(prev => {
      const newSet = new Set(prev);
      newSet.add(expertId);
      return newSet;
    });
  };

  const handleViewProfile = (expertId: string) => {
    // Navigate to provider profile
    window.location.href = `/provider-profile/${expertId}`;
  };

  const handlePreferencesClick = () => {
    // Call parent's callback to open preferences modal
    if (onPreferencesClick) {
      onPreferencesClick();
    }
  };

  const handleFeedbackSubmit = () => {
    // Close feedback modal and open preferences modal
    setShowFeedbackModal(false);
    setShowPreferencesModal(true);
    
    if (onPreferencesClick) {
      onPreferencesClick();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-[#F9FAFB] rounded-2xl shadow-2xl flex flex-col md:overflow-hidden"
        >
          {/* Scrollable Content Wrapper for Mobile */}
          <div className="flex flex-col flex-1 overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-[#E2ECF5] px-6 py-4 md:sticky md:top-0 md:z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-[#64748B] hover:text-[#020817] hover:bg-[#f3faff]"
                >
                  <ChevronLeft size={24} />
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-[#020817]">Choose Expert</h2>
                  <p className="text-sm text-[#64748B] mt-0.5">
                    Here's a list of psychologists ranked based on your preferences. You may use our auto matching (recommended) or manually send invites.
                  </p>
                </div>
              </div>
              <div className="flex justify-end md:justify-start">
                <button
                  onClick={handlePreferencesClick}
                  className="flex items-center gap-2 px-4 py-2 border border-[#E2ECF5] rounded-lg text-sm font-medium text-[#043570] hover:bg-[#f3faff] transition-colors"
                >
                  <Settings size={16} />
                  Preferences
                </button>
              </div>
            </div>

            {/* Auto Matching Toggle */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setAutoMatching(!autoMatching)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  autoMatching ? "bg-[#00c0ff]" : "bg-[#E2ECF5]"
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{ x: autoMatching ? 20 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#043570]">Auto Matching</span>
                {autoMatching && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ 
                      scale: 1,
                      rotate: 360
                    }}
                    transition={{
                      scale: { duration: 0.2 },
                      rotate: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                  >
                    <RefreshCw size={16} className="text-[#00c0ff]" />
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Auto Matching Message */}
            <AnimatePresence mode="wait">
              {autoMatching ? (
                <motion.div
                  key="on"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 px-4 py-3 bg-[#f3faff] border border-[#E2ECF5] rounded-lg"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-[#043570]">
                      Hold tight! We'll match you with a provider within 24 hours. Meanwhile, please complete these tasks.
                    </p>
                    <button
                      onClick={() => router.push('/tasks')}
                      className="flex items-center gap-1 text-sm text-[#00c0ff] hover:text-[#0284c7] font-medium whitespace-nowrap transition-colors"
                    >
                      Tasks
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="off"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 px-4 py-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-[#EF4444]">
                      Auto-match is off. Invite at least 5 providers for faster matching (responses may take up to 24 hours). Meanwhile, complete these tasks.
                    </p>
                    <button
                      onClick={() => router.push('/tasks')}
                      className="flex items-center gap-1 text-sm text-[#EF4444] hover:text-[#DC2626] font-medium whitespace-nowrap transition-colors"
                    >
                      Tasks
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Experts Grid */}
          <div className="flex-1 md:overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockExperts.map((expert) => {
                const isInvited = invitedExperts.has(expert.id);
                
                return (
                  <motion.div
                    key={expert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-[#E2ECF5] rounded-2xl p-5 hover:border-[#00c0ff]/30 hover:shadow-md transition-all"
                  >
                    {/* Expert Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <ImageWithFallback
                          src={expert.image}
                          alt={expert.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        {expert.status === "online" && (
                          <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#10B981] border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-base font-semibold text-[#020817]">{expert.name}</h3>
                          <div className="flex items-center gap-1 bg-[#f3faff] px-2 py-1 rounded-lg flex-shrink-0">
                            <Star size={14} className="text-[#00c0ff] fill-[#00c0ff]" />
                            <span className="text-xs font-semibold text-[#043570]">{expert.rating}</span>
                            <span className="text-xs text-[#64748B]">({expert.totalReviews})</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#64748B] mb-1">{expert.credentials}</p>
                        <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2">
                          <MapPin size={12} />
                          <span className="truncate">{expert.location}</span>
                        </div>
                        {expert.status === "offline" && (
                          <span className="inline-block text-xs text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded">
                            Offline
                          </span>
                        )}
                        {expert.status === "online" && (
                          <span className="inline-block text-xs text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded font-medium">
                            Recently active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#020817] leading-relaxed mb-4 line-clamp-3">
                      {expert.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.specialties.slice(0, 8).map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs px-2.5 py-1 bg-[#f3faff] text-[#043570] rounded-lg border border-[#E2ECF5]"
                        >
                          {specialty}
                        </span>
                      ))}
                      {expert.specialties.length > 8 && (
                        <span className="text-xs px-2.5 py-1 bg-[#f3faff] text-[#00c0ff] rounded-lg border border-[#00c0ff]/20 font-medium">
                          +{expert.specialties.length - 8} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => handleViewProfile(expert.id)}
                        className="flex-1 px-4 py-2.5 border border-[#E2ECF5] rounded-lg text-sm font-medium text-[#043570] hover:bg-[#f3faff] transition-colors"
                      >
                        View profile
                      </button>
                      <button
                        onClick={() => handleInvite(expert.id)}
                        disabled={isInvited}
                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isInvited
                            ? "bg-[#f3faff] text-[#64748B] cursor-not-allowed border border-[#E2ECF5]"
                            : "bg-[#043570] text-white hover:bg-[#032656]"
                        }`}
                      >
                        {isInvited ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <CheckCircle size={16} />
                            Invited
                          </span>
                        ) : (
                          "Invite"
                        )}
                      </button>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-xs text-[#64748B] pt-3 border-t border-[#E2ECF5]">
                      <span>Languages: {expert.languages.join(", ")}</span>
                      <span>{expert.gender}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
          >
            <X size={20} />
          </button>
          </div>
        </motion.div>
        </div>
      </AnimatePresence>

      {/* Continue Matching Modal */}
      <ContinueMatchingModal 
        isOpen={showContinueModal}
        onClose={() => setShowContinueModal(false)}
      />

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        currentExpertRole={currentExpertRole}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
        expertRole={currentExpertRole}
      />
    </>
  );
}
