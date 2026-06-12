import React from "react";
import type { CognitiveDistortion } from "../data/cognitiveDistortions";
import { useTranslation } from "react-i18next";

interface DistortionCardProps {
  distortion: CognitiveDistortion;
  index: number;
  total: number;
}

const DistortionCard: React.FC<DistortionCardProps> = ({ distortion, index, total }) => {
    const { t } = useTranslation("cognitive_distortions");
      return (
        <div className="card-therapeutic animate-fade-card-in w-full max-w-[360px] flex flex-col items-center mx-auto min-h-[460px] h-full">
          {/* Card number badge */}
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase opacity-70">
              {t("card")}{index + 1} {t("of")}{total}
            </span>
          </div>

          {/* Illustration Area */}
          <div className="relative w-full flex justify-center mb-6">
            <div className="w-24 h-24 rounded-2xl bg-primary/5 p-3 border border-primary/10 flex items-center justify-center">
              <img
                src={typeof distortion.illustration === 'string' ? distortion.illustration : (distortion.illustration as any).src}
                alt={t(distortion.title)}
                className="w-full h-full object-contain filter drop-shadow-sm"
                loading="lazy"
              />
            </div>
          </div>

          {/* Title + Description */}
          <div className="text-center px-1 mb-6 flex-1 flex flex-col justify-center">
            <h3 className="font-heading text-xl font-bold leading-tight text-foreground mb-3">
              {t(distortion.title)}
            </h3>
            <p className="font-body text-[14px] text-muted-foreground leading-relaxed">
              {t(distortion.description)}
            </p>
          </div>

          <div className="space-y-3 w-full mt-auto pt-4">
            {/* Example Thought */}
            <div className="rounded-xl border border-border/40 bg-secondary/30 px-4 py-3">
              <p className="text-[9px] font-bold text-muted-foreground mb-1 tracking-[0.15em] uppercase">
                {t("example_thought")}</p>
              <p className="font-body text-[13px] text-foreground/80 leading-relaxed italic">
                "{distortion.exampleThought}"
              </p>
            </div>

            {/* Alternative Thought */}
            <div className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3">
              <p className="text-[9px] font-bold text-primary/60 mb-1 tracking-[0.15em] uppercase">
                {t("alternative_outlook")}</p>
              <p className="font-body text-[13px] text-primary font-semibold leading-relaxed">
                "{distortion.alternativeThought}"
              </p>
            </div>
          </div>
        </div>
      );
};

export default DistortionCard;
