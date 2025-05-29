// tw-Services.vue
<template>
  <section id="expertise" class="py-4 bg-gray-50 font-amblelight">
    <div class="container mx-auto px-4">
          
      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1: Expert Witness -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">🏛️ Expert Witness & Legal Advisory</h3>
          <p>We help courts and lawyers understand complex technology systems by explaining how they work in clear, understandable terms for legal proceedings and regulatory decisions.</p>
        </div>
        
        <!-- Service 2: Red Team -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">🔴 Red Team AI Security Testing</h3>
          <p>We act like "ethical hackers" to find weaknesses in AI privacy protections before bad actors can exploit them. This includes testing systems that protect personal data and learning algorithms to ensure they're truly secure.</p>
        </div>
        
        <!-- Service 3: Blue Team -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">🔵 Blue Team AI Security Partnerships</h3>
          <p>We work with organizations to build stronger privacy protections into their AI systems in two ways: (1) Creating measurement tools to assess privacy risks and ensure AI systems are deployed safely (2) Building communication rules for when agentic AI systems talk to each other, ensuring privacy and security aren't compromised as these systems become more autonomous.</p>
        </div>
      </div>
            
    </div>
  </section>
</template>