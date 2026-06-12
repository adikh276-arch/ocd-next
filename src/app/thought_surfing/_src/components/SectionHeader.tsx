interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="bg-section-header rounded-sm px-4 py-1.5 mb-4">
    <h2 className="font-display text-section-header-foreground text-lg font-medium tracking-wide">
      {title}
    </h2>
  </div>
);

export default SectionHeader;
