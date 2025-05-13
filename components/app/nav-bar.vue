<script setup lang="ts">
import GithubLogin from '../github-login.vue'
</script>

<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="navbar-start">
      <NuxtLink class="btn btn-ghost text-xl" to="/">
        Location Log
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <AppThemeToggle />
      <GithubLogin />
    </div>
  </div>
</template>
