import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="flex-1 w-full flex flex-col bg-white overflow-hidden relative min-h-screen">
      {children}
    </div>
  );
};

export default PhoneFrame;
