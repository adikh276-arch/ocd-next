"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  MessageCircle, 
  BookOpen, 
  Video, 
  FileText, 
  Heart, 
  Shield, 
  ChevronRight, 
  ChevronDown,
  CloudRain,
  Brain,
  Zap,
  Users,
  Briefcase,
  Moon,
  Baby,
  Flame,
  Frown,
  TrendingUp,
  HeartPulse,
  Sparkles,
  UtensilsCrossed,
  RefreshCw,
  Waves,
  RotateCcw,
  Star,
  FolderTree,
  Mail,
  Smile,
  Calendar,
  Clock,
  Lightbulb,
  Award,
  Compass,
  History,
  CheckSquare,
  Wind
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface TopicCard {
  id: string;
  icon: any;
  label: string;
  bgColor: string;
  iconColor: string;
  url: string;
}

export function OCDSelfCare() {
    const { t } = useTranslation("ocd-self-care");
  const router = useRouter();

  const topicCards: TopicCard[] = [
    { id: "ocd-tips", icon: Lightbulb, label: t("ocd_tips"), bgColor: "#FFF4E5", iconColor: "#FFB347", url: "/ocd_tips" },
    { id: "manage-ocd", icon: Shield, label: t("manage_ocd"), bgColor: "#EBF4FF", iconColor: "#4F95FF", url: "/ocd-treatment-guide" },
    { id: "fear-ladder", icon: TrendingUp, label: t("fear_ladder"), bgColor: "#F3EEFF", iconColor: "#9D6CFF", url: "/fear_ladder" },
    { id: "self-compassion", icon: Heart, label: t("self_compassion"), bgColor: "#FFEBF0", iconColor: "#FF6B9D", url: "/self_compassion" },
    { id: "ocd-cycle", icon: RefreshCw, label: t("ocd_cycle"), bgColor: "#E0F7FA", iconColor: "#00BCD4", url: "/ocd_cycle" },
    { id: "reframing-thoughts", icon: Brain, label: t("reframing_thoughts"), bgColor: "#E8F8F5", iconColor: "#34D399", url: "/reframe_thoughts" },
    { id: "success-stories", icon: Award, label: t("success_stories"), bgColor: "#F7FEE7", iconColor: "#84CC16", url: "/ocd_success_stories" },
    { id: "meditation", icon: BookOpen, label: t("meditation"), bgColor: "#EDE9FE", iconColor: "#8B5CF6", url: "/guided_imagery" },
  ];

  const selfCareToolCards: TopicCard[] = [
    { id: "log-ocd-moments", icon: Clock, label: t("log_ocd_moments"), bgColor: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)", iconColor: "#A855F7", url: "/ocd_moments" },
    { id: "ocd-daily-life", icon: Calendar, label: t("ocd_daily_life"), bgColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconColor: "#06B6D4", url: "/daily_life" },
    { id: "mood-tracker", icon: Smile, label: t("mood_tracker"), bgColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", iconColor: "#F59E0B", url: "/mood_tracker" },
    { id: "gratitude-tracker", icon: Star, label: t("gratitude_tracker"), bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", iconColor: "#FBBF24", url: "/gratitude_logs" },
    { id: "vibe-tracker", icon: Zap, label: t("vibe_tracker"), bgColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", iconColor: "#EC4899", url: "/vibe_tracker" },
  ];

  const wellnessGuideCards: TopicCard[] = [
    { id: "health-ocd", icon: HeartPulse, label: t("health_ocd"), bgColor: "#FFEBEE", iconColor: "#EF5350", url: "/health-ocd" },
    { id: "hoarding-ocd", icon: FolderTree, label: t("hoarding_ocd"), bgColor: "#FFF3E0", iconColor: "#FF9800", url: "/hoarding-ocd" },
    { id: "trichotillomania", icon: Wind, label: t("trichotillomania"), bgColor: "#F3E5F5", iconColor: "#AB47BC", url: "/trichotillomania" },
    { id: "contamination-ocd", icon: Shield, label: t("contamination_ocd"), bgColor: "#E8F5E9", iconColor: "#66BB6A", url: "/contamination-ocd" },
    { id: "pure-o-ocd", icon: Brain, label: t("pure_o_ocd"), bgColor: "#E3F2FD", iconColor: "#42A5F5", url: "/pure-o-ocd" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1050px] w-full mx-auto px-6 md:px-8 py-8 md:py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex items-center gap-6"
          >
            <button
              onClick={() => {
                if (window.parent !== window) {
                  window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                } else {
                  window.location.href = 'https://web.mantracare.com';
                }
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2563EB] rounded-[18px] flex items-center justify-center shadow-md">
                <RefreshCw size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1E293B]">{t("ocd_self-care")}</h1>
                <p className="text-[13px] text-slate-500 font-medium">{t("tools_and_resources_to_support_your_wellness_journey")}</p>
              </div>
            </div>
          </motion.div>

          {/* Trackers */}
          <div className="mb-12">
            <h2 className="text-[15px] font-bold text-[#1E293B] mb-4 pl-2">{t("trackers")}</h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {selfCareToolCards.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div key={tool.id} variants={item} className="h-full">
                    <Link href={tool.url} className="block h-full">
                      <div 
                        className="rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-start justify-between h-[100px] cursor-pointer"
                        style={{ background: tool.bgColor }}
                      >
                        <IconComponent size={24} className="text-white group-hover:scale-105 transition-transform" strokeWidth={2} />
                        <h3 className="text-white font-medium text-[12px] text-left leading-tight mt-3">{tool.label}</h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Tools */}
          <div className="mb-12">
            <h2 className="text-[15px] font-bold text-[#1E293B] mb-4 pl-2">{t("tools")}</h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {topicCards.map((topic) => {
                const IconComponent = topic.icon;
                const isMeditation = topic.id === "meditation";
                
                const content = (
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-md hover:border-[#2563EB]/20 transition-all text-center group cursor-pointer h-full flex flex-col justify-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-transform shadow-sm"
                      style={{ backgroundColor: topic.bgColor }}
                    >
                      <IconComponent size={24} style={{ color: topic.iconColor }} strokeWidth={2} />
                    </div>
                    <h3 className="text-[#1E293B] font-medium text-[13px] group-hover:text-[#2563EB] transition-colors">{topic.label}</h3>
                  </div>
                );

                return (
                  <motion.div key={topic.id} variants={item}>
                    {isMeditation ? (
                      <div 
                        onClick={() => {
                          if (window.parent !== window) {
                            window.parent.postMessage({ action: 'mindful' }, 'https://web.mantracare.com');
                          } else {
                            window.location.href = 'https://web.mantracare.com';
                          }
                        }}
                        className="h-full"
                      >
                        {content}
                      </div>
                    ) : (
                      <Link href={topic.url} className="block h-full">
                        {content}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Wellness Guides */}
          <div>
            <h2 className="text-[15px] font-bold text-[#1E293B] mb-4 pl-2">{t("wellness_guides")}</h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {wellnessGuideCards.map((guide) => {
                const IconComponent = guide.icon;
                return (
                  <motion.div key={guide.id} variants={item}>
                    <Link href={guide.url} className="block h-full">
                      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-md hover:border-[#2563EB]/20 transition-all text-center group cursor-pointer h-full flex flex-col justify-center">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-transform shadow-sm"
                          style={{ backgroundColor: guide.bgColor }}
                        >
                          <IconComponent size={24} style={{ color: guide.iconColor }} strokeWidth={2} />
                        </div>
                        <h3 className="text-[#1E293B] font-medium text-[13px] group-hover:text-[#2563EB] transition-colors">{guide.label}</h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OCDSelfCare;
