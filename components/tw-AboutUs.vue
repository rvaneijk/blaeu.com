<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-AboutUs.vue
<template>
  <section id="about-us" class="py-8 bg-white font-amblelight relative z-0">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">About Team Blaeu</h2>

      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
          <!-- Profile image on the left for medium screens and above -->
          <div class="md:w-1/3">
            <picture class="block w-full max-w-xs mx-auto">
              <source srcset="/assets/img/tiny_graph.webp" type="image/webp" />
              <NuxtImg
                src="/assets/img/tiny_graph.png"
                alt="Rob van Eijk - Founder of Team Blaeu (Blaeu Privacy Response Team B.V.)"
                class="rounded-lg shadow-lg w-full"
                preset="profile"
                loading="lazy"
                width="400"
                height="400"
              />
            </picture>
          </div>

          <!-- About text with updated dual role emphasis -->
          <div class="md:w-2/3">
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Leadership & Expertise</h3>
            <p class="text-lg mb-4">
              <a href="/team/rvaneijk" class="hover:text-[#ffcc00] transition-colors !p-0">
                Rob van Eijk
              </a>
              founded Team Blaeu in 2019. We combine deep technical expertise with practical
              regulatory experience to help organizations navigate the complex intersection of
              security, privacy, and autonomy.
            </p>
          </div>
        </div>

        <!-- Summary section -->
        <div class="max-w-3xl mx-auto mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 class="text-xl font-semibold mb-3 text-center">In Simple Terms</h3>
          <p class="text-center text-gray-700">
            Team Blaeu helps in two key ways: explaining complex technology to courts and lawyers,
            and working with organizations to build AI systems that protect security and privacy as
            they become more autonomous.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
