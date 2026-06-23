<script setup lang="ts">
import moment from "moment-jalaali"
import type { transactionTypes } from "../../types/transactions-types"

const props = defineProps<{
  data: transactionTypes
}>()
</script>

<template>
  <div
    class="flex flex-col gap-3.5 w-full rounded-xl border-fifth border p-3.25"
  >
    <div class="w-full flex items-center justify-between gap-4">
      <div
        class="flex items-center gap-1.5 rounded-full bg-[#f6f6f6] md:px-3 py-1 px-2.25"
      >
        <div class="aspect-square md:size-5 size-4">
          <img
            src="/images/goldbar.png"
            alt="goldbar"
            class="w-full h-full object-contain"
          />
        </div>

        <span class="text-xs md:text-sm font-normal">
          {{ data.milligram.toLocaleString() }} گرم طلا
        </span>
      </div>

      <span
        class="text-xs md:text-sm font-normal gap-0.5 md:gap-1 flex items-center"
      >
        {{ data.amount.toLocaleString() }}
        <span class="text-[10px] md:text-xs">تومان</span>
      </span>
    </div>
    <div class="w-full mt-1">
      <Line />
    </div>
    <div
      dir="ltr"
      class="text-sm md:text-base text-center font-medium text-primary"
    >
      {{ moment(data.createdAt).format("jYYYY/jMM/jDD - HH:mm") }}
    </div>
  </div>
</template>
