import { Slider } from "@/app/uncertainity_tolerance/_src/components/ui/slider";

interface Props {
  score: number | null;
  onSelect: (n: number) => void;
}

const DiscomfortScale = ({ score, onSelect }: Props) => {
  
  return (
    <div className="space-y-4 px-2">
      <div className="text-center text-2xl font-bold text-foreground">
        {score !== null ? score : '—'}
      </div>
      <Slider
        value={score !== null ? [score] : [5]}
        onValueChange={(val) => onSelect(val[0])}
        min={0}
        max={10}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default DiscomfortScale;
