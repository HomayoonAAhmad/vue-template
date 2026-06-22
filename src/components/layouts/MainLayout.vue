<script setup lang="ts">
import GoldPrice from "../universal/GoldPrice.vue"
import MobileNavigation from "../universal/MobileNavigation.vue"
import Sidebar from "../universal/Sidebar.vue"
</script>

<template>
  <div class="flex flex-col w-full h-full min-h-dvh relative">
    <GoldPrice />

    <div
      class="md:px-22.25 md:py-13.5 py-6.75 px-6 flex-1 flex md:gap-7.75 h-full"
    >
      <Sidebar />

      <div class="flex-1">
        <router-view></router-view>
      </div>

      <MobileNavigation />
    </div>
  </div>
</template>
