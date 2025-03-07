<template>
  <footer class="bg-slate-900 text-slate-200 pt-12 pb-8 font-amblelight">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Contact Information -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-[#ffcc00]">Contact</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <i class="fa-solid fa-envelope mr-3 text-[#ffcc00]"></i>
              <a href="mailto:rob@blaeu.com" class="hover:text-[#ffcc00] transition-colors">
                rob@blaeu.com
              </a>
            </li>
            <li class="flex items-center">
              <i class="fa-brands fa-mastodon mr-3 text-[#ffcc00]"></i>
              <a href="https://mastodon.nl/@rvaneijk" rel="me" target="_blank" class="hover:text-[#ffcc00] transition-colors">
                @rvaneijk@mastodon.nl&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
            <li class="flex items-center">
              <i class="fa-brands fa-linkedin mr-3 text-[#ffcc00]"></i>
              <a href="https://www.linkedin.com/in/rvaneijk88" target="_blank" class="hover:text-[#ffcc00] transition-colors">
                rvaneijk88&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
            <li class="flex items-center">
              <i class="fa-solid fa-building mr-3 text-[#ffcc00]"></i>
              <a href="/" class="hover:text-[#ffcc00] transition-colors">
                Blaeu Privacy Response Team&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Resources -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-[#ffcc00]">Resources</h3>
          <ul class="space-y-3">
            <li>
              <a href="https://fpf.org/person/rob-van-eijk/" target="_blank" class="hover:text-[#ffcc00] transition-colors flex items-center">
                <i class="fa-solid fa-blog mr-3 text-[#ffcc00]"></i>
                Articles @FPF&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
            <li>
              <a href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ" target="_blank" class="hover:text-[#ffcc00] transition-colors flex items-center">
                <i class="fa-solid fa-graduation-cap mr-3 text-[#ffcc00]"></i>
                Academic Publications&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/rvaneijk/blaeu.com" target="_blank" class="hover:text-[#ffcc00] transition-colors flex items-center">
                <i class="fa-brands fa-github mr-3 text-[#ffcc00]"></i>
                Website Repository&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
            <li>
              <a href="https://orcid.org/0000-0002-2203-6819" target="_blank" class="hover:text-[#ffcc00] transition-colors flex items-center">
                <i class="fa-brands fa-orcid mr-3 text-[#ffcc00]"></i>
                ORCID&nbsp;<i class="fa-solid fa-external-link fa-xs"></i>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- About -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-[#ffcc00]">Professional Roles</h3>
          <p class="mb-4 leading-relaxed">
            I currently serve in dual professional capacities: as Managing Director Europe at the Future of Privacy Forum (FPF) and as Founder of Blaeu Privacy Response Team.
          </p>
          <p class="mb-4 leading-relaxed">
            My work bridges privacy policy development with practical implementation, providing strategic guidance on data protection, privacy engineering, and ethical technology deployment.
          </p>
          <div class="mt-6">
            <a href="mailto:rob@blaeu.com" class="bg-[#ffcc00] hover:bg-blue-600 text-black hover:text-white font-medium px-4 py-2 rounded-md transition-colors inline-flex items-center">
              <i class="fa-solid fa-envelope mr-2"></i> Get in touch
            </a>
          </div>
        </div>
      </div>

      <!-- Horizontal line before copyright -->
      <hr class="border-gray-700 mb-8" />
      
      <!-- Copyright and disclaimer -->
      <div>
        <div class="text-xs text-gray-300">
          <p class="mb-2">
            <span class="font-semibold">© 2025 Rob van Eijk</span> • Personal content is licensed under CC BY 4.0 unless otherwise noted.
          </p>

          <p>
            Opinions expressed are my own and do not necessarily reflect the views of the Future of Privacy Forum or other affiliated organizations. For Blaeu Privacy Response Team's company information, please visit <a href="/" class="text-[#ffcc00] hover:underline">blaeu.com <i class="fa-solid fa-external-link fa-xs"></i></a>.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// The dynamic year is handled through the template expression {{ new Date().getFullYear() }}
// No additional script needed for basic functionality
</script>