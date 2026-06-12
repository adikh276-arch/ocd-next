import { useTranslation } from "react-i18next";

interface IntroScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const IntroScreen = ({ onNext, onBack }: IntroScreenProps) => {
    const { t } = useTranslation("brave_steps");
      return (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center transform -rotate-3 transition-transform hover:rotate-0 duration-500">
               <span className="text-6xl">🙌</span>
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-primary/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border border-primary/10">
                {t("exposure__response_prevention")}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t("dirty_hands_brave_you")}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
                {t("touch_a_surface_that_feels_uncomfortable__and_resi")}</p>
            </div>

            <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[28px] p-8 italic relative overflow-hidden group w-full max-w-2xl">
              <p className="text-sm font-black text-primary/40 uppercase tracking-[0.2em] mb-3">{t("_how_this_works")}</p>
              <p className="text-lg font-bold text-primary leading-relaxed relative z-10">
                {t("touch__hold__anxiety_peaks__then_drops")}<br className="hidden md:block" /> {t("each_session_trains_your_brain_to_feel_safer")}</p>
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onNext}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {t("lets_begin")}</button>
            </div>
          </div>
        </div>
      );
};

export default IntroScreen;
