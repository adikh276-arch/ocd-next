import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  Package,
  IndianRupee,
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  ReceiptText,
  Download,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

// ─── Types ─────────────────────────────────────────────────────────────────────
type OrderStatus = "active" | "expired" | "pending" | "refunded";
type DayStatus   = "expired" | "today" | "soon" | "ok";

interface Order {
  id: string;
  product: string;
  type: "Video" | "Chat" | "Psychiatry" | "Wellness";
  amount: number;
  currency: "INR";
  from: string;
  to: string;
  daysToExpire: number;
  dayStatus: DayStatus;
  status: OrderStatus;
}

// ─── Mock data (30 rows, 3 pages of 10) ───────────────────────────────────────
const ALL_ORDERS: Order[] = [
  { id: "100157909", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "01 Dec 2025", to: "08 Dec 2025", daysToExpire: -87,  dayStatus: "expired",  status: "active"   },
  { id: "100157326", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "24 Nov 2025", to: "01 Dec 2025", daysToExpire: -94,  dayStatus: "expired",  status: "active"   },
  { id: "100152955", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "17 Nov 2025", to: "24 Nov 2025", daysToExpire: -101, dayStatus: "expired",  status: "active"   },
  { id: "100149960", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "10 Nov 2025", to: "17 Nov 2025", daysToExpire: -108, dayStatus: "expired",  status: "active"   },
  { id: "100148559", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "03 Nov 2025", to: "10 Nov 2025", daysToExpire: -115, dayStatus: "expired",  status: "active"   },
  { id: "100147228", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "27 Oct 2025", to: "03 Nov 2025", daysToExpire: -122, dayStatus: "expired",  status: "active"   },
  { id: "100146793", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "20 Oct 2025", to: "27 Oct 2025", daysToExpire: -129, dayStatus: "expired",  status: "active"   },
  { id: "100146431", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "13 Oct 2025", to: "20 Oct 2025", daysToExpire: -136, dayStatus: "expired",  status: "active"   },
  { id: "100145797", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "06 Oct 2025", to: "13 Oct 2025", daysToExpire: -143, dayStatus: "expired",  status: "active"   },
  { id: "100145426", product: "Chat+1Video (Trial)", type: "Chat",       amount: 0.08, currency: "INR", from: "29 Sep 2025", to: "06 Oct 2025", daysToExpire: -150, dayStatus: "expired",  status: "active"   },
  { id: "100143684", product: "Video Therapy",       type: "Video",      amount: 7.00, currency: "INR", from: "22 Sep 2025", to: "29 Sep 2025", daysToExpire: -157, dayStatus: "expired",  status: "expired"  },
  { id: "100142250", product: "Video Therapy",       type: "Video",      amount: 7.00, currency: "INR", from: "15 Sep 2025", to: "22 Sep 2025", daysToExpire: -164, dayStatus: "expired",  status: "expired"  },
  { id: "100139938", product: "Video Therapy",       type: "Video",      amount: 7.00, currency: "INR", from: "08 Sep 2025", to: "15 Sep 2025", daysToExpire: -171, dayStatus: "expired",  status: "expired"  },
  { id: "100135860", product: "Video Therapy",       type: "Video",      amount: 7.00, currency: "INR", from: "02 Sep 2025", to: "08 Sep 2025", daysToExpire: -178, dayStatus: "expired",  status: "expired"  },
  { id: "100135722", product: "Video Therapy",       type: "Video",      amount: 7.00, currency: "INR", from: "25 Aug 2025", to: "02 Sep 2025", daysToExpire: -182, dayStatus: "expired",  status: "expired"  },
  { id: "100163788", product: "Chat Therapy (Trial)",type: "Chat",       amount: 5.00, currency: "INR", from: "24 Sep 2025", to: "01 Oct 2025", daysToExpire: -155, dayStatus: "expired",  status: "expired"  },
  { id: "100162300", product: "Chat Therapy (Trial)",type: "Chat",       amount: 5.00, currency: "INR", from: "17 Sep 2025", to: "24 Sep 2025", daysToExpire: -162, dayStatus: "expired",  status: "expired"  },
  { id: "100161045", product: "Chat Therapy (Trial)",type: "Chat",       amount: 5.00, currency: "INR", from: "10 Sep 2025", to: "17 Sep 2025", daysToExpire: -169, dayStatus: "expired",  status: "expired"  },
  { id: "100189001", product: "Psychiatry Consult",  type: "Psychiatry", amount: 499, currency: "INR",  from: "01 Jan 2026", to: "01 Feb 2026", daysToExpire: 26,   dayStatus: "ok",       status: "active"   },
  { id: "100191200", product: "Psychiatry Consult",  type: "Psychiatry", amount: 499, currency: "INR",  from: "01 Feb 2026", to: "01 Mar 2026", daysToExpire: 56,   dayStatus: "ok",       status: "active"   },
  { id: "100194500", product: "Psychiatry Consult",  type: "Psychiatry", amount: 499, currency: "INR",  from: "01 Mar 2026", to: "01 Apr 2026", daysToExpire: 10,   dayStatus: "soon",     status: "pending"  },
  { id: "100201100", product: "Wellness Pack",        type: "Wellness",  amount: 199, currency: "INR",  from: "01 Feb 2026", to: "01 May 2026", daysToExpire: 55,   dayStatus: "ok",       status: "active"   },
  { id: "100201200", product: "Wellness Pack",        type: "Wellness",  amount: 199, currency: "INR",  from: "15 Dec 2025", to: "15 Jan 2026", daysToExpire: -49,  dayStatus: "expired",  status: "refunded" },
  { id: "100205300", product: "Video Therapy Pro",    type: "Video",     amount: 999, currency: "INR",  from: "01 Mar 2026", to: "01 Jun 2026", daysToExpire: 87,   dayStatus: "ok",       status: "active"   },
  { id: "100205400", product: "Video Therapy Pro",    type: "Video",     amount: 999, currency: "INR",  from: "01 Feb 2026", to: "01 Mar 2026", daysToExpire: 3,    dayStatus: "soon",     status: "active"   },
  { id: "100208100", product: "Chat+1Video (Trial)",  type: "Chat",      amount: 0.08,currency: "INR",  from: "01 Jan 2026", to: "08 Jan 2026", daysToExpire: -56,  dayStatus: "expired",  status: "expired"  },
  { id: "100210300", product: "Psychiatry Consult",   type: "Psychiatry",amount: 499, currency: "INR",  from: "15 Feb 2026", to: "15 Mar 2026", daysToExpire: 9,    dayStatus: "soon",     status: "active"   },
  { id: "100211000", product: "Wellness Pack",         type: "Wellness", amount: 199, currency: "INR",  from: "01 Mar 2026", to: "01 Jun 2026", daysToExpire: 87,   dayStatus: "ok",       status: "active"   },
  { id: "100215000", product: "Video Therapy",         type: "Video",    amount: 7.00,currency: "INR",  from: "20 Jan 2026", to: "27 Jan 2026", daysToExpire: -38,  dayStatus: "expired",  status: "expired"  },
  { id: "100218000", product: "Chat Therapy",          type: "Chat",     amount: 5.00,currency: "INR",  from: "01 Mar 2026", to: "08 Mar 2026", daysToExpire: 2,    dayStatus: "today",    status: "active"   },
];

