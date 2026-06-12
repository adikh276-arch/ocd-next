import { Technique } from "@/app/grounded_techniques/_src/data/techniques";

interface GroundingCardProps {
  technique: Technique;
  onClick: () => void;
  label: string;
}

export default function GroundingCard({ technique, onClick, label }: GroundingCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${technique.color} w-full rounded-2xl p-5 text-center shadow-card 
        transition-all duration-200 hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]
        text-foreground font-bold text-base leading-snug min-h-[100px] flex items-center justify-center`}
    >
      {label}
    </button>
  );
}
