import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import AnimatedBadge from '@/components/AnimatedBadge.jsx';
import GradientText from '@/components/GradientText.jsx';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';

const UnitCard = ({ type, description, oldPrice, newPrice, features = [], image, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full flex"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, index % 2 === 0 ? 0.35 : -0.35, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: "easeInOut",
          delay: index * 0.35,
        }}
        className="w-full"
      >
      <Card className="group w-full flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-transparent bg-card hover-lift hover:border-primary/20 sm:rounded-3xl">
        
        {/* Image Header */}
        <div className="relative h-52 overflow-hidden sm:h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <ResponsiveImage 
            src={image || imageUrl('COZ-1-edit.jpg')} 
            alt={`Unit Type ${type}`}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4">
            <AnimatedBadge text="Special Offer" className="text-[10px] sm:text-xs" />
          </div>
          <div className="absolute bottom-4 left-4 z-20 sm:left-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{type}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 sm:p-8">
          <p className="mb-6 text-base font-medium leading-snug text-muted-foreground sm:text-lg">
            {description}
          </p>
          
          <div className="mb-8 space-y-4 rounded-xl bg-secondary/50 p-5 sm:rounded-2xl sm:p-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Harga Normal
              </p>
              <p className="text-lg text-muted-foreground/60 line-through font-medium">
                {oldPrice}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                Harga Promo
              </p>
              <div className="flex items-baseline gap-2">
                <GradientText className="text-4xl font-black tracking-tighter sm:text-5xl">
                  {newPrice}
                </GradientText>
              </div>
            </div>
          </div>

          {/* Features List */}
          {features.length > 0 && (
            <div className="space-y-3 mt-auto border-t border-border pt-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary font-bold" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80 sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
      </motion.div>
    </motion.div>
  );
};

export default UnitCard;
