import React from "react";
import { History, Calendar, CheckCircle2, ChevronRight, Brain } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SessionEntry {
  id: string;
  date: string;
  completed: boolean;
  guidedThought?: string;
  guidedRewrite?: string;
  ownThought?: string;
  ownRewrite?: string;
  feeling?: string;
}

interface Props {
  sessions: SessionEntry[];
  onStartNew: () => void;
  onBack: () => void;
}

const feelingLabels: Record<string, string> = {
  much_less_powerful: "Much less powerful",
  little_less_powerful: "A little less powerful",
  about_same: "About the same",
  harder_at_first: "Harder at first",
};

const HistoryScreen: React.FC<Props> = ({ sessions, onStartNew, onBack }) => {
    const { t } = useTranslation("thought_diffusion");
      return (
        <div className="flex flex-col flex-1 py-4">
          <header className="text-center space-y-4 mb-10">
            <div className="flex justify-center flex-col items-center gap-3">
               <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[32px] flex items-center justify-center shadow-inner mb-2">
                  <History size={40} strokeWidth={1.5} />
               </div>
               <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.4em] px-3.5 py-1.5 rounded-full inline-block">
                  {t("activity_journal")}</span>
            </div>
            
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight italic">
               {t("the_record")}</h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
               {sessions.length} {t("entries_stored_locally")}</p>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-1 pb-6">
            {sessions.length === 0 && (
              <div className="py-20 flex flex-col items-center text-center space-y-4 opacity-20">
                 <Brain className="text-slate-300" size={48} />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{t("no_entries_yet")}</p>
              </div>
            )}
            
            {sessions.map((s) => (
              <div key={s.id} className="bg-white border border-slate-50 rounded-[32px] p-6 shadow-sm group hover:border-slate-100 transition-all">
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                       <Calendar size={12} className="text-slate-300" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{s.date}</span>
                    </div>
                    {s.completed && (
                       <div className="bg-emerald-50 text-emerald-500 p-1 rounded-full">
                          <CheckCircle2 size={14} />
                       </div>
                    )}
                 </div>

                 <div className="space-y-4">
                    {(s.guidedRewrite) && (
                       <div className="space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-60">{t("guided_reframing")}</p>
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-xs text-slate-500 font-medium leading-relaxed">
                             "{s.guidedRewrite}"
                          </div>
                       </div>
                    )}
                    {(s.ownRewrite) && (
                       <div className="space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-60">{t("personal_practice")}</p>
                          <div className="bg-emerald-50/20 p-4 rounded-2xl border border-emerald-50/50 italic text-xs text-emerald-900/60 font-medium leading-relaxed">
                             "{s.ownRewrite}"
                          </div>
                       </div>
                    )}
                    {s.feeling && (
                       <div className="flex items-center gap-2 pt-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{t("resilience")}</span>
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                             {feelingLabels[s.feeling] || s.feeling}
                          </span>
                       </div>
                    )}
                 </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={onStartNew}
              className="w-full h-20 rounded-[32px] bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>{t("new_session")}</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onBack}
              className="w-full h-16 rounded-[28px] bg-white text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-2 border-slate-50 transition-all hover:border-slate-100 flex items-center justify-center gap-2"
            >
              <span>{t("return")}</span>
            </button>
          </div>
        </div>
      );
};

export default HistoryScreen;
export type { SessionEntry };
