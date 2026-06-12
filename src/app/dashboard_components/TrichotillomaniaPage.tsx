"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Lightbulb,
  MessageSquareX,
  Sparkles,
  Shield,
  Info,
  Heart,
  Wrench,
  Waves,
  Scissors,
  Brain,
  Hand,
  LineChart
} from "lucide-react";
import { wellnessData, ContentItem } from "../dashboard_data/wellnessData";
import { WellnessModal } from "./WellnessModal";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export function TrichotillomaniaPage() {
  const { t } = useTranslation("ocd-self-care");
  const router = useRouter();

  const tools = [
    {
      id: "urge-surfing",
      label: t("urge_surfing"),
      icon: Waves,
      bgColor: "#FAF5FF",
      iconColor: "#A855F7",
      url: "/urge_surfing"
    },
    {
      id: "competing-response",
      label: t("competing_response_practice"),
      icon: Shield,
      bgColor: "#EFF6FF",
      iconColor: "#3B82F6",
      url: "/response_guide"
    },
    {
      id: "did-you-know",
      label: t("did_you_know"),
      icon: Info,
      bgColor: "#F0FDF4",
      iconColor: "#22C55E",
      url: "/did_you_know"
    },
    {
      id: "self-compassion-break",
      label: t("self_compassion_break"),
      icon: Heart,
      bgColor: "#FEF2F2",
      iconColor: "#EF4444",
      url: "/self_compassion"
    }
  ];
  const [expandedSection, setExpandedSection] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<{ item: ContentItem; type: "tip" | "myth" | "article" | "story" } | null>(null);

  const categoryData = wellnessData['trichotillomania'] || { tips: [], myths: [], articles: [], stories: [] };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 flex flex-col min-w-0">
        
        
        
        
        
        
        
        
        
        
        
        <main className="max-w-[1050px] w-full mx-auto px-6 md:px-8 py-8 md:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#64748B] hover:text-[#043570] hover:shadow-sm transition-all"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#020817] tracking-tight">{t("trichotillomania")}</h1>
                <p className="text-sm text-[#64748B]">{t("trichotillomania_desc")}</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6 mb-16">
            {/* Tips Section */}
            {categoryData.tips && categoryData.tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleSection("tips")}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center shadow-sm">
                      <Lightbulb size={24} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-[#020817]">{t("tips")}</h3>
                      <p className="text-sm text-[#64748B]">{t("tips_desc")}</p>
                    </div>
                  </div>
                  {expandedSection === "tips" ? <ChevronUp size={24} className="text-[#64748B]" /> : <ChevronDown size={24} className="text-[#64748B]" />}
                </button>
                <AnimatePresence>
                  {expandedSection === "tips" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {categoryData.tips.map((tip, index) => (
                          <button
                            key={tip.id}
                            onClick={() => setSelectedItem({ item: tip, type: "tip" })}
                            className="w-full bg-[#F5F8FF] border border-[#E0E7FF] rounded-xl p-5 text-left hover:shadow-sm hover:border-[#C7D2FE] transition-all group"
                          >
                            <h4 className="text-[15px] font-bold text-[#1E293B] mb-1.5 group-hover:text-[#4F46E5] transition-colors">{index + 1}. {t(`trichotillomania_tip_${tip.id}_title`, tip.title)}</h4>
                            <p className="text-[13px] text-[#64748B] leading-relaxed">{t(`trichotillomania_tip_${tip.id}_content_0`, tip.content[0])}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Myths Section */}
            {categoryData.myths && categoryData.myths.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleSection("myths")}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E11D48] rounded-xl flex items-center justify-center shadow-sm">
                      <MessageSquareX size={24} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-[#020817]">{t("myths")}</h3>
                      <p className="text-sm text-[#64748B]">{t("myths_desc")}</p>
                    </div>
                  </div>
                  {expandedSection === "myths" ? <ChevronUp size={24} className="text-[#64748B]" /> : <ChevronDown size={24} className="text-[#64748B]" />}
                </button>
                <AnimatePresence>
                  {expandedSection === "myths" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {categoryData.myths.map((myth, index) => (
                          <button
                            key={myth.id}
                            onClick={() => setSelectedItem({ item: myth, type: "myth" })}
                            className="w-full bg-[#FFF5F6] border border-[#FFE4E6] rounded-xl p-5 text-left hover:shadow-sm hover:border-[#FECDD3] transition-all group"
                          >
                            <h4 className="text-[15px] font-bold text-[#1E293B] mb-1.5 group-hover:text-[#E11D48] transition-colors">{index + 1}. {t(`trichotillomania_myth_${myth.id}_title`, myth.title)}</h4>
                            <p className="text-[13px] text-[#64748B] leading-relaxed">{t(`trichotillomania_myth_${myth.id}_content_0`, myth.content[0])}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Articles Section */}
            {categoryData.articles && categoryData.articles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleSection("articles")}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-sm">
                      <FileText size={24} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-[#020817]">{t("articles")}</h3>
                      <p className="text-sm text-[#64748B]">{t("articles_desc")}</p>
                    </div>
                  </div>
                  {expandedSection === "articles" ? <ChevronUp size={24} className="text-[#64748B]" /> : <ChevronDown size={24} className="text-[#64748B]" />}
                </button>
                <AnimatePresence>
                  {expandedSection === "articles" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {categoryData.articles.map((article, index) => (
                          <button
                            key={article.id}
                            onClick={() => setSelectedItem({ item: article, type: "article" })}
                            className="w-full bg-[#F0F9FF] border border-[#E0F2FE] rounded-xl p-5 text-left hover:shadow-sm hover:border-[#BAE6FD] transition-all group"
                          >
                            <h4 className="text-[15px] font-bold text-[#1E293B] mb-1.5 group-hover:text-[#2563EB] transition-colors">{index + 1}. {t(`trichotillomania_article_${article.id}_title`, article.title)}</h4>
                            <p className="text-[13px] text-[#64748B] leading-relaxed">{article.source}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Stories Section */}
            {categoryData.stories && categoryData.stories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleSection("stories")}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0891B2] rounded-xl flex items-center justify-center shadow-sm">
                      <Users size={24} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-[#020817]">{t("real_stories")}</h3>
                      <p className="text-sm text-[#64748B]">{t("real_stories_desc")}</p>
                    </div>
                  </div>
                  {expandedSection === "stories" ? <ChevronUp size={24} className="text-[#64748B]" /> : <ChevronDown size={24} className="text-[#64748B]" />}
                </button>
                <AnimatePresence>
                  {expandedSection === "stories" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {categoryData.stories.map((story, index) => (
                          <button
                            key={story.id}
                            onClick={() => setSelectedItem({ item: story, type: "story" })}
                            className="w-full bg-[#F0FDFA] border border-[#CCFBF1] rounded-xl p-5 text-left hover:shadow-sm hover:border-[#99F6E4] transition-all group"
                          >
                            <h4 className="text-[15px] font-bold text-[#1E293B] mb-1.5 group-hover:text-[#0D9488] transition-colors">{index + 1}. {t(`trichotillomania_story_${story.id}_title`, story.title)}</h4>
                            <p className="text-[13px] text-[#64748B] leading-relaxed">{t(`trichotillomania_story_${story.id}_content_0`, story.content[0])}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Interactive Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4 pl-2">
                <div className="w-8 h-8 bg-[#F59E0B] rounded-lg flex items-center justify-center shadow-sm">
                  <Wrench size={16} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#1E293B]">{t("interactive_tools")}</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.url}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-md hover:border-[#2563EB]/20 transition-all text-center group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: tool.bgColor }}
                  >
                    <tool.icon size={24} style={{ color: tool.iconColor }} strokeWidth={2} />
                  </div>
                  <p className="text-[13px] font-medium text-[#1E293B] group-hover:text-[#2563EB] transition-colors leading-tight">
                    {tool.label}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
</main>
      </div>

      <WellnessModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem?.item || null}
        type={selectedItem?.type || "tip"}
        category="trichotillomania"
      />
    </div>
  );
}

