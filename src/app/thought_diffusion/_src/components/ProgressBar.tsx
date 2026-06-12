import React from "react";
import { History } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProgressBarProps {
  current: number;
  total: number;
  onHistory?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, onHistory }) => {
    const { t } = useTranslation("thought_diffusion");
      return (
        <div className="flex items-center justify-between w-full px-8 py-6">
          <div className="flex items-center gap-3">
            {onHistory && (
              <button 
                onClick={onHistory}
                className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                <History size={16} />
              </button>
            )}
            <div className="h-1 w-24 bg-slate-50 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-slate-900 transition-all duration-500"
                 style={{ width: `${((current + 1) / total) * 100}%` }}
               />
            </div>
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
            {current + 1} {t("of")}{total}
          </span>
        </div>
      );
};

export default ProgressBar;
