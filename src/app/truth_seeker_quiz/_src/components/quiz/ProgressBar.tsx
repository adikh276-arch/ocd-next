interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className="flex gap-1.5 w-full px-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-2 rounded-[20px] transition-colors duration-300"
          style={{
            backgroundColor: i < current ? "#f5c842" : "#ede8d8",
          }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
