import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Globe,
  Clock,
  MapPin,
  Camera,
  Save,
  CheckCircle2,
  ChevronDown,
  Phone,
  Calendar,
  Shield,
  Bell,
  LogOut,
  Pencil,
  X,
  Ticket,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

// ─── Static options ─────────────────────────────────────────────────────────
const GENDERS   = ["Male", "Female", "Non-binary", "Prefer not to say"];
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati"];
const COUNTRIES = ["India", "United States", "United Kingdom", "Canada", "Australia", "Singapore"];
const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
];

// ─── Field row helper ────────────────────────────────────────────────────────
function FieldGroup({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-slate-500 uppercase tracking-wide">
        {label}{required && <span className="text-[#64748B] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function InputField({
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  readOnly,
}: {
  icon?: React.ElementType;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div className={`relative flex items-center border rounded-xl transition-all ${
      disabled || readOnly
        ? "bg-slate-50 border-slate-200"
        : "bg-[#F8FAFC] border-slate-200 focus-within:border-[#043570] focus-within:ring-2 focus-within:ring-[#f3faff]"
    }`}>
      {Icon && <Icon size={14} className="absolute left-3 text-slate-400 flex-shrink-0" />}
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full py-2.5 text-[13px] text-slate-800 bg-transparent focus:outline-none ${
          Icon ? "pl-9 pr-3" : "px-3"
        } ${disabled || readOnly ? "text-slate-400 cursor-not-allowed" : ""} placeholder:text-slate-400`}
      />
      {(disabled || readOnly) && (
        <Lock size={13} className="absolute right-3 text-slate-300" />
      )}
    </div>
  );
}

function SelectField({
  icon: Icon,
  value,
  onChange,
  options,
}: {
  icon?: React.ElementType;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative flex items-center border border-[#E2ECF5] rounded-xl bg-white focus-within:border-[#043570] focus-within:ring-2 focus-within:ring-[#f3faff] transition-all">
      {Icon && <Icon size={14} className="absolute left-3 text-slate-400" />}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full appearance-none py-2.5 text-[13px] text-slate-800 bg-transparent focus:outline-none ${
          Icon ? "pl-9 pr-8" : "px-3 pr-8"
        }`}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 text-slate-400 pointer-events-none" />
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export function ProfilePage() {
  const router = useRouter();

  // Load user from localStorage
  const userString = localStorage.getItem("mantraUser");
  const storedUser = userString ? JSON.parse(userString) : {};

  // Form state
  const [name, setName]           = useState(storedUser.name || "Himanshu Jain");
  const [email]                   = useState(storedUser.email || "himanshu@mailinator.com");
  const [phone, setPhone]         = useState(storedUser.phone || "+91 98765 43210");
  const [gender, setGender]       = useState(storedUser.gender || "Male");
  const [dob, setDob]             = useState(storedUser.dob || "1987-01-08");
  const [language, setLanguage]   = useState(storedUser.language || "English");
  const [country, setCountry]     = useState(storedUser.country || "India");
  const [timezone, setTimezone]   = useState(storedUser.timezone || "Asia/Kolkata");

  // Avatar state
  const [avatar, setAvatar]       = useState<string | null>(storedUser.avatar || null);
  const fileRef                   = useRef<HTMLInputElement>(null);

  // UI state
  const [saved, setSaved]         = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "notifications">("personal");
  const [editMode, setEditMode]   = useState(false);

  // Invite code state
  const [inviteCode, setInviteCode]       = useState("");
  const [inviteStatus, setInviteStatus]   = useState<null | "success" | "error">(null);
  const [inviteMsg, setInviteMsg]         = useState("");

  const handleInviteSubmit = () => {
    if (!inviteCode.trim()) {
      setInviteStatus("error");
      setInviteMsg("Please enter an invite code.");
      return;
    }
    // Mock validation — accept any 6-char alphanumeric code
    if (/^[A-Za-z0-9]{4,12}$/.test(inviteCode.trim())) {
      setInviteStatus("success");
      setInviteMsg("You've successfully joined the Employee Wellness Program!");
      setInviteCode("");
    } else {
      setInviteStatus("error");
      setInviteMsg("Invalid invite code. Please check with your organisation.");
    }
    setTimeout(() => setInviteStatus(null), 4000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updated = { ...storedUser, name, phone, gender, dob, language, country, timezone, avatar };
    localStorage.setItem("mantraUser", JSON.stringify(updated));
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("mantraUser");
    router.push("/");
  };

  const initials = name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tabs = [
    { id: "personal",      label: "Personal Info",  icon: User   },
    { id: "security",      label: "Security",        icon: Shield },
    { id: "notifications", label: "Notifications",   icon: Bell   },
  ] as const;

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
            transition={{ duration: 0.35 }}
            className="flex items-start justify-between mb-6"
          >
            <div>
              <h1 className="text-xl md:text-2xl text-[#020817]">Profile Settings</h1>
              <p className="text-[#64748B] text-sm mt-0.5">Manage your personal information and preferences</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[12px] text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-100 hover:border-red-200 px-3 py-2 rounded-xl transition-colors"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-5">

            {/* ── Left Column: Avatar Card ── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="lg:w-64 flex-shrink-0 flex flex-col gap-3"
            >
              {/* Avatar card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-[#043570] flex items-center justify-center">
                    {avatar ? (
                      <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xl font-bold">{initials}</span>
                    )}
                  </div>
                  {/* Camera overlay */}
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera size={18} className="text-white" />
                  </button>
                  {/* Online dot */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00c0ff] border-2 border-white rounded-full" />
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

                <div className="text-center">
                  <p className="text-slate-800 text-[14px]">{name}</p>
                </div>

                <div className="w-full flex gap-2">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex-1 py-2 rounded-lg bg-[#043570] hover:bg-[#00c0ff] text-white text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Camera size={12} />
                    Upload
                  </button>

                  {avatar && (
                    <button
                      onClick={() => setAvatar(null)}
                      className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X size={12} />
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Quick stats */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 space-y-2.5">
                <p className="text-[10px] text-[#64748B] uppercase tracking-wide font-medium">Account Info</p>
                {[
                  { icon: Mail,   label: "Email",    value: email,   mono: true },
                  { icon: Globe,  label: "Country",  value: country },
                  { icon: Clock,  label: "Timezone", value: timezone },
                  { icon: MapPin, label: "Language", value: language },
                ].map(row => (
                  <div key={row.label} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">
                      <row.icon size={12} className="text-[#64748B]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#94A3B8] uppercase tracking-wide">{row.label}</p>
                      <p className={`text-[11px] text-[#020817] truncate ${row.mono ? "font-mono" : ""}`}>{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Invite Code Box ── */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4">
                {/* Header */}
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">
                    <Building2 size={14} className="text-[#64748B]" />
                  </div>
                  <div>
                    <p className="text-[#020817] text-[13px] font-medium">Got a corporate invite code?</p>
                    <p className="text-[#64748B] text-[11px] mt-0.5">Enter your organization's code.</p>
                  </div>
                </div>

                {/* Input */}
                <input
                  type="text"
                  value={inviteCode}
                  onChange={e => { setInviteCode(e.target.value.toUpperCase()); setInviteStatus(null); }}
                  placeholder="Enter invite code"
                  maxLength={12}
                  onKeyDown={e => e.key === "Enter" && handleInviteSubmit()}
                  className="w-full px-3 py-2 text-[12px] border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:bg-white transition-all placeholder:text-[#CBD5E1] tracking-wide font-mono text-[#020817] mb-2.5"
                />

                {/* Submit button */}
                <button
                  onClick={handleInviteSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-all shadow-sm"
                >
                  Submit
                  <ArrowRight size={13} />
                </button>

                {/* Feedback message */}
                <AnimatePresence>
                  {inviteStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`mt-2.5 flex items-center gap-2 text-[11px] font-medium px-3 py-2 rounded-lg ${
                        inviteStatus === "success"
                          ? "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]"
                          : "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]"
                      }`}
                    >
                      {inviteStatus === "success"
                        ? <CheckCircle2 size={13} className="flex-shrink-0" />
                        : <X size={13} className="flex-shrink-0" />
                      }
                      {inviteMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── Right Column: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex-1 min-w-0"
            >
              {/* Tabs */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                <div className="flex border-b border-[#E2E8F0]">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] transition-colors relative ${
                        activeTab === tab.id
                          ? "text-[#2563EB] bg-[#DBEAFE]"
                          : "text-[#64748B] hover:text-[#020817] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <tab.icon size={14} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "personal" && (
                    <motion.div
                      key="personal"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-5"
                    >
                      {/* Section header */}
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h2 className="text-[#020817]">Profile Information</h2>
                          <p className="text-[#64748B] text-[12px] mt-0.5">Update your account details and preferences</p>
                        </div>
                        <button
                          onClick={() => setEditMode(e => !e)}
                          className={`flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-xl border transition-colors ${
                            editMode
                              ? "border-red-200 text-red-500 hover:bg-red-50"
                              : "border-[#E2E8F0] text-[#2563EB] hover:bg-[#DBEAFE]"
                          }`}
                        >
                          {editMode ? <><X size={12} /> Cancel</> : <><Pencil size={12} /> Edit</>}
                        </button>
                      </div>

                      {/* ── Personal Information ── */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-5 h-5 rounded-md bg-[#F1F5F9] flex items-center justify-center">
                            <User size={11} className="text-[#1E293B]" />
                          </div>
                          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Personal Information</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FieldGroup label="Name" required>
                            <InputField
                              icon={User}
                              value={name}
                              onChange={editMode ? setName : undefined}
                              placeholder="Your full name"
                              readOnly={!editMode}
                            />
                          </FieldGroup>

                          <FieldGroup label="Email">
                            <InputField
                              icon={Mail}
                              value={email}
                              readOnly
                              disabled
                            />
                          </FieldGroup>

                          <FieldGroup label="Phone">
                            <InputField
                              icon={Phone}
                              value={phone}
                              onChange={editMode ? setPhone : undefined}
                              placeholder="+91 00000 00000"
                              readOnly={!editMode}
                            />
                          </FieldGroup>

                          <FieldGroup label="Gender">
                            {editMode ? (
                              <SelectField
                                icon={User}
                                value={gender}
                                onChange={setGender}
                                options={GENDERS}
                              />
                            ) : (
                              <InputField icon={User} value={gender} readOnly />
                            )}
                          </FieldGroup>

                          <FieldGroup label="Date of Birth">
                            <InputField
                              icon={Calendar}
                              value={dob}
                              onChange={editMode ? setDob : undefined}
                              type="date"
                              readOnly={!editMode}
                            />
                          </FieldGroup>
                        </div>
                      </div>

                      {/* ── Preferences ── */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-5 h-5 rounded-md bg-[#F1F5F9] flex items-center justify-center">
                            <Globe size={11} className="text-[#1E293B]" />
                          </div>
                          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Preferences</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FieldGroup label="Language">
                            {editMode ? (
                              <SelectField
                                icon={Globe}
                                value={language}
                                onChange={setLanguage}
                                options={LANGUAGES}
                              />
                            ) : (
                              <InputField icon={Globe} value={language} readOnly />
                            )}
                          </FieldGroup>

                          <FieldGroup label="Country">
                            {editMode ? (
                              <SelectField
                                icon={MapPin}
                                value={country}
                                onChange={setCountry}
                                options={COUNTRIES}
                              />
                            ) : (
                              <InputField icon={MapPin} value={country} readOnly />
                            )}
                          </FieldGroup>

                          <FieldGroup label="Timezone">
                            {editMode ? (
                              <SelectField
                                icon={Clock}
                                value={timezone}
                                onChange={setTimezone}
                                options={TIMEZONES}
                              />
                            ) : (
                              <InputField icon={Clock} value={timezone} readOnly />
                            )}
                          </FieldGroup>
                        </div>
                      </div>

                      {/* Save / Success */}
                      <AnimatePresence>
                        {editMode && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0]"
                          >
                            <button
                              onClick={handleSave}
                              className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12px] font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                            >
                              <Save size={13} />
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditMode(false)}
                              className="text-[12px] text-[#64748B] hover:text-[#020817] px-4 py-2.5 rounded-xl hover:bg-[#F1F5F9] transition-colors"
                            >
                              Discard
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Success toast */}
                      <AnimatePresence>
                        {saved && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#22C55E] text-white text-[12px] font-medium px-4 py-3 rounded-2xl shadow-xl"
                          >
                            <CheckCircle2 size={15} />
                            Profile updated successfully!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {activeTab === "security" && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-5"
                    >
                      <div className="mb-5">
                        <h2 className="text-[#020817] font-semibold">Security Settings</h2>
                        <p className="text-[#64748B] text-[12px] mt-0.5">Manage your password and account security</p>
                      </div>

                      <div className="space-y-4">
                        {/* Change password */}
                        <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
                                <Lock size={14} className="text-[#1E293B]" />
                              </div>
                              <div>
                                <p className="text-[13px] text-[#020817]">Password</p>
                                <p className="text-[11px] text-[#64748B]">Last changed 3 months ago</p>
                              </div>
                            </div>
                            <button className="text-[12px] text-[#22C55E] hover:text-[#1E293B] border border-[#E2E8F0] hover:border-[#22C55E] hover:bg-[#F1F5F9] px-3 py-1.5 rounded-xl transition-colors">
                              Change
                            </button>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <label className="text-[11px] text-[#64748B] mb-1 block">Current Password</label>
                              <input type="password" placeholder="••••••••" className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2 text-[13px] text-[#020817] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1F5F9] focus:border-[#22C55E] placeholder:text-[#E2E8F0]" />
                            </div>
                            <div className="flex-1">
                              <label className="text-[11px] text-[#64748B] mb-1 block">New Password</label>
                              <input type="password" placeholder="••••••••" className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2 text-[13px] text-[#020817] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1F5F9] focus:border-[#22C55E] placeholder:text-[#E2E8F0]" />
                            </div>
                          </div>
                        </div>

                        {/* 2FA */}
                        <div className="border border-slate-200 rounded-2xl p-4 bg-white flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
                              <Shield size={14} className="text-[#22C55E]" />
                            </div>
                            <div>
                              <p className="text-[13px] text-[#020817]">Two-Factor Authentication</p>
                              <p className="text-[11px] text-[#64748B]">Add an extra layer of security</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#64748B]">Off</span>
                            <div className="w-10 h-5 rounded-full bg-slate-200 relative cursor-pointer hover:bg-slate-300 transition-colors">
                              <div className="w-4 h-4 rounded-full bg-white shadow absolute top-0.5 left-0.5 transition-all" />
                            </div>
                          </div>
                        </div>

                        {/* Active sessions */}
                        <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
                              <Globe size={14} className="text-[#1E293B]" />
                            </div>
                            <div>
                              <p className="text-[13px] text-[#020817]">Active Sessions</p>
                              <p className="text-[11px] text-[#64748B]">Devices currently signed in</p>
                            </div>
                          </div>
                          {[
                            { device: "Chrome · macOS", location: "Mumbai, India", time: "Now", current: true },
                            { device: "Safari · iPhone 15", location: "Mumbai, India", time: "2h ago", current: false },
                          ].map((s, i) => (
                            <div key={i} className={`flex items-center justify-between py-2.5 ${i < 1 ? "border-b border-slate-100" : ""}`}>
                              <div>
                                <p className="text-[12px] text-[#020817] flex items-center gap-1.5">
                                  {s.device}
                                  {s.current && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#2563EB]">Current</span>}
                                </p>
                                <p className="text-[11px] text-[#64748B]">{s.location} · {s.time}</p>
                              </div>
                              {!s.current && (
                                <button className="text-[11px] text-[#64748B] hover:text-[#1E293B] font-medium hover:underline transition-colors">
                                  Revoke
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Delete Account */}
                        <div className="border border-red-200 rounded-2xl p-4 bg-red-50/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                                <X size={14} className="text-red-600" />
                              </div>
                              <div>
                                <p className="text-[13px] text-red-900 font-medium">Delete Account</p>
                                <p className="text-[11px] text-red-600">Permanently delete your account and all data</p>
                              </div>
                            </div>
                            <button 
                              className="text-[12px] text-red-600 hover:text-white hover:bg-red-600 border border-red-300 px-3 py-1.5 rounded-xl transition-colors font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "notifications" && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-5"
                    >
                      <div className="mb-5">
                        <h2 className="text-[#020817]">Notification Preferences</h2>
                        <p className="text-[#64748B] text-[12px] mt-0.5">Choose what updates you'd like to receive</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          { label: "Appointment Reminders",   desc: "Get notified before your sessions",          on: true  },
                          { label: "Session Summaries",        desc: "Receive summaries after each session",       on: true  },
                          { label: "Plan Expiry Alerts",       desc: "Alerts when your subscription is expiring",  on: true  },
                          { label: "New Resources",            desc: "Updates on new self-care content",           on: false },
                          { label: "Promotional Offers",       desc: "Deals and discount notifications",           on: false },
                          { label: "Weekly Progress Reports",  desc: "Your weekly wellness summary",               on: true  },
                        ].map((item, i) => (
                          <NotifRow key={i} label={item.label} desc={item.desc} defaultOn={item.on} />
                        ))}
                      </div>

                      <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <p className="text-[12px] text-[#64748B]">Notification delivery via Email & Push</p>
                        <button className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12px] font-medium px-4 py-2 rounded-xl transition-colors w-full md:w-auto">
                          <Save size={12} />
                          Save Preferences
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Notification toggle row ─────────────────────────────────────────────────
function NotifRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between border border-[#E2E8F0] rounded-2xl px-4 py-3.5 hover:bg-[#F8FAFC] transition-colors bg-white">
      <div>
        <p className="text-[13px] text-[#020817]">{label}</p>
        <p className="text-[11px] text-[#64748B] mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? "bg-[#22C55E]" : "bg-[#E2E8F0]"}`}
      >
        <motion.div
          animate={{ x: on ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5"
        />
      </button>
    </div>
  );
}
