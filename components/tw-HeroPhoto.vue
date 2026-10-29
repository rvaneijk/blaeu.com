<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-HeroPhoto
  @description Homepage hero: offer and calls to action on navy, portrait on the right
  (above the text on phones). Photo used with permission of the EDPS (credit required).
-->
<template>
  <section
    aria-labelledby="hero-heading"
    class="relative bg-gray-900 text-white font-sourcesans3 md:h-[480px]"
  >
    <figure class="relative md:absolute md:inset-y-0 md:right-0 md:w-[45%] xl:w-[600px]">
      <picture>
        <source
          media="(max-width: 767px)"
          srcset="/assets/img/hero-portrait-mobile.webp"
          type="image/webp"
        />
        <source media="(max-width: 767px)" srcset="/assets/img/hero-portrait-mobile.jpg" />
        <source srcset="/assets/img/hero-portrait.webp" type="image/webp" />
        <img
          src="/assets/img/hero-portrait.jpg"
          alt="Rob van Eijk moderating a panel at Data Protection Day 2026 in Brussels"
          width="1200"
          height="960"
          fetchpriority="high"
          class="w-full h-60 sm:h-72 md:h-full object-cover object-[70%_25%] md:object-[50%_25%]"
        />
      </picture>
      <div
        class="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"
        aria-hidden="true"
      ></div>
      <figcaption
        class="px-4 pt-2 text-xs leading-snug text-gray-400 md:absolute md:bottom-2 md:right-9 md:max-w-[90%] md:px-1.5 md:py-0.5 md:text-xs md:rounded md:bg-black/55 md:text-gray-100 md:text-right"
      >
        <span class="block md:sr-only">Moderating at Data Protection Day 2026, Brussels</span>
        <span class="block">Photo: @EDPS Hadrien Duré</span>
      </figcaption>
    </figure>

    <div class="relative container mx-auto px-4 md:h-full flex items-center py-10 md:py-0">
      <div class="md:pl-4 md:max-w-[52%] xl:max-w-2xl">
        <p class="text-lg text-gray-300 mb-2">Rob van Eijk</p>
        <h1
          id="hero-heading"
          class="text-3xl md:text-4xl lg:text-[2.6rem] font-semibold leading-tight mb-4"
        >
          AI, Privacy &amp; EU Regulatory Affairs
        </h1>
        <p class="text-lg text-gray-200 leading-relaxed mb-8">
          Expert witness and regulatory strategy from a former Dutch DPA technologist.
        </p>
        <div class="flex flex-wrap gap-3">
          <a
            href="mailto:team@blaeu.com?subject=Scoping%20call"
            aria-label="Book a scoping call by email (team@blaeu.com)"
            class="no-hover inline-flex items-center px-5 py-2.5 bg-brand-gold text-black font-semibold rounded shadow-md hover:bg-white transition-colors duration-200"
          >
            <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
            Book a scoping call
          </a>
          <NuxtLink
            to="/portfolio/"
            class="no-hover inline-flex items-center px-5 py-2.5 border border-white text-white font-semibold rounded hover:bg-white hover:text-black transition-colors duration-200"
          >
            See track record
          </NuxtLink>
        </div>
        <p class="mt-3 text-sm text-gray-300">Opens your email app: team@blaeu.com</p>
      </div>
    </div>
  </section>
</template>
