import { useState, useCallback } from "react";
import { LadderStep } from "@/app/fear_ladder/_src/components/FearLadder/LadderBuilder";
import { toast } from "sonner";

export interface DayLog {
  day: number;
  stepId: string;
  anxietyBefore: number;
  anxietyAfter: number;
  notes: string;
  completedAt: string;
}

export interface FearLadderData {
  sessionId: string | null;
  goal: string;
  thought: string;
  reward: string;
  steps: LadderStep[];
  logs: DayLog[];
}

const createEmptySteps = (count: number): LadderStep[] =>
  Array.from({ length: count }, () => ({
    id: Math.random().toString(36).substring(2, 9),
    situation: "",
    anxiety: 50,
  }));

const getDefaultData = (): FearLadderData => ({
  sessionId: null,
  goal: "",
  thought: "",
  reward: "",
  steps: createEmptySteps(10),
  logs: [],
});

export type AppPhase = "build" | "practice" | "completed";

export const useFearLadderStorage = (_userId: string | null) => {
  const [data, setData] = useState<FearLadderData>(getDefaultData);
  const [loading] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const completedCount = data.logs.length;

  const sortedSteps = [...data.steps]
    .filter((s) => s.situation.trim().length > 0)
    .sort((a, b) => a.anxiety - b.anxiety);

  const phase: AppPhase = !data.sessionId
    ? "build"
    : completedCount >= sortedSteps.length
      ? "completed"
      : "practice";

  const currentStep = (phase === "practice" && completedCount < sortedSteps.length)
    ? sortedSteps[completedCount]
    : null;

  const completedStepIds = new Set(data.logs.map((l) => l.stepId));

  const currentStepAlreadyLogged = currentStep
    ? data.logs.some((l) => l.stepId === currentStep.id)
    : false;

  const updateField = useCallback(<K extends keyof FearLadderData>(
    key: K,
    value: FearLadderData[K]
  ) => {
    setData((prev) => {
      if (!prev.sessionId) {
        return { ...prev, [key]: value };
      }
      if (key === "goal" || key === "thought" || key === "reward") {
        return prev;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const updateSteps = useCallback((newSteps: LadderStep[]) => {
    setData((prev) => {
      if (prev.sessionId) return prev;
      return { ...prev, steps: newSteps };
    });
  }, []);

  const saveSession = useCallback(async () => {
    const filledSteps = data.steps
      .filter((s) => s.situation.trim().length > 0)
      .sort((a, b) => a.anxiety - b.anxiety);

    if (filledSteps.length < 1) {
      return { success: false as const, error: "Please add at least one step." };
    }

    const sessionId = Date.now().toString(36);

    try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'fear_ladder',
          payload: {
            type: 'session',
            sessionId,
            goal: data.goal,
            thought: data.thought,
            reward: data.reward,
            steps: filledSteps,
          },
        }),
      });

      setData((prev) => ({ ...prev, sessionId, steps: filledSteps, logs: [] }));
      setJustSaved(true);
      return { success: true as const };
    } catch (e) {
      console.error("Failed to save session:", e);
      return { success: false as const };
    }
  }, [data.goal, data.thought, data.reward, data.steps]);

  const addLog = useCallback(async (log: DayLog) => {
    if (!data.sessionId) return { success: false as const };

    if (data.logs.some((l) => l.stepId === log.stepId)) {
      return { success: false as const };
    }

    try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
      await fetch('/ocd/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: ocd_user_id, activity_slug: 'fear_ladder',
          payload: { type: 'log', sessionId: data.sessionId, ...log },
        }),
      });

      setData((prev) => ({ ...prev, logs: [...prev.logs, log] }));
      return { success: true as const };
    } catch (e) {
      console.error("Failed to save log:", e);
      return { success: false as const };
    }
  }, [data.sessionId, data.logs]);

  const resetLadder = useCallback(async () => {
    setData(getDefaultData());
    setJustSaved(false);
    toast.success("Flow reset. You are now back on Day 1.");
  }, []);

  return {
    data,
    phase,
    completedCount,
    sortedSteps,
    currentStep,
    completedStepIds,
    currentStepAlreadyLogged,
    updateField,
    updateSteps,
    saveSession,
    addLog,
    resetLadder,
    justSaved,
    setJustSaved,
    loading,
  };
};
