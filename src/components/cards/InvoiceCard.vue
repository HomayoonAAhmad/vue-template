<script setup lang="ts">
import moment from "moment-jalaali"
import type { SingleTransaction } from "../../types/transactions-types"
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline"

const props = defineProps<{
  data: SingleTransaction
}>()

const statusMap = {
  success: {
    text: "موفق",
    icon: CheckBadgeIcon,
    title: "عملیات موفق",
    bg: "bg-fifth",
    border: "border-fifth",
    textColor: "text-primary",
  },
  failed: {
    text: "ناموفق",
    icon: XMarkIcon,
    title: "عملیات ناموفق",
    bg: "bg-[#ee0b1b]/5",
    border: "border-[#ee0b1b]/5",
    textColor: "text-[#ed0b1b]",
  },
  pending: {
    text: "در انتظار پرداخت",
    icon: ExclamationCircleIcon,
    title: "عملیات نا موفق",
    bg: "bg-secondary/5",
    border: "border-secondary/5",
    textColor: "text-secondary",
  },
}
const typeMap = {
  buy: "خرید",
  sell: "فروش",
  withdraw: "تصفیه حساب",
  deposit: "شارژ کیف پول",
}

const mapData = [
  {
    id: 1,
    value: `${props.data.total_amount.toLocaleString()} تومان`,
    label: "مبلغ تراکنش",
  },
  { id: 2, value: statusMap[props.data.status].text, label: "وضعیت تراکنش" },
  { id: 3, value: typeMap[props.data.type], label: "نوع عملیات" },
  {
    id: 4,
    value: moment(props.data.created_at).format("HH:mm - jYYYY/jMM/jDD"),
    label: "زمان تراکنش",
  },
]

console.log("props.data", props.data)
</script>

<template>
  <div
    class="flex flex-col w-full max-w-3xl rounded-xl overflow-hidden border bg-white"
    :class="statusMap[data.status].border"
  >
    <div
      :class="statusMap[data.status].bg"
      class="flex flex-col items-center gap-3 pt-6 pb-4"
    >
      <component
        class="size-10 aspect-square"
        :class="statusMap[data.status].textColor"
        :is="statusMap[data.status].icon"
      ></component>

      <span
        class="text-lg font-extrabold"
        :class="statusMap[data.status].textColor"
      >
        {{ statusMap[data.status].title }}
      </span>
    </div>

    <ul class="flex flex-col w-full gap-4 p-5 px-8">
      <template v-for="(item, index) in mapData" :key="index">
        <li class="w-full flex items-center gap-3 justify-between">
          <span class="text-xs md:text-sm font-medium text-[#999999]">
            {{ item.label }}
          </span>
          <span class="text-xs md:text-sm font-medium">
            {{ item.value || "-" }}
          </span>
        </li>

        <div
          v-if="mapData.length !== index + 1"
          class="h-px w-full"
          :class="statusMap[data.status].bg"
        />
      </template>
    </ul>
  </div>
</template>
