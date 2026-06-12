import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronDown, ShoppingBag, CheckCircle, AlertCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SessionsDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SessionStat {
  id: string;
  label: string;
  count: number;
  icon: React.ReactNode;
  iconBg: string;
  isHighlight?: boolean;
  isClickable?: boolean;
}

export function SessionsDetailsModal({ isOpen, onClose }: SessionsDetailsModalProps) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>("All");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const services = [
    "All",
    "Therapy",
    "Emotional Wellbeing",
    "Coaching",
    "Meditation",
    "Nutritionist",
    "Fitness",
    "Sleep",
    "Yoga",
    "Mindfulness",
    "Stress Management",
    "Career Counseling",
  ];

  const handleStatClick = (statId: string) => {
    if (statId === "purchased" || statId === "expired") {
      // Navigate to billing orders page
      onClose();
      router.push("/billing");
    } else if (statId !== "remaining") {
      // Navigate to appointments page for done, disputed, pending
      onClose();
      router.push("/appointments");
    }
    // If statId is "remaining", do nothing (not clickable)
  };

  const sessionStats: SessionStat[] = [
    {
      id: "purchased",
      label: "Purchased",
      count: 2434,
      icon: <ShoppingBag size={18} />,
      iconBg: "bg-blue-500",
      isClickable: true,
    },
    {
      id: "done",
      label: "Done",
      count: 0,
      icon: <CheckCircle size={18} />,
      iconBg: "bg-green-500",
      isClickable: true,
    },
    {
      id: "disputed",
      label: "Disputed",
      count: 0,
      icon: <AlertCircle size={18} />,
      iconBg: "bg-red-500",
      isClickable: true,
    },
    {
      id: "pending",
      label: "Pending",
      count: 0,
      icon: <Clock size={18} />,
      iconBg: "bg-yellow-500",
      isClickable: true,
    },
    {
      id: "expired",
      label: "Expired",
      count: 1985,
      icon: <XCircle size={18} />,
      iconBg: "bg-gray-500",
      isClickable: true,
    },
    {
      id: "remaining",
      label: "Remaining",
      count: 449,
      icon: <RefreshCw size={18} />,
      iconBg: "bg-[#00c0ff]",
      isHighlight: true,
      isClickable: false,
    },
  ];

  if (!isOpen) return null;

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] text-[#64748B] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h2 className="text-lg font-semibold text-[#020817]">
                    Sessions Details
                  </h2>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-sm text-[#64748B] font-medium hover:text-[#020817] transition-colors"
                    onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  >
                    {selectedService}
                    <ChevronDown size={16} className={`transition-transform ${showServiceDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showServiceDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowServiceDropdown(false)}
                      />
                      <div className="absolute right-0 top-8 bg-white border border-[#E2E8F0] rounded-xl shadow-lg z-20 min-w-[180px] py-2 max-h-[300px] overflow-y-auto">
                        {services.map((service) => (
                          <button
                            key={service}
                            className={`block w-full px-4 py-2.5 text-sm text-left transition-colors ${
                              selectedService === service
                                ? "bg-[#f3faff] text-[#043570] font-medium"
                                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#020817]"
                            }`}
                            onClick={() => {
                              setSelectedService(service);
                              setShowServiceDropdown(false);
                            }}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Session Stats List */}
              <div className="px-6 py-4 space-y-2">
                {sessionStats.map((stat) => {
                  const Element = stat.isClickable ? "button" : "div";
                  
                  return (
                    <Element
                      key={stat.id}
                      className={`
                        w-full flex items-center justify-between p-4 rounded-xl transition-all
                        ${
                          stat.isHighlight
                            ? "bg-[#00c0ff] text-white"
                            : stat.isClickable
                            ? "bg-white hover:bg-[#F8FAFC] text-[#020817] cursor-pointer"
                            : "bg-white text-[#020817]"
                        }
                      `}
                      onClick={stat.isClickable ? () => handleStatClick(stat.id) : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            stat.isHighlight ? "bg-white/20" : stat.iconBg
                          }`}
                        >
                          <div className={stat.isHighlight ? "text-white" : "text-white"}>
                            {stat.icon}
                          </div>
                        </div>
                        <span
                          className={`font-medium ${
                            stat.isHighlight ? "text-white" : "text-[#020817]"
                          }`}
                        >
                          {stat.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            stat.isHighlight ? "text-white" : "text-[#043570]"
                          }`}
                        >
                          {stat.isHighlight ? "" : "(-)"} {stat.count}
                        </span>
                        {stat.isClickable && (
                          <ChevronRight
                            size={18}
                            className={stat.isHighlight ? "text-white" : "text-[#94A3B8]"}
                          />
                        )}
                      </div>
                    </Element>
                  );
                })}
              </div>

              {/* Buy More Sessions Button */}
              <div className="px-6 pb-6">
                <button
                  className="w-full py-4 bg-[#043570] text-white font-semibold rounded-xl hover:bg-[#032a59] transition-colors"
                  onClick={() => router.push("/buy-sessions")}
                >
                  Buy More Sessions
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
