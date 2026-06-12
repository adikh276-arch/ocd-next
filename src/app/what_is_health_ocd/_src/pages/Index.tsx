import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Stethoscope, Search, MessageSquare, AlertTriangle, ShieldCheck, Star, ChevronLeft, HeartPulse, Activity } from 'lucide-react';
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";
import { useSearchParams } from 'next/navigation';

const Index = () => {
  const { t, i18n } = useTranslation(["what_is_health_ocd", "common"]);
  const searchParams = useSearchParams();

  // Force language change if lang param is present
  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  const [showCompletion, setShowCompletion] = useState(false);

  const keyPoints = [
    { 
      icon: Activity, 
      color: "text-rose-500", 
      bgColor: "bg-rose-50",
      text: t("the_cycle_keeps_going__you_worry_you_check_you_feel_better_f", "The cycle keeps going — you worry, you check, you feel better for a moment, then the doubt comes back and it starts all over again.") 
    },
    { 
      icon: Search, 
      color: "text-blue-500", 
      bgColor: "bg-blue-50",
      text: t("you_keep_googling_your_symptoms_even_when_you_know_it_only_m", "You keep googling your symptoms, even when you know it only makes things worse.") 
    },
    { 
      icon: MessageSquare, 
      color: "text-amber-500", 
      bgColor: "bg-amber-50",
      text: t("you_ask_doctors_or_people_for_reassurance_but_it_never_feels", "You ask doctors or people for reassurance, but it never feels like enough.") 
    },
    { 
      icon: Stethoscope, 
      color: "text-indigo-500", 
      bgColor: "bg-indigo-50",
      text: t("your_mind_grabs_onto_normal_body_feelings_and_turns_them_int", "Your mind grabs onto normal body feelings and turns them into scary \"evidence\".") 
    },
    { 
      icon: ShieldCheck, 
      color: "text-emerald-500", 
      bgColor: "bg-emerald-50",
      text: t("you_start_avoiding_things_that_might_set_off_your_worries__l", "You start avoiding things that might set off your worries — like news or hospitals.") 
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-health-ocd-guide">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.parent !== window) {
                   window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                } else {
                   window.location.href = 'https://web.mantracare.com';
                }
               }}
              className="p-2 rounded-xl bg-white text-slate-500 hover:text-primary hover:shadow-md transition-all border border-slate-100"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("what_is_health_ocd", "What is Health OCD?")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("understanding_the_body", "Understanding the Body")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[40px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-16 font-sans relative flex flex-col items-center">
          
          {/* Hero Icon Section */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-6xl transform rotate-3 transition-transform hover:rotate-0 duration-500 relative z-10">
               <HeartPulse className="w-20 h-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center space-y-6 max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t("we_all_worry_about_our_health_sometimes_but_for_so", "We all worry about our health sometimes, but for some, it becomes a cycle of fear.")}
            </h2>
            <div className="h-1.5 w-24 bg-primary/20 mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed italic">
              {t("health_ocd_is_when_your_brain_gets_stuck_on_the_id", "Health OCD is when your brain gets stuck on the idea that something is wrong, and no amount of checking feels like enough.")}
            </p>
          </div>

          {/* Section: Difference */}
          <div className="w-full space-y-10">
            <header className="text-center space-y-3">
              <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                 <AlertTriangle size={14} /> {t("identification", "Identification")}</label>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {t("how_is_this_different_from_normal_worry", "How is this different from normal worry?")}
              </h3>
            </header>

            <div className="grid grid-cols-1 gap-4 w-full">
              {keyPoints.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-6 p-6 md:p-8 rounded-[32px] bg-slate-50/50 border-2 border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl ${point.bgColor} flex items-center justify-center shrink-0 border-2 border-white shadow-sm transition-transform group-hover:scale-110`}>
                     <point.icon className={`w-7 h-7 ${point.color}`} />
                  </div>
                  <p className="text-slate-600 text-[16px] md:text-lg font-medium leading-relaxed pt-1">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full max-w-md mx-auto pt-16">
            <button
              onClick={() => setShowCompletion(true)}
              className="w-full py-6 rounded-[28px] bg-primary text-white font-sans text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/40 active:scale-[0.98] hover:-translate-y-1"
            >
              {t("finish_guide", "Finish Guide")}
            </button>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🏥"
        title={t("knowledge_is_power", "Knowledge is Power")}
        description={t("youve_taken_the_first_step_by_educating_yourself_r", "You've taken the first step by educating yourself. Understanding how Health OCD works is the key to breaking the cycle.")}
        startOverText={t("read_guide_again", "Read Guide Again")}
        onDone={() => window.history.back()}
        onStartOver={() => setShowCompletion(false)}
        showHome={false}
      />
    </div>
  );
};

export default Index;
