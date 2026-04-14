import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

const AnimatedBadge = ({ text, className }) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        boxShadow: [
          "0px 0px 0px rgba(251, 191, 36, 0.4)",
          "0px 0px 15px rgba(251, 191, 36, 0.6)",
          "0px 0px 0px rgba(251, 191, 36, 0.4)"
        ]
      }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold tracking-wider uppercase shadow-md",
        className
      )}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedBadge;