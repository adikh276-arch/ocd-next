import React, { useState, useCallback } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Screen1Welcome from "./Screen1Welcome";
import Screen2WhatsHappening from "./Screen2WhatsHappening";
import Screen3Breathing from "./Screen3Breathing";
import Screen4NameIt from "./Screen4NameIt";
import Screen5BodyCheck from "./Screen5BodyCheck";
import Screen6TheWait from "./Screen6TheWait";
import Screen7DuringWait from "./Screen7DuringWait";
import Screen8Reflection from "./Screen8Reflection";
import Screen9BuildHabit from "./Screen9BuildHabit";
import Screen10Closing from "./Screen10Closing";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Screen = 'welcome' | 'whats-happening' | 'breathing' | 'name-it' | 'body-check' | 'the-wait' | 'during-wait' | 'reflection' | 'build-habit' | 'closing';

interface SessionState {
  worryText: string;
  urgeType: string;
  namingResponse: string;
  bodyAreas: string[];
  timerDuration: number;
  moodEmoji: string;
  reflectionNote: string;
  nextGoal: string;
}

const TOTAL_SCREENS = 10;
const ExerciseController: React.FC = () => {
  const { t, i18n } = useTranslation(["reassurance_resistance", "common"]);
  const searchParams = useSearchParams();

  // Force language change if lang param is present
  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  const screenOrder: Screen[] = [
    'welcome', t("whats-happening"), 'breathing', t("name-it"), t("body-check"), 
    t("the-wait"), t("during-wait"), t("reflection"), t("build-habit"), 'closing'
  ];
      
  const [screen, setScreen] = useState<Screen>('welcome');
  const [sessionData, setSessionData] = useState<SessionState>({
    worryText: '',
    urgeType: '',
    namingResponse: '',
    bodyAreas: [],
    timerDuration: 0,
    moodEmoji: '',
    reflectionNote: '',
    nextGoal: '',
  });
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = useCallback((partial: Partial<SessionState>) => {
    setSessionData(prev => ({ ...prev, ...partial }));
  }, []);

  const goNext = useCallback(() => {
    const currentIndex = screenOrder.indexOf(screen);
    if (currentIndex < screenOrder.length - 1) {
      setScreen(screenOrder[currentIndex + 1]);
    }
  }, [screen, screenOrder]);

  const goBack = useCallback(() => {
    const currentIndex = screenOrder.indexOf(screen);
    if (currentIndex > 0) {
      setScreen(screenOrder[currentIndex - 1]);
    }
  }, [screen, screenOrder]);

  const saveSession = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const payload = {
        worry_text: sessionData.worryText,
        reassurance_urge_type: sessionData.urgeType,
        body_areas: sessionData.bodyAreas,
        timer_duration: sessionData.timerDuration,
        mood_emoji: sessionData.moodEmoji,
        reflection_note: sessionData.reflectionNote,
        next_time_goal: sessionData.nextGoal,
        naming_response: sessionData.namingResponse,
        is_completed: true,
        date: new Date().toISOString(),
      };

      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'reassurance_resistance',
          payload,
        }),
      });

      setShowCompletion(true);
    } catch {
      toast.error('Failed to save session');
    } finally {
      setSaving(false);
    }
  };

  const resetExercise = () => {
    setScreen('welcome');
    setSessionData({
      worryText: '',
      urgeType: '',
      namingResponse: '',
      bodyAreas: [],
      timerDuration: 0,
      moodEmoji: '',
      reflectionNote: '',
      nextGoal: '',
    });
    setShowCompletion(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F8FB] flex flex-col font-sans">
      {/* Top Nav Bar */}
      <div className="w-full px-6 py-4 flex items-center justify-between z-10">
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
        <ActivityHistoryDrawer slug="reassurance_resistance" title={t("resistance_history")} />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 relative min-h-[550px] flex flex-col">
          
          {/* Back Button inside card */}
          {screenOrder.indexOf(screen) > 0 && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Progress Bar */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {screenOrder.map((s, idx) => (
              <div 
                key={s}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx <= screenOrder.indexOf(screen) ? 'w-6 bg-primary' : 'w-2 bg-slate-100'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Context Header */}
            {screen !== 'welcome' && (
              <header className="text-center mb-8">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                  {t("reassurance_resistance")} • {t("cognitive_control")}
                </p>
                <div className="mt-4 h-px w-12 bg-slate-100 mx-auto" />
              </header>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                {screen === 'welcome' && <Screen1Welcome onNext={goNext} />}
                {screen === 'whats-happening' && (
                  <Screen2WhatsHappening
                    onNext={(worry, urge) => {
                      update({ worryText: worry, urgeType: urge });
                      goNext();
                    }}
                  />
                )}
                {screen === 'breathing' && <Screen3Breathing onNext={goNext} />}
                {screen === 'name-it' && (
                  <Screen4NameIt
                    onNext={(response) => {
                      update({ namingResponse: response });
                      goNext();
                    }}
                  />
                )}
                {screen === 'body-check' && (
                  <Screen5BodyCheck
                    onNext={(areas) => {
                      update({ bodyAreas: areas });
                      goNext();
                    }}
                  />
                )}
                {screen === 'the-wait' && (
                  <Screen6TheWait
                    onNext={(duration) => {
                      update({ timerDuration: duration });
                      goNext();
                    }}
                  />
                )}
                {screen === 'during-wait' && <Screen7DuringWait onNext={goNext} />}
                {screen === 'reflection' && (
                  <Screen8Reflection
                    onNext={(emoji, note) => {
                      update({ moodEmoji: emoji, reflectionNote: note });
                      goNext();
                    }}
                  />
                )}
                {screen === 'build-habit' && (
                  <Screen9BuildHabit
                    onNext={(goal) => {
                      update({ nextGoal: goal });
                      goNext();
                    }}
                  />
                )}
                {screen === 'closing' && (
                  <Screen10Closing
                    onComplete={saveSession}
                    saving={saving}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Quote Footer */}
          {screen !== 'welcome' && screen !== 'closing' && (
            <footer className="mt-8 pt-6 border-t border-slate-50 text-center">
              <p className="text-slate-400 text-[11px] font-medium italic opacity-70 px-4">
                {t("every_moment_you_wait_is_a_victory_over_the_cycle_")}
              </p>
            </footer>
          )}
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🛡️"
        title={t("resistance_complete")}
        description={t("youve_practiced_resisting_the_urge_for_reassurance")}
        onStartOver={resetExercise}
        startOverText={t("practice_again")}
        onDone={() => window.history.back()}
        showHome={false}
      />
    </div>
  );
};

export default ExerciseController;
