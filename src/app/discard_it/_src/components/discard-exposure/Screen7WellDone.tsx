import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { Trophy, TrendingDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  beforeAnxiety: number;
  afterAnxiety: number;
  onKeepGoing: () => void;
  onDone: () => void;
}

/* ─── Gradient icon badge ─── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("discard_it");
  return (
    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
      {children}
    </div>
  );
}

function ActivityButton({ children, onClick, disabled, variant = "primary" }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; variant?: "primary" | "secondary" }) {
    const { t } = useTranslation("discard_it");
  const baseStyles = "w-full py-3.5 rounded-xl font-body text-[15px] font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm";
  const variantStyles = variant === "primary" 
    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20" 
    : "bg-white border border-border/50 text-muted-foreground hover:bg-secondary/40";
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </button>
  );
}

const Screen7WellDone = ({ beforeAnxiety, afterAnxiety, onKeepGoing, onDone }: Props) => {
    const { t } = useTranslation("discard_it");
  const [showCompletion, setShowCompletion] = useState(false);

  const handleDoneClick = () => {
    setShowCompletion(true);
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <GradientBadge>
          <Trophy className="text-primary" size={16} />
        </GradientBadge>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          {t("well_done")}</p>
      </div>

      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug text-center">
        {t("one_step_climbed")}</h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-10 text-center">
        {t("you_faced_the_urge_and_chose_a_different_path_noti")}</p>

      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-8 mb-10 border border-primary/10">
        <div className="flex items-center justify-center gap-12 w-full">
           <div className="text-center">
             <div className="text-3xl mb-1">😟</div>
             <p className="text-4xl font-bold text-muted-foreground/50 tracking-tighter">{beforeAnxiety}</p>
             <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40">{t("before")}</p>
           </div>
           
           <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
              <ArrowRight className="text-primary/50" size={20} />
           </div>

           <div className="text-center">
             <div className="text-3xl mb-1">😌</div>
             <p className="text-4xl font-bold text-primary tracking-tighter">{afterAnxiety}</p>
             <p className="text-[10px] uppercase tracking-widest font-bold text-primary/50">{t("after")}</p>
           </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[13px] font-semibold">
           <TrendingDown size={14} />
           <span>{t("anxiety_level_decreased")}</span>
        </div>
      </div>

      <div className="text-center mb-10 space-y-4">
        <p className="text-[#64748B] text-[15px] leading-relaxed font-medium">
          {t("every_time_you_do_this_the_urge_loses_a_little_mor")}</p>
      </div>

      <div className="flex flex-col gap-3">
        <ActivityButton onClick={onKeepGoing} variant="secondary">
          {t("keep_going")}</ActivityButton>
        <ActivityButton onClick={handleDoneClick}>
          {t("done_today")}</ActivityButton>
      </div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="📦"
        title={t("session_complete")}
        description={t("each_item_let_go_is_weight_off_your_mind_youre_bui")}
        showHome={false}
        onStartOver={() => window.location.reload()}
        onDone={onDone}
      />
    </>
  );
};

export default Screen7WellDone;
