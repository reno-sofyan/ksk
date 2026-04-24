import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';

const ProjectShowcaseSlider = ({ slides, interval = 4500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides?.length || slides.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides, interval]);

  if (!slides?.length) {
    return null;
  }

  const activeSlide = slides[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:rounded-[2rem] sm:shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:aspect-[16/7]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <ResponsiveImage
              src={activeSlide.image}
              alt={activeSlide.title}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 80vw, 100vw"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent/90 sm:text-sm sm:tracking-[0.28em]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
          <h3 className="mt-2 max-w-2xl text-xl font-bold leading-tight text-white sm:mt-3 sm:text-2xl md:text-4xl">
            {activeSlide.title}
          </h3>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/25 p-2.5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-4 sm:p-3"
          aria-label="Previous project slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/25 p-2.5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-4 sm:p-3"
          aria-label="Next project slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      <div className="border-t border-border/60 bg-card px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
        <div className="flex items-center justify-center gap-2 md:justify-end">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                index === currentIndex ? 'w-10 bg-accent' : 'w-2 bg-primary/20 hover:bg-primary/40'
              }`}
              aria-label={`Go to project slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcaseSlider;
