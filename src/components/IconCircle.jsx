
import React from 'react';
import { cn } from '@/lib/utils.js';

const IconCircle = ({ icon: Icon, className, iconClassName, size = 'md' }) => {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-primary/10",
      sizes[size],
      className
    )}>
      <Icon className={cn("text-primary", iconSizes[size], iconClassName)} />
    </div>
  );
};

export default IconCircle;
