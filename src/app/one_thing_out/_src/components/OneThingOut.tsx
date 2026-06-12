"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { toast } from "sonner";
import { Trash2, CheckCircle2, Package, ChevronRight, ArrowLeft, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function OneThingOut() {
    const { t } = useTranslation("one_thing_out");
  const todayPrompt = useMemo(() => {
    const prompts = [
      t("something_from_a_drawer_you_havent_opened_in_months"),
      t("something_youve_been_keeping_just_in_case"),
      t("something_expired_broken_or_no_longer_working"),
      t("something_you_own_two_or_more_of"),
      t("something_that_belongs_to_a_past_version_of_you"),
    ];
    const day = new Date().getDate();
    return prompts[day % prompts.length];
  }, [t]);

  const todayMotivation = useMemo(() => {
    const motivationalStatements = [
      t("letting_go_isnt_about_losing__its_about_making_room_for_what"),
      t("you_survived_without_it_today_youll_be_okay_tomorrow_too"),
      t("every_item_you_release_is_proof_you_are_stronger_than_your_f"),
      t("you_are_not_your_belongings_you_are_so_much_more"),
      t("small_acts_of_courage_done_daily_change_everything"),
    ];
    const day = new Date().getDate();
    return motivationalStatements[day % motivationalStatements.length];
  }, [t]);

  const thoughts = [
    t("what_if_i_need_this_someday"),
    t("i_feel_guilty_letting_it_go"),
    t("it_might_still_be_useful"),
    t("i_feel_okay_actually"),
    t("im_worried_ill_regret_it"),
  ];

  const feelings = [
    t("lighter"),
    t("anxious_but_okay"),
    t("proud"),
    t("still_unsure__but_i_did_it"),
  ];

  const [screen, setScreen] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [itemName, setItemName] = useState("");
  const [selectedThoughts, setSelectedThoughts] = useState<string[]>([]);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const apiBase = '/ocd/api';
      await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          activity_slug: 'one_thing_out',
          payload: {
            itemName,
            selectedThoughts,
            selectedFeeling,
            prompt: todayPrompt
          },
        }),
      });
      setScreen(4);
    } catch (e) {
      toast.error("Failed to save entry.");
    } finally {
      setSaving(false);
    }
  };

  const goBack = () => {
    if (screen > 0) setScreen((prev) => (prev - 1) as any);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-one-thing-out">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (window.parent !== window) {
                   window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
                } else {
                   window.location.href = 'https://web.mantracare.com';
                }
               }}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <ActivityHistoryDrawer slug="one_thing_out" title={t("release_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("one_thing_out")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("exposure_practice")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-12 font-sans min-h-[550px] relative flex flex-col justify-center">
          
          {/* Internal Previous Button (<) */}
          {screen > 0 && screen < 4 && (
            <button
              onClick={goBack}
              className="absolute left-6 top-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-20 border border-slate-100"
              title={t("previous_screen")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Message Header inside card */}
          <header className="text-center space-y-3 mb-10 pt-4">
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">
              "{todayMotivation}"
            </p>
          </header>

          <AnimatePresence mode="wait">
            {screen === 0 && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full text-center space-y-10"
              >
                 <div className="flex justify-center">
                   <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                      <Trash2 size={64} strokeWidth={1.5} />
                   </div>
                 </div>
                 <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t("ready_to_release")}</h2>
                    <p className="text-slate-500 font-medium leading-relaxed italic">
                       {t("lets_practice_the_powerful_act_of_letting_go_one_s")}</p>
                 </div>
                 <div className="max-w-md mx-auto pt-4">
                   <button 
                      onClick={() => setScreen(1)} 
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
                   >
                      {t("start_practice")}<ChevronRight size={20} />
                   </button>
                 </div>
              </motion.div>
            )}

            {screen === 1 && (
              <motion.div 
                 key="identify"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="w-full space-y-10"
              >
                 <header className="text-center space-y-4">
                    <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       {t("todays_challenge")}</label>
                    <div className="bg-primary/5 border-2 border-primary/10 border-dashed rounded-[28px] p-8 text-center italic relative overflow-hidden group">
                       <Package className="absolute -top-4 -right-4 w-32 h-32 text-primary opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-700 pointer-events-none" />
                       <p className="text-xl font-bold text-primary leading-relaxed relative z-10">"{todayPrompt}"</p>
                    </div>
                 </header>

                 <div className="space-y-4 max-w-2xl mx-auto">
                    <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase flex items-center justify-center gap-2">{t("what_did_you_find")}</label>
                    <input 
                      autoFocus
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder={t("eg_old_charger_magazine")}
                      className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-[28px] p-8 text-xl font-bold text-slate-700 text-center outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner italic placeholder:text-slate-300"
                    />
                 </div>

                 <div className="max-w-md mx-auto pt-10">
                    <button 
                      onClick={() => setScreen(2)} 
                      disabled={!itemName.trim()}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3"
                    >
                      {t("i_found_it")}<ChevronRight size={20} />
                    </button>
                 </div>
              </motion.div>
            )}

            {screen === 2 && (
              <motion.div 
                 key="reflect"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="w-full space-y-10"
              >
                 <header className="text-center space-y-4">
                    <label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                       {t("confronting_the_clutter")}</label>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("what_is_your_mind_saying")}</h2>
                    <p className="text-sm text-slate-500 font-medium italic">
                       {t("notice_the_thought_but_dont_let_it_decide_for_you")}</p>
                 </header>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                    {thoughts.map((thought) => {
                      const active = selectedThoughts.includes(thought);
                      return (
                        <button
                          key={thought}
                          onClick={() => setSelectedThoughts(prev => 
                            prev.includes(thought) ? prev.filter(t => t !== thought) : [...prev, thought]
                          )}
                          className={`p-6 rounded-[24px] font-bold text-center transition-all border-2 flex items-center justify-center text-sm ${
                            active 
                              ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-primary/20 hover:bg-slate-50 italic'
                          }`}
                        >
                           {thought}
                        </button>
                      )
                    })}
                 </div>

                 <div className="max-w-md mx-auto pt-10">
                    <button 
                      onClick={() => setScreen(3)} 
                      disabled={selectedThoughts.length === 0}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3"
                    >
                      {t("let_it_go")}<ChevronRight size={20} />
                    </button>
                 </div>
              </motion.div>
            )}

            {screen === 3 && (
              <motion.div 
                 key="feeling"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="w-full text-center space-y-10"
              >
                 <div className="flex justify-center">
                    <div className="w-24 h-24 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center border-2 border-primary/10">
                      <CheckCircle2 size={48} strokeWidth={2} />
                    </div>
                 </div>
                 <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t("release_complete")}</h2>
                    <p className="text-slate-500 font-medium italic">{t("how_do_you_feel_after_letting_it_go")}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {feelings.map((f) => {
                      const active = selectedFeeling === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setSelectedFeeling(f)}
                          className={`p-6 rounded-[24px] font-bold text-xs uppercase tracking-widest transition-all border-2 text-center h-24 flex items-center justify-center ${
                            active 
                              ? 'bg-primary border-primary text-white shadow-lg' 
                              : 'bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:bg-slate-50'
                          }`}
                        >
                           {f}
                        </button>
                      )
                    })}
                 </div>

                 <div className="max-w-md mx-auto pt-10">
                    <button 
                      onClick={handleComplete} 
                      disabled={!selectedFeeling || saving}
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-20"
                    >
                      {saving ? "Saving..." : "Finish Exercise"}
                    </button>
                 </div>
              </motion.div>
            )}

            {screen === 4 && (
              <motion.div 
                 key="final"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="w-full text-center space-y-10"
              >
                 <div className="flex justify-center">
                    <div className="w-24 h-24 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center border-2 border-primary/10">
                       <Package size={40} />
                    </div>
                 </div>
                 <div className="space-y-6 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("great_work")}</h2>
                    <p className="text-slate-500 font-medium leading-relaxed italic text-lg px-6">
                      "{todayMotivation}"
                    </p>
                 </div>
                 <div className="max-w-md mx-auto pt-10">
                    <button 
                      onClick={() => setShowCompletion(true)} 
                      className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.98]"
                    >
                      {t("complete_practice")}</button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <StandardCompletionModal 
        showHome={false}
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="✨"
        title={t("release_complete")}
        description={t("youve_successfully_practiced_the_act_of_release_ev")}
        onStartOver={() => {
          setScreen(0);
          setItemName("");
          setSelectedThoughts([]);
          setSelectedFeeling(null);
          setShowCompletion(false);
        }}
        startOverText={t("log_another")}
        onDone={() => window.history.back()}
      />
    </div>
  );
}
