import React from 'react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { cn } from '@/lib/utils.js';

const DocPhotoCard = ({ src, alt, title, description, className, imgClassName }) => (
  <figure className={cn('min-w-0', className)}>
    <div className="overflow-hidden rounded-2xl">
      <ResponsiveImage
        src={src}
        alt={alt}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </div>
    <figcaption className="mt-3">
      <p className="text-sm font-bold text-[#1E2B20]">{title}</p>
      <p className="text-xs text-[#1E2B20]/60">{description}</p>
    </figcaption>
  </figure>
);

export default DocPhotoCard;
