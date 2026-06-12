interface ProgressBarProps {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressBarProps) => {
  
  return (
    <div style={{ background: '#F0E8FF', height: 12, borderRadius: 999, overflow: 'hidden' }}>
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #FF6B9D, #A855F7)',
          borderRadius: 999,
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  );
};

export default ProgressBar;