// ─── Config helpers ────────────────────────────────────────────────────────────
const ORDER_STATUS_CFG: Record<OrderStatus, { label: string; bg: string; text: string; dot: string; icon: React.ElementType }> = {
  active:   { label: "Active",   bg: "bg-[#F1F5F9]", text: "text-[#1E293B]", dot: "bg-[#0D9488]", icon: CheckCircle2 },
  expired:  { label: "Expired",  bg: "bg-[#F8FAFC]", text: "text-[#64748B]", dot: "bg-[#E2E8F0]", icon: XCircle      },
  pending:  { label: "Pending",  bg: "bg-[#F1F5F9]", text: "text-[#0D9488]", dot: "bg-[#0D9488]", icon: AlertCircle  },
  refunded: { label: "Refunded", bg: "bg-[#F8FAFC]", text: "text-[#64748B]", dot: "bg-[#64748B]", icon: RefreshCw    },
};

const DAY_STATUS_CFG: Record<DayStatus, { label: (n: number) => string; bg: string; text: string }> = {
  expired: { label: (n) => `${Math.abs(n)}d ago`, bg: "bg-[#F8FAFC]",  text: "text-[#64748B]"  },
  today:   { label: ()  => "Expires today",        bg: "bg-[#F1F5F9]",  text: "text-[#0D9488]"  },
  soon:    { label: (n) => `${n}d left`,            bg: "bg-[#F1F5F9]",  text: "text-[#1E293B]"  },
  ok:      { label: (n) => `${n}d left`,            bg: "bg-[#F1F5F9]",  text: "text-[#0D9488]"  },
};

