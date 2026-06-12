import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Info } from "lucide-react";

interface InsuranceNotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditInfo: () => void;
  insuranceData: {
    carrier: string;
    name: string;
    dateOfBirth: string;
    location: string;
    memberId: string;
  };
}

export function InsuranceNotFoundModal({
  isOpen,
  onClose,
  onEditInfo,
  insuranceData,
}: InsuranceNotFoundModalProps) {
  const handleEditInfo = () => {
    onClose();
    onEditInfo();
  };

  const handleContinue = () => {
    // Continue with the information anyway
    console.log("Continuing with information:", insuranceData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f3faff] flex items-center justify-center">
                <AlertCircle size={22} className="text-[#043570]" />
              </div>
              <h2 className="text-lg font-semibold text-[#043570]">
                Insurance Verification Issue
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-5">
            {/* Main Message */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#043570] mb-2">
                We're having trouble finding your insurance
              </h3>
              <p className="text-sm text-slate-600">
                Please double-check that the information matches what's listed on
                your insurance card
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900 mb-1">
                    Name, date of birth, or member/subscriber ID is invalid
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-slate-600 min-w-[80px]">Insurance</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#043570]">
                          {insuranceData.carrier}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-green-700 font-medium">In network</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Review */}
            <div className="space-y-3 bg-[#f3faff]/50 rounded-xl p-4 border border-[#043570]/10">
              <p className="text-xs font-medium text-[#043570] uppercase tracking-wide mb-3">
                Information Provided
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Name</p>
                  <p className="text-sm font-medium text-[#043570]">
                    {insuranceData.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Date of birth</p>
                  <p className="text-sm font-medium text-[#043570]">
                    {insuranceData.dateOfBirth}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Location</p>
                  <p className="text-sm font-medium text-[#043570]">
                    {insuranceData.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    Member/Subscriber ID
                    <Info size={12} className="text-slate-400" />
                  </p>
                  <p className="text-sm font-medium text-[#043570]">
                    {insuranceData.memberId}
                  </p>
                </div>
              </div>
            </div>

            {/* Help Note */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-700 text-center leading-relaxed">
                If you're in a life-threatening situation,{" "}
                <span className="font-medium text-[#043570]">don't use this app</span> — call{" "}
                <a href="tel:988" className="text-[#2563EB] font-medium hover:underline">
                  988
                </a>{" "}
                or use{" "}
                <a href="#" className="text-[#2563EB] font-medium hover:underline">
                  these resources
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleEditInfo}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#043570] to-[#00c0ff] hover:from-[#032a56] hover:to-[#00a8e0] text-white rounded-xl transition-all font-medium shadow-md hover:shadow-lg"
              >
                Edit Info
              </button>
              <button
                onClick={handleContinue}
                className="w-full py-3 px-4 text-[#2563EB] hover:text-[#043570] font-medium transition-colors"
              >
                Continue with this information
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
