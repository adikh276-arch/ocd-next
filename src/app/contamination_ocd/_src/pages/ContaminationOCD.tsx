import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const ContaminationOCD = () => {
    const { t } = useTranslation("contamination_ocd");
    const keyPoints = [
      { text: t("the_cycle_repeats__fear__clean__relief__doubt__repeat") },
      { text: t("you_wash_or_clean_more_than_needed_to_feel_safe") },
      { text: t("your_mind_keeps_saying_what_if_this_is_contaminated") },
      { text: t("you_may_ask_others_if_something_is_clean_or_safe") },
      { text: t("you_avoid_places_people_or_objects_that_feel_dirty") },
    ];
      
      const [showCompletion, setShowCompletion] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans selection:bg-primary/10 relative">
      {/* Centered Content - No Header Buttons */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Hero Illustration */}
        <div className="mb-12">
          <img 
            src="/contamination_ocd/hero.png" 
            alt={t("washing_hands_illustration")} 
            className="w-64 md:w-80 h-auto"
            onError={(e) => {
               // Fallback to a placeholder if image fails
               e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Header Text */}
        <div className="text-center space-y-4 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] tracking-tight">
            {t("what_is_contamination_ocd")}</h1>
          <p className="text-lg md:text-xl text-[#64748B] italic font-medium">
            {t("everyone_cares_about_cleanliness_sometimes__but_fo")}</p>
        </div>

        {/* Main Body Paragraph */}
        <div className="text-center max-w-3xl mb-12">
          <p className="text-[#64748B] text-[15px] md:text-[17px] leading-[1.6] font-medium">
            {t("contamination_ocd_is_where_your_mind_gets_stuck_on")}</p>
        </div>

        {/* Subheading */}
        <div className="w-full max-w-3xl mb-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B]">
            {t("signs__patterns")}</h2>
        </div>

        {/* Key Points - Boxed Style */}
        <div className="w-full max-w-3xl space-y-3 mb-16">
          {keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                 <div className="w-6 h-6 bg-emerald-500 rounded-sm opacity-80" />
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
        emoji="🧼"
        title={t("knowledge_is_power")}
        description={t("youve_successfully_completed_the_guide_to_contamin")}
        startOverText={t("read_again")}
        onDone={() => window.history.back()}
        onStartOver={() => window.location.reload()}
        showHome={false}
      />
    </div>
  );
};

export default ContaminationOCD;
