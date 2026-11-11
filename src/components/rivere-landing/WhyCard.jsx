import React from 'react';
import { cn } from '@/lib/utils.js';

const WhyCard = ({ number, eyebrow, title, description, className }) => (
  <div className={cn('rounded-2xl border border-[#1E2B20]/10 p-6', className)}>
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8CA294] text-sm font-bold text-white">
      {number}
    </span>
    <p className="mt-4 text-sm font-semibold text-[#1E2B20]/70">{eyebrow}</p>
    <h3 className="mt-1 text-lg font-bold leading-snug text-[#1E2B20]">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-[#1E2B20]/65">{description}</p>
  </div>
);

export default WhyCard;
