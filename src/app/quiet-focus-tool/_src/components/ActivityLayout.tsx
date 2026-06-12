import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ActivityLayoutProps {
  children: React.ReactNode;
  title: string;
  slug: string;
  subtitle?: string;
  bgColorClass?: string;
  showBackButton?: boolean;
  progress?: number;
}

const ActivityLayout = ({
  children,
  title,
  slug,
  subtitle,
  bgColorClass = "bg-gradient-therapeutic",
  showBackButton = true,
  progress,
}: ActivityLayoutProps) => {
    const { t } = useTranslation("quiet-focus-tool");
      const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${bgColorClass} relative flex flex-col font-sans text-slate-900 overflow-x-hidden scrollbar-hide`}>
      {/* Global Exit Button */}
      <button 
        onClick={() => {
          if (window.parent !== window) {
            window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
          } else {
            window.location.href = 'https://web.mantracare.com';
          }
        }}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-50 p-3 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-primary shadow-sm transition-all border border-slate-100/50"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="pt-20 pb-6 px-6 flex flex-col gap-4 max-w-lg mx-auto w-full z-20">
        <div className="flex-1 mx-4">
           {progress !== undefined && (
             <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full bg-primary shadow-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
             </div>
           )}
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-xs font-medium text-muted-foreground italic mt-0.5">{subtitle}</p>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ActivityLayout;
