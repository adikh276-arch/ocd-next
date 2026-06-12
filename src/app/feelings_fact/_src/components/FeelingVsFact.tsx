import React, { useState, useRef, useEffect } from "react";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { StandardCompletionModal } from "@/components/StandardCompletionModal";
import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { useTranslation } from "react-i18next";

// ─── Card data ────────────────────────────────────────────────────────────────
const cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];
// ─── Shared sub-components ────────────────────────────────────────────────────
function LabelComponent({ text, type }: { text: string; type: "feeling" | "fact" }) {
    const { t } = useTranslation("feelings_fact");
    const BUTTONS = [
      t("got_it"),
      t("okay_i_understand"),
      t("i_see_the_difference"),
      t("that_makes_sense"),
      t("okay"),
      t("im_starting_to_see_it"),
      t("id_like_to_try"),
      t("i_can_let_feelings_be_feelings"),
    ];
      
      const styles =
        type === "feeling"
          ? "bg-[hsl(30,80%,90%)] text-[hsl(25,60%,40%)]"
          : "bg-[hsl(210,60%,90%)] text-[hsl(210,60%,34%)]";
  return (
    <span className={`text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full inline-block ${styles}`}>
      {text}
    </span>
  );
}

function CardNote({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className={`mt-1 rounded-xl px-4 py-3 text-[0.82rem] italic leading-relaxed text-[hsl(242,35%,44%)] bg-[hsl(242,52%,97%)] border border-[hsl(242,52%,90%)] ${center ? "text-center" : ""}`}>
          {children}
        </div>
      );
}

function CardHighlight({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className={`mt-1 rounded-xl px-4 py-3 text-[0.82rem] italic leading-relaxed text-[hsl(210,45%,34%)] bg-[hsl(210,60%,95%)] border border-[hsl(210,60%,87%)] ${center ? "text-center" : ""}`}>
          {children}
        </div>
      );
}

function ActivityButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    const { t } = useTranslation("feelings_fact");
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body text-[15px] font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-primary/20"
        >
          {children}
        </button>
      );
}

// ─── CARD 1 ───────────────────────────────────────────────────────────────────
function Card1() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(242,52%,94%)] to-[hsl(270,44%,92%)] shadow-sm flex-shrink-0">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect x="12" y="10" width="8" height="28" rx="4" fill="hsl(242,52%,58%)" opacity="0.85"/>
              <rect x="28" y="10" width="8" height="28" rx="4" fill="hsl(270,44%,60%)" opacity="0.75"/>
            </svg>
          </div>
          <h2 className="card-heading">{t("lets_slow_this_down")}</h2>
          <p className="card-body leading-[1.9]">
            {t("when_ocd_shows_up_feelings_can_feel_like_facts")}<br />
            {t("anxiety_feels_urgent")}<br />
            {t("thoughts_feel_dangerous")}<br />
            <br />
            {t("but_feelings_are_signals")}<br />
            {t("not_evidence")}</p>
        </div>
      );
}

// ─── CARD 2 ───────────────────────────────────────────────────────────────────
function Card2() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(270,44%,94%)] to-[hsl(30,80%,94%)] shadow-sm flex-shrink-0">
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <path d="M24 38s-14-9.5-14-19a9 9 0 0118 0 9 9 0 0118 0c0 9.5-14 19-14 19z" fill="hsl(330,60%,72%)" opacity="0.85"/>
                <path d="M16 43 Q20 40 24 43 Q28 46 32 43" stroke="hsl(270,44%,60%)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h2 className="card-heading">{t("what_is_a_feeling")}</h2>
            <p className="card-body leading-[1.85]">
              {t("a_feeling_is_a_physical_reaction_in_your_body")}<br />
              {t("it_can_include_anxiety_guilt_or_fear")}<br />
              <br />
              {t("feelings_are_real")}<br />
              {t("but_they_are_not_proof")}</p>
          </div>
          <CardNote center>{t("anxiety_is_loud_facts_are_quiet")}</CardNote>
        </div>
      );
}

