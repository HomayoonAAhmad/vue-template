<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline"
import { userStore } from "../../store/userStore"

const user = userStore()

const emit = defineEmits<{
  (e: "edit"): void
}>()
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center gap-3 pt-5 bg-secondary relative py-3 px-4 rounded-xl overflow-hidden"
  >
    <div class="text-sm text-[#333333] font-bold flex items-center gap-2">
      <span>{{ user.shaba ? user.shaba : "---- ---- ---- ----" }}</span>

      <span>IR</span>
    </div>

    <div class="text-xs text-[#333333] font-bold flex items-center gap-2">
      <span>{{ user.name }}</span>
      <span>-</span>
      <span>بانک {{ user.bank ? user.bank : "----" }}</span>
    </div>

    <div
      class="aspect-square size-18.75 left-45 bg-primary/5 absolute rounded-lg rotate-45"
    />
    <div
      class="aspect-square size-16 left-34 bg-primary/5 absolute rounded-lg rotate-45"
    />

    <button
      @click="emit('edit')"
      class="aspect-square flex items-center justify-center p-1 active:scale-90 transition-all duration-300 size-6.75 absolute top-2 right-2 bg-white rounded-md"
    >
      <PencilSquareIcon class="w-full h-full" />
    </button>
  </div>
</template>
