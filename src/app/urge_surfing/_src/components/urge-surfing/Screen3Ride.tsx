import { useEffect, useState, useRef } from "react";
import WaveAnimation from "./WaveAnimation";
import { Timer } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onComplete: () => void;
}

const TOTAL_SECONDS = 90;

const Screen3Ride = ({ onComplete }: Props) => {
    const { t } = useTranslation("urge_surfing");
      const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= TOTAL_SECONDS) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return TOTAL_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (elapsed >= TOTAL_SECONDS) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [elapsed, onComplete]);

  const remaining = TOTAL_SECONDS - elapsed;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = elapsed / TOTAL_SECONDS;

  return (
    <div className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm p-8 md:p-10 flex flex-col font-sans min-h-[500px]">
      <header className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              {t("step_2_ride")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
           {t("stay_with_the_wave")}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed px-4">
           {t("let_the_sensation_be_exactly_as_it_is_dont_fight_i")}</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        <WaveAnimation progress={progress} />

        {/* Breathing timer */}
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] py-4 px-8 flex flex-col items-center shadow-inner">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <Timer size={12} /> {t("time_remaining")}</span>
          <span className="text-3xl font-extrabold text-primary tabular-nums tracking-tight">
            {mins}:{secs.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <footer className="mt-8 pt-8 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 font-medium italic opacity-80 leading-relaxed px-6">
           {t("the_peak_of_the_wave_is_passing_you_are_safe_and_y")}</p>
      </footer>
    </div>
  );
};

export default Screen3Ride;
