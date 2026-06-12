import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface SobrietyTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SobrietyFormData) => void;
  initialData?: {
    soberStartDate?: string;
    userName?: string;
  };
}

export interface SobrietyFormData {
  addictions: string[];
  goals: string[];
  emotions: string[];
  feelings: string[];
  soberStartDate: string;
  resetToNow: boolean;
  moneyPerDay: number;
  moneyCurrency: string;
  moneyDoesNotApply: boolean;
  timePerDay: number;
  timeDoesNotApply: boolean;
}

const ADDICTIONS = [
  "Porn", "Smoking", "Masturbation", "Drinking", "Drugs", "Overeating",
  "Gambling", "Pills", "Television", "Coffee", "Cocaine", "Energy Drinks",
  "Meth", "Marijuana", "Junk food", "Tobacco", "Video games", "Social media",
  "Shopping", "Impulsive sex", "Gossip", "Sugar", "Vaping", "Xanax",
  "Meat", "Soda", "Cursing", "Quarrel", "Lie"
];

const GOALS = [
  "I want to save more money and spend it on important things",
  "I want to rebuild my reputation and become more likeable",
  "I want to focus on my goals in life and improve myself",
  "I want to live a free and healthier life",
  "I want to find purpose and meaning in life",
  "I want to overcome trauma",
  "I want to reduce a risk of death and have a better chance at a long life.",
  "I want to save my job/ career and become more productive.",
  "I want to regain the ability to feel real, authentic emotions again.",
  "I want to improve my relationships with family and friends",
  "I want to overcome depression and become more happier",
  "I want to have a better mental health",
  "I want to build self-confidence",
  "I want to build good habits that create a better future",
  "I want to free up and save time"
];

const EMOTIONS = [
  "Anxiety",
  "I feel scared",
  "Shame",
  "I feel angry",
  "Lack of sleep",
  "I regret that I can't stop",
  "Physically ill",
  "Spiritual bankruptcy",
  "Self-hatred",
  "Despair and Helplessness",
  "I feel like a looser",
  "Reduced desire to socialize",
  "I feel afraid for my well-being",
  "I feel like a fool"
];

const FEELINGS = [
  "I feel tired",
  "I feel unhappy",
  "Self-destructive or suicidal",
  "I feel depressed",
  "Low self-confidence",
  "Unattractive and unworthy of love",
  "Unmotivated and lack of ambition to pursue goals",
  "Difficulty concentrating",
  "I feel scared",
  "Shame",
  "I feel angry",
  "Lack of sleep",
  "I regret that I can't stop",
  "Physically ill",
  "Spiritual bankruptcy",
  "Self-hatred",
  "Despair and Helplessness",
  "I feel like a looser",
  "Reduced desire to socialize",
  "I feel afraid for my well-being",
  "I feel like a fool"
];

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

