import React, { useState } from "react";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useTranslation } from "react-i18next";

interface Screen4Props {
  userDoubt: string;
  onSitAgain: () => void;
  onDone: () => void;
  onSaveReflection: (reflection: string) => void;
  onComplete: () => void;
}

const Screen4Completion: React.FC<Screen4Props> = ({ userDoubt, onSitAgain, onDone, onSaveReflection, onComplete }) => {
    const { t } = useTranslation("uncertainity_acceptance");
      const [reflection, setReflection] = useState("");

  const handleSitAgain = () => {
    onSaveReflection(reflection);
    onSitAgain();
  };

  const handleDone = () => {
    onSaveReflection(reflection);
    onDone();
  };

  return (
    <div className="min-h-screen bg-warm-offwhite px-5 py-6 pb-10 flex flex-col items-center">

      <button
        onClick={() => {
          onSaveReflection(reflection);
          onComplete();
        }}
        className="w-full max-w-sm mt-6 py-5 rounded-[2rem] bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {t("finish_practice")}</button>

      <div className="w-full max-w-sm mt-8 space-y-6">
        {/* Saved statement */}
        <div className="rounded-[12px] bg-text-input-bg border border-card-warm-border p-4 fade-up stagger-3">
          <p className="text-[10px] uppercase tracking-[1px] text-golden-muted font-body">{t("your_saved_statement")}</p>
          <p className="font-heading italic text-[12px] text-foreground leading-[1.8] mt-2">
            {t("i_dont_know_for_certain_that")}{userDoubt} {t("and_thats_okay_for_now")}</p>
        </div>

        {/* Reflection */}
        <div className="fade-up stagger-4">
            <p className="font-body text-[11px] text-golden-muted">{t("how_did_it_feel_optional")}</p>
            <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={t("write_anything")}
            className="w-full mt-2 min-h-[52px] rounded-[12px] bg-text-input-bg border border-card-warm-border p-3 font-heading italic text-[13px] text-foreground placeholder:text-golden-muted/60 resize-none focus:outline-none focus:ring-1 focus:ring-golden"
            />
        </div>

      </div>
    </div>
  );
};

export default Screen4Completion;
