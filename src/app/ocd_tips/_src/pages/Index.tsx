// @ts-nocheck
import SwipeableCards from "../components/SwipeableCards";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
const Index = () => {
    const { t } = useTranslation("ocd_tips");
    const TIPS = [
      t("notice_the_thought_and_label_it_gently_this_is_an_ocd_though"),
      t("allow_uncertainty_instead_of_trying_to_solve_it_immediately"),
      t("let_uncomfortable_feelings_exist_without_judging_yourself_fo"),
      t("remind_yourself_that_thoughts_are_mental_events_not_facts_or"),
      t("focus_on_what_you_are_doing_in_the_present_moment_not_on_wha"),
      t("practice_slow_breathing_when_anxiety_rises__inhale_slowly_ex"),
      t("keep_a_consistent_sleep_routine_to_support_emotional_regulat"),
      t("eat_regular_balanced_meals_to_avoid_anxiety_spikes_from_low_"),
      t("reduce_caffeine_if_you_notice_it_increases_restlessness_or_i"),
      t("be_kind_to_yourself__progress_in_ocd_recovery_happens_step_b")
    ];
      
      
  const [showCompletion, setShowCompletion] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-ocd_tips">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (window.parent !== window) {
                 window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
              } else {
                 window.location.href = 'https://web.mantracare.com';
              }
             }}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("ocd_recovery_tips")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("mindfulness__resilience")}</p>
        </div>
      </div>

      <main className="w-full max-w-3xl mx-auto z-10 relative">
        <div className="w-full bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-6 md:p-8 min-h-[620px] flex flex-col">
          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-10 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("small_wins_lead_to_big_changes_every_insight_makes_you_stron")}</p>
          </header>

          <div className="flex-1">
            <SwipeableCards key={restartKey} tips={TIPS} onComplete={() => setShowCompletion(true)} />
          </div>
        </div>
      </main>

      <StandardCompletionModal 
        showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="💡"
        title={t("tips_to_remember")}
        description={t("small_wins_lead_to_big_changes_every_insight_you_gain_makes_")}
        onDone={() => window.history.back()}
        onStartOver={() => {
          setShowCompletion(false);
          setRestartKey(prev => prev + 1);
        }}
        startOverText={t("restart_tips")}
      />
    </div>
  );
};

export default Index;
