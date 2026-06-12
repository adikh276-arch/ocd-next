
import { Button } from "@/app/mirror_moments/_src/components/ui/button";
import MirrorSVG from "@/app/mirror_moments/_src/components/MirrorSVG";
import { useTranslation } from "react-i18next";

interface WelcomeScreenProps {
  onReady: () => void;
  onBack: () => void;
}

const WelcomeScreen = ({ onReady, onBack }: WelcomeScreenProps) => {
    const { t } = useTranslation("mirror_moments");
      return (
        <div className="relative flex min-h-screen flex-col items-center bg-background bg-texture">
          
          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute left-4 top-4 text-muted-foreground font-body text-xl hover:text-foreground transition-colors"
            aria-label={t("welcomeback")}
          >
            ←
          </button>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center max-w-full">
            <h1 className="font-display text-4xl font-semibold text-warm-rose mb-4 leading-tight">
              {t("welcometitle")}</h1>

            <p className="font-body italic text-foreground/80 text-lg leading-relaxed mb-6 max-w-[300px]">
              {t("welcomequote")}</p>

            <p className="font-body text-sm text-muted-foreground mb-10">
              {t("welcomesubtitle")}</p>

            <MirrorSVG />
          </div>

          {/* Bottom button */}
          <div className="w-full max-w-full px-8 pb-10">
            <Button variant="warm" size="lg" className="w-full h-14 text-lg" onClick={onReady}>
              {t("welcomebutton")}</Button>
          </div>
        </div>
      );
};


export default WelcomeScreen;