// ─── CARD 3 ───────────────────────────────────────────────────────────────────
function Card3() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(210,60%,94%)] to-[hsl(210,60%,90%)] shadow-sm flex-shrink-0">
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <circle cx="20" cy="20" r="11" stroke="hsl(210,60%,45%)" strokeWidth="2.5" fill="hsl(210,60%,92%)" />
                <line x1="28.5" y1="28.5" x2="38" y2="38" stroke="hsl(210,60%,40%)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M15 20l3.5 3.5L25 16" stroke="hsl(210,60%,45%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h2 className="card-heading">{t("what_is_a_fact")}</h2>
            <p className="card-body leading-[1.85]">
              {t("a_fact_is_something_observable")}<br />
              {t("something_measurable")}<br />
              {t("something_that_exists_outside_of_your_mind")}</p>
          </div>
          <CardHighlight center>{t("a_fact_remains_true_even_when_you_feel_afraid")}</CardHighlight>
        </div>
      );
}

// ─── CARD 4 ───────────────────────────────────────────────────────────────────
function Card4() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <h2 className="card-heading text-center">{t("a_real_example")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gradient-to-b from-[hsl(30,80%,97%)] to-[hsl(30,80%,93%)] border border-[hsl(30,60%,88%)]">
              <LabelComponent text={t("feeling")} type="feeling" />
              <p className="text-[0.82rem] leading-relaxed text-[hsl(25,45%,32%)] mt-1">
                {t("it_feels_like_i_might_lose_control")}</p>
            </div>
            <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gradient-to-b from-[hsl(210,60%,97%)] to-[hsl(210,60%,93%)] border border-[hsl(210,60%,86%)]">
              <LabelComponent text={t("fact")} type="fact" />
              <p className="text-[0.82rem] leading-relaxed text-[hsl(210,45%,32%)] mt-1">
                {t("i_have_never_lost_control_before")}</p>
            </div>
          </div>
          <CardNote center>{t("feeling_is_a_prediction_not_a_fact")}</CardNote>
        </div>
      );
}

// ─── CARD 5 ───────────────────────────────────────────────────────────────────
function Card5() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <h2 className="card-heading text-center">{t("a_real_example")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gradient-to-b from-[hsl(30,80%,97%)] to-[hsl(30,80%,93%)] border border-[hsl(30,60%,88%)]">
              <LabelComponent text={t("feeling")} type="feeling" />
              <p className="text-[0.82rem] leading-relaxed text-[hsl(25,45%,32%)] mt-1">
                {t("if_i_had_this_thought_it_must_be_true")}</p>
            </div>
            <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gradient-to-b from-[hsl(210,60%,97%)] to-[hsl(210,60%,93%)] border border-[hsl(210,60%,86%)]">
              <LabelComponent text={t("fact")} type="fact" />
              <p className="text-[0.82rem] leading-relaxed text-[hsl(210,45%,32%)] mt-1">
                {t("thoughts_happen_automatically")}<br />
                {t("they_are_not_intentions")}</p>
            </div>
          </div>
          <CardNote center>{t("a_thought_is_not_an_action")}</CardNote>
        </div>
      );
}

// ─── CARD 6 ───────────────────────────────────────────────────────────────────
function Card6() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <h2 className="card-heading text-center">{t("a_real_example")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gradient-to-b from-[hsl(30,80%,97%)] to-[hsl(30,80%,93%)] border border-[hsl(30,60%,88%)]">
              <LabelComponent text={t("feeling")} type="feeling" />
              <p className="text-[0.82rem] leading-relaxed text-[hsl(25,45%,32%)] mt-1">
                {t("it_feels_unsafe")}</p>
            </div>
            <div className="rounded-2xl p-4 flex flex-col gap-2 bg-gradient-to-b from-[hsl(210,60%,97%)] to-[hsl(210,60%,93%)] border border-[hsl(210,60%,86%)]">
              <LabelComponent text={t("fact")} type="fact" />
              <p className="text-[0.82rem] leading-relaxed text-[hsl(210,45%,32%)] mt-1">
                {t("there_is_no_actual_evidence_of_threat_right_now")}</p>
            </div>
          </div>
          <CardNote center>{t("fear_does_not_equal_threat")}</CardNote>
        </div>
      );
}

