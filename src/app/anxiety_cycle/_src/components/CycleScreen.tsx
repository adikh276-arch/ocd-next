import CycleWheel from "./CycleWheel";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const CycleScreen = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
    const { t } = useTranslation("anxiety_cycle");
  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden">
      <div className="w-full max-w-md mx-auto mb-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-4 relative z-10">
        <div className="card-therapeutic animate-fade-card-in w-full max-w-md flex flex-col items-center text-center">
          <div className="flex-1 flex flex-col gap-6 pb-4 w-full">
            <h1 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground">
              {t("this_is_whats_happening_in_your_brain")}</h1>

            <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
              {t("health_anxiety_doesnt_just_appear_and_leave_it_run")}</p>

            <div className="py-4">
              <CycleWheel animated />
            </div>

            <div className="bg-secondary/40 rounded-2xl p-4 border border-border/20">
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                {t("each_loop_teaches_your_brain_that_the_worry_was_wo")}</p>
            </div>
          </div>

          <div className="w-full mt-8 shrink-0">
            <button
              onClick={onNext}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/20"
            >
              {t("i_recognise_this_")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleScreen;
