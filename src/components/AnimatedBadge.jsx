import React from 'react';

const AnimatedBadge = ({ text, className }) => {
  return (
    <div
      className={[
        'animate-badge-glow inline-flex items-center rounded-full border border-accent/35 bg-primary px-3 py-1 text-xs font-bold text-accent shadow-md',
        className
      ].filter(Boolean).join(' ')}
    >
      {text}
    </div>
  );
};

export default AnimatedBadge;
