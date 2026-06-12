import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Phone, Copy, Check, Globe, Clock, Shield, AlertCircle, ChevronDown, Calendar, ArrowRight, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function EmergencyDoctors() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("IN");
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  const regions = [
    { code: "IN", name: "India", flag: "🇮🇳", number: "+91 9152987821", emergency: "108 / 112" },
    { code: "US", name: "United States", flag: "🇺🇸", number: "+1 469 501 1130", emergency: "911" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧", number: "+44 20 3835 2790", emergency: "999 / 112" },
    { code: "AU", name: "Australia", flag: "🇦🇺", number: "+61 2 8294 5720", emergency: "000 / 112" },
    { code: "CA", name: "Canada", flag: "🇨🇦", number: "+1 647 696 2874", emergency: "911" },
  ];

  const currentRegion = regions.find(r => r.code === selectedRegion) || regions[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentRegion.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCall = () => {
    window.location.href = `tel:${currentRegion.number}`;
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Mobile Nav - mobile only */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-20 md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => router.push(-1)}
                className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-[#DBEAFE] rounded-md flex items-center justify-center flex-shrink-0">
                <Stethoscope size={20} className="text-[#2563EB]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">
                  Emergency Help
                </h1>
                <p className="text-sm text-[#62748e] font-normal">
                  24/7 medical consultation and immediate medical assistance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6"
          >
            {/* Icon and Title */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope size={36} className="text-[#2563EB]" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-semibold text-[#043570] mb-2">
                Emergency Medical Support
              </h2>
              <p className="text-[#64748B]">
                Connect with doctors instantly for urgent medical concerns
              </p>
            </div>

            {/* Region Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#043570] mb-2">
                Your Region
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#f3faff] border border-slate-200 rounded-xl hover:bg-[#EFF6FF] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentRegion.flag}</span>
                    <span className="text-[#043570] font-medium">{currentRegion.name}</span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-[#64748B] transition-transform ${
                      showRegionDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showRegionDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-10"
                    >
                      {regions.map((region) => (
                        <button
                          key={region.code}
                          onClick={() => {
                            setSelectedRegion(region.code);
                            setShowRegionDropdown(false);
                            setCopied(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f3faff] transition-colors ${
                            region.code === selectedRegion ? "bg-[#f3faff]" : ""
                          }`}
                        >
                          <span className="text-2xl">{region.flag}</span>
                          <span className="text-[#043570] font-medium">{region.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Phone Number Display */}
            <div className="bg-[#f3faff] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Emergency Doctor Line</p>
                  <a
                    href={`tel:${currentRegion.number}`}
                    className="text-3xl font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                  >
                    {currentRegion.number}
                  </a>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={18} className="text-[#10B981]" />
                      <span className="text-sm font-medium text-[#10B981]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} className="text-[#64748B]" />
                      <span className="text-sm font-medium text-[#043570]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Call Button */}
            <button
              onClick={handleCall}
              className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-semibold hover:bg-[#1d4ed8] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
            >
              <Phone size={24} className="group-hover:rotate-12 transition-transform" />
              <span className="text-lg">Call Emergency Doctor</span>
            </button>
          </motion.div>

          {/* Local Emergency Services */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#043570] mb-1">
                  Life-Threatening Medical Emergency
                </p>
                <p className="text-sm text-[#64748B]">
                  For immediate life-threatening situations (heart attack, severe bleeding, unconsciousness), call{" "}
                  <span className="font-bold text-[#EF4444]">{currentRegion.emergency}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-3">
                <Clock size={24} className="text-[#2563EB]" />
              </div>
              <h3 className="font-semibold text-[#043570] mb-1">24/7 Available</h3>
              <p className="text-sm text-[#64748B]">
                Licensed doctors available round the clock
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="w-12 h-12 bg-[#D1FAE5] rounded-xl flex items-center justify-center mb-3">
                <Shield size={24} className="text-[#10B981]" />
              </div>
              <h3 className="font-semibold text-[#043570] mb-1">Verified Doctors</h3>
              <p className="text-sm text-[#64748B]">
                All doctors are licensed and verified medical professionals
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-xl flex items-center justify-center mb-3">
                <Globe size={24} className="text-[#EF4444]" />
              </div>
              <h3 className="font-semibold text-[#043570] mb-1">Global Coverage</h3>
              <p className="text-sm text-[#64748B]">
                Medical support available across multiple regions
              </p>
            </motion.div>
          </div>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="font-semibold text-[#043570] mb-4">When to Call</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Sudden illness or health concern that needs immediate attention
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    High fever, severe pain, or persistent symptoms
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Need urgent medical advice or prescription guidance
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Medical emergency when your regular doctor is unavailable
                  </p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="font-semibold text-[#043570] mb-4">How to Use / Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Keep your medical history and current medications ready
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Select your region and call the emergency doctor line
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Describe your symptoms clearly and in detail
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-[#64748B]">
                    Follow the doctor's advice and instructions carefully
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* For Ongoing Care Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
            className="bg-gradient-to-br from-[#f3faff] to-[#EFF6FF] rounded-2xl shadow-sm border border-[#BFDBFE] p-6 mt-4 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB] opacity-5 rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Calendar size={24} className="text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#043570] mb-2">For routine consultations:</h3>
                  <p className="text-sm text-[#64748B] mb-4">
                    Book scheduled teleconsultation appointments with specialists for non-urgent medical concerns and follow-ups
                  </p>
                  <button
                    onClick={() => router.push('/service/teleconsultation')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all shadow-sm hover:shadow-md group"
                  >
                    <span className="text-sm font-medium">Go to Teleconsultation</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
