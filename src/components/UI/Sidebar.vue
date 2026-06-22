<script setup>
import { useRoute } from "vue-router"
import { menus } from "../../constants/menu"
import SidebarCard from "./SidebarCard.vue"

const route = useRoute()

const isActive = (url) => route.path === url
</script>

<template>
  <aside
    class="w-full hidden md:block min-w-53.75 max-w-53.75 h-auto rounded-[20px] border border-fifth py-2.5 px-3 shadow-[0_5px_6px_rgba(0,0,0,0.1)]"
  >
    <div class="flex flex-col gap-2">
      <template v-for="(item, index) in menus" :key="item.id">
        <SidebarCard :data="item" :active="isActive(item.url)" />

        <div v-if="index !== menus.length - 1" class="h-px bg-fifth" />
      </template>
    </div>
  </aside>
</template>
