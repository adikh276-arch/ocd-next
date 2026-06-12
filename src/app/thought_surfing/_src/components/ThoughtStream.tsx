import { useState } from "react";
import { Leaf, Wind, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ReleasedThought {
  id: number;
  text: string;
}

const ThoughtStream = () => {
    const { t } = useTranslation("thought_surfing");
      const [thoughts, setThoughts] = useState<ReleasedThought[]>([]);
  const [currentThought, setCurrentThought] = useState("");

  const placeOnLeaf = () => {
    if (!currentThought.trim()) return;
    setThoughts((prev) => [{ id: Date.now(), text: currentThought.trim() }, ...prev]);
    setCurrentThought("");
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="relative group">
           <textarea
             value={currentThought}
             onChange={(e) => setCurrentThought(e.target.value)}
             placeholder={t("what_is_entering_your_mind")}
             className="w-full h-32 pl-8 pr-16 py-6 bg-slate-50 border-2 border-slate-100 rounded-[32px] text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-emerald-100 focus:bg-emerald-50/10 focus:shadow-2xl transition-all resize-none italic"
           />
           <button
             onClick={placeOnLeaf}
             disabled={!currentThought.trim()}
             className="absolute right-3 bottom-3 w-14 h-14 rounded-[22px] bg-slate-900 text-white flex items-center justify-center disabled:opacity-20 transition-all shadow-lg hover:scale-105 active:scale-95 group"
           >
             <Leaf size={24} className="group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence initial={false}>
          {thoughts.map((th, i) => (
            <motion.div 
              key={th.id}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="flex items-start gap-4 p-6 bg-white border border-emerald-50 rounded-[28px] shadow-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-emerald-50/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-500">
                 <Leaf size={18} fill="currentColor" className="opacity-20" />
              </div>
              <div className="space-y-1 relative z-10">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 opacity-50 mb-1">{t("floating_downstream")}</p>
                 <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{th.text}"</p>
              </div>
              <motion.div 
                animate={{ x: [0, 5, 0], y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="ml-auto opacity-20"
              >
                 <Wind size={16} className="text-emerald-200" />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thoughts.length === 0 && (
          <div className="py-20 flex flex-col items-center text-center space-y-4 opacity-20">
             <Waves className="text-slate-300" size={48} />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{t("the_stream_is_empty")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Waves = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
);

export default ThoughtStream;
