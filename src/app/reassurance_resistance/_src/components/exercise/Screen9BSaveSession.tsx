import React from 'react';
import ScreenLayout from './ScreenLayout';
import { format } from 'date-fns';
import { Calendar, MessageCircle, Zap, Clock, Smile, Target, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SessionData {
  worryText: string;
  urgeType: string;
  timerDuration: number;
  moodEmoji: string;
  nextGoal: string;
}

interface Screen9BProps {
  sessionData: SessionData;
  onSave: () => void;
  onSkip: () => void;
}

const Screen9BSaveSession: React.FC<Screen9BProps> = ({ sessionData, onSave, onSkip }) => {
    const { t } = useTranslation("reassurance_resistance");
      const SummaryItem = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
        <div className="flex items-center gap-5 p-5 rounded-[32px] bg-white border border-slate-50 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} bg-opacity-10`}>
              <Icon size={20} className={color.replace('bg-', 'text-')} />
           </div>
           <div className="flex-1">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-0.5">{label}</span>
              <p className="text-sm font-bold text-slate-900 leading-tight">{value || '—'}</p>
           </div>
        </div>
      );

  return (
    <ScreenLayout
      buttonText={t("save_progress_")}
      onNext={onSave}
      secondaryButton={{ text: t("skip_for_now_"), onClick: onSkip }}
      currentStep={9}
      totalSteps={11}
    >
      <div className="flex-1 flex flex-col space-y-10 py-6 overflow-y-auto px-1">
        <header className="space-y-4 text-center">
           <div className="relative inline-block">
              <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.4em] px-3.5 py-1.5 rounded-full mb-4 inline-block">
                 {t("session_summary")}</span>
              <Sparkles className="absolute -top-3 -right-6 text-amber-400 opacity-50" size={24} />
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
              {t("session_captured")}</h1>
        </header>

        <div className="grid grid-cols-1 gap-3">
          <SummaryItem 
            icon={Calendar} 
            label={t("timestamp")} 
            value={format(new Date(), 'MMM d, h:mm a')} 
            color="bg-slate-500"
          />
          <SummaryItem 
            icon={MessageCircle} 
            label={t("the_intrusion")} 
            value={sessionData.worryText} 
            color="bg-indigo-500"
          />
          <SummaryItem 
            icon={Zap} 
            label={t("the_impulse")} 
            value={sessionData.urgeType} 
            color="bg-amber-500"
          />
          <SummaryItem 
            icon={Clock} 
            label={t("resistance_time")} 
            value={`${sessionData.timerDuration} $min`} 
            color="bg-blue-500"
          />
          <SummaryItem 
            icon={Smile} 
            label={t("post-state")} 
            value={sessionData.moodEmoji} 
            color="bg-emerald-500"
          />
          {sessionData.nextGoal && (
            <SummaryItem 
               icon={Target} 
               label={t("next_milestone")} 
               value={sessionData.nextGoal} 
               color="bg-rose-500"
            />
          )}
        </div>

        <p className="text-[9px] text-center text-slate-300 font-black uppercase tracking-[0.2em] max-w-[280px] mx-auto">
           {t("saving_this_session_helps_build_your_long-term_res")}</p>
      </div>
    </ScreenLayout>
  );
};

export default Screen9BSaveSession;
