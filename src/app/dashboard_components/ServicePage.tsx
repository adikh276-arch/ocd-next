import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Calendar, Video, FileText, TrendingUp, Clock, Users, Award, Star, MessageCircle, Phone, CheckCircle, ChevronRight, ChevronLeft, ChevronDown, ArrowRight, Play, BookOpen, Headphones, BarChart3, Sparkles, Heart, Wind, Brain, Activity, Smile, Target, Moon, Briefcase, Music, Circle, Sunrise, Waves, Coffee, ArrowUpRight, Library, Droplet, Scale, Gauge, Utensils, Weight, Box, GlassWater, CalendarDays, Baby, Ruler, NotebookPen, Cigarette, Zap, AlertCircle, Shield, UtensilsCrossed, PlayCircle, Check, Building2, ClipboardCheck, Eye, BarChart, Stethoscope, Microscope, HeartPulse, Bone, Ear, ScanEye, Syringe, UserCircle, Pill, Skull, Flame, TestTube, Droplets, Users2, BriefcaseMedical, FolderOpen, ShoppingBag, Headset, Flag, Route, Thermometer, Beer, Leaf, X, Pencil, User, BookOpenCheck, DollarSign, Calculator, Sparkle, Layers, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { MobileAppModal } from "./MobileAppModal";
import { ComingSoonModal } from "./ComingSoonModal";
import { SobrietyTracker } from "./SobrietyTracker";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { QuickStartModal } from "./QuickStartModal";
import { GiNightSleep } from "react-icons/gi";
import { FaRunning, FaDumbbell } from "react-icons/fa";
const ctaImage = "/dashboard_assets/186fd1bf328aaeb6e734ad5272daebfb694e31f6.png";
const diabetesCtaImage = "/dashboard_assets/e9173f3475e4ceb647370182f4f401b5495918f8.png";
const womenWellnessCtaImage = "/dashboard_assets/691691d2f5c5222546c7faac6a5bdfc1dda8a74c.png";
const physiotherapyCtaImage = "/dashboard_assets/846133927f73b8d41ee3e7e252b49f8dfbdacc2a.png";
const coachCtaImage = "/dashboard_assets/8b7ac1d84976cb9c67d9e14645880449996f3c5d.png";
const hypertensionCtaImage = "/dashboard_assets/e239cb150a261d6c99f7923f801ed59265e16c50.png";
const fitnessCtaImage = "/dashboard_assets/cc8d1e63ef33e644c8c35ddc94614ed4b6c95daa.png";
const yogaCtaImage = "/dashboard_assets/11f0d36edf4afd46da5d7737343173aebd4a009a.png";
const quitSmokingCtaImage = "/dashboard_assets/74c1cbf7d5fe236bfdb49bed0c25fdd0cc02be1c.png";
const financialWellnessCtaImage = "/dashboard_assets/07c438a39719b32c4222379fdcac89a9d89acee3.png";
const lgbtqCtaImage = "/dashboard_assets/f4d666d5d7a1e98a6947a7ca3f0c8c44b62f1580.png";
const teleconsultationCtaImage = "/dashboard_assets/69a727af93b78a6d55ca2a2da5a80e3c92408294.png";
const healthChecksCtaImage = "/dashboard_assets/6e0e3208cd17bd3e4f90e27dd46ded2593e98be6.png";
const nutritionCtaImage = "/dashboard_assets/e49f3a8f9683847740be442d382c2d75f926f532.png";