// ─── CARD 7 ───────────────────────────────────────────────────────────────────
function Card7() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <h2 className="card-heading text-center">{t("what_ocd_does")}</h2>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(270,44%,94%)] to-[hsl(210,60%,93%)] shadow-sm flex-shrink-0">
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                <circle cx="18" cy="24" r="11" fill="hsl(270,44%,72%)" opacity="0.65"/>
                <circle cx="30" cy="24" r="11" fill="hsl(210,60%,62%)" opacity="0.65"/>
                <path d="M24 15 Q30 24 24 33 Q18 24 24 15" fill="hsl(242,52%,68%)" opacity="0.4"/>
                <path d="M22 22l4 4M26 22l-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.9"/>
              </svg>
            </div>
          </div>
          <p className="card-body text-center leading-[1.9]">
            {t("ocd_blends_feeling_and_fact_to_create_urgency")}<br />
            <br />
            {t("it_says")}<br />
            <em className="text-[hsl(242,52%,38%)]">{t("because_it_feels_scary_it_must_be_dangerous")}</em><br />
            <br />
            {t("but_fear_is_a_sensation")}<br />
            {t("not_a_conclusion")}</p>
          <CardNote center>{t("you_dont_need_to_solve_a_feeling")}</CardNote>
        </div>
      );
}

// ─── CARD 8 ───────────────────────────────────────────────────────────────────
function Card8() {
    const { t } = useTranslation("feelings_fact");
      return (
        <div className="flex flex-col gap-5">
          <h2 className="card-heading text-center">{t("a_different_response")}</h2>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(210,60%,94%)] to-[hsl(242,52%,94%)] shadow-sm flex-shrink-0">
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                <circle cx="14" cy="24" r="9" fill="hsl(270,44%,74%)" opacity="0.5"/>
                <text x="14" y="27.5" textAnchor="middle" fontSize="5" fill="hsl(242,52%,32%)" fontFamily="Inter,sans-serif" opacity="0.8">{t("feel")}</text>
                <path d="M25 24h4" stroke="hsl(242,52%,60%)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M27 21.5l2.5 2.5-2.5 2.5" stroke="hsl(242,52%,60%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="37" cy="24" r="9" fill="hsl(210,60%,58%)" opacity="0.85" />
                <text x="37" y="27.5" textAnchor="middle" fontSize="5" fill="white" fontFamily="Inter,sans-serif" opacity="0.95">{t("fact")}</text>
              </svg>
            </div>
          </div>
          <p className="card-body text-center leading-[1.9]">
            {t("instead_of_proving_the_thought")}<br />
            {t("try_separating_it")}<br />
            <br />
            <span className="block mt-1 italic text-[hsl(242,52%,40%)]">{t("this_is_anxiety")}</span>
            <span className="block italic text-[hsl(242,52%,40%)]">{t("this_is_a_feeling_not_a_fact")}</span>
            <br />
            {t("you_dont_need_to_eliminate_fear")}<br />
            {t("you_only_need_to_recognize_it")}</p>
          <CardHighlight center>
            {t("the_goal_is_not_certainty")}<br />
            {t("the_goal_is_perspective")}</CardHighlight>
        </div>
      );
}

