import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  Phone,
  MessageCircle,
  Linkedin,
  MessageSquare,
  Mail,
  ChevronDown,
  TrendingUp,
  ArrowRight,
  Wallet,
  Users,
  Building2,
  UserCheck,
  Gift,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ShareLeadModal } from "./ShareLeadModal";

type TabId = "provider" | "client" | "corporate";

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
  heroTitle: string;
  heroSub: string;
  steps: string[];
}

interface Transaction {
  id: string;
  label: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
}

const TABS: TabConfig[] = [
  {
    id: "client",
    label: "Refer a Client",
    icon: Users,
    heroTitle: "Give $15, Get $15",
    heroSub: "Refer a Friend for Therapy",
    steps: [
      "Invite a friend to try Mantra.",
      "Once they complete their first session, you both earn rewards.",
      "Rewards are auto-credited to your Mantra wallet.",
      "Use wallet balance to buy any Mantra program.",
    ],
  },
  {
    id: "provider",
    label: "Refer a Provider",
    icon: UserCheck,
    heroTitle: "Give $15, Get $15",
    heroSub: "Refer a Therapist",
    steps: [
      "Share your referral code with qualified professionals.",
      "When they onboard and complete their first session, you both earn rewards—automatically credited to your MantraCare wallet.",
      "Cash out instantly or use credits on MantraCare.",
    ],
  },
  {
    id: "corporate",
    label: "Refer a Corporate",
    icon: Building2,
    heroTitle: "Give $15, Get $15",
    heroSub: "Refer a Corporate",
    steps: [
      "Share a lead and connect us with HR or key stakeholders seeking EAP, emotional wellbeing, coaching, or wellness solutions.",
      "Our team supports you in pitching and closing the opportunity.",
      "Get rewarded with 15–20% of the total contract value.",
    ],
  },
];

const TRANSACTIONS: Transaction[] = [
  { id: "t1", label: "Referral Reward (Charged)",  date: "Dec 08, 2024 · 06:30 AM", amount: 300, type: "credit" },
  { id: "t2", label: "Subscription Purchase",       date: "Oct 18, 2024 · 12:30 PM", amount: 600, type: "debit"  },
  { id: "t3", label: "Referral Reward (Regel)",     date: "Sep 21, 2024 · 10:08 PM", amount: 200, type: "credit" },
  { id: "t4", label: "Referral Reward (Forward)",   date: "Sep 16, 2024 · 10:00 AM", amount: 200, type: "credit" },
  { id: "t5", label: "Used For Yoga Classes",       date: "Sep 10, 2024 · 02:30 PM", amount: 206, type: "debit"  },
];

const SERVICE_OPTIONS = ["Therapy", "Psychiatry", "Wellness", "Coaching"];

const SHARE_ITEMS = [
  { label: "Facebook",  icon: MessageCircle,  bg: "bg-[#1877F2]",  fg: "text-white" },
  { label: "WhatsApp",  icon: MessageCircle,  bg: "bg-[#25D366]",  fg: "text-white" },
  { label: "LinkedIn",  icon: Linkedin,       bg: "bg-[#0A66C2]",  fg: "text-white" },
  { label: "X",         icon: MessageSquare,  bg: "bg-[#000000]",  fg: "text-white" },
  { label: "Email",     icon: Mail,           bg: "bg-[#6B7280]",  fg: "text-white" },
];

/* ── Hero SVG illustration ── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Person 1 */}
      <circle cx="38" cy="30" r="13" fill="white" fillOpacity="0.25" />
      <circle cx="38" cy="24" r="7" fill="white" fillOpacity="0.7" />
      <path d="M24 50 Q24 38 38 38 Q52 38 52 50" fill="white" fillOpacity="0.5" />
      {/* Person 2 */}
      <circle cx="102" cy="30" r="13" fill="white" fillOpacity="0.25" />
      <circle cx="102" cy="24" r="7" fill="white" fillOpacity="0.7" />
      <path d="M88 50 Q88 38 102 38 Q116 38 116 50" fill="white" fillOpacity="0.5" />
      {/* Gift box */}
      <rect x="54" y="56" width="32" height="28" rx="3" fill="white" fillOpacity="0.8" />
      <rect x="54" y="50" width="32" height="10" rx="3" fill="white" fillOpacity="0.9" />
      <line x1="70" y1="50" x2="70" y2="84" stroke="#16a34a" strokeWidth="2" />
      <path d="M70 50 Q64 44 62 46 Q60 50 70 50" fill="#86efac" />
      <path d="M70 50 Q76 44 78 46 Q80 50 70 50" fill="#86efac" />
      {/* Arrow left */}
      <path d="M48 65 L56 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 65 L52 61 M48 65 L52 69" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Arrow right */}
      <path d="M86 65 L92 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 65 L88 61 M92 65 L88 69" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Dollar coins */}
      <circle cx="22" cy="72" r="10" fill="white" fillOpacity="0.3" />
      <text x="22" y="76" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">$</text>
      <circle cx="118" cy="72" r="10" fill="white" fillOpacity="0.3" />
      <text x="118" y="76" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">$</text>
    </svg>
  );
}

