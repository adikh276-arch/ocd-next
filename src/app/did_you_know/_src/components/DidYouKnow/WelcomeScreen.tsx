import { motion } from "framer-motion";
import { ChevronRight, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
    const { t } = useTranslation("did_you_know");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white rounded-[32px] border-2 border-slate-100 border-t-[8px] border-t-primary p-10 md:p-16 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Side: Icon and Preview */}
            <div className="flex flex-col items-center gap-8 shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                 <Lightbulb size={64} strokeWidth={1.5} />
              </div>
              
              <div className="relative w-56 h-28">
                 <div className="absolute inset-0 bg-primary/5 border-2 border-slate-100 rounded-2xl transform rotate-3 scale-95" />
                 <div className="absolute inset-0 bg-primary/10 border-2 border-slate-100 rounded-2xl transform -rotate-2 scale-100" />
                 <div className="absolute inset-0 bg-white border-2 border-slate-200 rounded-2xl shadow-sm flex items-center justify-center">
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">{t("5_insight_cards")}</span>
                 </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {t("things_your_brain")}<br className="hidden md:block" /> {t("wishes_you_knew")}</h1>
                <p className="text-lg text-slate-500 font-medium leading-relaxed italic max-w-xl">
                  {t("5_quick_facts_about_trichotillomania_understanding")}</p>
              </div>

              <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[28px] p-8 italic relative overflow-hidden group w-full">
                <p className="text-lg font-bold text-primary leading-relaxed relative z-10">
                  {t("you_are_not_alone_not_even_close_")}</p>
              </div>

              <div className="w-full max-w-sm">
                <button
                  onClick={onStart}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {t("start_practice")}<ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default WelcomeScreen;
