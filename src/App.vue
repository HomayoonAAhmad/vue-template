<script setup lang="ts">
import UserDataProvider from "./providers/UserDataProvider.vue"
import { version } from "../package.json"
import { Toaster } from "vue3-hot-toast"
// import { VueQueryDevtools } from "@tanstack/vue-query-devtools"

console.log(version)
</script>

<template>
  <user-data-provider>
    <router-view></router-view>
    <Toaster position="top-left" :reverse-order="false" />
    <!-- <VueQueryDevtools /> -->
  </user-data-provider>
</template>
