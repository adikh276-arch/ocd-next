import { X, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareLeadModal({ isOpen, onClose }: ShareLeadModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      message: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl"
      >
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Share a Lead</h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X size={18} className="text-slate-600" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 focus:border-[#007BFF] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 focus:border-[#007BFF] transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 focus:border-[#007BFF] transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Enter company name"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 focus:border-[#007BFF] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the lead..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 focus:border-[#007BFF] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#007BFF] hover:bg-[#0056D2] text-white font-semibold transition-colors"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center"
            >
              {/* Success Icon */}
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>

              {/* Success Message */}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Thank you!</h3>
              <p className="text-slate-600 text-sm mb-6">
                Our team will get in touch with you shortly.
              </p>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#007BFF] hover:bg-[#0056D2] text-white font-semibold transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
