import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Circle, Moon, Waves, Coffee, Heart, Music, Sparkles, Mic, Sun, TreePine, Droplets, Volume2, Fish, Compass, Wind, BookOpen, Headphones, Target, Brain, Activity, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { DarkSidebar } from "./DarkSidebar";
import { MobileNav } from "./MobileNav";

export function CategoriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  const categories = [
    {
      id: "meditation",
      name: "Meditation",
      icon: Circle,
      color: "#F59E0B",
      subcategories: [
        { name: "Guided", icon: Headphones },
        { name: "Music", icon: Music },
        { name: "Affirmations", icon: Sparkles },
        { name: "Wake Up", icon: Sun }
      ]
    },
    {
      id: "soundscapes",
      name: "Soundscapes",
      icon: Waves,
      color: "#06B6D4",
      subcategories: [
        { name: "Nature", icon: TreePine },
        { name: "Water", icon: Droplets },
        { name: "Sounds", icon: Volume2 },
        { name: "Creatures", icon: Fish },
        { name: "Planets", icon: Compass },
        { name: "Motion", icon: Wind }
      ]
    },
    {
      id: "sleep",
      name: "Sleep",
      icon: Moon,
      color: "#8B5CF6",
      subcategories: [
        { name: "Stories", icon: BookOpen },
        { name: "Music", icon: Music },
        { name: "Sounds", icon: Volume2 }
      ]
    },
    {
      id: "focus",
      name: "Focus",
      icon: Coffee,
      color: "#EC4899",
      subcategories: [
        { name: "Work/Study", icon: Brain },
        { name: "Concentration", icon: Target },
        { name: "Music", icon: Music },
        { name: "Soundscapes", icon: Waves }
      ]
    },
    {
      id: "wellness",
      name: "Wellness",
      icon: Heart,
      color: "#10B981",
      subcategories: [
        { name: "Music", icon: Music },
        { name: "Healthcare", icon: Activity },
        { name: "Wellness", icon: Heart }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Filter categories based on search query
  const filteredCategories = categories
    .map(category => {
      // Check if category name matches
      const categoryMatches = category.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter subcategories that match
      const matchingSubcategories = category.subcategories.filter(subcat =>
        subcat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // If category matches, show all subcategories
      // If category doesn't match but has matching subcategories, show only those
      if (categoryMatches) {
        return category;
      } else if (matchingSubcategories.length > 0) {
        return {
          ...category,
          subcategories: matchingSubcategories
        };
      }
      
      return null;
    })
    .filter(category => category !== null) as typeof categories;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="flex min-h-screen bg-[#0a1628]">
      {/* Sidebar */}
      <DarkSidebar />

      {/* Mobile Nav */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
          {/* Header */}
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              {/* Back Arrow */}
              <button
                onClick={() => router.push("/service/meditation")}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-lg flex-shrink-0 bg-[#F59E0B]">
                🧘
              </div>
              <h1 className="text-xl md:text-2xl text-white">Categories</h1>
            </div>
            <p className="text-xs md:text-sm leading-relaxed max-w-xl text-slate-300 pl-[54px]">
              Explore all mindfulness categories and subcategories
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="relative mb-5 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-11 pr-10 py-3 md:py-3.5 bg-[#1a2744] border border-[#1E293B]/30 rounded-2xl text-sm md:text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg"
              >
                <X size={18} />
              </button>
            )}
          </motion.div>

          {/* Browse by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a2744] rounded-2xl p-8 md:p-12 border border-[#1E293B]/30 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#313D57] flex items-center justify-center">
                  <Search size={28} className="text-slate-400" />
                </div>
                <h3 className="text-lg md:text-xl text-white font-semibold mb-2">
                  No categories found
                </h3>
                <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto">
                  No categories match "{searchQuery}". Try a different search term.
                </p>
              </motion.div>
            ) : (
              filteredCategories.map((category, catIdx) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + catIdx * 0.1 }}
                    className="bg-[#1a2744] rounded-2xl p-4 md:p-5 border border-[#1E293B]/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#313D57] border border-[#2a4566]"
                      >
                        <Icon size={20} className="text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-base md:text-lg text-white font-semibold">
                        {category.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                      {category.subcategories.map((subcat, subIdx) => {
                        const SubIcon = subcat.icon;
                        const subcatId = `${category.id}-${subcat.name.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')}`;
                        return (
                          <motion.button
                            key={subcat.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + catIdx * 0.1 + subIdx * 0.03 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push(`/subcategory/${subcatId}`)}
                            className="bg-[#313D57] hover:bg-[#3D4A64] rounded-full py-2.5 px-4 text-xs md:text-sm text-white font-medium transition-all flex items-center gap-2 justify-center"
                          >
                            <SubIcon size={16} className="text-white flex-shrink-0" strokeWidth={2} />
                            <span>{subcat.name}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
