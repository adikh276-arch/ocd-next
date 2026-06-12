import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Heart, Dumbbell, Activity, Users, Stethoscope, Apple, Droplet, Wind, Moon, Pill, Gauge, LayoutGrid } from "lucide-react";

interface ServicesFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string | null;
  onSelectService: (service: string) => void;
}

const SERVICES_LIST = [
  { name: "All Services", icon: LayoutGrid },
  { name: "Emotional Wellbeing", icon: Heart },
  { name: "Yoga", icon: Activity },
  { name: "Fitness", icon: Dumbbell },
  { name: "Coaching", icon: Users },
  { name: "Meditation", icon: Wind },
  { name: "Care Team", icon: Stethoscope },
  { name: "Nutrition", icon: Apple },
  { name: "Diabetes Care", icon: Droplet },
  { name: "Hypertension", icon: Gauge },
  { name: "Sleep", icon: Moon },
  { name: "Physiotherapy", icon: Activity },
];

export function ServicesFilterModal({
  isOpen,
  onClose,
  selectedService,
  onSelectService,
}: ServicesFilterModalProps) {
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
                  Filter by Services
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES_LIST.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.name;
                    return (
                      <button
                        key={service.name}
                        onClick={() => onSelectService(service.name)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? "bg-[#043570] text-white shadow-md"
                            : "bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={isSelected ? "text-white" : "text-[#00c0ff]"}
                        />
                        <span className="text-xs font-medium">{service.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => onSelectService("")}
                  disabled={!selectedService}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-[#64748B] border border-slate-200 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#043570] rounded-xl hover:bg-[#032852] transition-all"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
