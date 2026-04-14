import React from 'react';
import { cn } from '@/lib/utils.js';

const GradientText = ({ children, className, from = 'from-primary', to = 'to-accent', via }) => {
  return (
    <span 
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;