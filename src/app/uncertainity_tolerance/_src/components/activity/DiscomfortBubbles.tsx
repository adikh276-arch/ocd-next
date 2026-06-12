import { useTranslation } from "react-i18next";

interface Props {
  score: number | null;
  onSelect: (n: number) => void;
}

const DiscomfortBubbles = ({ score, onSelect }: Props) => {
    const { t } = useTranslation("uncertainity_tolerance");
      const bubbles = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3 justify-items-center">
        {bubbles.map(n => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className={`bubble ${score === n ? 'bubble-selected' : ''}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground text-center">
        <p>{t("0_3_manageable")}</p>
        <p>{t("4_6_noticeable")}</p>
        <p>{t("7_10_overwhelming")}</p>
      </div>
    </div>
  );
};

export default DiscomfortBubbles;
