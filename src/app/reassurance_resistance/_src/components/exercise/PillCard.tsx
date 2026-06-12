import React from 'react';

interface PillCardProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const PillCard: React.FC<PillCardProps> = ({ selected, onClick, children, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`pill-card ${selected ? 'pill-card-selected' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default PillCard;
