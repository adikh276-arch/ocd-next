import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

type BodyLocation = "hands" | "chest" | "stomach" | "head" | "other";

interface Props {
  onNext: (location: BodyLocation, sensation: string) => void;
}

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("urge_surfing");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-sans text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          {children}
        </button>
      );
}

const Screen2Notice = ({ onNext }: Props) => {
    const { t } = useTranslation("urge_surfing");
      const [selected, setSelected] = useState<BodyLocation | null>(null);
  const [sensation, setSensation] = useState("");

  const locations: { value: BodyLocation; label: string }[] = [
    { value: "hands", label: t("hands") },
    { value: "chest", label: t("chest") },
    { value: "stomach", label: t("stomach") },
    { value: "head", label: t("head") },
    { value: "other", label: t("other") },
  ];

  return (
    <div className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm p-8 md:p-10 flex flex-col font-sans">
      <header className="text-center space-y-4 mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
           <div className="h-px w-8 bg-primary/20" />
           <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              {t("step_1_notice")}</span>
           <div className="h-px w-8 bg-primary/20" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
           {t("locate_the_urge")}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed px-4">
           {t("close_your_eyes_for_a_moment_where_do_you_feel_thi")}</p>
      </header>

      <div className="space-y-8">
        {/* Location selection */}
        <div className="flex flex-wrap gap-2 justify-center">
          {locations.map((loc) => {
            const isSelected = selected === loc.value;
            return (
              <button
                key={loc.value}
                onClick={() => setSelected(loc.value)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-widest border transition-all active:scale-[0.96] shadow-sm ${
                  isSelected
                    ? "bg-primary border-primary text-white shadow-primary/20"
                    : "bg-white border-slate-200 text-slate-500 hover:border-primary/30"
                }`}
              >
                {loc.label}
              </button>
            );
          })}
        </div>

        {/* Sensation input */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center gap-2">
             <Search size={14} className="text-slate-400" /> {t("describe_the_sensation")}</label>
          <textarea
            value={sensation}
            onChange={(e) => setSensation(e.target.value)}
            placeholder={t("is_it_tightness_heat_tingling_or_something_else")}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[15px] text-foreground outline-none focus:border-primary/30 focus:bg-white transition-all min-h-[120px] resize-none font-medium leading-relaxed placeholder:text-slate-400 shadow-inner"
          />
        </div>
      </div>

      <div className="pt-10">
        <ActivityButton 
          onClick={() => selected && onNext(selected, sensation)}
          disabled={!selected || !sensation.trim()}
        >
          {t("begin_the_ride")}</ActivityButton>
      </div>
    </div>
  );
};

export default Screen2Notice;
