<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-ResearchHighlights.vue
<template>
  <section id="research" class="py-16 bg-white font-amblelight" tabindex="-1">
    <!-- Skip link target for internal section navigation -->
    <div id="research-content" tabindex="-1" class="sr-only">Research highlights section</div>

    <div class="container mx-auto px-4">
      <h2 id="research-highlights-heading" class="text-3xl font-bold mb-8 text-center">
        Research Highlights
      </h2>

      <div class="max-w-3xl mx-auto mb-10 text-center">
        <p id="research-description" class="text-lg mx-4 md:mx-0">
          My research focuses on privacy engineering, data protection, and the legal aspects of data
          architectures, with particular emphasis on real-time bidding systems and online tracking
          technologies.
        </p>
      </div>

      <!-- Accessibility note: this adds semantic relationship between heading and content -->
      <div class="sr-only" aria-live="polite">
        The following research highlights are presented as a list of cards, each with an image,
        title, author, date, and a brief summary. Click "Read more" on any card to view detailed
        information.
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-8"
        role="list"
        aria-label="Research highlights"
      >
        <div
          v-for="(blog, index) in blogs.slice(0, 4)"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          role="listitem"
        >
          <!-- Image -->
          <div class="h-48 overflow-hidden">
            <img
              :src="blog.image"
              :alt="blog.alttext || blog.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 :id="`article-title-${index}`" class="text-xl font-semibold mb-2">
              {{ sanitizeTitle(blog.title) }}
            </h3>
            <p class="text-gray-500 mb-3 text-sm">
              <span class="sr-only">Author:</span>
              {{ blog.author }}
              <span class="sr-only">Date:</span>
              ({{ blog.date }})
            </p>

            <!-- Summary - First 150 characters -->
            <p class="mb-4">{{ truncateText(sanitizeDescription(blog.intro), 150) }}</p>

            <div class="flex justify-between items-center">
              <div>
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  <span class="sr-only">Publication:</span>
                  {{ blog.publication }}
                </span>
              </div>
              <button
                class="inline-flex items-center text-blue-600 hover:text-blue-800 focus:outline-none px-3 py-2 border border-transparent hover:border-blue-300 rounded transition-all duration-200"
                :aria-labelledby="`read-more-label-${index} article-title-${index}`"
                :aria-describedby="`read-more-desc-${index}`"
                @click="openModal(blog)"
                @keydown.enter="openModal(blog)"
              >
                <span :id="`read-more-label-${index}`">Read more</span>
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                <span :id="`read-more-desc-${index}`" class="sr-only">
                  Opens details in a modal window
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for expanded research content -->
    <transition name="fade">
      <div
        v-if="showModal"
        ref="modalRef"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-modal-title"
        aria-describedby="research-modal-description"
        tabindex="-1"
        @click.self="closeModal"
        @keydown.esc="closeModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto"
          @click.stop
        >
          <div class="relative">
            <!-- Close button positioned prominently for better accessibility -->
            <button
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffcc00]"
              aria-label="Close research details"
              @click="closeModal"
            >
              <span class="sr-only">Close</span>
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <!-- Modal content -->
            <div v-if="selectedBlog" class="p-6">
              <div class="flex flex-col md:flex-row mb-6">
                <div class="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
                  <img
                    :src="selectedBlog.image"
                    :alt="selectedBlog.alttext || selectedBlog.title"
                    class="w-full h-32 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div class="w-full md:w-3/4">
                  <h2 id="research-modal-title" class="text-2xl font-bold mb-3">
                    {{ selectedBlog.title }}
                  </h2>
                  <p class="text-gray-600">
                    <span class="sr-only">Author:</span>
                    {{ selectedBlog.author }}
                    <span class="sr-only">Date:</span>
                    ({{ selectedBlog.date }})
                  </p>
                </div>
              </div>

              <!-- Full content with better semantic structure -->
              <div id="research-modal-description" class="prose max-w-none mb-8">
                <p>{{ selectedBlog.intro }}</p>
              </div>

              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  <span class="sr-only">Publication:</span>
                  {{ selectedBlog.publication }}
                </span>
                <a
                  :href="selectedBlog.link"
                  class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffcc00]"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`Access full research about '${selectedBlog.title}' (opens in new tab)`"
                >
                  Access Full Research
                  <svg
                    class="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  <span class="sr-only">Opens in a new tab</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { URLValidator, sanitizeTitle, sanitizeDescription } from '@/utils/validation'

  // Props
  interface Blog {
    image: string
    title: string
    author: string
    date: string
    intro: string
    publication: string
    link: string
    alttext?: string
  }

  interface Props {
    blogs?: Blog[]
  }

  const props = withDefaults(defineProps<Props>(), {
    blogs: () => [],
  })

  // Reactive state
  const showModal = ref(false)
  const selectedBlog = ref<Blog | null>(null)
  const previousFocus = ref<Element | null>(null)
  const modalRef = ref<HTMLElement>()
  const keydownHandler = ref<((e: KeyboardEvent) => void) | null>(null)

  // Computed properties
  const announcer = computed(() => {
    // Access the global announcer if available
    return (
      globalThis as unknown as { $nuxt?: { $announce?: (message: string, type: string) => void } }
    ).$nuxt?.$announce
  })

  const isReducedMotion = computed(() => {
    return document?.documentElement.classList.contains('reduce-motion') ?? false
  })

  // Methods
  const validateResearchData = (): boolean => {
    if (!Array.isArray(props.blogs)) return false

    for (const blog of props.blogs) {
      if (blog.image) {
        const imageValidation = URLValidator.validateImageSource(blog.image)
        if (!imageValidation.isValid) {
          // eslint-disable-next-line no-console
          console.warn(`Invalid research image: ${blog.image} - ${imageValidation.error}`)
        }
      }

      if (blog.link) {
        // Use validateDocumentSource for PDF files, validateExternalLink for others
        const isPDF = blog.link.toLowerCase().includes('.pdf')
        const linkValidation = isPDF
          ? URLValidator.validateDocumentSource(blog.link)
          : URLValidator.validateExternalLink(blog.link)
        if (!linkValidation.isValid) {
          // eslint-disable-next-line no-console
          console.warn(`Invalid research link: ${blog.link} - ${linkValidation.error}`)
        }
      }
    }
    return true
  }

  const truncateText = (text: string, length: number): string => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  }

  const _showAllResearch = (): void => {
    // Implement navigation to full research page or expand current view
    document.getElementById('aggregator')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openModal = (blog: Blog): void => {
    // Store current focus for later restoration
    previousFocus.value = document.activeElement

    selectedBlog.value = blog
    showModal.value = true

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'

    // Add class to body for potential styling
    document.body.classList.add('modal-open')

    // Hide main content from screen readers when modal is open
    const mainContentContainer = document.getElementById('app') || document.body

    // Add aria-hidden to sibling elements but not to the modal itself
    Array.from(mainContentContainer.children).forEach(element => {
      if (!element.contains(modalRef.value || null) && element !== modalRef.value) {
        element.setAttribute('aria-hidden', 'true')
      }
    })

    // Announce to screen readers with more detailed message
    if (announcer.value) {
      announcer.value(
        `Research details modal opened. Showing information about ${blog.title} by ${blog.author}.`,
        'polite'
      )
    }

    // Wait for the modal to render completely, then set up focus management
    nextTick(() => {
      // Set up focus trap for modal
      setupFocusTrap()
    })
  }

  const closeModal = (): void => {
    // Apply transition effect based on user preference
    if (isReducedMotion.value) {
      showModal.value = false
    } else {
      // Use a short timeout to allow for animation when reduced motion is not enabled
      showModal.value = false
    }

    // Remove keydown event listener if it exists
    if (modalRef.value && keydownHandler.value) {
      modalRef.value.removeEventListener('keydown', keydownHandler.value)
      keydownHandler.value = null
    }

    // Re-enable body scrolling
    document.body.style.overflow = 'auto'

    // Remove class from body
    document.body.classList.remove('modal-open')

    // Make main content accessible to screen readers again
    document.querySelectorAll('[aria-hidden="true"]').forEach(element => {
      element.removeAttribute('aria-hidden')
    })

    // Announce to screen readers
    if (announcer.value) {
      announcer.value(
        'Research details modal closed. Returning to research highlights list.',
        'polite'
      )
    }

    // Restore focus to the element that opened the modal
    if (previousFocus.value && 'focus' in previousFocus.value) {
      ;(previousFocus.value as HTMLElement).focus()
    }
  }

  const setupFocusTrap = (): void => {
    if (!modalRef.value) return

    // Handle keydown events for modal
    const handleKeyDown = (e: KeyboardEvent): void => {
      // If Escape key, close the modal
      if (e.key === 'Escape') {
        closeModal()

        // Announce to screen readers that the modal was closed with Escape key
        if (announcer.value) {
          announcer.value('Research details modal closed with Escape key', 'assertive')
        }
        return
      }

      // Only trap focus if Tab key is pressed
      if (e.key !== 'Tab') return

      // Get all focusable elements in the modal - more comprehensive selector
      const focusableElements = modalRef.value!.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], input[type="button"], select, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      // If shift+tab on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()

        // Announce to screen readers
        if (announcer.value) {
          announcer.value('Navigated to last focusable element in dialog', 'polite')
        }
      }
      // If tab on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()

        // Announce to screen readers
        if (announcer.value) {
          announcer.value('Navigated to first focusable element in dialog', 'polite')
        }
      }
    }

    // Add event listener
    modalRef.value.addEventListener('keydown', handleKeyDown)

    // Store reference to the event listener for cleanup
    keydownHandler.value = handleKeyDown

    // For accessibility, set focus on the first focusable element after a short delay
    setTimeout(() => {
      const closeButton = modalRef.value?.querySelector(
        'button[aria-label="Close research details"]'
      ) as HTMLElement
      if (closeButton) {
        closeButton.focus()
      }
    }, 50)
  }

  // Lifecycle
  onMounted(() => {
    validateResearchData()
  })
</script>

<style scoped>
  /* Transition effects - these will be skipped if user has reduce-motion preference */
  html:not(.reduce-motion) .fade-enter-active,
  html:not(.reduce-motion) .fade-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  html:not(.reduce-motion) .fade-enter-from,
  html:not(.reduce-motion) .fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .max-h-90vh {
    max-height: 90vh;
  }

  /* Enhanced focus indicators for better accessibility */
  a:focus-visible,
  button:focus-visible,
  [role='button']:focus-visible {
    outline: 3px solid #ffcc00;
    outline-offset: 2px;
    border-radius: 0.25rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  /* High contrast mode adjustments */
  html.high-contrast-mode .bg-blue-100 {
    background-color: #0066cc !important;
    color: white !important;
  }

  html.high-contrast-mode .text-blue-600,
  html.high-contrast-mode .text-blue-800 {
    color: #0000cc !important;
  }

  /* Reduced motion support */
  html.reduce-motion .fade-enter-active,
  html.reduce-motion .fade-leave-active {
    transition-duration: 0.001s;
  }
</style>
