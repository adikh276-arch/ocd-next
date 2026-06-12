import { useState, useMemo } from "react";
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
  Package,
  IndianRupee,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  ReceiptText,
  Download,
  X,
  RotateCcw,
  Plus,
  Wallet,
  Building2,
  Shield,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Trash2,
  Star,
  CircleAlert,
  Coins,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { AddInsuranceModal } from "./AddInsuranceModal";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
import { ClaimDetailsModal } from "./ClaimDetailsModal";
import { FileAppealModal } from "./FileAppealModal";
import { PayCopayModal } from "./PayCopayModal";
import { MakePaymentModal } from "./MakePaymentModal";
import { BookSessionModal } from "./BookSessionModal";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED TYPES & DATA
// ─────────────────────────────────────────────────────────────────────────────

// ── Subscriptions ─────────────────────────────────────────────────────────────
interface SubOrder {
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
  orders: SubOrder[];
}

const SUBSCRIPTIONS: Subscription[] = [
  {
    id: 1, ref: "3376", name: "Therapy - Video Trial", type: "Video",
    price: "7", currency: "INR", duration: "25/Aug/2025 – 09/Aug/2055",
    startDate: "25/Aug/2025", endDate: "09/Aug/2055", nextPayment: "08/Dec/2025",
    status: "cancelled", sessions: 1, sessionsUsed: 1, provider: "Dr. Aditi Sharma",
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
    id: 2, ref: "1471", name: "Therapy - Chat Trial", type: "Chat",
    price: "5", currency: "INR", duration: "10/Sep/2025 – 10/Sep/2026",
    startDate: "10/Sep/2025", endDate: "10/Sep/2026", nextPayment: "10/Dec/2025",
    status: "cancelled", sessions: 1, sessionsUsed: 0, provider: "Dr. Ravi Menon",
    orders: [
      { id: "100161045", date: "10/Sep/2025", amount: "5", status: "paid" },
      { id: "100162300", date: "17/Sep/2025", amount: "5", status: "paid" },
      { id: "100163788", date: "24/Sep/2025", amount: "5", status: "paid" },
    ],
  },
  {
    id: 3, ref: "4892", name: "Psychiatry Consultation", type: "Psychiatry",
    price: "499", currency: "INR", duration: "01/Jan/2026 – 01/Jan/2027",
    startDate: "01/Jan/2026", endDate: "01/Jan/2027", nextPayment: "01/Apr/2026",
    status: "active", sessions: 4, sessionsUsed: 2, provider: "Dr. Priya Nair",
    orders: [
      { id: "100189001", date: "01/Jan/2026", amount: "499", status: "paid" },
      { id: "100191200", date: "01/Feb/2026", amount: "499", status: "paid" },
      { id: "100194500", date: "01/Mar/2026", amount: "499", status: "pending" },
    ],
  },
];

// ── Orders ────────────────────────────────────────────────────────────────────
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

const ALL_ORDERS: Order[] = [
  { id: "100157909", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "01 Dec 2025", to: "08 Dec 2025", daysToExpire: -87,  dayStatus: "expired", status: "active"   },
  { id: "100157326", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "24 Nov 2025", to: "01 Dec 2025", daysToExpire: -94,  dayStatus: "expired", status: "active"   },
  { id: "100152955", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "17 Nov 2025", to: "24 Nov 2025", daysToExpire: -101, dayStatus: "expired", status: "active"   },
  { id: "100149960", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "10 Nov 2025", to: "17 Nov 2025", daysToExpire: -108, dayStatus: "expired", status: "active"   },
  { id: "100148559", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "03 Nov 2025", to: "10 Nov 2025", daysToExpire: -115, dayStatus: "expired", status: "active"   },
  { id: "100147228", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "27 Oct 2025", to: "03 Nov 2025", daysToExpire: -122, dayStatus: "expired", status: "active"   },
  { id: "100146793", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "20 Oct 2025", to: "27 Oct 2025", daysToExpire: -129, dayStatus: "expired", status: "active"   },
  { id: "100146431", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "13 Oct 2025", to: "20 Oct 2025", daysToExpire: -136, dayStatus: "expired", status: "active"   },
  { id: "100145797", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "06 Oct 2025", to: "13 Oct 2025", daysToExpire: -143, dayStatus: "expired", status: "active"   },
  { id: "100145426", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "29 Sep 2025", to: "06 Oct 2025", daysToExpire: -150, dayStatus: "expired", status: "active"   },
  { id: "100143684", product: "Video Therapy",        type: "Video",      amount: 7.00, currency: "INR", from: "22 Sep 2025", to: "29 Sep 2025", daysToExpire: -157, dayStatus: "expired", status: "expired"  },
  { id: "100142250", product: "Video Therapy",        type: "Video",      amount: 7.00, currency: "INR", from: "15 Sep 2025", to: "22 Sep 2025", daysToExpire: -164, dayStatus: "expired", status: "expired"  },
  { id: "100139938", product: "Video Therapy",        type: "Video",      amount: 7.00, currency: "INR", from: "08 Sep 2025", to: "15 Sep 2025", daysToExpire: -171, dayStatus: "expired", status: "expired"  },
  { id: "100135860", product: "Video Therapy",        type: "Video",      amount: 7.00, currency: "INR", from: "02 Sep 2025", to: "08 Sep 2025", daysToExpire: -178, dayStatus: "expired", status: "expired"  },
  { id: "100135722", product: "Video Therapy",        type: "Video",      amount: 7.00, currency: "INR", from: "25 Aug 2025", to: "02 Sep 2025", daysToExpire: -182, dayStatus: "expired", status: "expired"  },
  { id: "100163788", product: "Chat Therapy (Trial)", type: "Chat",       amount: 5.00, currency: "INR", from: "24 Sep 2025", to: "01 Oct 2025", daysToExpire: -155, dayStatus: "expired", status: "expired"  },
  { id: "100162300", product: "Chat Therapy (Trial)", type: "Chat",       amount: 5.00, currency: "INR", from: "17 Sep 2025", to: "24 Sep 2025", daysToExpire: -162, dayStatus: "expired", status: "expired"  },
  { id: "100161045", product: "Chat Therapy (Trial)", type: "Chat",       amount: 5.00, currency: "INR", from: "10 Sep 2025", to: "17 Sep 2025", daysToExpire: -169, dayStatus: "expired", status: "expired"  },
  { id: "100189001", product: "Psychiatry Consult",   type: "Psychiatry", amount: 499,  currency: "INR", from: "01 Jan 2026", to: "01 Feb 2026", daysToExpire: 26,   dayStatus: "ok",      status: "active"   },
  { id: "100191200", product: "Psychiatry Consult",   type: "Psychiatry", amount: 499,  currency: "INR", from: "01 Feb 2026", to: "01 Mar 2026", daysToExpire: 56,   dayStatus: "ok",      status: "active"   },
  { id: "100194500", product: "Psychiatry Consult",   type: "Psychiatry", amount: 499,  currency: "INR", from: "01 Mar 2026", to: "01 Apr 2026", daysToExpire: 10,   dayStatus: "soon",    status: "pending"  },
  { id: "100201100", product: "Wellness Pack",        type: "Wellness",   amount: 199,  currency: "INR", from: "01 Feb 2026", to: "01 May 2026", daysToExpire: 55,   dayStatus: "ok",      status: "active"   },
  { id: "100201200", product: "Wellness Pack",        type: "Wellness",   amount: 199,  currency: "INR", from: "15 Dec 2025", to: "15 Jan 2026", daysToExpire: -49,  dayStatus: "expired", status: "refunded" },
  { id: "100205300", product: "Video Therapy Pro",    type: "Video",      amount: 999,  currency: "INR", from: "01 Mar 2026", to: "01 Jun 2026", daysToExpire: 87,   dayStatus: "ok",      status: "active"   },
  { id: "100205400", product: "Video Therapy Pro",    type: "Video",      amount: 999,  currency: "INR", from: "01 Feb 2026", to: "01 Mar 2026", daysToExpire: 3,    dayStatus: "soon",    status: "active"   },
  { id: "100208100", product: "Chat+1Video (Trial)",  type: "Chat",       amount: 0.08, currency: "INR", from: "01 Jan 2026", to: "08 Jan 2026", daysToExpire: -56,  dayStatus: "expired", status: "expired"  },
  { id: "100210300", product: "Psychiatry Consult",   type: "Psychiatry", amount: 499,  currency: "INR", from: "15 Feb 2026", to: "15 Mar 2026", daysToExpire: 9,    dayStatus: "soon",    status: "active"   },
  { id: "100211000", product: "Wellness Pack",        type: "Wellness",   amount: 199,  currency: "INR", from: "01 Mar 2026", to: "01 Jun 2026", daysToExpire: 87,   dayStatus: "ok",      status: "active"   },
  { id: "100215000", product: "Video Therapy",        type: "Video",      amount: 7.00, currency: "INR", from: "20 Jan 2026", to: "27 Jan 2026", daysToExpire: -38,  dayStatus: "expired", status: "expired"  },
  { id: "100218000", product: "Chat Therapy",         type: "Chat",       amount: 5.00, currency: "INR", from: "01 Mar 2026", to: "08 Mar 2026", daysToExpire: 2,    dayStatus: "today",   status: "active"   },
];

