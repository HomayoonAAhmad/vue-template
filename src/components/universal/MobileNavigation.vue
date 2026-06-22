<script setup lang="ts">
import { useRoute } from "vue-router"
import { menus } from "../../constants/menu"

const route = useRoute()

const isActive = (url: string) => route.path === url
</script>

<template>
  <div
    class="fixed md:hidden bottom-8.5 left-1/2 -translate-x-1/2 rounded-full bg-white w-[80%] py-2.5 px-5.5 shadow-[0_3px_6px_rgba(0,0,0,0.1)]"
  >
    <div class="flex items-center justify-between gap-2">
      <template v-for="item in menus" :key="item.id">
        <router-link
          :to="item.url"
          class="flex items-center gap-2.5 px-4.75 py-[8.5px] transition-all duration-300"
          :class="{ 'bg-fifth rounded-full': isActive(item.url) }"
        >
          <component
            :is="item.icon"
            class="text-primary aspect-square size-[18.5px] transition-all duration-300"
            :class="{ 'text-[#016064]!': isActive(item.url) }"
          >
          </component>
        </router-link>
      </template>
    </div>
  </div>
</template>
