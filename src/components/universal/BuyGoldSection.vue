<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import Input from "../UI/Input.vue"
import Button from "../UI/Button.vue"
import { WalletIcon } from "@heroicons/vue/24/outline"
import Modal from "../UI/Modal.vue"
import { goldStore } from "../../store/goldStore"
import { storeToRefs } from "pinia"

const gold = goldStore()
const { goldPrice } = storeToRefs(gold)

const focusedInput = ref<"amount" | "milligram" | null>(null)

const walletAmount = 0

interface State {
  milligram: string
  amount: string
  payment_type: "WALLET" | "CASH"
  unit: "milligram" | "gram"
  openModal: boolean
  loading: boolean
}

const state = reactive<State>({
  milligram: "",
  amount: "",
  payment_type: "CASH",
  unit: "milligram",

  openModal: false,
  loading: false,
})

const syncing = reactive<{
  from: "amount" | "milligram" | null
}>({
  from: null,
})

const toNumber = (value: string) => {
  return Number(value)
}

watch(
  () => state.amount,
  (newAmount) => {
    if (focusedInput.value !== "amount") return
    if (syncing.from === "milligram") return

    const price = Number(goldPrice.value)
    const amount = toNumber(newAmount)

    if (!newAmount || newAmount === "0" || !price) {
      syncing.from = "amount"
      state.milligram = ""
      syncing.from = null
      return
    }

    syncing.from = "amount"
    state.milligram = String(Math.floor(amount / price))
    syncing.from = null
  },
)

watch(
  () => state.milligram,
  (newMilligram) => {
    if (focusedInput.value !== "milligram") return
    if (syncing.from === "amount") return

    const price = Number(goldPrice.value)
    const milligram = toNumber(newMilligram)

    if (!newMilligram || !price) {
      syncing.from = "milligram"
      state.amount = ""
      syncing.from = null
      return
    }

    syncing.from = "milligram"
    state.amount = String(Math.floor(milligram * price))
    syncing.from = null
  },
)
</script>

<template>
  <div class="flex flex-col gap-5">
    <Input
      id="amount"
      v-model="state.amount"
      dir="ltr"
      label="مبلغ پرداختی"
      type="number"
      separate
      @focus="focusedInput = 'amount'"
    />

    <Input
      id="milligram"
      v-model="state.milligram"
      dir="ltr"
      label="وزن طلا (میلی گرم)"
      type="number"
      separate
      @focus="focusedInput = 'milligram'"
    />

    <div
      class="p-4.5 border shadow-sm border-fifth rounded-xl pb-5 flex flex-col gap-5"
    >
      <div class="flex items-center gap-2 mb-3">
        <WalletIcon class="size-5 md:size-5" />
        <span class="text-xs md:text-sm font-bold">روش پرداخت</span>
      </div>

      <div class="flex items-center cursor-not-allowed opacity-50 gap-2">
        <span
          class="aspect-square border-2 rounded-full border-gray-200 size-5"
        ></span>
        <div class="flex flex-col gap-1">
          <span class="text-xs md:text-sm font-semibold">
            پرداخت از کیف پول
          </span>
          <span class="text-[10px] text-[#828282] font-light">
            موجودی کیف پول: {{ walletAmount.toLocaleString() }} ریال
          </span>
        </div>
      </div>

      <div class="h-px w-full bg-gray-200" />

      <div class="flex items-center gap-2">
        <span
          class="aspect-square border-2 flex items-center p-0.75 rounded-full border-primary size-5"
        >
          <span class="rounded-full w-full h-full bg-primary"></span>
        </span>
        <div class="flex w-full items-center justify-between">
          <span class="text-xs md:text-sm font-semibold">
            پرداخت از طریق درگاه بانکی
          </span>
        </div>
      </div>
    </div>

    <Button
      text="خرید"
      class="w-full mt-4"
      :disabled="!state.milligram || state.loading"
      @click="() => (state.openModal = true)"
    />

    <Modal v-model:open="state.openModal">
      <div class="text-center flex flex-col gap-4">
        <h3 class="font-bold text-lg">ممنون از همراهی شما 🌱</h3>

        <p class="text-sm leading-7 text-gray-600">
          اگر این پیام را می‌بینید یعنی تا اینجای مسیر همراه من بوده‌اید و از
          اپلیکیشن استفاده کرده‌اید؛ بابت این موضوع واقعاً از شما ممنونم.
        </p>

        <p class="text-sm leading-7 text-gray-600">
          این اپلیکیشن فعلاً یک نسخه آزمایشی است و صرفاً برای تست قابلیت‌ها و
          بهبود تجربه توسعه با
          <span class="font-black text-[16px] text-[#41B883]">vuejs</span> ساخته
          شده.
          <br />
          هیچ پرداخت واقعی انجام نمی‌شود و اطلاعات وارد شده نیز ذخیره نخواهند
          شد.
        </p>

        <p class="text-sm leading-7">
          امیدوارم در نسخه‌های بعدی تجربه بهتری برای شما فراهم کنم. ❤️
        </p>
      </div>
    </Modal>
  </div>
</template>
