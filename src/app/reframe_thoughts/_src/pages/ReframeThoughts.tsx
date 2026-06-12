import React, { useState, useCallback } from "react";
import { 
  ArrowLeft, Check, Eye, PenLine, Search, RefreshCw, 
  Heart, CloudLightning, Shield, Compass, Lightbulb,
  ArrowRight, ChevronLeft
} from "lucide-react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("reframe_thoughts");
    return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3"
        >
          {children}
        </button>
      );
}

const decodeQuotes = (text: string) => {
  if (!text) return "";
  return text
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&bdquo;/g, "„")
    .replace(/&ldqu;/g, "“")
    .replace(/&quo;/g, '"')
    .replace(/&ldquo/g, "“")
    .replace(/&rdquo/g, "”");
};

const ReframeThoughts = () => {
    const { t } = useTranslation("reframe_thoughts");
  const [step, setStep] = useState(0);
  const [thought, setThought] = useState("");
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [reframed, setReframed] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const DISTORTIONS = [
    { key: "prediction", label: t("mind_reading"), icon: Eye, desc: "Assuming you know what will happen." },
    { key: "worst_case", label: t("catastrophizing"), icon: CloudLightning, desc: "Believing the worst will happen." },
    { key: "assumption", label: t("emotional_reasoning"), icon: Shield, desc: "Taking feelings as evidence." },
    { key: "feeling", label: t("black__white"), icon: Compass, desc: "Seeing things as all or nothing." },
  ];

  const totalSteps = 5;

  const nextStep = useCallback(async () => {
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    } else {
      setSaving(true);
      try {
        const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
        const apiBase = '/ocd/api';
        await fetch(`${apiBase}/logs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: ocd_user_id, 
            activity_slug: 'reframe_thoughts',
            payload: {
              original_thought: thought,
              distortions: selectedDistortions,
              reframed_thought: reframed,
              date: new Date().toISOString()
            },
          }),
        });
        setShowCompletion(true);
      } catch (e) {
        console.error('Failed to save reframe entry:', e);
      } finally {
        setSaving(false);
      }
    }
  }, [step, thought, selectedDistortions, reframed]);

  const restart = () => {
    setStep(0);
    setThought("");
    setSelectedDistortions([]);
    setReframed("");
    setShowCompletion(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-reframe-thoughts">
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
          <ActivityHistoryDrawer slug="reframe_thoughts" title={t("reframe_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("reframe_thoughts")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("cognitive_resilience")}</p>
        </div>
      </div>

      {/* Main Activity Card */}
      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-12 font-sans min-h-[550px] relative">
          
          {/* Internal Previous Button (<) */}
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-12 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">
              {t("our_thoughts_arent_always_facts_learn_to_catch_the")}</p>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 && (
                <div className="text-center w-full space-y-10">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-6xl transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                       🧠
                    </div>
                  </div>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t("intro_title")}</h2>
                    <p className="text-slate-500 font-medium leading-relaxed italic">{t("intro_p1")}</p>
                  </div>
                  <div className="max-w-md mx-auto pt-4">
                    <ActivityButton onClick={nextStep}>{t("intro_button")} <ArrowRight size={18} /></ActivityButton>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-10 w-full max-w-2xl mx-auto">
                  <header className="text-center space-y-4">
                    <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                         <PenLine size={12} /> 
                       </div>
                       {t("step_01_awareness")}</label>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("identify_title")}</h2>
                    <p className="text-sm text-slate-500 font-medium italic px-4">{t("identify_p1")}</p>
                  </header>
                  <textarea
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder={t("identify_placeholder")}
                    className="w-full h-40 p-8 bg-slate-50 border-2 border-slate-200/80 rounded-[28px] text-lg font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner italic"
                  />
                  <div className="max-w-md mx-auto">
                    <ActivityButton onClick={nextStep} disabled={!thought.trim()}>{t("identify_button")} <ArrowRight size={18} /></ActivityButton>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 w-full max-w-3xl mx-auto">
                  <header className="text-center space-y-4">
                    <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                         <Search size={12} /> 
                       </div>
                       {t("step_02_analysis")}</label>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("examine_title")}</h2>
                    <p className="text-sm text-slate-500 font-medium italic px-4">{t("examine_question")}</p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DISTORTIONS.map((d) => {
                      const isSelected = selectedDistortions.includes(d.label);
                      return (
                        <button
                          key={d.key}
                          onClick={() => setSelectedDistortions(prev => isSelected ? prev.filter(x => x !== d.label) : [...prev, d.label])}
                          className={`flex items-center p-6 rounded-[24px] border-2 text-left gap-5 transition-all ${
                            isSelected ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" : "bg-white border-slate-100 text-slate-600 hover:border-primary/20"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? "bg-white/20" : "bg-primary/5 text-primary border border-primary/10"}`}>
                            <d.icon size={22} strokeWidth={isSelected ? 3 : 2} />
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] font-black uppercase tracking-widest leading-none mb-1">{d.label}</p>
                            <p className={`text-[11px] ${isSelected ? "text-white/70" : "text-slate-400"} italic font-medium`}>{d.desc}</p>
                          </div>
                          {isSelected && <Check size={20} strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="max-w-md mx-auto">
                    <ActivityButton onClick={nextStep} disabled={selectedDistortions.length === 0}>{t("examine_button")} <ArrowRight size={18} /></ActivityButton>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 w-full max-w-2xl mx-auto">
                  <header className="text-center space-y-4">
                    <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                         <Lightbulb size={12} /> 
                       </div>
                       {t("step_03_the_reframe")}</label>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("reframe_title")}</h2>
                    <p className="text-sm text-slate-500 font-medium italic px-4">{t("reframe_question")}</p>
                  </header>
                  <div className="bg-slate-50 p-6 rounded-[24px] border-2 border-slate-100 border-dashed italic text-sm text-slate-500 text-center">
                     {decodeQuotes(t("ldquo"))}{thought}{decodeQuotes(t("rdquo"))}</div>
                  <textarea
                    value={reframed}
                    onChange={(e) => setReframed(e.target.value)}
                    placeholder={t("reframe_placeholder")}
                    className="w-full h-40 p-8 bg-slate-50 border-2 border-slate-200/80 rounded-[28px] text-lg font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner italic"
                  />
                  <div className="max-w-md mx-auto">
                    <ActivityButton onClick={nextStep} disabled={!reframed.trim()}>{t("reframe_button")} <ArrowRight size={18} /></ActivityButton>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center w-full space-y-12">
                  <header className="space-y-4">
                    <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                         <Heart size={12} /> 
                       </div>
                       {t("final_integration")}</label>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t("integration_title")}</h2>
                  </header>
                  
                  <div className="space-y-6 text-left max-w-2xl mx-auto">
                     <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 space-y-8 shadow-inner">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t("the_ocd_narrative")}</p>
                           <p className="text-lg text-slate-400 italic line-through opacity-50 font-medium">{decodeQuotes(t("ldquo"))}{thought}{decodeQuotes(t("rdquo"))}</p>
                        </div>
                        <div className="h-px bg-slate-200 w-1/3 mx-auto" />
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t("the_balanced_perspective")}</p>
                           <p className="text-xl font-bold text-slate-900 italic">{decodeQuotes(t("ldquo"))}{reframed}{decodeQuotes(t("rdquo"))}</p>
                        </div>
                     </div>
                     <p className="text-[13px] text-slate-500 font-medium italic text-center px-6 leading-relaxed">
                       {t("integration_p2")}
                     </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <ActivityButton onClick={nextStep} disabled={saving}>
                      {saving ? t("saving") : t("integration_button")} <ArrowRight size={18} />
                    </ActivityButton>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🧘"
        title={t("thought_reframed")}
        description={t("youve_successfully_challenged_a_distortion_and_fou")}
        onStartOver={restart}
        startOverText={t("reframe_another")}
        showHome={false}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default ReframeThoughts;
