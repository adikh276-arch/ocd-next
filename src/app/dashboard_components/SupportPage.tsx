import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Mail, Phone, Ticket, Building2, RefreshCcw,
  Link2, MessageCircle, X, Send, Clock, CheckCircle2, ExternalLink, ChevronDown,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

function TicketModal({ onClose }: { onClose: () => void }) {
  const [subject, setSubject]     = useState("");
  const [category, setCategory]   = useState("General");
  const [desc, setDesc]           = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [catOpen, setCatOpen]     = useState(false);
  const CATS = ["General", "Billing", "Appointments", "Technical", "Therapy", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !desc.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[480px] overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f3faff] flex items-center justify-center">
              <Ticket size={16} className="text-[#043570]" />
            </div>
            <span className="text-slate-800 font-medium">Raise Support Ticket</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-10 px-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 rounded-full bg-[#f3faff] flex items-center justify-center mb-4"
            >
              <CheckCircle2 size={32} className="text-[#00c0ff]" />
            </motion.div>
            <p className="text-slate-900 mb-1.5">Ticket Submitted!</p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">Our support team will get back to you within 24 hours. Check your email for a confirmation.</p>
            <div className="flex items-center gap-1.5 mt-4 bg-[#f3faff] rounded-xl px-4 py-2">
              <Clock size={13} className="text-[#043570]" />
              <span className="text-[#043570] text-xs">Ticket #MC-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-[#043570] hover:bg-[#00c0ff] text-white rounded-xl text-sm transition-colors">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="relative">
              <label className="block text-xs text-slate-500 mb-1.5">Category</label>
              <button type="button" onClick={() => setCatOpen(o => !o)}
                className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {category}
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }}
                    className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    {CATS.map(c => (
                      <button key={c} type="button" onClick={() => { setCategory(c); setCatOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${c === category ? "bg-[#f3faff] text-[#043570] font-medium" : "text-[#64748B] hover:bg-[#F8FAFC]"}`}
                      >{c}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Subject <span className="text-[#64748B]">*</span></label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief summary of your issue"
                className="w-full border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-sm text-[#020817] placeholder-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#f3faff] focus:border-[#043570] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Description <span className="text-[#64748B]">*</span></label>
              <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe your issue in detail..."
                className="w-full border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-sm text-[#020817] placeholder-[#E2E8F0] bg-[#F8FAFC] resize-none focus:outline-none focus:ring-2 focus:ring-[#f3faff] focus:border-[#043570] transition-all"
              />
            </div>
            <motion.button type="submit" disabled={!subject.trim() || !desc.trim() || loading}
              whileHover={subject && desc ? { scale: 1.02 } : {}} whileTap={subject && desc ? { scale: 0.97 } : {}}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                subject.trim() && desc.trim() ? "bg-[#043570] hover:bg-[#00c0ff] text-white shadow-sm" : "bg-[#F8FAFC] text-[#E2E8F0] cursor-not-allowed"
              }`}
            >
              {loading ? (<><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Submitting...</>) : (<><Send size={14} />Submit Ticket</>)}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function ChatWidget({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "agent"; text: string }[]>([
    { from: "agent", text: "Hi there! 👋 I'm from the MantraCare support team. How can I help you today?" },
  ]);
  const [thinking, setThinking] = useState(false);
  const REPLIES = [
    "Thanks for reaching out! Let me look into that for you.",
    "I understand. Can you share a bit more detail so I can assist you better?",
    "Great question! Our team will follow up via email within 24 hours.",
    "I've flagged this for our billing team — you'll hear back shortly.",
  ];
  const send = () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    setMessages(m => [...m, { from: "user", text: msg }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(m => [...m, { from: "agent", text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
    }, 1200);
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[360px] flex flex-col overflow-hidden"
        style={{ height: 480 }}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#043570] to-[#00c0ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle size={16} className="text-white" /></div>
            <div>
              <p className="text-white text-sm font-medium">MantraCare Support</p>
              <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /><span className="text-white/80 text-[10px]">Online now</span></div>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"><X size={14} className="text-white" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${m.from === "user" ? "bg-[#043570] text-white rounded-br-sm" : "bg-white border border-[#E2E8F0] text-[#64748B] rounded-bl-sm shadow-sm"}`}>{m.text}</div>
            </motion.div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">{[0,1,2].map(i => (<motion.span key={i} animate={{ y: [0,-4,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} className="w-1.5 h-1.5 rounded-full bg-slate-400 block" />))}</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..."
            className="flex-1 border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#020817] placeholder-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#f3faff] focus:border-[#043570] transition-all"
          />
          <motion.button whileTap={{ scale: 0.9 }} onClick={send} disabled={!input.trim()}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${input.trim() ? "bg-[#043570] hover:bg-[#00c0ff] text-white" : "bg-[#F8FAFC] text-[#E2E8F0]"}`}
          ><Send size={15} /></motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SupportPage() {
  const [showTicket, setShowTicket] = useState(false);
  const [showChat, setShowChat]     = useState(false);

  const cards = [
    {
      icon: HelpCircle, iconBg: "bg-[#f3faff]", iconColor: "text-[#043570]",
      title: "Support", email: "support@mantra.care", phone: "+1 (431) 304-6171",
      action: (
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={() => window.open('https://content.mantracare.com/support-ticket/', '_blank')}
          className="flex items-center gap-2 bg-[#043570] hover:bg-[#00c0ff] text-white text-sm px-5 py-2 rounded-xl transition-colors shadow-sm"
        ><Ticket size={15} />Raise Support Ticket</motion.button>
      ),
    },
    {
      icon: Building2, iconBg: "bg-[#f3faff]", iconColor: "text-[#043570]",
      title: "Corporate Sales Enquiries", email: "clients@mantra.care", phone: "+1 (332) 331-8626", action: null,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-10 pt-[72px] md:pt-10">

          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#F1F5F9] rounded-md flex items-center justify-center flex-shrink-0">
              <HelpCircle size={20} className="text-[#1E293B]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl text-[#0f172b] font-medium mb-1">Support</h1>
              <p className="text-sm text-[#62748e] font-normal">Get help from the MantraCare team</p>
            </div>
          </motion.div>

          <div className="space-y-4 max-w-[700px]">
            {cards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.07 }}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}><card.icon size={18} className={card.iconColor} /></div>
                  <span className="text-slate-800 font-medium">{card.title}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-5">
                    <a href={`mailto:${card.email}`} className="flex items-center gap-2 text-[#043570] hover:text-[#00c0ff] transition-colors group">
                      <Mail size={15} /><span className="text-sm group-hover:underline">{card.email}</span>
                    </a>
                    <a href={`tel:${card.phone.replace(/\s|\(|\)|-/g, "")}`} className="flex items-center gap-2 text-[#043570] hover:text-[#00c0ff] transition-colors group">
                      <Phone size={15} /><span className="text-sm group-hover:underline">{card.phone}</span>
                    </a>
                  </div>
                  {card.action && <div>{card.action}</div>}
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.14 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#f3faff] flex items-center justify-center"><RefreshCcw size={17} className="text-[#043570]" /></div>
                <span className="text-slate-800 font-medium">Refunds</span>
              </div>
              <a href="https://content.mantracare.com/refund-policy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#043570] hover:text-[#00c0ff] transition-colors group">
                <Link2 size={14} /><span className="text-sm group-hover:underline">See Refund Policy</span>
                <ExternalLink size={12} className="text-[#E2E8F0] group-hover:text-[#043570] transition-colors" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "FAQs",             desc: "Common questions answered", icon: HelpCircle,   color: "text-[#043570]",  bg: "bg-[#f3faff]", link: "https://content.mantracare.com/faq/" },
                { label: "Response Time",    desc: "Usually within 24 hours",   icon: Clock,        color: "text-[#043570]",  bg: "bg-[#f3faff]" },
                { label: "Priority Support", desc: "For premium plan members",  icon: CheckCircle2, color: "text-[#043570]",  bg: "bg-[#f3faff]" },
              ].map((tile, i) => {
                const content = (
                  <>
                    <div className={`w-8 h-8 rounded-xl ${tile.bg} flex items-center justify-center flex-shrink-0`}><tile.icon size={16} className={tile.color} /></div>
                    <div>
                      <p className="text-slate-800 text-sm font-medium">{tile.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{tile.desc}</p>
                    </div>
                  </>
                );

                return (
                  <motion.div key={tile.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.24 + i * 0.05 }}>
                    {tile.link ? (
                      <a
                        href={tile.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow cursor-pointer block"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow cursor-default">
                        {content}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.28 }} className="flex justify-center pt-2">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => window.open('https://crm.mantracare.com/online/mc', '_blank')}
                className="flex items-center gap-2.5 bg-[#043570] hover:bg-[#00c0ff] text-white px-8 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <MessageCircle size={17} />Chat With Us
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>

      <AnimatePresence>{showTicket && <TicketModal onClose={() => setShowTicket(false)} />}</AnimatePresence>
      <AnimatePresence>{showChat && <ChatWidget onClose={() => setShowChat(false)} />}</AnimatePresence>
    </div>
  );
}
