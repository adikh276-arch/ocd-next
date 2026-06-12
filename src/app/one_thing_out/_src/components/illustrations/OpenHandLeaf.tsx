const OpenHandLeaf = () => (
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Palm */}
    <ellipse cx="90" cy="110" rx="38" ry="28" fill="#C8D2E8" opacity="0.7" />
    {/* Fingers */}
    <path d="M60 110 Q55 80 62 60" stroke="#A0B0D0" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M72 105 Q70 70 75 48" stroke="#A0B0D0" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M88 102 Q88 65 90 42" stroke="#A0B0D0" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M104 105 Q106 72 103 50" stroke="#A0B0D0" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M118 110 Q122 85 116 65" stroke="#A0B0D0" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Leaf */}
    <path d="M82 88 Q90 68 98 88 Q90 82 82 88Z" fill="#8CA0C8" opacity="0.6" />
    <line x1="90" y1="72" x2="90" y2="88" stroke="#8CA0C8" strokeWidth="1.2" opacity="0.5" />
    {/* Soft glow */}
    <circle cx="90" cy="90" r="60" fill="#6070A8" opacity="0.04" />
  </svg>
);

export default OpenHandLeaf;
