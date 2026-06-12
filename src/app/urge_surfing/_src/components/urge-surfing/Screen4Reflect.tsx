import { useState } from "react";
import { MessageSquare, ArrowRight, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onSurfAgain: (reflection: string) => void;
  onDone: (reflection: string) => void;
  saving?: boolean;
}

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function ActivityButton({ children, onClick, disabled, variant = 'primary' }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; variant?: 'primary' | 'secondary' }) {
    const { t } = useTranslation("urge_surfing");
      const baseStyles = "w-full py-4 rounded-xl font-sans text-[15px] font-semibold transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
    secondary: "bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}

const Screen4Reflect = ({ onSurfAgain, onDone, saving }: Props) => {
    const { t } = useTranslation("urge_surfing");
      const [reflection, setReflection] = useState("");

  return (
    <div className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm p-8 md:p-10 flex flex-col font-sans">
      <header className="text-center space-y-4 mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              {t("final_step_reflect")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
           {t("calm_after_the_storm")}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed px-4">
           {t("the_wave_has_subsided_how_do_you_feel_now_compared")}</p>
      </header>

      <div className="space-y-8 flex-1">
        {/* Reflection input */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
             <MessageSquare size={14} className="text-slate-400" /> {t("optional_reflection")}</label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={t("eg_the_intensity_dropped_from_an_8_to_a_3_i_feel_m")}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[15px] text-foreground outline-none focus:border-primary/30 focus:bg-white transition-all min-h-[140px] resize-none font-medium leading-relaxed placeholder:text-slate-400 shadow-inner"
          />
        </div>

        <p className="text-xs text-center text-slate-400 font-medium italic opacity-80 leading-relaxed px-2">
           {t("taking_a_moment_to_acknowledge_your_success_reinfo")}</p>
      </div>

      <div className="pt-10 flex flex-col gap-3">
        <ActivityButton onClick={() => onDone(reflection)} disabled={saving}>
          {t("finish_session")}<ArrowRight size={18} />
        </ActivityButton>
        <ActivityButton variant="secondary" onClick={() => onSurfAgain(reflection)} disabled={saving}>
          <RotateCcw size={16} /> {t("ride_another_wave")}</ActivityButton>
      </div>
    </div>
  );
};

export default Screen4Reflect;