export function SobrietyTrackerModal({ isOpen, onClose, onSave, initialData }: SobrietyTrackerModalProps) {
  const [step, setStep] = useState(1);
  const [showAddAddictionModal, setShowAddAddictionModal] = useState(false);
  const [newAddiction, setNewAddiction] = useState("");
  
  const displayUserName = initialData?.userName || "there";
  
  const [formData, setFormData] = useState<SobrietyFormData>({
    addictions: [],
    goals: [],
    emotions: [],
    feelings: [],
    soberStartDate: initialData?.soberStartDate || new Date().toISOString().slice(0, 16),
    resetToNow: false,
    moneyPerDay: 0,
    moneyCurrency: "INR",
    moneyDoesNotApply: false,
    timePerDay: 0,
    timeDoesNotApply: false
  });

  const [customAddictions, setCustomAddictions] = useState<string[]>([]);

  const allAddictions = [...ADDICTIONS, ...customAddictions];

  const totalSteps = 6;

  useEffect(() => {
    if (formData.resetToNow) {
      setFormData(prev => ({
        ...prev,
        soberStartDate: new Date().toISOString().slice(0, 16)
      }));
    }
  }, [formData.resetToNow]);

  const toggleSelection = (field: keyof SobrietyFormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      
      // Special handling for addictions - single select only
      if (field === "addictions") {
        const newArray = currentArray.includes(value)
          ? [] // Deselect if already selected
          : [value]; // Replace with new selection
        return { ...prev, [field]: newArray };
      }
      
      // Multi-select for other fields
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddCustomAddiction = () => {
    if (newAddiction.trim()) {
      setCustomAddictions(prev => [...prev, newAddiction.trim()]);
      setFormData(prev => ({
        ...prev,
        addictions: [newAddiction.trim()] // Replace with new custom addiction (single select)
      }));
      setNewAddiction("");
      setShowAddAddictionModal(false);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              What addiction or bad habit do you want to quit?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Choose or add one of the addictions. You can add more later.
            </p>
            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {allAddictions.map((addiction) => (
                <button
                  key={addiction}
                  onClick={() => toggleSelection("addictions", addiction)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    formData.addictions.includes(addiction)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formData.addictions.includes(addiction) && (
                    <Check className="inline mr-1" size={14} />
                  )}
                  {addiction}
                </button>
              ))}
              <button
                onClick={() => setShowAddAddictionModal(true)}
                className="px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Addiction
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              What are your goals?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              In our experience, we observe people quit addiction for a variety of reasons:
            </p>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {GOALS.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleSelection("goals", goal)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                    formData.goals.includes(goal)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formData.goals.includes(goal) && (
                    <Check className="inline mr-2" size={16} />
                  )}
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              What are some of the emotions you think underlie your addiction?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              An addiction is something that provides an escape, takes you out of yourself, and allows you to get further away from the painful feelings and emotions you would prefer to avoid.
            </p>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {EMOTIONS.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => toggleSelection("emotions", emotion)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                    formData.emotions.includes(emotion)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formData.emotions.includes(emotion) && (
                    <Check className="inline mr-2" size={16} />
                  )}
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              How do you feel after engaging with the behavior or addiction?
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto mt-6">
              {FEELINGS.map((feeling) => (
                <button
                  key={feeling}
                  onClick={() => toggleSelection("feelings", feeling)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                    formData.feelings.includes(feeling)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formData.feelings.includes(feeling) && (
                    <Check className="inline mr-2" size={16} />
                  )}
                  {feeling}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              When was your sober start day?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              When was the last time or when do you want to start the journey to an addiction free life?
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="datetime-local"
                  value={formData.soberStartDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, soberStartDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-900"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.resetToNow}
                  onChange={(e) => setFormData(prev => ({ ...prev, resetToNow: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Reset to current date & time</span>
              </label>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              How much time and money do you spend on average per day?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Addictions are a waste of precious time and they cost you money.
            </p>
            <div className="space-y-6">
              {/* Money Section */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Money</h4>
                {!formData.moneyDoesNotApply && (
                  <div className="flex gap-3 mb-4">
                    <input
                      type="number"
                      value={formData.moneyPerDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, moneyPerDay: parseFloat(e.target.value) || 0 }))}
                      placeholder="Enter Amount"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                    <select
                      value={formData.moneyCurrency}
                      onChange={(e) => setFormData(prev => ({ ...prev, moneyCurrency: e.target.value }))}
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    >
                      {CURRENCIES.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                )}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.moneyDoesNotApply}
                    onChange={(e) => setFormData(prev => ({ ...prev, moneyDoesNotApply: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Does not apply. This habit does not cost money</span>
                </label>
              </div>

              {/* Time Section */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Time (Hours)</h4>
                {!formData.timeDoesNotApply && (
                  <input
                    type="number"
                    value={formData.timePerDay}
                    onChange={(e) => setFormData(prev => ({ ...prev, timePerDay: parseFloat(e.target.value) || 0 }))}
                    placeholder="Hours per day"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-4"
                  />
                )}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.timeDoesNotApply}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeDoesNotApply: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Does not apply. This habit does not cost time</span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Sobriety Setup</h2>
                  <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-8 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-240px)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-8 py-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                {step < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  >
                    Save & Complete
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Custom Addiction Modal */}
      <AnimatePresence>
        {showAddAddictionModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddAddictionModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Custom Addiction</h3>
              <p className="text-sm text-gray-600 mb-4">Enter the name for the new addiction.</p>
              <input
                type="text"
                value={newAddiction}
                onChange={(e) => setNewAddiction(e.target.value)}
                placeholder="e.g., Late night snacking"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-6"
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomAddiction()}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddAddictionModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomAddiction}
                  className="flex-1 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Add Addiction
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
