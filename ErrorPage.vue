<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4"
  >
    <div class="max-w-lg w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <div v-if="error.statusCode === 404" class="text-6xl mb-4">🗺️</div>
        <div v-else-if="error.statusCode >= 500" class="text-6xl mb-4">⚠️</div>
        <div v-else class="text-6xl mb-4">❌</div>
      </div>

      <!-- Error Content -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ errorTitle }}
        </h1>

        <p class="text-lg text-gray-600 mb-6">
          {{ errorMessage }}
        </p>

        <!-- Error Details (Development Only) -->
        <div v-if="isDevelopment && error.stack" class="text-left mb-6">
          <details class="bg-gray-50 rounded p-4">
            <summary class="cursor-pointer text-sm font-semibold text-gray-700">
              Technical Details
            </summary>
            <pre class="text-xs text-gray-600 mt-2 overflow-auto">{{ error.stack }}</pre>
          </details>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="retryButtonState.disabled"
            @click="handleRetry"
          >
            {{ retryButtonState.text }}
          </button>

          <NuxtLink
            to="/"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Home
          </NuxtLink>
        </div>

        <!-- Connection Status -->
        <div v-if="!isOnline" class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-center">
            <div class="text-yellow-600 mr-2">📶</div>
            <span class="text-yellow-800 font-semibold">You appear to be offline</span>
          </div>
          <p class="text-yellow-700 text-sm mt-1">Check your internet connection and try again.</p>
        </div>
      </div>

      <!-- Additional Help -->
      <div class="text-sm text-gray-500">
        <p>
          If this problem persists, please
          <a
            href="mailto:support@blaeu.com"
            class="text-indigo-600 hover:text-indigo-800 underline"
          >
            contact support
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface ErrorProps {
    error: {
      statusCode: number
      statusMessage?: string
      message?: string
      stack?: string
      data?: Record<string, unknown>
    }
  }

  const props = defineProps<ErrorProps>()

  // Environment detection
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Use error page composable
  const {
    state: _errorPageState,
    isOnline,
    getErrorTitle,
    getErrorMessage,
    isRetryable: _isRetryable,
    retry,
    reportError,
    getRetryButtonState,
    // eslint-disable-next-line no-undef
  } = useErrorPage()

  // Report error on mount
  onMounted(() => {
    reportError({
      statusCode: props.error.statusCode,
      statusMessage: props.error.statusMessage,
      message: props.error.message,
      stack: props.error.stack,
      url: process.client ? window.location.href : 'SSR',
      userAgent: process.client ? navigator.userAgent : 'SSR',
      timestamp: new Date().toISOString(),
    })
  })

  // Computed properties
  const errorTitle = computed(() => getErrorTitle(props.error.statusCode))
  const errorMessage = computed(() =>
    getErrorMessage(props.error.statusCode, props.error.statusMessage || props.error.message)
  )
  const retryButtonState = computed(() => getRetryButtonState(props.error.statusCode))

  // Retry functionality
  const handleRetry = async (): Promise<void> => {
    await retry({
      statusCode: props.error.statusCode,
      statusMessage: props.error.statusMessage,
      message: props.error.message,
      url: process.client ? window.location.href : 'SSR',
      userAgent: process.client ? navigator.userAgent : 'SSR',
      timestamp: new Date().toISOString(),
    })
  }

  // SEO and meta
  useHead({
    title: `${errorTitle.value} - Blaeu.com`,
    meta: [
      { name: 'description', content: errorMessage.value },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  })

  // Set appropriate status code
  // eslint-disable-next-line no-undef
  setResponseStatus(props.error.statusCode)
</script>

<style scoped>
  /* Add any component-specific styles here */
  .transition-colors {
    transition-property: color, background-color, border-color;
  }
</style>
