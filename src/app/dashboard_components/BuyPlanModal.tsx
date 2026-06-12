import { X, Gift, Users, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BuyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "corporate" | "normal" | "noPlan" | "providerPlan" | "providerActive" | "externalProvider" | "switchToMantra";
  userName?: string;
  serviceName?: string; // e.g., "Therapy", "Yoga", etc.
  providerName?: string; // e.g., "Julie"
  monthlyRemaining?: number;
  monthlyTotal?: number;
  totalRemaining?: number;
  totalSessions?: number;
  onTypeChange?: (type: "corporate" | "normal" | "noPlan" | "providerPlan" | "providerActive" | "externalProvider" | "switchToMantra") => void;
  showDevToolbar?: boolean;
  onShowSessionDetails?: () => void;
}

export function BuyPlanModal({
  isOpen,
  onClose,
  userType,
  userName = "Rachit",
  serviceName = "Therapy",
  providerName = "Julie",
  monthlyRemaining = 0,
  monthlyTotal = 4,
  totalRemaining = 4,
  totalSessions = 48,
  onTypeChange,
  showDevToolbar = false,
  onShowSessionDetails
}: BuyPlanModalProps) {
  
  const renderContent = () => {
    switch (userType) {
      case "corporate":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}, You have <span className="font-semibold text-[#020817]">0</span> {serviceName} session remaining.{" "}
              <button
                onClick={() => {
                  if (onShowSessionDetails) {
                    onClose();
                    onShowSessionDetails();
                  }
                }}
                className="text-[#00c0ff] hover:text-[#043570] font-medium inline-flex items-center gap-0.5 transition-colors"
              >
                Details
                <ChevronRight size={16} className="mt-0.5" />
              </button>
            </p>
            <p className="text-[#64748B] mb-4">Want extra sessions? Explore:</p>
            
            {/* Buttons side by side with "or" in between */}
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-[#00c0ff]">
                <Gift size={18} />
                {serviceName} Plans
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="flex-1 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                All Plans
              </button>
            </div>
          </>
        );
      
      case "normal":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}, You have <span className="font-semibold text-[#020817]">0</span> {serviceName} session remaining.{" "}
              <button
                onClick={() => {
                  if (onShowSessionDetails) {
                    onClose();
                    onShowSessionDetails();
                  }
                }}
                className="text-[#00c0ff] hover:text-[#043570] font-medium inline-flex items-center gap-0.5 transition-colors"
              >
                Details
                <ChevronRight size={16} className="mt-0.5" />
              </button>
            </p>
            <p className="text-[#64748B] mb-4">Want extra sessions? Explore:</p>
            
            {/* Buttons side by side with "or" in between */}
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-[#00c0ff]">
                <Gift size={18} />
                {serviceName} Plans
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="flex-1 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                All Plans
              </button>
            </div>
          </>
        );
      
      case "noPlan":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}, you don't have a plan for {serviceName}.
            </p>
            
            {/* Buttons side by side with "or" in between */}
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-[#00c0ff]">
                <Gift size={18} />
                {serviceName} Plans
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="flex-1 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                All Plans
              </button>
            </div>
          </>
        );
      
      case "providerPlan":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}! You have an active Mantra in-house therapy plan.
            </p>
            <p className="text-[#64748B] mb-4">
              Choosing <span className="font-semibold text-[#020817]">{providerName} (external provider)</span> will:
            </p>
            <ul className="text-[#64748B] mb-4 space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Replace <span className="font-semibold text-[#020817]">Aheesha</span>, your current therapist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Reset your 5 therapy sessions to 0</span>
              </li>
            </ul>
            <p className="text-[#64748B] mb-4">
              Do you want to continue?
            </p>
            
            {/* Buttons stacked with "or" in between */}
            <div className="flex flex-col items-center gap-2">
              <button className="w-full bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors border border-[#00c0ff]">
                No, I will consume Mantra sessions first (recommended)
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                Yes, I want to proceed with the new provider
              </button>
            </div>
          </>
        );
      
      case "providerActive":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}! You have an active plan with <span className="font-semibold text-[#020817]">{providerName} (external provider)</span>.
            </p>
            <p className="text-[#64748B] mb-4">
              Choosing <span className="font-semibold text-[#020817]">Aheesha (Mantra In-house provider)</span> will:
            </p>
            <ul className="text-[#64748B] mb-4 space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Replace <span className="font-semibold text-[#020817]">{providerName}</span>, your current therapist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Reset your 5 therapy sessions to 0</span>
              </li>
            </ul>
            <p className="text-[#64748B] mb-4">
              Do you want to continue?
            </p>
            
            {/* Buttons stacked with "or" in between */}
            <div className="flex flex-col items-center gap-2">
              <button className="w-full bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors border border-[#00c0ff]">
                Use {providerName}'s sessions first (recommended)
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                Proceed with Aheesha
              </button>
            </div>
          </>
        );
      
      case "externalProvider":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}! You have an active Mantra in-house therapy plan.
            </p>
            <p className="text-[#64748B] mb-4">
              Choosing <span className="font-semibold text-[#020817]">{providerName} (external provider)</span> will:
            </p>
            <ul className="text-[#64748B] mb-4 space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Replace <span className="font-semibold text-[#020817]">Aheesha</span>, your current therapist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Reset your 5 therapy sessions to 0</span>
              </li>
            </ul>
            <p className="text-[#64748B] mb-4">
              Do you want to continue?
            </p>
            
            {/* Buttons stacked with "or" in between */}
            <div className="flex flex-col items-center gap-2">
              <button className="w-full bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors border border-[#00c0ff]">
                No, I will consume Mantra sessions first (recommended)
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                Yes, I want to proceed with the new provider
              </button>
            </div>
          </>
        );
      
      case "switchToMantra":
        return (
          <>
            <p className="text-[#64748B] mb-4">
              Hi {userName}! You have an active plan with <span className="font-semibold text-[#020817]">{providerName} (external provider)</span>.
            </p>
            <p className="text-[#64748B] mb-4">
              Choosing <span className="font-semibold text-[#020817]">Aheesha (Mantra In-house provider)</span> will:
            </p>
            <ul className="text-[#64748B] mb-4 space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Replace <span className="font-semibold text-[#020817]">{providerName}</span>, your current therapist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Reset your 5 therapy sessions to 0</span>
              </li>
            </ul>
            <p className="text-[#64748B] mb-4">
              Do you want to continue?
            </p>
            
            {/* Buttons stacked with "or" in between */}
            <div className="flex flex-col items-center gap-2">
              <button className="w-full bg-[#00c0ff] hover:bg-[#00a8e0] text-white py-2 rounded-xl font-medium transition-colors border border-[#00c0ff]">
                Use {providerName}'s sessions first (recommended)
              </button>
              
              <span className="text-sm text-[#64748B] font-medium">or</span>
              
              <button className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] py-2 rounded-xl font-medium border border-[#E2E8F0] transition-colors">
                Proceed with Aheesha
              </button>
            </div>
          </>
        );
      
      default:
        return null;
    }
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
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with blue gradient */}
              <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#0369A1] to-[#0EA5E9]">
                <h2 className="text-xl font-semibold text-white">Buy Plan</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-6">
                {renderContent()}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
