import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Video, MessageSquare, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { AddInsuranceModal } from "./AddInsuranceModal";

type TherapyType = "individual" | "couple";
type SessionMode = "live" | "chat";
type Duration = "trial" | "1month" | "3months" | "6months";

export function TherapyPlansPage() {
  const router = useRouter();
  const [therapyType, setTherapyType] = useState<TherapyType>("individual");
  const [sessionMode, setSessionMode] = useState<SessionMode>("live");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("1month");
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  const features = [
    "Private therapist",
    "1 Video/phone Session of 60 minutes",
    "Unlimited app access with Meditation, Yoga & Self-care tools",
  ];

  const handleProceedToPay = () => {
    router.push("/checkout");
  };

  const handlePayViaInsurance = () => {
    setShowInsuranceModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="max-w-[1000px] mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push("/plans")}
              className="flex items-center gap-2 text-[#043570] hover:text-[#00c0ff] transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Plans</span>
            </button>
            <h1 className="text-3xl font-bold text-[#043570] text-center">
              Choose the plan that works best for you
            </h1>
          </div>

          {/* Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-lg p-8 max-w-[600px] mx-auto"
          >
            {/* Therapy Type Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setTherapyType("individual")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  therapyType === "individual"
                    ? "text-[#00c0ff] border-b-4 border-[#00c0ff]"
                    : "text-slate-500 hover:text-[#043570]"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setTherapyType("couple")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  therapyType === "couple"
                    ? "text-[#00c0ff] border-b-4 border-[#00c0ff]"
                    : "text-slate-500 hover:text-[#043570]"
                }`}
              >
                Couple
              </button>
            </div>

            {/* Session Mode Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setSessionMode("live")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  sessionMode === "live"
                    ? "bg-gradient-to-r from-[#00c0ff] to-[#043570] text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Live
              </button>
              <button
                onClick={() => setSessionMode("chat")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  sessionMode === "chat"
                    ? "bg-gradient-to-r from-[#00c0ff] to-[#043570] text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Chat
              </button>
            </div>

            {/* Plan Details */}
            <div className="mb-6">
              <div className="flex items-start gap-4 mb-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-2xl flex items-center justify-center flex-shrink-0">
                  {sessionMode === "live" ? (
                    <Video size={28} className="text-white" />
                  ) : (
                    <MessageSquare size={28} className="text-white" />
                  )}
                </div>

                {/* Title & Price */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#043570] mb-1">
                    Therapy
                  </h2>
                  <p className="text-sm text-slate-600">1 Video session</p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">$70</div>
                  <div className="text-sm text-slate-400 line-through">
                    $140 /session
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Weekly
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 bg-[#f3faff] rounded-xl p-5 border border-[#00c0ff]/20">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <p className="text-sm text-[#043570] font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Options */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedDuration("trial")}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    selectedDuration === "trial"
                      ? "bg-gradient-to-r from-[#00c0ff] to-[#043570] text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Trial offer
                </button>
                <button
                  onClick={() => setSelectedDuration("1month")}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    selectedDuration === "1month"
                      ? "bg-slate-200 text-[#043570] shadow-md border-2 border-[#00c0ff]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  1 Month
                </button>
                <button
                  onClick={() => setSelectedDuration("3months")}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    selectedDuration === "3months"
                      ? "bg-slate-200 text-[#043570] shadow-md border-2 border-[#00c0ff]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  3 Months
                </button>
                <button
                  onClick={() => setSelectedDuration("6months")}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    selectedDuration === "6months"
                      ? "bg-slate-200 text-[#043570] shadow-md border-2 border-[#00c0ff]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  6 Months
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleProceedToPay}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-[#043570] to-[#2563EB] hover:from-[#032a56] hover:to-[#1d4ed8] text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Proceed to Pay
              </button>
              <button
                onClick={handlePayViaInsurance}
                className="flex-1 py-4 px-6 bg-white border-2 border-[#00c0ff] text-[#00c0ff] hover:bg-[#f3faff] rounded-xl font-semibold transition-all"
              >
                Pay via Insurance
              </button>
            </div>

            {/* Help Link */}
            <div className="text-center">
              <a
                href="#"
                className="text-sm text-[#00c0ff] hover:text-[#043570] font-medium transition-colors"
              >
                Can't afford? Try Therapy Interns or Request Financial Aid
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Insurance Modal */}
      <AddInsuranceModal
        isOpen={showInsuranceModal}
        onClose={() => setShowInsuranceModal(false)}
      />
    </div>
  );
}
