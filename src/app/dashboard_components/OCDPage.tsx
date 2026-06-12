"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, MessageCircle, CheckCircle, ChevronRight, ChevronLeft, Sparkles, Heart, Wind, BookOpen, BarChart3, ArrowRight, Play, Headphones, FileText, Activity, Moon, Music, Star, ArrowUpRight, Clock, Award, Check, Zap, Battery, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { MobileAppModal } from "./MobileAppModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ocdCtaImage = "/dashboard_assets/db1e749f8f0e51fd6bed6aac17a276ea49c074c0.png";

export function OCDPage() {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);
  const [showTodaysPlan, setShowTodaysPlan] = useState(false);

  const service = {
    name: "OCD",
    description: "Specialized support and therapy for Obsessive-Compulsive Disorder.",
    icon: "🔄",
    color: "#EC4899",
    pathways: [
      { title: "Understanding OCD", type: "Video", points: "10 Points", icon: "▶️", duration: "8 min", completed: false },
      { title: "ERP Introduction Exercise", type: "Audio", points: "10 Points", icon: "🎧", duration: "6 min", completed: false },
      { title: "Track Your Symptoms Today", type: "Tracker", points: "10 Points", icon: "📊", duration: "3 min", completed: false },
      { title: "OCD Assessment", type: "Assessment", points: "10 Points", icon: "📋", duration: "10 min", completed: false },
      { title: "Mindfulness for OCD", type: "Audio", points: "5 Points", icon: "🎵", duration: "12 min", completed: false }
    ]
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
    'Audio': { bgColor: '#FEF3C7', iconBg: 'bg-[#F59E0B]', textColor: '#F59E0B', icon: <Headphones size={24} className="text-white" strokeWidth={2} /> },
    'Tracker': { bgColor: '#DBEAFE', iconBg: 'bg-[#3B82F6]', textColor: '#3B82F6', icon: <BarChart3 size={24} className="text-white" strokeWidth={2} /> },
    'Assessment': { bgColor: '#F3E8FF', iconBg: 'bg-[#A855F7]', textColor: '#A855F7', icon: <FileText size={24} className="text-white" strokeWidth={2} /> },
    'Activity': { bgColor: '#D1FAE5', iconBg: 'bg-[#10B981]', textColor: '#10B981', icon: <Activity size={24} className="text-white" strokeWidth={2} /> },
    'Video': { bgColor: '#FEE2E2', iconBg: 'bg-[#EF4444]', textColor: '#EF4444', icon: <Play size={24} className="text-white" strokeWidth={2} /> },
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1050px] w-full mx-auto px-4 md:px-8 py-6 md:py-12">
          {/* Service Header */}
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-lg flex-shrink-0" style={{ backgroundColor: service.color }}>
                {service.icon}
              </div>
              <h1 className="text-xl md:text-2xl text-[#020817] font-bold">{service.name}</h1>
            </div>
            <p className="text-xs md:text-sm leading-relaxed max-w-xl text-[#64748B] pl-2">{service.description}</p>
          </motion.div>

          {/* Expert Support Section */}
          <div className="space-y-[10px] mb-8">
            <Link href="/care-team">
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] rounded-2xl px-5 py-5 flex items-center justify-between shadow-lg group cursor-pointer"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageCircle className="text-white" size={24} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-white">Talk to an OCD Specialist</h4>
                    <p className="text-xs mt-1 text-white/90 font-medium">Professional Care, Counseling & Therapeutic Support</p>
                  </div>
                </div>
                <div className="relative z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                  <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} strokeWidth={2} />
                </div>
              </motion.div>
            </Link>

            {/* Today's Plan */}
            <div className="border bg-white rounded-2xl shadow-sm overflow-hidden">
              <motion.button
                onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                className="w-full p-4 md:p-5 hover:bg-slate-50 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Star className="text-white" size={24} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-base text-[#020817]">Today's Plan</h3>
                    <p className="text-xs md:text-sm text-[#64748B]">Complete your daily wellness activities</p>
                  </div>
                </div>
                <ChevronRight className={`text-[#F97316] transition-transform ${showTodaysPlan ? 'rotate-90' : ''}`} size={24} />
              </motion.button>

              {showTodaysPlan && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-5 pt-2 space-y-4">
                  {service.pathways.map((pathway, index) => {
                    const isCompleted = completedTasks.has(index);
                    const config = activityConfig[pathway.type] || activityConfig['Activity'];
                    const routeMap: Record<string, string> = {
                      "Understanding OCD": "/ocd_tips",
                      "ERP Introduction Exercise": "/fear_ladder",
                      "Track Your Symptoms Today": "/ocd_moments",
                      "Mindfulness for OCD": "/guided_imagery"
                    };
                    const targetRoute = routeMap[pathway.title];

                    return (
                      <div key={index} className="flex items-center gap-3 py-2">
                        <div 
                          onClick={() => setCompletedTasks(prev => {
                            const n = new Set(prev);
                            n.has(index) ? n.delete(index) : n.add(index);
                            return n;
                          })}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-slate-200'}`}
                        >
                          {isCompleted && <Check className="text-white" size={12} strokeWidth={3} />}
                        </div>
                        {targetRoute ? (
                          <Link href={targetRoute} className="flex-1 flex items-center gap-3 group">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${config.iconBg}`}>{config.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-[#374151] group-hover:text-[#2563EB] transition-colors">{pathway.title}</h3>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 uppercase tracking-wider">{pathway.type}</span>
                                {pathway.duration && <span>{pathway.duration}</span>}
                              </div>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <div onClick={() => pathway.type === "Assessment" && setShowMobileAppModal(true)} className="flex-1 flex items-center gap-3 cursor-pointer">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${config.iconBg}`}>{config.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-[#374151]">{pathway.title}</h3>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 uppercase tracking-wider">{pathway.type}</span>
                                {pathway.duration && <span>{pathway.duration}</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Self Care Link */}
            <Link href="/ocd-self-care">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-5 flex items-center justify-between shadow-sm group cursor-pointer mt-[10px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#FF9F43] rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-[#020817]">Self Care Resources</h4>
                    <p className="text-xs mt-1 text-[#64748B]">Mindfulness & guided sessions</p>
                  </div>
                </div>
                <div className="w-10 h-10 bg-[#FF9F43]/10 rounded-[14px] flex items-center justify-center">
                  <ArrowRight className="text-[#FF9F43] group-hover:translate-x-1 transition-transform" size={20} />
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Quick Tools */}
          <div className="border bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-base font-bold flex items-center gap-2 mb-6 text-[#020817]">
              <Sparkles className="text-[#00c0ff]" size={18} />
              Quick Tools
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: "Log Moments", icon: FileText, grad: "#F39C12", link: "/ocd_moments" },
                { label: "Journal", icon: BookOpen, grad: "#3498DB", link: "/clutter_journal" },
                { label: "Daily Life", icon: Calendar, grad: "#FF9F43", link: "/daily_life" },
                { label: "Mood Tracker", icon: Heart, grad: "#E74C3C", link: "/mood_tracker" },
                { label: "Energy Check", icon: Battery, grad: "#9B59B6", link: "/token" },
                { label: "Assessment", icon: CheckCircle, grad: "#27AE60", link: "https://app.mantracare.org/ocd-test/", external: true },
              ].map((tool) => (
                tool.external ? (
                  <a key={tool.label} href={tool.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-all" style={{ backgroundColor: tool.grad }}>
                      <tool.icon className="text-white" size={24} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight text-center">{tool.label}</p>
                  </a>
                ) : (
                  <Link key={tool.label} href={tool.link} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-all" style={{ backgroundColor: tool.grad }}>
                      <tool.icon className="text-white" size={24} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight text-center">{tool.label}</p>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-white to-[#F3FAFF] rounded-2xl p-8 shadow-lg border border-[#E2E8F0] relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#00c0ff]/10 text-[#043570] px-3 py-1.5 rounded-full text-xs font-bold border border-[#00c0ff]/20 uppercase tracking-wider">
                  <Sparkles size={14} className="text-[#00c0ff]" />
                  OCD Specialists
                </div>
                <h3 className="text-[#020817] text-3xl font-bold leading-tight">Connect with OCD specialists from home</h3>
                <p className="text-[#64748B] text-sm leading-relaxed max-w-lg">Consult with licensed OCD specialists via video or chat for therapeutic support and evidence-based care.</p>
                <Link href="/plans">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00c0ff] to-[#0EA5E9] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg mt-4 cursor-pointer">
                    Explore Plans
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </motion.div>
                </Link>
              </div>
              <div className="hidden md:block relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-[#00c0ff]/20">
                <ImageWithFallback src={ocdCtaImage} alt="OCD Treatment" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileAppModal isOpen={showMobileAppModal} onClose={() => setShowMobileAppModal(false)} />
    </div>
  );
}
