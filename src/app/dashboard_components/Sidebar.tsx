import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, MessageSquare, Calendar, CheckSquare, BarChart3, Receipt, CreditCard, Gift, Lightbulb, HelpCircle, Menu, UserCircle, LogOut, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar() {
  const router = useRouter();
  const userString = typeof window !== 'undefined' ? localStorage.getItem("mantraUser") : null;
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || "User";

  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mainNavItems = [
    { icon: Home,          label: "Dashboard",     path: "/"    },
    { icon: Layout,        label: "Activity Hub",   path: "/hub"  },
    { icon: MessageSquare, label: "OCD Care Team",  path: "/care-team"    },
    { icon: Calendar,      label: "Appointments",   path: "/appointments" },
    { icon: CheckSquare,   label: "Daily Tasks",    path: "/tasks"        },
    { icon: BarChart3,     label: "Insights",        path: "/insights"     },
  ];


  const handleLogout = () => {
    localStorage.removeItem("mantraUser");
    router.push("/");
  };

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="hidden md:flex bg-[#0f1729] border-r border-slate-700/50 flex-col h-screen overflow-y-auto overflow-x-hidden sticky top-0 flex-shrink-0 z-50"
    >
      {/* Logo + Hamburger */}
      <div className="p-3 border-b border-slate-700/50 flex items-center gap-2 min-h-[60px]">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCollapsed((c) => !c)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex-shrink-0 ${collapsed ? "mx-auto" : ""}`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={18} />
        </motion.button>

        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-lg whitespace-nowrap">MantraCare</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-0.5">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
              active={false} // Logic simplified for Next.js
              onClick={() => router.push(item.path)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-slate-700/50 mx-2"></div>

        {/* Invite Friend */}
        <NavItem
          icon={Gift}
          label="Invite a Friend"
          collapsed={collapsed}
          active={false}
          onClick={() => router.push("/refer")}
          colorClass="text-emerald-400 hover:bg-emerald-900/40 hover:text-emerald-300"
        />

        {/* Divider */}
        <div className="my-3 border-t border-slate-700/50 mx-2"></div>

        {/* Share Feedback & Support */}
        <div className="space-y-0.5">
          <NavItem
            icon={Lightbulb}
            label="Share Feedback"
            collapsed={collapsed}
            active={false}
            onClick={() => router.push("/feedback")}
          />
          <NavItem
            icon={HelpCircle}
            label="Support"
            collapsed={collapsed}
            active={false}
            onClick={() => router.push("/support")}
          />
        </div>
      </nav>

      {/* Bottom Section - User Profile */}
      <div className="p-2 border-t border-slate-700/50">
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full flex items-center rounded-xl transition-all py-2 ${collapsed ? "justify-center px-0" : "gap-3 px-3"} text-slate-400 hover:bg-slate-800 hover:text-white`}
          >
            <div className="w-8 h-8 bg-[#2D9CDB] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  {userName}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Dropdown Content */}
          <AnimatePresence>
            {dropdownOpen && !collapsed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full left-2 right-2 mb-2 bg-[#1a2744] border border-slate-700/50 rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-left"
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/profile");
                  }}
                >
                  <UserCircle size={18} />
                  <span className="text-sm font-medium">Profile</span>
                </button>
                <div className="border-t border-slate-700/50"></div>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors text-left"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
  colorClass?: string;
}

function NavItem({ icon: Icon, label, collapsed, active, onClick, colorClass }: NavItemProps) {
  return (
    <div className="relative group">
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        className={`w-full flex items-center rounded-xl transition-all py-2.5 ${
          collapsed ? "justify-center px-0" : "gap-3 px-3"
        } ${
          colorClass
            ? colorClass
            : active
            ? "bg-[#00c0ff] text-white"
            : "text-slate-400 hover:bg-[#00c0ff] hover:text-white"
        }`}
      >
        <Icon size={20} className="flex-shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className={`text-sm whitespace-nowrap overflow-hidden ${active ? "font-semibold" : ""}`}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
        </div>
      )}
    </div>
  );
}
