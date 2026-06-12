import { Info, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ThoughtSectionProps {
  thought: string;
  onThoughtChange: (val: string) => void;
}

const ThoughtSection = ({ thought, onThoughtChange }: ThoughtSectionProps) => {
    const { t } = useTranslation("fear_ladder");
      const [showTip, setShowTip] = useState(false);

  return (
    <section className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
         <div className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-100">
            <MessageCircle size={12} className="text-amber-500" /> 
         </div>
         {t("the_expected_fear")}</label>

      <div className="space-y-1">
        <p className="text-[14px] font-bold text-slate-700 leading-tight">{t("what_thought_image_or_urge_shows_up")}</p>
        <p className="text-[12px] text-slate-400 font-medium italic">{t("just_name_it_you_dont_need_to_fight_it")}</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={thought}
          onChange={(e) => onThoughtChange(e.target.value)}
          placeholder={t("eg_the_thought_that_my_hands_are_contaminated")}
          className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-xl px-5 py-4 pr-12 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner"
          maxLength={200}
        />
        <button
          type="button"
          onClick={() => setShowTip(!showTip)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${showTip ? 'text-primary' : 'text-slate-300 hover:text-slate-500'}`}
          aria-label={t("show_info")}
        >
          <Info size={18} />
        </button>
      </div>

      <AnimatePresence>
        {showTip && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="bg-primary/5 border border-primary/10 text-primary text-[12px] font-medium rounded-xl px-5 py-3 leading-relaxed italic"
          >
            {t("remember_having_a_thought_doesnt_make_it_true_or_i")}</motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ThoughtSection;
