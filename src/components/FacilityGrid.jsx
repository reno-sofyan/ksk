
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Church as Mosque, Shirt, ParkingCircle, Coffee, UtensilsCrossed, 
  ShoppingCart, ShoppingBasket as Basketball, Users, Leaf, Sofa, 
  Tv, Wind, Droplet, ChefHat, Refrigerator, Wifi, Wrench, 
  ShoppingBag, Hotel as Hospital, Stethoscope, Dribbble, Circle 
} from 'lucide-react';
import IconCircle from '@/components/IconCircle.jsx';
import { cn } from '@/lib/utils.js';

const iconMap = {
  Mosque, Shirt, ParkingCircle, Coffee, UtensilsCrossed, ShoppingCart, 
  Basketball, Users, Leaf, Sofa, Tv, Wind, Droplet, ChefHat, 
  Refrigerator, Wifi, Wrench, ShoppingBag, Hospital, Stethoscope, 
  Dribbble, Circle
};

const bgColors = [
  "bg-slate-50", "bg-gray-50", "bg-zinc-50", "bg-neutral-50",
  "bg-stone-50"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const FacilityGrid = ({ facilities, columns = 4, showImages = false }) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("grid gap-4 md:gap-6", gridCols[columns])}
    >
      {facilities.map((facility, index) => {
        const Icon = iconMap[facility.icon] || Circle;
        const colorClass = bgColors[index % bgColors.length];
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl sm:p-6"
          >
            {/* Subtle Gradient Background Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {showImages && facility.image && (
              <div className="relative mb-5 h-32 w-full overflow-hidden rounded-xl shadow-md sm:mb-6 sm:h-40">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <img 
                  src={facility.image} 
                  alt={facility.label}
                  loading="lazy"
                  className={cn(
                    "w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110",
                    facility.imageClassName
                  )} 
                />
              </div>
            )}

            <IconCircle 
              icon={Icon} 
              className={cn("mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary", colorClass)}
              iconClassName="text-primary group-hover:text-accent transition-colors duration-300"
            />
            
            <h4 className="text-sm font-semibold text-center text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
              {facility.label}
            </h4>
            
            {facility.description && (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground text-center sm:text-sm">
                {facility.description}
              </p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FacilityGrid;
