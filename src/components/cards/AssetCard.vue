<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
import { userStore } from "../../store/userStore"
import { computed } from "vue"

const props = defineProps<{
  unit: string
  profit: number
}>()

const percent = computed(() => props.profit.toFixed(2))

const user = userStore()
</script>
<template>
  <div
    class="w-full bg-primary relative min-h-15 h-fit max-h-fit p-3.5 flex items-center justify-between rounded-xl overflow-hidden"
  >
    <div class="flex items-center gap-1.5">
      <div class="aspect-square size-7 md:size-9">
        <img
          src="/images/goldbar.png"
          alt="gold-bar"
          class="w-full h-full object-contain"
        />
      </div>
      <span class="text-lg md:text-base font-semibold text-white">
        {{ user.gold_amount }}
      </span>
      <span class="text-[10px] md:text-xs font-semibold text-white">
        میلی گرم
      </span>
    </div>

    <div class="flex items-center gap-1">
      <span class="text-[10px] md:text-xs font-medium text-white">
        سود شما:
      </span>

      <span dir="ltr" class="text-[10px] md:text-xs font-medium text-secondary">
        %{{ percent }}
      </span>
      <ChevronDownIcon class="size-4 text-secondary" />
    </div>

    <div
      class="aspect-square md:left-60 size-18.75 -bottom-10 left-45 bg-white/5 absolute rounded-lg rotate-45"
    />
    <div
      class="aspect-square md:left-46 size-16 -bottom-8 left-34 bg-white/5 absolute rounded-lg rotate-45"
    />
  </div>
</template>
