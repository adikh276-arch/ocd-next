import React from "react";
import { cn } from "@/app/thought_diffusion/_src/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({ variant = "primary", children, className, ...props }) => (
  <button
    className={cn(
      "w-full py-3.5 rounded-cta text-[14px] font-body font-semibold transition-all duration-200",
      variant === "primary"
        ? "bg-primary text-primary-foreground hover:opacity-90"
        : "bg-background border border-border text-primary hover:bg-secondary",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default CTAButton;
