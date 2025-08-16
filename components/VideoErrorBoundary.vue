<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div>
    <div v-if="hasError" class="video-error-fallback">
      <div class="error-message">
        <h3>Video temporarily unavailable</h3>
        <p>Please refresh the page or try again later.</p>
        <button class="retry-button" @click="retry">Retry</button>
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
  import { ref, onErrorCaptured, getCurrentInstance } from 'vue'
  import { errorHandler } from '~/composables/errorHandler'

  const hasError = ref(false)
  const error = ref<Error | null>(null)

  onErrorCaptured((err, vm, info) => {
    hasError.value = true
    error.value = err
    errorHandler.error(`Video component error caught: ${info}`, err, {
      component: 'VideoErrorBoundary',
    })
    return false // Prevent error from propagating
  })

  const retry = (): void => {
    hasError.value = false
    error.value = null
    const instance = getCurrentInstance()
    instance?.proxy?.$forceUpdate()
  }
</script>

<style scoped>
  .video-error-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 2rem;
  }

  .error-message {
    text-align: center;
    max-width: 400px;
  }

  .error-message h3 {
    color: #dc3545;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .error-message p {
    color: #6c757d;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .retry-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }

  .retry-button:hover {
    background-color: #0056b3;
  }

  .retry-button:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
</style>
