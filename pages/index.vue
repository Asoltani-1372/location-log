<script setup lang="ts">
import GithubLogin from '~/components/github-login.vue'
</script>

<template>
  <div class="hero bg-base-200 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Hello there
        </h1>
        <p class="py-6">
          keep track of your location and advantures , add location , photos ,and notes, create digital journal of your journey
        </p>
        <GithubLogin />
      </div>
    </div>
  </div>
</template>
