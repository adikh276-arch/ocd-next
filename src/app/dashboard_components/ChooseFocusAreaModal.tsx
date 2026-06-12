import { motion, AnimatePresence } from "framer-motion";
import { X, Frown, AlertCircle, Briefcase, TrendingUp, Brain, Activity, BackpackIcon as BackPain, User, HeartPulse, Dumbbell } from "lucide-react";
import { useState } from "react";

interface ChooseFocusAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFocus: string[];
  onToggleFocus: (area: string) => void;
  availableFocusAreas?: string[];
}

const DEFAULT_ICON_MAP: Record<string, React.ElementType> = {
  Depression: Frown,
  Anxiety: AlertCircle,
  Stress: Brain,
  Anger: HeartPulse,
  Burnout: Activity,
  Leadership: User,
  "Work Performance": TrendingUp,
  Career: Briefcase,
  OCD: Brain,
  Diabetes: Activity,
  "Back Pain": BackPain,
  "Neck Pain": BackPain,
  "Elbow Pain": BackPain,
  Fitness: Dumbbell,
  Relationship: HeartPulse,
  Postpartum: HeartPulse,
  Workplace: Briefcase,
  Sleep: Activity,
  Grief: Frown,
  PTSD: AlertCircle,
  Sexuality: HeartPulse,
  "Eating Disorder": Activity,
  Adolescent: User,
  Parenting: User,
  Acceptance: HeartPulse,
  Executive: Briefcase,
  Wellness: Activity,
  Finance: TrendingUp,
  Performance: TrendingUp,
  Mindset: Brain,
  Spiritual: Activity,
  Transform: Activity,
  "场": Activity,
  Communicate: TrendingUp,
  Organization: Briefcase,
  Creativity: Brain,
  Confidence: User,
  Employee: User,
  Corporate: Briefcase,
  "Pre-diabetes": Activity,
  "Type 1": Activity,
  "Type 2": Activity,
  Hypertension: HeartPulse,
  Music: Activity,
};

export function ChooseFocusAreaModal({
  isOpen,
  onClose,
  selectedFocus,
  onToggleFocus,
  availableFocusAreas,
}: ChooseFocusAreaModalProps) {
  const focusAreas = availableFocusAreas || [
    "Depression", "Anxiety", "Stress", "Anger", "Burnout", "Leadership", 
    "Work Performance", "Career", "OCD", "Diabetes", "Back Pain", 
    "Neck Pain", "Elbow Pain", "Fitness"
  ];

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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-[#0F172A]">
                  Choose Focus Area
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
                  {focusAreas.map((area) => {
                    const Icon = DEFAULT_ICON_MAP[area] || Brain;
                    const isSelected = selectedFocus.includes(area);
                    return (
                      <button
                        key={area}
                        onClick={() => onToggleFocus(area)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          isSelected
                            ? "bg-[#2563EB] text-white shadow-md"
                            : "bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={isSelected ? "text-white" : "text-[#64748B]"}
                        />
                        <span className="text-sm font-medium">{area}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-2.5 text-sm font-medium text-white bg-[#2563EB] rounded-xl hover:bg-[#1E40AF] transition-all"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
