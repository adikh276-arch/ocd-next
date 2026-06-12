"use client";

import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function StripWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // List of paths that should NOT be wrapped in the mobile "strip" layout
  const widePaths = ["/", "/hub", "/care-team", "/appointments", "/tasks", "/insights", "/billing", "/plans", "/feedback", "/support", "/profile", "/ocd", "/ocd-self-care", "/health-ocd", "/hoarding-ocd", "/contamination-ocd", "/pure-o-ocd", "/trichotillomania", "/ocd_moments", "/daily_life", "/mood_tracker", "/gratitude_logs", "/vibe_tracker", "/ocd_tips", "/ocd-treatment-guide", "/fear_ladder", "/self_compassion", "/ocd_cycle", "/ocd_success_stories", "/reframe_thoughts", "/reassurance_resistance", "/anxiety_cycle", "/brave_steps", "/clutter_journal", "/cognitive_distortions", "/did_you_know", "/discard_it", "/feelings_fact", "/grounded_techniques", "/guided_imagery", "/hoarding_ocd", "/letter_to_ocd", "/metta_heart_guide", "/mirror_moments", "/one_thing_out", "/pure_ocd", "/quiet-focus-tool", "/response_guide", "/ritual_cost", "/thought_diffusion", "/thought_surfing", "/thought_truth", "/tricho_ocd", "/trigger_map", "/truth_seeker_quiz", "/uncertainity_acceptance", "/uncertainity_tolerance", "/urge_surfing", "/what_is_health_ocd"];
  
  if (widePaths.includes(pathname)) {
    return <main className="min-h-screen relative">{children}</main>;
  }


  // Otherwise, apply the consistent mobile strip layout around the activity
  return (
    <div className="min-h-[100dvh] w-full bg-slate-50/50 flex flex-col items-center relative">
      {/* Universal Floating Back Button */}
      <button 
        onClick={() => {
          if (window.parent !== window) {
            window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
          } else {
            window.location.href = 'https://web.mantracare.com';
          }
        }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-slate-50 hover:shadow-md transition-all active:scale-95"
        aria-label="Exit Activity"
      >
        <ArrowLeft size={20} />
      </button>

      <main className="w-full max-w-[480px] min-h-[100dvh] flex flex-col relative isolate overflow-x-hidden pt-6">
        {children}
      </main>
    </div>
  );
}
