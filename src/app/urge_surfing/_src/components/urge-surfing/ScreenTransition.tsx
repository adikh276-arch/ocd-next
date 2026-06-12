import { ReactNode, useEffect, useState } from "react";

interface ScreenTransitionProps {
  screenKey: string;
  children: ReactNode;
}

const ScreenTransition = ({ screenKey, children }: ScreenTransitionProps) => {
  
  const [phase, setPhase] = useState<"enter" | "visible">("enter");

  useEffect(() => {
    setPhase("enter");
    const t = setTimeout(() => setPhase("visible"), 620);
    return () => clearTimeout(t);
  }, [screenKey]);

  return (
    <div
      key={screenKey}
      className={phase === "enter" ? "screen-fade-enter" : ""}
      style={{ minHeight: "100%" }}
    >
      {children}
    </div>
  );
};

export default ScreenTransition;