// ── Payment Methods ───────────────────────────────────────────────────────────
interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "netbanking" | "wallet";
  name: string;
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  upiId?: string;
  bankName?: string;
  walletName?: string;
  isDefault: boolean;
  addedOn: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    name: "Visa Credit Card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: "12",
    expiryYear: "2027",
    isDefault: true,
    addedOn: "15 Jan 2026",
  },
  {
    id: "pm_3",
    type: "card",
    name: "Mastercard Debit",
    last4: "8888",
    brand: "Mastercard",
    expiryMonth: "06",
    expiryYear: "2028",
    isDefault: false,
    addedOn: "05 Mar 2026",
  },
];

// ── Claims ────────────────────────────────────────────────────────────────────
type ClaimStatus = "Denied" | "Eligible" | "In Process" | "Not Started";

interface Claim {
  claimId: string;
  service: string;
  provider: string;
  claimAmount: number;
  submittedDate: string;
  status: ClaimStatus;
  denialReason?: string;
  payableAmount?: number;
  sessionType?: string;
}

const CLAIMS_DATA: Claim[] = [
  {
    claimId: "CLM-177382051999",
    service: "Group Therapy",
    provider: "Yet to be allocated",
    claimAmount: 0,
    submittedDate: "19/03/2026",
    status: "Not Started",
    payableAmount: 0,
  },
  {
    claimId: "CLM-177382051562",
    service: "Couples Therapy",
    provider: "Dr. Sarah Johnson",
    claimAmount: 180,
    submittedDate: "18/03/2026",
    status: "Denied",
    denialReason: "Out-of-network provider",
    payableAmount: 180,
  },
  {
    claimId: "CLM-177382051543",
    service: "Couples Therapy",
    provider: "Dr. Sarah Johnson",
    claimAmount: 180,
    submittedDate: "18/03/2026",
    status: "Eligible",
    payableAmount: 25,
  },
  {
    claimId: "CLM-177382050782",
    service: "Individual Therapy",
    provider: "Dr. Emily Chen",
    claimAmount: 150,
    submittedDate: "15/03/2026",
    status: "Eligible",
    payableAmount: 0,
  },
  {
    claimId: "CLM-177382050345",
    service: "Psychiatry Consultation",
    provider: "Dr. Michael Roberts",
    claimAmount: 200,
    submittedDate: "12/03/2026",
    status: "Denied",
    denialReason: "Service not covered under current plan",
    payableAmount: 200,
  },
  {
    claimId: "CLM-177382049891",
    service: "Couples Therapy",
    provider: "Dr. Sarah Johnson",
    claimAmount: 180,
    submittedDate: "10/03/2026",
    status: "Eligible",
    payableAmount: 25,
  },
  {
    claimId: "CLM-177382048552",
    service: "Wellness Coaching",
    provider: "Dr. Amanda Lee",
    claimAmount: 120,
    submittedDate: "08/03/2026",
    status: "In Process",
    payableAmount: 0,
  },
];

// ── Insurance ───────────────��─────────────────────────────────────────────────
interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  policyHolder: string;
  coverage: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
  copay: string;
  deductible: string;
  phone: string;
  groupNumber?: string;
  logoUrl?: string;
  isPrimary?: boolean;
}

