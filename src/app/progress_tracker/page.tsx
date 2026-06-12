"use client";
import React from "react";
import { SobrietyTracker } from "../dashboard_components/SobrietyTracker";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ChevronLeft size={20} />
          Back to Dashboard
        </button>
        <SobrietyTracker />
      </div>
    </div>
  );
}
