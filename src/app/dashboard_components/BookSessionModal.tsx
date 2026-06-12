import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, ChevronRight, Plus, CheckCircle2, Building2, Video, MessageSquare, Users, Home, Check } from "lucide-react";

interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  policyHolder: string;
  coverage: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
  copay: string;
  deductible: string;
  phone: string;
  groupNumber?: string;
  logoUrl?: string;
  isPrimary?: boolean;
}

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  insurancePolicies: InsurancePolicy[];
  onOpenAddInsurance: () => void;
  onCreateClaim: (insuranceId: string, service: string, sessionType?: string) => void;
}

const SERVICES = [
  { 
    id: "individual", 
    name: "Individual Therapy", 
    description: "One-on-one therapeutic sessions",
    price: "919",
    sessions: "1 Video session",
    duration: "10 mins each",
    features: [
      "1 Trial Video/Phone session",
      "Private therapist",
      "Daily responses for a week",
      "Unlimited access to Meditation, Yoga & Self-care tools"
    ],
    icon: "video"
  },
  { 
    id: "couples", 
    name: "Couples Therapy", 
    description: "Relationship counseling for partners",
    price: "1,199",
    sessions: "1 Video session",
    duration: "15 mins each",
    features: [
      "1 Trial Video/Phone session",
      "Specialized couples therapist",
      "Daily responses for a week",
      "Unlimited access to Meditation, Yoga & Self-care tools"
    ],
    icon: "users"
  },
  { 
    id: "family", 
    name: "Family Therapy", 
    description: "Support for family dynamics",
    price: "1,399",
    sessions: "1 Video session",
    duration: "20 mins each",
    features: [
      "1 Trial Video/Phone session",
      "Family therapy specialist",
      "Daily responses for a week",
      "Unlimited access to Meditation, Yoga & Self-care tools"
    ],
    icon: "home"
  },
  { 
    id: "group", 
    name: "Group Therapy", 
    description: "Shared experiences in a group setting",
    price: "699",
    sessions: "1 Video session",
    duration: "10 mins each",
    features: [
      "1 Trial Video/Phone session",
      "Group therapy facilitator",
      "Daily responses for a week",
      "Unlimited access to Meditation, Yoga & Self-care tools"
    ],
    icon: "users-group"
  },
];

