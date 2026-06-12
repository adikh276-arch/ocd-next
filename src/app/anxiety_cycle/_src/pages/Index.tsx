import { useState } from "react";
import WelcomeScreen from "@/app/anxiety_cycle/_src/components/WelcomeScreen";
import CycleScreen from "@/app/anxiety_cycle/_src/components/CycleScreen";
import BreakCycleScreen from "@/app/anxiety_cycle/_src/components/BreakCycleScreen";


const Index = () => {
  const [screen, setScreen] = useState(0);

  const goBack = () => {
    if (screen > 0) setScreen(screen - 1);
    else window.history.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full min-h-screen max-h-screen overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {screen === 0 && <WelcomeScreen onNext={() => setScreen(1)} onBack={() => window.history.back()} />}
        {screen === 1 && <CycleScreen onNext={() => setScreen(2)} onBack={goBack} />}
        {screen === 2 && <BreakCycleScreen onComplete={() => setScreen(0)} onBack={goBack} onReset={() => setScreen(0)} />}
      </div>
    
      
</div>
  );
};

export default Index;
