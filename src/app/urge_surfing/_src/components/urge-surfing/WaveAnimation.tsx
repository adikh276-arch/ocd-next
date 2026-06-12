import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const WaveAnimation = ({ progress }: { progress: number }) => {
    const { t } = useTranslation("urge_surfing");
  // progress: 0 to 1 over 90 seconds
  // 0-0.4: rise, 0.4-0.5: peak hold, 0.5-1: fall
      const getWaveHeight = (p: number) => {
        if (p < 0.4) return p / 0.4; // 0 to 1
        if (p < 0.5) return 1; // hold at peak
        return 1 - (p - 0.5) / 0.5; // 1 to 0
      };

  const h = getWaveHeight(progress);
  const isPeak = progress >= 0.4 && progress < 0.5;

  // SVG wave path
  const baseY = 120;
  const peakY = baseY - h * 80;
  const path = `M0,${baseY} Q50,${peakY - 10} 100,${peakY} Q150,${peakY - 10} 200,${baseY} Q250,${baseY + 10} 300,${baseY} L300,160 L0,160 Z`;
  const strokePath = `M0,${baseY} Q50,${peakY - 10} 100,${peakY} Q150,${peakY - 10} 200,${baseY} Q250,${baseY + 10} 300,${baseY}`;

  return (
    <div className="w-full flex justify-center my-6">
      <svg viewBox="0 0 300 160" className="w-full max-w-[320px]" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill="url(#waveFill)"
          style={{ transition: "d 1s ease-in-out" }}
        />
        <path
          d={strokePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          style={{ transition: "d 1s ease-in-out" }}
        />
        {isPeak && (
          <>
            <circle cx="100" cy={peakY} r="3" fill="hsl(var(--primary))" />
            <text
              x="100"
              y={peakY - 12}
              textAnchor="middle"
              fill="hsl(var(--secondary-foreground))"
              fontSize="10"
              fontWeight="500"
            >
              {t("peak")}</text>
          </>
        )}
      </svg>
    </div>
  );
};

export default WaveAnimation;
