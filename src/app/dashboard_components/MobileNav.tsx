import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, MessageSquare, Calendar, CheckSquare, BarChart3, Menu, X, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { icon: Home,          label: "Home",          path: "/"    },
    { icon: Layout,        label: "Activity Hub",   path: "/hub"  },
    { icon: MessageSquare, label: "Care Team",      path: "/care-team"    },
    { icon: Calendar,      label: "Appointments",   path: "/appointments" },
    { icon: CheckSquare,   label: "Tasks",           path: "/tasks"        },
    { icon: BarChart3,     label: "Insights",        path: "/insights"     },
  ];

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f1729] border-b border-slate-700/50 flex items-center justify-between px-4 z-[100]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="text-white font-bold text-lg">MantraCare</span>
      </div>

      <button onClick={() => setIsOpen(true)} className="text-slate-400 p-2">
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0f1729] shadow-2xl z-[120] p-6"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsOpen(false)} className="text-slate-400 p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      router.push(item.path);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