// ─── COMPLETION ───────────────────────────────────────────────────────────────
function Completion({ onStartOver }: { onStartOver: () => void }) {
    const { t } = useTranslation("feelings_fact");
      const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    fetch('/ocd/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: ocd_user_id, activity_slug: 'feelings_fact',
        payload: { completed: true, date: new Date().toISOString() },
      }),
    }).catch(err => console.error("Logging failed", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 animate-fade-up">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute w-24 h-24 rounded-full border-2 border-primary/20 animate-ring-expand" />
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-check-pop shadow-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p className="font-serif text-xl text-foreground text-center italic">
          {t("awareness_builds_freedom")}</p>
      </div>
      <div className="w-full max-w-sm mt-4 flex flex-col items-center gap-6">
        <ActivityButton onClick={() => setShowCompletion(true)}>
          {t("complete_session")}</ActivityButton>
      </div>
      <StandardCompletionModal
        isOpen={showCompletion}
        onOpenChange={setShowCompletion}
        emoji="🧘"
        title={t("clarity_achieved")}
        description={t("youve_learned_to_see_the_difference_between_a_feel")}
        
        showHome={false}
        onStartOver={() => window.location.reload()}/>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FeelingVsFact() {
    const { t } = useTranslation("feelings_fact");
      const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState<"in" | "out">("in");
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progress = ((current + 1) / cards.length) * 100;

  function advance() {
    setAnimState("out");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (current >= cards.length - 1) {
        setDone(true);
      } else {
        setCurrent((c) => c + 1);
        setAnimState("in");
      }
    }, 310);
  }

  function goBack() {
    if (current === 0) return;
    setAnimState("out");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((c) => c - 1);
      setAnimState("in");
    }, 310);
  }

  if (done) return <Completion onStartOver={() => { setDone(false); setCurrent(0); setAnimState("in"); }} />;

  const cardId = cards[current].id;
  const btnLabel = BUTTONS[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="pointer-events-none absolute w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, hsl(270,44%,84%,0.55) 0%, transparent 70%)", top: "-80px", left: "-60px" }} />
      <div className="pointer-events-none absolute w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, hsl(210,60%,82%,0.45) 0%, transparent 70%)", bottom: "-100px", right: "-80px" }} />
      <div className="pointer-events-none absolute w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, hsl(242,52%,82%,0.3) 0%, transparent 70%)", top: "35%", right: "5%" }} />

      <div className="w-full max-w-md mb-5 z-10">
        <div className="h-[2px] rounded-full bg-[hsl(242,52%,90%)] overflow-hidden">
          <div className="h-full rounded-full bg-[hsl(242,52%,48%)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] text-[hsl(242,52%,52%)] tracking-wide font-medium uppercase">{t("feeling_vs_fact")}</span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[hsl(242,52%,52%)]">{current + 1} / {cards.length}</span>
            <ActivityHistoryDrawer slug="feelings_fact" title={t("pattern_history")} />
          </div>
        </div>
      </div>

      <div className={`w-full max-w-md z-10 ${animState === "in" ? "animate-card-in" : "animate-card-out"}`} style={{ minHeight: "360px" }}>
        <div className="w-full rounded-[20px] p-7 flex flex-col justify-between" style={{ background: "linear-gradient(145deg, hsl(0,0%,100%) 0%, hsl(242,52%,99%) 60%, hsl(270,44%,98%) 100%)", boxShadow: "0 8px 40px -8px hsl(242 52% 20% / 0.13), 0 2px 8px -2px hsl(242 52% 30% / 0.07)", minHeight: "360px" }}>
          {cardId === 1 && <Card1 />}
          {cardId === 2 && <Card2 />}
          {cardId === 3 && <Card3 />}
          {cardId === 4 && <Card4 />}
          {cardId === 5 && <Card5 />}
          {cardId === 6 && <Card6 />}
          {cardId === 7 && <Card7 />}
          {cardId === 8 && <Card8 />}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 z-10 w-full max-w-md">
        <button 
          onClick={goBack} 
          disabled={current === 0} 
          className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/50 bg-white text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:bg-secondary/40 hover:text-foreground active:scale-95 shrink-0 shadow-sm" 
          aria-label={t("go_back")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <ActivityButton onClick={advance}>
          {btnLabel}
        </ActivityButton>
      </div>
    </div>
  );
}
