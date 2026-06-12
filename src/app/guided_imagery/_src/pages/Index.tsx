import { useState } from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import WelcomeScreen from "../components/activity/WelcomeScreen";
import PickSpaceScreen, { type RoomType } from "../components/activity/PickSpaceScreen";
import RevealScreen from "../components/activity/RevealScreen";
import FeelingScreen, { type Feeling } from "../components/activity/FeelingScreen";
import ClosingScreen from "../components/activity/ClosingScreen";
import { useTranslation } from "react-i18next";

type Screen = 'welcome' | 'pick' | 'reveal' | 'feeling' | 'closing';

const Index = () => {
  const { t } = useTranslation("guided_imagery");
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('living-room');
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling>({ emoji: '😌', label: t("peaceful") });

  const goTo = (next: Screen) => {
    setScreen(next);
    window.scrollTo(0, 0);
  };

  const handleInternalBack = () => {
    if (screen === 'pick') goTo('welcome');
    if (screen === 'reveal') goTo('pick');
    if (screen === 'feeling') goTo('reveal');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-guided_imagery min-h-screen flex flex-col justify-center">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (window.parent !== window) {
                  window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                } else {
                  window.location.href = 'https://web.mantracare.com';
                }
              }}
              className="p-2 rounded-xl bg-white text-slate-500 hover:text-primary hover:shadow-md transition-all border border-slate-100"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("guided_imagery_title", "Guided Imagery")}
          </h1>
          <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">
            {t("visualization_practice", "Visualization Practice")}
          </p>
        </div>
      </div>

      <main className="w-full max-w-md mx-auto z-10 relative flex-1 flex flex-col justify-center animate-fade-card-in">
        <div className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm min-h-[500px] flex flex-col relative overflow-hidden">
          
          {/* Internal Prev Button logic has been moved to individual screens */}

          {screen === 'welcome' && (
            <WelcomeScreen onNext={() => goTo('pick')} onBack={() => {}} />
          )}
          {screen === 'pick' && (
            <PickSpaceScreen
              onBack={handleInternalBack}
              onNext={(room) => {
                setSelectedRoom(room);
                goTo('reveal');
              }}
            />
          )}
          {screen === 'reveal' && (
            <RevealScreen 
              room={selectedRoom} 
              onBack={handleInternalBack}
              onNext={() => goTo('feeling')} 
            />
          )}
          {screen === 'feeling' && (
            <FeelingScreen
              onBack={handleInternalBack}
              onNext={(feeling) => {
                setSelectedFeeling(feeling);
                goTo('closing');
              }}
            />
          )}
          {screen === 'closing' && (
            <ClosingScreen
              feeling={selectedFeeling}
              roomLabel={selectedRoom}
              onClose={() => {
                setSelectedRoom('living-room');
                setSelectedFeeling({ emoji: '😌', label: t("peaceful") });
                goTo('welcome');
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
