import { useState, useEffect } from "react";
import { ArrowLeft, User, Heart, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSearchParams } from 'next/navigation';

const emojiMap = ["🌿", "💙", "🌊", "✨", "🤍", "🌸", "💛"];

const Index = () => {
    const { t, i18n } = useTranslation(["mirror_moments", "common"]);
  const searchParams = useSearchParams();

  // Force language change if lang param is present
  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  const affirmations = [
    t("i_am_not_my_anxious_thoughts_my_thoughts_are_not_facts", "I am not my anxious thoughts. My thoughts are not facts."),
    t("i_am_doing_the_best_i_can_with_what_i_have_right_now", "I am doing the best I can with what I have right now."),
    t("it_is_okay_to_not_have_all_the_answers_uncertainty_is_part_o", "It is okay to not have all the answers. Uncertainty is part of life."),
    t("my_body_is_not_my_enemy_it_is_working_hard_to_take_care_of_m", "My body is not my enemy. It is working hard to take care of me."),
    t("i_deserve_the_same_kindness_i_would_give_to_someone_i_love", "I deserve the same kindness I would give to someone I love."),
    t("this_worry_will_pass_it_always_does_i_have_survived_every_ha", "This worry will pass. It always does. I have survived every hard moment so far."),
    t("i_am_worthy_of_peace_and_calm_even_when_things_feel_uncertai", "I am worthy of peace and calm, even when things feel uncertain.")
  ];
    
  const [screen, setScreen] = useState<"welcome" | "mirror">("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxViewed, setMaxViewed] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = affirmations.length;
  const allViewed = maxViewed >= total - 1;

  useEffect(() => {
    if (currentIndex > maxViewed) setMaxViewed(currentIndex);
  }, [currentIndex, maxViewed]);

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const reset = () => {
    setScreen("welcome");
    setCurrentIndex(0);
    setMaxViewed(0);
    setShowCompletion(false);
    setSaving(false);
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'mirror_moments',
          payload: { completed: true, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log mirror moment:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-mirror-moments">
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
              {t("mirror_moments", "Mirror Moments")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("self-compassion_reflection", "Self-Compassion Reflection")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[40px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-16 font-sans min-h-[550px] relative flex flex-col justify-center overflow-hidden">
          
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

          {/* Internal Back Button for Mirror Screen */}
          {screen === "mirror" && (
            <button
              onClick={() => {
                if (currentIndex > 0) handlePrev();
                else setScreen("welcome");
              }}
              className="absolute left-6 top-8 p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen", "Previous Screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <AnimatePresence mode="wait">
            {screen === "welcome" ? (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full text-center space-y-12 relative z-10"
              >
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-125 animate-pulse" />
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-[48px] border-2 border-slate-100 shadow-xl flex items-center justify-center text-6xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 text-primary relative z-10">
                      <User size={64} strokeWidth={1.2} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 max-w-2xl mx-auto">
                   <header className="text-center space-y-3">
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] opacity-80 italic px-6">
                      {t("the_way_you_speak_to_yourself_matters_more_than_yo", "\"The way you speak to yourself matters more than you know. This is a moment to be kind to the person who needs it most — you.\"")}
                    </p>
                    <div className="h-1 w-12 bg-primary/20 mx-auto rounded-full" />
                  </header>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t("kindness_reflected", "Kindness Reflected")}</h2>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                    {t("take_a_deep_breath_these_are_things_your_kindest_s", "Take a deep breath. These are things your kindest self wants you to hear. Read each one slowly — out loud if you can.")}
                  </p>
                </div>

                <div className="max-w-md mx-auto pt-6">
                  <button
                    onClick={() => setScreen("mirror")}
                    className="w-full py-6 rounded-[28px] bg-primary text-white font-sans text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/40 active:scale-[0.98] hover:-translate-y-1"
                  >
                    {t("begin_reflection", "Begin Reflection")}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="mirror"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex flex-col items-center space-y-12 relative z-10"
              >
                <div className="w-full max-w-3xl flex flex-col items-center gap-10">
                  
                  {/* Progress Header */}
                  <div className="w-full flex flex-col items-center gap-4">
                     <div className="flex gap-2 justify-center">
                      {Array.from({ length: total }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === currentIndex ? "w-10 bg-primary shadow-sm shadow-primary/40" : 
                            i < maxViewed ? "w-2 bg-primary/40" : "w-2 bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                       {t("affirmation_x_of_y", { current: currentIndex + 1, total, defaultValue: "Affirmation {{current}} of {{total}}" })}
                    </p>
                  </div>

                  {/* Main Interaction Area */}
                  <div className="relative w-full flex items-center justify-center min-h-[300px]">
                    
                    {/* Side Arrows */}
                    <div className="absolute inset-y-0 -left-4 -right-4 md:-left-12 md:-right-12 flex items-center justify-between pointer-events-none">
                      <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="pointer-events-auto w-12 h-12 rounded-full bg-white border-2 border-slate-100 shadow-lg flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-0 transition-all active:scale-90 hover:shadow-xl"
                      >
                        <ChevronLeft size={28} />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentIndex === total - 1}
                        className="pointer-events-auto w-12 h-12 rounded-full bg-white border-2 border-slate-100 shadow-lg flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-0 transition-all active:scale-90 hover:shadow-xl"
                      >
                        <ChevronRight size={28} />
                      </button>
                    </div>

                    {/* Affirmation Card */}
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 border-dashed rounded-[48px] p-10 md:p-16 flex flex-col items-center justify-center text-center relative shadow-inner group transition-all hover:bg-white hover:border-solid hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200/50"
                      >
                        <div className="text-6xl md:text-7xl mb-8 transform transition-transform group-hover:scale-110 duration-500 drop-shadow-sm">
                          {emojiMap[currentIndex % emojiMap.length]}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight italic tracking-tight">
                          "{affirmations[currentIndex]}"
                        </h3>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Finish Button Area */}
                  <div className="w-full max-w-md pt-4">
                    {currentIndex === total - 1 ? (
                      <button
                        onClick={handleComplete}
                        disabled={saving}
                        className="w-full py-6 rounded-[28px] bg-emerald-500 text-white font-sans text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 active:scale-[0.98] flex items-center justify-center gap-3 hover:-translate-y-1"
                      >
                        {saving ? t("saving", "Saving...") : t("complete_practice", "Complete Practice")} <Check size={20} />
                      </button>
                    ) : (
                       <p className="text-center text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mt-4 animate-pulse">
                         {t("continue_reading_to_finish_", "Continue reading to finish •")}
                       </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="✨"
        title={t("self-love_reflected", "Self-Love Reflected")}
        description={t("youve_looked_in_the_mirror_and_seen_your_true_wort", "You've looked in the mirror and seen your true worth. Carry these affirmations in your heart today.")}
        onStartOver={reset}
        startOverText={t("review_guide", "Review Guide")}
        onDone={() => window.history.back()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
