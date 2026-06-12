import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Package, Heart, Activity, Droplet, Brain, Users, Baby, Sparkles, ChevronRight, Star, Calendar, Clock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function HealthChecksPackages() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Packages", icon: Package },
    { id: "comprehensive", label: "Comprehensive", icon: Sparkles },
    { id: "cardiac", label: "Cardiac Health", icon: Heart },
    { id: "diabetes", label: "Diabetes", icon: Activity },
    { id: "women", label: "Women's Health", icon: Users },
    { id: "senior", label: "Senior Citizen", icon: Users },
  ];

  const packages = [
    {
      id: 1,
      name: "Complete Health Check",
      description: "Comprehensive full body checkup with 80+ parameters",
      tests: 85,
      category: "comprehensive",
      price: 1999,
      originalPrice: 3999,
      discount: 50,
      duration: "6-8 hours fasting required",
      popular: true,
      features: ["Complete Blood Count", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid Profile"],
      rating: 4.8,
      reviews: 2453,
      icon: Sparkles,
      color: "#10B981"
    },
    {
      id: 2,
      name: "Cardiac Risk Assessment",
      description: "Specialized package for heart health monitoring",
      tests: 45,
      category: "cardiac",
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      duration: "12 hours fasting required",
      popular: true,
      features: ["ECG", "Lipid Profile", "Cardiac Markers", "Blood Pressure", "Stress Test"],
      rating: 4.7,
      reviews: 1823,
      icon: Heart,
      color: "#EF4444"
    },
    {
      id: 3,
      name: "Diabetes Screening Plus",
      description: "Advanced diabetes detection and monitoring package",
      tests: 52,
      category: "diabetes",
      price: 1299,
      originalPrice: 2199,
      discount: 41,
      duration: "8-10 hours fasting required",
      popular: false,
      features: ["HbA1c", "Fasting Blood Sugar", "Post Meal Sugar", "Insulin Levels", "Kidney Function"],
      rating: 4.6,
      reviews: 1456,
      icon: Activity,
      color: "#F59E0B"
    },
    {
      id: 4,
      name: "Women's Wellness Package",
      description: "Complete health screening designed for women",
      tests: 68,
      category: "women",
      price: 1799,
      originalPrice: 3199,
      discount: 44,
      duration: "6 hours fasting required",
      popular: true,
      features: ["Hormonal Profile", "Thyroid", "Iron Studies", "Vitamin D", "Bone Health"],
      rating: 4.9,
      reviews: 3124,
      icon: Users,
      color: "#EC4899"
    },
    {
      id: 5,
      name: "Senior Citizen Care",
      description: "Specialized screening for age 60+ years",
      tests: 95,
      category: "senior",
      price: 2299,
      originalPrice: 4299,
      discount: 47,
      duration: "8 hours fasting required",
      popular: false,
      features: ["Complete Blood Count", "Bone Density", "Cardiac Health", "Diabetes Check", "Vitamin B12"],
      rating: 4.7,
      reviews: 987,
      icon: Users,
      color: "#8B5CF6"
    },
    {
      id: 6,
      name: "Basic Health Screening",
      description: "Essential tests for overall health assessment",
      tests: 35,
      category: "comprehensive",
      price: 799,
      originalPrice: 1499,
      discount: 47,
      duration: "8 hours fasting required",
      popular: false,
      features: ["Complete Blood Count", "Blood Sugar", "Lipid Profile", "Liver Function", "Kidney Function"],
      rating: 4.5,
      reviews: 2891,
      icon: Package,
      color: "#3B82F6"
    },
    {
      id: 7,
      name: "Thyroid Function Test",
      description: "Complete thyroid health assessment package",
      tests: 12,
      category: "comprehensive",
      price: 599,
      originalPrice: 999,
      discount: 40,
      duration: "No fasting required",
      popular: false,
      features: ["TSH", "T3", "T4", "Anti-TPO", "Thyroid Scan"],
      rating: 4.6,
      reviews: 1234,
      icon: Brain,
      color: "#06B6D4"
    },
    {
      id: 8,
      name: "Pregnancy Care Package",
      description: "Comprehensive prenatal health screening",
      tests: 42,
      category: "women",
      price: 1599,
      originalPrice: 2799,
      discount: 43,
      duration: "No fasting required",
      popular: false,
      features: ["Blood Group", "Hemoglobin", "Glucose", "Thyroid", "Infection Screen"],
      rating: 4.8,
      reviews: 1567,
      icon: Baby,
      color: "#F472B6"
    },
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Mobile Nav - mobile only */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-20 md:pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push(-1)}
              className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
              <Activity size={20} className="text-[#1E293B]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl text-[#0f172b] font-medium">
                Health Check Packages
              </h1>
              <p className="text-sm text-[#62748e] font-normal">
                Comprehensive health screening packages for your wellbeing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-[#043570] placeholder:text-[#64748B]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-[#2563EB] text-white shadow-md"
                      : "bg-slate-50 text-[#64748B] hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-4"
        >
          <p className="text-sm text-[#64748B]">
            Showing <span className="font-semibold text-[#043570]">{filteredPackages.length}</span> packages
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid gap-4 md:gap-5">
          {filteredPackages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: pkg.color }}
                    >
                      <Icon className="text-white" size={24} strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Top Row */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-[#043570]">
                              {pkg.name}
                            </h3>
                            {pkg.popular && (
                              <span className="bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#FDE68A] flex items-center gap-1">
                                <Star size={12} fill="#F59E0B" />
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#64748B] mb-3">
                            {pkg.description}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] mb-3">
                            <div className="flex items-center gap-1.5">
                              <Activity size={14} />
                              <span>{pkg.tests} tests included</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{pkg.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star size={14} fill="#F59E0B" className="text-[#F59E0B]" />
                              <span className="font-medium text-[#043570]">{pkg.rating}</span>
                              <span>({pkg.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {pkg.features.slice(0, 4).map((feature, idx) => (
                              <span
                                key={idx}
                                className="bg-[#f3faff] text-[#043570] text-xs px-3 py-1 rounded-full border border-slate-200"
                              >
                                {feature}
                              </span>
                            ))}
                            {pkg.features.length > 4 && (
                              <span className="text-[#2563EB] text-xs px-3 py-1 rounded-full border border-[#2563EB] font-medium">
                                +{pkg.features.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="text-right flex-shrink-0">
                          <div className="mb-2">
                            <span className="text-sm text-[#64748B] line-through">
                              ₹{pkg.originalPrice}
                            </span>
                            <span className="ml-2 text-xs font-semibold text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                              {pkg.discount}% OFF
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-[#043570] mb-3">
                            ₹{pkg.price}
                          </div>
                          <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 group/btn shadow-sm">
                            <Calendar size={18} />
                            <span>Book Now</span>
                            <ChevronRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="mx-auto text-[#64748B] mb-4" size={48} />
            <h3 className="text-xl font-semibold text-[#043570] mb-2">
              No packages found
            </h3>
            <p className="text-[#64748B]">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
        </main>
      </div>
    </div>
  );
}
