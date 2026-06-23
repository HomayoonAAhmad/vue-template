<script setup lang="ts">
import moment from "moment-jalaali"
import type { withdrawTypes } from "../../types/transactions-types"

const props = defineProps<{
  data: withdrawTypes
}>()

const statusMap = {
  PENDING: {
    text: "در انتظار تایید",
    bgClassName: "bg-fourth/50",
    textClassName: "text-secondary",
  },
  APPROVED: {
    text: "در انتظار پرداخت",
    bgClassName: "bg-green-100",
    textClassName: "text-green-800",
  },
  REJECTED: {
    text: "رد شده",
    bgClassName: "bg-red-100",
    textClassName: "text-red-800",
  },
  PAID_TO_USER: {
    text: "پرداخت شده",
    bgClassName: "bg-fifth",
    textClassName: "text-primary",
  },
}

const status = statusMap[props.data.status] || "PENDING"
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
          {{ data.amount.toLocaleString() }} تومان
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
        IR {{ data.shabaNumber }}
      </span>
      <span class="text-xs md:text-sm font-medium">
        بانک {{ data.bankName }}
      </span>

      <div
        class="aspect-square size-18.75 -bottom-6 left-45 bg-primary/5 absolute rounded-lg rotate-45"
      />
      <div
        class="aspect-square size-16 -bottom-4.5 left-34 bg-primary/5 absolute rounded-lg rotate-45"
      />
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