export function BookSessionModal({
  isOpen,
  onClose,
  insurancePolicies,
  onOpenAddInsurance,
  onCreateClaim,
}: BookSessionModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleClose = () => {
    setStep(1);
    setSelectedInsurance(null);
    setSelectedService(null);
    onClose();
  };

  const handleInsuranceSelect = (insuranceId: string) => {
    setSelectedInsurance(insuranceId);
  };

  const handleContinueToServices = () => {
    if (selectedInsurance) {
      setStep(2);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleCreateClaim = () => {
    if (selectedInsurance && selectedService) {
      const service = SERVICES.find((s) => s.id === selectedService);
      if (service) {
        onCreateClaim(selectedInsurance, service.name, "video");
        handleClose();
      }
    }
  };

  const handleAddInsuranceClick = () => {
    handleClose();
    onOpenAddInsurance();
  };

  const activeInsurances = insurancePolicies.filter((p) => p.status === "active");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#043570] to-[#2563EB] px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Book More Sessions</h2>
                  <p className="text-sm text-white/80 mt-0.5">
                    {step === 1 ? "Select your insurance" : step === 2 ? "Choose therapy service" : "Choose session type"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-1 rounded-full flex-1 transition-all ${
                    step >= 1 ? "bg-white" : "bg-white/30"
                  }`}
                />
                <span className="text-xs text-white/90 font-medium">Insurance</span>
              </div>
              <ChevronRight size={14} className="text-white/60" />
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-1 rounded-full flex-1 transition-all ${
                    step >= 2 ? "bg-white" : "bg-white/30"
                  }`}
                />
                <span className="text-xs text-white/90 font-medium">Service</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 mb-1">
                      Active Insurance Policies
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select the insurance you want to use for this session
                    </p>
                  </div>

                  {activeInsurances.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield size={24} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600 mb-1">No Active Insurance</p>
                      <p className="text-xs text-slate-400 mb-6">
                        Add an insurance policy to book sessions
                      </p>
                      <button
                        onClick={handleAddInsuranceClick}
                        className="inline-flex items-center gap-2 bg-[#043570] hover:bg-[#2563EB] text-white text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        <Plus size={16} />
                        Add Insurance
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {activeInsurances.map((insurance) => (
                        <motion.button
                          key={insurance.id}
                          onClick={() => handleInsuranceSelect(insurance.id)}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedInsurance === insurance.id
                              ? "border-[#2563EB] bg-[#f3faff] shadow-sm"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#043570] to-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                                <Building2 size={18} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                                    {insurance.provider}
                                  </h4>
                                  {insurance.isPrimary && (
                                    <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-md font-medium">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 mb-1">
                                  Policy: {insurance.policyNumber}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                  <span>Copay: {insurance.copay}</span>
                                  <span>•</span>
                                  <span>{insurance.coverage}</span>
                                </div>
                              </div>
                            </div>
                            {selectedInsurance === insurance.id && (
                              <CheckCircle2 size={20} className="text-[#2563EB] flex-shrink-0" />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-5">
                    <h3 className="text-base font-bold text-slate-800 mb-1">
                      Select Therapy Service
                    </h3>
                    <p className="text-sm text-slate-500">
                      Choose the type of therapy session you want to book
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {SERVICES.map((service) => {
                      const IconComponent = 
                        service.icon === 'video' ? Video : 
                        service.icon === 'users' ? Users : 
                        service.icon === 'home' ? Home : Users;
                      
                      return (
                        <motion.button
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          whileTap={{ scale: 0.98 }}
                          className={`relative text-left p-5 rounded-2xl border-2 transition-all ${
                            selectedService === service.id
                              ? "border-[#2563EB] bg-gradient-to-br from-[#f3faff] to-white shadow-lg"
                              : "border-slate-200 bg-white hover:border-[#2563EB]/40 hover:shadow-md"
                          }`}
                        >
                          {/* Header with Icon, Title, Subtitle and Price */}
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br from-[#043570] to-[#2563EB]">
                              <IconComponent size={32} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-slate-900 mb-1">
                                {service.name}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                                <span>{service.sessions}</span>
                                <span>•</span>
                                <span>{service.duration}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-2xl font-bold text-[#2563EB]">₹{service.price}</div>
                              <div className="text-[10px] font-medium text-slate-500 tracking-wide">PER SESSION</div>
                            </div>
                          </div>

                          {/* Features List */}
                          <div className="space-y-2.5 pl-1">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#f3faff]">
                                  <Check size={10} className="text-[#2563EB]" strokeWidth={3} />
                                </div>
                                <span className="leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Selection Indicator */}
                          {selectedService === service.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4"
                            >
                              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-[#2563EB]">
                                <Check size={18} className="text-white" strokeWidth={3} />
                              </div>
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
            <div className="flex items-center justify-between gap-3">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  ← Back
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                {step === 1 ? (
                  <button
                    onClick={handleContinueToServices}
                    disabled={!selectedInsurance}
                    className={`px-5 py-2 text-sm font-medium rounded-xl transition-all ${
                      selectedInsurance
                        ? "bg-[#2563EB] hover:bg-[#043570] text-white shadow-sm"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                ) : step === 2 ? (
                  <button
                    onClick={handleCreateClaim}
                    disabled={!selectedService}
                    className={`px-5 py-2 text-sm font-medium rounded-xl transition-all ${
                      selectedService
                        ? "bg-[#2563EB] hover:bg-[#043570] text-white shadow-sm"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Send Approval Request
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
