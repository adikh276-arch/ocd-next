import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Search, Zap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentExpertRole: string;
}

export function PreferencesModal({ isOpen, onClose, currentExpertRole }: PreferencesModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [specializations, setSpecializations] = useState<Set<string>>(new Set());
  const [country, setCountry] = useState<string>("No preference");
  const [language, setLanguage] = useState<string>("No preference");
  const [timezone, setTimezone] = useState<string>("India (GMT+5:30)");
  const [availabilitySlots, setAvailabilitySlots] = useState<Set<string>>(new Set());
  const [matchingMethod, setMatchingMethod] = useState<string>("auto-match");
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  
  // Dropdown and search states
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Dynamic specializations based on expert role
  const getSpecializations = () => {
    const baseOptions = ["No preference"];
    
    const role = (currentExpertRole || "").toLowerCase();
    
    switch (role) {
      case "endocrinologist":
        return [
          ...baseOptions,
          "Diabetes & Metabolism",
          "Thyroid Disorders",
          "Pituitary & Adrenal Disorders",
          "Reproductive Endocrinology",
          "Pediatric Endocrinology",
        ];
      case "therapist":
        return [
          ...baseOptions,
          "Anxiety & Depression",
          "Relationship Issues",
          "Trauma & PTSD",
          "Therapy",
          "Family Therapy",
          "Child & Adolescent Therapy",
        ];
      case "nutritionist":
      case "dietitian":
        return [
          ...baseOptions,
          "Weight Management",
          "Sports Nutrition",
          "Clinical Nutrition",
          "Pediatric Nutrition",
          "Diabetes Management",
          "Plant-Based Diet",
        ];
      case "yoga instructor":
        return [
          ...baseOptions,
          "Hatha Yoga",
          "Vinyasa Flow",
          "Ashtanga",
          "Yin Yoga",
          "Prenatal Yoga",
          "Therapeutic Yoga",
        ];
      default:
        return [
          ...baseOptions,
          "General Practice",
          "Specialized Care",
          "Holistic Approach",
          "Evidence-Based Practice",
        ];
    }
  };

  const specializationOptions = getSpecializations();

  const countries = [
    "No preference",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Singapore",
    "UAE",
  ];

  const languages = [
    "No preference",
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Hindi",
    "Arabic",
  ];

  const timezones = [
    "India (GMT+5:30)",
    "United States - EST (GMT-5:00)",
    "United States - PST (GMT-8:00)",
    "United Kingdom (GMT+0:00)",
    "Australia - AEST (GMT+10:00)",
    "Singapore (GMT+8:00)",
    "UAE (GMT+4:00)",
  ];

  const timeSlots = [
    { id: "early-morning", label: "Early Morning", time: "5 AM – 8 AM" },
    { id: "morning", label: "Morning", time: "8 AM – 11 AM" },
    { id: "late-morning", label: "Late Morning", time: "11 AM – 2 PM" },
    { id: "afternoon", label: "Afternoon", time: "2 PM – 5 PM" },
    { id: "early-evening", label: "Early Evening", time: "5 PM – 8 PM" },
    { id: "evening", label: "Evening", time: "8 PM – 11 PM" },
    { id: "late-night", label: "Late Night", time: "11 PM – 2 AM" },
    { id: "overnight", label: "Overnight", time: "2 AM – 5 AM" },
  ];

  const toggleTimeSlot = (slotId: string) => {
    setAvailabilitySlots((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slotId)) {
        newSet.delete(slotId);
      } else {
        newSet.add(slotId);
      }
      return newSet;
    });
  };

  const toggleSpecialization = (spec: string) => {
    setSpecializations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(spec)) {
        newSet.delete(spec);
      } else {
        newSet.add(spec);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - show matching method selection
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFindMatches = () => {
    // Show the final message
    setShowFinalMessage(true);
  };

  const handleOK = () => {
    // Close modal and reset
    setShowFinalMessage(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[700px] flex flex-col relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Header */}
            {currentStep <= 4 && (
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-xl font-semibold text-[#020817] mb-1">
                  {currentExpertRole} Preferences
                </h2>
                <p className="text-sm text-[#64748B] mb-4">
                  Share your preferences to help us match you with the right expert.
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#64748B]">Step {currentStep} of {totalSteps}</span>
                  <span className="text-sm text-[#64748B]">{progressPercentage}%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-[#4F7FCD] rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Header for Step 5 */}
            {currentStep === 5 && !showFinalMessage && (
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-xl font-semibold text-[#020817] mb-1">
                  {currentExpertRole} Preferences
                </h2>
                <p className="text-sm text-[#64748B]">
                  Share your preferences to help us match you with the right expert.
                </p>
              </div>
            )}

            {/* Content */}
            <div className="px-8 pb-8 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Specialization */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-[#020817] mb-6">
                      What specialization are you looking for?
                    </h2>
                    <div className="space-y-3">
                      {specializationOptions.map((spec) => (
                        <button
                          key={spec}
                          onClick={() => toggleSpecialization(spec)}
                          className={`w-full px-6 py-4 rounded-xl border-2 text-left transition-all ${
                            specializations.has(spec)
                              ? "border-[#4F7FCD] bg-[#EFF6FF]"
                              : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                specializations.has(spec)
                                  ? "border-[#4F7FCD]"
                                  : "border-[#CBD5E1]"
                              }`}
                            >
                              {specializations.has(spec) && (
                                <div className="w-3 h-3 rounded-full bg-[#4F7FCD]" />
                              )}
                            </div>
                            <span className="text-[#020817] font-medium">{spec}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Country */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-[#020817] mb-6">
                      Which country should the {currentExpertRole} be from?
                    </h2>
                    <div className="relative">
                      {/* Selected Country Display */}
                      <button
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full px-6 py-4 rounded-xl border-2 text-left transition-all flex items-center justify-between border-[#4F7FCD] bg-[#EFF6FF]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#020817] font-medium">{country}</span>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-[#64748B] transition-transform ${
                            showCountryDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      {showCountryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-[#E2E8F0] rounded-xl shadow-xl z-20 overflow-hidden"
                        >
                          <div className="p-3 border-b border-[#E2E8F0]">
                            <div className="relative">
                              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                              <input
                                type="text"
                                value={countrySearchTerm}
                                onChange={(e) => setCountrySearchTerm(e.target.value)}
                                placeholder="Search countries..."
                                className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#043570] bg-white focus:outline-none focus:border-[#4F7FCD]"
                              />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {countries
                              .filter((c) =>
                                c.toLowerCase().includes(countrySearchTerm.toLowerCase())
                              )
                              .map((c) => (
                                <button
                                  key={c}
                                  onClick={() => {
                                    setCountry(c);
                                    setShowCountryDropdown(false);
                                    setCountrySearchTerm("");
                                  }}
                                  className={`w-full px-6 py-3 text-left transition-all ${
                                    country === c
                                      ? "bg-[#EFF6FF] text-[#4F7FCD] font-medium"
                                      : "hover:bg-[#F8FAFC] text-[#020817]"
                                  }`}
                                >
                                  {c}
                                </button>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Language */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-[#020817] mb-6">
                      What language should they speak?
                    </h2>
                    <div className="relative">
                      {/* Selected Language Display */}
                      <button
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        className="w-full px-6 py-4 rounded-xl border-2 text-left transition-all flex items-center justify-between border-[#4F7FCD] bg-[#EFF6FF]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#020817] font-medium">{language}</span>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-[#64748B] transition-transform ${
                            showLanguageDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      {showLanguageDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-[#E2E8F0] rounded-xl shadow-xl z-20 overflow-hidden"
                        >
                          <div className="p-3 border-b border-[#E2E8F0]">
                            <div className="relative">
                              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                              <input
                                type="text"
                                value={languageSearchTerm}
                                onChange={(e) => setLanguageSearchTerm(e.target.value)}
                                placeholder="Search languages..."
                                className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#043570] bg-white focus:outline-none focus:border-[#4F7FCD]"
                              />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {languages
                              .filter((lang) =>
                                lang.toLowerCase().includes(languageSearchTerm.toLowerCase())
                              )
                              .map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => {
                                    setLanguage(lang);
                                    setShowLanguageDropdown(false);
                                    setLanguageSearchTerm("");
                                  }}
                                  className={`w-full px-6 py-3 text-left transition-all ${
                                    language === lang
                                      ? "bg-[#EFF6FF] text-[#4F7FCD] font-medium"
                                      : "hover:bg-[#F8FAFC] text-[#020817]"
                                  }`}
                                >
                                  {lang}
                                </button>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Availability */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-[#020817]">
                        Choose your preferred times.
                      </h2>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#043570] bg-white hover:border-[#CBD5E1] transition-colors"
                      >
                        {timezones.map((tz) => (
                          <option key={tz} value={tz}>
                            {tz}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select All Checkbox - Small, no border */}
                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={availabilitySlots.size === timeSlots.length}
                        onChange={() => {
                          const allSelected = availabilitySlots.size === timeSlots.length;
                          if (allSelected) {
                            setAvailabilitySlots(new Set());
                          } else {
                            setAvailabilitySlots(new Set(timeSlots.map((slot) => slot.id)));
                          }
                        }}
                        className="w-4 h-4 text-[#4F7FCD] border-[#CBD5E1] rounded focus:ring-[#4F7FCD] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#020817]">All the time slots work for me.</span>
                    </label>

                    {/* Time Slots in 2 Columns */}
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => {
                        const isSelected = availabilitySlots.has(slot.id);
                        return (
                          <button
                            key={slot.id}
                            onClick={() => toggleTimeSlot(slot.id)}
                            className={`px-4 py-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? "border-[#4F7FCD] bg-[#EFF6FF]"
                                : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isSelected
                                    ? "border-[#4F7FCD] bg-[#4F7FCD]"
                                    : "border-[#CBD5E1] bg-white"
                                }`}
                              >
                                {isSelected && (
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
                              <div>
                                <div className="text-[#020817] font-semibold text-sm">{slot.label}</div>
                                <div className="text-xs text-[#64748B] mt-0.5">{slot.time}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Matching Method */}
                {currentStep === 5 && !showFinalMessage && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-[#020817] mb-2">
                        How would you like to find your {currentExpertRole}?
                      </h2>
                      <p className="text-sm text-[#64748B]">
                        Choose whether you'd like to select providers yourself or let us reach out to the best matches for you.
                      </p>
                    </div>

                    <div className="space-y-4 mb-4">
                      {/* Auto-Match */}
                      <button
                        onClick={() => setMatchingMethod("auto-match")}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all relative ${
                          matchingMethod === "auto-match"
                            ? "border-[#4F7FCD] bg-[#EFF6FF]"
                            : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                        }`}
                      >
                        <div className="absolute bottom-4 right-4 bg-[#10B981] text-white text-xs px-2 py-1 rounded">
                          Recommended
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#4F7FCD]/20 flex items-center justify-center flex-shrink-0">
                            <Zap size={24} className="text-[#4F7FCD]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#020817] mb-2">
                              Auto-Match for Me
                            </h3>
                            <p className="text-sm text-[#64748B] leading-relaxed">
                              We automatically send your request to top matching providers to save you time.
                            </p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              matchingMethod === "auto-match"
                                ? "border-[#4F7FCD]"
                                : "border-[#CBD5E1]"
                            }`}
                          >
                            {matchingMethod === "auto-match" && (
                              <div className="w-3.5 h-3.5 rounded-full bg-[#4F7FCD]" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Browse & Choose */}
                      <button
                        onClick={() => setMatchingMethod("browse")}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                          matchingMethod === "browse"
                            ? "border-[#4F7FCD] bg-[#EFF6FF]"
                            : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                            <Search size={24} className="text-[#4F7FCD]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#020817] mb-2">
                              Browse & Choose Yourself
                            </h3>
                            <p className="text-sm text-[#64748B] leading-relaxed">
                              View matching providers and send requests manually.
                            </p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              matchingMethod === "browse"
                                ? "border-[#4F7FCD]"
                                : "border-[#CBD5E1]"
                            }`}
                          >
                            {matchingMethod === "browse" && (
                              <div className="w-3.5 h-3.5 rounded-full bg-[#4F7FCD]" />
                            )}
                          </div>
                        </div>
                      </button>
                    </div>

                    <p className="text-xs text-center text-[#64748B] mb-4">
                      Providers will review and accept your request within 24 hours — this is not instant booking.
                    </p>

                    {/* Find Matches Button */}
                    <button
                      onClick={handleFindMatches}
                      className="w-full py-4 bg-[#4F7FCD] text-white rounded-xl font-semibold hover:bg-[#4169B8] transition-colors"
                    >
                      Find My Matches
                    </button>
                  </motion.div>
                )}

                {/* Final Message Screen */}
                {currentStep === 5 && showFinalMessage && (
                  <motion.div
                    key="final-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                        {matchingMethod === "browse" ? (
                          <Search size={32} className="text-[#4F7FCD]" />
                        ) : (
                          <Zap size={32} className="text-[#4F7FCD]" />
                        )}
                      </div>
                      <p className="text-lg text-[#020817] font-medium">
                        {matchingMethod === "browse"
                          ? "Redirecting to provider selection..."
                          : "Sending request to all matching providers..."}
                      </p>
                    </div>
                    <button
                      onClick={handleOK}
                      className="px-8 py-3 bg-[#4F7FCD] text-white rounded-xl font-semibold hover:bg-[#4169B8] transition-colors"
                    >
                      OK
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {currentStep <= 4 && (
              <div className="px-8 pb-8 flex items-center gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                    currentStep === 1
                      ? "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                      : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 bg-[#4F7FCD] text-white rounded-xl font-semibold hover:bg-[#4169B8] transition-colors flex items-center justify-center gap-2"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
