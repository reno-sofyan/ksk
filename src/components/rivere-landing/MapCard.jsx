import React from 'react';
import { ZoomIn } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';
import { cn } from '@/lib/utils.js';

const MapCard = ({ className }) => (
  <div className={cn('overflow-hidden rounded-2xl bg-[#1a1420]', className)}>
    <ResponsiveImage
      src={imageUrl('rivere/landing/perbesar denah.png')}
      alt="Denah lokasi Rivere Staycation di kawasan terintegrasi Gerbang IPB"
      className="w-full object-cover"
    />
    <button
      type="button"
      className="flex w-full items-center justify-between px-4 py-3 text-xs font-medium text-white/80 transition-colors hover:text-white"
    >
      Perbesar denah lokasi Rivere Staycation
      <ZoomIn className="h-4 w-4" />
    </button>
  </div>
);

export default MapCard;
