<!-- 
  @component tw-Hero
  @description Hero section component displaying profile information with responsive layout.
  Features a profile image, name, title, and a brief introduction with social links.
  Designed with a clean, executive appearance using Tailwind CSS.
  @example
  <tw-Hero />
-->
<template>
  <section id="profile" class="py-4 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <!-- Profile Image - More subtle styling and smaller size -->
        <div class="md:w-1/4 mb-8 md:mb-0">
          <div class="relative">
            <div class="absolute inset-0 bg-blue-600 rounded-lg transform rotate-2 scale-105 opacity-5"></div>
            <picture class="relative block overflow-hidden rounded-lg shadow-md">
              <source srcset="/assets/img/tiny_welcome.webp" type="image/webp">
              <img 
                alt="Rob van Eijk - Privacy Executive & Strategic Technology Leader" 
                class="w-full h-auto object-cover" 
                src="/assets/img/tiny_welcome.png"
              >
            </picture>
          </div>
        </div>
        
        <!-- Profile Info - Enhanced for executive positioning -->
        <div class="md:w-3/4 md:pl-12">
          <h2 class="font-big-john text-4xl md:text-5xl font-bold text-gray-800 mb-5">
            ROB VAN EIJK
          </h2>
          <div class="w-16 h-1 bg-blue-600 mb-8 opacity-80"></div>
          
          <h2 class="text-xl md:text-2xl text-gray-700 mb-5 font-amblelight leading-relaxed">
            <span class="font-medium">Founder & Principal, Team Blaeu | Senior Fellow, Future of Privacy Forum | PhD</span>
          </h2>
          
          <!-- Executive Qualifications Summary -->
          <div class="mb-8 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 shadow-sm">
            <p class="text-gray-700 text-base leading-relaxed">
              Experienced in leading organizational change and managing high-level stakeholder relationships across the EU. 
              Building bridges between technical, legal, and business domains for <span class="font-medium">Fortune 500 companies</span>, startups, and regulatory bodies.
            </p>
          </div>

          <!-- Executive Qualifications Summary -->
          <div class="mb-8 bg-blue-100 p-5 rounded-lg border-l-4 border-blue-600 shadow-sm">
		  <h3 class="text-2xl font-semibold mb-6 text-gray-800">My Approach to Privacy Leadership</h3>
            <p class="text-gray-700 text-base leading-relaxed">
              I approach privacy challenges by integrating technical understanding with regulatory expertise, 
          creating solutions that balance innovation with fundamental rights protection.
            </p>
            <p class="text-gray-700 text-base leading-relaxed">
              I also plan from an end-user's perspective with key questions: What are the privacy issues? What is the privacy component? These give us a focused starting point to identify and assess risks and explore technical, organizational, and contractual mitigations.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>