const INSURANCE_POLICIES: InsurancePolicy[] = [
  {
    id: "ins_1",
    provider: "Blue Cross Blue Shield",
    policyNumber: "BCB123456789",
    policyHolder: "John Doe",
    coverage: "Mental Health & Wellness",
    startDate: "01 Jan 2026",
    endDate: "31 Dec 2026",
    status: "active",
    copay: "₹500",
    deductible: "₹5000",
    phone: "+91 1800-123-4567",
    groupNumber: "GRP-98765",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Blue_Cross_Blue_Shield_Association_logo.svg/240px-Blue_Cross_Blue_Shield_Association_logo.svg.png",
    isPrimary: true,
  },
  {
    id: "ins_2",
    provider: "United Healthcare",
    policyNumber: "UHC987654321",
    policyHolder: "John Doe",
    coverage: "Comprehensive Mental Health",
    startDate: "01 Jan 2025",
    endDate: "31 Dec 2025",
    status: "expired",
    copay: "₹300",
    deductible: "₹3000",
    phone: "+91 1800-987-6543",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/UnitedHealth_Group_logo.svg/240px-UnitedHealth_Group_logo.svg.png",
    isPrimary: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STYLE CONFIGS
// ───────────────────────────────────────────────────────────────────────────���─

const SUB_STATUS_CFG = {
  active:    { label: "Active",    bg: "bg-[#D1FAE5]", text: "text-[#065F46]", icon: CheckCircle2, dot: "bg-[#10B981]" },
  cancelled: { label: "Cancelled", bg: "bg-[#FFE4E6]", text: "text-[#F43F5E]", icon: XCircle,      dot: "bg-[#F43F5E]" },
  expired:   { label: "Expired",   bg: "bg-[#FED7AA]", text: "text-[#F97316]", icon: AlertCircle,  dot: "bg-[#F97316]" },
  paused:    { label: "Paused",    bg: "bg-[#f3faff]", text: "text-[#043570]", icon: AlertCircle,  dot: "bg-[#00c0ff]" },
};

const TYPE_CFG_SUB = {
  Video:      { bg: "bg-[#043570]", light: "bg-[#f3faff]", text: "text-[#043570]", border: "border-[#00c0ff]/30" },
  Chat:       { bg: "bg-[#043570]", light: "bg-[#f3faff]", text: "text-[#043570]", border: "border-[#00c0ff]/30" },
  Psychiatry: { bg: "bg-[#043570]", light: "bg-[#f3faff]", text: "text-[#043570]", border: "border-[#00c0ff]/30" },
  Wellness:   { bg: "bg-[#043570]", light: "bg-[#f3faff]", text: "text-[#043570]", border: "border-[#00c0ff]/30" },
};

const SUB_ORDER_STATUS = {
  paid:     { label: "Paid",     cls: "bg-[#f3faff] text-[#043570]" },
  refunded: { label: "Refunded", cls: "bg-[#FED7AA] text-[#F97316]" },
  pending:  { label: "Pending",  cls: "bg-[#f3faff] text-[#043570]" },
};

const ORDER_STATUS_CFG: Record<OrderStatus, { label: string; bg: string; text: string; dot: string; icon: React.ElementType }> = {
  active:   { label: "Active",   bg: "bg-[#f3faff]", text: "text-[#043570]", dot: "bg-[#00c0ff]", icon: CheckCircle2 },
  expired:  { label: "Expired",  bg: "bg-[#f3faff]",  text: "text-[#64748B]", dot: "bg-[#00c0ff]", icon: XCircle      },
  pending:  { label: "Pending",  bg: "bg-[#f3faff]",  text: "text-[#F97316]", dot: "bg-[#00c0ff]", icon: AlertCircle  },
  refunded: { label: "Refunded", bg: "bg-[#f3faff]",  text: "text-[#F43F5E]", dot: "bg-[#00c0ff]", icon: RefreshCw    },
};

const DAY_STATUS_CFG: Record<DayStatus, { label: (n: number) => string; bg: string; text: string }> = {
  expired: { label: (n) => `${Math.abs(n)}d ago`, bg: "bg-[#f3faff]",  text: "text-[#64748B]" },
  today:   { label: ()  => "Expires today",        bg: "bg-[#f3faff]",  text: "text-[#043570]" },
  soon:    { label: (n) => `${n}d left`,           bg: "bg-[#f3faff]",  text: "text-[#F97316]" },
  ok:      { label: (n) => `${n}d left`,           bg: "bg-[#f3faff]",  text: "text-[#043570]" },
};

const TYPE_CFG_ORD = {
  Video:      { bg: "bg-[#f3faff]", text: "text-[#043570]", dot: "bg-[#00c0ff]" },
  Chat:       { bg: "bg-[#f3faff]", text: "text-[#043570]", dot: "bg-[#00c0ff]" },
  Psychiatry: { bg: "bg-[#f3faff]", text: "text-[#043570]", dot: "bg-[#00c0ff]" },
  Wellness:   { bg: "bg-[#f3faff]", text: "text-[#043570]", dot: "bg-[#00c0ff]" },
};

type SortKey = "id" | "product" | "amount" | "from" | "daysToExpire" | "status";
type SortDir = "asc" | "desc";
const ROWS_OPTIONS = [5, 10, 20, 30];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

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

function SubscriptionCard({ sub, index }: { sub: Subscription; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg  = SUB_STATUS_CFG[sub.status];
  const typeCfg    = TYPE_CFG_SUB[sub.type];
  const StatusIcon = statusCfg.icon;
  const sessionsLeft = sub.sessions - sub.sessionsUsed;
  const pct = Math.round((sub.sessionsUsed / sub.sessions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="px-5 py-4 cursor-pointer select-none" onClick={() => setExpanded(e => !e)}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 ${typeCfg.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <CreditCard size={16} className="text-white" />
          </div>
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
            {sub.sessions > 0 && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400">{sub.sessionsUsed} of {sub.sessions} sessions used</span>
                  <span className={`text-[10px] font-medium ${sessionsLeft > 0 ? "text-[#22C55E]" : "text-[#E2E8F0]"}`}>
                    {sessionsLeft > 0 ? `${sessionsLeft} remaining` : "Exhausted"}
                  </span>
                </div>
                <div className="h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${sub.status === "active" ? "bg-[#00c0ff]" : "bg-[#E2E8F0]"}`}
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
            <div className={`mx-5 mb-4 ${typeCfg.light} border ${typeCfg.border} rounded-xl p-4`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <InfoCell icon={CreditCard}  label="Price"        value={`${sub.price} ${sub.currency}`} />
                <InfoCell icon={Clock}       label="Duration"     value={sub.duration}     small />
                <InfoCell icon={Calendar}    label="Next Payment" value={sub.nextPayment}  />
              </div>
            </div>

            {sub.status === "active" && (
              <div className="mx-5 mb-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#043570] text-white text-xs rounded-xl hover:bg-[#00c0ff] transition-colors shadow-sm">
                  <RefreshCw size={12} /> Renew Plan
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#FFE4E6] text-[#F43F5E] text-xs rounded-xl hover:bg-[#FFE4E6] transition-colors">
                  <XCircle size={12} /> Cancel
                </button>
              </div>
            )}
            {sub.status === "cancelled" && (
              <div className="mx-5 mb-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#043570] text-white text-xs rounded-xl hover:bg-[#00c0ff] transition-colors shadow-sm">
                  <ArrowRight size={12} /> Resubscribe
                </button>
              </div>
            )}

            {sub.orders.length > 0 && (
              <div className="mx-5 mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Receipt size={13} className="text-slate-400" />
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Payment History</p>
                  <span className="ml-auto text-[10px] text-slate-400">{sub.orders.length} transactions</span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-4 py-2.5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Order ID</span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Date</span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-right">Amount / Status</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {sub.orders.map((order, oi) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: oi * 0.03 }}
                        className="grid grid-cols-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs text-[#2563EB] font-medium flex items-center gap-1">
                          <Hash size={10} className="text-[#E2E8F0]" />{order.id}
                        </span>
                        <span className="text-xs text-slate-600">{order.date}</span>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-slate-700 font-medium">₹{order.amount}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${SUB_ORDER_STATUS[order.status].cls}`}>
                            {SUB_ORDER_STATUS[order.status].label}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setExpanded(false)}
              className="w-full flex items-center justify-center gap-1 py-3 border-t border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors text-xs"
            >
              <ChevronUp size={14} /> Collapse
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = ORDER_STATUS_CFG[status];
  const Icon = cfg.icon;
  const [showExtendPopup, setShowExtendPopup] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 text-[12px] px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
        <Icon size={11} />{cfg.label}
      </span>
      {status === "expired" && (
        <div className="relative">
          <button
            onMouseEnter={() => setShowExtendPopup(true)}
            onMouseLeave={() => setShowExtendPopup(false)}
            className="w-6 h-6 rounded-lg flex items-center justify-center bg-[#f3faff] border border-[#00c0ff]/30 text-[#043570] hover:bg-[#00c0ff] hover:text-white transition-all"
            title="Extend Plan"
          >
            <RefreshCw size={12} />
          </button>
          
          <AnimatePresence>
            {showExtendPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl p-3 z-50 min-w-[180px]"
                onMouseEnter={() => setShowExtendPopup(true)}
                onMouseLeave={() => setShowExtendPopup(false)}
              >
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-t border-l border-[#E2E8F0] rotate-45" />
                
                <p className="text-xs text-[#020817] font-medium mb-2.5">Extend this plan?</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowExtendPopup(false);
                      // Handle extend logic here
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#043570] hover:bg-[#00c0ff] text-white text-xs rounded-lg transition-colors font-medium"
                  >
                    Extend
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowExtendPopup(false);
                    }}
                    className="flex-1 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] text-xs rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function DayBadge({ order }: { order: Order }) {
  const cfg = DAY_STATUS_CFG[order.dayStatus];
  return (
    <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.label(order.daysToExpire)}
    </span>
  );
}

function ActionButtons({ order }: { order: Order }) {
  return (
    <div className="flex items-center gap-2">
      {/* Download Icon */}
      <button 
        className="p-1.5 text-[#64748B] hover:text-[#00c0ff] hover:bg-[#f3faff] rounded-lg transition-all relative group"
        title="Download Receipt"
      >
        <Download size={16} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#020817] text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Download Receipt
        </span>
      </button>
      {/* Request Refund Icon - Only show if status is not refunded */}
      {order.status !== "refunded" && (
        <a 
          href="https://content.mantracare.com/refund-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-[#64748B] hover:text-[#F97316] hover:bg-[#FED7AA] rounded-lg transition-all relative group"
          title="Request Refund"
        >
          <CircleAlert size={16} />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#020817] text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Request Refund
          </span>
        </a>
      )}
    </div>
  );
}

function PagBtn({ onClick, disabled, icon: Icon, label }: { onClick: () => void; disabled: boolean; icon: React.ElementType; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      <Icon size={14} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS TAB
// ─────────────────────────────────────────────────────────────────────────────
function SubscriptionsTab() {
  const active    = SUBSCRIPTIONS.filter(s => s.status === "active").length;
  const cancelled = SUBSCRIPTIONS.filter(s => s.status === "cancelled").length;
  const total     = SUBSCRIPTIONS.reduce((acc, s) => acc + s.orders.length, 0);

  return (
    <motion.div
      key="subscriptions"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
    >
      {/* Notice */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="bg-[#f3faff] border border-[#00c0ff]/30 rounded-xl px-4 py-3 mb-4 flex items-start gap-3"
      >
        <AlertCircle size={16} className="text-[#043570] flex-shrink-0 mt-0.5" />
        <p className="text-[#043570] text-sm">You have cancelled subscriptions. Resubscribe to resume sessions with your care team.</p>
      </motion.div>

      {/* Cards */}
      <div className="space-y-3">
        {SUBSCRIPTIONS.map((sub, i) => (
          <SubscriptionCard key={sub.id} sub={sub} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDERS TAB
// ─────────────────────────────────────────────────────────────────────────────
function OrdersTab() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatus]     = useState<"all" | OrderStatus>("all");
  const [typeFilter, setType]         = useState<"all" | Order["type"]>("all");
  const [sortKey, setSortKey]         = useState<SortKey>("id");
  const [sortDir, setSortDir]         = useState<SortDir>("desc");
  const [page, setPage]               = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    let data = [...ALL_ORDERS];
    if (search)             data = data.filter(o => o.id.includes(search) || o.product.toLowerCase().includes(search.toLowerCase()));
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

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
    >
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="bg-white border border-slate-200 rounded-2xl px-4 py-3 mb-4 flex flex-wrap gap-3 items-center shadow-sm"
      >
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search order ID or product…"
            value={search}
            onChange={e => { setSearch(e.target.value); resetPage(); }}
            className="w-full pl-8 pr-3 py-2 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93C5FD] focus:border-[#2563EB] transition"
          />
        </div>
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
        <span className="ml-auto text-xs text-slate-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
      >
        {/* Table - Scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-slate-700 text-white">
                {([
                  { key: "id",           label: "Order ID"       },
                  { key: "product",      label: "Product Name"   },
                  { key: "amount",       label: "Amount"         },
                  { key: null,           label: "Start Date"     },
                  { key: "daysToExpire", label: "Days to Expire" },
                  { key: "status",       label: "Status"         },
                  { key: null,           label: "Actions"        },
                ] as { key: SortKey | null; label: string }[]).map((col, ci) => (
                  <th
                    key={ci}
                    onClick={() => col.key && handleSort(col.key)}
                    className={`px-4 py-3 text-left text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap select-none ${col.key ? "cursor-pointer hover:bg-slate-600 transition-colors" : ""}`}
                  >
                    <span className="flex items-center gap-1.5">
                      {col.label}
                      {col.key && (
                        sortKey === col.key
                          ? sortDir === "asc" ? <ArrowUp size={12} className="text-[#22C55E]" /> : <ArrowDown size={12} className="text-[#22C55E]" />
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
                    <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">No orders found matching your filters.</td>
                  </tr>
                ) : pageData.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.03 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="flex items-center gap-1 text-[#00c0ff] font-medium text-[12px]">
                        <Hash size={12} className="text-slate-300" />{order.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${TYPE_CFG_ORD[order.type].dot}`} />
                        <span className="text-slate-700 text-[12px]">{order.product}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-slate-800 font-semibold flex items-center gap-0.5 text-[12px]">
                        <IndianRupee size={13} />{order.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-[12px]">{order.from}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><DayBadge order={order} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><ActionButtons order={order} /></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile cards - Hidden, using table instead */}
        <div className="hidden divide-y divide-slate-100 overflow-x-auto">
          {pageData.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">No orders found.</div>
          ) : pageData.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: i * 0.03 }}
              className="px-4 py-3.5"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[#00c0ff] font-medium text-xs flex items-center gap-1">
                    <Hash size={10} className="text-[#E2E8F0]" />{order.id}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-slate-700 text-sm">{order.product}</span>
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
                  <p>{order.from}</p><p>{order.to}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <DayBadge order={order} />
                  <ActionButtons order={order} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/60 flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[12px] text-slate-500">
            <span>Page {safeP} of {totalPages}</span>
            <span className="text-slate-300">·</span>
            <span>Rows:</span>
            <select
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              className="text-[12px] bg-white border border-[#E2E8F0] rounded-lg px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
            >
              {ROWS_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-slate-400">{filtered.length} total</span>
          </div>
          <div className="flex items-center gap-1">
            <PagBtn onClick={() => setPage(1)}             disabled={safeP === 1}         icon={ChevronsLeft}  label="First"    />
            <PagBtn onClick={() => setPage(p => p - 1)}    disabled={safeP === 1}         icon={ChevronLeft}   label="Previous" />
            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p: number;
                if (totalPages <= 5)           p = i + 1;
                else if (safeP <= 3)           p = i + 1;
                else if (safeP >= totalPages - 2) p = totalPages - 4 + i;
                else                           p = safeP - 2 + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-colors ${p === safeP ? "bg-[#043570] text-white shadow-sm" : "text-[#64748B] hover:bg-[#f3faff]"}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <PagBtn onClick={() => setPage(p => p + 1)}   disabled={safeP === totalPages} icon={ChevronRight}  label="Next" />
            <PagBtn onClick={() => setPage(totalPages)}    disabled={safeP === totalPages} icon={ChevronsRight} label="Last" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────���───────────────────────────────
// PAYMENT METHODS TAB
// ─────────────────────────────────────────────────────────────────────────────
function PaymentMethodsTab() {
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);

  const handleSavePayment = (cardData: any) => {
    console.log("New payment method:", cardData);
    // Here you would typically save the payment method to your backend
  };

  return (
    <>
      <motion.div
        key="payment-methods"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header with Add Button */}
        <div className="flex items-center justify-end mb-4">
          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsAddPaymentModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#22C55E] text-white text-sm px-3 py-2 rounded-xl shadow-sm shadow-[#2563EB]/20 transition-colors"
          >
            <Plus size={14} />
            <span>Add Payment Method</span>
          </motion.button>
        </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        {PAYMENT_METHODS.map((pm, i) => (
          <motion.div
            key={pm.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
            className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="px-5 py-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#043570] to-[#00c0ff] flex items-center justify-center flex-shrink-0 shadow-sm">
                  {pm.type === "card" && <CreditCard size={20} className="text-white" />}
                  {pm.type === "upi" && <Wallet size={20} className="text-white" />}
                  {pm.type === "netbanking" && <Building2 size={20} className="text-white" />}
                  {pm.type === "wallet" && <Wallet size={20} className="text-white" />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-slate-800 text-sm font-medium">{pm.name}</p>
                        {pm.isDefault && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#f3faff] text-[#043570] border border-[#00c0ff]/30">
                            <Star size={9} className="fill-current" /> Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                        {pm.type === "card" && (
                          <>
                            <span className="font-mono">•••• {pm.last4}</span>
                            <span className="text-slate-300">|</span>
                            <span>{pm.brand}</span>
                            <span className="text-slate-300">|</span>
                            <span>Exp: {pm.expiryMonth}/{pm.expiryYear}</span>
                          </>
                        )}
                        {pm.type === "upi" && (
                          <>
                            <span className="font-mono">{pm.upiId}</span>
                          </>
                        )}
                        {pm.type === "netbanking" && (
                          <>
                            <span>{pm.bankName}</span>
                          </>
                        )}
                        {pm.type === "wallet" && (
                          <>
                            <span>{pm.walletName}</span>
                          </>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Added on {pm.addedOn}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-2 text-[#64748B] hover:text-[#043570] hover:bg-[#f3faff] rounded-lg transition-all" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2 text-[#64748B] hover:text-[#F43F5E] hover:bg-[#FFE4E6] rounded-lg transition-all" title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6 bg-[#f3faff] border border-[#00c0ff]/30 rounded-xl px-4 py-3 flex items-start gap-3"
      >
        <ShieldCheck size={16} className="text-[#043570] flex-shrink-0 mt-0.5" />
        <p className="text-[#043570] text-xs">
          Your payment information is encrypted and secure. We never store your complete card details on our servers.
        </p>
      </motion.div>
    </motion.div>

    {/* Add Payment Method Modal */}
    <AddPaymentMethodModal
      isOpen={isAddPaymentModalOpen}
      onClose={() => setIsAddPaymentModalOpen(false)}
      onSave={handleSavePayment}
    />
  </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSURANCE TAB
// ──────────���──────────────────────────────────────────────────────────────────
function InsuranceTab() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBookSessionModalOpen, setIsBookSessionModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"insurance" | "claims">("insurance");
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [appealClaim, setAppealClaim] = useState<Claim | null>(null);
  const [payClaim, setPayClaim] = useState<Claim | null>(null);
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>(INSURANCE_POLICIES);
  const [claims, setClaims] = useState<Claim[]>(CLAIMS_DATA);
  
  const handleSetPrimary = (policyId: string) => {
    setInsurancePolicies(policies =>
      policies.map(policy => ({
        ...policy,
        isPrimary: policy.id === policyId
      }))
    );
  };

  const handleCreateClaim = (insuranceId: string, service: string, sessionType?: string) => {
    // Generate a unique claim ID
    const timestamp = Date.now();
    const claimId = `CLM-${timestamp}`;
    
    // Get today's date in DD/MM/YYYY format
    const today = new Date();
    const submittedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    // Create new claim
    const newClaim: Claim = {
      claimId,
      service,
      provider: "Yet to be allocated",
      claimAmount: 0,
      submittedDate,
      status: "Not Started",
      payableAmount: 0,
      sessionType,
    };
    
    // Add claim to the beginning of the list
    setClaims(prevClaims => [newClaim, ...prevClaims]);
    
    // Switch to claims tab
    setActiveSubTab("claims");
  };

  const handleOpenAddInsurance = () => {
    setIsBookSessionModalOpen(false);
    setIsAddModalOpen(true);
  };

  const handleCancelClaim = (claimId: string) => {
    // Remove the claim from the list
    setClaims(prevClaims => prevClaims.filter(claim => claim.claimId !== claimId));
  };
  
  const insuranceStatusCfg = {
    active: { label: "Active", bg: "bg-[#f3faff]", text: "text-[#043570]", icon: CheckCircle2 },
    expired: { label: "Expired", bg: "bg-[#FED7AA]", text: "text-[#F97316]", icon: XCircle },
    pending: { label: "Pending", bg: "bg-[#f3faff]", text: "text-[#043570]", icon: AlertCircle },
  };

  return (
    <>
      <motion.div
        key="insurance"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      >
        {/* Sub-tabs for Insurance and Claims */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveSubTab("insurance")}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                activeSubTab === "insurance"
                  ? "text-[#00c0ff]"
                  : "text-[#64748B] hover:text-[#020817]"
              }`}
            >
              Insurance
              {activeSubTab === "insurance" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveSubTab("claims")}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                activeSubTab === "claims"
                  ? "text-[#00c0ff]"
                  : "text-[#64748B] hover:text-[#020817]"
              }`}
            >
              Claims
              {activeSubTab === "claims" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c0ff]"></div>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Book More Sessions Button - Show on both tabs */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsBookSessionModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#22C55E] text-white text-sm px-3 py-2 rounded-xl shadow-sm shadow-[#2563EB]/20 transition-colors"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Book More Sessions</span>
              <span className="sm:hidden">Book</span>
            </motion.button>
          </div>
        </div>

        {/* Sub-tab Content */}
        <AnimatePresence mode="wait">
          {activeSubTab === "insurance" ? (
            <motion.div
              key="insurance-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Insurance Policies */}
      <div className="space-y-3">
        {insurancePolicies.map((policy, i) => {
          const statusCfg = insuranceStatusCfg[policy.status];
          const StatusIcon = statusCfg.icon;

          return (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="px-5 py-4">
                <div className="flex items-start gap-4">
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-slate-800 text-sm font-medium">{policy.provider}</p>
                            {policy.isPrimary && (
                              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700 border border-amber-200">
                                <Star size={9} className="fill-current" /> Primary
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Policy #{policy.policyNumber}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.bg} ${statusCfg.text}`}>
                        <StatusIcon size={11} />
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Info Grid */}
                    <div className="bg-[#f3faff] border border-[#00c0ff]/30 rounded-xl p-3 mb-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-start gap-2">
                          <Hash size={12} className="text-[#043570] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wide">Policy Holder</p>
                            <p className="text-slate-700 font-medium">{policy.policyHolder}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar size={12} className="text-[#043570] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wide">Coverage Period</p>
                            <p className="text-slate-700 font-medium">{policy.startDate} - {policy.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Receipt size={12} className="text-[#043570] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wide">Coverage Type</p>
                            <p className="text-slate-700 font-medium">{policy.coverage}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <IndianRupee size={12} className="text-[#043570] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wide">Copay / Deductible</p>
                            <p className="text-slate-700 font-medium">{policy.copay} / {policy.deductible}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      {policy.groupNumber && (
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Group: {policy.groupNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 ml-auto">
                        <button 
                          onClick={() => handleSetPrimary(policy.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl transition-all ${
                            policy.isPrimary 
                              ? 'bg-amber-100 border border-amber-200 text-amber-700' 
                              : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-amber-50 hover:border-amber-200'
                          }`}
                          title={policy.isPrimary ? "Primary Insurance" : "Set as Primary"}
                        >
                          <Star size={12} className={policy.isPrimary ? "fill-current" : ""} />
                          {policy.isPrimary ? "Primary" : "Set Primary"}
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#64748B] text-xs rounded-xl hover:bg-[#f3faff] transition-colors">
                          <Edit2 size={12} /> Edit
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#FFE4E6] text-[#F43F5E] text-xs rounded-xl hover:bg-[#FFE4E6] transition-colors">
                          <Trash2 size={12} /> Remove
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

              {/* Add Insurance Button */}
              <div className="flex justify-end mt-6">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-1.5 bg-[#043570] hover:bg-[#00c0ff] text-white text-sm px-3 py-2 rounded-xl shadow-sm shadow-[#043570]/20 transition-colors"
                >
                  <Plus size={14} />
                  <span className="hidden sm:inline">Add Insurance</span>
                  <span className="sm:hidden">Add</span>
                </motion.button>
              </div>

              {/* Info Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-4 bg-[#f3faff] border border-[#00c0ff]/30 rounded-xl px-4 py-3 flex items-start gap-3"
              >
                <AlertCircle size={16} className="text-[#043570] flex-shrink-0 mt-0.5" />
                <p className="text-[#043570] text-xs">
                  Insurance claims may take 3-5 business days to process. Contact your insurance provider for specific coverage details.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="claims-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Claims Cards */}
              <div className="space-y-3">
                {claims.map((claim, i) => {
                  const statusConfig = 
                    claim.status === "Denied" 
                      ? { bg: "bg-red-50", text: "text-red-700", badgeBg: "bg-red-100", badgeBorder: "border-red-200", borderLeft: "border-l-red-500", icon: XCircle }
                      : claim.status === "Eligible"
                      ? { bg: "bg-green-50", text: "text-green-700", badgeBg: "bg-green-100", badgeBorder: "border-green-200", borderLeft: "border-l-green-500", icon: CheckCircle2 }
                      : claim.status === "In Process"
                      ? { bg: "bg-blue-50", text: "text-blue-700", badgeBg: "bg-blue-100", badgeBorder: "border-blue-200", borderLeft: "border-l-blue-500", icon: RefreshCw }
                      : { bg: "bg-slate-50", text: "text-slate-700", badgeBg: "bg-slate-100", badgeBorder: "border-slate-200", borderLeft: "border-l-slate-400", icon: Clock };
                  
                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.div
                      key={claim.claimId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all border-l-4 ${statusConfig.borderLeft}`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-slate-900 font-bold text-base">
                              Claim #{claim.claimId}
                            </h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig.badgeBg} ${statusConfig.text} border ${statusConfig.badgeBorder}`}>
                              <StatusIcon size={12} />
                              {claim.status}
                            </span>
                            {/* Copay Badge for Eligible claims with payable amount */}
                            {claim.status === "Eligible" && (claim.payableAmount || 0) > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border" style={{ backgroundColor: '#E5F8FF', color: '#00c0ff', borderColor: '#00c0ff' }}>
                                <Coins size={12} />
                                Copay
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">Submitted on {claim.submittedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-0.5">Amount</p>
                          <p className="text-slate-900 font-bold text-2xl">${claim.claimAmount}</p>
                        </div>
                      </div>

                      {/* Session Info */}
                      <div className={`${statusConfig.bg} rounded-lg p-3.5 mb-3`}>
                        <div className="flex items-start gap-2.5">
                          <ReceiptText size={16} className={statusConfig.text} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 mb-0.5">{claim.service}</p>
                            <p className="text-xs text-slate-600">Provider: {claim.provider}</p>
                          </div>
                        </div>
                      </div>

                      {/* Denial Reason (if applicable) */}
                      {claim.status === "Denied" && claim.denialReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 mb-4">
                          <div className="flex items-start gap-2.5">
                            <CircleAlert size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-red-900 font-semibold text-xs mb-1">Denial Reason</p>
                              <p className="text-red-700 text-xs leading-relaxed">{claim.denialReason}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => setSelectedClaim(claim)}
                          className="flex items-center gap-1.5 px-3 py-2 text-slate-600 text-sm hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <ReceiptText size={14} />
                          View Details
                        </button>
                        
                        <div className="ml-auto flex items-center gap-2">
                          {/* Eligible claims with copay */}
                          {claim.status === "Eligible" && (claim.payableAmount || 0) > 0 && (
                            <button 
                              onClick={() => setPayClaim(claim)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CreditCard size={14} />
                              Pay ${claim.payableAmount}
                            </button>
                          )}
                          
                          {/* Denied claims */}
                          {claim.status === "Denied" && (
                            <>
                              <button 
                                onClick={() => setAppealClaim(claim)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <ArrowRight size={14} />
                                File Appeal
                              </button>
                              {(claim.payableAmount || 0) > 0 && (
                                <button 
                                  onClick={() => setPayClaim(claim)}
                                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                  <CreditCard size={14} />
                                  Pay ${claim.payableAmount}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AddInsuranceModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <BookSessionModal
        isOpen={isBookSessionModalOpen}
        onClose={() => setIsBookSessionModalOpen(false)}
        insurancePolicies={insurancePolicies}
        onOpenAddInsurance={handleOpenAddInsurance}
        onCreateClaim={handleCreateClaim}
      />

      {selectedClaim && (
        <ClaimDetailsModal
          isOpen={!!selectedClaim}
          onClose={() => setSelectedClaim(null)}
          claim={selectedClaim}
          onPayClick={() => {
            setPayClaim(selectedClaim);
            setSelectedClaim(null);
          }}
          onCancelClaim={handleCancelClaim}
        />
      )}

      {appealClaim && (
        <FileAppealModal
          isOpen={!!appealClaim}
          onClose={() => setAppealClaim(null)}
          claimId={appealClaim.claimId}
          denialReason={appealClaim.denialReason || "No reason provided"}
        />
      )}

      {payClaim && (
        <>
          {payClaim.status === "Denied" ? (
            <MakePaymentModal
              isOpen={!!payClaim}
              onClose={() => setPayClaim(null)}
              claimId={payClaim.claimId}
              totalAmount={payClaim.payableAmount || 0}
              denialReason={payClaim.denialReason || "No reason provided"}
            />
          ) : (
            <PayCopayModal
              isOpen={!!payClaim}
              onClose={() => setPayClaim(null)}
              claimId={payClaim.claimId}
              copayAmount={payClaim.payableAmount || 0}
              claimAmount={payClaim.claimAmount}
            />
          )}
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MANTRA COINS TAB
// ─────────────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  label: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  service: string;
}

const COIN_TRANSACTIONS: Transaction[] = [
  { id: "t1", label: "Referral Reward (Charged)",  date: "Dec 08, 2024 · 06:30 AM", amount: 300, type: "credit", service: "Therapy" },
  { id: "t2", label: "Subscription Purchase",       date: "Oct 18, 2024 · 12:30 PM", amount: 600, type: "debit", service: "Psychiatry"  },
  { id: "t3", label: "Referral Reward (Regel)",     date: "Sep 21, 2024 · 10:08 PM", amount: 200, type: "credit", service: "Wellness" },
  { id: "t4", label: "Referral Reward (Forward)",   date: "Sep 16, 2024 · 10:00 AM", amount: 200, type: "credit", service: "Coaching" },
  { id: "t5", label: "Used For Yoga Classes",       date: "Sep 10, 2024 · 02:30 PM", amount: 206, type: "debit", service: "Yoga"  },
  { id: "t6", label: "Mindfulness Session",         date: "Aug 25, 2024 · 09:15 AM", amount: 150, type: "debit", service: "Mindfulness"  },
  { id: "t7", label: "Nutrition Consultation",      date: "Aug 18, 2024 · 03:45 PM", amount: 450, type: "debit", service: "Nutrition"  },
  { id: "t8", label: "Referral Reward (Client)",    date: "Aug 10, 2024 · 11:20 AM", amount: 500, type: "credit", service: "Therapy"  },
];

const SERVICE_FILTERS = [
  "All Services",
  "Therapy",
  "Psychiatry",
  "Wellness",
  "Coaching",
  "Yoga",
  "Mindfulness",
  "Nutrition",
  "Fitness",
  "Sleep",
  "Stress Management",
  "Weight Loss",
  "Diabetes Care",
  "Physiotherapy"
];

function MantraCoinsTab() {
  const [selectedService, setSelectedService] = useState("All Services");
  const [walletType, setWalletType] = useState("Therapy");
  
  const filteredTransactions = selectedService === "All Services" 
    ? COIN_TRANSACTIONS 
    : COIN_TRANSACTIONS.filter(tx => tx.service === selectedService);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0369a1 0%, #0284c7 55%, #0ea5e9 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 left-4 w-20 h-20 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Wallet size={14} className="text-white" />
              </div>
              <span className="text-white/70 text-xs tracking-wide">Your Total Balance</span>
            </div>
            
            {/* Wallet Type Filter */}
            <Select value={walletType} onValueChange={setWalletType}>
              <SelectTrigger className="h-8 text-xs border-white/30 bg-white/10 text-white w-[120px] hover:bg-white/20 [&_*[data-slot=select-icon]]:!opacity-100 [&_*[data-slot=select-icon]]:!text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Therapy" className="text-xs">Therapy</SelectItem>
                <SelectItem value="Coach" className="text-xs">Coach</SelectItem>
                <SelectItem value="Corporate" className="text-xs">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-3 mb-1">
            <span className="text-white text-3xl font-bold tracking-tight">₹12,847</span>
            <div className="flex items-center gap-1 bg-white/15 rounded-full px-2 py-0.5 mb-1">
              <TrendingUp size={12} className="text-white/80" />
              <span className="text-white/80 text-xs">+5.2%</span>
            </div>
          </div>

          <p className="text-white/50 text-xs leading-relaxed mt-3">
            The credit balance can be used to offset bills with client directly.
          </p>
        </div>
      </motion.div>

      {/* Transactions Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
          <p className="text-slate-800 text-sm">Recent Transactions</p>
          <div className="flex items-center gap-2">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-8 text-xs border-slate-200 w-[140px]">
                <Filter size={12} className="mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_FILTERS.map((service) => (
                  <SelectItem key={service} value={service} className="text-xs">
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredTransactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, delay: i * 0.05 + 0.22 }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                tx.type === "credit" ? "bg-[#F1F5F9]" : "bg-[#F8FAFC]"
              }`}>
                {tx.type === "credit"
                  ? <ArrowUpRight size={15} className="text-[#0D9488]" />
                  : <ArrowDownRight size={15} className="text-[#64748B]" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 text-xs truncate">{tx.label}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{tx.date}</p>
              </div>
              <span className={`text-sm font-medium flex-shrink-0 ${
                tx.type === "credit" ? "text-[#0D9488]" : "text-[#64748B]"
              }`}>
                {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function BillingPage() {
  const router = useRouter();
  const location = useLocation();
  const initialTab = (location.state as { activeTab?: string })?.activeTab || "orders";
  const [activeTab, setActiveTab] = useState<"subscriptions" | "orders" | "payment-methods" | "insurance" | "mantra-coins">(
    initialTab as "subscriptions" | "orders" | "payment-methods" | "insurance" | "mantra-coins"
  );

  const tabs: Array<{ id: "subscriptions" | "orders" | "payment-methods" | "insurance" | "mantra-coins"; label: string; icon: any }> = [
    { id: "orders",          label: "Orders",         icon: Package    },
    { id: "subscriptions",   label: "Subscriptions", icon: CreditCard },
    { id: "payment-methods", label: "Payment",       icon: Wallet     },
    { id: "insurance",       label: "Insurance",     icon: Shield     },
    { id: "mantra-coins",    label: "Mantra Coins",  icon: Coins      },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
                  <CreditCard size={20} className="text-[#1E293B]" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl text-[#0f172b] font-medium mb-1">Billing</h1>
                  <p className="text-sm text-[#62748e] font-normal">Manage your plans, payments and order history</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeTab === "subscriptions" && (
                  <button 
                    onClick={() => router.push("/plans")}
                    className="flex items-center gap-2 bg-[#043570] hover:bg-[#00c0ff] text-white text-sm px-4 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    <Zap size={14} />
                    <span className="hidden sm:inline">New Plan</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1 mb-6 w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-xl text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#043570] text-white shadow-sm"
                    : "text-[#64748B] hover:text-[#020817] hover:bg-[#f3faff]"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "subscriptions" ? (
              <SubscriptionsTab key="subscriptions" />
            ) : activeTab === "orders" ? (
              <OrdersTab key="orders" />
            ) : activeTab === "payment-methods" ? (
              <PaymentMethodsTab key="payment-methods" />
            ) : activeTab === "insurance" ? (
              <InsuranceTab key="insurance" />
            ) : activeTab === "mantra-coins" ? (
              <MantraCoinsTab key="mantra-coins" />
            ) : null}
          </AnimatePresence>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck size={12} />
            All transactions are secured and encrypted · MantraCare
          </motion.p>
        </main>
      </div>
    </div>
  );
}
