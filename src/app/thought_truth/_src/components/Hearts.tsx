interface HeartsProps {
  count: number;
}

const Hearts = ({ count }: HeartsProps) => {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            fontSize: 20,
            color: i < count ? (count === 1 ? '#FF4B4B' : '#FF6B9D') : '#E0D0F0',
            transition: 'color 0.3s',
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default Hearts;
