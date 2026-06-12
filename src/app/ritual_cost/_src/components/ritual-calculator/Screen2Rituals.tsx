import { useState } from 'react';
import { Ritual, DEFAULT_RITUALS, formatMins } from './types';
import { Plus, Minus, Clock, ChevronRight, Search } from 'lucide-react';
import { useTranslation } from "react-i18next";

interface Props {
  initialRituals: Ritual[];
  onNext: (rituals: Ritual[]) => void;
}

const Screen2Rituals = ({ initialRituals, onNext }: Props) => {
    const { t } = useTranslation("ritual_cost");
      const [step, setStep] = useState<'select' | 'configure'>(initialRituals.length > 0 ? 'configure' : 'select');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialRituals.map(r => r.id)));
  const [customRituals, setCustomRituals] = useState<{ id: string; emoji: string; name: string }[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [rituals, setRituals] = useState<Ritual[]>(initialRituals);

  const allRitualDefs = [...DEFAULT_RITUALS, ...customRituals];

  const toggleRitual = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const addCustom = () => {
    if (!customInput.trim()) return;
    const id = `custom-${Date.now()}`;
    const newR = { id, emoji: '⚙️', name: customInput.trim() };
    setCustomRituals(prev => [...prev, newR]);
    setSelectedIds(prev => new Set(prev).add(id));
    setCustomInput('');
  };

  const handleNextStep = () => {
    if (step === 'select') {
      const selected = allRitualDefs
        .filter(r => selectedIds.has(r.id))
        .map(r => {
          const existing = rituals.find(ex => ex.id === r.id);
          return existing || { ...r, timesPerDay: 1, minsEach: 15 };
        });
      setRituals(selected);
      setStep('configure');
    } else {
      onNext(rituals);
    }
  };

  const updateRitual = (id: string, field: 'timesPerDay' | 'minsEach', delta: number) => {
    setRituals(prev =>
      prev.map(r =>
        r.id === id ? { ...r, [field]: Math.max(field === 'timesPerDay' ? 1 : 1, r[field] + delta) } : r
      )
    );
  };

  const totalDailyMins = rituals.reduce((s, r) => s + r.timesPerDay * r.minsEach, 0);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-10">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
             <div className="h-px w-8 bg-primary/20" />
             <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                {t("step")}{step === 'select' ? '01' : '02'}
             </span>
             <div className="h-px w-8 bg-primary/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
             {step === 'select' ? 'Which rituals?' : 'How long?'}
          </h2>
          <p className="text-lg text-slate-500 font-medium italic">
             {step === 'select' ? 'Select all that apply. Be honest with yourself.' : 'Adjust the time spent on each ritual daily.'}
          </p>
        </div>

        {step === 'select' ? (
          <div className="w-full space-y-8">
            <div className="flex flex-wrap justify-center gap-3">
              {allRitualDefs.map(r => {
                const sel = selectedIds.has(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggleRitual(r.id)}
                    className={`px-6 py-3 rounded-full text-sm font-black transition-all border-2 flex items-center gap-2 ${
                      sel
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <span className="text-lg">{r.emoji}</span>
                    {r.id.startsWith('custom-') ? r.name : t(r.id as any)}
                  </button>
                );
              })}
            </div>

            <div className="w-full max-w-lg mx-auto relative group">
               <input
                 value={customInput}
                 onChange={e => setCustomInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && addCustom()}
                 placeholder={t("add_your_own_ritual")}
                 className="w-full h-16 pl-14 pr-6 bg-slate-50 border-2 border-slate-100 rounded-[24px] text-base font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
               />
               <Plus className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={24} />
            </div>

            <div className="w-full max-w-md mx-auto pt-6">
              <button
                onClick={handleNextStep}
                disabled={selectedIds.size === 0}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
              >
                {t("set_times")}<ChevronRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rituals.map(r => (
                <div key={r.id} className="bg-slate-50 border-2 border-slate-100 rounded-[28px] p-6 space-y-6 text-left group hover:border-slate-200 transition-all">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm">
                          {r.emoji}
                        </div>
                        <span className="text-lg font-black text-slate-900">
                          {r.id.startsWith('custom-') ? r.name : t(r.id as any)}
                        </span>
                      </div>
                      <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-1.5 flex items-center gap-2">
                         <span className="text-[10px] font-black text-primary uppercase tracking-widest">{r.timesPerDay * r.minsEach} {t("mins")}</span>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t("times__day")}</p>
                        <Stepper value={r.timesPerDay} onChange={d => updateRitual(r.id, 'timesPerDay', d)} />
                      </div>
                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t("mins_each")}</p>
                        <Stepper value={r.minsEach} onChange={d => updateRitual(r.id, 'minsEach', d)} />
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <div className="w-full max-w-2xl mx-auto pt-6 space-y-6">
              <div className="bg-slate-900 rounded-[28px] p-8 flex items-center justify-between shadow-2xl shadow-slate-200 overflow-hidden relative group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                      <Clock size={24} />
                    </div>
                    <div className="text-left">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] block mb-1">{t("total_daily_cost")}</span>
                       <span className="text-2xl font-black text-white tabular-nums leading-none">
                          {formatMins(totalDailyMins)}
                       </span>
                    </div>
                 </div>
                 
                 <button
                   onClick={handleNextStep}
                   className="relative z-10 py-4 px-8 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] flex items-center justify-center gap-2"
                 >
                   {t("reveal_cost")}<ChevronRight size={16} />
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Stepper({ value, onChange }: { value: number; onChange: (d: number) => void }) {
    const { t } = useTranslation("ritual_cost");
      return (
        <div className="flex items-center justify-between bg-white border-2 border-slate-100 rounded-2xl p-1.5 shadow-sm">
          <button
            onClick={() => onChange(-1)}
            className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors"
          >
            <Minus size={16} strokeWidth={3} />
          </button>
          <span className="text-base font-black text-slate-900 tabular-nums min-w-[32px] text-center">
            {value}
          </span>
          <button
            onClick={() => onChange(1)}
            className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      );
}

export default Screen2Rituals;