/* ── Refer panel ── */
function ReferPanel({ tab, copied, onCopy, service, onServiceChange, onOpenShareLead }: {
  tab: TabConfig;
  copied: boolean;
  onCopy: () => void;
  service: string;
  onServiceChange: (s: string) => void;
  onOpenShareLead: () => void;
}) {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22 }}
    >
      {/* ── Hero banner ── */}
      <div className="relative rounded-2xl overflow-hidden mb-6 bg-[#E8F4FA] p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-slate-900 text-lg font-semibold mb-0.5">{tab.heroTitle}</h2>
            <p className="text-slate-600 text-sm">{tab.heroSub}</p>
          </div>
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="mb-6">
        <p className="text-slate-800 text-sm mb-4">How it Works?</p>
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[11px] top-5 bottom-5 w-px bg-[#E2E8F0] z-0" />
          <div className="space-y-4 relative z-10">
            {tab.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-[11px] font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate tab: Show Share a Lead button instead of referral link */}
      {tab.id === "corporate" ? (
        <>
          {/* Share a Lead Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl bg-[#007BFF] hover:bg-[#0056D2] text-white font-semibold transition-colors mb-4"
            onClick={onOpenShareLead}
          >
            Share a Lead
          </motion.button>
          
          {/* Email text */}
          <p className="text-center text-slate-600 text-sm">
            You can also email us at{" "}
            <a 
              href="mailto:provider@mantra.care" 
              className="text-[#007BFF] hover:text-[#0056D2] transition-colors"
            >
              provider@mantra.care
            </a>{" "}
            to take this forward
          </p>
        </>
      ) : (
        <>
          {/* ── Referral Link ── */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-700 text-sm">Your Referral Link</span>
              {/* Service dropdown */}
              <button
                onClick={() => setDropOpen(o => !o)}
                className="flex items-center gap-1.5 text-sm text-[#007BFF] hover:text-[#0056D2] transition-colors"
              >
                <span className="font-medium">Select Service</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 min-w-[130px] overflow-hidden"
                  >
                    {SERVICE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => { onServiceChange(opt); setDropOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${opt === service ? "bg-[#F1F5F9] text-[#1E293B] font-medium" : "text-[#64748B] hover:bg-[#F8FAFC]"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 overflow-hidden">
                <span className="text-slate-400 text-sm font-mono truncate block">https://mantracare.com/ref/usr</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onCopy}
                className={`w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 transition-colors ${
                  copied ? "bg-[#007BFF]" : "bg-[#007BFF] hover:bg-[#0056D2]"
                }`}
              >
                {copied ? <Check size={18} className="text-white" /> : <Copy size={18} className="text-white" />}
              </motion.button>
            </div>
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-[12px] text-[#0D9488] mt-1.5"
                >
                  Link copied to clipboard!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Share Via ── */}
          <div>
            <p className="text-slate-700 text-sm mb-3">Share Via</p>
            <div className="flex items-center gap-3">
              {SHARE_ITEMS.map(s => (
                <motion.button
                  key={s.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={s.label}
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${s.bg} ${s.fg} shadow-sm transition-opacity hover:opacity-90`}
                >
                  <s.icon size={18} />
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ── Wallet + Transactions panel ── */
function WalletPanel() {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push("/billing", { state: { activeTab: "mantra-coins" } });
  };

  return (
    <div>
      {/* Balance card — purple/dark gradient */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #312e81 0%, #4c1d95 55%, #6d28d9 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 left-4 w-20 h-20 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Wallet size={14} className="text-white" />
            </div>
            <span className="text-white/70 text-xs tracking-wide">Your Referral Reward</span>
          </div>

          <div className="flex items-end gap-3 mb-1">
            <span className="text-white text-3xl font-bold tracking-tight">₹12,847</span>
            <div className="flex items-center gap-1 bg-white/15 rounded-full px-2 py-0.5 mb-1">
              <TrendingUp size={12} className="text-white/80" />
              <span className="text-white/80 text-xs">+5.2%</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-white/50 text-xs leading-relaxed">
              Referral rewards can be used to purchase any Mantra program.
            </p>
            <button 
              onClick={handleViewDetails}
              className="text-white/90 text-xs hover:text-white transition-colors flex items-center gap-1 flex-shrink-0 ml-2"
            >
              View Details
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main page ── */
export function ReferEarnPage() {
  const [activeTab, setActiveTab] = useState<TabId>("client");
  const [copied, setCopied]       = useState(false);
  const [service, setService]     = useState("Therapy");
  const [showShareLeadModal, setShowShareLeadModal] = useState(false);

  const currentTab = TABS.find(t => t.id === activeTab)!;

  const handleCopy = () => {
    navigator.clipboard.writeText("https://mantracare.com/ref/user123").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenShareLead = () => {
    setShowShareLeadModal(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
              <Gift size={18} className="text-[#1E293B]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-slate-900">Invite a Friend</h1>
              <p className="text-slate-500 text-sm mt-0.5">Refer providers & clients to MantraCare</p>
            </div>
          </motion.div>

          {/* Tabs — underline style */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="flex border-b border-slate-200 mb-6"
          >
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#1E293B]"
                    : "text-[#64748B] hover:text-[#020817]"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007BFF] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Two-column layout */}
          <div className="space-y-5">

            {/* Refer card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <AnimatePresence mode="wait">
                <ReferPanel
                  key={activeTab}
                  tab={currentTab}
                  copied={copied}
                  onCopy={handleCopy}
                  service={service}
                  onServiceChange={setService}
                  onOpenShareLead={handleOpenShareLead}
                />
              </AnimatePresence>
            </motion.div>

            {/* Wallet + transactions */}
            <WalletPanel />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Referral rewards are subject to MantraCare's terms and conditions
          </p>
        </main>
      </div>

      {/* Share Lead Modal */}
      <ShareLeadModal 
        isOpen={showShareLeadModal} 
        onClose={() => setShowShareLeadModal(false)} 
      />
    </div>
  );
}
