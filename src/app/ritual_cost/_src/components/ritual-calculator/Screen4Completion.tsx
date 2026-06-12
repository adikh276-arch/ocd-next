import { Ritual, formatMins } from './types';
import { BookOpen, Palmtree, Heart, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  rituals: Ritual[];
  onDone: () => void;
  saving: boolean;
}

const Screen4Completion = ({ rituals, onDone, saving }: Props) => {
    const { t } = useTranslation("ritual_cost");
      const dailyMins = rituals.reduce((s, r) => s + r.timesPerDay * r.minsEach, 0);
  const yearlyDays = Math.round((dailyMins * 365) / (24 * 60));
  
  const halfDays = yearlyDays / 2;
  const books = Math.floor(halfDays * 1.5);
  const hours = Math.round((halfDays * 24));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        
        {/* Left Side: Summary and Goal */}
        <div className="flex-1 w-full space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="h-px w-8 bg-primary/20" />
               <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                  {t("summary_complete")}</span>
               <div className="h-px w-8 bg-primary/20 md:hidden" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
               {t("your_reclamation_plan")}</h2>
            <p className="text-lg text-slate-500 font-medium italic">
               {t("seeing_the_cost_is_the_first_step_to_taking_your_t")}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("daily_cost")}</span>
                <p className="text-xl font-black text-slate-900 tabular-nums">
                  {formatMins(dailyMins)}
                </p>
             </div>
             <div className="bg-slate-50 border-2 border-slate-100 rounded-[24px] p-6 text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("yearly_cost")}</span>
                <p className="text-xl font-black text-primary tabular-nums">
                  {yearlyDays} {t("days")}</p>
             </div>
          </div>

          <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[32px] p-8 text-center relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
             <Sparkles className="text-primary/20 absolute -top-4 -right-4" size={80} />
             
             <div className="relative z-10 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  {t("the_50_reduction_goal")}</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  {t("reclaim")}<span className="text-primary italic">{Math.round(halfDays)} {t("days")}</span> {t("every_single_year")}</h3>
             </div>
          </div>
        </div>

        {/* Right Side: Possibilities */}
        <div className="flex-1 w-full space-y-8">
           <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center md:text-left ml-2">{t("with_that_time_you_could")}</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-6 bg-white p-6 rounded-[28px] border-2 border-slate-100 group transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-slate-100">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-110 transition-transform">
                       <Palmtree size={28} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t("travel")}</p>
                      <span className="text-lg font-black text-slate-800 leading-tight">{t("take_multiple_spontaneous_holidays")}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 bg-white p-6 rounded-[28px] border-2 border-slate-100 group transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-slate-100">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
                       <BookOpen size={28} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t("learning")}</p>
                      <span className="text-lg font-black text-slate-800 leading-tight">{t("read")}{books} {t("books_cover_to_cover")}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 bg-white p-6 rounded-[28px] border-2 border-slate-100 group transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-slate-100">
                    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shrink-0 group-hover:scale-110 transition-transform">
                       <Heart size={28} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t("connections")}</p>
                      <span className="text-lg font-black text-slate-800 leading-tight">{hours} {t("more_hours_with_loved_ones")}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="w-full pt-4">
             <button
               onClick={onDone}
               disabled={saving}
               className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
             >
               {saving ? 'Saving...' : 'Complete Analysis'} <ChevronRight size={20} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Screen4Completion;
