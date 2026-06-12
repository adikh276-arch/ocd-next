import { useState } from "react";
import { ArrowLeft, RotateCcw, ArrowRight, Check, ChevronLeft } from "lucide-react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { getStoredUserId } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
type Step = "selection" | "reflect1" | "reflect2" | "reflect3";

const Index = () => {
    const { t, i18n } = useTranslation("vibe_tracker");
    const MOODS = [
      { id: "calm", label: t("calm"), emoji: "🌷" },
      { id: "light", label: t("light"), emoji: "⛅" },
      { id: "driven", label: t("driven"), emoji: "🔥" },
      { id: "content", label: t("content"), emoji: "🌸" },
      { id: "steady", label: t("steady"), emoji: "🌊" },
      { id: "tender", label: t("tender"), emoji: "🤍" },
      { id: "heavy", label: t("heavy"), emoji: "🌧️" },
      { id: "thoughtful", label: t("thoughtful"), emoji: "☁️" },
      { id: "restless", label: t("restless"), emoji: "⚡" },
      { id: "drained", label: t("drained"), emoji: "💔" },
    ];
      
      const apiBase = '/ocd/api';
  const [step, setStep] = useState<Step>("selection");
  const [vibe, setVibe] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [reflection1, setReflection1] = useState("");
  const [reflection2, setReflection2] = useState("");
  const [reflection3, setReflection3] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVibeSelect = (label: string) => {
    setVibe(label);
    setCustomVibe(""); // Clear custom if preset selected
  };

  const handleNext = () => {
    if (step === "selection") {
      if (vibe || customVibe.trim()) {
        setStep("reflect1");
      }
    } else if (step === "reflect1") {
      setStep("reflect2");
    } else if (step === "reflect2") {
      setStep("reflect3");
    }
  };

  const handlePrev = () => {
    if (step === "reflect1") setStep("selection");
    else if (step === "reflect2") setStep("reflect1");
    else if (step === "reflect3") setStep("reflect2");
  };

  const todayDate = new Date().toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userId = getStoredUserId() || "";
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          activity_slug: 'vibe_tracker',
          payload: { 
            vibe: vibe || customVibe,
            trigger: reflection1,
            bodySensation: reflection2,
            action: reflection3,
            date: new Date().toISOString() 
          },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log vibe reflection:", e);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("selection");
    setVibe("");
    setCustomVibe("");
    setReflection1("");
    setReflection2("");
    setReflection3("");
    setShowCompletion(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-vibe_tracker">
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
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <ActivityHistoryDrawer slug="vibe_tracker" title={t("vibe_history")} />
          </div>
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("vibe_tracker")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("energy_awareness")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 font-sans min-h-[500px] relative">
          
          {/* Internal Back Button (<) */}
          {step !== "selection" && (
            <button
              onClick={handlePrev}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_question")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Date Header inside card */}
          <header className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
               {todayDate}
            </h2>
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("take_a_breath_and_notice_your_energy_in_this_momen")}</p>
          </header>

          <AnimatePresence mode="wait">
            {step === "selection" && (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div className="grid grid-cols-2 gap-3 order-2 md:order-1">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => handleVibeSelect(mood.label)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        vibe === mood.label 
                          ? "bg-primary/5 text-primary border-primary shadow-sm scale-[1.02]" 
                          : "bg-slate-50 border-slate-200/80 text-slate-500 hover:border-primary/40 hover:bg-white"
                      }`}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {mood.label}
                      </span>
                      {vibe === mood.label && <Check size={14} className="ml-auto text-primary" />}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col justify-center space-y-8 order-1 md:order-2">
                  <div className="space-y-4">
                    <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">
                      {t("how_are_you_feeling_in_this_moment")}</h2>
                    <p className="text-slate-500 text-[14px] leading-relaxed italic">{t("noticing_your_energy_is_the_first_step_to_emotiona")}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">
                      {t("or_describe_your_own_vibe")}</p>
                    <input
                      type="text"
                      value={customVibe}
                      onChange={(e) => {
                         setCustomVibe(e.target.value);
                         setVibe(""); // Clear preset if custom typing
                      }}
                      placeholder={t("right_now_i_feel")}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200/80 rounded-xl outline-none focus:border-primary/40 focus:bg-white text-slate-700 font-medium placeholder:text-slate-300 transition-all shadow-inner"
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!vibe && !customVibe.trim()}
                    className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/10 flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-20 mt-4"
                  >
                    {t("continue")}<ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step.startsWith("reflect") && (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-slate-200/80 border-dashed rounded-[28px]">
                  <div className="text-[80px] mb-6 drop-shadow-sm">
                    {MOODS.find(m => m.label === vibe)?.emoji || "🧘"}
                  </div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">{t("current_vibe")}</h3>
                  <p className="text-xl font-bold text-slate-700 mt-2">{vibe || customVibe}</p>
                </div>

                <div className="flex flex-col space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">{t("pause__reflect")}</h2>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            step === `reflect${i}` ? "w-10 bg-primary" : "w-2 bg-slate-100"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[15px] font-medium text-slate-600 leading-relaxed italic border-l-4 border-primary/20 pl-4 py-1">
                      {step === "reflect1" && t("what_happened_before_this_feeling_showed_up")}
                      {step === "reflect2" && t("where_do_you_notice_this_feeling_in_your_body")}
                      {step === "reflect3" && t("is_this_something_you_want_to_sit_with_or_shift_gentl")}
                    </p>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">
                        {t("type_your_reflection")}</p>
                      <textarea
                        autoFocus
                        value={step === "reflect1" ? reflection1 : step === "reflect2" ? reflection2 : reflection3}
                        onChange={(e) => {
                          if (step === "reflect1") setReflection1(e.target.value);
                          if (step === "reflect2") setReflection2(e.target.value);
                          if (step === "reflect3") setReflection3(e.target.value);
                        }}
                        placeholder={t("type_here")}
                        className="w-full min-h-[160px] p-6 bg-slate-50 border-2 border-slate-200/80 rounded-[24px] outline-none focus:border-primary/40 focus:bg-white text-slate-700 font-medium placeholder:text-slate-300 resize-none transition-all leading-relaxed italic shadow-inner"
                      />
                    </div>

                    <button
                      onClick={step === "reflect3" ? handleSubmit : handleNext}
                      disabled={
                        loading || 
                        (step === "reflect1" && !reflection1.trim()) || 
                        (step === "reflect2" && !reflection2.trim()) || 
                        (step === "reflect3" && !reflection3.trim())
                      }
                      className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/10 flex items-center justify-center gap-3 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-20"
                    >
                      {loading ? t("saving") : step === "reflect3" ? t("submit_reflection") : t("next_step")}
                      {step === "reflect3" ? <Check size={18} /> : <ArrowRight size={18} />}
                    </button>
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
        emoji="🧘"
        title={t("session_recorded")}
        description={t("every_moment_of_mindfulness_builds_your_resilience")}
        onDone={() => window.history.back()}
        onStartOver={reset}
        showHome={false}
      />
    </div>
  );
};

export default Index;
