import React from 'react';

const AnimatedBadge = ({ text, className }) => {
  return (
    <div
      className={[
        'animate-badge-glow inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md',
        className
      ].filter(Boolean).join(' ')}
    >
      {text}
    </div>
  );
};

export default AnimatedBadge;
