"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Layout,
  Activity,
  Heart,
  Brain,
  Calendar,
  Sparkles,
  RefreshCw,
  Waves,
  Wind,
  Map,
  Footprints,
  BookOpen,
  TrendingUp,
  Clock,
  Shield,
  FileText,
  Lightbulb,
  Award,
  Zap,
  Target,
  User,
  Coffee,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const slugs = [
  "anxiety_cycle", "brave_steps", "clutter_journal", "cognitive_distortions", 
  "contamination_ocd", "daily_life", "did_you_know", "discard_it", 
  "fear_ladder", "feelings_fact", "gratitude_logs", "grounded_techniques", 
  "guided_imagery", "hoarding_ocd", "letter_to_ocd", "metta_heart_guide", 
  "mirror_moments", "mood_tracker", "ocd-treatment-guide", "ocd_cycle", 
  "ocd_moments", "ocd_success_stories", "ocd_tips", "one_thing_out", 
  "pure_ocd", "quiet-focus-tool", "reassurance_resistance", "reframe_thoughts", 
  "response_guide", "ritual_cost", "self_compassion", "thought_diffusion", 
  "thought_surfing", "thought_truth", "tricho_ocd", "trigger_map", 
  "truth_seeker_quiz", "uncertainity_acceptance", "uncertainity_tolerance", 
  "urge_surfing", "what_is_health_ocd"
];

function formatName(slug: string) {
  return slug
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Map icons randomly or by keyword for variety
const icons = [Activity, Heart, Brain, Calendar, Sparkles, RefreshCw, Waves, Wind, Map, Footprints, BookOpen, TrendingUp, Clock, Shield, FileText, Lightbulb, Award, Zap, Target];
const colors = [
  "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500", 
  "bg-rose-500", "bg-indigo-500", "bg-cyan-500", "bg-orange-500", 
  "bg-pink-500", "bg-slate-500", "bg-teal-500", "bg-lime-500"
];

const activities = slugs.map((slug, i) => ({
  name: formatName(slug),
  slug: slug,
  icon: icons[i % icons.length],
  color: colors[i % colors.length]
}));

export default function HubPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#1E293B] mb-2 flex items-center gap-3">
              <Layout className="text-[#2563EB]" />
              Activity Hub
            </h1>
            <p className="text-slate-500 text-lg">Testing all {activities.length} activities in the project.</p>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition-all"
          >
            Switch to New UI
            <ArrowRight size={20} />
          </Link>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              <Link href={`/${activity.slug}`}>
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 h-full hover:shadow-lg hover:border-[#00c0ff] transition-all group flex flex-col items-center text-center">
                  <div className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                    <activity.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172b] leading-tight mb-2">{activity.name}</h3>
                  <div className="mt-auto text-[10px] font-bold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                    LAUNCH MODULE
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
