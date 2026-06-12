import React from 'react';
import { Button } from "@/app/reassurance_resistance/_src/components/ui/button";

interface ScreenLayoutProps {
  children: React.ReactNode;
  buttonText?: string;
  onNext?: () => void;
  buttonDisabled?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  secondaryButton?: { text: string; onClick: () => void };
  currentStep: number;
  totalSteps: number;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  buttonText,
  onNext,
  buttonDisabled = false,
  showBackButton = false,
  onBack,
  secondaryButton,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="screen-container relative">
      {showBackButton && (
        <button
          onClick={onBack}
          className="absolute top-6 left-4 text-muted-foreground hover:text-foreground transition-colors text-xl"
        >
          ←
        </button>
      )}

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 pt-2 pb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${i === currentStep ? 'progress-dot-active' : 'progress-dot-inactive'}`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col">{children}</div>

      <div className="mt-auto pt-6 space-y-3">
        {secondaryButton && (
          <button
            onClick={secondaryButton.onClick}
            className="w-full text-center text-sm text-muted-foreground underline"
          >
            {secondaryButton.text}
          </button>
        )}
        {buttonText && (
          <Button
            onClick={onNext}
            disabled={buttonDisabled}
            className="bottom-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScreenLayout;
