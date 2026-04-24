import React from 'react';

const GradientText = ({ children, className, from = 'from-primary', to = 'to-accent', via }) => {
  return (
    <span 
      className={[
        'bg-gradient-to-r bg-clip-text text-transparent',
        from,
        via,
        to,
        className
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  );
};

export default GradientText;
