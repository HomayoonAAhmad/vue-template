<script setup lang="ts">
import moment from "moment-jalaali"
import type { withdrawTypes } from "../../types/transactions-types"

const props = defineProps<{
  data: withdrawTypes
}>()

const statusMap = {
  pending: {
    text: "در انتظار تایید",
    bgClassName: "bg-fourth/50",
    textClassName: "text-secondary",
  },
  success: {
    text: "پرداخت شده",
    bgClassName: "bg-green-100",
    textClassName: "text-green-800",
  },
  failed: {
    text: "رد شده",
    bgClassName: "bg-red-100",
    textClassName: "text-red-800",
  },
}

const status = statusMap[props.data.status] || "pending"
</script>

<template>
  <div
    class="flex flex-col gap-3.5 w-full rounded-xl border-fifth border p-3.25"
  >
    <div class="w-full flex items-center justify-between gap-4">
      <div
        class="flex items-center gap-1.5 rounded-full bg-[#f6f6f6] md:px-3 py-1 px-2.5"
      >
        <span class="text-xs md:text-sm font-normal">
          {{ data.total_amount.toLocaleString() }} تومان
        </span>
      </div>

      <div
        :class="status.bgClassName"
        class="flex items-center justify-center gap-1.5 min-w-22 rounded-full md:px-3 py-1 px-2.5"
      >
        <span
          :class="status.textClassName"
          class="text-xs md:text-sm font-normal"
        >
          {{ status.text }}
        </span>
      </div>
    </div>

    <div
      class="flex flex-col gap-2 relative text-center bg-secondary py-3 rounded-lg overflow-hidden"
    >
      <span class="text-sm md:text-base font-semibold">
        {{ data.bank_card.card_number.replace(/(.{4})/g, "$1 ").trim() }}
      </span>
      <span class="text-sm md:text-base font-semibold">
        IR {{ data.bank_card.shaba.replace(/(.{4})/g, "$1 ").trim() }}
      </span>
      <span class="text-xs md:text-sm font-medium">
        بانک {{ data.bank_card.bank_name }}
      </span>

      <div
        class="aspect-square size-18.75 -bottom-6 left-45 bg-primary/5 absolute rounded-lg rotate-45"
      />
      <div
        class="aspect-square size-16 -bottom-4.5 left-34 bg-primary/5 absolute rounded-lg rotate-45"
      />
    </div>

    <div
      dir="ltr"
      class="text-sm md:text-base text-center font-medium text-primary"
    >
      {{ moment(data.created_at).format("jYYYY/jMM/jDD - HH:mm") }}
    </div>
  </div>
</template>
