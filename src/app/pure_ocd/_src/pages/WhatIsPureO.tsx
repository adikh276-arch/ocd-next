import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Index = () => {
    const { t } = useTranslation("pure_ocd");
    const thoughtCards = [
      { icon: "💭", text: t("sudden_shocking_thoughts_about_harming_yourself_or_someone_y") },
      { icon: "❓", text: t("obsessive_doubt_about_your_sexuality_or_identity") },
      { icon: "😇", text: t("intense_guilt_about_whether_you_are_a_good_or_moral_person") },
      { icon: "🌀", text: t("endless_questioning_about_the_meaning_of_life_or_reality") },
      { icon: "😔", text: t("fear_that_you_may_have_done_something_terrible_in_the_past") },
      { icon: "💔", text: t("constant_doubt_about_whether_you_truly_love_your_partner") },
    ];
      
      const [showCompletion, setShowCompletion] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans selection:bg-primary/10 relative">
      {/* Centered Content - No Header Buttons */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Hero Illustration */}
        <div className="mb-12">
          <img 
            src="/pure_ocd/hero.png" 
            alt={t("pure_o_illustration")} 
            className="w-64 md:w-80 h-auto"
            onError={(e) => {
               e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Header Text */}
        <div className="text-center space-y-4 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] tracking-tight">
            {t("what_is_pure_o")}</h1>
          <p className="text-lg md:text-xl text-[#64748B] italic font-medium">
            {t("the_thoughts_feel_unbearable_but_having_them_does_")}</p>
        </div>

        {/* Main Body Paragraph */}
        <div className="text-center max-w-3xl mb-12">
          <p className="text-[#64748B] text-[15px] md:text-[17px] leading-[1.6] font-medium">
            {t("pure_o_ocd_is_a_form_of_ocd_where_the_obsessions_h")}</p>
        </div>

        {/* Subheading */}
        <div className="w-full max-w-3xl mb-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B]">
            {t("common_themes")}</h2>
        </div>

        {/* Key Points - Boxed Style */}
        <div className="w-full max-w-3xl space-y-3 mb-16">
          {thoughtCards.map((card, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                 <span className="text-xl">{card.icon}</span>
              </div>
              <p className="text-[#475569] text-[15px] font-medium leading-relaxed pt-0.5">
                {card.text}
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
        emoji="🧠"
        title={t("knowledge_is_power")}
        description={t("noticing_these_patterns_is_the_first_step_toward_f")}
        startOverText={t("read_guide_again")}
        onDone={() => window.history.back()}
        onStartOver={() => window.location.reload()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
