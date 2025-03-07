<template>
  <div class="w-full relative">
    <!-- Full-width video container with proper spacing -->
    <div class="w-screen" style="left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; position: relative;">
      <tw-DashVideo />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'tw-DashVideo': () => import('~/components/tw-DashVideo.vue')
  }
}
</script>