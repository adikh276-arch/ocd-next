import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Play, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { DarkSidebar } from "./DarkSidebar";
import { MobileNav } from "./MobileNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SubcategoryPage() {
  const router = useRouter();
  const { subcategoryId } = useParams();
  const [activeFilter, setActiveFilter] = useState("Guided");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Guided meditation items
  const guidedMeditations = [
    {
      id: 1,
      title: "Making Your Life Sacred",
      description: "Turn Ordinary Moments Into Sacred Spaces for Reflection and Healing.",
      duration: "12 min",
      author: "Dr. Sarah Williams",
      image: "https://images.unsplash.com/photo-1771257328402-d579d0a2f928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwY2FuZGxlJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzc1Mzg4NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      title: "Life is Kind",
      description: "Open Your Heart and Let Life's Kindness Bring You Calm.",
      duration: "15 min",
      author: "Emma Thompson",
      image: "https://images.unsplash.com/photo-1647010828568-53b035ba81e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHlvZ2ElMjBzdW5zZXQlMjBiZWFjaHxlbnwxfHx8fDE3NzUzODg0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      customRoute: "/life-is-kind-detail" // Special route for this meditation
    },
    {
      id: 3,
      title: "Learning To Surrender",
      description: "Embrace Calm and Healing by Allowing Life to Unfold Naturally.",
      duration: "8 min",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1690673647794-57701e56f038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBtZWRpdGF0aW5nJTIwbmF0dXJlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzUzODg0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      title: "You Are Allowed",
      description: "Allow Yourself the Space to Breathe, Reflect, and Renew.",
      duration: "13 min",
      author: "Sophia Martinez",
      image: "https://images.unsplash.com/photo-1767884161044-e75de514a2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBzdG9uZXMlMjBwZWFjZWZ1bCUyMHNwYXxlbnwxfHx8fDE3NzUzODg0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      title: "Inner Peace Journey",
      description: "Discover Deep Tranquility Through Guided Mindfulness Practice.",
      duration: "18 min",
      author: "David Kumar",
      image: "https://images.unsplash.com/photo-1697112831076-aafc6f67df1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwYnVkZGhhJTIwcGVhY2VmdWwlMjB0ZW1wbGV8ZW58MXx8fHwxNzc1Mzg4NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      title: "Blooming Mindfulness",
      description: "Like a Lotus, Rise Above and Find Clarity in Stillness.",
      duration: "10 min",
      author: "Rachel Green",
      image: "https://images.unsplash.com/photo-1762913476157-8717b0701112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMGxvdHVzJTIwZmxvd2VyJTIwd2F0ZXJ8ZW58MXx8fHwxNzc1Mzg4NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 7,
      title: "Forest Bathing",
      description: "Connect with Nature's Wisdom and Find Your Center in Stillness.",
      duration: "22 min",
      author: "James Wilson",
      image: "https://images.unsplash.com/photo-1760857224786-15621b02ea64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGZvcmVzdCUyMG1lZGl0YXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzc1Mzg4NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 8,
      title: "Dawn Awakening",
      description: "Start Your Day with Powerful Intention and Peaceful Awareness.",
      duration: "14 min",
      author: "Olivia Brown",
      image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbWVkaXRhdGlvbiUyMG1vdW50YWluJTIweW9nYXxlbnwxfHx8fDE3NzUzODg1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Mock data for content items (for other tabs)
  const contentItems = [
    {
      id: 1,
      title: "The Cask of Amontillado",
      category: "Wisdom",
      author: "Alan Cumming",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "15 min"
    },
    {
      id: 2,
      title: "Infinite Piano for Sleep",
      category: "Meditation",
      author: "Dr. Vivek Murthy",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
      duration: "30 min"
    },
    {
      id: 3,
      title: "Morning Meditation",
      category: "Guided",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      duration: "10 min"
    },
    {
      id: 4,
      title: "Deep Sleep Soundscape",
      category: "Sleep",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
      duration: "45 min"
    },
    {
      id: 5,
      title: "Focus Flow",
      category: "Focus",
      author: "Emma Davis",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
      duration: "20 min"
    },
    {
      id: 6,
      title: "Ocean Waves",
      category: "Soundscapes",
      author: "Nature Sounds",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
      duration: "60 min"
    }
  ];

  const filters = ["All", "Guided", "Yoga", "Beginners", "Sleep", "Focus"];

  const getSubcategoryTitle = () => {
    if (!subcategoryId) return "Content";
    return subcategoryId
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
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
            <div className="flex items-center gap-3 mb-1.5">
              {/* Back Arrow */}
              <button
                onClick={() => router.push("/categories")}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-white hover:bg-[#1a2744]"
              >
                <ChevronLeft size={24} />
              </button>
              
              {/* Icon */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              
              <h1 className="text-xl md:text-2xl text-white">{getSubcategoryTitle()}</h1>
            </div>
            
            {/* Description */}
            <p className="text-slate-400 text-sm mb-5 ml-[54px]">
              Explore guided meditations and mindfulness content
            </p>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-white text-[#0a1628]"
                      : "bg-transparent text-white border border-[#313D57] hover:border-[#4a5568]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content - Conditionally render list or grid */}
          {activeFilter === "Guided" ? (
            /* List View for Guided Meditations */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {guidedMeditations.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + idx * 0.05, duration: 0.4, ease: "easeOut" }}
                  onClick={() => router.push(item.customRoute || `/meditation-detail/${item.id}`)}
                  className="relative bg-gradient-to-br from-[#1e2d4a]/80 to-[#15213d]/80 backdrop-blur-sm hover:from-[#243659]/90 hover:to-[#1a2a4d]/90 rounded-[20px] p-4 md:p-5 transition-all duration-500 cursor-pointer group flex items-start gap-4 md:gap-5 border border-white/5 hover:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  {/* Thumbnail */}
                  <div className="relative w-[88px] h-[88px] md:w-[110px] md:h-[110px] rounded-[16px] overflow-hidden flex-shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.3)] ring-1 ring-white/5 group-hover:ring-white/10 transition-all duration-500">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40"></div>
                    
                    {/* Play overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 to-black/80 opacity-0 group-hover:opacity-100 transition-all duration-400 backdrop-blur-[2px]">
                      <div className="w-[52px] h-[52px] rounded-full bg-white/98 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-400 ease-out ring-2 ring-white/20">
                        <Play size={20} className="text-[#0a1628] ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-0.5">
                    <h3 className="text-white text-[17px] md:text-[19px] font-bold mb-2 line-clamp-1 group-hover:text-cyan-50 transition-colors duration-400 tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-300/80 text-[13px] md:text-[14px] leading-[1.6] mb-3 line-clamp-2 group-hover:text-slate-200/90 transition-colors duration-400">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-slate-400/90 text-[13px] md:text-[14px]">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 group-hover:bg-white/8 transition-colors duration-300 border border-white/5">
                        <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span className="font-semibold tracking-wide">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-4 right-4 md:top-5 md:right-5 flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-300 group/fav backdrop-blur-sm"
                  >
                    <Heart
                      size={20}
                      strokeWidth={2.5}
                      className={`transition-all duration-300 ${
                        favorites.includes(item.id)
                          ? "text-rose-400 fill-rose-400 scale-110 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]"
                          : "text-slate-400/70 group-hover/fav:text-rose-300 group-hover/fav:scale-110"
                      }`}
                    />
                  </button>

                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Grid View for Other Tabs */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
            >
              {contentItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/meditation-detail/${item.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[16/10] bg-[#1a2744]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
                      <h3 className="text-white text-xl md:text-2xl font-serif text-center px-4 italic">
                        {item.title}
                      </h3>
                    </div>
                    {/* Play button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play size={24} className="text-[#0a1628] ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {item.duration}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="px-1">
                    <h4 className="text-white font-medium mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {item.category} · {item.author}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
