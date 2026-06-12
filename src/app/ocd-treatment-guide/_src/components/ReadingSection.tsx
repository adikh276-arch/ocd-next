// @ts-nocheck
import { ReactNode } from "react";

interface ReadingSectionProps {
  children: ReactNode;
  ampersand?: boolean;
}

const ReadingSection = ({ children }: ReadingSectionProps) => {
  return (
    <section className="py-10 md:py-14">
      <div>{children}</div>
    </section>
  );
};

export default ReadingSection;
