<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline"

const props = defineProps<{
  url: string
  text?: string
}>()
</script>

<template>
  <router-link
    :to="url"
    class="flex items-center w-fit gap-2 text-sm md:text-base"
  >
    <ChevronRightIcon class="size-4 md:size-5" />
    {{ text }}
  </router-link>
</template>
