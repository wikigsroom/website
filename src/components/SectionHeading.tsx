import { ReactNode } from 'react';

const SectionHeading = ({ title, description }: { title: string; description?: ReactNode }) => (
  <div className="mb-8">
    <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan/90">{title}</p>
    {description ? (
      <p className="mt-3 max-w-2xl text-sm text-white/70">{description}</p>
    ) : null}
  </div>
);

export default SectionHeading;
