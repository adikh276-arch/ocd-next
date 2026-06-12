import React from 'react';

interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`progress-dot ${i === current ? 'progress-dot-active' : 'progress-dot-inactive'}`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
