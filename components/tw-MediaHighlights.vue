<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-MediaHighlights.vue
<template>
  <section id="media" class="pt-8 pb-8 bg-gray-50 font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-4 text-center">Media Presence & Thought Leadership</h2>

      <div class="max-w-3xl mx-auto mb-6 text-center">
        <p class="text-lg mb-2">
          Recognized expert and influential voice in privacy, data protection, and technology
          regulation.
        </p>
      </div>

      <!-- Grid layout with logical reading order preserved in DOM structure -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        role="list"
        aria-label="Media and thought leadership highlights"
      >
        <!-- Media Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Media Mentions</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              media mentions
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Quoted in publications including The New York Times, Bloomberg, POLITICO, Euronews,
            MLEX, and NOS.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>50+ mentions in major publications</div>
            <div>Coverage in 7+ languages</div>
          </div>
          <div class="mt-4">
            <a
              href="#media-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openMediaModal"
              @keydown.enter.prevent="openMediaModal"
            >
              <i class="fa-solid fa-newspaper fa-xs text-brand-gold" aria-hidden="true"></i>
              View Media Coverage
            </a>
          </div>
        </div>

        <!-- Keynotes Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Keynote Speaker</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              keynotes
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Delivered expert presentations at industry conferences and regulatory bodies across
            Europe.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>20+ keynote presentations</div>
            <div>Speaking topics include online privacy, adtech, and AI ethics</div>
          </div>
          <div class="mt-4">
            <a
              href="#keynote-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openKeynoteModal"
              @keydown.enter.prevent="openKeynoteModal"
            >
              <i class="fa-solid fa-microphone fa-xs text-brand-gold" aria-hidden="true"></i>
              View Speaking Portfolio
            </a>
          </div>
        </div>

        <!-- Panels Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Panel Expert</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              panels
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Regular panelist at privacy and technology conferences including CPDP.ai, IAPP, and
            forums worldwide.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>65+ panel appearances</div>
            <div>20+ with video recordings</div>
          </div>
          <div class="mt-4">
            <a
              href="#panel-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openPanelModal"
              @keydown.enter.prevent="openPanelModal"
            >
              <i class="fa-solid fa-users fa-xs text-brand-gold" aria-hidden="true"></i>
              View Panel Portfolio
            </a>
          </div>
        </div>

        <!-- Popular Media Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Popular Media</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              popular media
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Featured in television, radio interviews, and podcasts discussing privacy and data
            protection issues.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div v-for="stat in popularMediaStats" :key="stat">{{ stat }}</div>
          </div>
          <div class="mt-4">
            <a
              href="#popular-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openPopularModal"
              @keydown.enter.prevent="openPopularModal"
            >
              <i class="fa-solid fa-play fa-xs text-brand-gold" aria-hidden="true"></i>
              View Media Portfolio
            </a>
          </div>
        </div>

        <!-- Professional Publications Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Professional Publications</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              publications
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Author of blog posts, reports, and white papers on pressing privacy and technology
            regulatory topics.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>30+ professional publications</div>
            <div>Focuses on emerging privacy challenges</div>
          </div>
          <div class="mt-4">
            <a
              href="#professional-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openProfessionalModal"
              @keydown.enter.prevent="openProfessionalModal"
            >
              <i class="fa-solid fa-edit fa-xs text-brand-gold" aria-hidden="true"></i>
              View Publications Portfolio
            </a>
          </div>
        </div>

        <!-- Scholarly Works Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Scholarly Works</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              academic
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Academic researcher with peer-reviewed publications on privacy, data protection, and
            tracking technologies.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>PhD dissertation on web privacy measurement</div>
            <div>Contributions to academic journals and conferences</div>
          </div>
          <div class="mt-4">
            <a
              href="#scholarly-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openScholarlyModal"
              @keydown.enter.prevent="openScholarlyModal"
            >
              <i class="fa-solid fa-book fa-xs text-brand-gold" aria-hidden="true"></i>
              View Academic Portfolio
            </a>
          </div>
        </div>

        <!-- Professional Learning Programs Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Professional Learning</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              training
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Developer and instructor for professional training on privacy, adtech, machine learning,
            and data protection topics.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>25+ specialized training programs worldwide</div>
            <div>Expert-level courses for regulatory agencies and industry</div>
          </div>
          <div class="mt-4">
            <a
              href="#learning-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openLearningModal"
              @keydown.enter.prevent="openLearningModal"
            >
              <i class="fa-solid fa-filter fa-xs text-brand-gold" aria-hidden="true"></i>
              View Training Portfolio
            </a>
          </div>
        </div>

        <!-- Academic Teaching Column -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
          role="listitem"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Academic Teaching</h3>
          <div class="mb-3">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              teaching
            </span>
          </div>
          <p class="mb-4 text-gray-700 text-sm leading-relaxed">
            Guest professor and instructor in academic programs focusing on law, technology, and
            privacy topics.
          </p>
          <div class="text-sm space-y-2 flex-grow text-gray-600">
            <div>Teaching at Leiden University, TU Delft, and others</div>
            <div>Summer schools, guest lectures, and student supervision</div>
          </div>
          <div class="mt-4">
            <a
              href="#academic-details"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              role="button"
              aria-haspopup="dialog"
              @click.prevent="openAcademicModal"
              @keydown.enter.prevent="openAcademicModal"
            >
              <i class="fa-solid fa-graduation-cap fa-xs text-brand-gold" aria-hidden="true"></i>
              View Teaching Portfolio
            </a>
          </div>
        </div>

        <!-- Committees & Boards Column -->
        <tw-CommitteesBoards />
      </div>
    </div>

    <!-- Media Mentions Modal -->
    <transition name="fade">
      <div
        v-if="showMediaModal"
        ref="mediaModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-modal-title"
        tabindex="-1"
        @click.self="closeMediaModal"
        @keydown.esc="closeMediaModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button - first focusable element in the modal -->
            <button
              ref="mediaCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close media mentions modal"
              @click="closeMediaModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="media-modal-title" class="text-2xl font-bold mb-6">Media Mentions</h2>

            <!-- Content from TabContent5.vue would go here -->
            <div class="mt-4">
              <component :is="mediaComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Keynote Modal -->
    <transition name="fade">
      <div
        v-if="showKeynoteModal"
        ref="keynoteModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keynote-modal-title"
        tabindex="-1"
        @click.self="closeKeynoteModal"
        @keydown.esc="closeKeynoteModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="keynoteCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close keynote modal"
              @click="closeKeynoteModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="keynote-modal-title" class="text-2xl font-bold mb-6">Keynote Presentations</h2>

            <!-- Content from TabContent6.vue would go here -->
            <div class="mt-4">
              <component :is="keynoteComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Panel Modal -->
    <transition name="fade">
      <div
        v-if="showPanelModal"
        ref="panelModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-modal-title"
        tabindex="-1"
        @click.self="closePanelModal"
        @keydown.esc="closePanelModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="panelCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close panel modal"
              @click="closePanelModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="panel-modal-title" class="text-2xl font-bold mb-6">Panel Expert Appearances</h2>

            <!-- Content from TabContent7.vue would go here -->
            <div class="mt-4">
              <component :is="panelComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Popular Media Modal -->
    <transition name="fade">
      <div
        v-if="showPopularModal"
        ref="popularModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popular-modal-title"
        tabindex="-1"
        @click.self="closePopularModal"
        @keydown.esc="closePopularModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="popularCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close popular media modal"
              @click="closePopularModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="popular-modal-title" class="text-2xl font-bold mb-6">
              Popular Media Appearances
            </h2>

            <!-- Content from TabContent4.vue -->
            <div class="mt-4">
              <component :is="popularComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Professional Publications Modal -->
    <transition name="fade">
      <div
        v-if="showProfessionalModal"
        ref="professionalModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="professional-modal-title"
        tabindex="-1"
        @click.self="closeProfessionalModal"
        @keydown.esc="closeProfessionalModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="professionalCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close professional publications modal"
              @click="closeProfessionalModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="professional-modal-title" class="text-2xl font-bold mb-6">
              Professional Publications
            </h2>

            <!-- Content from TabContent3.vue -->
            <div class="mt-4">
              <component :is="professionalComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Scholarly Works Modal -->
    <transition name="fade">
      <div
        v-if="showScholarlyModal"
        ref="scholarlyModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarly-modal-title"
        tabindex="-1"
        @click.self="closeScholarlyModal"
        @keydown.esc="closeScholarlyModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="scholarlyCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close scholarly works modal"
              @click="closeScholarlyModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="scholarly-modal-title" class="text-2xl font-bold mb-6">Scholarly Works</h2>

            <!-- Content from TabContent2.vue -->
            <div class="mt-4">
              <component :is="scholarlyComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Professional Learning Modal -->
    <transition name="fade">
      <div
        v-if="showLearningModal"
        ref="learningModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="learning-modal-title"
        tabindex="-1"
        @click.self="closeLearningModal"
        @keydown.esc="closeLearningModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="learningCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close professional learning modal"
              @click="closeLearningModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="learning-modal-title" class="text-2xl font-bold mb-6">
              Professional Learning Programs
            </h2>

            <!-- Content from TabContent8a.vue -->
            <div class="mt-4">
              <component :is="learningComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Academic Teaching Modal -->
    <transition name="fade">
      <div
        v-if="showAcademicModal"
        ref="academicModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="academic-modal-title"
        tabindex="-1"
        @click.self="closeAcademicModal"
        @keydown.esc="closeAcademicModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-6">
            <!-- Close button -->
            <button
              ref="academicCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close academic teaching modal"
              @click="closeAcademicModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="academic-modal-title" class="text-2xl font-bold mb-6">Academic Teaching</h2>

            <!-- Content from TabContent8b.vue -->
            <div class="mt-4">
              <component :is="academicComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Committees Modal -->
    <transition name="fade">
      <div
        v-if="showCommitteesModal"
        ref="committeesModalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="committees-modal-title"
        tabindex="-1"
        @click.self="closeCommitteesModal"
        @keydown.esc="closeCommitteesModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative p-4 sm:p-6">
            <!-- Close button -->
            <button
              ref="committeesCloseButtonRef"
              class="shortcuts-close-button absolute top-4 right-4 z-10 bg-transparent border-none text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md cursor-pointer"
              aria-label="Close committees and boards modal"
              @click="closeCommitteesModal"
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 id="committees-modal-title" class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Committees & Boards
            </h2>

            <!-- Content from TabContent9.vue -->
            <div class="mt-2 sm:mt-4">
              <component :is="committeesComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, markRaw, provide } from 'vue'
  import { useNuxtApp } from '#app'
  import Content2 from './TabContent2.vue'
  import Content3 from './TabContent3.vue'
  import Content4 from './TabContent4.vue'
  import Content5 from './TabContent5.vue'
  import twCommitteesBoards from './tw-CommitteesBoards.vue'

  // Popular Media tile data
  const popularMediaStats = [
    '15+ television, radio & popular media appearances',
    'Expert insights on consumer privacy concerns',
  ]
  import Content6 from './TabContent6.vue'
  import Content7 from './TabContent7.vue'
  import Content8a from './TabContent8a.vue'
  import Content8b from './TabContent8b.vue'
  import Content9 from './TabContent9.vue'

  // Reactive state
  const showMediaModal = ref(false)
  const showKeynoteModal = ref(false)
  const showPanelModal = ref(false)
  const showPopularModal = ref(false)
  const showProfessionalModal = ref(false)
  const showScholarlyModal = ref(false)
  const showLearningModal = ref(false)
  const showAcademicModal = ref(false)
  const showCommitteesModal = ref(false)

  const mediaComponent = markRaw(Content5)
  const keynoteComponent = markRaw(Content6)
  const panelComponent = markRaw(Content7)
  const popularComponent = markRaw(Content4)
  const professionalComponent = markRaw(Content3)
  const scholarlyComponent = markRaw(Content2)
  const learningComponent = markRaw(Content8a)
  const academicComponent = markRaw(Content8b)
  const committeesComponent = markRaw(Content9)

  // Focus management related state
  const previousFocus = ref<Element | null>(null)
  const keydownHandlers = ref<Record<string, (e: KeyboardEvent) => void>>({})
  const focusableSelector =
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'

  // Template refs
  const mediaModalRef = ref<HTMLElement>()
  const keynoteModalRef = ref<HTMLElement>()
  const panelModalRef = ref<HTMLElement>()
  const popularModalRef = ref<HTMLElement>()
  const professionalModalRef = ref<HTMLElement>()
  const scholarlyModalRef = ref<HTMLElement>()
  const learningModalRef = ref<HTMLElement>()
  const academicModalRef = ref<HTMLElement>()
  const committeesModalRef = ref<HTMLElement>()

  const mediaCloseButtonRef = ref<HTMLButtonElement>()
  const keynoteCloseButtonRef = ref<HTMLButtonElement>()
  const panelCloseButtonRef = ref<HTMLButtonElement>()
  const popularCloseButtonRef = ref<HTMLButtonElement>()
  const professionalCloseButtonRef = ref<HTMLButtonElement>()
  const scholarlyCloseButtonRef = ref<HTMLButtonElement>()
  const learningCloseButtonRef = ref<HTMLButtonElement>()
  const academicCloseButtonRef = ref<HTMLButtonElement>()
  const committeesCloseButtonRef = ref<HTMLButtonElement>()

  // Nuxt app access for announcer - wrap in process.client check to prevent hydration issues
  const nuxtApp = useNuxtApp()
  const announcer = computed(() => {
    if (!process.client) return null
    return nuxtApp.$announce
  })

  // Provide modal handlers for child components
  provide('openCommitteesModal', openCommitteesModal)
  // Helper methods - wrap DOM queries in process.client check to prevent hydration issues
  function getMainContentElements(): Element[] {
    if (!process.client) return []
    return Array.from(document.querySelectorAll('main, header, footer'))
  }

  function hideMainContentFromScreenReaders(): void {
    getMainContentElements().forEach(element => {
      element.setAttribute('aria-hidden', 'true')
    })
  }

  function showMainContentToScreenReaders(): void {
    getMainContentElements().forEach(element => {
      element.removeAttribute('aria-hidden')
    })
  }

  function setupFocusTrap(modalType: string): void {
    const modalRefMap: Record<string, { value?: HTMLElement }> = {
      media: mediaModalRef,
      keynote: keynoteModalRef,
      panel: panelModalRef,
      popular: popularModalRef,
      professional: professionalModalRef,
      scholarly: scholarlyModalRef,
      learning: learningModalRef,
      academic: academicModalRef,
      committees: committeesModalRef,
    }

    const modalRef = modalRefMap[modalType]?.value
    if (!modalRef) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        const closeMethodMap: Record<string, () => void> = {
          media: closeMediaModal,
          keynote: closeKeynoteModal,
          panel: closePanelModal,
          popular: closePopularModal,
          professional: closeProfessionalModal,
          scholarly: closeScholarlyModal,
          learning: closeLearningModal,
          academic: closeAcademicModal,
          committees: closeCommitteesModal,
        }

        closeMethodMap[modalType]()

        if (announcer.value) {
          announcer.value(`${modalType} modal closed with Escape key`, 'assertive')
        }
        return
      }

      if (e.key !== 'Tab') return

      const focusableElements = modalRef.querySelectorAll(focusableSelector)

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    keydownHandlers.value[modalType] = handleKeyDown
    modalRef.addEventListener('keydown', handleKeyDown)
  }

  function cleanupFocusTrap(modalType: string): void {
    const modalRefMap: Record<string, { value?: HTMLElement }> = {
      media: mediaModalRef,
      keynote: keynoteModalRef,
      panel: panelModalRef,
      popular: popularModalRef,
      professional: professionalModalRef,
      scholarly: scholarlyModalRef,
      learning: learningModalRef,
      academic: academicModalRef,
      committees: committeesModalRef,
    }

    const modalRef = modalRefMap[modalType]?.value
    const handler = keydownHandlers.value[modalType]

    if (modalRef && handler) {
      modalRef.removeEventListener('keydown', handler)
      delete keydownHandlers.value[modalType]
    }
  }

  // Modal management functions
  function openMediaModal(): void {
    previousFocus.value = document.activeElement

    showMediaModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Media Mentions modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('media')

      if (mediaCloseButtonRef.value) {
        mediaCloseButtonRef.value.focus()
      }
    })
  }
  function closeMediaModal(): void {
    cleanupFocusTrap('media')

    showMediaModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Media Mentions modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openKeynoteModal(): void {
    previousFocus.value = document.activeElement

    showKeynoteModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Keynote presentations modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('keynote')

      if (keynoteCloseButtonRef.value) {
        keynoteCloseButtonRef.value.focus()
      }
    })
  }
  function closeKeynoteModal(): void {
    cleanupFocusTrap('keynote')

    showKeynoteModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Keynote presentations modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openPanelModal(): void {
    previousFocus.value = document.activeElement

    showPanelModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Panel expert appearances modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('panel')

      if (panelCloseButtonRef.value) {
        panelCloseButtonRef.value.focus()
      }
    })
  }
  function closePanelModal(): void {
    cleanupFocusTrap('panel')

    showPanelModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Panel expert appearances modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openPopularModal(): void {
    previousFocus.value = document.activeElement

    showPopularModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Popular media appearances modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('popular')

      if (popularCloseButtonRef.value) {
        popularCloseButtonRef.value.focus()
      }
    })
  }
  function closePopularModal(): void {
    cleanupFocusTrap('popular')

    showPopularModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Popular media appearances modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openProfessionalModal(): void {
    previousFocus.value = document.activeElement

    showProfessionalModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Professional Publications modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('professional')

      if (professionalCloseButtonRef.value) {
        professionalCloseButtonRef.value.focus()
      }
    })
  }
  function closeProfessionalModal(): void {
    cleanupFocusTrap('professional')

    showProfessionalModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Professional Publications modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openScholarlyModal(): void {
    previousFocus.value = document.activeElement

    showScholarlyModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Scholarly Works modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('scholarly')

      if (scholarlyCloseButtonRef.value) {
        scholarlyCloseButtonRef.value.focus()
      }
    })
  }
  function closeScholarlyModal(): void {
    cleanupFocusTrap('scholarly')

    showScholarlyModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Scholarly Works modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openLearningModal(): void {
    previousFocus.value = document.activeElement

    showLearningModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Professional Learning Programs modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('learning')

      if (learningCloseButtonRef.value) {
        learningCloseButtonRef.value.focus()
      }
    })
  }
  function closeLearningModal(): void {
    cleanupFocusTrap('learning')

    showLearningModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Professional Learning Programs modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openAcademicModal(): void {
    previousFocus.value = document.activeElement

    showAcademicModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Academic Teaching modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('academic')

      if (academicCloseButtonRef.value) {
        academicCloseButtonRef.value.focus()
      }
    })
  }
  function closeAcademicModal(): void {
    cleanupFocusTrap('academic')

    showAcademicModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Academic Teaching modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
  function openCommitteesModal(): void {
    previousFocus.value = document.activeElement

    showCommitteesModal.value = true
    document.body.style.overflow = 'hidden'

    hideMainContentFromScreenReaders()

    if (announcer.value) {
      announcer.value('Committees and Boards modal opened', 'polite')
    }

    nextTick(() => {
      setupFocusTrap('committees')

      if (committeesCloseButtonRef.value) {
        committeesCloseButtonRef.value.focus()
      }
    })
  }
  function closeCommitteesModal(): void {
    cleanupFocusTrap('committees')

    showCommitteesModal.value = false
    document.body.style.overflow = 'auto'

    showMainContentToScreenReaders()

    if (announcer.value) {
      announcer.value('Committees and Boards modal closed', 'polite')
    }

    if (previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .max-h-90vh {
    max-height: 90vh;
  }

  /* Component-specific focus styles */
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid #ffd700 !important;
    outline-offset: 2px !important;
    border-radius: 0.25rem !important;
  }
</style>
