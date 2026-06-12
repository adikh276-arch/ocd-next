import { useState } from "react";
import { Leaf, Info, Play, ArrowRight, Waves, Sparkles, ArrowLeft } from "lucide-react";
import ThoughtStream from "@/app/thought_surfing/_src/components/ThoughtStream";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation("thought_surfing");
      const [showCompletion, setShowCompletion] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'practice'>('overview');
  
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, 
          activity_slug: 'thought_surfing',
          payload: { completed: true, date: new Date().toISOString() },
        }),
      });
      setShowCompletion(true);
    } catch (e) {
      console.error("Failed to log practice:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden font-sans selection:bg-primary/10">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-primary/4 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tl from-accent/8 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-md mx-auto mb-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (activeTab === 'practice') setActiveTab('overview');
              else window.history.back();
            }}
            className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card hover:shadow-sm transition-all active:scale-95 shrink-0 backdrop-blur-sm"
            aria-label={t("go_back")}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="shrink-0">
             <ActivityHistoryDrawer slug="thought_surfing" title={t("practice_history")} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mb-8 relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/30 to-primary/10 flex items-center justify-center shadow-sm">
            <Leaf className="text-primary" size={24} />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3 tracking-tight">
          {t("leaves_on_a_stream")}</h1>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-[280px] mx-auto">
          {t("a_visualization_practice_to_help_you_observe_thoug")}</p>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex bg-secondary/50 p-1.5 rounded-2xl mb-8 border border-border/40 backdrop-blur-sm">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Info size={14} />
              {t("guide")}</button>
           <button 
             onClick={() => setActiveTab('practice')}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'practice' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Play size={14} />
              {t("practice")}</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div 
               key="overview"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-6"
            >
              <div className="card-therapeutic">
                <div className="flex items-center gap-3 mb-4 text-primary">
                   <Waves size={18} />
                   <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">{t("the_process")}</h2>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed italic text-[14px]">
                  {t("imagine_you_are_sitting_by_a_gentle_stream_wheneve")}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  t("find_a_quiet_space"),
                  t("sit_comfortably"),
                  t("close_your_eyes"),
                  t("breathe_slowly")
                ].map((step, i) => (
                  <div key={i} className="card-therapeutic p-5 flex flex-col items-center text-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">0{i+1}</div>
                     <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{step}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('practice')}
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                 {t("start_practice")}<ArrowRight size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div 
               key="practice"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="flex-1 flex flex-col"
            >
              <div className="card-therapeutic flex-1 flex flex-col mb-6">
                <div className="text-center mb-8">
                   <h3 className="text-xl font-bold text-foreground tracking-tight font-heading">
                      {t("your_thought_stream")}</h3>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                      {t("release_thoughts_into_the_water")}</p>
                </div>
                <ThoughtStream />
              </div>

              <button
                onClick={handleComplete}
                disabled={saving}
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20 mb-6 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Complete Journey"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <StandardCompletionModal showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🍃"
        title={t("practice_complete")}
        description={t("each_time_you_let_a_leaf_float_by_you_strengthen_y")}
        onStartOver={() => window.location.reload()}
        startOverText={t("resume_practice")}
        onDone={() => window.history.back()}
      />
    </div>
  );
};

export default Index;
