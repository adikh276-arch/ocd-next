const MirrorSVG = () => (
  <div className="animate-mirror-pulse flex items-center justify-center">
    <svg
      width="140"
      height="180"
      viewBox="0 0 140 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow */}
      <ellipse cx="70" cy="80" rx="60" ry="72" fill="hsl(var(--warm-peach))" opacity="0.35" />
      <ellipse cx="70" cy="80" rx="50" ry="62" fill="hsl(var(--warm-glow))" opacity="0.3" />
      
      {/* Mirror frame */}
      <ellipse cx="70" cy="75" rx="42" ry="52" stroke="hsl(var(--warm-rose))" strokeWidth="2.5" fill="hsl(var(--warm-blush))" opacity="0.6" />
      <ellipse cx="70" cy="75" rx="36" ry="45" stroke="hsl(var(--warm-gold))" strokeWidth="1" fill="hsl(var(--background))" opacity="0.8" />
      
      {/* Inner shimmer */}
      <ellipse cx="62" cy="65" rx="14" ry="20" fill="hsl(var(--warm-peach))" opacity="0.25" />
      
      {/* Handle */}
      <rect x="65" y="125" width="10" height="30" rx="5" fill="hsl(var(--warm-rose))" opacity="0.5" />
      <rect x="58" y="152" width="24" height="6" rx="3" fill="hsl(var(--warm-rose))" opacity="0.4" />
    </svg>
  </div>
);

export default MirrorSVG;
