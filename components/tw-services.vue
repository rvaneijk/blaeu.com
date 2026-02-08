<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-Services.vue
<template>
  <section id="expertise" class="py-4 bg-gray-50 font-amblelight scroll-mt-16">
    <div class="container mx-auto px-4">
      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1: Expert Witness -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-brand-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Expert Witness & Legal Advisory</h3>
          <p>
            We help courts and lawyers understand complex technology systems by explaining how they
            work in clear, understandable terms for legal proceedings and regulatory decisions.
          </p>
        </div>

        <!-- Service 2: Red Team -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            🔴
          </div>
          <h3 class="text-xl font-semibold mb-2">Red Team AI Testing</h3>
          <p>
            We act like "ethical hackers" to find weaknesses in AI privacy protections before bad
            actors can exploit them. This includes testing systems that protect personal data and
            learning algorithms to ensure they're truly secure.
          </p>
        </div>

        <!-- Service 3: Blue Team -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            🔵
          </div>
          <h3 class="text-xl font-semibold mb-2">Blue Team AI Security Partnerships</h3>
          <p>
            We work with organizations to build stronger privacy protections into their AI systems
            in two ways: (1) Creating measurement tools to assess privacy risks and ensure AI
            systems are deployed safely, (2) Building communication rules for when agentic AI
            systems talk to each other, ensuring privacy and security aren't compromised as these
            systems become more autonomous.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
