import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Star, Send, CheckCircle2, MessageSquare,
  ChevronDown, Paperclip,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

type Category = { id: string; label: string };
type RatingLabel = { icon: React.ElementType; label: string; color: string; bg: string };

const CATEGORIES: Category[] = [
  { id: "overall",      label: "Overall Experience"   },
  { id: "appointments", label: "Appointments"         },
  { id: "therapy",      label: "Therapy Sessions"     },
  { id: "billing",      label: "Billing & Payments"   },
  { id: "app",          label: "App / Website"        },
  { id: "support",      label: "Customer Support"     },
  { id: "other",        label: "Other"                },
];

const RATINGS: RatingLabel[] = [
  { icon: Star, label: "Poor",      color: "text-[#64748B]",  bg: "bg-[#F8FAFC] border-[#E2E8F0]"  },
  { icon: Star, label: "Fair",      color: "text-[#64748B]",  bg: "bg-[#F8FAFC] border-[#E2E8F0]"  },
  { icon: Star, label: "Good",      color: "text-[#0D9488]",  bg: "bg-[#F1F5F9] border-[#E2E8F0]"  },
  { icon: Star, label: "Very Good", color: "text-[#0D9488]",  bg: "bg-[#F1F5F9] border-[#E2E8F0]"  },
  { icon: Star, label: "Excellent", color: "text-[#1E293B]",  bg: "bg-[#F1F5F9] border-[#E2E8F0]"  },
];

function StarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(n => (
        <motion.button
          key={n}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="focus:outline-none"
        >
          <Star
            size={28}
            className={`transition-colors ${
              n <= (hovered || value)
                ? "fill-[#0D9488] text-[#0D9488]"
                : "text-[#E2E8F0] fill-[#F8FAFC]"
            }`}
          />
        </motion.button>
      ))}
      {value > 0 && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className={`ml-2 text-sm font-medium ${RATINGS[value - 1].color}`}
        >
          {RATINGS[value - 1].label}
        </motion.span>
      )}
    </div>
  );
}

export function FeedbackPage() {
  const [category, setCategory]       = useState("overall");
  const [catOpen, setCatOpen]         = useState(false);
  const [starRating, setStarRating]   = useState(0);
  const [message, setMessage]         = useState("");
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);

  const canSubmit = starRating > 0 && message.trim().length > 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  const handleReset = () => {
    setCategory("overall"); setStarRating(0);
    setMessage(""); setSubmitted(false);
  };

  const selectedCategory = CATEGORIES.find(c => c.id === category)!;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
              <Lightbulb size={20} className="text-[#1E293B]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-slate-900">Share Feedback</h1>
              <p className="text-slate-500 text-sm mt-0.5">Help us improve MantraCare with your honest thoughts</p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-5"
                >
                  <CheckCircle2 size={40} className="text-[#0D9488]" />
                </motion.div>
                <h2 className="text-slate-900 text-xl mb-2">Thank you for your feedback!</h2>
                <p className="text-slate-500 text-sm max-w-[380px] leading-relaxed">
                  Your response has been recorded. We review every piece of feedback and use it to make MantraCare better for everyone.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReset}
                  className="mt-7 px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm hover:bg-slate-700 transition-colors"
                >
                  Submit Another Response
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Category */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >
                      <label className="block text-sm text-slate-700 mb-2.5">Feedback Category</label>
                      <div className="relative">
                        <button type="button" onClick={() => setCatOpen(o => !o)}
                          className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                        >
                          <span className="text-slate-800 text-sm">{selectedCategory.label}</span>
                          <ChevronDown size={15} className={`text-slate-400 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {catOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden"
                            >
                              {CATEGORIES.map(cat => (
                                <button key={cat.id} type="button"
                                  onClick={() => { setCategory(cat.id); setCatOpen(false); }}
                                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                                    category === cat.id ? "bg-[#F1F5F9] text-[#1E293B] font-medium" : "text-[#64748B] hover:bg-[#F8FAFC]"
                                  }`}
                                >
                                  {cat.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Star rating */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >
                      <p className="text-sm text-slate-700 mb-3">How would you rate '{selectedCategory.label}'?</p>
                      <StarRow value={starRating} onChange={setStarRating} />
                    </motion.div>

                    {/* Message */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08 }}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare size={15} className="text-slate-400" />
                        <p className="text-sm text-slate-700">Tell us more <span className="text-red-400">*</span></p>
                      </div>
                      <textarea
                        value={message} onChange={e => setMessage(e.target.value)} rows={5}
                        placeholder="Share your experience, suggestions, or anything you'd like us to know..."
                        className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#020817] placeholder-[#E2E8F0] resize-none focus:outline-none focus:ring-2 focus:ring-[#F1F5F9] focus:border-[#0D9488] transition-all bg-[#F8FAFC]"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <button type="button" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                          <Paperclip size={13} /> Attach screenshot
                        </button>
                        <span className={`text-xs ${message.length > 500 ? "text-red-400" : "text-slate-400"}`}>{message.length}/500</span>
                      </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.11 }}
                      className="rounded-2xl p-4 border border-[#E2E8F0]"
                      style={{ background: "linear-gradient(135deg,#F8FAFC 0%,#F1F5F9 100%)" }}
                    >
                      <div className="flex items-start gap-2.5">
                        <Lightbulb size={16} className="text-[#0D9488] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[#1E293B] text-xs font-medium mb-1">Your feedback matters</p>
                          <p className="text-[#64748B] text-xs leading-relaxed">Every response is personally reviewed by our product team and helps shape the future of MantraCare.</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit */}
                    <motion.button type="submit" disabled={!canSubmit || submitting}
                      whileHover={canSubmit ? { scale: 1.02 } : {}} whileTap={canSubmit ? { scale: 0.97 } : {}}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                        canSubmit ? "bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-sm" : "bg-[#CBD5E1] text-[#64748B] cursor-not-allowed"
                      }`}
                    >
                      {submitting ? (
                        <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Submitting...</>
                      ) : (
                        <><Send size={15} />Submit Feedback</>
                      )}
                    </motion.button>
                    {!canSubmit && !submitting && (
                      <p className="text-xs text-slate-400 text-center -mt-2">
                        {starRating === 0 ? "Please add a star rating" : "Message must be at least 10 characters"}
                      </p>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
