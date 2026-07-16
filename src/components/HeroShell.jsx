import React from 'react';
import { withBase } from '@/lib/assets.js';

const HeroShell = () => {
  return (
    <section className="relative min-h-[620px] bg-[#10382b] text-white sm:min-h-[700px]">
      <div className="absolute inset-0">
        <img
          src={withBase('images/optimized/coz-1-edit/1200.jpg')}
          srcSet={[
            `${withBase('images/optimized/coz-1-edit/480.jpg')} 480w`,
            `${withBase('images/optimized/coz-1-edit/768.jpg')} 768w`,
            `${withBase('images/optimized/coz-1-edit/1200.jpg')} 1200w`,
            `${withBase('images/optimized/coz-1-edit/1600.jpg')} 1600w`,
            `${withBase('images/optimized/coz-1-edit/1920.jpg')} 1920w`
          ].join(', ')}
          sizes="100vw"
          alt="Rivere Kostaycation IPB hero"
          className="h-full w-full object-cover"
          width="1200"
          height="675"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041912]/95 via-[#082a1f]/60 to-[#082a1f]/25" />
      </div>

      <div className="relative z-10 flex min-h-[620px] items-center justify-center px-4 pt-24 text-center sm:min-h-[700px] sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-sm font-semibold text-[#d0ad5a] sm:text-base">
            Rivere Kostaycation IPB
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
            Rivere <span className="bg-gradient-to-r from-white to-[#d0ad5a] bg-clip-text text-transparent">Kostaycation IPB</span>
          </h1>
          <p className="text-lg font-medium text-white/90 sm:text-xl md:text-3xl">
            Investasi properti premium berkonsep resort di Ring 1 IPB, hanya 2 menit dari gerbang utama dan bebas macet.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1">
        <svg viewBox="0 0 1440 120" className="h-[60px] w-full fill-background md:h-[120px]" preserveAspectRatio="none">
          <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroShell;
