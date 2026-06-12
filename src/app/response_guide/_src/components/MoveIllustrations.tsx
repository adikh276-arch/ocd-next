const stroke = "hsl(245, 55%, 67%)";
const fill = "hsl(245, 85%, 96%)";
const skinFill = "hsl(30, 40%, 92%)";
const skinStroke = "hsl(245, 55%, 67%)";

export const ClenchFists = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-clench">
    {/* Left fist */}
    <g>
      {/* Palm base */}
      <rect x="18" y="42" width="38" height="52" rx="12" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      {/* Curled fingers */}
      <path d="M22 42 C22 32, 28 28, 32 28 C36 28, 38 32, 38 36 L38 42" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <path d="M30 42 C30 30, 36 26, 40 26 C44 26, 46 30, 46 36 L46 42" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <path d="M38 42 C38 32, 44 28, 48 28 C52 28, 54 32, 54 38 L54 46" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      {/* Thumb wrapping over */}
      <path d="M18 56 C10 54, 8 46, 12 40 C16 34, 24 34, 28 38" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      {/* Knuckle lines */}
      <line x1="26" y1="42" x2="26" y2="46" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="34" y1="42" x2="34" y2="46" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="42" y1="42" x2="42" y2="46" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      {/* Wrist */}
      <rect x="24" y="94" width="26" height="20" rx="6" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
    </g>
    {/* Right fist */}
    <g transform="translate(180, 0) scale(-1, 1)">
      <rect x="18" y="42" width="38" height="52" rx="12" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <path d="M22 42 C22 32, 28 28, 32 28 C36 28, 38 32, 38 36 L38 42" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <path d="M30 42 C30 30, 36 26, 40 26 C44 26, 46 30, 46 36 L46 42" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <path d="M38 42 C38 32, 44 28, 48 28 C52 28, 54 32, 54 38 L54 46" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <path d="M18 56 C10 54, 8 46, 12 40 C16 34, 24 34, 28 38" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <line x1="26" y1="42" x2="26" y2="46" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="34" y1="42" x2="34" y2="46" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="42" y1="42" x2="42" y2="46" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <rect x="24" y="94" width="26" height="20" rx="6" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
    </g>
    {/* Pressure waves */}
    <circle cx="37" cy="60" r="18" stroke={stroke} strokeWidth="0.8" opacity="0.15" className="animate-pressure-wave"/>
    <circle cx="143" cy="60" r="18" stroke={stroke} strokeWidth="0.8" opacity="0.15" className="animate-pressure-wave-delay"/>
  </svg>
);

export const PalmsFlat = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Thigh surface */}
    <path d="M10 100 Q90 88, 170 100 L170 130 Q90 118, 10 130 Z" fill={fill} stroke={stroke} strokeWidth="1.5" opacity="0.6"/>
    {/* Left hand */}
    <g className="animate-press-down-left">
      {/* Fingers */}
      <rect x="16" y="56" width="10" height="30" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="28" y="50" width="10" height="36" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="40" y="48" width="10" height="38" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="52" y="52" width="10" height="34" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      {/* Palm */}
      <rect x="14" y="80" width="52" height="24" rx="8" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      {/* Thumb */}
      <ellipse cx="68" cy="82" rx="7" ry="10" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
    </g>
    {/* Right hand */}
    <g className="animate-press-down-right">
      <rect x="104" y="56" width="10" height="30" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="116" y="50" width="10" height="36" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="128" y="48" width="10" height="38" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="140" y="52" width="10" height="34" rx="5" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
      <rect x="102" y="80" width="52" height="24" rx="8" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      <ellipse cx="100" cy="82" rx="7" ry="10" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
    </g>
    {/* Pressure indicators */}
    <g className="animate-press-glow">
      <line x1="30" y1="108" x2="30" y2="114" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="50" y1="106" x2="50" y2="112" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="130" y1="106" x2="130" y2="112" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="150" y1="108" x2="150" y2="114" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
    </g>
  </svg>
);

