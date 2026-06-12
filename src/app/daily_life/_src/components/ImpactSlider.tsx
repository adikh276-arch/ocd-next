import { useTranslation } from "react-i18next";

interface ImpactSliderProps {
  emoji: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const getColor = (value: number) => {
    const { t } = useTranslation("daily_life");
      if (value <= 3) return "hsl(var(--primary))"; 
  if (value <= 6) return "#eab308"; // yellow-500
  return "#ef4444"; // red-500
};

const ImpactSlider = ({ emoji, label, value, onChange }: ImpactSliderProps) => {
    const { t } = useTranslation("daily_life");
      const percentage = (value / 10) * 100;
  const color = getColor(value);

  return (
    <div className="space-y-4 font-body">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-slate-200 shadow-sm">
            {emoji}
          </div>
          <span className="font-semibold text-foreground text-[14px]">{label}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">{t("impact")}</span>
          <span className="font-bold text-base tabular-nums" style={{ color }}>{value}</span>
        </div>
      </div>

      <div className="relative group px-1">
        <div className="relative h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
        
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-8 -top-3 bg-transparent appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-125"
        />

        <div className="flex justify-between mt-2 px-0.5">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t("minimal")}</span>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t("extreme")}</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactSlider;
