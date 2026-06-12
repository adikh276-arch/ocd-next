import { useEffect, useState } from 'react';
import { Check, Smile, MessageCircle, ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import "@/lib/i18n";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const MoodTracker = () => {
    const { t, i18n } = useTranslation("mood_tracker");
  const apiBase = '/ocd/api';

  const DAYS = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
  ] as const;
  // Use i18n.language for dynamic formatting
  const lang = i18n.language || "en";
  type Day = (typeof DAYS)[number];

  const MESSAGES: Record<Day, Record<number, { heading: string; body: string }>> = {
      Monday: {
          5: { heading: t("unstoppable_monday_energy_"), body: t("starting_the_week_with_a_great_mood_is_a_superpower_youve_s") },
          4: { heading: t("steady_and_strong_monday_"), body: t("youre_starting_the_week_on_a_good_note_thats_a_solid_founda") },
          3: { heading: t("finding_your_monday_flow_"), body: t("an_okay_monday_is_a_win_youre_showing_up_and_easing_into_th") },
          2: { heading: t("gently_navigating_monday_"), body: t("feeling_a_bit_low_on_a_monday_is_completely_understandable") },
          1: { heading: t("be_extra_kind_today_"), body: t("struggling_on_a_monday_is_tough_please_remember_you_dont_ha") },
      },
      Tuesday: {
          5: { heading: t("tuesday_triumph_"), body: t("youre_absolutely_thriving_today_carrying_that_great_energy") },
          4: { heading: t("tuesdays_looking_bright_"), body: t("a_good_mood_today_is_a_gift_youre_past_the_monday_hump_and_") },
          3: { heading: t("tuesday_tranquility_"), body: t("an_okay_tuesday_is_perfectly_fine_youre_keeping_a_steady_pa") },
          2: { heading: t("patience_with_yourself_today_"), body: t("if_tuesday_feels_a_bit_low_remember_that_progress_isnt_alwa") },
          1: { heading: t("sending_you_strength_"), body: t("struggling_on_a_tuesday_can_feel_isolating_but_youre_not_al") },
      },
      Wednesday: {
          5: { heading: t("midweek_masterclass_"), body: t("halfway_through_the_week_and_feeling_great_youre_crushing_") },
          4: { heading: t("hump_day_happiness_"), body: t("youve_made_it_to_wednesday_with_a_good_vibe_the_weekend_is_") },
          3: { heading: t("midweek_balance_"), body: t("an_okay_wednesday_is_a_steady_anchor_youre_balanced_and_mov") },
          2: { heading: t("midweek_softness_"), body: t("if_wednesday_feels_low_try_to_find_one_tiny_thing_to_look_f") },
          1: { heading: t("youre_not_alone_today_"), body: t("struggling_in_the_middle_of_the_week_is_hard_give_yourself_") },
      },
      Thursday: {
          5: { heading: t("thursday_thrill_"), body: t("feeling_great_with_the_weekend_so_close_thats_the_best_fini") },
          4: { heading: t("almost_there_thursday_"), body: t("a_good_thursday_sets_you_up_for_a_fantastic_weekend_you_can") },
          3: { heading: t("steady_into_thursday_"), body: t("an_okay_thursday_is_a_job_well_done_youve_put_in_the_work_a") },
          2: { heading: t("thursday_reflection_"), body: t("if_youre_feeling_low_today_look_back_at_how_much_youve_alre") },
          1: { heading: t("gentle_thursday_hug_"), body: t("struggling_on_a_thursday_is_a_sign_the_week_has_been_long_b") },
      },
      Friday: {
          5: { heading: t("fantastic_friday_"), body: t("closing_the_week_in_a_great_mood__what_a_victory_youve_earn") },
          4: { heading: t("friday_feeling_good_"), body: t("a_good_friday_is the_perfect_bridge_to_the_weekend_youve_na") },
          3: { heading: t("friday_ease_"), body: t("an_okay_friday_means_youve_made_it_through_the_pressure_is_") },
          2: { heading: t("friday_release_"), body: t("if_friday_feels_low_let_yourself_sink_into_rest_tonight_yo") },
          1: { heading: t("healing_friday_energy_"), body: t("struggling_as_the_week_ends_is_a_lot_to_handle_be_proud_of_") },
      },
      Saturday: {
          5: { heading: t("saturday_splendor_"), body: t("a_great_saturday_is_pure_magic_this_is_your_time_to_shine_a") },
          4: { heading: t("serene_saturday_"), body: t("feeling_good_on_your_day_off_is_a_blessing_whether_youre_ac") },
          3: { heading: t("simple_saturday_"), body: t("an_okay_saturday_is_a_peaceful_plateau_no_rush_no_pressure") },
          2: { heading: t("saturday_softness_"), body: t("if_saturday_feels_low_dont_feel_pressured_to_do_the_weeken") },
          1: { heading: t("comforting_saturday_"), body: t("struggling_on_a_weekend_can_feel_extra_hard_please_be_gentl") },
      },
      Sunday: {
          5: { heading: t("sunday_sunshine_"), body: t("a_great_sunday_is_the_ultimate_recharge_youre_heading_into_") },
          4: { heading: t("gentle_sunday_vibes_"), body: t("feeling_good_today_sets_a_peaceful_tone_for_the_week_ahead_") },
          3: { heading: t("sunday_settling_"), body: t("an_okay_sunday_is_a_perfect_time_for_reflection_and_prep_yo") },
          2: { heading: t("sunday_scaries_begone_"), body: t("if_sunday_feels_low_try_to_focus_on_the_present_moment_rath") },
          1: { heading: t("sunday_self-care_"), body: t("struggling_on_a_sunday_is_more_common_than_you_think_treat_") },
      },
  };

  const MOODS = [
    { emoji: "😊", label: t("great", "Great"), value: 5, colorVar: "--mood-great" },
    { emoji: "🙂", label: t("good", "Good"), value: 4, colorVar: "--mood-good" },
    { emoji: "😐", label: t("okay", "Okay"), value: 3, colorVar: "--mood-okay" },
    { emoji: "😟", label: t("low", "Low"), value: 2, colorVar: "--mood-low" },
    { emoji: "😢", label: t("struggling", "Struggling"), value: 1, colorVar: "--mood-struggling" },
  ] as const;

  // Automatically detect the current day of the week
  const getCurrentDay = (): Day => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as Day;
    return DAYS.includes(today) ? today : "Monday";
  };

  const [selectedDay] = useState<Day>(getCurrentDay());
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const selectedMoodData = MOODS.find((m) => m.value === selectedMood);

  const todayDate = new Date().toLocaleDateString(lang, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleLog = async () => {
    if (selectedMood === null) return;
    setSaving(true);
    try {
      const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      const response = await fetch(`${apiBase}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'mood_tracker',
          payload: {
            mood_value: selectedMood,
            mood_label: selectedMoodData?.label,
            mood_emoji: selectedMoodData?.emoji,
            day_name: selectedDay,
            note,
          },
        }),
      });
      if (response.ok) {
        setShowCompletion(true);
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setNote("");
    setShowCompletion(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative font-sans theme-mood_tracker">
      {/* Header */}
      <div className="w-full flex flex-col gap-8 mb-10 z-10 relative">
        <div className="flex items-center justify-between">
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
          <ActivityHistoryDrawer slug="mood_tracker" title={t("mood_history")} />
        </div>

        <div className="text-center space-y-2">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t("mood_tracker")}</h1>
           <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">{t("daily_emotional_check-in")}</p>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto z-10 relative">
        <div className="bg-white rounded-[32px] border-2 border-slate-200/80 border-t-[8px] border-t-primary shadow-2xl shadow-slate-200/40 p-8 md:p-10 font-sans">
          
          {/* Date Header inside card */}
          <header className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
               {todayDate}
            </h2>
            <p className="text-slate-500 text-sm font-medium opacity-80 italic px-6">{t("noticing_your_mood_is_the_first_step_to_mastering_")}</p>
          </header>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            <div className="flex flex-col h-full">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 block flex items-center gap-2">
                <Smile size={14} className="text-primary" /> {t("how_do_you_feel_right_now")}</label>
              <div className="grid grid-cols-1 gap-4">
                {MOODS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex items-center gap-6 p-5 rounded-[24px] transition-all relative border-2 ${
                      selectedMood === mood.value 
                        ? 'bg-primary/5 border-primary shadow-sm scale-[1.02]' 
                        : 'bg-slate-50 border-slate-200/80 text-slate-500 hover:border-primary/40 hover:bg-white'
                    }`}
                  >
                    <div 
                       className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 bg-white"
                    >
                       {mood.emoji}
                    </div>
                    <div className="text-left">
                      <span className={`text-[11px] font-bold uppercase tracking-widest block mb-1 ${selectedMood === mood.value ? 'text-primary' : 'text-slate-400'}`}>
                        {mood.label}
                      </span>
                      <span className="text-[13px] font-medium text-slate-600">
                        {mood.value === 5 ? t('feeling_wonderful', 'Feeling wonderful') : 
                         mood.value === 4 ? t('doing_well', 'Doing well') : 
                         mood.value === 3 ? t('balanced_state', 'Balanced state') : 
                         mood.value === 2 ? t('feeling_a_bit_low', 'Feeling a bit low') : t('rough_day', 'Rough day')}
                      </span>
                    </div>
                    {selectedMood === mood.value && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col h-full">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 block flex items-center gap-2">
                <MessageCircle size={14} className="text-primary" /> {t("any_specific_reflections")}</label>
              <div className="flex-1 flex flex-col gap-8">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("optional_thoughts")}
                  className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-[24px] p-6 text-slate-700 outline-none focus:border-primary/40 focus:bg-white transition-all flex-1 resize-none font-medium italic text-[15px] shadow-inner"
                />

                <button
                  onClick={handleLog}
                  disabled={selectedMood === null || saving}
                  className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-20 shadow-lg shadow-primary/10 group"
                >
                   <span>{saving ? t("logging...", "Logging...") : t("log_daily_mood", "Log Daily Mood")}</span>
                   {!saving && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji={selectedMoodData?.emoji || "🧠"}
        title={selectedMood !== null ? MESSAGES[selectedDay][selectedMood].heading : t("awareness_logged")}
        description={selectedMood !== null ? MESSAGES[selectedDay][selectedMood].body : t("noticing_your_mood_is_the_first_step_to_mastering_your_mind.")}
        onStartOver={handleReset}
        startOverText={t("log_another")}
        onDone={() => window.history.back()}
        showHome={false}/>
    </div>
  );
};

export default MoodTracker;