export const TuckFingers = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/torso */}
    <path d="M50 20 Q90 10, 130 20 L140 130 Q90 125, 40 130 Z" fill={fill} stroke={stroke} strokeWidth="1.5" opacity="0.4"/>
    {/* Left arm crossing to right side */}
    <g className="animate-tuck-left">
      <path d="M40 45 Q60 50, 80 55 Q100 58, 120 52" fill="none" stroke={skinStroke} strokeWidth="8" strokeLinecap="round" opacity="0.3"/>
      <path d="M40 45 Q60 50, 80 55 Q100 58, 120 52" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Tucked fingers on right side */}
      <g>
        <ellipse cx="122" cy="60" rx="10" ry="6" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
        <path d="M116 58 C118 54, 122 52, 126 54" stroke={skinStroke} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </g>
    </g>
    {/* Right arm crossing to left side */}
    <g className="animate-tuck-right">
      <path d="M140 45 Q120 50, 100 55 Q80 58, 60 52" fill="none" stroke={skinStroke} strokeWidth="8" strokeLinecap="round" opacity="0.3"/>
      <path d="M140 45 Q120 50, 100 55 Q80 58, 60 52" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Tucked fingers on left side */}
      <g>
        <ellipse cx="58" cy="60" rx="10" ry="6" fill={skinFill} stroke={skinStroke} strokeWidth="1.2"/>
        <path d="M54 58 C56 54, 60 52, 64 54" stroke={skinStroke} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </g>
    </g>
    {/* Thumbs visible on top */}
    <ellipse cx="68" cy="48" rx="5" ry="4" fill={skinFill} stroke={skinStroke} strokeWidth="1.2" className="animate-thumb-wiggle"/>
    <ellipse cx="112" cy="48" rx="5" ry="4" fill={skinFill} stroke={skinStroke} strokeWidth="1.2" className="animate-thumb-wiggle-delay"/>
    {/* Cozy lines */}
    <path d="M75 70 Q90 74, 105 70" stroke={stroke} strokeWidth="0.8" opacity="0.2" strokeLinecap="round"/>
    <path d="M78 78 Q90 82, 102 78" stroke={stroke} strokeWidth="0.8" opacity="0.15" strokeLinecap="round"/>
  </svg>
);

export const StressBall = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ball */}
    <circle cx="90" cy="72" r="26" fill={fill} stroke={stroke} strokeWidth="1.5" className="animate-ball-squeeze"/>
    {/* Ball texture */}
    <circle cx="90" cy="72" r="20" stroke={stroke} strokeWidth="0.5" opacity="0.15"/>
    <circle cx="90" cy="72" r="13" stroke={stroke} strokeWidth="0.5" opacity="0.1"/>
    {/* Hand wrapping around */}
    <g className="animate-squeeze">
      {/* Thumb */}
      <path d="M60 52 Q56 58, 58 68 Q60 74, 64 76" fill={skinFill} stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Index finger */}
      <path d="M70 40 Q66 48, 64 58 Q62 68, 64 76" fill="none" stroke={skinStroke} strokeWidth="3" strokeLinecap="round" opacity="0.25"/>
      <path d="M70 40 Q66 48, 64 58 Q62 68, 64 76" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Middle finger */}
      <path d="M82 36 Q76 46, 72 58 Q68 70, 70 82" fill="none" stroke={skinStroke} strokeWidth="3" strokeLinecap="round" opacity="0.25"/>
      <path d="M82 36 Q76 46, 72 58 Q68 70, 70 82" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Ring finger */}
      <path d="M96 36 Q100 46, 104 58 Q108 70, 106 82" fill="none" stroke={skinStroke} strokeWidth="3" strokeLinecap="round" opacity="0.25"/>
      <path d="M96 36 Q100 46, 104 58 Q108 70, 106 82" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Pinky */}
      <path d="M108 42 Q112 52, 114 62 Q116 72, 112 80" fill="none" stroke={skinStroke} strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M108 42 Q112 52, 114 62 Q116 72, 112 80" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Palm hint */}
      <path d="M64 76 Q72 96, 90 100 Q108 96, 112 80" fill={skinFill} stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </g>
    {/* Squeeze pressure lines */}
    <g className="animate-squeeze-lines">
      <line x1="62" y1="70" x2="56" y2="70" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="118" y1="70" x2="124" y2="70" stroke={stroke} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="62" y1="78" x2="54" y2="80" stroke={stroke} strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
      <line x1="118" y1="78" x2="126" y2="80" stroke={stroke} strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
    </g>
  </svg>
);

