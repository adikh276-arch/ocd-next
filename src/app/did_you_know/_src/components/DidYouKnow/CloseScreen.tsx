import { motion } from "framer-motion";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CloseScreenProps {
  onReadAgain: () => void;
  onDone: () => void;
}

const CloseScreen = ({ onReadAgain, onDone }: CloseScreenProps) => {
    const { t } = useTranslation("did_you_know");
      const [showCompletion, setShowCompletion] = useState(false);

  const handleDone = () => {
    setShowCompletion(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen px-6 py-12"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onReadAgain}
          className="flex-1 h-14 rounded-2xl text-[15px] font-bold bg-slate-50 border-2 border-slate-100 text-slate-600 hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          {t("read_again")}</button>
        <button
          onClick={handleDone}
          className="flex-1 h-14 rounded-2xl text-[15px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
        >
          {t("im_done")}</button>
      </div>
      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🧠"
        title={t("now_you_know")}
        description={t("knowledge_is_the_first_step_share_this_insight_to_")}
        onStartOver={onReadAgain}
        startOverText={t("read_again")}
      
        showHome={false}/>
    </motion.div>
  );
};

export default CloseScreen;
