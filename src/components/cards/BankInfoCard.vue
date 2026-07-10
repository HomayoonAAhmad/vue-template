<script setup lang="ts">
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/vue/24/outline"
import { userStore } from "../../store/userStore"

const user = userStore()

const emit = defineEmits<{
  (e: "edit"): void
}>()

const props = defineProps<{
  data?: {
    shaba?: string
    bank_name?: string
    card_number?: string
  }
  loading: boolean
}>()
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center gap-3 pt-5 bg-secondary relative py-3 px-4 rounded-xl overflow-hidden"
  >
    <div class="text-sm text-[#333333] font-bold flex items-center gap-2">
      <span>{{
        data?.card_number
          ? data.card_number.replace(/(.{4})/g, "$1 ").trim()
          : "---- ---- ---- ----"
      }}</span>
    </div>

    <div class="text-sm text-[#333333] font-bold flex items-center gap-2">
      <span>{{
        data?.shaba
          ? data.shaba.replace(/(.{4})/g, "$1 ").trim()
          : "---- ---- ---- ---- ---- ----"
      }}</span>

      <span>IR</span>
    </div>

    <div class="text-xs text-[#333333] font-bold flex items-center gap-2">
      <span>{{ user.name || "-" }}</span>
      <span>-</span>
      <span>بانک {{ data?.bank_name ? data.bank_name : "----" }}</span>
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
      <ArrowPathIcon v-if="loading" class="w-full h-full animate-spin" />
      <PencilSquareIcon v-else class="w-full h-full" />
    </button>
  </div>
</template>
