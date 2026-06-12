import React from "react";

interface TagLabelProps {
  children: React.ReactNode;
}

const TagLabel: React.FC<TagLabelProps> = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-tag-bg border border-tag-border text-primary text-[10px] font-body font-semibold uppercase tracking-[0.06em] mb-3">
    {children}
  </span>
);

export default TagLabel;
