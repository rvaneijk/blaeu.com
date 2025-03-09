// tw-Services.vue
<template>
  <section id="expertise" class="py-16 bg-gray-50 font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Our Expertise & Services</h2>
      
      <!-- Brief introduction to services -->
      <div class="max-w-3xl mx-auto mb-12 text-center">
        <p class="text-lg mb-4">
          Team Blaeu provides specialized consulting on the legal aspects of data architectures, complex data flows, and privacy-enhancing technologies.
        </p>
        <p class="text-md text-gray-600">
          Our approach combines regulatory experience, technical precision, and business pragmatism to deliver solutions that work in real-world environments.
        </p>
      </div>
      
      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Service 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Privacy Compliance Assessments</h3>
          <p>Comprehensive evaluation of your data operations against GDPR, ePrivacy, Data Act, AI Act, and (other) emerging regulations. We identify compliance gaps and provide practical, prioritized recommendations tailored to your risk profile.</p>
        </div>
        
        <!-- Service 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Privacy by Design Implementation</h3>
          <p>Expert guidance on designing privacy-compliant data architectures that satisfy both legal requirements and business objectives. We help implement Privacy-Enhancing Technologies (PETs) to create robust competitive advantages.</p>
        </div>
        
        <!-- Service 3 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Technical Expert in legal proceedings</h3>
          <p>Drawing on our regulatory experience, we help translate complex technical implementations into clear legal explanations. We act as a technical expert in court to substantiate technical assertions.</p>
        </div>
        
        <!-- Service 4 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Executive & Board Training</h3>
          <p>Customized training for leadership teams and board members on privacy governance, risk management, and emerging regulatory landscape. We deliver actionable insights that enable informed strategic decision-making.</p>
        </div>
        
        <!-- Service 5 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Advanced Impact Assessments</h3>
          <p>Comprehensive Data Protection Impact Assessments (DPIAs) and evaluations for high-risk processing activities, AI systems, and emerging technologies. Our methodology combines rigorous legal analysis with technical expertise.</p>
        </div>
        
        <!-- Service 6 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Privacy Program Development</h3>
          <p>Creation of comprehensive privacy governance frameworks tailored to your organization's risk profile, business model, and technological ecosystem. We design scalable programs that mature with your organization.</p>
        </div>
      </div>
      
      <!-- Call to action -->
      <div class="text-center mt-12">
        <a href="mailto:info@blaeu.com" class="inline-flex items-center bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
          <i class="fa-solid fa-envelope mr-2"></i> Request a Consultation
        </a>
      </div>
    </div>
  </section>
</template>