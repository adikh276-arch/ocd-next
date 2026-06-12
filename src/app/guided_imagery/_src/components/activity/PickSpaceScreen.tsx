import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export type RoomType = 'living-room' | 'bedroom' | 'kitchen' | 'study' | 'hallway' | 'storeroom';

interface PickSpaceScreenProps {
  onNext: (room: RoomType) => void;
  onBack: () => void;
}

function BackBadge({ onClick }: { onClick: () => void }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <button
          onClick={onClick}
          className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm hover:bg-primary/20 transition-colors"
        >
          <ChevronLeft className="text-primary" size={18} />
        </button>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-primary/20"
        >
          {children}
        </button>
      );
}

const PickSpaceScreen = ({ onNext, onBack }: PickSpaceScreenProps) => {
    const { t } = useTranslation("guided_imagery");
      const [selected, setSelected] = useState<RoomType | null>(null);

      const rooms: { id: RoomType; emoji: string; name: string }[] = [
        { id: 'living-room', emoji: '🛋️', name: t("living_room") },
        { id: 'bedroom', emoji: '🛏️', name: t("bedroom") },
        { id: 'kitchen', emoji: '🍳', name: t("kitchen") },
        { id: 'study', emoji: '🪑', name: t("workspace") },
        { id: 'hallway', emoji: '🚪', name: t("entrance") },
        { id: 'storeroom', emoji: '🧺', name: t("storeroom") },
      ];

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <BackBadge onClick={onBack} />
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("the_choice")}</p>
      </div>

      <div className="flex-1 flex flex-col items-center text-center">
        <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
          {t("which_space_feels_most_overwhelming")}</h2>
        <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
          {t("pick_the_one_that_comes_to_mind_first_well_start_t")}</p>

        <div className="grid w-full grid-cols-2 gap-3 mb-8">
          {rooms.map((room) => {
            const isSelected = selected === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setSelected(room.id)}
                className={`flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 p-4 active:scale-[0.97] ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border/50 bg-card text-foreground hover:bg-secondary/40 hover:border-border'
                }`}
              >
                <span className="text-3xl drop-shadow-sm">{room.emoji}</span>
                <span className="text-[13px] font-semibold font-body tracking-tight leading-tight">{room.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6">
        <ActivityButton
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
        >
          {t("this_is_my_space")}</ActivityButton>
      </div>
    </div>
  );
};

export default PickSpaceScreen;
