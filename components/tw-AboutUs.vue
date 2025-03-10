// tw-AboutUs.vue
<template>
  <section id="about-us" class="py-16 bg-white font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">About Team Blaeu</h2>
      
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
          <!-- Profile image on the left for medium screens and above -->
          <div class="md:w-1/3">
            <img src="/assets/img/tiny_graph.png" alt="Rob van Eijk - Founder of Blaeu Privacy Response Team (Team Blaeu)" class="rounded-lg shadow-lg w-full max-w-xs mx-auto">
          </div>
          
          <!-- About text with dual role emphasis -->
          <div class="md:w-2/3">
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Leadership & Expertise</h3>
            <p class="text-lg mb-4">
              Blaeu Privacy Response Team (Team Blaeu) was founded by <a href="/rvaneijk" class="text-blue-600 hover:text-[#ffcc00] transition-colors">Dr. Rob van Eijk <i class="fa-solid fa-external-link fa-sm"></i></a>, who also serves as Managing Director Europe at the Future of Privacy Forum. This dual role creates a unique synergy between high-level policy development and practical implementation.
            </p>
            <p class="mb-4">
              Our consultancy leverages van Eijk's extensive experience in regulatory environments, including his tenure at the Dutch Data Protection Authority and work with the European Data Protection Board, to provide clients with strategic insights grounded in real-world regulatory perspectives.
            </p>
            <p>
              We specialize in translating complex privacy and data protection requirements into practical, technically sound solutions that align with both business objectives and regulatory compliance needs.
            </p>
          </div>
        </div>
        
        <!-- Core value proposition boxes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Box 1 -->
          <div class="p-6 bg-gray-50 rounded-lg border-t-4 border-blue-600">
            <h3 class="text-xl font-semibold mb-2">Technical Expertise</h3>
            <p>Advanced understanding of data architectures, tracking technologies, and complex data flows, informed by doctoral-level research and industry experience.</p>
          </div>
          
          <!-- Box 2 -->
          <div class="p-6 bg-gray-50 rounded-lg border-t-4 border-blue-600">
            <h3 class="text-xl font-semibold mb-2">Regulatory Insight</h3>
            <p>Unique perspective on how regulatory authorities approach compliance assessments, enhancing clients' ability to navigate supervisory interactions.</p>
          </div>
          
          <!-- Box 3 -->
          <div class="p-6 bg-gray-50 rounded-lg border-t-4 border-blue-600">
            <h3 class="text-xl font-semibold mb-2">Human-Centric Approach</h3>
            <p>Privacy solutions designed with focus on individual data rights and user experience, creating sustainable compliance frameworks that build trust.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>