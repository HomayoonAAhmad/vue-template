<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import Input from "../UI/Input.vue"
import Button from "../UI/Button.vue"
import { WalletIcon } from "@heroicons/vue/24/outline"
import { goldStore } from "../../store/goldStore"
import { storeToRefs } from "pinia"
import { userStore } from "../../store/userStore.ts"
import Radio from "../UI/Radio.vue"
import { apiClient } from "../../services/apiClient.ts"
import { endpoints } from "../../constants/endpoints.ts"
import { useMutation } from "@tanstack/vue-query"
import toast from "vue3-hot-toast"
import { useRouter } from "vue-router"

const router = useRouter()

const gold = goldStore()
const user = userStore()
const { goldPrice } = storeToRefs(gold)

const focusedInput = ref<"amount" | "milligram" | null>(null)

const walletAmount = user.wallet_amount

const radioOptions = [
  {
    value: "wallet",
    title: "پرداخت از کیف پول",
    description: `موجودی کیف پول: ${walletAmount.toLocaleString()} تومان`,
    disabled: user.wallet_amount === 0,
  },
  {
    value: "gateway",
    title: "پرداخت از طریق درگاه بانکی",
  },
]

interface State {
  milligram: string
  amount: string
  payment_type: "wallet" | "gateway"
  unit: "milligram" | "gram"
}

const state = reactive<State>({
  milligram: "",
  amount: "",
  payment_type: "gateway",
  unit: "milligram",
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
    state.milligram = String(Math.round(amount / price))
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
    state.amount = String(Math.round(milligram * price))
    syncing.from = null
  },
)

const buyGold = (data: {
  payment_type: State["payment_type"]
  amount: State["amount"]
}) => {
  const body = {
    payment_type: data.payment_type,
    amount: data.amount,
  }
  const url = endpoints.TRANSACTIONS.POST.BUY_GOLD
  return apiClient.post(url, body)
}

const buyGoldMutation = useMutation({
  mutationFn: buyGold,
  onSuccess: (response, variables) => {
    if (variables.payment_type === "gateway") {
      toast.loading(
        "در حال انتقال به درگاه هستید، نیاز به انجام کاری از سمت شما نیست",
      )
      window.location.href = response.data.gateway_url
    }
    if (variables.payment_type === "wallet") {
      user.setUserData({
        wallet_amount: response.data.result.wallet.amount,
        gold_amount: response.data.result.wallet.gold_amount,
      })
      router.push(`/pay-check?id=${response.data.result.transaction.id}`)
      toast.success(response.data.message)
    }
  },
  onError: (error, variables) => {
    console.log("خطا:", error)
    toast.error(error.message)
  },
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <Input
      id="amount"
      v-model="state.amount"
      dir="ltr"
      label="مبلغ پرداختی (تومان)"
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

    <Radio v-model="state.payment_type" :options="radioOptions">
      <template #title>
        <div class="flex items-center gap-2 mb-3">
          <WalletIcon class="size-5 md:size-5" />
          <span class="text-xs md:text-sm font-bold">روش پرداخت</span>
        </div>
      </template>
    </Radio>

    <Button
      text="خرید"
      class="w-full mt-4"
      :loading="buyGoldMutation.isPending.value"
      :disabled="!state.amount"
      @click="
        () => {
          buyGoldMutation.mutate({
            payment_type: state.payment_type,
            amount: state.amount,
          })
        }
      "
    />

    <!-- <Modal v-model:open="state.openModal">
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
    </Modal> -->
  </div>
</template>