const TYPE_CFG = {
  Video:      { bg: "bg-[#F1F5F9]", text: "text-[#1E293B]", dot: "bg-[#1E293B]" },
  Chat:       { bg: "bg-[#F1F5F9]", text: "text-[#0D9488]", dot: "bg-[#0D9488]" },
  Psychiatry: { bg: "bg-[#F1F5F9]", text: "text-[#1E293B]", dot: "bg-[#1E293B]" },
  Wellness:   { bg: "bg-[#F1F5F9]", text: "text-[#0D9488]", dot: "bg-[#0D9488]" },
};

type SortKey = "id" | "product" | "amount" | "from" | "daysToExpire" | "status";
type SortDir = "asc" | "desc";

const ROWS_OPTIONS = [5, 10, 20, 30];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function OrdersPage() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState<"all" | OrderStatus>("all");
  const [typeFilter, setType]       = useState<"all" | Order["type"]>("all");
  const [sortKey, setSortKey]       = useState<SortKey>("id");
  const [sortDir, setSortDir]       = useState<SortDir>("desc");
  const [page, setPage]             = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ── Derived data ──
  const filtered = useMemo(() => {
    let data = [...ALL_ORDERS];
    if (search)       data = data.filter(o => o.id.includes(search) || o.product.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "all") data = data.filter(o => o.status === statusFilter);
    if (typeFilter   !== "all") data = data.filter(o => o.type   === typeFilter);
    data.sort((a, b) => {
      let va: string | number = a[sortKey] as string | number;
      let vb: string | number = b[sortKey] as string | number;
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [search, statusFilter, typeFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safeP      = Math.min(page, totalPages);
  const pageData   = filtered.slice((safeP - 1) * rowsPerPage, safeP * rowsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const resetPage = () => setPage(1);

  // ── Stats ──
  const totalAmt  = ALL_ORDERS.reduce((s, o) => s + o.amount, 0);
  const activeCount  = ALL_ORDERS.filter(o => o.status === "active").length;
  const expiredCount = ALL_ORDERS.filter(o => o.status === "expired").length;

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
            transition={{ duration: 0.35 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0 self-center">
                  <Package size={20} className="text-[#1E293B]" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl text-[#0f172b] font-medium">Order Details</h1>
                  <p className="text-sm text-[#62748e] font-normal">
                    View all your order details and subscription status
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] hover:border-[#0D9488] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#1E293B] text-sm px-3.5 py-2 rounded-xl transition-colors shadow-sm">
                <Download size={14} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </motion.div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Orders",   value: ALL_ORDERS.length, icon: ReceiptText,  bg: "bg-[#1E293B]",  border: "border-[#E2E8F0]", bubble: "bg-[#F1F5F9]", text: "text-[#1E293B]" },
              { label: "Active",         value: activeCount,       icon: CheckCircle2, bg: "bg-[#0D9488]",  border: "border-[#E2E8F0]", bubble: "bg-[#F1F5F9]", text: "text-[#0D9488]" },
              { label: "Expired",        value: expiredCount,      icon: XCircle,      bg: "bg-[#64748B]",  border: "border-[#E2E8F0]", bubble: "bg-[#F8FAFC]", text: "text-[#64748B]" },
              { label: "Total Spend",    value: `₹${totalAmt.toFixed(2)}`, icon: IndianRupee, bg: "bg-[#1E293B]", border: "border-[#E2E8F0]", bubble: "bg-[#F1F5F9]", text: "text-[#1E293B]" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className={`bg-white border ${s.border} rounded-2xl p-3 md:p-4 relative overflow-hidden`}
              >
                <div className={`absolute -top-5 -right-5 w-16 h-16 rounded-full ${s.bubble} opacity-60`} />
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <s.icon size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className={`text-xl md:text-2xl font-bold leading-none ${s.text}`}>{s.value}</p>
                    <p className={`text-xs mt-1 ${s.text}`}>{s.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Filters row ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white border border-slate-200 rounded-2xl px-4 py-3 mb-4 flex flex-wrap gap-3 items-center shadow-sm"
          >
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search order ID or product…"
                value={search}
                onChange={e => { setSearch(e.target.value); resetPage(); }}
                className="w-full pl-8 pr-3 py-2 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E2E8F0] focus:border-[#0D9488] transition"
              />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-1.5">
              <Filter size={13} className="text-slate-400" />
              <select
                value={statusFilter}
                onChange={e => { setStatus(e.target.value as "all" | OrderStatus); resetPage(); }}
                className="text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#E2E8F0] text-[#64748B]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Type filter */}
            <select
              value={typeFilter}
              onChange={e => { setType(e.target.value as "all" | Order["type"]); resetPage(); }}
              className="text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#E2E8F0] text-[#64748B]"
            >
              <option value="all">All Types</option>
              <option value="Video">Video</option>
              <option value="Chat">Chat</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Wellness">Wellness</option>
            </select>

            {/* Result count */}
            <span className="ml-auto text-xs text-slate-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          </motion.div>

          {/* ── Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-slate-700 text-white">
                    {(
                      [
                        { key: "id",            label: "Order ID"      },
                        { key: "product",       label: "Product Name"  },
                        { key: "amount",        label: "Amount"        },
                        { key: "from",          label: "From"          },
                        { key: null,            label: "To"            },
                        { key: "daysToExpire",  label: "Days to Expire"},
                        { key: "status",        label: "Status"        },
                        { key: null,            label: "Action"        },
                      ] as { key: SortKey | null; label: string }[]
                    ).map((col, ci) => (
                      <th
                        key={ci}
                        onClick={() => col.key && handleSort(col.key)}
                        className={`px-4 py-3 text-left text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap select-none ${col.key ? "cursor-pointer hover:bg-slate-600 transition-colors" : ""}`}
                      >
                        <span className="flex items-center gap-1.5">
                          {col.label}
                          {col.key && (
                            sortKey === col.key
                              ? sortDir === "asc"
                                ? <ArrowUp size={12} className="text-[#0D9488]" />
                                : <ArrowDown size={12} className="text-[#0D9488]" />
                              : <ArrowUpDown size={11} className="text-slate-400" />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {pageData.length === 0 ? (
                      <tr key="empty">
                        <td colSpan={8} className="py-16 text-center text-slate-400 text-sm">
                          No orders found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      pageData.map((order, i) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.18, delay: i * 0.03 }}
                          className="hover:bg-slate-50 transition-colors group"
                        >
                          {/* Order ID */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-[#0D9488] font-medium text-[12px]">
                              <Hash size={12} className="text-[#E2E8F0]" />
                              {order.id}
                            </span>
                          </td>

                          {/* Product */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${TYPE_CFG[order.type].dot}`} />
                              <span className="text-slate-700 text-[12px]">{order.product}</span>
                              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${TYPE_CFG[order.type].bg} ${TYPE_CFG[order.type].text}`}>
                                {order.type}
                              </span>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-slate-800 font-semibold flex items-center gap-0.5 text-[12px]">
                              <IndianRupee size={13} />
                              {order.amount.toFixed(2)}
                            </span>
                          </td>

                          {/* From */}
                          <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-[12px]">{order.from}</td>

                          {/* To */}
                          <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-[12px]">{order.to}</td>

                          {/* Days to expire */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <DayBadge order={order} />
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <StatusBadge status={order.status} />
                          </td>

                          {/* Action */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <ActionButton order={order} />
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-slate-100">
              {pageData.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-sm">No orders found.</div>
              ) : (
                pageData.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.03 }}
                    className="px-4 py-3.5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[#0D9488] font-medium text-xs flex items-center gap-1">
                          <Hash size={10} className="text-[#E2E8F0]" />
                          {order.id}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-slate-700 text-sm">{order.product}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${TYPE_CFG[order.type].bg} ${TYPE_CFG[order.type].text}`}>
                            {order.type}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-slate-500">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Amount</p>
                        <p className="text-slate-800 font-semibold flex items-center gap-0.5">
                          <IndianRupee size={10} />{order.amount.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">From → To</p>
                        <p>{order.from}</p>
                        <p>{order.to}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <DayBadge order={order} />
                        <ActionButton order={order} />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* ── Pagination ── */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/60 flex-wrap gap-3">
              {/* Left: rows per page */}
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <span>Page {safeP} of {totalPages}</span>
                <span className="text-slate-300">·</span>
                <span>Rows:</span>
                <select
                  value={rowsPerPage}
                  onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                  className="text-[12px] bg-white border border-[#E2E8F0] rounded-lg px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#0D9488]"
                >
                  {ROWS_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <span className="text-slate-400">{filtered.length} total</span>
              </div>

              {/* Right: page controls */}
              <div className="flex items-center gap-1">
                <PagBtn onClick={() => setPage(1)}         disabled={safeP === 1}         icon={ChevronsLeft}  label="First" />
                <PagBtn onClick={() => setPage(p => p - 1)} disabled={safeP === 1}         icon={ChevronLeft}   label="Previous" />

                {/* Page pills */}
                <div className="flex items-center gap-1 mx-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let p: number;
                    if (totalPages <= 5)        p = i + 1;
                    else if (safeP <= 3)        p = i + 1;
                    else if (safeP >= totalPages - 2) p = totalPages - 4 + i;
                    else                        p = safeP - 2 + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-colors ${
                          p === safeP
                            ? "bg-[#1E293B] text-white shadow-sm"
                            : "text-[#64748B] hover:bg-[#F1F5F9]"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <PagBtn onClick={() => setPage(p => p + 1)} disabled={safeP === totalPages} icon={ChevronRight}  label="Next" />
                <PagBtn onClick={() => setPage(totalPages)} disabled={safeP === totalPages} icon={ChevronsRight} label="Last" />
              </div>
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck size={12} />
            All transactions are secured and encrypted · MantraCare
          </motion.p>
        </main>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = ORDER_STATUS_CFG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] px-2 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function DayBadge({ order }: { order: Order }) {
  const cfg = DAY_STATUS_CFG[order.dayStatus];
  const label = cfg.label(order.daysToExpire);
  return (
    <span className={`inline-flex items-center gap-1 text-[12px] px-2 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
      <Clock size={11} />
      {label}
    </span>
  );
}

function ActionButton({ order }: { order: Order }) {
  if (order.status === "active" || order.dayStatus === "soon" || order.dayStatus === "today") {
    return (
      <button className="text-[12px] text-[#0D9488] hover:text-[#1E293B] font-medium hover:underline transition-colors flex items-center gap-1">
        <Zap size={12} />
        Extend Plan
      </button>
    );
  }
  if (order.status === "expired") {
    return (
      <button className="text-[12px] text-[#64748B] hover:text-[#0D9488] font-medium hover:underline transition-colors flex items-center gap-1">
        <RefreshCw size={12} />
        Resubscribe
      </button>
    );
  }
  if (order.status === "pending") {
    return (
      <button className="text-[12px] text-[#1E293B] hover:text-[#0D9488] font-medium hover:underline transition-colors flex items-center gap-1">
        <Calendar size={11} />
        Complete
      </button>
    );
  }
  return <span className="text-xs text-slate-300">—</span>;
}

function PagBtn({
  onClick, disabled, icon: Icon, label,
}: { onClick: () => void; disabled: boolean; icon: React.ElementType; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`w-7 h-7 flex items-center justify-center rounded-lg text-[#64748B] transition-colors ${
        disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-[#F1F5F9] hover:text-[#1E293B]"
      }`}
    >
      <Icon size={14} />
    </button>
  );
}
