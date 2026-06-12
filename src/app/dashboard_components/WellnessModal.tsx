"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, MessageSquareX, BookOpen, User, X } from "lucide-react";
import { ContentItem } from "../dashboard_data/wellnessData";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

interface WellnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem | null;
  type: "tip" | "myth" | "article" | "story";
  category?: string;
}

export function WellnessModal({ isOpen, onClose, item, type, category }: WellnessModalProps) {
  const { t } = useTranslation("ocd-self-care");
  if (!item) return null;

  const getIcon = () => {
    switch (type) {
      case "tip": return <Lightbulb className="text-white" size={24} />;
      case "myth": return <MessageSquareX className="text-white" size={24} />;
      case "article": return <BookOpen className="text-white" size={24} />;
      case "story": return <User className="text-white" size={24} />;
    }
  };

  const getThemeColor = () => {
    switch (type) {
      case "tip": return "bg-purple-500";
      case "myth": return "bg-pink-500";
      case "article": return "bg-blue-500";
      case "story": return "bg-cyan-500";
    }
  };

  const getHeaderBg = () => {
    switch (type) {
      case "tip": return "bg-purple-50";
      case "myth": return "bg-pink-50";
      case "article": return "bg-blue-50";
      case "story": return "bg-cyan-50";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-6"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
            {/* Header */}
            <div className={`${getHeaderBg()} px-6 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0`}>
              <div className="flex items-center gap-4">
                <div className={`${getThemeColor()} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
                  {getIcon()}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                    {type === "tip" ? t("wellness_tip") : type === "myth" ? t("debunking_myth") : type === "article" ? t("article") : t("real_story")}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {type === "tip" ? t("daily_wisdom") : type === "myth" ? t("ocd_misconception") : type === "article" ? t("expert_insight") : t("recovery_story")}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/80 hover:bg-white text-gray-400 hover:text-gray-600 flex items-center justify-center transition-all shadow-sm border border-gray-100"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
              <div className="w-full mx-auto">
                {item.source && (
                  <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                    {t("source")}: {item.source}
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  {category ? t(`${category}_${type}_${item.id}_title`, item.title) : item.title}
                </h2>
                <div className="space-y-6">
                  {item.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {category ? t(`${category}_${type}_${item.id}_content_${index}`, paragraph) : paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center sticky bottom-0">
              <button
                onClick={onClose}
                className={`${getThemeColor()} text-white font-bold py-4 px-12 rounded-2xl hover:brightness-110 transition-all shadow-lg active:scale-95 text-lg`}
              >
                {t("i_understand")}
              </button>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
