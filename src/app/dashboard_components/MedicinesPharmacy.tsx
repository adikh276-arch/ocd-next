import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Package, Pill, Heart, Activity, Shield, Thermometer, Bandage, ChevronRight, Star, ShoppingCart, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function MedicinesPharmacy() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products", icon: Package },
    { id: "prescription", label: "Prescription", icon: Pill },
    { id: "otc", label: "OTC Medicines", icon: Heart },
    { id: "supplements", label: "Supplements", icon: Activity },
    { id: "devices", label: "Health Devices", icon: Thermometer },
    { id: "personal-care", label: "Personal Care", icon: Shield },
  ];

  const products = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Pain reliever and fever reducer for common cold, headache, and body pain",
      category: "otc",
      price: 45,
      originalPrice: 75,
      discount: 40,
      manufacturer: "Generic Pharma",
      popular: true,
      features: ["Pain Relief", "Fever Reducer", "500mg Tablets", "Strip of 15"],
      rating: 4.8,
      reviews: 3452,
      icon: Pill,
      color: "#EF4444",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 2,
      name: "Multivitamin Complete",
      description: "Daily multivitamin supplement with essential vitamins and minerals",
      category: "supplements",
      price: 599,
      originalPrice: 999,
      discount: 40,
      manufacturer: "HealthVit",
      popular: true,
      features: ["30 Tablets", "Vitamins A-Z", "Minerals", "Daily Wellness"],
      rating: 4.7,
      reviews: 2891,
      icon: Activity,
      color: "#10B981",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      description: "Proton pump inhibitor for acid reflux and gastric problems",
      category: "prescription",
      price: 125,
      originalPrice: 199,
      discount: 37,
      manufacturer: "MedLife",
      popular: false,
      features: ["Acid Reflux", "20mg Capsules", "Strip of 10", "Once Daily"],
      rating: 4.6,
      reviews: 1567,
      icon: Pill,
      color: "#F59E0B",
      prescription: "Required",
      stock: "In Stock"
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      description: "Digital automatic BP monitor with large display and memory",
      category: "devices",
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      manufacturer: "HealthTech",
      popular: true,
      features: ["Digital Display", "Auto Inflation", "60 Memory", "Irregular Heartbeat"],
      rating: 4.8,
      reviews: 4123,
      icon: Heart,
      color: "#DC2626",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 5,
      name: "Vitamin D3 60K",
      description: "High-strength vitamin D supplement for bone health",
      category: "supplements",
      price: 89,
      originalPrice: 149,
      discount: 40,
      manufacturer: "NutriHealth",
      popular: true,
      features: ["60000 IU", "4 Capsules", "Bone Health", "Immunity Boost"],
      rating: 4.9,
      reviews: 5234,
      icon: Activity,
      color: "#F59E0B",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 6,
      name: "Glucometer Kit",
      description: "Blood glucose monitoring system with 25 test strips",
      category: "devices",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      manufacturer: "DiaCare",
      popular: true,
      features: ["25 Strips", "Lancing Device", "10 Lancets", "Fast Results"],
      rating: 4.7,
      reviews: 3156,
      icon: Thermometer,
      color: "#8B5CF6",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 7,
      name: "Cetirizine 10mg",
      description: "Antihistamine for allergic rhinitis and urticaria",
      category: "otc",
      price: 35,
      originalPrice: 60,
      discount: 42,
      manufacturer: "Generic Pharma",
      popular: false,
      features: ["Allergy Relief", "10mg Tablets", "Strip of 10", "Non-Drowsy"],
      rating: 4.5,
      reviews: 1892,
      icon: Pill,
      color: "#06B6D4",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 8,
      name: "Omega-3 Fish Oil",
      description: "Premium quality fish oil capsules for heart and brain health",
      category: "supplements",
      price: 749,
      originalPrice: 1249,
      discount: 40,
      manufacturer: "OceanVit",
      popular: false,
      features: ["60 Capsules", "1000mg EPA+DHA", "Heart Health", "Brain Support"],
      rating: 4.6,
      reviews: 2145,
      icon: Activity,
      color: "#3B82F6",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 9,
      name: "Digital Thermometer",
      description: "Fast and accurate body temperature measurement",
      category: "devices",
      price: 299,
      originalPrice: 499,
      discount: 40,
      manufacturer: "MediTemp",
      popular: false,
      features: ["Digital Display", "60 Sec Reading", "Fever Alarm", "Waterproof"],
      rating: 4.4,
      reviews: 1567,
      icon: Thermometer,
      color: "#F97316",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 10,
      name: "Hand Sanitizer 500ml",
      description: "Alcohol-based hand sanitizer with 70% isopropyl alcohol",
      category: "personal-care",
      price: 149,
      originalPrice: 249,
      discount: 40,
      manufacturer: "SafeHands",
      popular: true,
      features: ["500ml Bottle", "70% Alcohol", "Kills 99.9% Germs", "With Moisturizer"],
      rating: 4.7,
      reviews: 2891,
      icon: Shield,
      color: "#10B981",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 11,
      name: "Calcium + Vitamin D3",
      description: "Combination supplement for bone and teeth strength",
      category: "supplements",
      price: 399,
      originalPrice: 699,
      discount: 43,
      manufacturer: "BoneStrong",
      popular: false,
      features: ["60 Tablets", "Calcium Carbonate", "Vitamin D3", "Bone Health"],
      rating: 4.6,
      reviews: 1678,
      icon: Activity,
      color: "#EC4899",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 12,
      name: "First Aid Kit",
      description: "Complete first aid kit with essential medical supplies",
      category: "personal-care",
      price: 799,
      originalPrice: 1299,
      discount: 38,
      manufacturer: "MediCare",
      popular: false,
      features: ["100+ Items", "Bandages", "Antiseptic", "Portable Case"],
      rating: 4.8,
      reviews: 1234,
      icon: Bandage,
      color: "#EF4444",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 13,
      name: "Azithromycin 500mg",
      description: "Antibiotic for bacterial infections",
      category: "prescription",
      price: 145,
      originalPrice: 245,
      discount: 41,
      manufacturer: "AntioBio",
      popular: false,
      features: ["500mg Tablets", "Strip of 3", "Bacterial Infections", "3-Day Course"],
      rating: 4.7,
      reviews: 1456,
      icon: Pill,
      color: "#8B5CF6",
      prescription: "Required",
      stock: "In Stock"
    },
    {
      id: 14,
      name: "Face Masks (N95)",
      description: "Premium quality N95 respiratory protection masks",
      category: "personal-care",
      price: 299,
      originalPrice: 499,
      discount: 40,
      manufacturer: "SafeGuard",
      popular: true,
      features: ["Pack of 5", "N95 Certified", "5-Layer Protection", "Comfortable Fit"],
      rating: 4.9,
      reviews: 3678,
      icon: Shield,
      color: "#06B6D4",
      prescription: "Not Required",
      stock: "In Stock"
    },
    {
      id: 15,
      name: "Protein Powder",
      description: "Whey protein isolate for muscle recovery and growth",
      category: "supplements",
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      manufacturer: "FitPro",
      popular: true,
      features: ["1kg Pack", "25g Protein/Serve", "Chocolate Flavor", "30 Servings"],
      rating: 4.8,
      reviews: 4567,
      icon: Activity,
      color: "#F97316",
      prescription: "Not Required",
      stock: "In Stock"
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Pill size={20} className="text-[#1E293B]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl text-[#0f172b] font-medium">
                Medicines & Pharmacy
              </h1>
              <p className="text-sm text-[#62748e] font-normal">
                Order medicines and health products with doorstep delivery
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
              placeholder="Search medicines and products..."
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
            Showing <span className="font-semibold text-[#043570]">{filteredProducts.length}</span> products
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-4 md:gap-5">
          {filteredProducts.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
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
                      style={{ backgroundColor: product.color }}
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
                              {product.name}
                            </h3>
                            {product.popular && (
                              <span className="bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#FDE68A] flex items-center gap-1">
                                <Star size={12} fill="#F59E0B" />
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#64748B] mb-3">
                            {product.description}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] mb-3">
                            <div className="flex items-center gap-1.5">
                              <Package size={14} />
                              <span>{product.manufacturer}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Shield size={14} />
                              <span className={product.prescription === "Required" ? "text-[#EF4444] font-medium" : "text-[#10B981] font-medium"}>
                                Rx: {product.prescription}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span className="text-[#10B981] font-medium">{product.stock}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star size={14} fill="#F59E0B" className="text-[#F59E0B]" />
                              <span className="font-medium text-[#043570]">{product.rating}</span>
                              <span>({product.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {product.features.slice(0, 4).map((feature, idx) => (
                              <span
                                key={idx}
                                className="bg-[#f3faff] text-[#043570] text-xs px-3 py-1 rounded-full border border-slate-200"
                              >
                                {feature}
                              </span>
                            ))}
                            {product.features.length > 4 && (
                              <span className="text-[#2563EB] text-xs px-3 py-1 rounded-full border border-[#2563EB] font-medium">
                                +{product.features.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="text-right flex-shrink-0">
                          <div className="mb-2">
                            <span className="text-sm text-[#64748B] line-through">
                              ₹{product.originalPrice}
                            </span>
                            <span className="ml-2 text-xs font-semibold text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                              {product.discount}% OFF
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-[#043570] mb-3">
                            ₹{product.price}
                          </div>
                          <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 group/btn shadow-sm">
                            <ShoppingCart size={18} />
                            <span>Add to Cart</span>
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
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Pill className="mx-auto text-[#64748B] mb-4" size={48} />
            <h3 className="text-xl font-semibold text-[#043570] mb-2">
              No products found
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
