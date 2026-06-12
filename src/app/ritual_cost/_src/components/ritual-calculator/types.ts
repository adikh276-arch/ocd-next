import { useTranslation } from "react-i18next";

export interface Ritual {
  id: string;
  emoji: string;
  name: string;
  timesPerDay: number;
  minsEach: number;
}

export const DEFAULT_RITUALS = [
  { id: 'hand_washing', emoji: '🧼', name: 'Hand Washing' },
  { id: 'long_showers', emoji: '🚿', name: 'Long Showers' },
  { id: 'cleaning_surfaces', emoji: '🧽', name: 'Cleaning Surfaces' },
  { id: 'changing_clothes', emoji: '👕', name: 'Changing Clothes' },
  { id: 'sanitiser_use', emoji: '🧴', name: 'Sanitiser Use' },
  { id: 'checking_if_clean', emoji: '🔎', name: 'Checking if Clean' },
  { id: 'throwing_things_away', emoji: '🗑️', name: 'Throwing Things Away' },
];

export interface CalculatedCosts {
  dailyMins: number;
  weeklyMins: number;
  yearlyDays: number;
}

export function calculateCosts(rituals: Ritual[]): CalculatedCosts {
    const { t } = useTranslation("ritual_cost");
  const dailyMins = rituals.reduce((sum, r) => sum + r.timesPerDay * r.minsEach, 0);
  return {
    dailyMins,
    weeklyMins: dailyMins * 7,
    yearlyDays: Math.round((dailyMins * 365) / 1440),
  };
}

export function formatMins(mins: number): string {
    const { t } = useTranslation("ritual_cost");
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
