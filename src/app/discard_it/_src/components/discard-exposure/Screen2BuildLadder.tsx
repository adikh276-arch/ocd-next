import { useState } from "react";
import { ALL_ITEMS, type LadderItem } from "./types";
import { Layers, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: (items: LadderItem[]) => void;
}

/* ─── Gradient icon badge ─── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("discard_it");
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
          {children}
        </div>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("discard_it");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-primary/20"
        >
          {children}
        </button>
      );
}

const Screen2BuildLadder = ({ onNext }: Props) => {
    const { t } = useTranslation("discard_it");
      const [selected, setSelected] = useState<LadderItem[]>([]);

  const toggle = (item: LadderItem) => {
    setSelected((prev) => {
      const exists = prev.find((i) => i.label === item.label);
      if (exists) return prev.filter((i) => i.label !== item.label);
      if (prev.length >= 5) return prev;
      return [...prev, item];
    });
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <GradientBadge>
          <Layers className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("step_01")}</p>
      </div>

      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        {t("build_your_ladder")}</h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-6">
        {t("pick_5_items_that_are_difficult_to_let_go_well_arr")}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {ALL_ITEMS.map((item) => {
          const isSelected = selected.some((s) => s.label === item.label);
          return (
            <button
              key={item.label}
              onClick={() => toggle(item)}
              className={`flex items-center p-3 rounded-xl border text-left gap-2 transition-all active:scale-[0.98] ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border/50 text-foreground hover:bg-secondary/40 hover:border-border"
              }`}
            >
              <span className="text-lg shrink-0">{item.emoji}</span>
              <span className="font-body text-[13px] font-medium truncate">{item.label}</span>
              {isSelected && <Check size={14} className="ml-auto opacity-90 shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1 mb-8">
        <p className={`text-sm font-bold ${selected.length === 5 ? 'text-primary' : 'text-muted-foreground'}`}>
          {selected.length} {t("of_5_selected")}</p>
        <p className="text-xs text-muted-foreground italic text-center">
          {t("start_from_the_bottom_and_work_your_way_up")}</p>
      </div>

      <ActivityButton onClick={() => selected.length === 5 && onNext(selected)} disabled={selected.length !== 5}>
        {t("build_my_ladder")}</ActivityButton>
    </>
  );
};

export default Screen2BuildLadder;
