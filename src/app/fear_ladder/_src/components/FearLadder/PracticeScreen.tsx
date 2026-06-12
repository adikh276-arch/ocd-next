import { useState } from "react";
import { LadderStep } from "./LadderBuilder";
import { DayLog } from "@/app/fear_ladder/_src/hooks/useFearLadderStorage";
import { Check, ArrowRight, MessageSquare, ShieldCheck, Thermometer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PracticeScreenProps {
  completedCount: number;
  currentStep: LadderStep;
  alreadyLogged: boolean;
  onSave: (log: DayLog) => Promise<{ success: boolean }>;
}

const PracticeScreen = ({
  completedCount,
  currentStep,
  alreadyLogged,
  onSave,
}: PracticeScreenProps) => {
    const { t } = useTranslation("fear_ladder");
      const [anxietyBefore, setAnxietyBefore] = useState(50);
  const [anxietyAfter, setAnxietyAfter] = useState(50);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedDay, setCompletedDay] = useState<number | null>(null);

  const stepNumber = completedCount + 1;
  const dayNumber = completedCount + 2; // Day 1 is build, so step 1 = day 2

  const handleSave = async () => {
    if (saving || alreadyLogged) return;
    setSaving(true);

    // Capture the current day number before saving
    const currentDay = dayNumber;

    const result = await onSave({
      day: stepNumber,
      stepId: currentStep.id,
      anxietyBefore,
      anxietyAfter,
      notes,
      completedAt: new Date().toISOString(),
    });

    setSaving(false);
    if (result.success) {
      setCompletedDay(currentDay);
      setShowSuccess(true);
    }
  };

  const handleNextDay = () => {
    setShowSuccess(false);
    setCompletedDay(null);
    // Reset local sliders for next day
    setAnxietyBefore(50);
    setAnxietyAfter(50);
    setNotes("");
  };

  if (showSuccess || alreadyLogged) {
    const displayDay = completedDay || dayNumber;
    const isFinal = completedCount >= 10; 

    return (
      <div className="flex items-center justify-center py-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-slate-100 rounded-[32px] p-10 text-center max-w-md w-full shadow-2xl space-y-8"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-500 border-2 border-emerald-100 shadow-inner">
            <Check size={40} strokeWidth={3} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("day")}{displayDay} {t("practice_completed")}</h2>
            <p className="text-sm font-medium text-slate-500 italic">
              {t("you_showed_up_for_yourself_today_every_small_step_")}</p>
            
            <div className="bg-primary/5 rounded-[24px] p-6 mt-6 border-2 border-primary/10 border-dashed">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t("progress_tip")}</span>
                <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                  {t("to_ensure_lasting_growth_we_recommend_waiting_unti")}</p>
              </div>
            </div>
          </div>

          {!isFinal && (
            <button
              onClick={handleNextDay}
              className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98]"
            >
              {t("continue_to_day")}{displayDay + 1}
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Current step card */}
      <div className="bg-slate-50 border-2 border-primary/20 border-dashed rounded-[24px] p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <ShieldCheck size={120} />
        </div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center gap-2">
             <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/10">
                <ShieldCheck size={12} /> 
             </div>
             {t("active_step")}{stepNumber}
          </label>
          <span className="text-[10px] font-black px-4 py-2 rounded-full bg-white text-primary border-2 border-primary/10 uppercase tracking-widest">
            {t("level")}{currentStep.anxiety} / 10
          </span>
        </div>
        <p className="text-2xl font-bold text-slate-800 relative z-10 leading-tight">{currentStep.situation}</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Anxiety Before */}
        <section className="space-y-6 bg-white border-2 border-slate-100 p-8 rounded-[24px] shadow-sm">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
             <div className="w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200/60">
                <Thermometer size={12} className="text-slate-400" /> 
             </div>
             {t("anxiety_before_0-100")}</label>
          
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={anxietyBefore}
              onChange={(e) => setAnxietyBefore(Number(e.target.value))}
              className="w-full h-2 accent-primary cursor-pointer appearance-none bg-slate-100 rounded-full"
            />
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t("calm")}</span>
              <div className="px-4 py-1.5 bg-primary/5 rounded-lg border border-primary/10">
                 <span className="text-lg font-black text-primary">{anxietyBefore}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t("high")}</span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-400/60 uppercase tracking-widest text-center italic pt-2">
             {t("notice_the_physical_sensations_without_judgment")}</p>
        </section>

        {/* Anxiety After */}
        <section className="space-y-6 bg-white border-2 border-slate-100 p-8 rounded-[24px] shadow-sm">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
             <div className="w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200/60">
                <Thermometer size={12} className="text-slate-400" /> 
             </div>
             {t("anxiety_after_0-100")}</label>
          
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={anxietyAfter}
              onChange={(e) => setAnxietyAfter(Number(e.target.value))}
              className="w-full h-2 accent-primary cursor-pointer appearance-none bg-slate-100 rounded-full"
            />
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t("calm")}</span>
              <div className="px-4 py-1.5 bg-primary/5 rounded-lg border border-primary/10">
                 <span className="text-lg font-black text-primary">{anxietyAfter}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t("high")}</span>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="space-y-4 bg-white border-2 border-slate-100 p-8 rounded-[24px] shadow-sm">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
             <div className="w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200/60">
                <MessageSquare size={12} className="text-slate-400" /> 
             </div>
             {t("reflection_notes")}<span className="opacity-40 italic ml-1">{t("optional")}</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("how_did_it_go_what_did_you_notice_about_your_respo")}
            rows={4}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-slate-800 outline-none focus:border-primary/40 focus:bg-white transition-all resize-none font-medium italic text-[15px] shadow-inner placeholder:text-slate-300"
            maxLength={500}
          />
        </section>
      </div>

      {/* Save Button */}
      <div className="pt-4 pb-12">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {saving ? t("storing_progress") : t("complete_todays_practice")}
          {!saving && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PracticeScreen;
