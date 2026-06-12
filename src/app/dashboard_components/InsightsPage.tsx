import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronLeft, ChevronRight, Info, Check, Send, Eye, Trash2, BarChart3
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { MobileAppModal } from "./MobileAppModal";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceTab = "Therapy" | "Addiction Treatment" | "Coach";
type ViewMode = "Charts" | "Entries";

interface ChartMetric {
  id: string;
  title: string;
  subtitle: string;
  rangeText: string;
  data: { date: string; value: number }[];
  dateRange: string;
}

interface Entry {
  id: string;
  date: string;
  assessment: string;
  completed: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CHART_METRICS: ChartMetric[] = [
  {
    id: "depression",
    title: "Depression",
    subtitle: "• 18 - Severe Depression\n• 4 - Perfectly fine",
    rangeText: "Severe Depression / Perfectly fine",
    data: [{ date: "15th Mar", value: 11.0 }],
    dateRange: "9th Mar - 15th Mar"
  },
  {
    id: "stress",
    title: "Stress",
    subtitle: "• 18 - Severe Stress Level\n• 5 - Perfectly fine",
    rangeText: "Severe Stress Level / Perfectly fine",
    data: [{ date: "9th Jan", value: 20.0 }],
    dateRange: "5th Jan - 11th Jan"
  },
  {
    id: "ocd",
    title: "OCD",
    subtitle: "• 17 - Severe to have OCD",
    rangeText: "Severe to have OCD",
    data: [],
    dateRange: ""
  },
  {
    id: "anxiety",
    title: "Anxiety",
    subtitle: "• 21 - Severe Anxiety\n• 5 - Perfectly fine",
    rangeText: "Severe Anxiety / Perfectly fine",
    data: [{ date: "12th Feb", value: 15.5 }],
    dateRange: "8th Feb - 14th Feb"
  },
  {
    id: "eating-disorder",
    title: "Eating Disorder",
    subtitle: "• 40 - Severe eating disorder\n• 10 - Perfectly fine",
    rangeText: "Severe eating disorder / Perfectly fine",
    data: [{ date: "20th Jan", value: 25.0 }],
    dateRange: "16th Jan - 22nd Jan"
  },
  {
    id: "sleep",
    title: "Sleep",
    subtitle: "• 21 - Poor sleep quality\n• 5 - Good sleep quality",
    rangeText: "Poor sleep quality / Good sleep quality",
    data: [{ date: "3rd Mar", value: 8.0 }],
    dateRange: "27th Feb - 5th Mar"
  }
];

const ENTRIES: Entry[] = [
  { id: "1", date: "13th Dec 25", assessment: "Anxiety", completed: true },
  { id: "2", date: "19th Nov 25", assessment: "Anxiety", completed: false },
  { id: "3", date: "19th Nov 25", assessment: "Anxiety", completed: false },
  { id: "4", date: "13th May 25", assessment: "OCD", completed: false },
  { id: "5", date: "25th Mar 25", assessment: "Anxiety", completed: false },
  { id: "6", date: "18th Mar 25", assessment: "Anxiety", completed: false },
  { id: "7", date: "15th Mar 25", assessment: "Anxiety", completed: false },
  { id: "8", date: "15th Mar 25", assessment: "Depression", completed: false },
  { id: "9", date: "15th Mar 25", assessment: "Anxiety", completed: false },
  { id: "10", date: "9th Jan 25", assessment: "Depression", completed: false },
  { id: "11", date: "9th Jan 25", assessment: "Stress", completed: false },
  { id: "12", date: "7th Jan 25", assessment: "Eating Disorder", completed: false }
];

// ─── Main Component ────────────────────────────────────────────────────────────
export function InsightsPage() {
  const [serviceTab, setServiceTab] = useState<ServiceTab>("Therapy");
  const [viewMode, setViewMode] = useState<ViewMode>("Charts");
  const [timeRange, setTimeRange] = useState("Week");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showMobileAppModal, setShowMobileAppModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">
          
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0 self-center">
                <BarChart3 size={20} className="text-[#1E293B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">Insights</h1>
                <p className="text-sm text-[#62748e] font-normal">Track your progress and wellness journey</p>
              </div>
            </div>
          </motion.div>

          {/* ── Service Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex gap-4 mb-4 overflow-x-auto scrollbar-hide border-b border-[#E2ECF5]"
          >
            {(["Therapy", "Addiction Treatment", "Coach"] as ServiceTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setServiceTab(tab)}
                className={`relative pb-3 text-sm whitespace-nowrap transition-colors ${
                  serviceTab === tab 
                    ? "text-[#00c0ff] font-medium" 
                    : "text-[#64748B] hover:text-[#020817]"
                }`}
              >
                {tab}
                {serviceTab === tab && (
                  <motion.div
                    layoutId="service-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* ── View Mode Toggle + Time Range ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex items-center justify-between mb-6"
          >
            {/* Charts/Entries Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("Charts")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === "Charts"
                    ? "bg-[#00c0ff] text-white shadow-md"
                    : "bg-white text-[#64748B] border border-[#E2ECF5] hover:border-[#00c0ff]"
                }`}
              >
                Charts
              </button>
              <button
                onClick={() => setViewMode("Entries")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === "Entries"
                    ? "bg-[#00c0ff] text-white shadow-md"
                    : "bg-white text-[#64748B] border border-[#E2ECF5] hover:border-[#00c0ff]"
                }`}
              >
                Entries
              </button>
            </div>

            {/* Time Range Dropdown */}
            {viewMode === "Charts" && (
              <div className="relative">
                <button
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="flex items-center gap-2 bg-white border border-[#E2ECF5] rounded-lg px-3 py-2 text-sm text-[#020817] hover:border-[#00c0ff] transition-colors font-medium"
                >
                  {timeRange}
                  <ChevronDown size={14} className="text-[#64748B]" />
                </button>
                <AnimatePresence>
                  {showTimeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 bg-white border border-[#E2ECF5] rounded-xl shadow-lg z-20 overflow-hidden min-w-[120px]"
                    >
                      {["Week", "Month", "3 Months"].map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setTimeRange(range);
                            setShowTimeDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            timeRange === range
                              ? "bg-[#f3faff] text-[#00c0ff] font-medium"
                              : "text-[#64748B] hover:bg-[#F8FAFC]"
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* ── Content ── */}
          <AnimatePresence mode="wait">
            {serviceTab === "Coach" ? (
              /* Coach Tab - Empty State */
              <motion.div
                key="coach-empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-[#E2ECF5] shadow-sm p-12 md:p-16 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-[#E0F2FE] rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 size={40} className="text-[#0284c7]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-[#043570] mb-3">No Data Available</h3>
                <p className="text-[#64748B] text-base mb-6 max-w-md">
                  Start taking assessments to generate personalized insights and track your wellness journey
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMobileAppModal(true)}
                  className="bg-[#043570] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#032656] transition-colors shadow-sm"
                >
                  Start Assessment
                </motion.button>
              </motion.div>
            ) : viewMode === "Charts" ? (
              <motion.div
                key="charts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {CHART_METRICS.map((metric, idx) => (
                  <ChartCard key={metric.id} metric={metric} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="entries"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2ECF5] shadow-sm"
              >
                {/* Table Header */}
                <div className="bg-gradient-to-r from-[#00c0ff] to-[#0EA5E9] px-6 py-4 flex items-center">
                  <div className="flex-1 text-white text-sm font-semibold">Date</div>
                  <div className="flex-1 text-white text-sm font-semibold">Assessment</div>
                  <div className="w-24 text-white text-sm font-semibold">Share</div>
                  <div className="w-32 text-white text-sm font-semibold">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-[#E2ECF5]">
                  {ENTRIES.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                      className="px-6 py-4 flex items-center hover:bg-[#f3faff] transition-all group"
                    >
                      <div className="flex-1 text-sm text-[#020817] font-medium">{entry.date}</div>
                      <div className="flex-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f3faff] text-[#043570] border border-[#E2ECF5]">
                          {entry.assessment}
                        </span>
                      </div>
                      <div className="w-24 flex items-center gap-3">
                        {/* Check Circle */}
                        <button 
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            entry.completed 
                              ? "bg-[#10B981] border-[#10B981] shadow-sm" 
                              : "border-[#CBD5E1] hover:border-[#10B981] hover:bg-[#F0FDF4]"
                          }`}
                          title="Mark as completed"
                        >
                          {entry.completed && (
                            <Check size={12} className="text-white" strokeWidth={3} />
                          )}
                        </button>
                      </div>
                      <div className="w-32 flex items-center gap-3">
                        {/* View (Eye Icon) */}
                        <button 
                          className="p-1.5 text-[#64748B] hover:text-[#00c0ff] hover:bg-[#f3faff] rounded-lg transition-all"
                          title="View entry"
                        >
                          <Eye size={18} />
                        </button>
                        {/* Delete */}
                        <button 
                          className="p-1.5 text-[#64748B] hover:text-[#F43F5E] hover:bg-[#FEF2F2] rounded-lg transition-all"
                          title="Delete entry"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State or Footer */}
                {ENTRIES.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-[#64748B] text-sm">No entries found</p>
                  </div>
                )}

                {/* Pagination or Info Footer */}
                {ENTRIES.length > 0 && (
                  <div className="px-6 py-4 border-t border-[#E2ECF5] bg-[#F8FAFC]">
                    <p className="text-xs text-[#64748B]">
                      Showing {ENTRIES.length} {ENTRIES.length === 1 ? 'entry' : 'entries'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile App Modal */}
      <MobileAppModal 
        isOpen={showMobileAppModal} 
        onClose={() => setShowMobileAppModal(false)} 
      />
    </div>
  );
}

// ─── Chart Card Component ──────────────────────────────────────────────────────
function ChartCard({ metric, index }: { metric: ChartMetric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="bg-white border border-[#E2ECF5] rounded-2xl p-4 md:p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-[#020817] mb-1">{metric.title}</h3>
          <div className="space-y-0.5">
            {metric.subtitle.split('\n').map((line, i) => (
              <p key={i} className="text-xs text-[#64748B]">{line}</p>
            ))}
          </div>
        </div>
        <button className="w-5 h-5 flex items-center justify-center text-[#64748B] hover:text-[#00c0ff] transition-colors">
          <Info size={16} />
        </button>
      </div>

      {/* Chart Area */}
      {metric.data.length > 0 ? (
        <>
          <div className="relative h-48 mb-4">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t border-[#E2ECF5]" />
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[#64748B] pr-2">
              <span>21.0</span>
              <span>17.5</span>
              <span>14.0</span>
              <span>10.5</span>
              <span>7.0</span>
            </div>

            {/* Data point */}
            <div className="absolute inset-0 flex items-center justify-center pl-8">
              <div className="relative">
                <div className="w-3 h-3 bg-[#2563EB] rounded-full" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-[#020817] whitespace-nowrap">
                  {metric.data[0].value.toFixed(1)}
                </div>
              </div>
            </div>

            {/* X-axis label */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-[#64748B] -mb-5">
              {metric.data[0].date}
            </div>

            {/* Metric label on right */}
            <div className="absolute right-0 bottom-2 text-xs text-[#64748B]">
              {metric.title}
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-[#E2ECF5]">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#00c0ff] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-[#020817] font-medium min-w-[140px] text-center">
              {metric.dateRange}
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#00c0ff] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="h-48 flex items-center justify-center text-sm text-[#64748B]">
          No data available
        </div>
      )}
    </motion.div>
  );
}
