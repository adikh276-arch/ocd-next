import React from "react";
import { X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock size={40} className="text-blue-600" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#043570] mb-3">
                  Coming Soon
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  This service is currently under development and will be available soon. Stay tuned for updates!
                </p>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
