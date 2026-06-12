import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Index = () => {
    const { t } = useTranslation("hoarding_ocd");
    const keyPoints = [
      { text: t("the_cycle_repeats__fear_keep_relief_doubt_and_then_it_starts") },
      { text: t("you_find_it_very_hard_to_throw_things_away_even_when_you_wan") },
      { text: t("your_mind_turns_everyday_objects_into_something_important_or") },
      { text: t("you_ask_others_again_and_again_if_its_okay_to_get_rid_of_thi") },
      { text: t("you_avoid_cleaning_or_organizing_because_it_feels_too_overwh") },
    ];
      
      const [showCompletion, setShowCompletion] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-hoarding-ocd-guide">
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
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Centered Content */}
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Hero Illustration */}
        <div className="mb-12">
          <img 
            src="/hoarding_ocd/hero.png" 
            alt={t("hoarding_illustration")} 
            className="w-64 md:w-80 h-auto"
            onError={(e) => {
               e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Header Text */}
        <div className="text-center space-y-4 mb-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] tracking-tight">
            {t("what_is_hoarding_ocd")}</h1>
          <p className="text-lg md:text-xl text-[#64748B] italic font-medium">
            {t("everyone_keeps_things_sometimes__but_for_some_peop")}</p>
        </div>

        {/* Main Body Paragraph */}
        <div className="text-center max-w-3xl mb-12">
          <p className="text-[#64748B] text-[15px] md:text-[17px] leading-[1.6] font-medium italic">
            {t("hoarding_ocd_is_when_your_mind_gets_stuck_on_the_f")}</p>
        </div>

        {/* Subheading */}
        <div className="w-full max-w-3xl mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B]">
            {t("signs__patterns")}</h2>
        </div>

        {/* Key Points */}
        <div className="w-full max-w-3xl space-y-4 mb-16">
          {keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-3xl bg-white border-2 border-[#E2E8F0]/60 shadow-sm transition-all hover:border-primary/20">
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center shrink-0 border-2 border-[#E2E8F0]/40">
                 <div className="w-4 h-4 bg-orange-500 rounded-sm opacity-80" />
              </div>
              <p className="text-[#475569] text-[15px] font-medium leading-relaxed pt-0.5 italic">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* Finish Button */}
        <div className="w-full max-w-[240px]">
          <button
            onClick={() => setShowCompletion(true)}
            className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98]"
          >
            {t("finish_guide")}</button>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="📦"
        title={t("courage_in_letting_go")}
        description={t("reclaiming_your_space_takes_courage_youve_taken_th")}
        startOverText={t("read_guide_again")}
        onDone={() => window.history.back()}
        onStartOver={() => window.location.reload()}
        showHome={false}
      />
    </div>
  );
};

export default Index;
