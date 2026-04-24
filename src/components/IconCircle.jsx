
import React from 'react';

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
    <div className={[
      'flex items-center justify-center rounded-full bg-primary/10',
      sizes[size],
      className
    ].filter(Boolean).join(' ')}>
      <Icon className={['text-primary', iconSizes[size], iconClassName].filter(Boolean).join(' ')} />
    </div>
  );
};

export default IconCircle;
