import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { BookOpen, CheckCircle2, Heart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReadingSection = ({ children }: { children: React.ReactNode }) => (
  <section className="py-8 border-b border-slate-100 last:border-0">
    {children}
  </section>
);

/* ─── Shared sub-components ──────────────────────────────────────────────────── */
function GradientBadge({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation("ocd-treatment-guide");
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex flex-col items-center justify-center shadow-sm">
          {children}
        </div>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("ocd-treatment-guide");
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

const Index = () => {
    const { t } = useTranslation("ocd-treatment-guide");
      const [showCompletion, setShowCompletion] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-treatment-guide">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
             <BookOpen className="text-primary" size={14} />
             <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t("therapeutic_guide")}</span>
          </div>
        </div>

        <div className="text-center mb-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-1">
              {t("evidence-based_care")}</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
              {t("ocd_treatment_what_you_need_to_know")}</h1>
            <p className="text-[14px] md:text-[16px] text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
              {t("being_diagnosed_with_ocd_can_feel_overwhelming_but")}</p>
          </div>
        </div>
      </div>

      <main className="w-full max-w-3xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border border-slate-200 border-t-[6px] border-t-primary shadow-xl shadow-slate-200/50 p-8 md:p-12 font-sans">
          
          {/* Hero Section */}
          <header className="space-y-6 mb-12">
            <div className="space-y-4 text-slate-600 font-body text-base leading-relaxed">
              <p>
                {t("knowing_that_ocd_is_highly_treatable_is_the_first_")}</p>
            </div>
          </header>

          <div className="h-px w-full bg-border/40" />

          {/* Content Sections */}
          <div className="space-y-4">
            <ReadingSection>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                {t("is_ocd_actually_treatable")}</h2>
              <div className="space-y-4 text-muted-foreground font-body text-[15px] leading-relaxed">
                <p>{t("yes__and_theres_strong_research_to_support_that")}</p>
                <p>
                  {t("roughly_half_of_individuals_respond_very_well_to_s")}</p>
                <blockquote className="border-l-4 border-primary/20 pl-5 italic text-primary/80 py-3 bg-primary/5 rounded-r-xl">
                  {t("recovery_doesnt_always_happen_overnight_but_progre")}</blockquote>
              </div>
            </ReadingSection>

            <ReadingSection>
              <h2 className="text-xl font-semibold text-foreground mb-6">{t("what_treatments_work_best")}</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-primary text-lg mb-1">{t("specialized_therapy_erp")}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">{t("exposure__response_prevention")}</p>
                  <div className="space-y-4 text-muted-foreground font-body text-[15px] leading-relaxed">
                    <p>{t("ocd_involves_two_main_components")}</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                        <span className="text-sm"><span className="font-bold text-foreground">{t("obsessions")}</span> {t("intrusive_distressing_thoughts_or_urges")}</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                        <span className="text-sm"><span className="font-bold text-foreground">{t("compulsions")}</span> {t("repetitive_behaviors_done_to_reduce_anxiety")}</span>
                      </li>
                    </ul>
                    <p>
                      {t("the_most_effective_therapy_for_ocd_is_a_specific_f")}</p>
                    <div className="bg-primary/5 rounded-2xl p-6 space-y-4 border border-primary/10">
                      <p className="font-bold text-foreground text-sm flex items-center gap-2">
                        <Heart size={16} className="text-primary/60" />
                        {t("erp_helps_individuals")}</p>
                      <ul className="space-y-3">
                        {[
                          t("face_feared_thoughts_or_situations"),
                          t("resist_performing_the_usual_compulsive_response"),
                          t("learn_that_anxiety_naturally_decreases_without_rituals")
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ReadingSection>

            <ReadingSection>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t("how_do_you_get_started")}</h2>
              <div className="space-y-4 text-muted-foreground font-body text-[15px] leading-relaxed">
                <p>{t("the_first_step_is_reaching_out_to_a_healthcare_pro")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {[
                    t("clear_education_about_ocd"),
                    t("discussion_of_treatment_options"),
                    t("shared_decision-making"),
                    t("focused_goals_for_functioning")
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-semibold bg-white border border-border/50 p-3.5 rounded-xl shadow-sm">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ReadingSection>

            <ReadingSection>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t("a_final_word")}</h2>
              <div className="space-y-6 text-muted-foreground font-body text-[15px] leading-relaxed">
                <p>
                  {t("ocd_can_be_persistent_but_it_is_manageable_many_pe")}</p>
                <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20">
                   <p className="font-serif italic text-foreground text-lg text-center leading-relaxed">
                    {t("with_the_right_combination_of_treatment_patience_a")}</p>
                </div>
              </div>
            </ReadingSection>
          </div>

          <div className="pt-10">
            <ActivityButton onClick={() => setShowCompletion(true)}>
              {t("finish_guide")}</ActivityButton>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🌿"
        title={t("knowledge_is_power")}
        description={t("youve_taken_the_first_step_by_educating_yourself_r")}
        startOverText={t("read_guide_again")}
        onDone={() => window.history.back()}
        onStartOver={() => window.location.reload()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
