import { useRouter } from "next/navigation";
import { Bell, MessageCircle, ArrowRight, Gift, Star, Smartphone, Download, Sparkles, Calendar, Activity, Heart, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function NoActivePlan() {
  const router = useRouter();
  const userString = localStorage.getItem("mantraUser");
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || "User";
  const firstName = userName.split(" ")[0];

  const handleSignupPlan = () => {
    if (user) {
      user.hasSubscription = true;
      localStorage.setItem("mantraUser", JSON.stringify(user));
      router.push("/dashboard");
    }
  };

  const handleInviteCode = () => {
    if (user) {
      user.hasSubscription = true;
      localStorage.setItem("mantraUser", JSON.stringify(user));
      router.push("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mantraUser");
    router.push("/");
  };

  const plans = [
    {
      name: "Emotional Wellbeing",
      description: "Professional therapy & counseling",
      icon: "🧠",
      price: "₹1,499/mo",
      features: ["1-on-1 Sessions", "24/7 Support", "CBT Therapy"],
      color: "from-[#F1F5F9] to-white",
      borderColor: "border-[#E2E8F0]",
      iconBg: "#9B59B6"
    },
    {
      name: "Diabetes Management",
      description: "Complete diabetes care program",
      icon: "💉",
      price: "₹1,799/mo",
      features: ["Daily Monitoring", "Diet Plans", "Expert Guidance"],
      color: "from-[#F1F5F9] to-white",
      borderColor: "border-[#E2E8F0]",
      iconBg: "#2D9CDB"
    },
    {
      name: "Fitness & Yoga",
      description: "Personalized fitness plans",
      icon: "🏋️",
      price: "₹999/mo",
      features: ["Live Classes", "Custom Workouts", "Yoga Sessions"],
      color: "from-[#F1F5F9] to-white",
      borderColor: "border-[#E2E8F0]",
      iconBg: "#27AE60"
    },
    {
      name: "Nutrition Plans",
      description: "Expert dietary guidance",
      icon: "🥗",
      price: "₹1,299/mo",
      features: ["Meal Planning", "Nutritionist Chat", "Recipe Library"],
      color: "from-[#F1F5F9] to-white",
      borderColor: "border-[#E2E8F0]",
      iconBg: "#FF9F43"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8">
          {/* Welcome */}
          <motion.div 
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl text-[#020817] mb-2">
              Hello, {firstName}! 👋
            </h1>
            <p className="text-sm md:text-base text-[#64748B]">Start your wellness journey today</p>
          </motion.div>

          {/* Quick Actions - Top */}
          <motion.div 
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card 
              className="bg-[#E8F4FD] border-2 border-[#C5E2F7] hover:shadow-xl hover:shadow-[#2D9CDB]/10 transition-all cursor-pointer group overflow-hidden"
              onClick={() => router.push("/care-team")}
            >
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 md:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-11 h-11 md:w-14 md:h-14 bg-[#2D9CDB] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2D9CDB]/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageCircle className="text-white" size={22} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#020817] font-semibold mb-0.5 text-sm md:text-base">Talk to Our Care Team</h3>
                      <p className="text-xs md:text-sm text-[#64748B]">Get instant care and support</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-[#E8F4FD] rounded-full flex items-center justify-center group-hover:bg-[#D6E6F7] transition-colors flex-shrink-0">
                    <ArrowRight className="text-[#2D9CDB]" size={18} />
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* No Active Plan Card */}
          <motion.div 
            className="relative bg-gradient-to-br from-white via-[#EBF4FF]/30 to-[#EBF4FF]/30 border-2 border-[#E2ECF5] rounded-3xl shadow-lg w-full max-w-[1000px] mx-auto mb-8 md:mb-12 py-10 md:py-16 px-4 md:px-8 text-center overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E2ECF5]/20 to-[#EBF4FF]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#EBF4FF]/20 to-[#E2ECF5]/20 rounded-full blur-3xl"></div>
            
            {/* Floating accent dots */}
            <div className="absolute top-12 right-20 w-2 h-2 bg-[#2D9CDB] rounded-full animate-pulse"></div>
            <div className="absolute bottom-16 left-24 w-2 h-2 bg-[#1E293B] rounded-full animate-pulse delay-75"></div>
            <div className="absolute top-20 left-32 w-1.5 h-1.5 bg-[#E2ECF5] rounded-full animate-pulse delay-150"></div>
            
            <div className="relative z-10">
              {/* Bell Icon */}
              <div className="flex justify-center mb-5 md:mb-6">
                <motion.div 
                  className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#EBF4FF] to-[#F6F8FB] border-2 border-[#E2ECF5] rounded-full flex items-center justify-center shadow-lg shadow-[#E2ECF5]/50"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Bell className="text-[#1E293B]" size={36} strokeWidth={2.5} />
                </motion.div>
              </div>
              
              {/* Title */}
              <motion.h2 
                className="text-2xl md:text-3xl text-[#020817] font-bold mb-3 md:mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                No Active Plan!
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p 
                className="text-[#64748B] text-base md:text-lg mb-8 md:mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                It seems you don't have an active plan
              </motion.p>
              
              {/* Buttons - stack on small screens */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleSignupPlan}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-[#2D9CDB] text-white rounded-xl font-semibold text-sm md:text-base shadow-lg shadow-[#2D9CDB]/20 hover:shadow-xl hover:shadow-[#2D9CDB]/30 transition-all"
                >
                  Signup for a plan
                </motion.button>
                
                <motion.button
                  onClick={handleInviteCode}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-transparent border-2 border-[#94A3B8] text-[#64748B] rounded-xl font-semibold text-sm md:text-base hover:bg-[#F1F5F9] hover:border-[#64748B] hover:shadow-lg transition-all"
                >
                  Use invite code
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* App is Better Banner */}
          <div className="bg-[#E8F4FD] border-2 border-[#C5E2F7] rounded-2xl px-4 md:px-6 py-4 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-[#2D9CDB] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2D9CDB]/20">
                  <Smartphone className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#020817] font-semibold text-sm mb-0.5">
                    App is better
                  </h3>
                  <p className="text-[#64748B] text-xs">
                    AI features, Trackers, and notifications are available only in the app.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <motion.a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#C5E2F7] rounded-lg px-4 py-2.5 hover:border-[#2D9CDB] hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M5.5 3.5L16 12L5.5 20.5V3.5Z" fill="#64748B"/>
                  </svg>
                  <span className="text-xs text-[#64748B] font-medium">Google Play</span>
                </motion.a>
                <motion.a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#C5E2F7] rounded-lg px-4 py-2.5 hover:border-[#2D9CDB] hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#64748B"/>
                  </svg>
                  <span className="text-xs text-[#64748B] font-medium">App Store</span>
                </motion.a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
