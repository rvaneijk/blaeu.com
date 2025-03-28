// tw-MediaHighlights.vue
<template>
  <section id="media" class="py-16 bg-gray-50 font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-4 text-center">Media Presence & Thought Leadership</h2>
      
      <div class="max-w-3xl mx-auto mb-10 text-center">
        <p class="text-lg mb-2">
          Recognized expert and influential voice in privacy, data protection, and technology regulation.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Media Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Media Mentions</h3>
          </div>
          <p class="mb-4">Quoted in publications including The New York Times, Bloomberg, POLITICO, Euronews, MLEX, and NOS.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>50+ mentions in major publications</div>
            <div>Coverage in 7+ languages</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">media mentions</span>
            </div>
            <a href="#" @click.prevent="openMediaModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Keynotes Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Keynote Speaker</h3>
          </div>
          <p class="mb-4">Delivered expert presentations at industry conferences and regulatory bodies across Europe.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>20+ keynote presentations</div>
            <div>Speaking topics include online privacy, adtech, and AI ethics</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">keynotes</span>
            </div>
            <a href="#" @click.prevent="openKeynoteModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Panels Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Panel Expert</h3>
          </div>
          <p class="mb-4">Regular panelist at privacy and technology conferences including CPDP.ai, IAPP, and forums worldwide.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>60+ panel appearances</div>
            <div>Contributor at global industry events</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">panels</span>
            </div>
            <a href="#" @click.prevent="openPanelModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Popular Media Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Popular Media</h3>
          </div>
          <p class="mb-4">Featured in television, radio interviews, and podcasts discussing privacy and data protection issues.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>15+ television, radio & popular media appearances</div>
            <div>Expert insights on consumer privacy concerns</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">popular media</span>
            </div>
            <a href="#" @click.prevent="openPopularModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Professional Publications Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Professional Publications</h3>
          </div>
          <p class="mb-4">Author of blog posts, reports, and white papers on pressing privacy and technology regulatory topics.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>30+ professional publications</div>
            <div>Focuses on emerging privacy challenges</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">publications</span>
            </div>
            <a href="#" @click.prevent="openProfessionalModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Scholarly Works Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Scholarly Works</h3>
          </div>
          <p class="mb-4">Academic researcher with peer-reviewed publications on privacy, data protection, and tracking technologies.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>PhD dissertation on web privacy measurement</div>
            <div>Contributions to academic journals and conferences</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">academic</span>
            </div>
            <a href="#" @click.prevent="openScholarlyModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Professional Learning Programs Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Professional Learning</h3>
          </div>
          <p class="mb-4">Developer and instructor for professional training on privacy, adtech, machine learning, and data protection topics.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>25+ specialized training programs worldwide</div>
            <div>Expert-level courses for regulatory agencies and industry</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">training</span>
            </div>
            <a href="#" @click.prevent="openLearningModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Academic Teaching Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Academic Teaching</h3>
          </div>
          <p class="mb-4">Guest professor and instructor in academic programs focusing on law, technology, and privacy topics.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>Teaching at Leiden University, TU Delft, and others</div>
            <div>Summer schools, guest lectures, and student supervision</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">teaching</span>
            </div>
            <a href="#" @click.prevent="openAcademicModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Committees Column -->
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Committees & Boards</h3>
          </div>
          <p class="mb-4">Active participation in advisory boards, standards committees, and governance groups in privacy and technology.</p>
          <div class="text-sm space-y-2 flex-grow">
            <div>W3C standardization working groups</div>
            <div>Policy development and technical standards</div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div>
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">governance</span>
            </div>
            <a href="#" @click.prevent="openCommitteesModal" class="inline-flex items-center text-blue-600">
              Read more 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Mentions Modal -->
    <transition name="fade">
      <div v-if="showMediaModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeMediaModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeMediaModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Media Mentions</h2>
            
            <!-- Content from TabContent5.vue would go here -->
            <div class="ml-7 mt-4">
              <component :is="mediaComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Keynote Modal -->
    <transition name="fade">
      <div v-if="showKeynoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeKeynoteModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeKeynoteModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Keynote Presentations</h2>
            
            <!-- Content from TabContent6.vue would go here -->
            <div class="ml-7 mt-4">
              <component :is="keynoteComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Panel Modal -->
    <transition name="fade">
      <div v-if="showPanelModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closePanelModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closePanelModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Panel Expert Appearances</h2>
            
            <!-- Content from TabContent7.vue would go here -->
            <div class="ml-7 mt-4">
              <component :is="panelComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Popular Media Modal -->
    <transition name="fade">
      <div v-if="showPopularModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closePopularModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closePopularModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Popular Media Appearances</h2>
            
            <!-- Content from TabContent4.vue -->
            <div class="ml-7 mt-4">
              <component :is="popularComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Professional Publications Modal -->
    <transition name="fade">
      <div v-if="showProfessionalModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeProfessionalModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeProfessionalModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Professional Publications</h2>
            
            <!-- Content from TabContent3.vue -->
            <div class="ml-7 mt-4">
              <component :is="professionalComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Scholarly Works Modal -->
    <transition name="fade">
      <div v-if="showScholarlyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeScholarlyModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeScholarlyModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Scholarly Works</h2>
            
            <!-- Content from TabContent2.vue -->
            <div class="ml-7 mt-4">
              <component :is="scholarlyComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Professional Learning Modal -->
    <transition name="fade">
      <div v-if="showLearningModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeLearningModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeLearningModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Professional Learning Programs</h2>
            
            <!-- Content from TabContent8a.vue -->
            <div class="ml-7 mt-4">
              <component :is="learningComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Academic Teaching Modal -->
    <transition name="fade">
      <div v-if="showAcademicModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeAcademicModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeAcademicModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Academic Teaching</h2>
            
            <!-- Content from TabContent8b.vue -->
            <div class="ml-7 mt-4">
              <component :is="academicComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Committees Modal -->
    <transition name="fade">
      <div v-if="showCommitteesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeCommitteesModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative p-6">
            <!-- Close button -->
            <button @click="closeCommitteesModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 class="text-2xl font-bold mb-6">Committees & Boards</h2>
            
            <!-- Content from TabContent9.vue -->
            <div class="ml-7 mt-4">
              <component :is="committeesComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Content2 from './TabContent2.vue';