export const FingertipsTogether = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left hand fingers */}
    <g className="animate-fingertips-left">
      {/* Thumb */}
      <path d="M30 100 Q40 90, 55 80 Q70 70, 82 64" fill="none" stroke={skinStroke} strokeWidth="4" strokeLinecap="round" opacity="0.2"/>
      <path d="M30 100 Q40 90, 55 80 Q70 70, 82 64" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Index */}
      <path d="M34 90 Q48 78, 62 64 Q74 52, 84 44" fill="none" stroke={skinStroke} strokeWidth="3.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M34 90 Q48 78, 62 64 Q74 52, 84 44" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Middle */}
      <path d="M40 84 Q54 70, 68 54 Q78 42, 86 32" fill="none" stroke={skinStroke} strokeWidth="3.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M40 84 Q54 70, 68 54 Q78 42, 86 32" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Ring */}
      <path d="M48 80 Q60 66, 72 52 Q82 40, 88 28" fill="none" stroke={skinStroke} strokeWidth="3" strokeLinecap="round" opacity="0.2"/>
      <path d="M48 80 Q60 66, 72 52 Q82 40, 88 28" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Pinky */}
      <path d="M56 78 Q66 66, 76 52 Q84 40, 88 34" fill="none" stroke={skinStroke} strokeWidth="2.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M56 78 Q66 66, 76 52 Q84 40, 88 34" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
    </g>
    {/* Right hand fingers (mirrored) */}
    <g className="animate-fingertips-right">
      <path d="M150 100 Q140 90, 125 80 Q110 70, 98 64" fill="none" stroke={skinStroke} strokeWidth="4" strokeLinecap="round" opacity="0.2"/>
      <path d="M150 100 Q140 90, 125 80 Q110 70, 98 64" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M146 90 Q132 78, 118 64 Q106 52, 96 44" fill="none" stroke={skinStroke} strokeWidth="3.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M146 90 Q132 78, 118 64 Q106 52, 96 44" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M140 84 Q126 70, 112 54 Q102 42, 94 32" fill="none" stroke={skinStroke} strokeWidth="3.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M140 84 Q126 70, 112 54 Q102 42, 94 32" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M132 80 Q120 66, 108 52 Q98 40, 92 28" fill="none" stroke={skinStroke} strokeWidth="3" strokeLinecap="round" opacity="0.2"/>
      <path d="M132 80 Q120 66, 108 52 Q98 40, 92 28" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M124 78 Q114 66, 104 52 Q96 40, 92 34" fill="none" stroke={skinStroke} strokeWidth="2.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M124 78 Q114 66, 104 52 Q96 40, 92 34" fill="none" stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
    </g>
    {/* Touch points with glow */}
    {[
      { x: 90, y: 64 },
      { x: 90, y: 44 },
      { x: 90, y: 32 },
      { x: 90, y: 28 },
      { x: 90, y: 34 },
    ].map((p, i) => (
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="5" fill={fill} opacity="0.6" className="animate-touch-glow" style={{ animationDelay: `${i * 0.2}s` }}/>
        <circle cx={p.x} cy={p.y} r="3" fill={fill} stroke={stroke} strokeWidth="1.5"/>
      </g>
    ))}
  </svg>
);

export const HoldPen = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pen */}
    <g className="animate-pen-settle">
      <rect x="84" y="8" width="7" height="90" rx="3.5" fill={fill} stroke={stroke} strokeWidth="1.5" transform="rotate(-8 87 53)"/>
      {/* Pen clip */}
      <rect x="86" y="8" width="2" height="16" rx="1" fill={stroke} opacity="0.4" transform="rotate(-8 87 16)"/>
      {/* Pen tip */}
      <path d="M80 96 L84 108 L88 96" fill={stroke} opacity="0.5" transform="rotate(-8 84 100)"/>
    </g>
    {/* Hand */}
    <g className="animate-gentle-hold">
      {/* Palm */}
      <ellipse cx="90" cy="74" rx="28" ry="20" fill={skinFill} stroke={skinStroke} strokeWidth="1.5"/>
      {/* Index finger wrapping */}
      <path d="M66 60 Q70 54, 78 52 Q86 50, 92 54" fill={skinFill} stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Middle finger */}
      <path d="M64 68 Q70 62, 80 60 Q88 58, 94 62" fill={skinFill} stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Ring finger */}
      <path d="M66 76 Q72 72, 82 70 Q90 68, 96 72" fill={skinFill} stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Thumb on other side */}
      <path d="M110 58 Q114 64, 112 72 Q110 78, 106 82" fill={skinFill} stroke={skinStroke} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Finger creases */}
      <path d="M72 56 Q76 54, 80 55" stroke={stroke} strokeWidth="0.6" opacity="0.2" strokeLinecap="round"/>
      <path d="M70 64 Q74 62, 80 63" stroke={stroke} strokeWidth="0.6" opacity="0.2" strokeLinecap="round"/>
    </g>
  </svg>
);

export const illustrations: Record<string, React.FC> = {
  "clench_both_fists": ClenchFists,
  "press_palms_flat_on_thighs": PalmsFlat,
  "tuck_fingers_under_arms": TuckFingers,
  "hold_a_stress_ball": StressBall,
  "press_fingertips_together": FingertipsTogether,
  "hold_a_pen_or_object": HoldPen,
};
