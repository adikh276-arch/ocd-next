import { useState } from 'react';
import { Ritual, formatMins } from './types';
import { TrendingUp, Calendar, Zap, ChevronRight } from 'lucide-react';
import { useTranslation } from "react-i18next";

interface Props {
  rituals: Ritual[];
  onNext: (reflection: string) => void;
}

const Screen3CostReveal = ({ rituals, onNext }: Props) => {
    const { t } = useTranslation("ritual_cost");
      const [reflection, setReflection] = useState('');

  const dailyMins = rituals.reduce((s, r) => s + r.timesPerDay * r.minsEach, 0);
  const weeklyMins = dailyMins * 7;
  const yearlyMins = dailyMins * 365;
  const yearlyDays = Math.round(yearlyMins / (24 * 60));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        
        {/* Left Side: Stats and Year Reveal */}
        <div className="flex-1 w-full space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                  {t("the_impact")}</span>
               <div className="h-px w-8 bg-primary/20 md:hidden" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight italic">
               {t("here_is_what_ocd_is_stealing")}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <Calendar size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t("per_day")}</span>
                </div>
                <p className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                  {formatMins(dailyMins)}
                </p>
             </div>
             <div className="bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <TrendingUp size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t("per_week")}</span>
                </div>
                <p className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                  {formatMins(weeklyMins)}
                </p>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-10 text-center shadow-2xl shadow-slate-200 relative overflow-hidden group">
             <Zap className="absolute -top-6 -right-6 text-white/5 group-hover:scale-110 transition-transform duration-700" size={140} />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-3 block relative z-10">{t("total_yearly_loss")}</span>
             <div className="flex items-baseline justify-center gap-3 mb-3 relative z-10">
                <span className="text-7xl font-black text-white tabular-nums tracking-tighter">
                  {yearlyDays}
                </span>
                <span className="text-primary text-base font-black uppercase tracking-[0.2em]">{t("full_days")}</span>
             </div>
             <p className="text-sm text-white/40 font-bold italic relative z-10">
                {t("thats")}{yearlyDays} {t("days_of_pure_life_reclaimed")}</p>
          </div>
        </div>

        {/* Right Side: Reflection */}
        <div className="flex-1 w-full space-y-8">
           <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[32px] p-10 space-y-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
              
              <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed italic relative z-10">
                {t("you_are_giving_ocd")}<span className="text-primary not-italic">{yearlyDays} {t("full_days")}</span> {t("of_your_year_what_would_you_do_with_that_time_inst")}</p>
              
              <div className="space-y-4 pt-4 relative z-10">
                 <label className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] ml-2">{t("i_would_use_that_time_to")}</label>
                 <textarea
                   value={reflection}
                   onChange={e => setReflection(e.target.value)}
                   placeholder={t("eg_learn_to_paint_travel_spend_time_with_family")}
                   className="w-full h-40 p-6 bg-white border-2 border-primary/10 rounded-[24px] text-lg font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-primary/30 transition-all shadow-inner italic"
                 />
              </div>
           </div>

           <div className="w-full pt-4">
             <button
               onClick={() => onNext(reflection)}
               disabled={!reflection.trim()}
               className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
             >
               {t("lock_reflection")}<ChevronRight size={20} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Screen3CostReveal;
