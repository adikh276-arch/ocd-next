import { useState, useEffect } from "react";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import CycleWheel, { NODES_META } from "./CycleWheel";
import { ArrowLeft } from "lucide-react";

import { useTranslation } from "react-i18next";
const BreakCycleScreen = ({ onComplete, onBack, onReset }: { onComplete: () => void; onBack: () => void; onReset: () => void }) => {
    const { t } = useTranslation("anxiety_cycle");
    const TIPS = [
      t("notice_it_without_reacting_say_to_yourself__thats_a_trigger_"),
      t("name_the_feeling_out_loud__im_feeling_anxious_right_now_nami"),
      t("this_is_the_most_important_stage_to_interrupt_delay_the_chec"),
      t("remind_yourself__this_relief_wont_last_real_relief_comes_fro"),
      t("dont_engage_with_the_doubt_say__theres_that_doubt_again_then")
    ];
      
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [tappedNodes, setTappedNodes] = useState<Set<number>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);

  const handleNodeTap = (index: number) => {
    setActiveNode(index === activeNode ? null : index);
    setTappedNodes((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const allTapped = tappedNodes.size === 5;

  useEffect(() => {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    if (allTapped) {
      fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'anxiety_cycle',
          payload: { completed: true, date: new Date().toISOString() },
        }),
      }).catch(err => console.error("Logging failed", err));
    }
  }, [allTapped]);

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
          <div className="flex-1 flex flex-col gap-5 pb-4 w-full">
            <h1 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground">
              {t("heres_how_to_fight_back")}</h1>

            <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
              {t("every_stage_of_the_cycle_has_a_way_to_interrupt_it")}</p>

            <CycleWheel
              interactive
              activeNode={activeNode}
              onNodeTap={handleNodeTap}
            />

            {/* Expanded card */}
            {activeNode !== null && (
              <div
                key={activeNode}
                className="rounded-xl px-5 py-4 mx-auto max-w-xs animate-slide-up bg-secondary border border-border/50"
              >
                <p className="text-xs font-bold text-foreground mb-2 font-body">
                  {NODES_META[activeNode].emoji} {NODES_META[activeNode].key.toUpperCase()}
                </p>
                <p className="font-body text-[15px] text-foreground/80 leading-relaxed">
                  {TIPS[activeNode]}
                </p>
              </div>
            )}

            {/* All tapped message */}
            {allTapped && (
              <p className="font-body text-[15px] text-foreground/80 leading-relaxed animate-fade-up mt-2">
                {t("you_now_know_exactly_where_the_cycle_lives__and_ho")}</p>
            )}
          </div>

          {allTapped && (
            <div className="w-full mt-6 shrink-0">
              <button
                onClick={() => setShowCompletion(true)}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/20"
              >
                {t("complete_")}</button>
            </div>
          )}
        </div>
      </div>
      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌬️"
        title={t("breaking_the_cycle")}
        description={t("understanding_the_loop_is_the_first_step_out_of_it")}
        showHome={false}
        onStartOver={onReset}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default BreakCycleScreen;
