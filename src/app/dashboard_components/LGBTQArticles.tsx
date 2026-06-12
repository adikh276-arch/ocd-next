import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Article {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  readTime: string;
}

const featuredArticle: Article = {
  id: "come-into-identity",
  category: "IDENTITY",
  categoryColor: "text-[#8B5CF6] bg-[#F5F3FF]",
  title: 'What Does It Actually Mean to "Come Into" Your Identity?',
  description: "Identity isn't a destination — it's a living, shifting thing. This piece explores why so many LGBTQ+ people feel pressure to have it all figured out, and why that pressure is worth letting go.",
  readTime: "6 min read",
};

const articles: Article[] = [
  {
    id: "anxiety-rates",
    category: "MENTAL",
    categoryColor: "text-[#10B981] bg-[#ECFDF5]",
    title: "Why LGBTQ+ People Experience Higher Rates of Anxiety",
    description: "Minority stress, social rejection, and hiding — how chronic pressure shapes LGBTQ+ mental health and what helps.",
    readTime: "5 min read",
  },
  {
    id: "coming-out-later",
    category: "COMING OUT",
    categoryColor: "text-[#F59E0B] bg-[#FFFBEB]",
    title: "Coming Out Later in Life: You're Not Behind",
    description: "Many LGBTQ+ people discover or accept their identity in their 30s, 40s, or beyond. This is their story.",
    readTime: "7 min read",
  },
  {
    id: "before-stonewall",
    category: "HISTORY",
    categoryColor: "text-[#EF4444] bg-[#FEF2F2]",
    title: "Before Stonewall: LGBTQ+ Resistance Through the Ages",
    description: "Queer people have always existed, resisted, and thrived — long before modern movements gave it a name.",
    readTime: "8 min read",
  },
  {
    id: "chosen-family",
    category: "FAMILY",
    categoryColor: "text-[#3B82F6] bg-[#EFF6FF]",
    title: "Chosen Family: How Queer People Build Belonging",
    description: "When biological families fall short, LGBTQ+ people have long built their own. A look at what chosen family really means.",
    readTime: "6 min read",
  },
  {
    id: "affirming-healthcare",
    category: "HEALTH",
    categoryColor: "text-[#06B6D4] bg-[#ECFEFF]",
    title: "Finding Affirming Healthcare: A Practical Guide",
    description: "What to look for in a provider, questions to ask, and how to advocate for yourself in medical settings.",
    readTime: "5 min read",
  },
  {
    id: "non-binary-beyond",
    category: "IDENTITY",
    categoryColor: "text-[#8B5CF6] bg-[#F5F3FF]",
    title: "Non-Binary & Beyond: Understanding Gender Outside the Binary",
    description: "An accessible guide to gender identity, expression, and why the binary doesn't capture the full picture.",
    readTime: "6 min read",
  },
  {
    id: "internalized-homophobia",
    category: "MENTAL",
    categoryColor: "text-[#10B981] bg-[#ECFDF5]",
    title: "Internalized Homophobia: What It Is and How to Heal",
    description: "Growing up with negative messages about LGBTQ+ people leaves marks. Understanding them is the first step to healing.",
    readTime: "7 min read",
  },
  {
    id: "family-rejection",
    category: "COMING OUT",
    categoryColor: "text-[#F59E0B] bg-[#FFFBEB]",
    title: "When Family Doesn't Accept You: What to Do Next",
    description: "Rejection from family is one of the hardest experiences. Here's how to navigate it with safety and self-compassion.",
    readTime: "8 min read",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function LGBTQArticles() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F9F6FE] via-[#FBF8FF] to-[#F5F3FF]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#020817] hover:bg-white transition-all shadow-sm hover:shadow-md border border-gray-100 mb-6"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Articles
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl">
              Stories, insights, and knowledge, written for and by the community
            </p>
          </motion.div>

          {/* Featured Article */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push(`/lgbtq-article/${featuredArticle.id}`)}
            className="relative w-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-3xl p-8 md:p-10 mb-12 overflow-hidden group cursor-pointer text-left shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>
            </div>

            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider border border-white/30">
                  ⭐ Featured
                </span>
                <span className="text-white/80 text-sm">
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:scale-[1.01] transition-transform">
                {featuredArticle.title}
              </h2>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl">
                {featuredArticle.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#8B5CF6] text-sm font-semibold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
                  Read Article
                  <ChevronRight size={16} strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </motion.button>

          {/* More to Read */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#020817] flex items-center gap-3">
              More to Read
              <span className="text-base font-normal text-[#94A3B8]">({articles.length} articles)</span>
            </h2>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8"
          >
            {articles.map((article) => (
              <motion.button
                key={article.id}
                variants={item}
                onClick={() => router.push(`/lgbtq-article/${article.id}`)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all cursor-pointer group text-left h-full flex flex-col"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${article.categoryColor} border border-current/20`}>
                      {article.category}
                    </span>
                    <span className="text-[#94A3B8] text-xs">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#020817] leading-tight group-hover:text-[#8B5CF6] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-[#64748B] text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[#8B5CF6] text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                    Read more
                    <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#BE51F5]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#EE4F84]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
