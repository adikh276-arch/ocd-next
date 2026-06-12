import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Index = () => {
    const { t } = useTranslation("tricho_ocd");
    const keyPoints = [
      { text: t("powerful_often_irresistible_urges_to_pull_hair_from_the_scal") },
      { text: t("a_sense_of_mounting_tension_before_pulling_or_when_attemptin") },
      { text: t("a_feeling_of_relief_satisfaction_or_gratification_after_pull") },
      { text: t("frequent_attempts_to_stop_or_cut_back_on_hair_pulling") },
      { text: t("significant_distress_or_impairment_in_social_work_or_other_a") },
    ];
      
      const [showCompletion, setShowCompletion] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans selection:bg-primary/10 relative">
      {/* Centered Content - No Header Buttons */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Hero Illustration */}
        <div className="mb-12">
          <img 
            src="/tricho_ocd/hero.png" 
            alt={t("trichotillomania_illustration")} 
            className="w-64 md:w-80 h-auto"
            onError={(e) => {
               e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Header Text */}
        <div className="text-center space-y-4 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] tracking-tight">
            {t("what_is_trichotillomania")}</h1>
          <p className="text-lg md:text-xl text-[#64748B] italic font-medium">
            {t("its_more_than_just_a_habit__its_a_powerful_urge_th")}</p>
        </div>

        {/* Main Body Paragraph */}
        <div className="text-center max-w-3xl mb-12">
          <p className="text-[#64748B] text-[15px] md:text-[17px] leading-[1.6] font-medium">
            {t("trichotillomania_is_a_condition_where_a_person_fee")}</p>
        </div>

        {/* Subheading */}
        <div className="w-full max-w-3xl mb-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B]">
            {t("common_signs")}</h2>
        </div>

        {/* Key Points - Boxed Style */}
        <div className="w-full max-w-3xl space-y-3 mb-16">
          {keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                 <div className="w-6 h-6 bg-purple-500 rounded-sm opacity-80" />
              </div>
              <p className="text-[#475569] text-[15px] font-medium leading-relaxed pt-0.5">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* Finish Button */}
        <div className="w-full max-w-[200px]">
          <button
            onClick={() => setShowCompletion(true)}
            className="w-full py-4 rounded-xl bg-[#1E293B] text-white font-bold text-sm uppercase tracking-wider shadow-md hover:bg-[#0F172A] transition-all active:scale-[0.98]"
          >
            {t("finish_guide")}</button>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="✨"
        title={t("awareness__compassion")}
        description={t("understanding_your_experience_is_the_first_step_to")}
        startOverText={t("read_guide_again")}
        onDone={() => window.history.back()}
        onStartOver={() => window.location.reload()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
