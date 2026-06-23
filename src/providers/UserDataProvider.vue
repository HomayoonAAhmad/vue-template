<script setup lang="ts">
import AuthPage from "../pages/AuthPage.vue"
import { userStore } from "../store/userStore"

const store = userStore()
</script>

<template>
  <template v-if="store.hasData">
    <slot />
  </template>

  <AuthPage v-else />
</template>
