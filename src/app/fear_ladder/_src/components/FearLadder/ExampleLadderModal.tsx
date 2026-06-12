import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExampleLadderModalProps {
  open: boolean;
  onClose: () => void;
}

const ExampleLadderModal = ({ open, onClose }: ExampleLadderModalProps) => {
    const { t } = useTranslation("fear_ladder");
    const exampleData = [
      {
        label: t("low_anxiety"),
        range: "10–30",
        colorClass: "bg-therapy-low border-therapy-low",
        dotColor: "bg-therapy-success/40",
        items: [
          t("touching_a_public_door_handle"),
          t("touching_a_garbage_can"),
          t("using_a_public_restroom"),
        ],
      },
      {
        label: t("medium_anxiety"),
        range: "40–60",
        colorClass: "bg-therapy-mid/50 border-therapy-mid",
        dotColor: "bg-primary/40",
        items: [
          t("shaking_hands_with_a_stranger"),
          t("touching_money"),
          t("shaking_hands_after_touching_a_door_knob"),
        ],
      },
      {
        label: t("high_anxiety"),
        range: "70–100",
        colorClass: "bg-therapy-high/30 border-therapy-high",
        dotColor: "bg-therapy-high",
        items: [
          t("touching_a_bathroom_sink_faucet"),
          t("eating_food_that_dropped_on_the_floor"),
          t("using_a_public_washroom"),
        ],
      },
    ];
      
      if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-popover border border-border rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-serif font-semibold text-foreground">
              {t("example_fear_ladder")}</h2>
            <p className="text-sm text-primary/70 font-medium mt-0.5">{t("contamination")}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t("close_modal")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("this_is_only_an_example_to_hel")}</p>

        <div className="relative pl-6 space-y-6">
          {/* Vertical gradient line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-therapy-low via-therapy-mid to-therapy-high" />

          {exampleData.map((group) => (
            <div key={group.label} className="space-y-2">
              <div className="flex items-center gap-2 -ml-6">
                <div className={`w-3 h-3 rounded-full ${group.dotColor}`} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </span>
                <span className="text-xs text-muted-foreground/50">({group.range})</span>
              </div>

              <div className="space-y-2">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className={`rounded-lg border px-4 py-2.5 text-sm text-foreground/80 ${group.colorClass}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground/70 italic text-center">
            {t("your_ladder_is_personal_start")}</p>
        </div>
      </div>
    </div>
  );
};

export default ExampleLadderModal;
