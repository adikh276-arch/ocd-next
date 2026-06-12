import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FinishCardProps {
    onStartOver: () => void;
    onComplete: () => void;
    saving?: boolean;
    showModal: boolean;
    onModalChange: (show: boolean) => void;
}

const FinishCard: React.FC<FinishCardProps> = ({ onStartOver, onComplete, saving, showModal, onModalChange }) => {
    const { t } = useTranslation("cognitive_distortions");
      return (
            <div className="card-therapeutic animate-fade-card-in w-full max-w-[360px] flex flex-col items-center justify-center mx-auto min-h-[460px] h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  {t("building_awareness")}</h2>
                
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-8">
                  {t("noticing_these_patterns_is_the_first_step_toward_f")}</p>
                
                <button
                    onClick={onComplete}
                    disabled={saving}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/20"
                >
                    {saving ? "Saving..." : "Complete Session"}
                </button>

                <button
                    onClick={onStartOver}
                    className="w-full mt-3 py-3 rounded-xl bg-white text-foreground border border-border font-body text-[14px] font-semibold transition-all hover:bg-secondary/50 active:scale-[0.98]"
                >
                    {t("review_cards_again")}</button>

                <StandardCompletionModal
                    isOpen={showModal}
                    onOpenChange={onModalChange}
                    emoji="✨"
                    title={t("youre_building_awareness")}
                    description={t("awareness_is_the_first_step_toward_freedom_share_t")}
                    showHome={false}
                    onStartOver={onStartOver}
                    onDone={() => window.history.back()}
                    />
            </div>
        );
};


export default FinishCard;
