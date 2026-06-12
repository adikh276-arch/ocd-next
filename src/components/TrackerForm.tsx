"use client";
import { useEffect, useState, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Zap, Check, AlertCircle, MessageSquareText, Sparkles } from "lucide-react";
import { getTodayEntry, saveEntry, type TrackerEntry } from "@/lib/tracker-storage";
import { useTranslation } from "@/contexts/TranslationContext";

const AVOIDANCE_KEYS = ["fear_failure", "fear_judgment", "uncertainty", "low_energy", "other"];

interface Props { onSaved: () => void; }

export default function TrackerForm({ onSaved }: Props) {
  const { t } = useTranslation();
  const [confidence, setConfidence] = useState(5);
  const [decisiveness, setDecisiveness] = useState(5);
  const [avoided, setAvoided] = useState(false);
  const [avoidReason, setAvoidReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState("");
  const [context, setContext] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const today = await getTodayEntry();
      if (today) {
        setConfidence(today.confidence_score);
        setDecisiveness(today.decisiveness_score);
        setAvoided(today.avoided);
        setAvoidReason(today.avoidance_reason);
        setCustomReason(today.custom_reason_text || "");
        setContext(today.context || "");
      }
    };
    fetchData();
  }, []);

  const handleSave = useCallback(async () => {
    const today = new Date().toISOString().split("T")[0];
    const entry: TrackerEntry = {
      date: today, confidence_score: confidence, decisiveness_score: decisiveness,
      avoided, avoidance_reason: avoided ? avoidReason : null,
      custom_reason_text: avoided && avoidReason === "Other" ? customReason : null,
      context: context.trim() || null, created_at: Date.now(),
    };
    await saveEntry(entry);
    setSaved(true);
    onSaved();
    setTimeout(() => setSaved(false), 2500);
  }, [confidence, decisiveness, avoided, avoidReason, customReason, context, onSaved]);

  const getConfColor = (v: number) => {
    if (v <= 3) return "hsl(var(--destructive))";
    if (v <= 6) return "hsl(var(--accent))";
    return "hsl(var(--primary))";
  };

  const getConfLabel = (v: number) => {
    if (v <= 3) return t("doubtful");
    if (v <= 6) return t("building_confidence");
    return t("self_assured");
  };

  const getDecLabel = (v: number) => {
    if (v <= 3) return t("hesitant");
    if (v <= 6) return t("improving");
    return t("clear_confident");
  };

  return (
    <div className="space-y-4">
      {/* Reflective Header Card */}
      <div className="header-card text-center">
        <div className="flex items-center justify-center gap-2.5">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {t("confidence_checkin")}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto leading-relaxed">
          {t("reflective_prompt")}
        </p>
      </div>

      {/* Main Tracker Card */}
      <div className="premium-card p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Sliders */}
          <div className="space-y-6">
            {/* Self-Confidence */}
            <div>
              <div className="flex items-start gap-3 mb-5">
                <div className="icon-badge icon-badge-emerald mt-0.5">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <label className="font-semibold text-foreground text-sm block">{t("self_confidence")}</label>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t("belief_abilities")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider value={[confidence]} onValueChange={(v) => setConfidence(v[0])} min={0} max={10} step={1} />
                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{t("doubtful")}</span>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full transition-all duration-300"
                      style={{ color: getConfColor(confidence), background: `${getConfColor(confidence)}12`, border: `1px solid ${getConfColor(confidence)}25` }}
                    >
                      {getConfLabel(confidence)}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{t("self_assured")}</span>
                  </div>
                </div>
                <div className="score-badge" style={{ backgroundColor: getConfColor(confidence), color: "white" }}>
                  {confidence}
                </div>
              </div>
            </div>

            {/* Decisiveness */}
            <div>
              <div className="flex items-start gap-3 mb-5">
                <div className="icon-badge icon-badge-gold mt-0.5">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <label className="font-semibold text-foreground text-sm block">{t("decisiveness")}</label>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t("clarity_speed")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider value={[decisiveness]} onValueChange={(v) => setDecisiveness(v[0])} min={0} max={10} step={1} />
                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{t("hesitant")}</span>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full transition-all duration-300"
                      style={{ color: getConfColor(decisiveness), background: `${getConfColor(decisiveness)}12`, border: `1px solid ${getConfColor(decisiveness)}25` }}
                    >
                      {getDecLabel(decisiveness)}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{t("clear_confident")}</span>
                  </div>
                </div>
                <div className="score-badge" style={{ backgroundColor: getConfColor(decisiveness), color: "white" }}>
                  {decisiveness}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Missed Something */}
          <div>
            <div className="flex items-start gap-3 mb-5">
              <div className="icon-badge icon-badge-amber mt-0.5">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <label className="font-semibold text-foreground text-sm block">{t("missed_something")}</label>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t("missed_subtext")}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setAvoided(true)}
                className={`missed-btn flex-1 ${avoided ? "missed-btn-active" : "missed-btn-inactive"}`}
              >
                <AlertCircle className="h-4 w-4" />
                {t("yes_i_did")}
              </button>
              <button
                onClick={() => { setAvoided(false); setAvoidReason(null); }}
                className={`missed-btn flex-1 ${!avoided ? "missed-btn-active-good" : "missed-btn-inactive"}`}
              >
                <Check className="h-4 w-4" />
                {t("today_went_well")}
              </button>
            </div>

            <div className={`overflow-hidden transition-all duration-400 ease-out ${avoided ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">{t("what_held_back")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {AVOIDANCE_KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => setAvoidReason(t(key))}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 border ${
                        avoidReason === t(key) ? "chip-selected" : "chip-unselected hover:scale-[1.02]"
                      }`}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
                {avoidReason === t("other") && (
                  <input
                    type="text" placeholder={t("describe_briefly")} value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-border/40 bg-background/50 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all animate-fade-in"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Context Section */}
        <div className="mt-6 pt-6 border-t border-border/20">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquareText className="h-4 w-4 text-muted-foreground/50" />
            <label className="font-semibold text-foreground text-sm">{t("what_stood_out")}</label>
            <span className="text-[10px] text-muted-foreground/40 ml-auto">{t("optional")}</span>
          </div>
          <Textarea
            placeholder={t("what_happened")}
            value={context}
            onChange={(e) => setContext(e.target.value.slice(0, 200))}
            className="resize-none bg-muted/20 border-border/20 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 min-h-[56px] placeholder:text-muted-foreground/40"
            rows={2}
          />
          <p className="text-[9px] text-muted-foreground/30 mt-1 text-right tabular-nums">{context.length}/200</p>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className={`save-button w-full mt-4 ${saved ? "save-button-saved" : "save-button-default"}`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="h-3 w-3 animate-check-draw" />
              </div>
              {t("entry_saved")}
            </span>
          ) : (
            t("save_reflection")
          )}
        </button>
      </div>
    </div>
  );
}

