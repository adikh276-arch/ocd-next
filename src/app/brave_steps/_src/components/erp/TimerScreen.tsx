import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TimerScreenProps {
  onNext: (anxiety: number, duration: number) => void;
  onBack: () => void;
}

const TimerScreen = ({ onNext, onBack }: TimerScreenProps) => {
    const { t } = useTranslation("brave_steps");
    const durations = [
      { emoji: "⚡", mins: 2, label: t("quick") },
      { emoji: "🔥", mins: 5, label: t("standard") },
      { emoji: "💪", mins: 7, label: t("challenge") },
    ];
      
      const [selectedDuration, setSelectedDuration] = useState(1);
  const [anxiety, setAnxiety] = useState(4);
  const [secondsLeft, setSecondsLeft] = useState(durations[1].mins * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = durations[selectedDuration].mins * 60;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setDone(true);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const handleSelectDuration = (i: number) => {
    if (running || done) return;
    setSelectedDuration(i);
    setSecondsLeft(durations[i].mins * 60);
  };

  const startTimer = () => {
    if (!running && !done) {
      setRunning(true);
    }
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-[32px] p-8 md:p-12 border-2 border-slate-100 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
        
        {/* Left Side: Timer Circle */}
        <div className="flex flex-col items-center shrink-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">{t("duration")}</h1>
            <p className="text-sm text-slate-500 font-medium italic">{t("how_long_youll_hold_on")}</p>
          </div>

          <div className="flex gap-2 w-full mb-10">
            {durations.map((d, i) => (
              <button
                key={i}
                onClick={() => handleSelectDuration(i)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 px-3 rounded-2xl border-2 transition-all ${
                  selectedDuration === i
                    ? "bg-primary/5 text-primary border-primary shadow-sm"
                    : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <span className="text-xl">{d.emoji}</span>
                <div className="text-center">
                  <p className="text-[12px] font-black">{d.mins}m</p>
                  <p className="text-[8px] uppercase tracking-widest font-black opacity-60">{d.label}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center mb-4" onClick={startTimer}>
            <div className="relative group cursor-pointer">
              <svg width="200" height="200" viewBox="0 0 140 140" className="transform transition-transform group-active:scale-95 drop-shadow-xl">
                <circle cx="70" cy="70" r={radius} fill="white" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="70" cy="70" r={radius} fill="none"
                  stroke="currentColor" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 70 70)"
                  className="text-primary transition-all duration-1000"
                />
                <text x="70" y="72" textAnchor="middle" dominantBaseline="middle" className="fill-slate-900 text-3xl font-black tracking-tight tabular-nums">
                  {mins}:{secs.toString().padStart(2, "0")}
                </text>
              </svg>
              {!running && !done && (
                <div className="absolute inset-0 flex items-center justify-center pt-28">
                  <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 animate-pulse border border-primary/20">
                    {t("tap_to_start")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Anxiety Scale and Quote */}
        <div className="flex-1 w-full space-y-10">
          <div className="bg-primary/5 rounded-[28px] p-8 border-2 border-primary/10 border-dashed text-center italic relative group">
             <p className="text-lg italic font-bold text-primary leading-relaxed">
              {t("discomfort_is_not_danger_the_urge_will_peak__then_")}</p>
          </div>

          <div className="space-y-6">
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-center text-slate-400">{t("hows_your_anxiety_right_now")}</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <button
                  key={n}
                  onClick={() => setAnxiety(n)}
                  className={`flex-1 aspect-square flex items-center justify-center rounded-2xl text-base font-black transition-all border-2 ${
                    anxiety === n
                      ? "bg-primary text-white border-primary shadow-lg scale-105 z-10"
                      : "bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between px-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
              <span>{t("calm")}</span>
              <span>{t("intense")}</span>
            </div>
          </div>

          <div className="w-full pt-6">
            <button
              onClick={() => done && onNext(anxiety, durations[selectedDuration].mins)}
              className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                done
                  ? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              disabled={!done}
            >
              {t("i_did_it")}<ChevronRight size={20} />
            </button>
            {!done && (
              <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-300 mt-4">
                {t("unlocks_when_timer_ends")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
