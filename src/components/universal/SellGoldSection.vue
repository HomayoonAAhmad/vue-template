<script setup lang="ts">
import { reactive } from "vue"
import { userStore } from "../../store/userStore.ts"
import Input from "../UI/Input.vue"
import Button from "../UI/Button.vue"
import Modal from "../UI/Modal.vue"
import { useMutation } from "@tanstack/vue-query"
import { endpoints } from "../../constants/endpoints.ts"
import { apiClient } from "../../services/apiClient.ts"
import { useRouter } from "vue-router"
import toast from "vue3-hot-toast"

const user = userStore()
const router = useRouter()

const emit = defineEmits<{
  (e: "edit"): void
}>()

interface State {
  amount: string
  openModal: boolean
}

const state = reactive<State>({
  amount: "",
  openModal: false,
})

const sellGold = (amount: State["amount"]) => {
  const body = {
    gold_amount: amount,
  }
  const url = endpoints.TRANSACTIONS.POST.SELL_GOLD
  return apiClient.post(url, body)
}

const sellGoldMutation = useMutation({
  mutationFn: sellGold,
  onSuccess: (response, variables) => {
    const wallet = response.data.result.wallet
    user.setUserData({
      gold_amount: wallet.gold_amount,
      wallet_amount: wallet.amount,
    })
    router.push(`/pay-check?id=${response.data.result.transaction.id}`)
  },
  onError: (error, variables) => {
    console.log("خطا:", error)
    toast.error(error.message)
  },
})
</script>

<template>
  <div
    v-if="user.gold_amount <= 0"
    class="bg-[#fdf7ee] flex flex-col gap-4 md:gap-5 rounded-lg p-5 md:p-6"
  >
    <p class="text-sm font-semibold px-3 text-primary leading-6">
      تاریخچه خرید شما خالی است و برای سرمایه گذاری مطمئن، همین حالا طلا
      خریداری کنید.
    </p>

    <Button text="خرید طلا" @click="emit('edit')" />
  </div>

  <div v-else class="flex flex-col gap-2">
    <span class="text-center mt-0 mb-3 text-sm font-medium">
      موجودی طلا: {{ user.gold_amount.toLocaleString() }} میلی گرم
    </span>

    <Input
      id="gold-amount"
      v-model="state.amount"
      dir="ltr"
      label="وزن طلا (میلی گرم)"
      type="number"
      separate
    />

    <Button
      text="فروش"
      class="w-full mt-4"
      :disabled="!state.amount"
      @click="
        () => {
          state.openModal = true
        }
      "
    />

    <Modal v-model:open="state.openModal">
      <div class="text-center flex flex-col gap-6">
        <p class="text-sm md:text-base font-medium text-center md:leading-7">
          آیا از فروش {{ Number(state.amount).toLocaleString() }} میلی گرم طلا
          اطمینان دارید؟
        </p>

        <div class="flex z-1 items-center w-full mb-1 gap-3">
          <Button
            class="w-full"
            text="بله"
            @click="
              () => {
                sellGoldMutation.mutate(state.amount)
              }
            "
            :loading="sellGoldMutation.isPending.value"
          />

          <Button
            class="w-full bg-[#e3e3e3]! text-black!"
            text="انصراف"
            @click="
              () => {
                state.openModal = false
              }
            "
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
