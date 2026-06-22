<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <router-link
    :to="data.url"
    class="flex items-center gap-2.5 px-4.5 py-3 transition-all duration-300"
    :class="{ 'bg-fifth rounded-full': active }"
  >
    <component
      :is="data.icon"
      class="aspect-square size-[18.5px] transition-all duration-300"
      :class="{
        'text-[#016064]/40': !active,
        'text-[#016064]!': active,
      }"
    />
    <span class="text-[#016064] text-xs font-semibold">
      {{ data.text }}
    </span>
  </router-link>
</template>
