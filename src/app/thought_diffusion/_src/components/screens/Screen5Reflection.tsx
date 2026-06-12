import React from "react";
import { CheckCircle2, TrendingUp, Trophy, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const feelings = [
  { value: "much_less_powerful", emoji: "💜", label: t("much_less_powerful") },
  { value: "little_less_powerful", emoji: "🙂", label: t("a_little_less_powerful") },
  { value: "about_same", emoji: "😐", label: t("about_the_same") },
  { value: "harder_at_first", emoji: "😔", label: t("harder_at_first") },
] as const;

interface Props {
  feeling: string;
  onFeelingChange: (v: string) => void;
  onComplete: () => void;
  saving: boolean;
}

const Screen5Reflection: React.FC<Props> = ({ feeling, onFeelingChange, onComplete, saving }) => {
    const { t } = useTranslation("thought_diffusion");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            
            {/* Left Side: The Insight */}
            <div className="flex-1 w-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <div className="h-px w-8 bg-primary/20" />
                   <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                      {t("reflect")}</span>
                   <div className="h-px w-8 bg-primary/20 md:hidden" />
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                   {t("power_distance")}</h2>
                <p className="text-lg text-slate-500 font-medium italic">
                   {t("you_are_the_observer_of_your_thoughts_not_the_thou")}</p>
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[32px] p-10 space-y-6 group hover:border-emerald-200 transition-all relative overflow-hidden">
                 <Trophy className="absolute -top-4 -right-4 text-emerald-500/10 group-hover:scale-110 transition-transform duration-700" size={120} />
                 <div className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-sm relative z-10">
                    <TrendingUp size={28} />
                 </div>
                 <div className="space-y-2 relative z-10">
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{t("insight")}</h4>
                    <p className="text-lg font-bold text-emerald-900/80 leading-relaxed italic">
                       {t("this_distance_is_where_your_freedom_lives_labeling")}</p>
                 </div>
              </div>
            </div>

            {/* Right Side: Reflection */}
            <div className="flex-1 w-full space-y-8">
              <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-8 shadow-xl shadow-slate-100/50">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                   {t("how_powerful_is_the_thought_now")}</h3>
                 
                 <div className="grid grid-cols-1 gap-3">
                   {feelings.map((f) => {
                     const isSelected = feeling === f.value;
                     return (
                       <button
                         key={f.value}
                         onClick={() => onFeelingChange(f.value)}
                         className={`w-full p-6 rounded-[24px] border-2 transition-all flex items-center justify-between text-left group ${
                           isSelected 
                             ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                             : 'bg-white border-slate-100 text-slate-600 hover:border-primary/20'
                         }`}
                       >
                         <div className="flex items-center gap-4">
                           <span className="text-2xl group-hover:scale-110 transition-transform">{f.emoji}</span>
                           <span className={`text-base font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                              {t(f.label)}
                           </span>
                         </div>
                         {isSelected && <CheckCircle2 size={20} className="text-white" />}
                       </button>
                     );
                   })}
                 </div>
              </div>

              <div className="w-full pt-4">
                <button
                  onClick={() => onComplete()}
                  disabled={!feeling || saving}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
                >
                  {saving ? "Saving..." : "Complete Journey"} <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Screen5Reflection;
