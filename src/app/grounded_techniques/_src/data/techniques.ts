import { useTranslation } from "react-i18next";

export interface Technique {
  id: string;
  title: string;
  color: string;
  colorDeep: string;
  colorVar: string;
  steps: string[];
}

export const techniques: Technique[] = [
  {
    id: "water",
    title: t("put_your_hands_in_water"),
    color: "bg-pastel-teal",
    colorDeep: "bg-pastel-teal-deep",
    colorVar: "--pastel-teal",
    steps: [
      t("run_your_hands_under_cool_or_warm_water"),
      t("notice_the_temperature"),
      t("pay_attention_to_the_sensation_on_your_skin"),
      t("observe_how_it_changes_moment_by_moment"),
      t("let_your_breathing_slow_naturally"),
    ],
  },
  {
    id: "touch",
    title: t("pick_up_or_touch_items_near_you"),
    color: "bg-pastel-lavender",
    colorDeep: "bg-pastel-lavender-deep",
    colorVar: "--pastel-lavender",
    steps: [
      t("choose_a_nearby_object"),
      t("notice_its_texture_weight_and_temperature"),
      t("is_it_smooth_or_rough_heavy_or_light"),
      t("let_your_focus_stay_fully_on_this_one_object"),
    ],
  },
  {
    id: "breathe",
    title: t("breathe_deeply"),
    color: "bg-pastel-peach",
    colorDeep: "bg-pastel-peach-deep",
    colorVar: "--pastel-peach",
    steps: [
      t("take_a_slow_breath_in_through_your_nose"),
      t("hold_gently_for_a_moment"),
      t("exhale_slowly_through_your_mouth"),
      t("repeat_several_times"),
      t("let_your_shoulders_soften"),
    ],
  },
  {
    id: "food",
    title: t("savour_your_food"),
    color: "bg-pastel-mint",
    colorDeep: "bg-pastel-mint-deep",
    colorVar: "--pastel-mint",
    steps: [
      t("take_a_small_bite"),
      t("chew_slowly"),
      t("notice_the_flavor_texture_and_temperature"),
      t("stay_fully_present_with_the_experience"),
    ],
  },
  {
    id: "drink",
    title: t("savour_a_drink"),
    color: "bg-pastel-blue",
    colorDeep: "bg-pastel-blue-deep",
    colorVar: "--pastel-blue",
    steps: [
      t("take_a_slow_sip"),
      t("notice_the_temperature_and_taste"),
      t("feel_the_sensation_as_you_swallow"),
      t("let_yourself_stay_with_that_moment"),
    ],
  },
  {
    id: "walk",
    title: t("take_a_short_walk"),
    color: "bg-pastel-rose",
    colorDeep: "bg-pastel-rose-deep",
    colorVar: "--pastel-rose",
    steps: [
      t("walk_slowly_and_intentionally"),
      t("notice_the_feeling_of_your_feet_touching_the_ground"),
      t("observe_your_surroundings_without_judgment"),
      t("let_your_breath_match_your_steps"),
    ],
  },
  {
    id: "ice",
    title: t("hold_a_piece_of_ice"),
    color: "bg-pastel-sage",
    colorDeep: "bg-pastel-sage-deep",
    colorVar: "--pastel-sage",
    steps: [
      t("hold_the_ice_in_your_hand"),
      t("notice_the_cold_sensation"),
      t("focus_fully_on_the_feeling"),
      t("allow_the_strong_sensation_to_anchor_you_to_the_present"),
    ],
  },
  {
    id: "scent",
    title: t("savour_a_scent"),
    color: "bg-pastel-coral",
    colorDeep: "bg-pastel-coral-deep",
    colorVar: "--pastel-coral",
    steps: [
      t("choose_a_scent_nearby"),
      t("inhale_slowly"),
      t("notice_how_it_feels_in_your_body"),
      t("let_the_scent_bring_you_into_this_moment"),
    ],
  },
  {
    id: "move",
    title: t("move_your_body"),
    color: "bg-pastel-sky",
    colorDeep: "bg-pastel-sky-deep",
    colorVar: "--pastel-sky",
    steps: [
      t("stretch_gently"),
      t("roll_your_shoulders"),
      t("shift_your_weight_from_side_to_side"),
      t("notice_how_your_body_feels_as_it_moves"),
    ],
  },
  {
    id: "listen",
    title: t("listen_to_your_surroundings"),
    color: "bg-pastel-mauve",
    colorDeep: "bg-pastel-mauve-deep",
    colorVar: "--pastel-mauve",
    steps: [
      t("pause_and_listen"),
      t("identify_three_distinct_sounds"),
      t("are_they_near_or_far"),
      t("let_your_attention_rest_on_each_one"),
    ],
  },
  {
    id: "body",
    title: t("check_in_with_your_body"),
    color: "bg-pastel-sand",
    colorDeep: "bg-pastel-sand-deep",
    colorVar: "--pastel-sand",
    steps: [
      t("close_your_eyes_if_comfortable"),
      t("scan_from_head_to_toe"),
      t("notice_areas_of_tension_or_ease"),
      t("breathe_into_any_tightness"),
    ],
  },
];
