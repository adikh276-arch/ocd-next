import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, TrendingUp, BarChart3, Calendar, MessageCircle, Heart, History, Sparkles, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Session {
  id: string;
  created_at: string;
  worry_text: string | null;
  reassurance_urge_type: string | null;
  timer_duration: number | null;
  mood_emoji: string | null;
  reflection_note: string | null;
  next_time_goal: string | null;
}

interface ProgressDashboardProps {
  onBack: () => void;
}

const urgeIcons: Record<string, any> = {
  'google': '📱',
  'doctor': '👨‍⚕️',
  'ask': '🗣️',
  'check': '🔄',
};

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onBack }) => {
    const { t } = useTranslation("reassurance_resistance");
      const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
        const res = await fetch(`/ocd/api/logs?slug=reassurance_resistance${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
        const result = await res.json();
        if (result.success) {
          const mapped: Session[] = (result.data || []).map((row: any) => ({
            id: row.id,
            created_at: row.created_at,
            ...row.payload,
          }));
          setSessions(mapped);
        }
      } catch (e) {
        console.error('Failed to fetch sessions:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalSessions = sessions.length;
  const maxDuration = Math.max(...sessions.map(s => s.timer_duration || 0), 10);
  
  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex flex-col gap-3">
       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-opacity-10 ${color}`}>
          <Icon size={18} className={color.replace('bg-', 'text-')} />
       </div>
       <div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-0.5">{label}</span>
          <p className="text-xl font-black text-slate-900 tracking-tighter">{value}</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans overflow-hidden">
      <div className="max-w-lg mx-auto w-full px-6 py-12 flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
           <div className="space-y-4">
              <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.4em] px-3.5 py-1.5 rounded-full mb-2 inline-block">
                 {t("performance")}</span>
              <h1 className="text-4xl font-black tracking-tighter italic leading-tight">
                 {t("resistance_insights")}</h1>
           </div>
           <button
             onClick={onBack}
             className="p-4 rounded-full bg-white shadow-xl shadow-slate-200/50 text-slate-400 hover:text-slate-900 transition-all hover:scale-105 active:scale-95"
           >
             <ArrowLeft size={20} />
           </button>
        </div>

        {totalSessions === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-20">
            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200">
               <TrendingUp size={48} strokeWidth={1.5} />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-[240px]">
               {t("finish_your_first_session_to_unlock_trends__milest")}</p>
          </div>
        ) : (
          <div className="flex-1 space-y-10 overflow-y-auto pb-20 custom-scrollbar pr-1">
            {/* Top Stats */}
            <div className="grid grid-cols-2 gap-4">
               <StatCard 
                 icon={Sparkles} 
                 label={t("resilience_level")} 
                 value={`${totalSessions} Sessions`} 
                 color="bg-emerald-500"
               />
               <StatCard 
                 icon={Clock} 
                 label={t("avg_resistance")} 
                 value={`${Math.round(sessions.reduce((a, b) => a + (b.timer_duration || 0), 0) / totalSessions)} Min`} 
                 color="bg-indigo-500"
               />
            </div>

            {/* Time Graph */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 ml-2">
                 <BarChart3 size={16} className="text-slate-400" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {t("resistance_evolution")}</h2>
              </div>
              <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm flex items-end justify-between gap-2 h-56">
                {sessions.slice(-7).map((s, i) => {
                  const height = ((s.timer_duration || 0) / maxDuration) * 100;
                  return (
                    <div key={s.id} className="flex-1 flex flex-col items-center gap-3">
                      <div 
                         className="w-full max-w-[40px] rounded-[14px] bg-slate-900 transition-all duration-1000 relative group overflow-hidden" 
                         style={{ height: `${Math.max(height, 5)}%` }}
                      >
                         <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">
                        {format(new Date(s.created_at), 'M/dd')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Reflections */}
            <section className="space-y-6">
               <div className="flex items-center gap-3 ml-2">
                  <Heart size={16} className="text-slate-400" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                     {t("clinical_reflections")}</h2>
               </div>
               <div className="space-y-4">
                 {sessions.slice().reverse().slice(0, 5).map((s, i) => (
                   <motion.div 
                     key={s.id}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white rounded-[32px] p-8 border border-slate-50 shadow-sm space-y-6 relative overflow-hidden"
                   >
                     <div className="flex justify-between items-start relative z-10">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-xl">
                              {s.mood_emoji || '😐'}
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                                 {format(new Date(s.created_at), 'MMM d, yyyy')}
                              </p>
                              <p className="text-xs font-bold text-slate-900 italic">
                                 {s.reassurance_urge_type || 'General Resistance'}
                              </p>
                           </div>
                        </div>
                     </div>
                     
                     <div className="space-y-3 relative z-10">
                        {s.worry_text && (
                          <div className="flex gap-4">
                             <div className="w-1 rounded-full bg-slate-100" />
                             <p className="text-sm font-medium text-slate-500 leading-relaxed italic">"{s.worry_text}"</p>
                          </div>
                        )}
                        {s.reflection_note && (
                          <div className="bg-slate-50 rounded-2xl p-4 text-xs font-bold text-slate-400 leading-relaxed">
                             {s.reflection_note}
                          </div>
                        )}
                     </div>
                   </motion.div>
                 ))}
               </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;
