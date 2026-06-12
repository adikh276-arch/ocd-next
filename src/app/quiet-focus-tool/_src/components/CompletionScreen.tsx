import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Home, ArrowRight, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CompletionScreenProps {
  title?: string;
  message?: string;
  onComplete?: () => void;
}

const CompletionScreen = ({
  title,
  message,
  onComplete,
}: CompletionScreenProps) => {
    const { t } = useTranslation("quiet-focus-tool");
      const navigate = useNavigate();
  const [showCompletion, setShowCompletion] = useState(false);

  const handleReturn = () => {
    if (onComplete) {
      onComplete();
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col items-center justify-center p-6 font-sans text-slate-900 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-therapeutic shadow-2xl shadow-primary/5 border-white/40 backdrop-blur-sm p-8 md:p-12 w-full max-w-sm flex flex-col items-center text-center z-10"
      >
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-emerald-100/50 animate-in zoom-in duration-700">
           <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight italic">
          {title || 'Practice Complete'}
        </h1>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-10 italic">
          {message || "You gave yourself the gift of stillness. That takes real strength. Be proud of your focus today."}
        </p>

        <div className="w-full space-y-4">
           <button
             onClick={() => setShowCompletion(true)}
             className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] flex items-center justify-center gap-2 group"
           >
             {t("finish_practice")}<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>

           <button
             onClick={handleReturn}
             className="w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-widest border border-slate-100 transition-all hover:bg-slate-100 flex items-center justify-center gap-2"
           >
             <Home size={14} />
             {t("return_home")}</button>
        </div>
      </motion.div>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🧘"
        title={title || 'Well done'}
        description={message || "You took time for yourself. That matters. Share your focus session to encourage others to take a moment of quiet."}
        onStartOver={handleReturn}
        onDone={() => {
          if (window.parent !== window) {
            window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
          } else {
            window.location.href = 'https://web.mantracare.com';
          }
        }}
        showHome={false}
      />
    </div>
  );
};

export default CompletionScreen;