const serviceDetails: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  icon: string;
  color: string;
  stats: { value: string; label: string }[];
  pathways: { title: string; type: string; points: string; icon: string; duration?: string; completed?: boolean }[];
  featureLinks?: { title: string; subtitle: string; iconType: "chat" | "brain" | "tracker" | "video" | "book" | "selfcare" | "pain" | "coachbook" | "diagnostics" | "pharmacy" }[];
  popularCategories?: { name: string; iconKey: "meditate" | "sleep" | "work" | "mental" | "soundscapes" | "pride" | "music" | "dailies" }[];
  yourFavorites?: { title: string; image: string }[];
  trackers?: { label: string; iconKey: "glucose" | "weight" | "blood-pressure" | "calories" | "heart-rate" | "cholesterol" | "water" | "periods" | "mood" | "meal" | "pregnancy" | "sleep" | "bmi" | "journal" | "craving" | "energy" | "withdrawal" | "steps" | "heartbeat" | "assessment" | "watch" | "index"; grad: string; link?: string | null }[];
  quickTools?: { label: string; Icon: any; grad: string; link: string | null }[];
  specialties?: { name: string; Icon: any; grad: string }[];
}> = {
  "emotional-wellbeing": {
    name: "Emotional Wellbeing",
    description: "Get professional support for your mental health and emotional wellness journey.",
    longDescription: "Our emotional wellbeing program provides you with access to licensed therapists and counselors who specialize in various areas of mental health. Whether you're dealing with stress, anxiety, depression, or simply need someone to talk to, we're here to support you every step of the way.",
    features: [
      "One-on-one therapy sessions with licensed professionals",
      "Group support meetings with peers",
      "Advanced mood tracking tools and analytics",
      "Guided mindfulness and relaxation exercises",
      "24/7 crisis support hotline access",
      "Personalized treatment plans"
    ],
    image: "https://images.unsplash.com/photo-1758273241078-8eec353836be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwY291bnNlbGluZyUyMHNlc3Npb258ZW58MXx8fHwxNzcyNjYzNjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🧠",
    color: "#8B5BB6",
    stats: [
      { value: "500+", label: "Therapists" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" }
    ],
    pathways: [
      { title: "Mindful Breathing Exercise", type: "Audio", points: "10 Points", icon: "🎧", duration: "5 min", completed: false },
      { title: "Meditation on Gratitude", type: "Audio", points: "5 Points", icon: "🎵", duration: "10 min", completed: false },
      { title: "Track Your Mood Today", type: "Tracker", points: "10 Points", icon: "📊", duration: "2 min", completed: false },
      { title: "Assess Your Stress Levels", type: "Assessment", points: "10 Points", icon: "📋", duration: "8 min", completed: false },
      { title: "Daily Gratitude Journal", type: "Activity", points: "10 Points", icon: "✍️", duration: "5 min", completed: false }
    ],
    quickTools: [
      { label: "Journal",            Icon: BookOpen,  grad: "#F39C12", link: "/journal" },
      { label: "Selfcare Tracker",   Icon: Heart,     grad: "#E74C3C", link: "https://web.mantracare.com/app/daily_self_care_tracker/" },
      { label: "Daily Life",         Icon: Calendar,  grad: "#3498DB", link: "https://platform.mantracare.org/ocd/daily_life" },
      { label: "Mood Tracker",       Icon: Smile,     grad: "#FF9F43", link: "https://platform.mantracare.org/ocd/mood_tracker" },
      { label: "Energy Check",       Icon: Zap,       grad: "#27AE60", link: "https://web.mantracare.com/app/energy_tracker" },
      { label: "Meditation",         Icon: Wind,      grad: "#9B59B6", link: "/service/meditation" },
    ]
  },
  "lgbtq": {
    name: "LGBTQ+",
    description: "Get professional LGBTQ-affirmative support for your mental health and emotional wellness journey.",
    longDescription: "Our LGBTQ+ program provides you with access to licensed therapists and counselors who specialize in LGBTQ-affirmative care. Whether you're dealing with identity exploration, coming out, family dynamics, or simply need someone who understands, we're here to support you every step of the way.",
    features: [
      "One-on-one therapy sessions with LGBTQ-affirming professionals",
      "Group support meetings with peers",
      "Advanced mood tracking tools and analytics",
      "Guided mindfulness and relaxation exercises",
      "24/7 crisis support hotline access",
      "Personalized treatment plans"
    ],
    image: "https://images.unsplash.com/photo-1617392144079-1453b1b87dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMR0JUUSUyMHByaWRlJTIwcmFpbmJvdyUyMHN1cHBvcnR8ZW58MXx8fHwxNzczMjI4MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: "🏳️‍🌈",
    color: "#8B5CF6",
    stats: [
      { value: "500+", label: "Counselors" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support" }
    ],
    pathways: [
      { title: "Mindful Breathing Exercise", type: "Audio", points: "10 Points", icon: "🎧", duration: "5 min", completed: false },
      { title: "Meditation on Gratitude", type: "Audio", points: "5 Points", icon: "🎵", duration: "10 min", completed: false },
      { title: "Track Your Mood Today", type: "Tracker", points: "10 Points", icon: "📊", duration: "2 min", completed: false },
      { title: "Assess Your Stress Levels", type: "Assessment", points: "10 Points", icon: "📋", duration: "8 min", completed: false },
      { title: "Daily Gratitude Journal", type: "Activity", points: "10 Points", icon: "✍️", duration: "5 min", completed: false }
    ],
    featureLinks: [
      { title: "Talk to an LGBTQ-Affirming Counselor", subtitle: "Get professional LGBTQ+ support", iconType: "chat" },
      { title: "Self Care Resources", subtitle: "Tools and guidance for your wellness journey", iconType: "selfcare" },
    ],
    quickTools: [
      { label: "AI Role Play",      Icon: Users2,    grad: "#E74C3C", link: "https://web.mantracare.com/app/ai-role-play" },
      { label: "Assessment",         Icon: ClipboardCheck, grad: "#3498DB", link: "https://pridemantra.com/get-started/" },
      { label: "Pride Spectrum",     Icon: Sparkles,  grad: "#FF9F43", link: "https://web.mantracare.com/app/identity_spectrum" },
      { label: "Journal",            Icon: BookOpen,  grad: "#F39C12", link: "/journal" },
      { label: "Identity Journey",   Icon: Route,     grad: "#8B5CF6", link: "https://web.mantracare.com/app/identity_journey" },
      { label: "Mindfulness",        Icon: Wind,      grad: "#9B59B6", link: "/service/meditation" },
    ]
  },
  "diabetes": {
    name: "Diabetes Care",
    description: "Comprehensive diabetes management to help you reverse and control diabetes naturally.",
    longDescription: "Take control of your diabetes with our comprehensive care program. Our team of endocrinologists, dietitians, and diabetes educators work together to create a personalized plan that fits your lifestyle and helps you maintain healthy blood sugar levels.",
    features: [
      "Real-time blood sugar monitoring and alerts",
      "Personalized meal plans from certified dietitians",
      "Customized exercise routines for diabetics",
      "Smart medication reminders and tracking",
      "Regular health checkups and lab work coordination",
      "Educational resources and workshops"
    ],
    image: "https://images.unsplash.com/photo-1766325693829-79d0b13a545e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGhlYWx0aCUyMG1vbml0b3J8ZW58MXx8fHwxNzcyNjgyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "💉",
    color: "#3EAAE1",
    stats: [
      { value: "10K+", label: "Patients" },
      { value: "85%", label: "Improved A1C" },
      { value: "100+", label: "Specialists" }
    ],
    pathways: [
      { title: "Pre-Diabetes Risk Assessment", type: "Assessment", points: "0 Points",  icon: "📋", duration: "8 min",  completed: false },
      { title: "Glycemic Index",               type: "Tips",       points: "10 Points", icon: "💡", duration: "5 min",  completed: false },
      { title: "Difference between Type 1 and Type 2 diabetes",        type: "Video",      points: "10 Points", icon: "▶️", duration: "7 min",  completed: false },
      { title: "Diabetic friendly Carrot Ginger Smoothie Recipe",       type: "Video",      points: "10 Points", icon: "▶️", duration: "4 min",  completed: false },
      { title: "Basic Q&N of Diabetes",         type: "Tips",       points: "10 Points", icon: "💡", duration: "6 min",  completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Diabetologist",  subtitle: "Reverse your diabetes naturally",      iconType: "chat"    },
      { title: "Academy (Wordpress)",  subtitle: "Learn everything you need to know",    iconType: "brain"   },
    ],
    quickTools: [
      { label: "Glucose", Icon: Box, grad: "#F39C12", link: null },
      { label: "Weight", Icon: Weight, grad: "#3498DB", link: null },
      { label: "Blood Pressure", Icon: Gauge, grad: "#FF9F43", link: null },
      { label: "Calories", Icon: Utensils, grad: "#27AE60", link: null },
      { label: "What to Eat?", Icon: UtensilsCrossed, grad: "#9B59B6", link: "https://app.mantracare.org/glycemic-load/" },
      { label: "Videos", Icon: PlayCircle, grad: "#E74C3C", link: "https://app.mantracare.org/video/" },
    ],
  },
  "women-wellness": {
    name: "Women Wellness",
    description: "Holistic health programs designed specifically for women's unique needs.",
    longDescription: "Comprehensive wellness programs addressing all aspects of women's health from adolescence through menopause and beyond. Our expert team understands the unique health challenges women face and provides personalized care.",
    features: [
      "Hormonal health support and optimization",
      "Reproductive health guidance and family planning",
      "Nutrition counseling for women's health",
      "Specialized fitness programs",
      "Mental wellness and stress management",
      "PCOS and menopause support"
    ],
    image: "https://images.unsplash.com/photo-1599137055145-3e6f2ae470f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHdlbGxuZXNzJTIweYn8ZW5wxfHx8fDE3NzI2ODI2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🌸",
    color: "#8B5BB6",
    stats: [
      { value: "15K+", label: "Women Served" },
      { value: "200+", label: "Programs" },
      { value: "4.9★", label: "Rating" }
    ],
    pathways: [
      { title: "Take a session and earn points",       type: "To do", points: "10 Points", icon: "📋", duration: "15 min", completed: false },
      { title: "Market Your Profile",                  type: "To do", points: "5 Points",  icon: "📋", duration: "5 min",  completed: false },
      { title: "Share Your Certification on LinkedIn", type: "To do", points: "5 Points",  icon: "📋", duration: "3 min",  completed: false },
      { title: "Introduction to Mantra Platform",      type: "Video", points: "5 Points",  icon: "▶️", duration: "8 min",  completed: false },
      { title: "Getting Paid on MantraCare",           type: "Video", points: "5 Points",  icon: "▶️", duration: "6 min",  completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Women Expert", subtitle: "Professional Care & Women Wellness Support", iconType: "chat"     },
      { title: "Self Care (Wordpress)",              subtitle: "Get trusted support for PCOS, fertility, menopause, & more",                iconType: "selfcare" },
    ],
    trackers: [
      { label: "Water",      iconKey: "water",      grad: "#3B82F6" },
      { label: "Weight",     iconKey: "weight",     grad: "#8B5CF6" },
      { label: "Periods",    iconKey: "periods",    grad: "#EC4899" },
      { label: "Mood",       iconKey: "mood",       grad: "#F59E0B", link: "https://platform.mantracare.org/ocd/mood_tracker" },
      { label: "Meal",       iconKey: "meal",       grad: "#10B981" },
      { label: "Pregnancy",  iconKey: "pregnancy",  grad: "#F97316" },
    ],
  },
  "physiotherapy": {
    name: "Physiotherapy",
    description: "Expert physiotherapy services for pain management and rehabilitation.",
    longDescription: "Whether you're recovering from an injury, managing chronic pain, or looking to improve mobility, our licensed physiotherapists create personalized treatment plans to help you achieve your physical health goals.",
    features: [
      "Personalized treatment plans tailored to your needs",
      "Live video consultations with licensed therapists",
      "Step-by-step exercise demonstrations",
      "Progress tracking and adjustments",
      "Home exercise programs you can do anywhere",
      "Pain management techniques"
    ],
    image: "https://images.unsplash.com/photo-1522845052468-8b871a6176e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHlzaW90aGVyYXB5JTIwZXhlcmNpc2UlMjB0aGVyYXB5fGVufDF8fHx8MTc3MjY4MjYyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🦴",
    color: "#2FAE5F",
    stats: [
      { value: "300+", label: "Therapists" },
      { value: "90%", label: "Pain Reduction" },
      { value: "8K+", label: "Recoveries" }
    ],
    pathways: [
      { title: "Take a session and earn points",       type: "To do",      points: "10 Points", icon: "📋", duration: "15 min", completed: false },
      { title: "Market Your Profile",                  type: "To do",      points: "5 Points",  icon: "📋", duration: "5 min",  completed: false },
      { title: "Share Your Certification on LinkedIn", type: "To do",      points: "5 Points",  icon: "📋", duration: "3 min",  completed: false },
      { title: "Introduction to Mantra Platform",      type: "Video",      points: "5 Points",  icon: "▶️", duration: "8 min",  completed: false },
      { title: "Physiotherapy Assessment Form",        type: "Assessment", points: "5 Points",  icon: "📋", duration: "10 min", completed: false },
    ],
    featureLinks: [
      { title: "Talk to an Expert",        subtitle: "Talk to your Physiotherapist",                  iconType: "chat"  },
    ],
    quickTools: [
      { label: "Pain Assessment", Icon: ClipboardCheck, grad: "#2563EB", link: "/journal" },
      { label: "Insights", Icon: TrendingUp, grad: "#10B981", link: null },
      { label: "Pain Tracker", Icon: Activity, grad: "#F59E0B", link: null },
      { label: "AI Body Analysis", Icon: ScanEye, grad: "#8B5CF6", link: "https://platform.mantracare.com/body-assessment/" },
    ],
  },
  "coach": {
    name: "Coaching",
    description: "Get guidance from expert coaches to achieve your wellness goals.",
    longDescription: "Work one-on-one with certified wellness coaches who help you set realistic goals, stay accountable, and make lasting lifestyle changes that improve your overall health and wellbeing.",
    features: [
      "Goal setting and planning sessions",
      "Regular check-ins and progress reviews",
      "Accountability support and motivation",
      "Comprehensive progress tracking",
      "Personalized motivational guidance",
      "Lifestyle modification strategies"
    ],
    image: "https://images.unsplash.com/photo-1758599880949-d5adb1fcc868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGNvYWNoJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzI2ODI2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "💼",
    color: "#F97316",
    stats: [
      { value: "150+", label: "Coaches" },
      { value: "88%", label: "Goal Achievement" },
      { value: "5K+", label: "Success Stories" }
    ],
    pathways: [
      { title: "Take a session and earn points",       type: "To do",      points: "10 Points", icon: "📋", duration: "15 min", completed: false },
      { title: "Market Your Profile",                  type: "To do",      points: "5 Points",  icon: "📋", duration: "5 min",  completed: false },
      { title: "Share Your Certification on LinkedIn", type: "To do",      points: "5 Points",  icon: "📋", duration: "3 min",  completed: false },
      { title: "Daily Gratitude Diary",                type: "To do",      points: "10 Points", icon: "📋", duration: "10 min", completed: false },
      { title: "Comprehensive Coaching Assessment",    type: "Assessment", points: "0 Points",  icon: "📋", duration: "12 min", completed: false },
    ],
    featureLinks: [
      { title: "Talk to an Expert",        subtitle: "Talk to your Coach",                    iconType: "chat"      },
      { title: "Coaching Areas (Wordpress)",           subtitle: "Explore coaching areas in career, executive, leadership, finance, and more.",               iconType: "coachbook" },
    ],
    quickTools: [
      { label: "360° Skill Profiling",         Icon: BookOpen,  grad: "#F39C12", link: "https://app.mantracare.org/360-degree-form/" },
      { label: "Assessment",      Icon: BarChart3, grad: "#3498DB", link: "https://app.mantracare.com/coachapp/assessments/" },
      { label: "Academy",         Icon: Library,   grad: "#FF9F43", link: "https://web.mantracare.com/app/mantracoach_academy/" },
      { label: "My Journey",       Icon: Route,     grad: "#27AE60", link: null },
      { label: "AI Role Plays",   Icon: Target,    grad: "#9B59B6", link: "https://web.mantracare.com/app/roleplay-mantra/" },
      { label: "Vision Board",    Icon: Sparkles,  grad: "#E74C3C", link: "https://app.mantracare.org/coachapp/improvement-canvas/" },
    ],
    trackers: [
      { label: "Daily Focus Tracker", iconKey: "assessment", grad: "#F39C12", link: "https://web.mantracare.com/app/performance_focus/" },
      { label: "Emotional Regulation", iconKey: "mood", grad: "#3498DB", link: "https://web.mantracare.com/app/emotional_regulation/" },
      { label: "Goal Momentum", iconKey: "energy", grad: "#FF9F43", link: "https://web.mantracare.com/app/goal_momentum/" },
      { label: "Confidence Check-in", iconKey: "heartbeat", grad: "#27AE60", link: "https://web.mantracare.com/app/confidence_identity/" },
      { label: "Coaching Integration", iconKey: "watch", grad: "#9B59B6", link: "https://web.mantracare.com/app/coaching_integration/" },
      { label: "Journal", iconKey: "journal", grad: "#E74C3C", link: "/journal" },
    ],
  },
  "hypertension": {
    name: "Hypertension Management",
    description: "Comprehensive hypertension management to help you control blood pressure naturally.",
    longDescription: "Take control of your blood pressure with our comprehensive care program. Our team of cardiologists, dietitians, and hypertension educators work together to create a personalized plan that fits your lifestyle and helps you maintain healthy blood pressure levels.",
    features: [
      "Real-time blood pressure monitoring and alerts",
      "Personalized meal plans from certified dietitians",
      "Customized exercise routines for heart health",
      "Smart medication reminders and tracking",
      "Regular health checkups and lab work coordination",
      "Educational resources and workshops"
    ],
    image: "https://images.unsplash.com/photo-1621525466547-4ac135e85f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwaGVhbHRofGVufDF8fHx8MTc3MjY4MjYyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "❤️",
    color: "#3EAAE1",
    stats: [
      { value: "7K+", label: "Patients" },
      { value: "82%", label: "BP Normalized" },
      { value: "50+", label: "Cardiologists" }
    ],
    pathways: [
      { title: "Pre-Hypertension Risk Assessment", type: "Assessment", points: "0 Points",  icon: "📋", duration: "8 min",  completed: false },
      { title: "Understanding Blood Pressure",               type: "Tips",       points: "10 Points", icon: "💡", duration: "5 min",  completed: false },
      { title: "Difference between Primary and Secondary Hypertension",        type: "Video",      points: "10 Points", icon: "▶️", duration: "7 min",  completed: false },
      { title: "Heart-Healthy Beet Root Smoothie Recipe",       type: "Video",      points: "10 Points", icon: "▶️", duration: "4 min",  completed: false },
      { title: "Basic Q&A of Hypertension",         type: "Tips",       points: "10 Points", icon: "💡", duration: "6 min",  completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Cardiologist",  subtitle: "Control your blood pressure naturally",      iconType: "chat"    },
      { title: "Academy (Wordpress)",  subtitle: "Learn everything you need to know",    iconType: "brain"   },
    ],
    trackers: [
      { label: "Blood Pressure", iconKey: "blood-pressure", grad: "#FF9F43" },
      { label: "Weight", iconKey: "weight", grad: "#3498DB" },
      { label: "Heart Rate", iconKey: "heart-rate", grad: "#9B59B6", link: "https://platform.mantracare.com/heartbeat/" },
      { label: "Calories", iconKey: "calories", grad: "#27AE60" },
      { label: "Cholesterol", iconKey: "cholesterol", grad: "#E74C3C" },
      { label: "Water", iconKey: "water", grad: "#3498DB" },
    ],
  },
  "fitness": {
    name: "Fitness",
    description: "Achieve your fitness goals with personalized workout plans and support.",
    longDescription: "From weight loss to muscle building, our certified fitness trainers create customized workout plans that match your fitness level, goals, and schedule. Get the body you've always wanted with expert guidance.",
    features: [
      "Custom workout plans for all fitness levels",
      "HD video demonstrations of exercises",
      "Real-time progress tracking and analytics",
      "Nutrition guidance and meal suggestions",
      "Live virtual training sessions",
      "Fitness challenges and community support"
    ],
    image: "https://images.unsplash.com/photo-1771086559194-91fffc427573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmclMjB3b3Jrb3V0fGVufDF8fHx8MTc3MjY2MDI0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🏋️",
    color: "#2FAE5F",
    stats: [
      { value: "20K+", label: "Members" },
      { value: "250+", label: "Trainers" },
      { value: "4.8★", label: "Rating" }
    ],
    pathways: [
      { title: "Take a session and earn points",       type: "To do", points: "10 Points", icon: "📋", duration: "15 min", completed: false },
      { title: "Market Your Profile",                  type: "To do", points: "5 Points",  icon: "📋", duration: "5 min",  completed: false },
      { title: "Share Your Certification on LinkedIn", type: "To do", points: "5 Points",  icon: "📋", duration: "3 min",  completed: false },
      { title: "Getting Paid on MantraCare",           type: "Video", points: "5 Points",  icon: "▶️", duration: "6 min",  completed: false },
      { title: "Introduction to Mantra Platform",      type: "Video", points: "5 Points",  icon: "▶️", duration: "8 min",  completed: false },
    ],
    trackers: [
      { label: "Calories", iconKey: "calories", grad: "#27AE60" },
      { label: "Weight", iconKey: "weight", grad: "#E74C3C" },
      { label: "Water", iconKey: "water", grad: "#3498DB" },
      { label: "Sleep", iconKey: "sleep", grad: "#9B59B6", link: "https://web.mantracare.com/app/sleep_tracker/" },
      { label: "Heartbeat", iconKey: "heartbeat", grad: "#F97316", link: "https://platform.mantracare.com/heartbeat/" },
      { label: "BMI", iconKey: "bmi", grad: "#F39C12", link: "https://web.mantracare.com/app/bmi-calculator-new/" },
    ],
    featureLinks: [
      { title: "Talk to a Fitness Instructor", subtitle: "Talk to your fitness coach",        iconType: "chat"    },
      { title: "Self Care (Wordpress)",         subtitle: "Explore tools and guidance for your fitness journey", iconType: "selfcare" },
    ],
  },
  "nutrition": {
    name: "Nutrition",
    description: "Achieve your nutrition goals with personalized meal plans and support.",
    longDescription: "From weight loss to muscle building, our certified nutritionists create customized meal plans that match your nutrition level, goals, and schedule. Get the body you've always wanted with expert guidance.",
    features: [
      "Custom meal plans for all nutrition levels",
      "HD video demonstrations of recipes",
      "Real-time progress tracking and analytics",
      "Nutrition guidance and meal suggestions",
      "Live virtual nutrition sessions",
      "Nutrition challenges and community support"
    ],
    image: "https://images.unsplash.com/photo-1670698783848-5cf695a1b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBjb25zdWx0YXRpb24lMjBkaWV0aXRpYW4lMjBoZWFsdGh5fGVufDF8fHx8MTc3NDQyMDMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: "🥗",
    color: "#22C55E",
    stats: [
      { value: "20K+", label: "Members" },
      { value: "250+", label: "Nutritionists" },
      { value: "4.8★", label: "Rating" }
    ],
    pathways: [
      { title: "Take a session and earn points",       type: "To do", points: "10 Points", icon: "📋", duration: "15 min", completed: false },
      { title: "Market Your Profile",                  type: "To do", points: "5 Points",  icon: "📋", duration: "5 min",  completed: false },
      { title: "Share Your Certification on LinkedIn", type: "To do", points: "5 Points",  icon: "📋", duration: "3 min",  completed: false },
      { title: "Getting Paid on MantraCare",           type: "Video", points: "5 Points",  icon: "▶️", duration: "6 min",  completed: false },
      { title: "Introduction to Mantra Platform",      type: "Video", points: "5 Points",  icon: "▶️", duration: "8 min",  completed: false },
    ],
    trackers: [
      { label: "Calories", iconKey: "calories", grad: "#27AE60" },
      { label: "Weight", iconKey: "weight", grad: "#E74C3C" },
      { label: "Water", iconKey: "water", grad: "#3498DB" },
      { label: "Sleep", iconKey: "sleep", grad: "#9B59B6", link: "https://web.mantracare.com/app/sleep_tracker/" },
      { label: "Heartbeat", iconKey: "heartbeat", grad: "#F97316", link: "https://platform.mantracare.com/heartbeat/" },
      { label: "BMI", iconKey: "bmi", grad: "#F39C12", link: "https://web.mantracare.com/app/bmi-calculator-new/" },
    ],
    featureLinks: [
      { title: "Talk to a Dietitian", subtitle: "Talk to your nutrition coach",        iconType: "chat"    },
      { title: "Self Care",         subtitle: "Explore tools and guidance for your nutrition journey", iconType: "selfcare" },
    ],
  },
  "meditation": {
    name: "Mindfulness",
    description: "Find inner peace with guided meditation sessions and mindfulness practices.",
    longDescription: "Discover the transformative power of meditation. Our guided sessions help reduce stress, improve focus, enhance sleep quality, and promote overall mental wellbeing through ancient practices adapted for modern life.",
    features: [
      "Guided meditation sessions for all levels",
      "Breathing exercises and techniques",
      "Sleep meditation and bedtime stories",
      "Stress relief programs",
      "Mindfulness training courses",
      "Daily meditation reminders"
    ],
    image: "https://images.unsplash.com/photo-1766524791322-8753e582e652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB6ZW58ZW58MXx8fHwxNzcyNjI5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🧘",
    color: "#F59E0B",
    stats: [
      { value: "1000+", label: "Sessions" },
      { value: "92%", label: "Stress Relief" },
      { value: "30K+", label: "Users" }
    ],
    pathways: [
      { title: "Gratitude Meditation Session", type: "Audio",    points: "5 Points",  icon: "🎧", duration: "8 min",  completed: false },
      { title: "Meditation for Inner Peace",   type: "Audio",    points: "10 Points", icon: "🎧", duration: "12 min", completed: false },
      { title: "Thought Patterns",             type: "Exercise", points: "5 Points",  icon: "📖", duration: "6 min",  completed: false },
      { title: "Emotional Awareness",          type: "Exercise", points: "5 Points",  icon: "📖", duration: "5 min",  completed: false },
      { title: "Nervous System Check",         type: "Exercise", points: "5 Points",  icon: "📖", duration: "7 min",  completed: false },
    ],
    popularCategories: [
      { name: "Meditation",  iconKey: "meditate"    },
      { name: "Sleep",       iconKey: "sleep"       },
      { name: "Music",       iconKey: "music"       },
      { name: "Dailies",     iconKey: "dailies"     },
      { name: "Soundscapes", iconKey: "soundscapes" },
      { name: "For Work",    iconKey: "work"        },
    ],
    yourFavorites: [
      { title: "Louie and Bee",      image: "https://images.unsplash.com/photo-1597919380449-8ccfbf28d9a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRlZCUyMGJlZSUyMGNhcnRvb24lMjBjaGlsZHJlbiUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzI3ODA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { title: "The Snack Cupboard", image: "https://images.unsplash.com/photo-1717065165653-bb853b7e6e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFjayUyMGZvb2QlMjBiYXNrZXQlMjBtYXJrZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzI3ODA4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    ],
  },
  "yoga": {
    name: "Yoga",
    description: "Practice yoga with expert instructors for physical and mental wellness.",
    longDescription: "Experience the holistic benefits of yoga through our diverse range of classes. From gentle restorative sessions to challenging power yoga, find the perfect practice for your body and mind.",
    features: [
      "Live yoga classes with certified instructors",
      "On-demand recorded sessions library",
      "Multiple yoga styles (Hatha, Vinyasa, Ashtanga)",
      "Beginner to advanced level classes",
      "Flexibility and strength tracking",
      "Personalized yoga sequences"
    ],
    image: "https://images.unsplash.com/photo-1681230817196-5141f1f9535e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyNjQ2MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "️",
    color: "#F59E0B",
    stats: [
      { value: "180+", label: "Instructors" },
      { value: "500+", label: "Classes" },
      { value: "25K+", label: "Yogis" }
    ],
    pathways: [
      { title: "Morning Yoga Flow Session", type: "Video", points: "15 Points", icon: "🎥", duration: "25 min", completed: false },
      { title: "Water Tracker", type: "Tracker", points: "10 Points", icon: "💧", duration: "3 min", completed: false },
      { title: "Track Your Practice", type: "Tracker", points: "10 Points", icon: "📊", duration: "3 min", completed: false },
      { title: "Evening Gentle Stretch", type: "Video", points: "10 Points", icon: "🧘", duration: "15 min", completed: false }
    ],
    featureLinks: [
      { title: "Talk to a Yoga Instructor", subtitle: "Expert guidance for your practice", iconType: "chat", link: "/care-team" },
      { title: "Self Care Resources (Wordpress)", subtitle: "Mindfulness & guided sessions", iconType: "selfcare", link: "/yoga-self-care" },
    ],
    quickTools: [
      { label: "Journal", Icon: BookOpen, grad: "#F39C12", link: "/journal" },
      { label: "Water Tracker", Icon: GlassWater, grad: "#3498DB", link: null },
      { label: "Mood Tracker", Icon: Heart, grad: "#FF9F43", link: "https://platform.mantracare.org/ocd/mood_tracker" },
      { label: "Meditation", Icon: Wind, grad: "#27AE60", link: "/service/meditation" },
      { label: "Breathwork", Icon: Wind, grad: "#9B59B6", link: "https://web.mantracare.com/app/breadth-pacer/" },
      { label: "Physical Activity Log", Icon: Activity, grad: "#E74C3C", link: "https://platform.mantracare.com/joyful-motion-log/" },
    ],
  },
  "quit-smoking": {
    name: "Substance Use",
    description: "Comprehensive deaddiction support to help you overcome substance use and lead a healthier life.",
    longDescription: "Break free from addiction with our comprehensive deaddiction program. Our team of deaddiction therapists, counselors, and support specialists work together to create a personalized recovery plan that addresses your unique challenges and helps you maintain long-term sobriety.",
    features: [
      "24/7 craving support and crisis intervention",
      "Personalized recovery plans from certified therapists",
      "Evidence-based therapy and counseling sessions",
      "Relapse prevention strategies and coping tools",
      "Support groups and peer connections",
      "Educational resources on addiction and recovery"
    ],
    image: "https://images.unsplash.com/photo-1766325693829-79d0b13a545e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGhlYWx0aCUyMG1vbml0b3J8ZW58MXx8fHwxNzcyNjgyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🚭",
    color: "#3EAAE1",
    stats: [
      { value: "10K+", label: "Patients" },
      { value: "85%", label: "Recovery Rate" },
      { value: "100+", label: "Specialists" }
    ],
    pathways: [
      { title: "Addiction Risk Assessment", type: "Assessment", points: "0 Points",  icon: "📋", duration: "8 min",  completed: false },
      { title: "Understanding Triggers",               type: "Tips",       points: "10 Points", icon: "💡", duration: "5 min",  completed: false },
      { title: "Breaking the Cycle of Addiction",        type: "Video",      points: "10 Points", icon: "▶️", duration: "7 min",  completed: false },
      { title: "Healthy Coping Mechanisms",       type: "Video",      points: "10 Points", icon: "▶️", duration: "4 min",  completed: false },
      { title: "Recovery Journey Q&A",         type: "Tips",       points: "10 Points", icon: "💡", duration: "6 min",  completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Deaddiction Therapist",  subtitle: "Get professional support for recovery",      iconType: "chat"    },
    ],
  },
  "stepathon": {
    name: "Stepathon",
    description: "Join walking challenges and track your daily steps for better health.",
    longDescription: "Walking is one of the simplest yet most effective forms of exercise. Join our community challenges, compete with friends, earn rewards, and make every step count towards a healthier you.",
    features: [
      "Automatic daily step tracking",
      "Community walking challenges",
      "Leaderboards and rankings",
      "Achievement badges and rewards",
      "Team competitions and events",
      "Walking goals and streaks"
    ],
    image: "https://images.unsplash.com/photo-1597602898678-54b59c136980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxraW5nJTIwc3RlcHMlMjBvdXRkb29yfGVufDF8fHx8MTc3MjY4MjYzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "👟",
    color: "#F97316",
    stats: [
      { value: "50K+", label: "Active Walkers" },
      { value: "1B+", label: "Steps Logged" },
      { value: "100+", label: "Challenges" }
    ],
    pathways: [
      { title: "Today's Step Goal", type: "Tracker", points: "10 Points", icon: "👟", duration: "All day", completed: false },
      { title: "Join Weekly Challenge", type: "Activity", points: "15 Points", icon: "🏆", duration: "5 min", completed: false },
      { title: "Activity Level Assessment", type: "Assessment", points: "10 Points", icon: "📋", duration: "6 min", completed: false },
      { title: "Track Step Milestone", type: "Achievement", points: "20 Points", icon: "🎯", duration: "2 min", completed: false }
    ]
  },
  "finance": {
    name: "Financial Wellness",
    description: "Expert financial guidance to help you achieve financial stability and wellness.",
    longDescription: "Build financial confidence with our comprehensive financial wellness program. Our team of financial advisors, planners, and wellness coaches work together to create a personalized financial plan that addresses your unique challenges and helps you achieve long-term financial health.",
    features: [
      "24/7 financial advice and crisis support",
      "Personalized financial plans from certified advisors",
      "Evidence-based financial strategies and counseling",
      "Debt management and budgeting tools",
      "Investment guidance and wealth building",
      "Educational resources on financial literacy"
    ],
    image: "https://images.unsplash.com/photo-1709080381729-965c62ab0471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwcGxhbm5pbmclMjBpbnZlc3RtZW50fGVufDF8fHx8MTc3MjY4MjYzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "💰",
    color: "#2FAE5F",
    stats: [
      { value: "$2M+", label: "Saved" },
      { value: "12K+", label: "Clients" },
      { value: "95%", label: "Success Rate" }
    ],
    pathways: [
      { title: "Financial Health Assessment", type: "Assessment", points: "0 Points",  icon: "📋", duration: "8 min",  completed: false },
      { title: "Understanding Your Money Mindset",               type: "Tips",       points: "10 Points", icon: "💡", duration: "5 min",  completed: false },
      { title: "Breaking Bad Financial Habits",        type: "Video",      points: "10 Points", icon: "▶️", duration: "7 min",  completed: false },
      { title: "Smart Budgeting Strategies",       type: "Video",      points: "10 Points", icon: "▶️", duration: "4 min",  completed: false },
      { title: "Financial Planning Q&A",         type: "Tips",       points: "10 Points", icon: "💡", duration: "6 min",  completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Financial Advisor",  subtitle: "Get professional financial guidance",      iconType: "chat"    },
      { title: "Self Care (Wordpress)",  subtitle: "Learn healthy financial habits and planning",    iconType: "brain"   },
    ],
    quickTools: [
      { label: "Journal",         Icon: BookOpen,  grad: "#F39C12", link: "/journal" },
      { label: "Assessment",      Icon: BarChart3, grad: "#3498DB", link: null },
      { label: "Academy",         Icon: Library,   grad: "#FF9F43", link: null },
      { label: "Workshops",       Icon: Video,     grad: "#27AE60", link: null },
      { label: "SWOT Analysis",   Icon: Target,    grad: "#9B59B6", link: null },
      { label: "Vision Board",    Icon: Sparkles,  grad: "#E74C3C", link: null },
    ],
  },
  "financial-wellness": {
    name: "Financial Wellness",
    description: "Expert financial guidance to help you achieve financial stability and wellness.",
    longDescription: "Build financial confidence with our comprehensive financial wellness program. Our team of financial advisors, planners, and wellness coaches work together to create a personalized financial plan that addresses your unique challenges and helps you achieve long-term financial health.",
    features: [
      "24/7 financial advice and crisis support",
      "Personalized financial plans from certified advisors",
      "Evidence-based financial strategies and counseling",
      "Debt management and budgeting tools",
      "Investment guidance and wealth building",
      "Educational resources on financial literacy"
    ],
    image: "https://images.unsplash.com/photo-1709080381729-965c62ab0471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwcGxhbm5pbmclMjBpbnZlc3RtZW50fGVufDF8fHx8MTc3MjY4MjYzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "💰",
    color: "#2FAE5F",
    stats: [
      { value: "$2M+", label: "Saved" },
      { value: "12K+", label: "Clients" },
      { value: "95%", label: "Success Rate" }
    ],
    pathways: [
      { title: "Financial Health Assessment", type: "Assessment", points: "0 Points",  icon: "📋", duration: "8 min",  completed: false },
      { title: "Understanding Your Money Mindset",               type: "Tips",       points: "10 Points", icon: "���", duration: "5 min",  completed: false },
      { title: "Breaking Bad Financial Habits",        type: "Video",      points: "10 Points", icon: "▶️", duration: "7 min",  completed: false },
      { title: "Smart Budgeting Strategies",       type: "Video",      points: "10 Points", icon: "▶️", duration: "4 min",  completed: false },
      { title: "Financial Planning Q&A",         type: "Tips",       points: "10 Points", icon: "💡", duration: "6 min",  completed: false },
    ],
    featureLinks: [
      { title: "Talk to a Financial Advisor",  subtitle: "Get professional financial guidance",      iconType: "chat"    },
      { title: "Self Care (Wordpress)",  subtitle: "Learn healthy financial habits and planning",    iconType: "brain"   },
    ],
    quickTools: [
      { label: "Journal",         Icon: BookOpen,  grad: "#F39C12", link: "/journal" },
      { label: "SIP Calculator",      Icon: BarChart3, grad: "#3498DB", link: "https://forms.mantracare.org/sip-calculator/" },
      { label: "EMI Calculator",         Icon: Library,   grad: "#FF9F43", link: "https://forms.mantracare.org/emi-calculator/" },
      { label: "FD Calculator",       Icon: Video,     grad: "#27AE60", link: "https://forms.mantracare.org/fd-calculator/" },
      { label: "Home Loan EMI",   Icon: Target,    grad: "#9B59B6", link: "https://forms.mantracare.org/home-loan-emi-calculator/" },
      { label: "Personal Loan EMI",    Icon: Sparkles,  grad: "#E74C3C", link: "https://forms.mantracare.org/personal-loan-emi-calculator/" },
    ],
  },
  "teleconsultation": {
    name: "Teleconsultation",
    description: "Connect with healthcare professionals remotely through video or chat consultations.",
    longDescription: "Our teleconsultation service provides you with convenient access to licensed healthcare professionals from the comfort of your home. Get medical advice, prescriptions, and follow-up care through secure video or chat consultations.",
    features: [
      "Video consultations with licensed doctors",
      "Secure chat messaging with healthcare providers",
      "E-prescriptions and medical certificates",
      "Access to medical records and reports",
      "Specialist referrals and second opinions",
      "24/7 availability for urgent consultations"
    ],
    image: "https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlbWVkaWNpbmUlMjB2aWRlbyUyMGNhbGwlMjBkb2N0b3J8ZW58MXx8fHwxNzczNzA3MjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: "📞",
    color: "#3B82F6",
    stats: [
      { value: "1000+", label: "Doctors" },
      { value: "50K+", label: "Consultations" },
      { value: "24/7", label: "Availability" }
    ],
    pathways: [
      { title: "Health Assessment Questionnaire", type: "Assessment", points: "0 Points", icon: "📋", duration: "5 min", completed: false },
      { title: "Understanding Teleconsultation Benefits", type: "Tips", points: "10 Points", icon: "💡", duration: "3 min", completed: false },
      { title: "How to Prepare for Your Video Call", type: "Video", points: "10 Points", icon: "▶️", duration: "4 min", completed: false },
      { title: "Common Health Concerns Addressed", type: "Tips", points: "10 Points", icon: "💡", duration: "5 min", completed: false },
      { title: "Medical Records Management", type: "Activity", points: "10 Points", icon: "✍️", duration: "6 min", completed: false }
    ],
    featureLinks: [],
    quickTools: [
      { label: "Heartbeat", Icon: HeartPulse, grad: "#3B82F6", link: "https://platform.mantracare.com/heartbeat/" },
      { label: "Medical Records", Icon: FileText, grad: "#10B981", link: "/medical-records" },
      { label: "Prescription Refill", Icon: Briefcase, grad: "#F59E0B", link: "/prescription-refill" },
      { label: "Health Reports", Icon: BarChart3, grad: "#8B5CF6", link: null },
      { label: "Body Assessment", Icon: Activity, grad: "#EF4444", link: "https://platform.mantracare.com/body-assessment/" },
      { label: "Emergency Help", Icon: Phone, grad: "#DC2626", link: "/emergency-doctors" },
    ],
    trackers: [
      { label: "Heart Rate (BPM)", iconKey: "heart-rate", grad: "#EF4444", link: null },
      { label: "SpO2", iconKey: "spo2", grad: "#3B82F6", link: null },
      { label: "Blood Pressure", iconKey: "blood-pressure", grad: "#8B5CF6", link: null },
      { label: "Body Temperature", iconKey: "temperature", grad: "#F97316", link: null },
      { label: "Glucose", iconKey: "glucose", grad: "#10B981", link: null },
      { label: "Weight", iconKey: "weight", grad: "#F59E0B", link: null },
    ],
    specialties: [
      { name: "General Physician", Icon: Stethoscope, grad: "#3B82F6" },
      { name: "Endocrinologist", Icon: Microscope, grad: "#8B5CF6" },
      { name: "Gynecologist", Icon: Baby, grad: "#EC4899" },
      { name: "Cardiologist", Icon: HeartPulse, grad: "#EF4444" },
      { name: "Orthopedician", Icon: Bone, grad: "#F59E0B" },
      { name: "ENT Specialist", Icon: Ear, grad: "#10B981" },
      { name: "Gastroenterologist", Icon: Activity, grad: "#06B6D4" },
      { name: "Paediatrician", Icon: Users2, grad: "#F472B6" },
      { name: "Sexologist", Icon: Heart, grad: "#E11D48" },
      { name: "Dermatologist", Icon: Sparkles, grad: "#A855F7" },
      { name: "Dentist", Icon: Smile, grad: "#0EA5E9" },
      { name: "Neurosurgeon", Icon: Brain, grad: "#7C3AED" },
      { name: "Oncologist", Icon: Shield, grad: "#DC2626" },
      { name: "Ophthalmologist", Icon: ScanEye, grad: "#2563EB" },
      { name: "Urologist (Kidney & Urinary Tract)", Icon: Droplets, grad: "#0891B2" },
      { name: "Nephrologist", Icon: TestTube, grad: "#059669" },
      { name: "Pulmonologist (Lung)", Icon: Wind, grad: "#6366F1" },
      { name: "Rheumatologist", Icon: Gauge, grad: "#EA580C" },
      { name: "Fertility/ IVF Specialist", Icon: UserCircle, grad: "#DB2777" },
      { name: "General Surgery", Icon: BriefcaseMedical, grad: "#DC2626" },
    ]
  },
  "health-checks": {
    name: "Health Screenings",
    description: "Comprehensive health screenings and preventive assessments to monitor your wellbeing.",
    longDescription: "Our health checks service provides comprehensive screenings and preventive assessments to help you stay on top of your health. Get regular check-ups, lab tests, and personalized health reports from certified healthcare professionals.",
    features: [
      "Comprehensive health screenings",
      "Regular preventive check-ups",
      "Laboratory tests and diagnostics",
      "Personalized health reports",
      "Follow-up consultations",
      "Health risk assessments"
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2hlY2t1cCUyMGhlYWx0aCUyMHNjcmVlbmluZ3xlbnwxfHx8fDE3MzM3MDcyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: "🩺",
    color: "#22C55E",
    stats: [
      { value: "500+", label: "Health Packages" },
      { value: "100K+", label: "Tests Completed" },
      { value: "95%", label: "Satisfaction Rate" }
    ],
    pathways: [
      { title: "Health Screening Questionnaire", type: "Assessment", points: "0 Points", icon: "📋", duration: "5 min", completed: false },
      { title: "Understanding Preventive Health", type: "Tips", points: "10 Points", icon: "💡", duration: "3 min", completed: false },
      { title: "Preparing for Your Health Check", type: "Video", points: "10 Points", icon: "▶️", duration: "4 min", completed: false },
      { title: "Reading Your Health Reports", type: "Tips", points: "10 Points", icon: "💡", duration: "5 min", completed: false },
      { title: "Health Tracking & Monitoring", type: "Activity", points: "10 Points", icon: "✍️", duration: "6 min", completed: false }
    ],
    featureLinks: [
      { title: "Book Health Check", subtitle: "Schedule your comprehensive health screening", iconType: "chat" },
    ],
    trackers: [
      { label: "Glucose", iconKey: "glucose", grad: "#F39C12" },
      { label: "Weight", iconKey: "weight", grad: "#E74C3C" },
      { label: "Blood Pressure", iconKey: "blood-pressure", grad: "#FF9F43" },
      { label: "Heart Rate", iconKey: "heart-rate", grad: "#9B59B6" },
      { label: "Cholesterol", iconKey: "cholesterol", grad: "#E74C3C" },
      { label: "BMI", iconKey: "bmi", grad: "#F39C12" },
    ],
    specialties: [
      { name: "Health Checks", Icon: Stethoscope, grad: "#3B82F6", link: "/health-checks-packages" },
      { name: "Diagnostic Tests", Icon: Microscope, grad: "#8B5CF6", link: "/diagnostic-tests" },
      { name: "Vaccination", Icon: Syringe, grad: "#EC4899" },
      { name: "Vision Check", Icon: ScanEye, grad: "#EF4444" },
    ]
  }
};

export function ServicePage() {
  const router = useRouter();
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetails[serviceId] : null;
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [quickStartPlan, setQuickStartPlan] = useState<{ title: string; color: string } | null>(null);
  const [showAllPainAreas, setShowAllPainAreas] = useState(false);
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [showTodaysPlan, setShowTodaysPlan] = useState(false);
  const [showProgramSelector, setShowProgramSelector] = useState(false);
  const [visiblePrograms, setVisiblePrograms] = useState<string[]>(() => {
    const saved = localStorage.getItem('visibleSubstancePrograms');
    return saved ? JSON.parse(saved) : ['alcohol', 'tobacco', 'opioids', 'cannabis', 'stimulants', 'benzodiazepines', 'kratom', 'mdma'];
  });

  const userName = localStorage.getItem("userName") || "User";
  const firstName = userName.split(" ")[0];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle program visibility
  const toggleProgramVisibility = (programId: string) => {
    setVisiblePrograms(prev => {
      const newVisible = prev.includes(programId)
        ? prev.filter(id => id !== programId)
        : [...prev, programId];
      localStorage.setItem('visibleSubstancePrograms', JSON.stringify(newVisible));
      return newVisible;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProgramSelector(false);
      }
    };

    if (showProgramSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProgramSelector]);

  // Only meditation uses the dark navy theme
  const isDark = serviceId === "meditation";
  const isPurple = serviceId === "lgbtq";

  const t = {
    pageBg:       isDark ? "bg-[#0d1629]"                     : isPurple ? "bg-[#F9F6FE]" : "bg-[#F6F8FB]",
    cardBg:       isDark ? "bg-[#162040] border-white/10"      : isPurple ? "bg-white border-[#F3E1FD] shadow-sm" : "bg-white border-[#E2ECF5] shadow-sm",
    headingText:  isDark ? "text-white"                        : isPurple ? "text-[#020817]" : "text-[#020817]",
    subText:      isDark ? "text-slate-400"                    : isPurple ? "text-[#64748B]" : "text-[#64748B]",
    mutedText:    isDark ? "text-slate-500"                    : isPurple ? "text-[#F3E1FD]" : "text-[#E2ECF5]",
    backText:     isDark ? "text-slate-400 hover:text-white"   : isPurple ? "text-[#64748B] hover:text-[#020817]" : "text-[#64748B] hover:text-[#020817]",
    progressBg:   isDark ? "bg-white/10"                       : isPurple ? "bg-[#F3E1FD]" : "bg-[#E8F4FD]",
    taskDone:     isDark ? "bg-white/10 border-2 border-white/20"                : isPurple ? "bg-[#F3E1FD] border-2 border-[#F3E1FD]" : "bg-[#E8F4FD] border-2 border-[#E2ECF5]",
    taskTodo:     isDark ? "bg-white/5 border-2 border-white/8 hover:border-white/15 hover:bg-white/8" : isPurple ? "bg-white border-2 border-[#F3E1FD] hover:border-[#EE4F84] hover:shadow-sm" : "bg-white border-2 border-[#E2ECF5] hover:border-[#2D9CDB] hover:shadow-sm",
    taskLine:     isDark ? "bg-white/10"                       : isPurple ? "bg-[#F3E1FD]" : "bg-[#E2ECF5]",
    taskLineDone: isDark ? "bg-white/40"                       : isPurple ? "bg-[#BE51F5]" : "bg-[#27AE60]",
    checkboxTodo: isDark ? "border-white/25 group-hover:border-white/45" : isPurple ? "border-[#F3E1FD] group-hover:border-[#BE51F5]" : "border-[#E2ECF5] group-hover:border-[#27AE60]",
    iconTodo:     isDark ? "bg-white/8 border-2 border-white/12"  : isPurple ? "bg-[#F3E1FD] border-2 border-[#F3E1FD]" : "bg-[#F6F8FB] border-2 border-[#E2ECF5]",
    iconDone:     isDark ? "bg-white/10 border-2 border-white/20"  : isPurple ? "bg-[#F3E1FD] border-2 border-[#EE4F84]" : "bg-[#D5F5E3] border-2 border-[#A9DFBF]",
    taskTypeTodo: isDark ? "bg-white/10 text-white/70"          : isPurple ? "bg-[#F3E1FD] text-[#BE51F5] border border-[#F3E1FD]" : "bg-[#E8F4FD] text-[#1E293B] border border-[#E2ECF5]",
    taskTypeDone: isDark ? "bg-white/20 text-white"              : isPurple ? "bg-[#BE51F5] text-white" : "bg-[#1E293B] text-white",
    arrowTodo:    isDark ? "text-white/20 group-hover:text-white/50 group-hover:translate-x-1" : isPurple ? "text-[#F3E1FD] group-hover:text-[#EE4F84] group-hover:translate-x-1" : "text-[#E2ECF5] group-hover:text-[#2D9CDB] group-hover:translate-x-1",
    arrowDone:    isDark ? "text-white/60"                     : isPurple ? "text-[#BE51F5]" : "text-[#27AE60]",
    viewAllBtn:   isDark ? "text-white/60 hover:text-white hover:bg-white/5" : isPurple ? "text-[#EE4F84] hover:text-[#BE51F5] hover:bg-[#F3E1FD]" : "text-[#2D9CDB] hover:text-[#1E293B] hover:bg-[#E8F4FD]",
    sectionHdr:   isDark ? "text-white"                        : isPurple ? "text-[#020817]" : "text-[#020817]",
    seeAllBtn:    isDark ? "text-white/60 hover:text-white hover:bg-white/5"  : isPurple ? "text-[#EE4F84] hover:text-[#BE51F5] hover:bg-[#F3E1FD]" : "text-[#2D9CDB] hover:text-[#1E293B] hover:bg-[#E8F4FD]",
    taskCount:    isDark ? "text-slate-300"                    : isPurple ? "text-[#64748B]" : "text-[#64748B]",
    dotDivider:   isDark ? "text-white/20"                     : isPurple ? "text-[#F3E1FD]" : "text-[#E2ECF5]",
    clockText:    isDark ? "text-slate-400"                    : isPurple ? "text-[#BE51F5]/70" : "text-[#64748B]",
  };

  if (!service) {
    return (
      <div className={`min-h-screen ${t.pageBg} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl ${t.headingText} mb-4`}>Service not found</h1>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const completedCount = completedTasks.size;
  const totalTasks = service.pathways.length;
  const progressPercentage = (completedCount / totalTasks) * 100;

  return (
    <div className={`flex min-h-screen ${t.pageBg}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Nav */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
      {/* Main Content */}
      <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
        {/* Service Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            {/* Back Arrow */}
            <button
              onClick={() => router.push(-1)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${t.backText} hover:bg-[#f3faff]`}
            >
              <ChevronLeft size={24} />
            </button>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-lg flex-shrink-0`} style={{ backgroundColor: service.color }}>
              {service.icon}
            </div>
            <h1 className={`text-xl md:text-2xl ${t.headingText}`}>{service.name}</h1>
          </div>
          <p className={`text-xs md:text-sm leading-relaxed max-w-xl ${t.subText} pl-[54px]`}>{service.description}</p>
        </motion.div>

        {/* Trackers for Nutrition (moved to top) */}
        {serviceId === "nutrition" && service.trackers && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Trackers
              </h2>
              <p className={`text-sm ${t.subText}`}>
                Track your health metrics
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {service.trackers.map((tracker, i) => {
                const trackerIconMap = {
                  glucose: Box,
                  weight: Weight,
                  "blood-pressure": Gauge,
                  calories: Utensils,
                  "heart-rate": Activity,
                  cholesterol: Droplet,
                  water: GlassWater,
                  periods: CalendarDays,
                  mood: Smile,
                  meal: Utensils,
                  pregnancy: Baby,
                  sleep: Moon,
                  bmi: Ruler,
                  journal: BookOpen,
                  craving: Cigarette,
                  energy: Zap,
                  withdrawal: AlertCircle,
                  steps: FaRunning,
                  heartbeat: Heart,
                  assessment: ClipboardCheck,
                  watch: Eye,
                  index: BarChart,
                };
                const TrackerIcon = trackerIconMap[tracker.iconKey];
                if (!TrackerIcon) return null;
                return (
                  <motion.button
                    key={tracker.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      if (tracker.link) {
                        if (tracker.link.startsWith('http')) {
                          window.open(tracker.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tracker.link);
                        }
                      } else {
                        setShowMobileAppModal(true);
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: tracker.grad }}
                    >
                      <TrackerIcon className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium ${t.headingText}`}>{tracker.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Today's Plan - Pathways Section (for non-physiotherapy services) */}
        {serviceId !== "physiotherapy" && serviceId !== "emotional-wellbeing" && serviceId !== "diabetes" && serviceId !== "women-wellness" && serviceId !== "coach" && serviceId !== "hypertension" && serviceId !== "fitness" && serviceId !== "mindfulness" && serviceId !== "yoga" && serviceId !== "quit-smoking" && serviceId !== "financial-wellness" && serviceId !== "finance" && serviceId !== "lgbtq" && serviceId !== "teleconsultation" && serviceId !== "health-checks" && serviceId !== "nutrition" && (
        <motion.div 
          className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h2 className={`text-sm md:text-base flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Calendar className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Today's Plan
              </h2>
              <p className={`text-xs ${t.subText}`}>Complete your daily wellness activities</p>
            </div>
            <button 
              onClick={() => router.push(`/tasks?service=${encodeURIComponent(service.name)}`)}
              className={`text-xs flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${isPurple ? "text-[#EE4F84] hover:text-[#BE51F5] hover:bg-[#F3E1FD]" : "text-[#00c0ff] hover:text-[#043570] hover:bg-[#f3faff]"}`}
            >
              View All
              <ChevronRight size={14} />
            </button>
          </div>

          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {service.pathways.map((pathway, index) => {
              const isCompleted = completedTasks.has(index);
              
              // Map activity types to colors and icon components
              const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                'Audio': { 
                  bgColor: '#FEF3C7', 
                  iconBg: 'bg-[#F59E0B]', 
                  textColor: '#F59E0B',
                  icon: <Headphones size={24} className="text-white" strokeWidth={2} />
                },
                'Tracker': { 
                  bgColor: '#DBEAFE', 
                  iconBg: 'bg-[#3B82F6]', 
                  textColor: '#3B82F6',
                  icon: <BarChart3 size={24} className="text-white" strokeWidth={2} />
                },
                'Assessment': { 
                  bgColor: '#F3E8FF', 
                  iconBg: 'bg-[#A855F7]', 
                  textColor: '#A855F7',
                    icon: <FileText size={24} className="text-white" strokeWidth={2} />
                },
                'Activity': { 
                  bgColor: '#D1FAE5', 
                  iconBg: 'bg-[#10B981]', 
                  textColor: '#10B981',
                  icon: <Activity size={24} className="text-white" strokeWidth={2} />
                },
                'Exercise': { 
                  bgColor: '#DBEAFE', 
                  iconBg: 'bg-[#3B82F6]', 
                  textColor: '#3B82F6',
                  icon: <BookOpen size={24} className="text-white" strokeWidth={2} />
                },
                'Tips': { 
                  bgColor: '#FEF3C7', 
                  iconBg: 'bg-[#F59E0B]', 
                  textColor: '#F59E0B',
                  icon: <Sparkles size={24} className="text-white" strokeWidth={2} />
                },
                'Video': { 
                  bgColor: '#FEE2E2', 
                  iconBg: 'bg-[#EF4444]', 
                  textColor: '#EF4444',
                  icon: <Play size={24} className="text-white" strokeWidth={2} />
                },
                'To do': { 
                  bgColor: '#D1FAE5', 
                  iconBg: 'bg-[#10B981]', 
                  textColor: '#10B981',
                  icon: <CheckCircle size={24} className="text-white" strokeWidth={2} />
                },
              };

              const config = activityConfig[pathway.type] || activityConfig['Activity'];

              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    // If it's an Assessment, show the mobile app modal
                    if (pathway.type === "Assessment") {
                      setShowMobileAppModal(true);
                      return;
                    }
                    setCompletedTasks(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(index)) {
                        newSet.delete(index);
                      } else {
                        newSet.add(index);
                      }
                      return newSet;
                    });
                  }}
                  className={`relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all cursor-pointer group ${
                    isDark ? (isCompleted ? 'bg-white/10 border-2 border-white/20' : 'bg-white/5 hover:bg-white/8') : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {/* Checkbox */}
                  <div 
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#D1D5DB]'}`
                    }`}
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="text-white" size={14} />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className={`w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md ${config.iconBg}`}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm md:text-base mb-1.5 ${isDark ? 'text-white' : 'text-[#1F2937]'}`}>
                      {pathway.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs md:text-sm flex-wrap">
                      <span 
                        className="px-2.5 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: config.bgColor, color: config.textColor }}
                      >
                        {pathway.type}
                      </span>
                      {pathway.duration && (
                        <>
                          <span className={`hidden sm:inline ${isDark ? 'text-white/30' : 'text-[#D1D5DB]'}`}>•</span>
                          <span className={`items-center gap-1 hidden sm:flex ${isDark ? 'text-slate-400' : 'text-[#6B7280]'}`}>
                            <Clock size={13} />
                            {pathway.duration}
                          </span>
                        </>
                      )}
                      <span className={`hidden sm:inline ${isDark ? 'text-white/30' : 'text-[#D1D5DB]'}`}>•</span>
                      <span className="text-[#27AE60] flex items-center gap-1 font-medium">
                        <Award size={13} className="text-[#27AE60]" />
                        {pathway.points}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight 
                    className={`flex-shrink-0 transition-all ${isDark ? 'text-white/40' : 'text-[#D1D5DB]'}`} 
                    size={20} 
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
        )}

        {/* Trackers for Fitness (moved to top) */}
        {serviceId === "fitness" && service.trackers && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Trackers
              </h2>
              <p className={`text-sm ${t.subText}`}>
                Track your health metrics
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {service.trackers.map((tracker, i) => {
                const trackerIconMap = {
                  glucose: Box,
                  weight: Weight,
                  "blood-pressure": Gauge,
                  calories: Utensils,
                  "heart-rate": Activity,
                  cholesterol: Droplet,
                  water: GlassWater,
                  periods: CalendarDays,
                  mood: Smile,
                  meal: Utensils,
                  pregnancy: Baby,
                  sleep: Moon,
                  bmi: Ruler,
                  journal: BookOpen,
                  craving: Cigarette,
                  energy: Zap,
                  withdrawal: AlertCircle,
                  steps: FaRunning,
                  heartbeat: Heart,
                  assessment: ClipboardCheck,
                  watch: Eye,
                  index: BarChart,
                };
                const TrackerIcon = trackerIconMap[tracker.iconKey];
                if (!TrackerIcon) return null;
                return (
                  <motion.button
                    key={tracker.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.22 + i * 0.06 }}
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      if (tracker.link) {
                        if (tracker.link.startsWith('http')) {
                          window.open(tracker.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tracker.link);
                        }
                      } else {
                        setShowMobileAppModal(true);
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: tracker.grad }}
                    >
                      <TrackerIcon className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium ${t.headingText}`}>{tracker.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Try AI Diet Tracker Card - for Fitness & Nutrition */}
        {(serviceId === "fitness" || serviceId === "nutrition") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-4"
          >
            <motion.button
              onClick={() => setShowMobileAppModal(true)}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full relative overflow-hidden border ${t.cardBg} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group`}
            >
              {/* Background Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0">
                    <Utensils className="text-white" size={24} strokeWidth={2} />
                  </div>
                  
                  {/* Text Content */}
                  <div className="text-left">
                    <h3 className={`font-semibold text-lg mb-1 ${t.headingText} flex items-center gap-2`}>
                      Try AI Diet Tracker
                      <Sparkles className="text-[#10B981]" size={16} />
                    </h3>
                    <p className={`text-sm ${t.subText}`}>
                      Track your meals with AI-powered nutrition insights
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="text-white group-hover:translate-x-0.5 transition-transform" size={20} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* Expert Support Section */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {service.featureLinks ? (
            /* ── 3 separate button cards (e.g. Diabetes) ── */
            <div className="space-y-4">
              {service.featureLinks.map((link, i) => {
                const iconMap = {
                  chat: {
                    Icon: MessageCircle,
                    grad: "#00C0FF",
                    iconBg: "bg-white/20 backdrop-blur-sm",
                    iconColor: "text-white",
                    cardBg: isPurple ? "bg-gradient-to-r from-[#BE51F5] to-[#EE4F84]" : "bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]",
                    border: "border-transparent",
                    titleColor: "text-white",
                    subColor: "text-white/90",
                    arrowColor: "text-white",
                    arrowBg: "bg-white/20 backdrop-blur-sm",
                    shadowColor: "hover:shadow-2xl",
                    badge: "Live",
                    badgeBg: "bg-white/20 text-white border border-white/30",
                    shimmer: true,
                  },
                  brain: {
                    Icon: Library,
                    grad: "#FF9F43",
                    iconBg: "bg-[#FF9F43]",
                    iconColor: "text-white",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-[#1E293B]/25" : "border-slate-200",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: "text-[#FF9F43]",
                    arrowBg: "bg-[#FF9F43]/10",
                    shadowColor: "hover:shadow-md",
                    badge: "Learn",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#9B59B6]/30" : "bg-[#F3EEFF] text-[#9B59B6] border border-[#E8DCFF]",
                    shimmer: false,
                  },
                  tracker: {
                    Icon: Activity,
                    grad: "#27AE60",
                    iconBg: isDark ? "bg-[#1E293B]/50" : "bg-[#D5F5E3]",
                    iconColor: isDark ? "text-slate-300" : "text-[#27AE60]",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-white/10" : "border-[#A9DFBF]",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: isDark ? "text-slate-300" : "text-[#27AE60]",
                    shadowColor: isDark ? "hover:shadow-none" : "hover:shadow-md",
                    badge: "Track",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#27AE60]/30" : "bg-[#D5F5E3] text-[#27AE60] border border-[#A9DFBF]",
                    shimmer: false,
                  },
                  video: {
                    Icon: Play,
                    grad: "#FF9F43",
                    iconBg: isDark ? "bg-[#1E293B]/50" : "bg-[#FFF4E8]",
                    iconColor: isDark ? "text-slate-300" : "text-[#FF9F43]",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-white/10" : "border-[#FFE5CC]",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: isDark ? "text-slate-300" : "text-[#FF9F43]",
                    shadowColor: isDark ? "hover:shadow-none" : "hover:shadow-md",
                    badge: "Watch",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#FF9F43]/30" : "bg-[#FFF4E8] text-[#FF9F43] border border-[#FFE5CC]",
                    shimmer: false,
                  },
                  book: {
                    Icon: BookOpen,
                    grad: "#27AE60",
                    iconBg: isDark ? "bg-[#1E293B]/50" : "bg-[#D5F5E3]",
                    iconColor: isDark ? "text-slate-300" : "text-[#27AE60]",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-white/10" : "border-[#A9DFBF]",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: isDark ? "text-slate-300" : "text-[#27AE60]",
                    shadowColor: isDark ? "hover:shadow-none" : "hover:shadow-md",
                    badge: "Read",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#27AE60]/30" : "bg-[#D5F5E3] text-[#27AE60] border border-[#A9DFBF]",
                    shimmer: false,
                  },
                  selfcare: {
                    Icon: Sparkles,
                    grad: "#2563EB",
                    iconBg: isPurple ? "bg-[#EE4F84]" : "bg-[#2563EB]",
                    iconColor: "text-white",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-[#1E293B]/25" : "border-slate-200",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: isDark ? "text-[#2563EB]" : isPurple ? "text-[#EE4F84]" : "text-[#2563EB]",
                    arrowBg: isDark ? "bg-[#2563EB]/10" : isPurple ? "bg-[#EE4F84]/10" : "bg-[#2563EB]/10",
                    shadowColor: isDark ? "hover:shadow-none" : "hover:shadow-md",
                    badge: "Explore",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#2563EB]/30" : "bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE]",
                    shimmer: false,
                  },
                  pain: {
                    Icon: Star,
                    grad: "#FF9F43",
                    iconBg: "bg-[#FF9F43]",
                    iconColor: "text-white",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-[#1E293B]/25" : "border-slate-200",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: "text-[#FF9F43]",
                    arrowBg: "bg-[#FF9F43]/10",
                    shadowColor: "hover:shadow-md",
                    badge: "Pain",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#FF9F43]/30" : "bg-[#FFF4E8] text-[#FF9F43] border border-[#FFE5CC]",
                    shimmer: false,
                  },
                  coachbook: {
                    Icon: BookOpen,
                    grad: "#9B59B6",
                    iconBg: "bg-[#9B59B6]",
                    iconColor: "text-white",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-[#1E293B]/25" : "border-slate-200",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: "text-[#9B59B6]",
                    arrowBg: "bg-[#9B59B6]/10",
                    shadowColor: "hover:shadow-md",
                    badge: "Explore",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#9B59B6]/30" : "bg-[#F3EEFF] text-[#9B59B6] border border-[#E8DCFF]",
                    shimmer: false,
                  },
                  diagnostics: {
                    Icon: Activity,
                    grad: "#3B82F6",
                    iconBg: "bg-[#3B82F6]",
                    iconColor: "text-white",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-[#1E293B]/25" : "border-slate-200",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: "text-[#3B82F6]",
                    arrowBg: "bg-[#3B82F6]/10",
                    shadowColor: "hover:shadow-md",
                    badge: "Tests",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#3B82F6]/30" : "bg-[#DBEAFE] text-[#3B82F6] border border-[#BFDBFE]",
                    shimmer: false,
                  },
                  pharmacy: {
                    Icon: Pill,
                    grad: "#F97316",
                    iconBg: "bg-[#F97316]",
                    iconColor: "text-white",
                    cardBg: isDark ? "bg-[#1a2744]" : "bg-white",
                    border: isDark ? "border-[#1E293B]/25" : "border-slate-200",
                    titleColor: isDark ? "text-white" : "text-[#020817]",
                    subColor: isDark ? "text-slate-400" : "text-[#64748B]",
                    arrowColor: "text-[#F97316]",
                    arrowBg: "bg-[#F97316]/10",
                    shadowColor: "hover:shadow-md",
                    badge: "Pharmacy",
                    badgeBg: isDark ? "bg-[#1E293B]/50 text-slate-300 border border-[#F97316]/30" : "bg-[#FFEDD5] text-[#F97316] border border-[#FED7AA]",
                    shimmer: false,
                  },
                };
                const s = iconMap[link.iconType];
                return (
                  <div key={link.title}>
                  <motion.button
                    onClick={() => {
                      if (link.link) {
                        router.push(link.link);
                      } else if (link.title === "Talk to a Diabetologist" || link.title === "Talk to a Cardiologist" || link.title === "Talk to Our Care Team" || link.title === "Talk to a Women Expert" || link.title === "Talk to an Expert" || link.title === "Talk to a Fitness Instructor" || link.title === "Talk to a Dietitian" || link.title === "Talk to a Yoga Instructor" || link.title === "Talk to a Deaddiction Therapist" || link.title === "Talk to a Financial Advisor" || link.title === "Talk to an LGBTQ-Affirming Counselor" || link.title === "Talk to a Doctor") {
                        router.push("/care-team");
                      } else if (link.title === "Learn more about yourself") {
                        setShowMobileAppModal(true);
                      } else if ((link.title === "Academy" || link.title === "Academy (Wordpress)") && serviceId === "diabetes") {
                        router.push("/diabetes-academy");
                      } else if ((link.title === "Academy" || link.title === "Academy (Wordpress)") && serviceId === "hypertension") {
                        router.push("/hypertension-academy");
                      } else if (link.title === "Self Care Resources" && serviceId === "yoga") {
                        router.push("/yoga-self-care");
                      } else if (link.title === "Self Care Resources" && serviceId === "lgbtq") {
                        router.push("/lgbtq-self-care");
                      } else if ((link.title === "Self Care" || link.title === "Self Care (Wordpress)") && serviceId === "women-wellness") {
                        router.push("/women-wellness-self-care");
                      } else if ((link.title === "Self Care" || link.title === "Self Care (Wordpress)") && serviceId === "fitness") {
                        router.push("/fitness-self-care");
                      } else if (link.title === "Self Care" && serviceId === "nutrition") {
                        router.push("/nutrition-self-care");
                      } else if (link.title === "Self Care" && serviceId === "quit-smoking") {
                        router.push("/substance-use-self-care");
                      } else if (link.title === "Self Care" && (serviceId === "financial-wellness" || serviceId === "finance")) {
                        router.push("/financial-wellness-self-care");
                      } else if (link.title === "Self Care" && serviceId === "health-checks") {
                        router.push("/health-checks-self-care");
                      } else if (link.title === "Self Care") {
                        router.push("/self-care");
                      } else if (link.title === "Health Checks") {
                        router.push("/health-checks-packages");
                      } else if (link.title === "Diagnostic Tests") {
                        router.push("/diagnostic-tests");
                      } else if (link.title === "Medicines & Pharmacy") {
                        router.push("/medicines-pharmacy");
                      } else if (link.title === "Pain Areas") {
                        router.push("/pain-areas");
                      } else if (link.title === "Coaching Areas" || link.title === "Coaching Areas (Wordpress)") {
                        router.push("/coaching-areas");
                      }
                    }}
                    whileHover={link.iconType === "chat" ? { scale: 1.02, y: -2 } : link.iconType === "selfcare" ? { scale: 1.01 } : { y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                    className={`relative w-full flex items-center ${link.iconType === "chat" || link.iconType === "brain" || link.iconType === "selfcare" || link.iconType === "pain" || link.iconType === "coachbook" || link.iconType === "diagnostics" || link.iconType === "pharmacy" ? "justify-between" : "gap-4"} px-5 ${link.iconType === "chat" || link.iconType === "brain" || link.iconType === "selfcare" || link.iconType === "pain" || link.iconType === "coachbook" || link.iconType === "diagnostics" || link.iconType === "pharmacy" ? "py-5" : "py-4 md:py-5"} text-left ${s.cardBg} border ${link.iconType === "chat" ? "border-2" : "border"} ${s.border} rounded-2xl ${link.iconType === "chat" ? "shadow-lg" : "shadow-sm"} ${s.shadowColor} transition-all ${link.iconType === "chat" ? "duration-300" : ""} group overflow-hidden`}
                  >
                    {/* Shimmer sweep for chat/CTA card */}
                    {s.shimmer && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      {/* Icon */}
                      <div className={`relative ${link.iconType === "chat" ? "w-14 h-14 rounded-[18px]" : "w-14 h-14 rounded-2xl"} flex items-center justify-center flex-shrink-0 ${s.iconBg} ${link.iconType === "chat" ? "shadow-md" : ""}`}>
                        {s.shimmer ? (
                          <s.Icon size={24} className={s.iconColor} strokeWidth={2} />
                        ) : (
                          <s.Icon size={24} className={s.iconColor} strokeWidth={2} />
                        )}
                        {/* Live pulse for chat */}
                        {link.iconType === "chat" && false && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#5CAA82] rounded-full border-2 border-[#1E293B] animate-pulse shadow shadow-[#5CAA82]/50" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className={`text-base font-semibold ${s.titleColor}`}>{link.title}</h4>
                        <p className={`text-xs md:text-sm mt-1 ${s.subColor}`}>{link.subtitle}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-[14px] flex items-center justify-center ${link.iconType === "chat" ? "shadow-sm " + s.arrowBg : s.arrowBg}`}>
                      <ArrowRight className={`${s.arrowColor} group-hover:translate-x-1 transition-transform`} size={20} strokeWidth={2} />
                    </div>
                  </motion.button>

                  {/* Today's Plan for Nutrition - After Talk to a Nutrition Instructor */}
                  {i === 0 && serviceId === "nutrition" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Calendar className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#2563EB] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {showTodaysPlan && (
                        <motion.div 
                          className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div 
                            className="space-y-4"
                            variants={container}
                            initial="hidden"
                            animate="show"
                          >
                            {service.pathways.map((pathway, index) => {
                              const isCompleted = completedTasks.has(index);
                              
                              const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                                'Audio': { 
                                  bgColor: '#FEF3C7', 
                                  iconBg: 'bg-[#F59E0B]', 
                                  textColor: '#F59E0B',
                                  icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                                },
                                'Tracker': { 
                                  bgColor: '#DBEAFE', 
                                  iconBg: 'bg-[#3B82F6]', 
                                  textColor: '#3B82F6',
                                  icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                                },
                                'Assessment': { 
                                  bgColor: '#F3E8FF', 
                                  iconBg: 'bg-[#A855F7]', 
                                  textColor: '#A855F7',
                                  icon: <FileText size={20} className="text-white" strokeWidth={2} />
                                },
                                'Activity': { 
                                  bgColor: '#D1FAE5', 
                                  iconBg: 'bg-[#10B981]', 
                                  textColor: '#10B981',
                                  icon: <Activity size={20} className="text-white" strokeWidth={2} />
                                },
                                'Exercise': { 
                                  bgColor: '#DBEAFE', 
                                  iconBg: 'bg-[#3B82F6]', 
                                  textColor: '#3B82F6',
                                  icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                                },
                                'Tips': { 
                                  bgColor: '#FEF3C7', 
                                  iconBg: 'bg-[#F59E0B]', 
                                  textColor: '#F59E0B',
                                  icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                                },
                                'Video': { 
                                  bgColor: '#FEE2E2', 
                                  iconBg: 'bg-[#EF4444]', 
                                  textColor: '#EF4444',
                                  icon: <Play size={20} className="text-white" strokeWidth={2} />
                                },
                                'To do': { 
                                  bgColor: '#D1FAE5', 
                                  iconBg: 'bg-[#10B981]', 
                                  textColor: '#10B981',
                                  icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                                },
                              };

                              const config = activityConfig[pathway.type] || activityConfig['Activity'];

                              return (
                                <motion.div
                                  key={index}
                                  variants={item}
                                  whileHover={{ scale: 1.005 }}
                                  whileTap={{ scale: 0.995 }}
                                  onClick={() => {
                                    if (pathway.type === "Assessment") {
                                      setShowMobileAppModal(true);
                                      return;
                                    }
                                    setCompletedTasks(prev => {
                                      const newSet = new Set(prev);
                                      if (newSet.has(index)) {
                                        newSet.delete(index);
                                      } else {
                                        newSet.add(index);
                                      }
                                      return newSet;
                                    });
                                  }}
                                  className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                                >
                                  <div 
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                      isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : 'border-[#E5E7EB]'
                                    }`}
                                  >
                                    {isCompleted && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      >
                                        <CheckCircle className="text-white" size={12} />
                                      </motion.div>
                                    )}
                                  </div>
                                  
                                  <div 
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                                  >
                                    {config.icon}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm mb-1 ${t.headingText}`}>
                                      {pathway.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs flex-wrap">
                                      <span 
                                        className="px-2 py-0.5 rounded text-xs"
                                        style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                      >
                                        {pathway.type}
                                      </span>
                                      {pathway.duration && (
                                        <>
                                          <span className="text-[#D1D5DB]">•</span>
                                          <span className={`flex items-center gap-1 ${t.subText}`}>
                                            <Clock size={12} />
                                            {pathway.duration}
                                          </span>
                                        </>
                                      )}
                                      <span className="text-[#D1D5DB]">•</span>
                                      <span className="text-[#27AE60] flex items-center gap-1">
                                        <Award size={12} className="text-[#27AE60]" />
                                        {pathway.points}
                                      </span>
                                    </div>
                                  </div>

                                  <ChevronRight 
                                    className={`flex-shrink-0 transition-all ${t.subText}`} 
                                    size={18} 
                                  />
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Today's Plan for Diabetes - Between Talk to a Diabetologist and Academy */}
                  {i === 0 && serviceId === "diabetes" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for Substance Use - Between Talk to a Deaddiction Therapist and Self Care */}
                  {i === 0 && serviceId === "quit-smoking" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {showTodaysPlan && (
                        <motion.div 
                          className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div 
                            className="space-y-4"
                            variants={container}
                            initial="hidden"
                            animate="show"
                          >
                            {service.pathways.map((pathway, index) => {
                              const isCompleted = completedTasks.has(index);
                              
                              const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                                'Audio': { 
                                  bgColor: '#FEF3C7', 
                                  iconBg: 'bg-[#F59E0B]', 
                                  textColor: '#F59E0B',
                                  icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                                },
                                'Tracker': { 
                                  bgColor: '#DBEAFE', 
                                  iconBg: 'bg-[#3B82F6]', 
                                  textColor: '#3B82F6',
                                  icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                                },
                                'Assessment': { 
                                  bgColor: '#F3E8FF', 
                                  iconBg: 'bg-[#A855F7]', 
                                  textColor: '#A855F7',
                                  icon: <FileText size={20} className="text-white" strokeWidth={2} />
                                },
                                'Activity': { 
                                  bgColor: '#D1FAE5', 
                                  iconBg: 'bg-[#10B981]', 
                                  textColor: '#10B981',
                                  icon: <Activity size={20} className="text-white" strokeWidth={2} />
                                },
                                'Exercise': { 
                                  bgColor: '#DBEAFE', 
                                  iconBg: 'bg-[#3B82F6]', 
                                  textColor: '#3B82F6',
                                  icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                                },
                                'Tips': { 
                                  bgColor: '#FEF3C7', 
                                  iconBg: 'bg-[#F59E0B]', 
                                  textColor: '#F59E0B',
                                  icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                                },
                                'Video': { 
                                  bgColor: '#FEE2E2', 
                                  iconBg: 'bg-[#EF4444]', 
                                  textColor: '#EF4444',
                                  icon: <Play size={20} className="text-white" strokeWidth={2} />
                                },
                                'To do': { 
                                  bgColor: '#D1FAE5', 
                                  iconBg: 'bg-[#10B981]', 
                                  textColor: '#10B981',
                                  icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                                },
                              };

                              const config = activityConfig[pathway.type] || activityConfig['Activity'];

                              return (
                                <motion.div
                                  key={index}
                                  variants={item}
                                  whileHover={{ scale: 1.005 }}
                                  whileTap={{ scale: 0.995 }}
                                  onClick={() => {
                                    if (pathway.type === "Assessment") {
                                      setShowMobileAppModal(true);
                                      return;
                                    }
                                    setCompletedTasks(prev => {
                                      const newSet = new Set(prev);
                                      if (newSet.has(index)) {
                                        newSet.delete(index);
                                      } else {
                                        newSet.add(index);
                                      }
                                      return newSet;
                                    });
                                  }}
                                  className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                                >
                                  <div 
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                      isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                                    }`}
                                  >
                                    {isCompleted && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      >
                                        <Check className="text-white" size={12} strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </div>
                                  
                                  <div 
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                                  >
                                    {config.icon}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                      {pathway.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs flex-wrap">
                                      <span 
                                        className="px-2 py-0.5 rounded text-xs font-medium"
                                        style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                      >
                                        {pathway.type}
                                      </span>
                                      {pathway.duration && (
                                        <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                          <Clock size={12} />
                                          {pathway.duration}
                                        </span>
                                      )}
                                      <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                        <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                        {pathway.points}
                                      </span>
                                    </div>
                                  </div>

                                  <ChevronRight 
                                    className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                                    size={20} 
                                  />
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Today's Plan for Women Wellness - Between Talk to a Women Expert and Self Care */}
                  {i === 0 && serviceId === "women-wellness" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {/* Today's Plan Content (Collapsible) */}
                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        // Map activity types to colors and icon components
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              // If it's an Assessment, show the mobile app modal
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            {/* Checkbox */}
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Icon */}
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for Coaching - Between Talk to an Expert and Coaching Areas */}
                  {i === 0 && serviceId === "coach" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {/* Today's Plan Content (Collapsible) */}
                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        // Map activity types to colors and icon components
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              // If it's an Assessment, show the mobile app modal
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            {/* Checkbox */}
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Icon */}
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for Hypertension - Between Talk to an Expert and Service Areas */}
                  {i === 0 && serviceId === "hypertension" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {/* Today's Plan Content (Collapsible) */}
                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        // Map activity types to colors and icon components
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              // If it's an Assessment, show the mobile app modal
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            {/* Checkbox */}
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Icon */}
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for Fitness - Between Talk to an Expert and Service Areas */}
                  {i === 0 && serviceId === "fitness" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Calendar className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {/* Today's Plan Content (Collapsible) */}
                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        // Map activity types to colors and icon components
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              // If it's an Assessment, show the mobile app modal
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            {/* Checkbox */}
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Icon */}
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for Yoga - After first feature link */}
                  {i === 0 && serviceId === "yoga" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {/* Today's Plan Content (Collapsible) */}
                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        // Map activity types to colors and icon components
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              // If it's an Assessment, show the mobile app modal
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            {/* Checkbox */}
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Icon */}
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for Financial Wellness - Between Talk to a Financial Advisor and Self Care */}
                  {i === 0 && (serviceId === "financial-wellness" || serviceId === "finance") && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {/* Today's Plan Content (Collapsible) */}
                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        // Map activity types to colors and icon components
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                              icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              // If it's an Assessment, show the mobile app modal
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            {/* Checkbox */}
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Icon */}
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} 
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  {/* Today's Plan for LGBTQ - Between Talk to an LGBTQ-Affirming Counselor and Self Care Resources */}
                  {i === 0 && serviceId === "lgbtq" && (
                    <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                      <motion.button
                        onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Star className="text-white" size={24} strokeWidth={2} />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                                Today's Plan
                              </h3>
                              <p className={`text-xs md:text-sm ${t.subText}`}>
                                Complete your daily wellness activities
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                        </div>
                      </motion.button>

                      {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                      <motion.div 
                      className="space-y-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {service.pathways.map((pathway, index) => {
                        const isCompleted = completedTasks.has(index);
                        
                        const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                          'Audio': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tracker': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                          },
                          'Assessment': { 
                            bgColor: '#F3E8FF', 
                            iconBg: 'bg-[#A855F7]', 
                            textColor: '#A855F7',
                            icon: <FileText size={20} className="text-white" strokeWidth={2} />
                          },
                          'Activity': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <Activity size={20} className="text-white" strokeWidth={2} />
                          },
                          'Exercise': { 
                            bgColor: '#DBEAFE', 
                            iconBg: 'bg-[#3B82F6]', 
                            textColor: '#3B82F6',
                            icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                          },
                          'Tips': { 
                            bgColor: '#FEF3C7', 
                            iconBg: 'bg-[#F59E0B]', 
                            textColor: '#F59E0B',
                            icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                          },
                          'Video': { 
                            bgColor: '#FEE2E2', 
                            iconBg: 'bg-[#EF4444]', 
                            textColor: '#EF4444',
                            icon: <Play size={20} className="text-white" strokeWidth={2} />
                          },
                          'To do': { 
                            bgColor: '#D1FAE5', 
                            iconBg: 'bg-[#10B981]', 
                            textColor: '#10B981',
                            icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                          },
                        };

                        const config = activityConfig[pathway.type] || activityConfig['Activity'];

                        return (
                          <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => {
                              if (pathway.type === "Assessment") {
                                setShowMobileAppModal(true);
                                return;
                              }
                              setCompletedTasks(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                  newSet.delete(index);
                                } else {
                                  newSet.add(index);
                                }
                                return newSet;
                              });
                            }}
                            className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                          >
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                              }`}
                            >
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="text-white" size={12} strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            
                            <div 
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              {config.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                {pathway.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                >
                                  {pathway.type}
                                </span>
                                {pathway.duration && (
                                  <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                    <Clock size={12} />
                                    {pathway.duration}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                  <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                  {pathway.points}
                                </span>
                              </div>
                            </div>

                            <ChevronRight 
                              className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                              size={20} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                    )}
                    </div>
                  )}

                  </div>
                );
              })}
            </div>
          ) : (
            /* ── Default two-card layout ── */
            <>
              <div className="space-y-4">
                {/* Hide Talk to a Therapist for meditation service */}
                {serviceId !== "meditation" && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/care-team")}
                  className={`w-full relative overflow-hidden ${isDark ? "bg-gradient-to-br from-[#1a2744] to-[#0f172a] border-[#1E293B]/50" : "bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]"} border-2 border-transparent rounded-2xl px-5 py-5 flex items-center justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 ${isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/20 backdrop-blur-sm"} rounded-[18px] flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <MessageCircle className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className={`text-base font-semibold ${isDark ? "text-white" : "text-white"}`}>Talk to a Therapist</h4>
                      <p className={`text-xs mt-1 ${isDark ? "text-slate-300" : "text-white/90"} font-medium`}>Professional Care, Counseling & Therapeutic Support</p>
                    </div>
                  </div>
                  <div className={`relative z-10 w-10 h-10 ${isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/20 backdrop-blur-sm"} rounded-[14px] flex items-center justify-center shadow-sm`}>
                    <ArrowRight className="text-white group-hover:translate-x-1 transition-transform flex-shrink-0" size={20} strokeWidth={2} />
                  </div>
                </motion.button>
                )}

                {/* Today's Plan for Women Wellness - Between Talk to a Women Expert and Self Care */}
                {serviceId === "women-wellness" && (
                  <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mt-4`}>
                    <motion.button
                      onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Star className="text-white" size={24} strokeWidth={2} />
                          </div>
                          <div className="text-left">
                            <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                              Today's Plan
                            </h3>
                            <p className={`text-xs md:text-sm ${t.subText}`}>
                              Complete your daily wellness activities
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                      </div>
                    </motion.button>

                    {/* Today's Plan Content (Collapsible) */}
                    {showTodaysPlan && (
                    <motion.div 
                      className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                    <motion.div 
                    className="space-y-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {service.pathways.map((pathway, index) => {
                      const isCompleted = completedTasks.has(index);
                      
                      // Map activity types to colors and icon components
                      const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                        'Audio': { 
                          bgColor: '#FEF3C7', 
                          iconBg: 'bg-[#F59E0B]', 
                          textColor: '#F59E0B',
                          icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                        },
                        'Tracker': { 
                          bgColor: '#DBEAFE', 
                          iconBg: 'bg-[#3B82F6]', 
                          textColor: '#3B82F6',
                          icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                        },
                        'Assessment': { 
                          bgColor: '#F3E8FF', 
                          iconBg: 'bg-[#A855F7]', 
                          textColor: '#A855F7',
                            icon: <FileText size={20} className="text-white" strokeWidth={2} />
                        },
                        'Activity': { 
                          bgColor: '#D1FAE5', 
                          iconBg: 'bg-[#10B981]', 
                          textColor: '#10B981',
                          icon: <Activity size={20} className="text-white" strokeWidth={2} />
                        },
                        'Exercise': { 
                          bgColor: '#DBEAFE', 
                          iconBg: 'bg-[#3B82F6]', 
                          textColor: '#3B82F6',
                          icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                        },
                        'Tips': { 
                          bgColor: '#FEF3C7', 
                          iconBg: 'bg-[#F59E0B]', 
                          textColor: '#F59E0B',
                          icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                        },
                        'Video': { 
                          bgColor: '#FEE2E2', 
                          iconBg: 'bg-[#EF4444]', 
                          textColor: '#EF4444',
                          icon: <Play size={20} className="text-white" strokeWidth={2} />
                        },
                        'To do': { 
                          bgColor: '#D1FAE5', 
                          iconBg: 'bg-[#10B981]', 
                          textColor: '#10B981',
                          icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                        },
                      };

                      const config = activityConfig[pathway.type] || activityConfig['Activity'];

                      return (
                        <motion.div
                          key={index}
                          variants={item}
                          whileHover={{ scale: 1.005 }}
                          whileTap={{ scale: 0.995 }}
                          onClick={() => {
                            // If it's an Assessment, show the mobile app modal
                            if (pathway.type === "Assessment") {
                              setShowMobileAppModal(true);
                              return;
                            }
                            setCompletedTasks(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(index)) {
                                newSet.delete(index);
                              } else {
                                newSet.add(index);
                              }
                              return newSet;
                            });
                          }}
                          className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                        >
                          {/* Checkbox */}
                          <div 
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                            }`}
                          >
                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Check className="text-white" size={12} strokeWidth={3} />
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Icon */}
                          <div 
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                          >
                            {config.icon}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                              {pathway.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs flex-wrap">
                              <span 
                                className="px-2 py-0.5 rounded text-xs font-medium"
                                style={{ backgroundColor: config.bgColor, color: config.textColor }}
                              >
                                {pathway.type}
                              </span>
                              {pathway.duration && (
                                <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                  <Clock size={12} />
                                  {pathway.duration}
                                </span>
                              )}
                              <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                {pathway.points}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight 
                            className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                            size={20} 
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
                  )}
                  </div>
                )}

                {/* Today's Plan for Emotional Wellbeing - Between Talk to a Therapist and Self Care Resources */}
                {serviceId === "emotional-wellbeing" && (
                  <div className={`border ${t.cardBg} rounded-2xl mb-4 shadow-sm overflow-hidden`}>
                    <motion.button
                      onClick={() => setShowTodaysPlan(!showTodaysPlan)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Star className="text-white" size={24} strokeWidth={2} />
                          </div>
                          <div className="text-left">
                            <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                              Today's Plan
                            </h3>
                            <p className={`text-xs md:text-sm ${t.subText}`}>
                              Complete your daily wellness activities
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
                      </div>
                    </motion.button>

                    {showTodaysPlan && (
                      <motion.div 
                        className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="space-y-4"
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          {service.pathways.map((pathway, index) => {
                            const isCompleted = completedTasks.has(index);
                            
                            const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                              'Audio': { 
                                bgColor: '#FEF3C7', 
                                iconBg: 'bg-[#F59E0B]', 
                                textColor: '#F59E0B',
                                icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                              },
                              'Tracker': { 
                                bgColor: '#DBEAFE', 
                                iconBg: 'bg-[#3B82F6]', 
                                textColor: '#3B82F6',
                                icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                              },
                              'Assessment': { 
                                bgColor: '#F3E8FF', 
                                iconBg: 'bg-[#A855F7]', 
                                textColor: '#A855F7',
                                icon: <FileText size={20} className="text-white" strokeWidth={2} />
                              },
                              'Activity': { 
                                bgColor: '#D1FAE5', 
                                iconBg: 'bg-[#10B981]', 
                                textColor: '#10B981',
                                icon: <Activity size={20} className="text-white" strokeWidth={2} />
                              },
                              'Exercise': { 
                                bgColor: '#DBEAFE', 
                                iconBg: 'bg-[#3B82F6]', 
                                textColor: '#3B82F6',
                                icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                              },
                              'Tips': { 
                                bgColor: '#FEF3C7', 
                                iconBg: 'bg-[#F59E0B]', 
                                textColor: '#F59E0B',
                                icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                              },
                              'Video': { 
                                bgColor: '#FEE2E2', 
                                iconBg: 'bg-[#EF4444]', 
                                textColor: '#EF4444',
                                icon: <Play size={20} className="text-white" strokeWidth={2} />
                              },
                              'To do': { 
                                bgColor: '#D1FAE5', 
                                iconBg: 'bg-[#10B981]', 
                                textColor: '#10B981',
                                icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                              },
                            };

                            const config = activityConfig[pathway.type] || activityConfig['Activity'];

                            return (
                              <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ scale: 1.005 }}
                                whileTap={{ scale: 0.995 }}
                                onClick={() => {
                                  if (pathway.type === "Assessment") {
                                    setShowMobileAppModal(true);
                                    return;
                                  }
                                  setCompletedTasks(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(index)) {
                                      newSet.delete(index);
                                    } else {
                                      newSet.add(index);
                                    }
                                    return newSet;
                                  });
                                }}
                                className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                              >
                                <div 
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                                  }`}
                                >
                                  {isCompleted && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      <Check className="text-white" size={12} strokeWidth={3} />
                                    </motion.div>
                                  )}
                                </div>
                                
                                <div 
                                  className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                                >
                                  {config.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                                    {pathway.title}
                                  </h3>
                                  <div className="flex items-center gap-2 text-xs flex-wrap">
                                    <span 
                                      className="px-2 py-0.5 rounded text-xs font-medium"
                                      style={{ backgroundColor: config.bgColor, color: config.textColor }}
                                    >
                                      {pathway.type}
                                    </span>
                                    {pathway.duration && (
                                      <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                                        <Clock size={12} />
                                        {pathway.duration}
                                      </span>
                                    )}
                                    <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                                      <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                                      {pathway.points}
                                    </span>
                                  </div>
                                </div>

                                <ChevronRight 
                                  className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                                  size={20} 
                                />
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (serviceId === "emotional-wellbeing") {
                      router.push("/self-care");
                    }
                  }}
                  className={`w-full ${isDark ? "bg-[#1a2744] border-[#1E293B]/25" : "bg-white border-slate-200"} border rounded-2xl px-5 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#FF9F43] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className={`text-base font-semibold ${t.headingText}`}>{serviceId === "meditation" ? "Resources" : "Self Care Resources (Wordpress)"}</h4>
                      <p className={`text-xs mt-1 ${t.subText}`}>Mindfulness & guided sessions</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#FF9F43]/10 rounded-[14px] flex items-center justify-center flex-shrink-0">
                    <ArrowRight className={`${isDark ? "text-[#FF9F43]" : "text-[#FF9F43]"} group-hover:translate-x-1 transition-transform`} size={20} strokeWidth={2} />
                  </div>
                </motion.button>
              </div>
            </>
          )}
        </motion.div>

        {/* Custom Quick Tools for Emotional Wellbeing */}
        {serviceId === "emotional-wellbeing" && service.quickTools && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-5 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-5">
              <h2 className={`text-base md:text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className="text-[#00c0ff]" size={18} />
                Quick Tools
              </h2>
              <p className={`text-xs md:text-sm ${t.subText}`}>
                Access helpful resources instantly
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 md:gap-4 overflow-x-auto pb-2">
              {service.quickTools.map((tool, i) => {
                const ToolIcon = tool.Icon;
                return (
                  <motion.button
                    key={tool.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="flex flex-col items-center gap-2.5 min-w-[80px] md:min-w-[90px]"
                    onClick={() => {
                      if (tool.link) {
                        if (tool.link.startsWith('http')) {
                          window.open(tool.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tool.link);
                        }
                      } else {
                        setShowMobileAppModal(true);
                      }
                    }}
                  >
                    <div 
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[20px] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                      style={{ backgroundColor: tool.grad }}
                    >
                      <ToolIcon className="text-white" size={24} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium text-center leading-tight ${t.headingText}`}>
                      {tool.label}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Quick Tools for Coaching */}
        {serviceId === "coach" && service.quickTools && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Quick Tools
              </h2>
              <p className={`text-sm ${t.subText}`}>
                Access helpful resources instantly
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {service.quickTools.map((tool, i) => (
                <motion.button
                  key={tool.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.42 + i * 0.06 }}
                  className="flex flex-col items-center gap-2"
                  onClick={() => {
                    if (tool.link === null) {
                      setShowMobileAppModal(true);
                    } else if (tool.link) {
                      if (tool.link.startsWith('http')) {
                        window.open(tool.link, '_blank', 'noopener,noreferrer');
                      } else {
                        router.push(tool.link);
                      }
                    }
                  }}
                >
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: tool.grad }}
                  >
                    <tool.Icon className="text-white" size={28} strokeWidth={2} />
                  </div>
                  <p className={`text-xs font-medium ${t.headingText}`}>{tool.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trackers for Coaching */}
        {serviceId === "coach" && service.trackers && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Trackers
              </h2>
              <p className={`text-sm ${t.subText}`}>
                Track your health metrics
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {service.trackers.map((tracker, i) => {
                const trackerIconMap = {
                  glucose: Box,
                  weight: Weight,
                  "blood-pressure": Gauge,
                  calories: Utensils,
                  "heart-rate": Activity,
                  cholesterol: Droplet,
                  water: GlassWater,
                  periods: CalendarDays,
                  mood: Smile,
                  meal: Utensils,
                  pregnancy: Baby,
                  sleep: Moon,
                  bmi: Ruler,
                  journal: BookOpen,
                  craving: Cigarette,
                  energy: Zap,
                  withdrawal: AlertCircle,
                  steps: FaRunning,
                  heartbeat: Heart,
                  assessment: ClipboardCheck,
                  watch: Eye,
                  index: BarChart,
                };
                const TrackerIcon = trackerIconMap[tracker.iconKey];
                if (!TrackerIcon) return null;
                return (
                  <motion.button
                    key={tracker.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.52 + i * 0.06 }}
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      if (tracker.link) {
                        if (tracker.link.startsWith('http')) {
                          window.open(tracker.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tracker.link);
                        }
                      } else {
                        setShowMobileAppModal(true);
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: tracker.grad }}
                    >
                      <TrackerIcon className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium ${t.headingText}`}>{tracker.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Popular Categories */}
        {service.popularCategories && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className={`text-base md:text-lg px-1 ${t.headingText}`}>Popular Categories</h3>
              <button className={`text-xs md:text-sm flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${t.seeAllBtn}`}>
                See All <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {service.popularCategories.map((cat, i) => {
                const catIconMap: Record<string, React.ElementType> = {
                  meditate:    Circle,
                  sleep:       Moon,
                  music:       Music,
                  dailies:     Sunrise,
                  soundscapes: Waves,
                  work:        Coffee,
                  mental:      Heart,
                  pride:       Sparkles,
                };
                const Icon = catIconMap[cat.iconKey] ?? Wind;
                return (
                  <motion.button
                    key={cat.name}
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.28 + i * 0.06 }}
                    className={`${isDark ? "bg-[#1A2744] hover:bg-[#1f3060]" : "bg-[#EEF4FF] hover:bg-[#E2ECF5]"} rounded-2xl py-6 px-3 flex flex-col items-center gap-3 transition-all group`}
                  >
                    <Icon size={26} className={`${isDark ? "text-white" : "text-[#1E293B]"} group-hover:scale-110 transition-transform duration-200`} strokeWidth={1.5} />
                    <span className={`text-xs md:text-sm text-center leading-tight ${isDark ? "text-white" : "text-[#020817]"}`}>{cat.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Your Favorites */}
        {service.yourFavorites && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className={`text-base md:text-lg px-1 ${t.headingText}`}>Your Favorites</h3>
              <button className={`text-xs md:text-sm flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${t.seeAllBtn}`}>
                See All <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-5 md:gap-7">
              {service.yourFavorites.map((fav, i) => (
                <motion.button
                  key={fav.title}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.32 + i * 0.1 }}
                  className="flex flex-col items-center gap-2.5 group"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 ${isDark ? "border-white/20 group-hover:border-white/50" : "border-[#E2E8F0] group-hover:border-[#0D9488]"} shadow-lg transition-all`}>
                    <ImageWithFallback
                      src={fav.image}
                      alt={fav.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className={`text-xs md:text-sm text-center max-w-[96px] leading-snug ${t.subText}`}>{fav.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Today's Plan - Pathways Section (for physiotherapy only) */}
        {serviceId === "physiotherapy" && (
        <>
          <div className={`border ${t.cardBg} rounded-2xl mb-4 shadow-sm overflow-hidden`}>
            {/* Today's Plan Accordion Button */}
            <motion.button
              onClick={() => setShowTodaysPlan(!showTodaysPlan)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Star className="text-white" size={24} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                      Today's Plan
                    </h3>
                    <p className={`text-xs md:text-sm ${t.subText}`}>
                      Complete your daily wellness activities
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </motion.button>

            {/* Today's Plan Content (Collapsible) */}
            {showTodaysPlan && (
            <motion.div 
              className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
            <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {service.pathways.map((pathway, index) => {
              const isCompleted = completedTasks.has(index);
              
              // Map activity types to colors and icon components
              const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                'Audio': { 
                  bgColor: '#FEF3C7', 
                  iconBg: 'bg-[#F59E0B]', 
                  textColor: '#F59E0B',
                  icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                },
                'Tracker': { 
                  bgColor: '#DBEAFE', 
                  iconBg: 'bg-[#3B82F6]', 
                  textColor: '#3B82F6',
                  icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                },
                'Assessment': { 
                  bgColor: '#F3E8FF', 
                  iconBg: 'bg-[#A855F7]', 
                  textColor: '#A855F7',
                    icon: <FileText size={20} className="text-white" strokeWidth={2} />
                },
                'Activity': { 
                  bgColor: '#D1FAE5', 
                  iconBg: 'bg-[#10B981]', 
                  textColor: '#10B981',
                  icon: <Activity size={20} className="text-white" strokeWidth={2} />
                },
                'Exercise': { 
                  bgColor: '#DBEAFE', 
                  iconBg: 'bg-[#3B82F6]', 
                  textColor: '#3B82F6',
                  icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                },
                'Tips': { 
                  bgColor: '#FEF3C7', 
                  iconBg: 'bg-[#F59E0B]', 
                  textColor: '#F59E0B',
                  icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                },
                'Video': { 
                  bgColor: '#FEE2E2', 
                  iconBg: 'bg-[#EF4444]', 
                  textColor: '#EF4444',
                  icon: <Play size={20} className="text-white" strokeWidth={2} />
                },
                'To do': { 
                  bgColor: '#D1FAE5', 
                  iconBg: 'bg-[#10B981]', 
                  textColor: '#10B981',
                  icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                },
              };

              const config = activityConfig[pathway.type] || activityConfig['Activity'];

              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => {
                    // If it's an Assessment, show the mobile app modal
                    if (pathway.type === "Assessment") {
                      setShowMobileAppModal(true);
                      return;
                    }
                    setCompletedTasks(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(index)) {
                        newSet.delete(index);
                      } else {
                        newSet.add(index);
                      }
                      return newSet;
                    });
                  }}
                  className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                >
                  {/* Checkbox */}
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                    }`}
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="text-white" size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                      {pathway.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span 
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: config.bgColor, color: config.textColor }}
                      >
                        {pathway.type}
                      </span>
                      {pathway.duration && (
                        <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                          <Clock size={12} />
                          {pathway.duration}
                        </span>
                      )}
                      <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                        <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                        {pathway.points}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight 
                    className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                    size={20} 
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
          )}
          </div>
        </>
        )}

        {/* Recommended Exercise Plans for Physiotherapy */}
        {serviceId === "physiotherapy" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`border ${t.cardBg} rounded-2xl p-5 md:p-6 mb-4 shadow-sm`}
          >
            {/* Section Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Activity className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={18} strokeWidth={2.5} />
                <h2 className={`text-lg font-semibold ${t.headingText}`}>
                  Recommended Exercise Plans
                </h2>
              </div>
              <p className={`text-sm ${t.subText}`}>
                Personalized programs designed for your recovery journey
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Lower back exercises */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={`relative ${t.cardBg} border-2 border-transparent hover:border-[#EC4899]/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer`}
              >
                {/* Gradient accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EC4899]"></div>
                
                <div className="flex items-start gap-3 md:gap-4 mb-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      <FaDumbbell className="text-[#EC4899]" size={22} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#EC4899] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      6
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base md:text-lg mb-1 ${t.headingText}`}>Lower back exercises</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs ${t.subText}`}>
                        <Clock size={12} /> 14 mins
                      </span>
                      <span className="text-[#E2E8F0]">•</span>
                      <span className={`inline-flex items-center gap-1 text-xs ${t.subText}`}>
                        <Calendar size={12} /> 3x week
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-[#FCE7F3] text-[#EC4899] text-xs font-medium rounded-full`}>
                        Beginner
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3 pl-0 md:pl-[72px]">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setQuickStartPlan({ title: "Lower back exercises", color: "#EC4899" })}
                    className="border-2 border-[#EC4899] text-[#EC4899] px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:bg-[#EC4899]/5 transition-all flex items-center justify-center gap-1"
                  >
                    <Play size={14} /> AI Guided
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/exercise-details/lower-back-exercises")}
                    className="bg-[#EC4899] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
                  >
                    Explore <ChevronRight size={14} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Neck rehabilitation */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={`relative ${t.cardBg} border-2 border-transparent hover:border-[#14B8A6]/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer`}
              >
                {/* Gradient accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#14B8A6]"></div>
                
                <div className="flex items-start gap-3 md:gap-4 mb-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#CCFBF1] to-[#99F6E4] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      <GiNightSleep className="text-[#14B8A6]" size={24} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#14B8A6] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      4
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base md:text-lg mb-1 ${t.headingText}`}>Neck rehabilitation</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs ${t.subText}`}>
                        <Clock size={12} /> 8 mins
                      </span>
                      <span className="text-[#E2E8F0]">•</span>
                      <span className={`inline-flex items-center gap-1 text-xs ${t.subText}`}>
                        <Calendar size={12} /> Daily
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-[#CCFBF1] text-[#14B8A6] text-xs font-medium rounded-full`}>
                        Gentle
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3 pl-0 md:pl-[72px]">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setQuickStartPlan({ title: "Neck rehabilitation", color: "#14B8A6" })}
                    className="border-2 border-[#14B8A6] text-[#14B8A6] px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:bg-[#14B8A6]/5 transition-all flex items-center justify-center gap-1"
                  >
                    <Play size={14} /> AI Guided
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/exercise-details/neck-rotations")}
                    className="bg-[#14B8A6] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
                  >
                    Explore <ChevronRight size={14} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Upper back exercises */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={`relative ${t.cardBg} border-2 border-transparent hover:border-[#FB923C]/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer`}
              >
                {/* Gradient accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FB923C]"></div>
                
                <div className="flex items-start gap-3 md:gap-4 mb-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FFF4ED] to-[#FFEDD5] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      <FaRunning className="text-[#FB923C]" size={22} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FB923C] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      6
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base md:text-lg mb-1 ${t.headingText}`}>Upper back exercises</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs ${t.subText}`}>
                        <Clock size={12} /> 12 mins
                      </span>
                      <span className="text-[#E2E8F0]">•</span>
                      <span className={`inline-flex items-center gap-1 text-xs ${t.subText}`}>
                        <Calendar size={12} /> 3x week
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFF4ED] text-[#FB923C] text-xs font-medium rounded-full`}>
                        Moderate
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pl-0 md:pl-[72px]">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/exercise-details/upper-back-exercises")}
                    className="w-full bg-[#FB923C] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
                  >
                    Explore <ChevronRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* View All Link */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ x: 4 }}
              onClick={() => router.push("/exercise-plans")}
              className={`${isPurple ? "text-[#EE4F84] hover:text-[#BE51F5]" : "text-[#00c0ff] hover:text-[#0284c7]"} font-semibold text-sm mt-5 flex items-center gap-2 mx-auto group`}
            >
              View All Exercise Plans 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        {/* Today's Plan for Teleconsultation - Above Quick Tools */}
        {serviceId === "teleconsultation" && service.pathways && (
          <div className={`border ${t.cardBg} rounded-2xl shadow-sm overflow-hidden mb-4`}>
            <motion.button
              onClick={() => setShowTodaysPlan(!showTodaysPlan)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={`w-full p-4 md:p-5 hover:bg-opacity-80 transition-all group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Star className="text-white" size={24} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-semibold text-base mb-0.5 ${t.headingText}`}>
                      Today's Plan
                    </h3>
                    <p className={`text-xs md:text-sm ${t.subText}`}>
                      Complete your daily wellness activities
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-[#F97316] flex-shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </motion.button>

            {showTodaysPlan && (
            <motion.div 
              className={`px-5 md:px-6 pb-5 md:pb-6 pt-2.5`}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
            <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {service.pathways.map((pathway, index) => {
              const isCompleted = completedTasks.has(index);
              
              const activityConfig: Record<string, { bgColor: string; iconBg: string; textColor: string; icon: React.ReactNode }> = {
                'Audio': { 
                  bgColor: '#FEF3C7', 
                  iconBg: 'bg-[#F59E0B]', 
                  textColor: '#F59E0B',
                  icon: <Headphones size={20} className="text-white" strokeWidth={2} />
                },
                'Tracker': { 
                  bgColor: '#DBEAFE', 
                  iconBg: 'bg-[#3B82F6]', 
                  textColor: '#3B82F6',
                  icon: <BarChart3 size={20} className="text-white" strokeWidth={2} />
                },
                'Assessment': { 
                  bgColor: '#F3E8FF', 
                  iconBg: 'bg-[#A855F7]', 
                  textColor: '#A855F7',
                    icon: <FileText size={20} className="text-white" strokeWidth={2} />
                },
                'Activity': { 
                  bgColor: '#D1FAE5', 
                  iconBg: 'bg-[#10B981]', 
                  textColor: '#10B981',
                  icon: <Activity size={20} className="text-white" strokeWidth={2} />
                },
                'Exercise': { 
                  bgColor: '#DBEAFE', 
                  iconBg: 'bg-[#3B82F6]', 
                  textColor: '#3B82F6',
                  icon: <BookOpen size={20} className="text-white" strokeWidth={2} />
                },
                'Tips': { 
                  bgColor: '#FEF3C7', 
                  iconBg: 'bg-[#F59E0B]', 
                  textColor: '#F59E0B',
                  icon: <Sparkles size={20} className="text-white" strokeWidth={2} />
                },
                'Video': { 
                  bgColor: '#FEE2E2', 
                  iconBg: 'bg-[#EF4444]', 
                  textColor: '#EF4444',
                  icon: <Play size={20} className="text-white" strokeWidth={2} />
                },
                'To do': { 
                  bgColor: '#D1FAE5', 
                  iconBg: 'bg-[#10B981]', 
                  textColor: '#10B981',
                  icon: <CheckCircle size={20} className="text-white" strokeWidth={2} />
                },
              };

              const config = activityConfig[pathway.type] || activityConfig['Activity'];

              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => {
                    if (pathway.type === "Assessment") {
                      setShowMobileAppModal(true);
                      return;
                    }
                    setCompletedTasks(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(index)) {
                        newSet.delete(index);
                      } else {
                        newSet.add(index);
                      }
                      return newSet;
                    });
                  }}
                  className="relative flex items-center gap-3 py-3 transition-all cursor-pointer group"
                >
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isCompleted ? 'bg-[#00c0ff] border-[#00c0ff]' : `${isDark ? 'border-white/25' : 'border-[#E5E7EB]'}`
                    }`}
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="text-white" size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>
                  
                  <div 
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                  >
                    {config.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm md:text-base mb-1 font-medium ${isDark ? 'text-white' : 'text-[#374151]'}`}>
                      {pathway.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span 
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: config.bgColor, color: config.textColor }}
                      >
                        {pathway.type}
                      </span>
                      {pathway.duration && (
                        <span className={`${isDark ? 'text-slate-400' : 'text-[#9CA3AF]'} flex items-center gap-1`}>
                          <Clock size={12} />
                          {pathway.duration}
                        </span>
                      )}
                      <span className={`${isDark ? 'text-slate-400' : 'text-[#10B981]'} flex items-center gap-1 font-medium`}>
                        <Award size={12} className={isDark ? 'text-slate-400' : 'text-[#10B981]'} />
                        {pathway.points}
                      </span>
                    </div>
                  </div>

                  <ChevronRight 
                    className={`flex-shrink-0 transition-all ${isDark ? 'text-white/20' : 'text-[#E5E7EB]'} group-hover:text-[#9CA3AF]`} 
                    size={20} 
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
          )}
          </div>
        )}

        {/* Trackers or Quick Tools Grid */}
        {(service.trackers || !service.trackers) && serviceId !== "fitness" && serviceId !== "nutrition" && serviceId !== "meditation" && serviceId !== "health-checks" && serviceId !== "coach" && serviceId !== "teleconsultation" && serviceId !== "quit-smoking" && serviceId !== "emotional-wellbeing" && (
          <motion.div 
            className={`relative border ${t.cardBg} rounded-3xl p-6 md:p-8 ${serviceId === "physiotherapy" ? "mb-4" : "mb-6 md:mb-8"} shadow-sm overflow-hidden`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-5" style={{ background: isPurple ? '#EE4F84' : '#00c0ff' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-5" style={{ background: isPurple ? '#BE51F5' : '#2563EB' }} />
            
            <div className="relative z-10 mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-2.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPurple ? 'bg-[#EE4F84]/10' : 'bg-[#00c0ff]/10'}`}>
                  <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={20} strokeWidth={2.5} />
                </div>
                <h2 className={`text-2xl font-bold ${t.headingText}`}>
                  {service.trackers ? "Trackers" : "Quick Tools"}
                </h2>
              </div>
              <p className={`text-sm md:text-base ml-13 ${t.subText}`}>
                {service.trackers ? "Track your health metrics seamlessly" : "Access powerful resources at your fingertips"}
              </p>
            </div>

            {/* All items in one row stretched across width */}
            <div className="relative z-10 flex justify-between items-start gap-2 md:gap-3">
              {service.trackers ? (
                // Render Trackers
                service.trackers.map((tracker, i) => {
                  const trackerIconMap = {
                    glucose: Box,
                    weight: Weight,
                    "blood-pressure": Gauge,
                    calories: Utensils,
                    "heart-rate": Activity,
                    cholesterol: Droplet,
                    water: GlassWater,
                    periods: CalendarDays,
                    mood: Smile,
                    meal: Utensils,
                    pregnancy: Baby,
                    sleep: Moon,
                    bmi: Ruler,
                    journal: NotebookPen,
                    craving: Cigarette,
                    energy: Zap,
                    withdrawal: AlertCircle,
                    steps: FaRunning,
                    assessment: ClipboardCheck,
                    watch: Eye,
                    index: BarChart,
                    spo2: Wind,
                    temperature: Thermometer,
                  };
                  const TrackerIcon = trackerIconMap[tracker.iconKey];
                  if (!TrackerIcon) return null;
                  return (
                    <motion.button
                      key={tracker.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                      className="flex flex-col items-center gap-2 flex-1"
                      onClick={() => {
                        if (tracker.link) {
                          if (tracker.link.startsWith('http')) {
                            window.open(tracker.link, '_blank', 'noopener,noreferrer');
                          } else {
                            router.push(tracker.link);
                          }
                        } else {
                          setShowMobileAppModal(true);
                        }
                      }}
                    >
                      <div 
                        className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: tracker.grad }}
                      >
                        <TrackerIcon className="text-white" size={28} strokeWidth={2} />
                      </div>
                      <p className={`text-xs font-medium ${t.headingText}`}>{tracker.label}</p>
                    </motion.button>
                  );
                })
              ) : service.quickTools ? (
                // Render custom Quick Tools - one row, no borders, stretched
                service.quickTools.map((tool, i) => (
                  <motion.button
                    key={tool.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                    className="flex flex-col items-center gap-2 flex-1"
                    onClick={() => {
                      if (tool.label === "Health Reports") {
                        setShowComingSoonModal(true);
                      } else if (tool.link === null) {
                        setShowMobileAppModal(true);
                      } else if (tool.link) {
                        if (tool.link.startsWith('http')) {
                          window.open(tool.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tool.link);
                        }
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: tool.grad }}
                    >
                      <tool.Icon className="text-white" size={28} strokeWidth={2.5} />
                    </div>
                    <p className={`text-xs font-medium text-center max-w-[80px] ${t.headingText}`}>{tool.label}</p>
                  </motion.button>
                ))
              ) : (
                // Render default Quick Tools
                [
                  { label: "Journal",      Icon: BookOpen, grad: "#F39C12", link: "/journal" },
                  { label: "Assessment",   Icon: BarChart3, grad: "#3498DB", link: "https://content.mantracare.com/en/therapyapp/assessments/?lang=en" },
                  { label: "Mood Tracker", Icon: Heart,    grad: "#FF9F43", link: "https://platform.mantracare.org/ocd/mood_tracker" },
                  { label: "Mindfulness",   Icon: Wind,     grad: "#27AE60", link: "/service/meditation" },
                  { label: "AI Stress Tracker",        Icon: Moon,     grad: "#9B59B6", link: "https://platform.mantracare.com/stress-face/" },
                  { label: "Affirmations", Icon: Sparkles, grad: "#E74C3C", link: "https://platform.mantracare.com/affirmations/?lang=en" },
                ].map((tool, i) => (
                  <motion.button
                    key={tool.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      if (tool.link) {
                        if (tool.link.startsWith('http')) {
                          window.open(tool.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tool.link);
                        }
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: tool.grad }}
                    >
                      <tool.Icon className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium ${t.headingText}`}>{tool.label}</p>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Substances Section for Quit Smoking */}
        {serviceId === "quit-smoking" && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Header */}
            <div className="mb-7 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`text-[24px] font-semibold flex items-center gap-2.5 mb-2 ${t.headingText}`}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c0ff] to-[#0099ff] flex items-center justify-center shadow-md">
                      <Sparkles className="text-white" size={18} strokeWidth={2.5} />
                    </div>
                    Substances
                  </h2>
                  <p className={`text-sm ${t.subText}`}>
                    Track your journey to recovery across different substances
                  </p>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowProgramSelector(!showProgramSelector)}
                    className="hidden md:flex items-center justify-center w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <Pencil className="text-blue-600" size={16} strokeWidth={2.5} />
                  </button>

                  {/* Dropdown */}
                  {showProgramSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 w-72 bg-white border-2 border-blue-100 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-blue-100">
                        <h4 className="text-sm font-semibold text-[#043570]">Select Programs</h4>
                        <p className="text-xs text-[#64748B] mt-0.5">{visiblePrograms.length} of 8 selected</p>
                      </div>

                      {/* Programs List */}
                      <div className="max-h-80 overflow-y-auto p-2">
                        {[
                          { id: 'alcohol', label: 'Alcohol', Icon: Beer, color: '#FF6B35' },
                          { id: 'tobacco', label: 'Tobacco', Icon: Cigarette, color: '#3B82F6' },
                          { id: 'opioids', label: 'Opioids', Icon: Pill, color: '#E91E63' },
                          { id: 'cannabis', label: 'Cannabis', Icon: Leaf, color: '#10B981' },
                          { id: 'stimulants', label: 'Stimulants', Icon: Zap, color: '#F43F5E' },
                          { id: 'benzodiazepines', label: 'Benzodiazepines', Icon: Pill, color: '#8B5CF6' },
                          { id: 'kratom', label: 'Kratom', Icon: Leaf, color: '#84CC16' },
                          { id: 'mdma', label: 'MDMA', Icon: Sparkles, color: '#EC4899' },
                        ].map((program) => {
                          const ProgramIcon = program.Icon;
                          const isVisible = visiblePrograms.includes(program.id);
                          return (
                            <button
                              key={program.id}
                              onClick={() => toggleProgramVisibility(program.id)}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all mb-1 ${
                                isVisible
                                  ? 'bg-blue-50 hover:bg-blue-100'
                                  : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              {/* Icon */}
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${program.color}15` }}
                              >
                                <ProgramIcon style={{ color: program.color }} size={16} strokeWidth={2.5} />
                              </div>

                              {/* Label */}
                              <span className="flex-1 text-left text-sm font-medium text-[#043570]">
                                {program.label}
                              </span>

                              {/* Checkbox */}
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                  isVisible
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'bg-white border-gray-300'
                                }`}
                              >
                                {isVisible && <Check className="text-white" size={12} strokeWidth={3} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Substances Grid - 4 columns, 2 rows */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {[
                { id: 'alcohol', label: 'Alcohol', Icon: Beer, url: 'https://web.mantracare.com/app/alcohol', color: '#FF6B35', gradient: 'from-[#FF6B35] to-[#FF8555]', lightGradient: 'from-[#FFE5DC] to-[#FFF0EA]', description: 'Recovery support' },
                { id: 'tobacco', label: 'Tobacco', Icon: Cigarette, url: 'https://web.mantracare.com/app/tobacco', color: '#3B82F6', gradient: 'from-[#3B82F6] to-[#60A5FA]', lightGradient: 'from-[#DBEAFE] to-[#EFF6FF]', description: 'Quit smoking' },
                { id: 'opioids', label: 'Opioids', Icon: Pill, url: 'https://web.mantracare.com/app/opioids', color: '#E91E63', gradient: 'from-[#E91E63] to-[#F06292]', lightGradient: 'from-[#FCE7F3] to-[#FDF2F8]', description: 'Treatment plans' },
                { id: 'cannabis', label: 'Cannabis', Icon: Leaf, url: 'https://web.mantracare.com/app/cannabis', color: '#10B981', gradient: 'from-[#10B981] to-[#34D399]', lightGradient: 'from-[#D1FAE5] to-[#ECFDF5]', description: 'Dependency help' },
                { id: 'stimulants', label: 'Stimulants', Icon: Zap, url: 'https://web.mantracare.com/app/stimulants', color: '#F43F5E', gradient: 'from-[#F43F5E] to-[#FB7185]', lightGradient: 'from-[#FFE4E6] to-[#FFF1F2]', description: 'Recovery path' },
                { id: 'benzodiazepines', label: 'Benzodiazepines', Icon: Pill, url: 'https://web.mantracare.com/app/benzodiazepines', color: '#8B5CF6', gradient: 'from-[#8B5CF6] to-[#A78BFA]', lightGradient: 'from-[#EDE9FE] to-[#F5F3FF]', description: 'Safe withdrawal' },
                { id: 'kratom', label: 'Kratom', Icon: Leaf, url: 'https://web.mantracare.com/app/kratom', color: '#84CC16', gradient: 'from-[#84CC16] to-[#A3E635]', lightGradient: 'from-[#ECFCCB] to-[#F7FEE7]', description: 'Support system' },
                { id: 'mdma', label: 'MDMA', Icon: Sparkles, url: 'https://web.mantracare.com/app/mdma', color: '#EC4899', gradient: 'from-[#EC4899] to-[#F472B6]', lightGradient: 'from-[#FCE7F3] to-[#FDF2F8]', description: 'Recovery tools' },
              ].filter(substance => visiblePrograms.includes(substance.id)).map((substance, i) => {
                const SubstanceIcon = substance.Icon;
                return (
                  <motion.button
                    key={substance.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: i * 0.07,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.06, y: -6 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => window.open(substance.url, '_blank', 'noopener,noreferrer')}
                    className="group relative bg-white border-2 border-gray-200 rounded-[20px] p-6 md:p-7 flex flex-col items-center gap-3 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${substance.lightGradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '16px 16px'
                      }}
                    />
                    
                    {/* Colored corner accent - hidden on hover */}
                    <div 
                      className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-0 transition-opacity duration-300 rounded-bl-[100px]"
                      style={{ backgroundColor: substance.color }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                      {/* Icon with colored background and glow effect */}
                      <div className="relative">
                        <div 
                          className={`absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                          style={{ backgroundColor: substance.color }}
                        />
                        <div 
                          className={`relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                          style={{ backgroundColor: substance.color }}
                        >
                          <SubstanceIcon className="text-white drop-shadow-md" size={32} strokeWidth={2.5} />
                        </div>
                      </div>
                      
                      {/* Label and description */}
                      <div className="flex flex-col items-center gap-1.5 mt-1">
                        <span className={`text-[15px] md:text-base font-bold text-center transition-colors duration-300 ${t.headingText}`}>
                          {substance.label}
                        </span>
                        <span className="text-xs text-gray-500 transition-colors duration-300 font-medium">
                          {substance.description}
                        </span>
                      </div>
                    </div>

                    {/* Bottom shine effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom info banner */}
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="text-blue-600" size={20} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 mb-0.5">Professional Support Available</p>
                  <p className="text-xs text-blue-700">Get personalized recovery plans and 24/7 support from certified professionals</p>
                </div>
                <CheckCircle className="text-blue-600 flex-shrink-0" size={20} strokeWidth={2.5} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Quick Tools and Trackers for Teleconsultation */}
        {serviceId === "teleconsultation" && (
          <>
            {/* Quick Tools Section */}
            {service.quickTools && (
              <motion.div 
                className={`border ${t.cardBg} rounded-2xl p-5 md:p-6 mb-4 shadow-sm`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="mb-5">
                  <h2 className={`text-base md:text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                    <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={18} />
                    Quick Tools
                  </h2>
                  <p className={`text-xs md:text-sm ${t.subText}`}>
                    Access helpful resources instantly
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 md:gap-4 overflow-x-auto pb-2">
                  {service.quickTools.map((tool, i) => (
                    <motion.button
                      key={tool.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                      className="flex flex-col items-center gap-2.5 min-w-[80px] md:min-w-[90px]"
                      onClick={() => {
                        if (tool.label === "Health Reports") {
                          setShowComingSoonModal(true);
                        } else if (tool.link === null) {
                          setShowMobileAppModal(true);
                        } else if (tool.link) {
                          if (tool.link.startsWith('http')) {
                            window.open(tool.link, '_blank', 'noopener,noreferrer');
                          } else {
                            router.push(tool.link);
                          }
                        }
                      }}
                    >
                      <div 
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[20px] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                        style={{ backgroundColor: tool.grad }}
                      >
                        <tool.Icon className="text-white" size={24} strokeWidth={2} />
                      </div>
                      <p className={`text-xs font-medium text-center leading-tight ${t.headingText}`}>
                        {tool.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Trackers Section */}
            {service.trackers && (
              <motion.div 
                className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="mb-6 md:mb-8">
                  <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                    <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                    Trackers
                  </h2>
                  <p className={`text-sm ${t.subText}`}>
                    Track your health metrics
                  </p>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                  {service.trackers.map((tracker, i) => {
                    const trackerIconMap = {
                      glucose: Box,
                      weight: Weight,
                      "blood-pressure": Gauge,
                      "heart-rate": Activity,
                      spo2: Wind,
                      temperature: Thermometer,
                    };
                    const TrackerIcon = trackerIconMap[tracker.iconKey];
                    if (!TrackerIcon) return null;
                    return (
                      <motion.button
                        key={tracker.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.06 }}
                        className="flex flex-col items-center gap-2"
                        onClick={() => {
                          if (tracker.link) {
                            if (tracker.link.startsWith('http')) {
                              window.open(tracker.link, '_blank', 'noopener,noreferrer');
                            } else {
                              router.push(tracker.link);
                            }
                          } else {
                            setShowMobileAppModal(true);
                          }
                        }}
                      >
                        <div 
                          className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                          style={{ backgroundColor: tracker.grad }}
                        >
                          <TrackerIcon className="text-white" size={28} strokeWidth={2} />
                        </div>
                        <p className={`text-xs font-medium ${t.headingText}`}>{tracker.label}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Choose Speciality for Teleconsultation and Health Checks */}
        {(serviceId === "teleconsultation" || serviceId === "health-checks") && service.specialties && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`border ${t.cardBg} rounded-2xl p-5 md:p-6 mb-4 shadow-sm`}
          >
            {/* Section Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-lg flex items-center justify-center">
                    <Stethoscope className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <h2 className={`text-lg font-semibold ${t.headingText}`}>
                    {serviceId === "health-checks" ? "Health Services" : "Choose Speciality"}
                  </h2>
                </div>
                {serviceId === "teleconsultation" && (
                  <button
                    onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                    className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-sm flex items-center gap-1 transition-colors"
                  >
                    {showAllSpecialties ? (
                      <>
                        Show Less <ChevronDown size={16} />
                      </>
                    ) : (
                      <>
                        See all <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
              <p className={`text-sm ${t.subText}`}>
                {serviceId === "health-checks" 
                  ? "Explore our comprehensive health services" 
                  : "Connect with specialized doctors for your health needs"
                }
              </p>
            </div>

            {/* Specialties Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {service.specialties.filter((_, index) => serviceId === "health-checks" || showAllSpecialties || index < 8).map((specialty, index) => {
                // Map specialty names to expert IDs for teleconsultation
                const specialtyToExpertMap: Record<string, string> = {
                  "General Physician": "11",
                  "Endocrinologist": "12",
                  "Gynecologist": "13",
                  "Cardiologist": "14",
                  "Orthopedician": "15",
                  "ENT Specialist": "16",
                  "Gastroenterologist": "17",
                  "Paediatrician": "18",
                  "Sexologist": "5",
                  "Dermatologist": "19",
                  "Dentist": "20",
                  "Neurosurgeon": "21",
                  "Oncologist": "22",
                  "Ophthalmologist": "23",
                  "Urologist (Kidney & Urinary Tract)": "24",
                  "Nephrologist": "25",
                  "Pulmonologist (Lung)": "26",
                  "Rheumatologist": "27",
                  "Fertility/ IVF Specialist": "28",
                  "General Surgery": "29"
                };
                
                return (
                <motion.button
                  key={specialty.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + index * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border border-gray-200 rounded-xl p-3 hover:border-[#2563EB]/40 hover:shadow-md transition-all flex items-center gap-3 group"
                  onClick={() => {
                    if (specialty.link) {
                      router.push(specialty.link);
                    } else if (serviceId === "teleconsultation" && specialtyToExpertMap[specialty.name]) {
                      // Navigate to care team with the specific expert
                      router.push(`/care-team?expert=${specialtyToExpertMap[specialty.name]}`);
                    } else {
                      setShowComingSoonModal(true);
                    }
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: specialty.grad }}
                  >
                    <specialty.Icon className="text-white" size={20} strokeWidth={2.5} />
                  </div>
                  
                  {/* Text */}
                  <p className="text-sm font-medium text-[#043570] text-left leading-tight">
                    {specialty.name}
                  </p>
                </motion.button>
              )})}
            </div>
          </motion.div>
        )}

        {/* Quick Links for Health Checks */}
        {serviceId === "health-checks" && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Quick Links
              </h2>
              <p className={`text-sm ${t.subText}`}>
                Access important features quickly
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {[
                { label: "Appointments", icon: Calendar, grad: "#3B82F6", link: "/appointments" },
                { label: "Orders", icon: ShoppingBag, grad: "#10B981", link: "/orders" },
                { label: "Health Files", icon: FolderOpen, grad: "#8B5CF6", link: "/health-files" },
                { label: "Family Members", icon: Users, grad: "#F59E0B", link: "/family-members" },
                { label: "Medical Review", icon: Flag, grad: "#EF4444", link: "/report-consultation" },
                { label: "Support", icon: Headset, grad: "#06B6D4", link: "/support" },
              ].map((quickLink, i) => {
                const QuickLinkIcon = quickLink.icon;
                return (
                  <motion.button
                    key={quickLink.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.06 }}
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      if (quickLink.link.startsWith('http')) {
                        window.open(quickLink.link, '_blank', 'noopener,noreferrer');
                      } else {
                        router.push(quickLink.link);
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: quickLink.grad }}
                    >
                      <QuickLinkIcon className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium ${t.headingText}`}>{quickLink.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Trackers for Health Checks */}
        {serviceId === "health-checks" && service.trackers && (
          <motion.div 
            className={`border ${t.cardBg} rounded-2xl p-4 md:p-6 mb-4 shadow-sm`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className={`text-lg flex items-center gap-2 mb-1 ${t.headingText}`}>
                <Sparkles className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={16} />
                Trackers
              </h2>
              <p className={`text-sm ${t.subText}`}>
                Track your health metrics
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {service.trackers.map((tracker, i) => {
                const trackerIconMap = {
                  glucose: Box,
                  weight: Weight,
                  "blood-pressure": Gauge,
                  calories: Utensils,
                  "heart-rate": Activity,
                  cholesterol: Droplet,
                  water: GlassWater,
                  periods: CalendarDays,
                  mood: Smile,
                  meal: Utensils,
                  pregnancy: Baby,
                  sleep: Moon,
                  bmi: Ruler,
                  journal: NotebookPen,
                  craving: Cigarette,
                  energy: Zap,
                  withdrawal: AlertCircle,
                  steps: FaRunning,
                  assessment: ClipboardCheck,
                  watch: Eye,
                  index: BarChart,
                };
                const TrackerIcon = trackerIconMap[tracker.iconKey];
                if (!TrackerIcon) return null;
                return (
                  <motion.button
                    key={tracker.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.06 }}
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      if (tracker.link) {
                        if (tracker.link.startsWith('http')) {
                          window.open(tracker.link, '_blank', 'noopener,noreferrer');
                        } else {
                          router.push(tracker.link);
                        }
                      } else {
                        setShowMobileAppModal(true);
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: tracker.grad }}
                    >
                      <TrackerIcon className="text-white" size={28} strokeWidth={2} />
                    </div>
                    <p className={`text-xs font-medium ${t.headingText}`}>{tracker.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Areas of Pain for Physiotherapy */}
        {serviceId === "physiotherapy" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`border ${t.cardBg} rounded-2xl p-5 md:p-6 mb-4 shadow-sm`}
          >
            {/* Section Header */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Activity className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} size={18} strokeWidth={2.5} />
                  <h2 className={`text-lg font-semibold ${t.headingText}`}>
                    Areas of Pain
                  </h2>
                </div>
                <button
                  onClick={() => setShowAllPainAreas(!showAllPainAreas)}
                  className={`${isPurple ? "text-[#EE4F84] hover:text-[#BE51F5]" : "text-[#00c0ff] hover:text-[#0284c7]"} font-semibold text-sm flex items-center gap-1 transition-colors`}
                >
                  {showAllPainAreas ? (
                    <>
                      Show Less <ChevronDown size={16} />
                    </>
                  ) : (
                    <>
                      See All <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
              <p className={`text-sm ${t.subText}`}>
                Target specific pain areas with specialized exercise programs
              </p>
            </div>

            {/* Pain Areas Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {[
                { id: 1, name: "Neck", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Neck-150x150.png" },
                { id: 2, name: "Upper Back", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Upper-Back-150x150.png" },
                { id: 3, name: "Lower Back", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Lower-Back-150x150.png" },
                { id: 4, name: "Foot", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Foot-150x150.png" },
                { id: 5, name: "Ankle", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Ankle-150x150.png" },
                { id: 6, name: "Elbow", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Elbow-150x150.png" },
                { id: 7, name: "Forearm", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Forearm-150x150.png" },
                { id: 8, name: "Hand", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Hand-150x150.png" },
                { id: 9, name: "Hamstring", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Hamstring-150x150.png" },
                { id: 10, name: "Heel", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Heel-150x150.png" },
                { id: 11, name: "Shoulder", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Shoulder-150x150.png" },
                { id: 12, name: "Hip", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Hip-150x150.png" },
                { id: 13, name: "Shin", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Shin-150x150.png" },
                { id: 14, name: "Thigh", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Thigh-150x150.png" },
                { id: 15, name: "Upper Arm", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Upper-Arm-150x150.png" },
                { id: 16, name: "Wrist", imageUrl: "https://therapy.mantracare.com/wp-content/uploads/2023/03/Wrist-150x150.png" },
              ].filter((area, index) => showAllPainAreas || index < 6).map((area, index) => (
                <motion.button
                  key={area.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.02 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${t.cardBg} border ${t.border} rounded-xl md:rounded-2xl p-3 md:p-4 hover:border-[#00c0ff]/40 hover:shadow-lg transition-all group`}
                >
                  {/* Pain Image */}
                  <div className="w-full aspect-square bg-gradient-to-br from-[#f3faff] to-[#E0F2FE] rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 group-hover:from-[#E0F2FE] group-hover:to-[#BAE6FD] transition-all overflow-hidden">
                    <img 
                      src={area.imageUrl} 
                      alt={area.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className={`${t.headingText} font-semibold text-xs md:text-sm text-center`}>
                    {area.name}
                  </h3>
                </motion.button>
              ))}
            </div>

          </motion.div>
        )}

        {/* CTA Banner - For Emotional Wellbeing, Diabetes Care, Women Wellness, Coach, Hypertension, Fitness, Nutrition, Yoga, Substance Use, Quit Smoking, Financial Wellness, LGBTQ, Teleconsultation, Health Screenings, Meditation, and Physiotherapy */}
        {(serviceId === "emotional-wellbeing" || serviceId === "diabetes" || serviceId === "women-wellness" || serviceId === "coach" || serviceId === "hypertension" || serviceId === "fitness" || serviceId === "nutrition" || serviceId === "yoga" || serviceId === "substance-use" || serviceId === "quit-smoking" || serviceId === "financial-wellness" || serviceId === "lgbtq" || serviceId === "teleconsultation" || serviceId === "health-checks" || serviceId === "meditation" || serviceId === "physiotherapy") && (
          <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white via-[#F8FCFF] to-[#F3FAFF] rounded-2xl p-6 md:p-8 shadow-lg border border-[#E2E8F0] relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00c0ff]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#043570]/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Blue wave decoration at bottom right */}
            <div className="absolute bottom-0 right-0 w-48 h-40 opacity-100 pointer-events-none">
              <svg viewBox="0 0 192 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0 160C0 160 48 96 96 96C144 96 192 48 192 48V160H0Z" fill={serviceId === "lgbtq" ? "url(#wave1-pink)" : "url(#wave1)"} fillOpacity="0.6"/>
                <path d="M24 160C24 160 60 114 96 114C132 114 168 78 168 78L192 102V160H24Z" fill={serviceId === "lgbtq" ? "url(#wave2-pink)" : "url(#wave2)"} fillOpacity="0.4"/>
                <defs>
                  <linearGradient id="wave1" x1="0" y1="0" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00c0ff" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="wave2" x1="24" y1="78" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#043570" stopOpacity="0.15"/>
                    <stop offset="1" stopColor="#043570" stopOpacity="0.05"/>
                  </linearGradient>
                  <linearGradient id="wave1-pink" x1="0" y1="0" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EE4F84" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#F472B6" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="wave2-pink" x1="24" y1="78" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BE51F5" stopOpacity="0.15"/>
                    <stop offset="1" stopColor="#BE51F5" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              <div className="flex-1 space-y-4">
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 ${isPurple ? "bg-[#EE4F84]/10 text-[#BE51F5] border-[#EE4F84]/20" : "bg-[#00c0ff]/10 text-[#043570] border-[#00c0ff]/20"} px-3 py-1.5 rounded-full text-xs font-semibold border`}>
                  <Sparkles size={14} className={isPurple ? "text-[#EE4F84]" : "text-[#00c0ff]"} />
                  {serviceId === "emotional-wellbeing" ? "Licensed Professionals" : serviceId === "women-wellness" ? "Women Health Experts" : serviceId === "coach" ? "Certified Coaches" : serviceId === "hypertension" ? "Hypertension Specialists" : serviceId === "fitness" ? "Certified Fitness Trainers" : serviceId === "nutrition" ? "Certified Nutritionists" : serviceId === "yoga" ? "Certified Yoga Instructors" : serviceId === "substance-use" ? "Addiction Specialists" : serviceId === "quit-smoking" ? "Tobacco Cessation Experts" : serviceId === "financial-wellness" ? "Certified Financial Advisors" : serviceId === "lgbtq" ? "LGBTQ-Affirming Professionals" : serviceId === "health-checks" ? "Certified Health Professionals" : serviceId === "meditation" ? "Certified Mindfulness Instructors" : serviceId === "physiotherapy" ? "Licensed Physiotherapists" : "Certified Specialists"}
                </div>

                {/* Heading */}
                <h3 className={`${isPurple && serviceId !== "lgbtq" ? "text-[#BE51F5]" : "text-[#020817]"} text-2xl md:text-3xl font-bold leading-tight`}>
                  {serviceId === "emotional-wellbeing" 
                    ? "Ready to prioritize your mental health?" 
                    : serviceId === "women-wellness"
                    ? "Ready to prioritize your women's health?"
                    : serviceId === "coach"
                    ? "Get expert guidance of a Mantra Coach"
                    : serviceId === "hypertension"
                    ? "Take control of your blood pressure today"
                    : serviceId === "fitness"
                    ? "Achieve your fitness goals with expert trainers"
                    : serviceId === "nutrition"
                    ? "Transform your health with personalized nutrition plans"
                    : serviceId === "yoga"
                    ? "Begin your yoga journey with expert guidance"
                    : serviceId === "substance-use"
                    ? "Start your recovery journey with compassionate support"
                    : serviceId === "quit-smoking"
                    ? "Ready to quit smoking and breathe freely?"
                    : serviceId === "financial-wellness"
                    ? "Take control of your financial future today"
                    : serviceId === "lgbtq"
                    ? "Get affirming support for your mental wellness"
                    : serviceId === "teleconsultation"
                    ? "Connect with doctors from the comfort of home"
                    : serviceId === "health-checks"
                    ? "Stay healthy with regular preventive screenings"
                    : serviceId === "meditation"
                    ? "Find peace and clarity through guided mindfulness"
                    : serviceId === "physiotherapy"
                    ? "Recover faster with expert physiotherapy care"
                    : "Ready to reverse your diabetes naturally?"}
                </h3>

                {/* Description */}
                <p className={`${isPurple && serviceId !== "lgbtq" ? "text-[#BE51F5]/80" : "text-[#64748B]"} text-sm md:text-base max-w-lg leading-relaxed`}>
                  {serviceId === "emotional-wellbeing"
                    ? "Connect with licensed therapists who understand your journey. Get personalized support for anxiety, depression, stress, and more."
                    : serviceId === "women-wellness"
                    ? "Expert care for PCOS, pregnancy, menstrual health, and overall wellness from women's health specialists."
                    : serviceId === "coach"
                    ? "Get personalized 1-on-1 coaching from certified experts to unlock your full potential in career, leadership, and wellness."
                    : serviceId === "hypertension"
                    ? "Manage and lower your blood pressure with expert cardiology care and personalized lifestyle guidance."
                    : serviceId === "fitness"
                    ? "Achieve your health goals with customized workout plans, nutrition guidance, and ongoing support from certified trainers."
                    : serviceId === "nutrition"
                    ? "Reach your wellness goals with personalized meal plans, nutrition coaching, and AI-powered tracking from certified nutritionists."
                    : serviceId === "yoga"
                    ? "Enhance flexibility, build strength, and find inner peace with personalized yoga sessions and guided meditation."
                    : serviceId === "substance-use"
                    ? "Connect with licensed addiction specialists and recovery counselors who provide compassionate, evidence-based treatment for substance use disorders. Receive personalized recovery plans, relapse prevention strategies, and continuous support throughout your healing journey."
                    : serviceId === "quit-smoking"
                    ? "Quit smoking for good with personalized plans, craving management techniques, and continuous support from certified specialists."
                    : serviceId === "financial-wellness"
                    ? "Achieve your financial goals with personalized budgeting, debt management, investment advice, and retirement planning from certified advisors."
                    : serviceId === "lgbtq"
                    ? "Connect with LGBTQ-affirming therapists who understand your unique journey. Get personalized support for identity, relationships, and mental wellness."
                    : serviceId === "teleconsultation"
                    ? "Consult with licensed doctors via video or chat for medical advice, prescriptions, and follow-up care. Get quality healthcare without leaving your home."
                    : serviceId === "health-checks"
                    ? "Get comprehensive health screenings and preventive assessments. Monitor your health with regular check-ups, lab tests, and personalized reports from certified professionals."
                    : serviceId === "meditation"
                    ? "Reduce stress, improve focus, and enhance wellbeing with guided meditation sessions and mindfulness practices led by certified instructors."
                    : serviceId === "physiotherapy"
                    ? "Recover from injuries, manage pain, and improve mobility with personalized physiotherapy treatment plans from licensed specialists."
                    : "Reverse diabetes with personalized nutrition plans and lifestyle guidance from certified specialists and dietitians."}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00c0ff] to-[#0EA5E9] border-2 border-white flex items-center justify-center">
                          <Users size={14} className="text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-[#64748B] font-medium">
                      {serviceId === "emotional-wellbeing" ? "500+ Therapists" : serviceId === "women-wellness" ? "300+ Women Health Experts" : serviceId === "coach" ? "200+ Mantra Coaches" : serviceId === "hypertension" ? "250+ Cardiologists" : serviceId === "fitness" ? "350+ Fitness Trainers" : serviceId === "nutrition" ? "300+ Nutritionists" : serviceId === "yoga" ? "400+ Yoga Instructors" : serviceId === "substance-use" ? "180+ Addiction Specialists" : serviceId === "quit-smoking" ? "220+ Cessation Coaches" : serviceId === "financial-wellness" ? "150+ Financial Advisors" : serviceId === "health-checks" ? "320+ Health Professionals" : serviceId === "meditation" ? "250+ Mindfulness Instructors" : serviceId === "physiotherapy" ? "280+ Physiotherapists" : "200+ Specialists"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-[#FFA500] fill-[#FFA500]" />
                    <span className={`text-sm font-semibold ${isPurple && serviceId !== "lgbtq" ? "text-[#BE51F5]" : "text-[#020817]"}`}>4.9</span>
                    <span className={`text-xs ${isPurple && serviceId !== "lgbtq" ? "text-[#BE51F5]/70" : "text-[#64748B]"}`}>
                      {serviceId === "emotional-wellbeing" ? "(2.5k reviews)" : serviceId === "women-wellness" ? "(2.1k reviews)" : serviceId === "coach" ? "(1.5k reviews)" : serviceId === "hypertension" ? "(1.9k reviews)" : serviceId === "fitness" ? "(2.3k reviews)" : serviceId === "nutrition" ? "(2.4k reviews)" : serviceId === "yoga" ? "(2.7k reviews)" : serviceId === "substance-use" ? "(1.4k reviews)" : serviceId === "quit-smoking" ? "(1.6k reviews)" : serviceId === "financial-wellness" ? "(1.3k reviews)" : serviceId === "lgbtq" ? "(2.2k reviews)" : serviceId === "health-checks" ? "(2.6k reviews)" : serviceId === "meditation" ? "(2.8k reviews)" : serviceId === "physiotherapy" ? "(2.0k reviews)" : "(1.8k reviews)"}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/plans")}
                    className={`inline-flex items-center gap-2 ${isPurple ? "bg-gradient-to-r from-[#BE51F5] to-[#EE4F84]" : "bg-gradient-to-r from-[#00c0ff] to-[#0EA5E9]"} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all`}
                  >
                    Explore Plans
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>

              {/* Profile Image with decoration */}
              <div className="hidden md:block flex-shrink-0 relative mx-auto w-auto md:w-64">
                {/* Glow effect */}
                <div className={`absolute inset-0 ${isPurple ? "bg-gradient-to-br from-[#BE51F5] to-[#EE4F84]" : "bg-gradient-to-br from-[#00c0ff] to-[#0EA5E9]"} rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                
                {/* Image container */}
                <div className={`relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ${serviceId === "lgbtq" ? "ring-[#EE4F84]/20" : "ring-[#00c0ff]/20"}`}>
                  <ImageWithFallback
                    src={serviceId === "emotional-wellbeing"
                      ? ctaImage
                      : serviceId === "women-wellness"
                      ? womenWellnessCtaImage
                      : serviceId === "coach"
                      ? coachCtaImage
                      : serviceId === "hypertension"
                      ? hypertensionCtaImage
                      : serviceId === "fitness"
                      ? fitnessCtaImage
                      : serviceId === "nutrition"
                      ? nutritionCtaImage
                      : serviceId === "yoga"
                      ? yogaCtaImage
                      : serviceId === "substance-use"
                      ? "https://images.unsplash.com/photo-1696329121442-fed8952ae0a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjB0aGVyYXBpc3QlMjBwcm9mZXNzaW9uYWwlMjBjb21wYXNzaW9uYXRlJTIwaGVhZHNob3R8ZW58MXx8fHwxNzczMzEzNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      : serviceId === "quit-smoking"
                      ? quitSmokingCtaImage
                      : serviceId === "financial-wellness"
                      ? financialWellnessCtaImage
                      : serviceId === "lgbtq"
                      ? lgbtqCtaImage
                      : serviceId === "teleconsultation"
                      ? teleconsultationCtaImage
                      : serviceId === "health-checks"
                      ? healthChecksCtaImage
                      : serviceId === "meditation"
                      ? "https://images.unsplash.com/photo-1758797316117-8d133af25f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwaW5zdHJ1Y3RvciUyMHBlYWNlZnVsJTIwbWluZGZ1bG5lc3MlMjB0ZWFjaGVyfGVufDF8fHx8MTc3NTM4MzkzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      : serviceId === "physiotherapy"
                      ? physiotherapyCtaImage
                      : diabetesCtaImage}
                    alt={serviceId === "emotional-wellbeing" ? "Professional Therapist" : serviceId === "women-wellness" ? "Women Health Expert" : serviceId === "coach" ? "Wellness Coach" : serviceId === "hypertension" ? "Cardiologist" : serviceId === "fitness" ? "Fitness Trainer" : serviceId === "nutrition" ? "Nutritionist" : serviceId === "yoga" ? "Yoga Instructor" : serviceId === "substance-use" ? "Addiction Specialist" : serviceId === "quit-smoking" ? "Cessation Coach" : serviceId === "financial-wellness" ? "Financial Advisor" : serviceId === "lgbtq" ? "LGBTQ+ Support" : serviceId === "teleconsultation" ? "Teleconsultation Doctor" : serviceId === "health-checks" ? "Health Screening Professional" : serviceId === "meditation" ? "Mindfulness Instructor" : serviceId === "physiotherapy" ? "Physiotherapist" : "Diabetes Specialist"}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Online indicator */}
                  <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white shadow-md z-10"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Corporate User CTA Card - Only for Emotional Wellbeing */}
          {serviceId === "emotional-wellbeing" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative overflow-hidden bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-3xl p-8 shadow-lg group hover:shadow-xl transition-all mt-6"
            >
              {/* Decorative background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00c0ff]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#0EA5E9]/10 rounded-full blur-2xl"></div>

              {/* Blue wave decoration at bottom right */}
              <div className="absolute bottom-0 right-0 w-48 h-40 opacity-100 pointer-events-none">
                <svg viewBox="0 0 192 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M0 160C0 160 48 96 96 96C144 96 192 48 192 48V160H0Z" fill="url(#wave1-corporate)" fillOpacity="0.6"/>
                  <path d="M24 160C24 160 60 114 96 114C132 114 168 78 168 78L192 102V160H24Z" fill="url(#wave2-corporate)" fillOpacity="0.4"/>
                  <defs>
                    <linearGradient id="wave1-corporate" x1="0" y1="0" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00c0ff" stopOpacity="0.2"/>
                      <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="wave2-corporate" x1="24" y1="78" x2="192" y2="160" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#043570" stopOpacity="0.15"/>
                      <stop offset="1" stopColor="#043570" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 space-y-3">
                  {/* Heading */}
                  <h3 className="text-[#043570] text-2xl md:text-3xl font-bold leading-tight">
                    Upgrade to Complete Wellness Care
                  </h3>

                  {/* Description */}
                  <p className="text-[#043570]/70 text-sm md:text-base max-w-lg leading-relaxed">
                    Enjoy therapy, nutrition, doctor consultations, fitness, and chronic care in one seamless plan. Get an exclusive <span className="font-bold text-[#00c0ff]">20% corporate discount</span> with Mantra Wellness Plans.
                  </p>
                </div>

                {/* Right side - Button */}
                <div className="flex-shrink-0">
                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/plans")}
                    className="inline-flex items-center gap-2 bg-[#043570] text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    Explore Plans
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
          </>
        )}
      </main>
      </div>

      {/* Mobile App Modal */}
      <MobileAppModal isOpen={showMobileAppModal} onClose={() => setShowMobileAppModal(false)} />
      
      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={showComingSoonModal} onClose={() => setShowComingSoonModal(false)} />
      
      {/* Quick Start Modal */}
      {quickStartPlan && (
        <QuickStartModal
          isOpen={!!quickStartPlan}
          planTitle={quickStartPlan.title}
          planColor={quickStartPlan.color}
          onClose={() => setQuickStartPlan(null)}
        />
      )}
    </div>
  );
}
