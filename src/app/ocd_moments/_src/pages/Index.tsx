import { useState } from 'react';
import LogForm from '../components/LogForm';
import History from '../components/History';
import Insights from '../components/Insights';
import { TrendingUp, PenLine, Clock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

type Tab = 'log' | 'history' | 'insights';

const Index = () => {
    const { t } = useTranslation("ocd_moments");
      const [tab, setTab] = useState<Tab>('log');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans">
      {/* Decorative background blobs - soft calming colors */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10">
        <div className="flex items-center">
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

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("daily_moments")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("strategic_recovery_tracking")}</p>
        </div>

        <div className="flex gap-1 p-1 bg-slate-200/50 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto w-full">
          {[
            { id: 'log', label: t("log"), icon: PenLine },
            { id: 'history', label: t("timeline"), icon: Clock },
            { id: 'insights', label: t("insights"), icon: TrendingUp },
          ].map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as Tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all border-2 ${active
                  ? 'bg-white text-slate-900 shadow-md border-white'
                  : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-200'
                }`}
              >
                <Icon size={14} strokeWidth={active ? 2.5 : 2} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
         <AnimatePresence mode="wait">
           <motion.div
             key={tab}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.3 }}
             className="min-h-[500px]"
           >
             {tab === 'log' && <LogForm />}
             {tab === 'history' && <History onBack={() => setTab('log')} />}
             {tab === 'insights' && <Insights onBack={() => setTab('log')} />}
           </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
