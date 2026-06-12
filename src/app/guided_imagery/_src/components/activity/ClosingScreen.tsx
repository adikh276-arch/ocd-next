import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { CheckCircle2, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface Feeling {
  emoji: string;
  label: string;
}

interface ClosingScreenProps {
  feeling: Feeling;
  onClose: () => void;
  roomLabel: string;
}

/* ─── Gradient icon badge ─── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("guided_imagery");
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
          {children}
        </div>
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

const ClosingScreen = ({ feeling, roomLabel, onClose }: ClosingScreenProps) => {
    const { t } = useTranslation("guided_imagery");
      const [showCompletion, setShowCompletion] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'guided_imagery',
          payload: { 
            room: roomLabel,
            feeling: feeling.label,
            emoji: feeling.emoji,
            date: new Date().toISOString() 
          },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log practice:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <GradientBadge>
          <Leaf className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("reflection")}</p>
      </div>

      <div className="flex flex-1 flex-col items-center text-center">
        <div className="mb-8 w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-5xl shadow-sm border border-primary/10">
          🌿
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4 leading-tight">
          {t("that_feeling_is_real")}</h2>

        <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
          {t("you_just_saw_even_for_a_moment_what_a_clear_space_")}</p>

        <div className="w-full rounded-2xl border-l-4 border-l-primary bg-primary/5 px-6 py-6 text-left shadow-sm mb-10">
          <p className="text-[11px] uppercase tracking-widest font-bold text-primary/60 mb-2">
            {t("you_felt")}</p>
          <p className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
            <span>{feeling.emoji}</span>
            <span>{feeling.label}</span>
          </p>
          <p className="text-[13px] text-muted-foreground leading-relaxed italic">
            {t("come_back_to_this_visualization_whenever_the_urge_")}</p>
        </div>
      </div>

      <div className="pt-6">
        <ActivityButton onClick={handleComplete} disabled={saving}>
          {saving ? "Saving..." : "Finish Practice"}
        </ActivityButton>
      </div>


      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌿"
        title={t("inner_peace_found")}
        description={t("youve_created_a_safe_space_within_yourself_this_fe")}
        showHome={false}
        onStartOver={() => window.location.reload()}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default ClosingScreen;
