<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <section id="media" class="bg-white dark:bg-gray-900">
    <div class="max-w-2xl mx-auto px-4">
      <hr class="border-gray-200 dark:border-gray-700 mb-10" />

      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
        Portfolio
      </h2>

      <div role="list" aria-label="Media and thought leadership highlights">
        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#media-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openMediaModal"
            @keydown.enter.prevent="openMediaModal"
          >
            Media Mentions
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            NYT, Bloomberg, POLITICO &middot; 50+ mentions in 7+ languages
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#keynote-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openKeynoteModal"
            @keydown.enter.prevent="openKeynoteModal"
          >
            Keynote Speaker
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            20+ presentations at industry conferences and regulatory bodies
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#panel-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openPanelModal"
            @keydown.enter.prevent="openPanelModal"
          >
            Panel Expert
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            65+ panel appearances at CPDP.ai, IAPP, and forums worldwide
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#popular-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openPopularModal"
            @keydown.enter.prevent="openPopularModal"
          >
            Popular Media
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            15+ television, radio, and podcast appearances
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#professional-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openProfessionalModal"
            @keydown.enter.prevent="openProfessionalModal"
          >
            Professional Publications
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            30+ blog posts, reports, and white papers on privacy and regulation
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#scholarly-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openScholarlyModal"
            @keydown.enter.prevent="openScholarlyModal"
          >
            Scholarly Works
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Peer-reviewed publications and PhD dissertation on web privacy
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#learning-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openLearningModal"
            @keydown.enter.prevent="openLearningModal"
          >
            Professional Learning
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            25+ training programs on privacy, adtech, and data protection
          </p>
        </div>

        <div class="py-4 border-b border-gray-200 dark:border-gray-700" role="listitem">
          <a
            href="#academic-details"
            class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
            role="button"
            aria-haspopup="dialog"
            @click.prevent="openAcademicModal"
            @keydown.enter.prevent="openAcademicModal"
          >
            Academic Teaching
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Guest professor at Leiden University, TU Delft, and other institutions
          </p>
        </div>

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
  .portfolio-link {
    padding: 0 !important;
    min-width: unset !important;
    min-height: unset !important;
  }

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