import Content3 from './TabContent3.vue';
import Content4 from './TabContent4.vue';
import Content5 from './TabContent5.vue';
import Content6 from './TabContent6.vue';
import Content7 from './TabContent7.vue';
import Content8a from './TabContent8a.vue';
import Content8b from './TabContent8b.vue';
import Content9 from './TabContent9.vue';

export default {
  components: {
    Content2,
    Content3,
    Content4,
    Content5,
    Content6,
    Content7,
    Content8a,
    Content8b,
    Content9
  },
  data() {
    return {
      showMediaModal: false,
      showKeynoteModal: false,
      showPanelModal: false,
      showPopularModal: false,
      showProfessionalModal: false,
      showScholarlyModal: false,
      showLearningModal: false,
      showAcademicModal: false,
      showCommitteesModal: false,
      mediaComponent: Content5,
      keynoteComponent: Content6,
      panelComponent: Content7,
      popularComponent: Content4,
      professionalComponent: Content3,
      scholarlyComponent: Content2,
      learningComponent: Content8a,
      academicComponent: Content8b,
      committeesComponent: Content9
    }
  },
  methods: {
    openMediaModal() {
      this.showMediaModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeMediaModal() {
      this.showMediaModal = false;
      document.body.style.overflow = 'auto';
    },
    openKeynoteModal() {
      this.showKeynoteModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeKeynoteModal() {
      this.showKeynoteModal = false;
      document.body.style.overflow = 'auto';
    },
    openPanelModal() {
      this.showPanelModal = true;
      document.body.style.overflow = 'hidden';
    },
    closePanelModal() {
      this.showPanelModal = false;
      document.body.style.overflow = 'auto';
    },
    openPopularModal() {
      this.showPopularModal = true;
      document.body.style.overflow = 'hidden';
    },
    closePopularModal() {
      this.showPopularModal = false;
      document.body.style.overflow = 'auto';
    },
    openProfessionalModal() {
      this.showProfessionalModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeProfessionalModal() {
      this.showProfessionalModal = false;
      document.body.style.overflow = 'auto';
    },
    openScholarlyModal() {
      this.showScholarlyModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeScholarlyModal() {
      this.showScholarlyModal = false;
      document.body.style.overflow = 'auto';
    },
    openLearningModal() {
      this.showLearningModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeLearningModal() {
      this.showLearningModal = false;
      document.body.style.overflow = 'auto';
    },
    openAcademicModal() {
      this.showAcademicModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeAcademicModal() {
      this.showAcademicModal = false;
      document.body.style.overflow = 'auto';
    },
    openCommitteesModal() {
      this.showCommitteesModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeCommitteesModal() {
      this.showCommitteesModal = false;
      document.body.style.overflow = 'auto';
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.max-h-90vh {
  max-height: 90vh;
}
</style>