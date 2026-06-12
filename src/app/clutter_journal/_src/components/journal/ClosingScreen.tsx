import { useState } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ClosingScreenProps {
  objectName: string;
  insight: string;
  onViewJournal: () => void;
  onClose: () => void;
  onBack: () => void;
  onReset: () => void;
}

const ClosingScreen = ({ objectName, insight, onViewJournal, onReset }: ClosingScreenProps) => {
    const { t } = useTranslation("clutter_journal");
      const [showCompletion, setShowCompletion] = useState(false);

  const saveEntry = async () => {
    try {
      const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          activity_slug: 'clutter_journal',
          payload: {
            objectName: objectName,
            insight,
            date: new Date().toISOString(),
          },
        }),
      });
    } catch (e) {
      console.error("Failed to save journal entry:", e);
    }
  };

  const handleFinish = async () => {
    await saveEntry();
    setShowCompletion(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10 space-y-6">
        <div className="flex justify-center">
           <div className="w-24 h-24 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center border-2 border-primary/10">
             <CheckCircle2 size={48} strokeWidth={2} />
           </div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t("you_just_did_something_brave")}</h1>
        <p className="text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
          {t("most_people_never_ask_why_they_hold_on_you_did_tha")}</p>
      </div>

      <div className="w-full max-w-2xl space-y-4 mb-10">
        <div className="p-6 bg-slate-50 border-2 border-slate-100 rounded-[24px] space-y-2">
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 opacity-70">{t("todays_object")}</p>
          <p className="text-xl font-bold text-slate-800 italic">{objectName}</p>
        </div>

        <div className="p-6 bg-primary/5 border-2 border-primary/10 rounded-[24px] space-y-2">
          <p className="text-[10px] uppercase font-black tracking-widest text-primary/60">{t("what_its_holding")}</p>
          <p className="text-xl font-bold text-primary italic">{insight}</p>
        </div>
      </div>

      <p className="text-slate-400 font-bold text-[11px] italic mb-10 text-center px-4 uppercase tracking-widest">
        {t("come_back_whenever_youre_ready_to_explore_another_")}</p>

      <div className="w-full max-w-md space-y-3 shrink-0">


        <button
          onClick={handleFinish}
          className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] transition-all hover:shadow-xl active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          {t("close_for_today")}<ChevronRight size={20} />
        </button>
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌸"
        title={t("reflection_complete")}
        description={t("every_entry_is_a_moment_of_courage_youre_learning_")}
        showHome={false}
        onStartOver={onReset}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default ClosingScreen;
