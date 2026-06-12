export interface Trigger {
  name: string;
  emoji: string;
  category: 'places' | 'situations' | 'people';
  rating: number;
}

export type CategoryKey = 'places' | 'situations' | 'people';

export interface CategoryConfig {
  key: CategoryKey;
  label: string;
  emoji: string;
  suggestions: { emoji: string; name: string }[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'places',
    label: "places",
    emoji: '📍',
    suggestions: [
      { emoji: '🚽', name: "public_toilet" },
      { emoji: '🏥', name: "hospital" },
      { emoji: '🛒', name: "market" },
      { emoji: '🏋️', name: "gym" },
      { emoji: '🚌', name: "public_transport" },
      { emoji: '🏠', name: "someones_home" },
    ],
  },
  {
    key: 'situations',
    label: "situations",
    emoji: '🔄',
    suggestions: [
      { emoji: '🚪', name: "door_handles" },
      { emoji: '💰', name: "handling_money" },
      { emoji: '🤝', name: "shaking_hands" },
      { emoji: '📱', name: "touching_phone" },
      { emoji: '🧴', name: "shared_equipment" },
    ],
  },
  {
    key: 'people',
    label: "people",
    emoji: '👤',
    suggestions: [
      { emoji: '🤧', name: "sick_people" },
      { emoji: '👥', name: "crowded_spaces" },
      { emoji: '👶', name: "children" },
      { emoji: '🧍', name: "strangers" },
      { emoji: '😷', name: "anyone_who_coughs" },
    ],
  },
];
