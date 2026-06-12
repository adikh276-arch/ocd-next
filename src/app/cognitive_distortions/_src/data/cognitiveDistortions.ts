import illustrationUncertainty from "../assets/illustration-uncertainty.png";
import illustrationResponsibility from "../assets/illustration-responsibility.png";
import illustrationThoughtFusion from "../assets/illustration-thought-fusion.png";
import illustrationThreat from "../assets/illustration-threat.png";
import illustrationEmotions from "../assets/illustration-emotions.png";
import illustrationPerfectionism from "../assets/illustration-perfectionism.png";
import illustrationControl from "../assets/illustration-control.png";
import illustrationCatastrophize from "../assets/illustration-catastrophize.png";
import illustrationBlackwhite from "../assets/illustration-blackwhite.png";
import illustrationMoral from "../assets/illustration-moral.png";
import illustrationReassurance from "../assets/illustration-reassurance.png";
import illustrationMagnification from "../assets/illustration-magnification.png";
import illustrationResilience from "../assets/illustration-resilience.png";
import illustrationJumping from "../assets/illustration-jumping.png";
import illustrationRules from "../assets/illustration-rules.png";

export interface CognitiveDistortion {
  id: number;
  icon: string;
  title: string;
  description: string;
  exampleThought: string;
  alternativeThought: string;
  illustration: any;
}

export const cognitiveDistortions: CognitiveDistortion[] = [
  {
    id: 1,
    icon: "cloud",
    title: "intolerance_of_uncertainty",
    description: "difficulty_sitting_with_not_knowing",
    exampleThought: "What if I didn't lock the door properly?",
    alternativeThought: "I may never feel fully certain — and I can still move forward.",
    illustration: illustrationUncertainty,
  },
  {
    id: 2,
    icon: "scale",
    title: "inflated_responsibility",
    description: "feeling_overly_responsible_for_preventing_harm",
    exampleThought: "If anything goes wrong, it will be my fault.",
    alternativeThought: "I can care about outcomes without being responsible for everything.",
    illustration: illustrationResponsibility,
  },
  {
    id: 3,
    icon: "merge",
    title: "thoughtaction_fusion",
    description: "believing_thoughts_equal_actions_or_intentions",
    exampleThought: "If I think about harming someone, it means I might do it.",
    alternativeThought: "Thoughts are mental events — not intentions or actions.",
    illustration: illustrationThoughtFusion,
  },
  {
    id: 4,
    icon: "alert",
    title: "overestimation_of_threat",
    description: "assuming_danger_is_certain_or_extreme",
    exampleThought: "If I touch this surface, I'll definitely get sick.",
    alternativeThought: "There may be some risk — and I don't need perfect safety to continue.",
    illustration: illustrationThreat,
  },
  {
    id: 5,
    icon: "heart",
    title: "emotional_reasoning",
    description: "treating_feelings_as_proof_of_danger",
    exampleThought: "It feels wrong, so something must be wrong.",
    alternativeThought: "Feelings can be uncomfortable without meaning danger.",
    illustration: illustrationEmotions,
  },
  {
    id: 6,
    icon: "target",
    title: "perfectionism__just-right_thinking",
    description: "needing_things_to_feel_complete_or_exact",
    exampleThought: "It doesn't feel complete. I need to redo it.",
    alternativeThought: "It doesn't have to feel perfect for me to stop.",
    illustration: illustrationPerfectionism,
  },
  {
    id: 7,
    icon: "lock",
    title: "need_for_control",
    description: "trying_to_prevent_all_uncertainty",
    exampleThought: "I need to prevent every possible mistake.",
    alternativeThought: "I can influence some things — not control everything.",
    illustration: illustrationControl,
  },
  {
    id: 8,
    icon: "mountain",
    title: "catastrophizing",
    description: "expecting_worst-case_outcomes",
    exampleThought: "If this goes wrong, everything will fall apart.",
    alternativeThought: "Even if something goes wrong, I can handle it step by step.",
    illustration: illustrationCatastrophize,
  },
  {
    id: 9,
    icon: "puzzle",
    title: "black-and-white_thinking",
    description: "seeing_things_as_all-or-nothing",
    exampleThought: "If I'm not completely certain, it's totally unsafe.",
    alternativeThought: "Certainty isn't all-or-nothing.",
    illustration: illustrationBlackwhite,
  },
  {
    id: 10,
    icon: "mask",
    title: "moral_perfectionism",
    description: "judging_character_based_on_thoughts",
    exampleThought: "If I had that thought, I must be a bad person.",
    alternativeThought: "Having a thought doesn't define my character.",
    illustration: illustrationMoral,
  },
  {
    id: 11,
    icon: "loop",
    title: "reassurance_dependence",
    description: "seeking_certainty_from_others",
    exampleThought: "I just need someone to tell me it's okay.",
    alternativeThought: "I can practice sitting with doubt instead of seeking certainty.",
    illustration: illustrationReassurance,
  },
  {
    id: 12,
    icon: "expand",
    title: "magnification",
    description: "making_mistakes_feel_catastrophic",
    exampleThought: "If I make one mistake, it will be a disaster.",
    alternativeThought: "This feels big — but it may not be as catastrophic as my mind predicts.",
    illustration: illustrationMagnification,
  },
  {
    id: 13,
    icon: "shrink",
    title: "minimization",
    description: "underestimating_ability_to_cope",
    exampleThought: "If something goes wrong, I won't handle it.",
    alternativeThought: "I've handled difficult situations before.",
    illustration: illustrationResilience,
  },
  {
    id: 14,
    icon: "jump",
    title: "jumping_to_conclusions",
    description: "assuming_outcomes_without_full_information",
    exampleThought: "They didn't reply — something must be wrong.",
    alternativeThought: "I don't have all the information yet.",
    illustration: illustrationJumping,
  },
  {
    id: 15,
    icon: "rules",
    title: "should__must_statements",
    description: "rigid_internal_rules_about_certainty_or_perfection",
    exampleThought: "I must never make mistakes.",
    alternativeThought: "Mistakes and uncertainty are part of being human.",
    illustration: illustrationRules,
  },
];
