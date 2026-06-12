import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CompletionScreen from "../../components/CompletionScreen";
import { ArrowLeft, ChevronLeft, RotateCcw, X, Pause, Sparkles, Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

/* ─── Shared UI Components ─── */
function GradientBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm text-primary mb-8 mx-auto">
      {children}
    </div>
  );
}

function ActivityButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
    >
      {children}
    </button>
  );
}

const DoNothing = () => {
    const { t } = useTranslation("quiet-focus-tool");
  // floatingMessages defined here so t() is in scope
  const floatingMessages = [
    t("youre_doing_great"),
    t("just_breathe"),
    t("let_thoughts_pass_like_clouds"),
    t("this_moment_is_yours"),
    t("stillness_is_strength"),
    t("you_are_enough_right_now"),
    t("be_gentle_with_yourself"),
  ];

  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "active" | "completed" | "cancelled">("intro");
  const [timeLeft, setTimeLeft] = useState(60);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderKey, setReminderKey] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (phase === "active" && timeLeft <= 0) {
      // Log completion
      const userId = typeof window !== "undefined" ? sessionStorage.getItem("user_id") : null;
      fetch("/ocd/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          activity_slug: "quiet_focus_tool",
          payload: {
            exercise: "Resist the Urge",
            duration_seconds: 60,
            date: new Date().toISOString(),
          },
        }),
      }).catch((e) => console.error("Log failed", e));

      setPhase("completed");
      return;
    }

    if (phase === "active" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === "active") {
      const messageTimer = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % floatingMessages.length);
      }, 8000);
      return () => clearInterval(messageTimer);
    }
  }, [phase]);

  const handleInteraction = useCallback(() => {
    if (phase === "active" && timeLeft > 0) {
      setShowReminder(true);
      setReminderKey((prev) => prev + 1);
      setTimeout(() => setShowReminder(false), 2500);
    }
  }, [phase, timeLeft]);

  const handleStart = () => {
    setPhase("active");
    setTimeLeft(60);
  };

  const handleRestart = () => {
    setTimeLeft(60);
    setShowReminder(false);
  };

  const handleBack = () => navigate("/");
  const handleCancel = () => setPhase("cancelled");

  if (phase === "cancelled") {
    return (
      <div className="min-h-screen bg-gradient-therapeutic flex flex-col items-center justify-center p-6 font-sans relative">
        {/* Global Exit Button */}
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (window.parent !== window) {
              window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
            } else {
              window.location.href = 'https://web.mantracare.com';
            }
          }} 
          className="absolute top-6 left-6 md:top-8 md:left-8 z-50 p-3 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-primary shadow-sm transition-all border border-slate-100/50"
        >
          <ArrowLeft size={20} />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-therapeutic shadow-2xl p-10 max-w-sm w-full text-center relative pt-16"
        >
          <button onClick={handleBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-100 bg-slate-50 border border-slate-100 text-slate-400 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <GradientBadge>
            <Heart size={32} />
          </GradientBadge>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{t("thats_okay")}</h2>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed italic">
            {t("no_pressure_you_should_only_stay_as_long_as_it_fee")}
          </p>
          <div className="space-y-4">
            <ActivityButton onClick={handleStart}>{t("try_again")}</ActivityButton>
            <button onClick={handleBack} className="w-full py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              {t("return_home")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (phase === "completed") {
    return (
      <CompletionScreen
        title={t("stillness_found")}
        message={t("you_gave_yourself_the_gift_of_pure_presence_that_takes_real_")}
      />
    );
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-therapeutic flex flex-col items-center justify-center p-6 relative font-sans scrollbar-hide">
        {/* Global Exit Button */}
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (window.parent !== window) {
              window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
            } else {
              window.location.href = 'https://web.mantracare.com';
            }
          }} 
          className="absolute top-6 left-6 md:top-8 md:left-8 z-50 p-3 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-primary shadow-sm transition-all border border-slate-100/50"
        >
          <ArrowLeft size={20} />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-therapeutic shadow-2xl p-10 max-w-sm w-full text-center relative pt-16"
        >
          <button onClick={handleBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-100 bg-slate-50 border border-slate-100 text-slate-400 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <GradientBadge>
            <Pause size={32} />
          </GradientBadge>
          <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight italic">{t("resist_the_urge")}</h1>
          <p className="text-muted-foreground text-base mb-8 leading-relaxed italic">
            {t("for_one_minute_give_yourself_permission_to_do_abso")}
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">{t("the_goal")}</p>
            <p className="text-xs text-slate-500 italic">{t("feeling_restless_thats_okay_your_only_job_is_to_no")}</p>
          </div>
          <ActivityButton onClick={handleStart}>
            {t("im_ready")}
            <ArrowRight size={18} />
          </ActivityButton>
        </motion.div>
      </div>
    );
  }

  const progress = ((60 - timeLeft) / 60) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="min-h-screen bg-gradient-therapeutic flex flex-col items-center justify-center p-6 select-none relative overflow-hidden font-sans scrollbar-hide"
      onClick={handleInteraction}
    >
      <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-3 z-20">
         <button 
           onClick={(e) => { 
             e.stopPropagation(); 
             if (window.parent !== window) {
               window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
             } else {
               window.location.href = 'https://web.mantracare.com';
             }
           }} 
           className="p-3 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-primary shadow-sm transition-all border border-slate-100/50 w-fit"
         >
           <ArrowLeft size={20} />
         </button>
         <div className="flex gap-3">
           <button onClick={(e) => { e.stopPropagation(); handleBack(); }} className="p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-slate-900 transition-all w-fit">
             <ChevronLeft size={18} />
           </button>
           <button onClick={(e) => { e.stopPropagation(); handleRestart(); }} className="p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-slate-900 transition-all w-fit">
             <RotateCcw size={18} />
           </button>
           <button onClick={(e) => { e.stopPropagation(); handleCancel(); }} className="p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-slate-900 transition-all w-fit">
             <X size={18} />
           </button>
         </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`msg-${currentMessage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-32 left-0 right-0 text-center px-10 z-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary/40 italic">
            {floatingMessages[currentMessage]}
          </span>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showReminder && (
          <motion.div
            key={`rem-${reminderKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-48 left-1/2 -translate-x-1/2 z-30 px-8 py-3 rounded-full bg-slate-900 text-white shadow-2xl"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">{t("just_be_still_youre_safe")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center max-w-sm relative z-10">
        <div className="relative inline-flex items-center justify-center mb-16">
          <div className="absolute w-[320px] h-[320px] rounded-full bg-primary/5 animate-pulse" />

          <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 256 256">
            <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(var(--primary-rgb), 0.05)" strokeWidth="6" />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-slate-900 tabular-nums tracking-tighter">{timeLeft}</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">{t("seconds")}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">{t("let_yourself_rest")}</h1>
          <p className="text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto italic text-sm">
            {t("everything_else_can_wait_for_just_one_minute")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoNothing;
