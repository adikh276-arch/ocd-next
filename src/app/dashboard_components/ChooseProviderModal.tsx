import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Settings } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  title: string;
  image: string;
  nextAvailable: string;
}

interface ChooseProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvider: (provider: Provider) => void;
}

const providers: Provider[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Care Counselor",
    image: "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMHRoZXJhcGlzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nextAvailable: "Today at 2:00 PM",
  },
  {
    id: "2",
    name: "Dr. Michael Brown",
    title: "Therapist",
    image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyOTU2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nextAvailable: "Tomorrow at 10:00 AM",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhc2lhbiUyMGZlbWFsZSUyMHRoZXJhcGlzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nextAvailable: "in 3 days",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzQxMDU4Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    nextAvailable: "Tomorrow at 3:00 PM",
  },
  {
    id: "5",
    name: "Dr. Aisha Patel",
    title: "Mental Health Specialist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NDEwNTgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    nextAvailable: "Today at 5:30 PM",
  },
  {
    id: "6",
    name: "Dr. Robert Taylor",
    title: "Counseling Psychologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzQxMDU4Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    nextAvailable: "in 2 days",
  },
];

export function ChooseProviderModal({
  isOpen,
  onClose,
  onSelectProvider,
}: ChooseProviderModalProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedProviderId) {
      const provider = providers.find((p) => p.id === selectedProviderId);
      if (provider) {
        onSelectProvider(provider);
      }
    }
  };

  const handleClose = () => {
    onClose();
    // Reset selection after closing
    setTimeout(() => {
      setSelectedProviderId(null);
    }, 300);
  };

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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-lg font-semibold text-[#020817]">
                        Choose Expert
                      </h2>
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] transition-colors flex-shrink-0 sm:hidden"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      Here's a list of psychologists ranked based on your preferences. You may use our auto matching (recommended) or manually send invites.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] transition-colors flex-shrink-0"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Provider List */}
              <div className="px-6 py-4 space-y-1">
                {providers.map((provider) => {
                  const isSelected = selectedProviderId === provider.id;

                  return (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedProviderId(provider.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left
                        ${
                          isSelected
                            ? "border-2 border-[#00c0ff] bg-[#f3faff]"
                            : "border-2 border-transparent hover:bg-[#F8FAFC]"
                        }
                      `}
                    >
                      {/* Provider Image with online indicator */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-white" />
                      </div>

                      {/* Provider Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="font-semibold text-[#020817] text-[15px]">
                            {provider.name}
                          </span>
                          <span className="text-[13px] text-[#94A3B8]">
                            ({provider.title})
                          </span>
                        </div>
                        <p className="text-[13px] text-[#94A3B8] mt-0.5">
                          Next available {provider.nextAvailable}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] px-6 py-4">
                <button
                  onClick={handleContinue}
                  disabled={!selectedProviderId}
                  className={`
                    w-full py-3.5 rounded-xl font-semibold transition-all
                    ${
                      selectedProviderId
                        ? "bg-[#00c0ff] text-white hover:bg-[#00a8e0]"
                        : "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                    }
                  `}
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
