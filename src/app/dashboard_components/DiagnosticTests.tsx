import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Package, Heart, Activity, Droplet, Brain, Users, Baby, Sparkles, ChevronRight, Star, Calendar, Clock, TestTube, Microscope, Stethoscope, Scan } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function DiagnosticTests() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Tests", icon: TestTube },
    { id: "pathology", label: "Pathology", icon: Microscope },
    { id: "radiology", label: "Radiology", icon: Scan },
    { id: "cardiology", label: "Cardiology", icon: Heart },
    { id: "specialized", label: "Specialized", icon: Stethoscope },
  ];

  const tests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood test measuring red cells, white cells, and platelets",
      category: "pathology",
      price: 299,
      originalPrice: 499,
      discount: 40,
      duration: "No fasting required",
      popular: true,
      features: ["Hemoglobin", "WBC Count", "Platelet Count", "RBC Count", "Differential Count"],
      rating: 4.9,
      reviews: 5234,
      icon: Droplet,
      color: "#EF4444",
      reportTime: "Same day"
    },
    {
      id: 2,
      name: "Lipid Profile",
      description: "Comprehensive cholesterol and triglyceride analysis",
      category: "pathology",
      price: 399,
      originalPrice: 699,
      discount: 43,
      duration: "12 hours fasting required",
      popular: true,
      features: ["Total Cholesterol", "HDL", "LDL", "Triglycerides", "VLDL"],
      rating: 4.8,
      reviews: 4123,
      icon: Heart,
      color: "#F59E0B",
      reportTime: "Same day"
    },
    {
      id: 3,
      name: "Thyroid Function Test (TFT)",
      description: "Complete thyroid hormone profile including T3, T4, and TSH",
      category: "pathology",
      price: 449,
      originalPrice: 799,
      discount: 44,
      duration: "No fasting required",
      popular: true,
      features: ["T3", "T4", "TSH", "Free T3", "Free T4"],
      rating: 4.7,
      reviews: 3456,
      icon: Brain,
      color: "#06B6D4",
      reportTime: "24 hours"
    },
    {
      id: 4,
      name: "HbA1c (Glycated Hemoglobin)",
      description: "3-month average blood sugar level indicator for diabetes monitoring",
      category: "pathology",
      price: 349,
      originalPrice: 599,
      discount: 42,
      duration: "No fasting required",
      popular: false,
      features: ["HbA1c Level", "Average Glucose", "Diabetes Risk", "3-month trend"],
      rating: 4.8,
      reviews: 2891,
      icon: Activity,
      color: "#8B5CF6",
      reportTime: "Same day"
    },
    {
      id: 5,
      name: "Liver Function Test (LFT)",
      description: "Comprehensive liver enzyme and protein analysis",
      category: "pathology",
      price: 499,
      originalPrice: 849,
      discount: 41,
      duration: "8 hours fasting required",
      popular: false,
      features: ["SGOT", "SGPT", "Bilirubin", "Alkaline Phosphatase", "Total Protein"],
      rating: 4.6,
      reviews: 2134,
      icon: Sparkles,
      color: "#10B981",
      reportTime: "Same day"
    },
    {
      id: 6,
      name: "Kidney Function Test (KFT)",
      description: "Complete renal function assessment with creatinine and urea",
      category: "pathology",
      price: 449,
      originalPrice: 749,
      discount: 40,
      duration: "No fasting required",
      popular: false,
      features: ["Creatinine", "Urea", "BUN", "Uric Acid", "Electrolytes"],
      rating: 4.7,
      reviews: 1923,
      icon: Droplet,
      color: "#3B82F6",
      reportTime: "Same day"
    },
    {
      id: 7,
      name: "Vitamin D Test",
      description: "25-Hydroxy Vitamin D level measurement",
      category: "pathology",
      price: 799,
      originalPrice: 1299,
      discount: 38,
      duration: "No fasting required",
      popular: false,
      features: ["Vitamin D2", "Vitamin D3", "Total Vitamin D", "Deficiency Assessment"],
      rating: 4.5,
      reviews: 1567,
      icon: Sparkles,
      color: "#F59E0B",
      reportTime: "24 hours"
    },
    {
      id: 8,
      name: "Vitamin B12 Test",
      description: "Serum B12 level for anemia and neurological health",
      category: "pathology",
      price: 599,
      originalPrice: 999,
      discount: 40,
      duration: "No fasting required",
      popular: false,
      features: ["Serum B12", "Deficiency Check", "Anemia Screening"],
      rating: 4.6,
      reviews: 1234,
      icon: Droplet,
      color: "#EC4899",
      reportTime: "24 hours"
    },
    {
      id: 9,
      name: "X-Ray (Chest)",
      description: "Digital chest X-ray for lung and heart assessment",
      category: "radiology",
      price: 399,
      originalPrice: 699,
      discount: 43,
      duration: "No preparation required",
      popular: true,
      features: ["Lung Screening", "Heart Size", "Bone Structure", "Digital Imaging"],
      rating: 4.8,
      reviews: 3421,
      icon: Scan,
      color: "#6366F1",
      reportTime: "Same day"
    },
    {
      id: 10,
      name: "Ultrasound (Abdomen)",
      description: "Complete abdominal scan for liver, kidney, and other organs",
      category: "radiology",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      duration: "6 hours fasting required",
      popular: true,
      features: ["Liver", "Kidney", "Pancreas", "Spleen", "Gallbladder"],
      rating: 4.7,
      reviews: 2812,
      icon: Scan,
      color: "#14B8A6",
      reportTime: "Same day"
    },
    {
      id: 11,
      name: "ECG (Electrocardiogram)",
      description: "Heart rhythm and electrical activity assessment",
      category: "cardiology",
      price: 299,
      originalPrice: 499,
      discount: 40,
      duration: "No preparation required",
      popular: true,
      features: ["Heart Rate", "Rhythm Analysis", "Arrhythmia Detection", "Digital Report"],
      rating: 4.9,
      reviews: 4567,
      icon: Heart,
      color: "#EF4444",
      reportTime: "Same day"
    },
    {
      id: 12,
      name: "2D Echo (Echocardiography)",
      description: "Ultrasound imaging of heart structure and function",
      category: "cardiology",
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      duration: "No preparation required",
      popular: false,
      features: ["Heart Chambers", "Valve Function", "Blood Flow", "Ejection Fraction"],
      rating: 4.8,
      reviews: 1891,
      icon: Heart,
      color: "#DC2626",
      reportTime: "Same day"
    },
    {
      id: 13,
      name: "Urine Routine Test",
      description: "Complete urine analysis for kidney and urinary tract health",
      category: "pathology",
      price: 199,
      originalPrice: 349,
      discount: 43,
      duration: "First morning sample",
      popular: false,
      features: ["Physical Examination", "Chemical Analysis", "Microscopy", "Infection Screen"],
      rating: 4.6,
      reviews: 2145,
      icon: TestTube,
      color: "#3B82F6",
      reportTime: "Same day"
    },
    {
      id: 14,
      name: "Iron Studies",
      description: "Comprehensive iron profile including ferritin and TIBC",
      category: "pathology",
      price: 699,
      originalPrice: 1199,
      discount: 42,
      duration: "No fasting required",
      popular: false,
      features: ["Serum Iron", "Ferritin", "TIBC", "Transferrin Saturation"],
      rating: 4.7,
      reviews: 1678,
      icon: Droplet,
      color: "#F97316",
      reportTime: "24 hours"
    },
    {
      id: 15,
      name: "Bone Density Scan (DEXA)",
      description: "Dual-energy X-ray absorptiometry for osteoporosis screening",
      category: "radiology",
      price: 1799,
      originalPrice: 2999,
      discount: 40,
      duration: "No preparation required",
      popular: false,
      features: ["Hip Density", "Spine Density", "Fracture Risk", "T-Score", "Z-Score"],
      rating: 4.8,
      reviews: 892,
      icon: Scan,
      color: "#8B5CF6",
      reportTime: "Same day"
    },
  ];

  const filteredTests = tests.filter(test => {
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory;
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
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
              <TestTube size={20} className="text-[#1E293B]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl text-[#0f172b] font-medium">
                Diagnostic Tests
              </h1>
              <p className="text-sm text-[#62748e] font-normal">
                Individual diagnostic tests for accurate health assessment
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
              placeholder="Search tests..."
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
            Showing <span className="font-semibold text-[#043570]">{filteredTests.length}</span> tests
          </p>
        </motion.div>

        {/* Tests Grid */}
        <div className="grid gap-4 md:gap-5">
          {filteredTests.map((test, index) => {
            const Icon = test.icon;
            return (
              <motion.div
                key={test.id}
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
                      style={{ backgroundColor: test.color }}
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
                              {test.name}
                            </h3>
                            {test.popular && (
                              <span className="bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#FDE68A] flex items-center gap-1">
                                <Star size={12} fill="#F59E0B" />
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#64748B] mb-3">
                            {test.description}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] mb-3">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{test.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              <span>Report: {test.reportTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star size={14} fill="#F59E0B" className="text-[#F59E0B]" />
                              <span className="font-medium text-[#043570]">{test.rating}</span>
                              <span>({test.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {test.features.slice(0, 4).map((feature, idx) => (
                              <span
                                key={idx}
                                className="bg-[#f3faff] text-[#043570] text-xs px-3 py-1 rounded-full border border-slate-200"
                              >
                                {feature}
                              </span>
                            ))}
                            {test.features.length > 4 && (
                              <span className="text-[#2563EB] text-xs px-3 py-1 rounded-full border border-[#2563EB] font-medium">
                                +{test.features.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="text-right flex-shrink-0">
                          <div className="mb-2">
                            <span className="text-sm text-[#64748B] line-through">
                              ₹{test.originalPrice}
                            </span>
                            <span className="ml-2 text-xs font-semibold text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                              {test.discount}% OFF
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-[#043570] mb-3">
                            ₹{test.price}
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
        {filteredTests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <TestTube className="mx-auto text-[#64748B] mb-4" size={48} />
            <h3 className="text-xl font-semibold text-[#043570] mb-2">
              No tests found
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
