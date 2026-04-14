import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt={`Luxury Resort Imagery ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:p-3"
        aria-label="Previous image slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:p-3"
        aria-label="Next image slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="no-scrollbar absolute bottom-4 left-1/2 z-20 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-black/20 px-3 py-2 backdrop-blur-md sm:bottom-10 sm:max-w-[calc(100%-3rem)] sm:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 flex-none rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === currentIndex
                ? 'w-8 bg-white opacity-100 sm:w-10'
                : 'w-2 bg-white/40 opacity-50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
