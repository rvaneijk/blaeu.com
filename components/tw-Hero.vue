<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!-- 
  @component tw-Hero
  @description Hero section component displaying profile information with responsive layout.
  Features a profile image, name, title, and a brief introduction with social links.
  Designed with a clean, executive appearance using Tailwind CSS.
  @example
  <tw-Hero />
-->
<template>
  <section id="profile" class="pt-8 pb-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <!-- Profile Image - More subtle styling and smaller size -->
        <div class="md:w-1/4 mb-8 md:mb-0">
          <div class="relative">
            <div
              class="absolute inset-0 bg-brand-blue rounded-lg transform rotate-2 scale-105 opacity-5"
            ></div>
            <NuxtImg
              src="/assets/img/tiny_welcome.webp"
              alt="Rob van Eijk - Privacy Executive & Strategic Technology Leader"
              class="relative block overflow-hidden rounded-lg shadow-md w-full h-auto object-cover"
              format="webp"
              quality="90"
              :width="288"
              :height="291"
              sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
              fetchpriority="high"
              loading="eager"
            />
          </div>
        </div>

        <!-- Profile Info - Enhanced for executive positioning -->
        <div class="md:w-3/4 md:pl-12">
          <h1 class="font-big-john text-4xl md:text-5xl font-bold text-gray-800 mb-5">
            ROB VAN EIJK
          </h1>
          <div class="w-16 h-1 bg-brand-blue mb-8 opacity-80"></div>

          <h2 class="text-xl md:text-2xl text-gray-700 mb-5 font-amblelight leading-relaxed">
            <span class="font-medium">
              Data Privacy Expert | EU Data Protection & AI Governance | PhD | Quoted: NYT,
              Bloomberg, POLITICO
            </span>
          </h2>

          <!-- Executive Qualifications Summary -->
          <div class="mb-8 bg-gray-50 p-5 rounded-lg border-l-4 border-brand-grey shadow-sm">
            <p class="text-gray-700 text-base leading-relaxed">
              Experienced in leading organizational change and managing high-level stakeholder
              relationships across the EU. Building bridges between technical, legal, and business
              domains for
              <span class="font-medium">Fortune 500 companies</span>
              , startups, and regulatory bodies.
            </p>
          </div>

          <!-- My Approach to Privacy Leadership -->
          <div class="bg-gray-50 p-5 rounded-lg border-l-4 border-brand-grey shadow-sm mb-6">
            <h3 class="text-2xl font-semibold mb-6 text-gray-800">
              My Approach to Privacy Leadership
            </h3>
            <p class="text-gray-700 text-base leading-relaxed">
              I approach privacy challenges by integrating technical understanding with regulatory
              expertise, creating solutions that balance innovation with fundamental rights
              protection.
            </p>
            <p class="text-gray-700 text-base leading-relaxed">
              I also plan from an end-user's perspective with key questions: What are the privacy
              issues? What is the privacy component? These give us a focused starting point to
              identify and assess risks and explore technical, organizational, and contractual
              mitigations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
