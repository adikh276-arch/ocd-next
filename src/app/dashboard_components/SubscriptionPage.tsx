import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Calendar,
  Clock,
  Hash,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  XCircle,
  ShieldCheck,
  Receipt,
  Zap,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Order {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "refunded" | "pending";
}

interface Subscription {
  id: number;
  ref: string;
  name: string;
  type: "Video" | "Chat" | "Psychiatry" | "Wellness";
  price: string;
  currency: string;
  duration: string;
  startDate: string;
  endDate: string;
  nextPayment: string;
  status: "active" | "cancelled" | "expired" | "paused";
  sessions: number;
  sessionsUsed: number;
  provider: string;
  orders: Order[];
}

const SUBSCRIPTIONS: Subscription[] = [
  {
    id: 1,
    ref: "3376",
    name: "Therapy - Video Trial",
    type: "Video",
    price: "7",
    currency: "INR",
    duration: "25/Aug/2025 – 09/Aug/2055",
    startDate: "25/Aug/2025",
    endDate: "09/Aug/2055",
    nextPayment: "08/Dec/2025",
    status: "cancelled",
    sessions: 1,
    sessionsUsed: 1,
    provider: "Dr. Aditi Sharma",
    orders: [
      { id: "100135722", date: "01/Sep/2025", amount: "7", status: "paid" },
      { id: "100135860", date: "02/Sep/2025", amount: "7", status: "paid" },
      { id: "100139938", date: "08/Sep/2025", amount: "7", status: "paid" },
      { id: "100142250", date: "15/Sep/2025", amount: "7", status: "paid" },
      { id: "100143684", date: "22/Sep/2025", amount: "7", status: "paid" },
      { id: "100145426", date: "29/Sep/2025", amount: "7", status: "paid" },
      { id: "100145797", date: "06/Oct/2025", amount: "7", status: "paid" },
      { id: "100146431", date: "13/Oct/2025", amount: "7", status: "paid" },
      { id: "100146793", date: "20/Oct/2025", amount: "7", status: "paid" },
      { id: "100147228", date: "27/Oct/2025", amount: "7", status: "paid" },
      { id: "100148559", date: "03/Nov/2025", amount: "7", status: "paid" },
      { id: "100149960", date: "10/Nov/2025", amount: "7", status: "paid" },
      { id: "100152955", date: "17/Nov/2025", amount: "7", status: "paid" },
      { id: "100157326", date: "24/Nov/2025", amount: "7", status: "paid" },
      { id: "100157909", date: "01/Dec/2025", amount: "7", status: "paid" },
    ],
  },
  {
    id: 2,
    ref: "1471",
    name: "Therapy - Chat Trial",
    type: "Chat",
    price: "5",
    currency: "INR",
    duration: "10/Sep/2025 – 10/Sep/2026",
    startDate: "10/Sep/2025",
    endDate: "10/Sep/2026",
    nextPayment: "10/Dec/2025",
    status: "cancelled",
    sessions: 1,
    sessionsUsed: 0,
    provider: "Dr. Ravi Menon",
    orders: [
      { id: "100161045", date: "10/Sep/2025", amount: "5", status: "paid" },
      { id: "100162300", date: "17/Sep/2025", amount: "5", status: "paid" },
      { id: "100163788", date: "24/Sep/2025", amount: "5", status: "paid" },
    ],
  },
  {
    id: 3,
    ref: "4892",
    name: "Psychiatry Consultation",
    type: "Psychiatry",
    price: "499",
    currency: "INR",
    duration: "01/Jan/2026 – 01/Jan/2027",
    startDate: "01/Jan/2026",
    endDate: "01/Jan/2027",
    nextPayment: "01/Apr/2026",
    status: "active",
    sessions: 4,
    sessionsUsed: 2,
    provider: "Dr. Priya Nair",
    orders: [
      { id: "100189001", date: "01/Jan/2026", amount: "499", status: "paid" },
      { id: "100191200", date: "01/Feb/2026", amount: "499", status: "paid" },
      { id: "100194500", date: "01/Mar/2026", amount: "499", status: "pending" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  active:    { label: "Active",    bg: "bg-[#F1F5F9]", text: "text-[#1E293B]", icon: CheckCircle2, dot: "bg-[#0D9488]" },
  cancelled: { label: "Cancelled", bg: "bg-[#F8FAFC]", text: "text-[#64748B]", icon: XCircle,      dot: "bg-[#E2E8F0]" },
  expired:   { label: "Expired",   bg: "bg-[#F8FAFC]", text: "text-[#64748B]", icon: AlertCircle,  dot: "bg-[#E2E8F0]" },
  paused:    { label: "Paused",    bg: "bg-[#F1F5F9]", text: "text-[#1E293B]", icon: AlertCircle,  dot: "bg-[#E2E8F0]" },
};

const TYPE_CONFIG = {
  Video:      { bg: "bg-[#1E293B]", icon: "📹", light: "bg-[#F1F5F9]", text: "text-[#1E293B]", border: "border-[#E2E8F0]" },
  Chat:       { bg: "bg-[#0D9488]", icon: "💬", light: "bg-[#F1F5F9]", text: "text-[#1E293B]", border: "border-[#E2E8F0]" },
  Psychiatry: { bg: "bg-[#1E293B]", icon: "🏥", light: "bg-[#F1F5F9]", text: "text-[#1E293B]", border: "border-[#E2E8F0]" },
  Wellness:   { bg: "bg-[#0D9488]", icon: "🌿", light: "bg-[#F1F5F9]", text: "text-[#1E293B]", border: "border-[#E2E8F0]" },
};

const ORDER_STATUS = {
  paid:    { label: "Paid",    cls: "bg-[#F1F5F9] text-[#1E293B]" },
  refunded:{ label: "Refunded",cls: "bg-[#F8FAFC] text-[#64748B]" },
  pending: { label: "Pending", cls: "bg-[#F1F5F9] text-[#0D9488]" },
};

// ─── Subscription Card ────────────────────────────────────────────────────────
function SubscriptionCard({ sub, index }: { sub: Subscription; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[sub.status];
  const typeCfg   = TYPE_CONFIG[sub.type];
  const StatusIcon = statusCfg.icon;
  const sessionsLeft = sub.sessions - sub.sessionsUsed;
  const pct = Math.round((sub.sessionsUsed / sub.sessions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* ── Card Header ── */}
      <div
        className="px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex items-start gap-3">
          {/* Type badge */}
          <div className={`w-10 h-10 ${typeCfg.bg} rounded-xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm`}>
            {typeCfg.icon}
          </div>

          {/* Title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-slate-800 text-sm">
                  {sub.name}{" "}
                  <span className="text-slate-400 text-xs">(# {sub.ref})</span>
                </p>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className={`text-xs ${typeCfg.text}`}>{sub.type} · {sub.sessions} Session{sub.sessions > 1 ? "s" : ""}</span>
                  <span className="text-slate-300 text-xs">|</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {sub.startDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.bg} ${statusCfg.text}`}>
                  <StatusIcon size={11} />
                  {statusCfg.label}
                </span>
                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} className="text-slate-400" />
                </motion.div>
              </div>
            </div>

            {/* Progress bar for sessions */}
            {sub.sessions > 0 && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400">{sub.sessionsUsed} of {sub.sessions} sessions used</span>
                  <span className={`text-[10px] font-medium ${sessionsLeft > 0 ? "text-[#0D9488]" : "text-[#E2E8F0]"}`}>
                    {sessionsLeft > 0 ? `${sessionsLeft} remaining` : "Exhausted"}
                  </span>
                </div>
                <div className="h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${sub.status === "active" ? "bg-[#0D9488]" : "bg-[#E2E8F0]"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Expanded Detail ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Info row */}
            <div className={`mx-5 mb-4 ${typeCfg.light} border ${typeCfg.border} rounded-xl p-4`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <InfoCell icon={CreditCard} label="Price" value={`${sub.price} ${sub.currency}`} />
                <InfoCell icon={Clock} label="Duration" value={sub.duration} small />
                <InfoCell icon={Calendar} label="Next Payment" value={sub.nextPayment} />
                <InfoCell icon={ShieldCheck} label="Provider" value={sub.provider} small />
              </div>
            </div>

            {/* Action buttons */}
            {sub.status === "active" && (
              <div className="mx-5 mb-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] text-white text-xs rounded-xl hover:bg-[#0D9488] transition-colors shadow-sm">
                  <RefreshCw size={12} />
                  Renew Plan
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#64748B] text-xs rounded-xl hover:border-[#0D9488] hover:bg-[#F8FAFC] transition-colors">
                  <ExternalLink size={12} />
                  Manage Plan
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#64748B] text-xs rounded-xl hover:border-[#0D9488] hover:bg-[#F8FAFC] transition-colors">
                  <Zap size={12} />
                  Book Session
                </button>
              </div>
            )}
            {sub.status === "cancelled" && (
              <div className="mx-5 mb-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] text-white text-xs rounded-xl hover:bg-[#0D9488] transition-colors shadow-sm">
                  <ArrowRight size={12} />
                  Resubscribe
                </button>
              </div>
            )}

            {/* Orders table */}
            {sub.orders.length > 0 && (
              <div className="mx-5 mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Receipt size={13} className="text-slate-400" />
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Payment History</p>
                  <span className="ml-auto text-[10px] text-slate-400">{sub.orders.length} transactions</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  {/* Table head */}
                  <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-4 py-2.5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Order ID</span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Date</span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-right">Amount / Status</span>
                  </div>

                  {/* Table rows */}
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {sub.orders.map((order, oi) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: oi * 0.03 }}
                        className="grid grid-cols-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs text-[#0D9488] font-medium flex items-center gap-1">
                          <Hash size={10} className="text-[#E2E8F0]" />
                          {order.id}
                        </span>
                        <span className="text-xs text-slate-600">{order.date}</span>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-slate-700 font-medium">
                            ₹{order.amount}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${ORDER_STATUS[order.status].cls}`}>
                            {ORDER_STATUS[order.status].label}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Collapse button */}
            <button
              onClick={() => setExpanded(false)}
              className="w-full flex items-center justify-center gap-1 py-3 border-t border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors text-xs"
            >
              <ChevronUp size={14} />
              Collapse
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Info Cell ────────────────────────────────────────────────────────────────
function InfoCell({ icon: Icon, label, value, small }: { icon: React.ElementType; label: string; value: string; small?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Icon size={11} className="text-slate-400" />
        <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{label}</span>
      </div>
      <p className={`text-slate-700 font-medium leading-snug ${small ? "text-[11px]" : "text-xs"}`}>{value}</p>
    </div>
  );
}

// ─── Summary Stats ────────────────────────────────────────────────────────────
function SummaryStats() {
  const active    = SUBSCRIPTIONS.filter(s => s.status === "active").length;
  const cancelled = SUBSCRIPTIONS.filter(s => s.status === "cancelled").length;
  const total     = SUBSCRIPTIONS.reduce((acc, s) => acc + s.orders.length, 0);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: "Active Plans",    value: active,    icon: CheckCircle2, bg: "bg-[#0D9488]",  border: "border-[#E2E8F0]", bubble: "bg-[#F1F5F9]", text: "text-[#1E293B]" },
        { label: "Cancelled",       value: cancelled, icon: XCircle,      bg: "bg-[#64748B]",  border: "border-[#E2E8F0]", bubble: "bg-[#F8FAFC]", text: "text-[#64748B]" },
        { label: "Total Payments",  value: total,     icon: Receipt,      bg: "bg-[#1E293B]",  border: "border-[#E2E8F0]", bubble: "bg-[#F1F5F9]", text: "text-[#0D9488]" },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className={`bg-white border ${s.border} rounded-2xl p-3 md:p-4 relative overflow-hidden`}
        >
          <div className={`absolute -top-5 -right-5 w-16 h-16 rounded-full ${s.bubble} opacity-60`} />
          <div className="flex items-center gap-3 relative z-10">
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={20} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <p className={`text-2xl font-bold leading-none ${s.text}`}>{s.value}</p>
              <p className={`text-xs mt-1 ${s.text}`}>{s.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function SubscriptionPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-between mb-6 md:mb-8"
          >
            <div>
              <h1 className="text-xl md:text-2xl text-slate-900">Subscription</h1>
              <p className="text-slate-500 text-sm mt-0.5">Manage your MantraCare plans and payment history</p>
            </div>
            <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#0D9488] text-white text-sm px-4 py-2 rounded-xl transition-colors shadow-sm">
              <Zap size={14} />
              <span className="hidden sm:inline">New Plan</span>
            </button>
          </motion.div>

          {/* ── Stats ── */}
          <SummaryStats />

          {/* ── Notice banner for cancelled subs ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-3 mb-5 flex items-start gap-3"
          >
            <AlertCircle size={16} className="text-[#1E293B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#1E293B] text-sm">You have cancelled subscriptions. Resubscribe to resume sessions with your care team.</p>
            </div>
          </motion.div>

          {/* ── Subscription Cards ── */}
          <div className="space-y-3">
            {SUBSCRIPTIONS.map((sub, i) => (
              <SubscriptionCard key={sub.id} sub={sub} index={i} />
            ))}
          </div>

          {/* ── Footer note ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck size={12} />
            All transactions are secured and encrypted
          </motion.p>
        </main>
      </div>
    </div>
  );
}
