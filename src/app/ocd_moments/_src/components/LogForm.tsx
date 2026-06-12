import { useState, useEffect, useMemo } from 'react';
import { Home, Briefcase, Users, MapPin, Zap, Clock, Shield, ArrowRight, Loader2, MessageCircle, History } from 'lucide-react';
import { saveEntry, LogEntry } from '../lib/storage';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function ActivityButton({ children, onClick, disabled, loading }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean }) {
    const { t } = useTranslation("ocd_moments");
      return (
        <button
          onClick={onClick}
          disabled={disabled || loading}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-sans text-[15px] font-bold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </button>
      );
}

export default function LogForm() {
    const { t, i18n } = useTranslation("ocd_moments");
  const locations = [
    { key: 'home' as const, label: t("home"), icon: Home },
    { key: 'work' as const, label: t("work"), icon: Briefcase },
    { key: 'social' as const, label: t("social"), icon: Users },
    { key: 'other' as const, label: t("other"), icon: MapPin },
  ];
  const responses = [
    { key: 'acted' as const, label: t("acted"), desc: t('acted_desc'), icon: Zap, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-500' },
    { key: 'waited' as const, label: t("delayed"), desc: t('delayed_desc'), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-500' },
    { key: 'resisted' as const, label: t("resisted"), desc: t('resisted_desc'), icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500' },
  ];

  const apiBase = '/ocd/api';
  const [location, setLocation] = useState<string | null>(null);
  const [urge, setUrge] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [allEntries, setAllEntries] = useState<LogEntry[]>([]);

  // Fetch ALL entries once on mount for instant filtering
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
        const res = await fetch(`${apiBase}/logs?slug=ocd_moments${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
        if (!res.ok) return;
        const result = await res.json();
        const entries: LogEntry[] = (result.data || []).map((row: any) => ({
          id: row.id,
          timestamp: row.created_at,
          ...row.payload,
        }));
        setAllEntries(entries);
      } catch (e) {
        console.error("Failed to pre-fetch entries", e);
      }
    };
    fetchAll();
  }, []);

  // Instant local filtering
  const recentUrges = useMemo(() => {
    if (!location) return [];
    const filtered = allEntries
      .filter(e => e.location === location)
      .map(e => e.urge);
    
    // Get unique urges while preserving recency
    const unique = [];
    const seen = new Set();
    for (const u of filtered) {
      if (!seen.has(u)) {
        unique.push(u);
        seen.add(u);
      }
      if (unique.length >= 5) break;
    }
    return unique;
  }, [location, allEntries]);

  const handleSave = async () => {
    if (!location || !urge.trim() || !response || saving) return;
    setSaving(true);
    try {
      await saveEntry({
        location,
        urge: urge.trim(),
        response,
      });
      
      // Update local cache immediately so the next log is quick
      const newEntry: LogEntry = {
        id: Math.random().toString(),
        timestamp: new Date().toISOString(),
        location,
        urge: urge.trim(),
        response,
      };
      setAllEntries(prev => [newEntry, ...prev]);

      setLocation(null);
      setUrge('');
      setResponse(null);
      setShowCompletion(true);
    } catch (e) {
      // toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 space-y-10 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
      
      {/* Date Header */}
      <header className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
           {today}
        </h2>
        <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("a_conscious_record_of_your_resilience")}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="space-y-8 lg:space-y-10">
          {/* 1. Location */}
          <section className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
           <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
              <MapPin size={12} className="text-blue-500" /> 
           </div>
           {t("where_were_you")}</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {locations.map((loc) => {
            const Icon = loc.icon;
            const active = location === loc.key;
            return (
              <button
                key={loc.key}
                onClick={() => setLocation(loc.key)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all border-2 ${
                   active 
                    ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105 z-10' 
                    : 'bg-slate-50 border-slate-200/80 text-slate-500 hover:border-primary/40 hover:bg-white'
                }`}
              >
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{loc.label}</span>
              </button>
            );
          })}
        </div>
      </section>

        {/* 3. Response */}
        <section className="space-y-4">
         <div className="flex items-center justify-between">
           <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                <MessageCircle size={12} className="text-emerald-500" /> 
              </div>
              {t("the_thought_or_urge")}</label>
           {location && recentUrges.length > 0 && (
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                 <History size={10} /> {t("instant_history")}</span>
           )}
         </div>

         <AnimatePresence mode="popLayout">
           {location && recentUrges.length > 0 && (
             <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-wrap gap-2"
             >
                {recentUrges.map((u, i) => (
                   <button
                    key={i}
                    onClick={() => setUrge(u)}
                    className="text-[11px] font-medium px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
                  >
                    {u.length > 30 ? u.substring(0, 30) + '...' : u}
                  </button>
                ))}
             </motion.div>
           )}
         </AnimatePresence>

         <textarea
            value={urge}
            onChange={(e) => setUrge(e.target.value)}
            placeholder={location ? t("whats_on_your_mind_at_location", { location: t(location) }) : t("capture_the_thought_as_it_appears")}
            className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-2xl p-6 text-slate-900 outline-none focus:border-primary/40 focus:bg-white focus:shadow-inner transition-all min-h-[140px] md:min-h-0 flex-1 resize-none text-[16px] font-medium leading-relaxed placeholder:text-slate-400"
         />
      </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8 lg:space-y-10 flex flex-col">
          {/* 2. Intrusion */}
          <section className="space-y-4 flex flex-col h-full">
         <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-100">
              <Zap size={12} className="text-amber-500" /> 
            </div>
            {t("the_response_strategy")}</label>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {responses.map((res) => {
              const Icon = res.icon;
              const active = response === res.key;
              return (
                <button
                  key={res.key}
                  onClick={() => setResponse(res.key)}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl transition-all border-2 text-center ${
                    active 
                     ? `${res.bg} ${res.border} shadow-lg scale-105` 
                     : 'bg-slate-50 border-slate-200/80 text-slate-500 hover:border-primary/40 hover:bg-white'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100">
                     <Icon size={22} className={res.color} strokeWidth={active ? 2.5 : 2} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${active ? res.color : ''}`}>{res.label}</span>
                </button>
              );
            })}
          </div>
          </section>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6">
        <ActivityButton onClick={handleSave} disabled={!urge.trim() || !location || !response} loading={saving}>
          {t("store_this_moment")}<ArrowRight size={18} />
        </ActivityButton>
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🎯"
        title={t("moment_logged")}
        description={t("youve_successfully_taken_notice_of_an_ocd_moment_a")}
        onStartOver={() => setShowCompletion(false)}
        startOverText={t("log_new_moment")}
        showHome={false}
        onDone={() => window.history.back()}
      />
    </div>
  );
}
