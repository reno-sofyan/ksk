import React from 'react';
import { imageUrl } from '@/lib/assets.js';
import { RIVERE_DESIGN_IMAGES } from '@/data/rivereImages.js';

const HeroShell = () => {
  return (
    <section className="relative min-h-[620px] bg-[#10382b] text-white sm:min-h-[700px]">
      <div className="absolute inset-0">
        <img
          src={imageUrl(RIVERE_DESIGN_IMAGES[0].file)}
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
            Lebih dari investasi properti: kost berkonsep resort di Ring 1 IPB, hanya 2 menit dari gerbang utama dan bebas macet.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold uppercase tracking-normal text-[#d0ad5a] sm:text-base">
            The New Standard of Smart Property Investment
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
