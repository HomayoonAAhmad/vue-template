<script setup lang="ts">
import { reactive } from "vue"
import Button from "../components/UI/Button.vue"
import Input from "../components/UI/Input.vue"
import BackButton from "../components/UI/BackButton.vue"
// import Modal from "../components/UI/Modal.vue"
import { endpoints } from "../constants/endpoints.ts"
import { apiClient } from "../services/apiClient.ts"
import { useMutation } from "@tanstack/vue-query"
import toast from "vue3-hot-toast"

const options = [1000000, 2000000, 3000000]

interface State {
  value: string
  openModal: boolean
}

const state = reactive<State>({
  value: "",

  openModal: false,
})

const chargeWallet = (amount: State["value"]) => {
  const body = {
    amount: amount,
  }
  const url = endpoints.USER.POST.CHARGE_WALLET
  return apiClient.post(url, body)
}

const chargeWalletMutation = useMutation({
  mutationFn: chargeWallet,
  onSuccess: (response) => {
    toast.loading(
      "در حال انتقال به درگاه هستید، نیاز به انجام کاری از سمت شما نیست",
    )
    window.location.href = response.data.gateway_url
  },
  onError: (error) => {
    console.log("خطا:", error)
    toast.error(error.message)
  },
})
</script>

<template>
  <div class="w-full flex flex-col">
    <BackButton text="شارژ کیف پول" url="/profile" />

    <div class="flex flex-col max-w-107.25 w-full mx-auto gap-8 mt-13">
      <div class="flex flex-col gap-4">
        <!-- endContent={<span class="text-xs font-normal mr-2">تومان</span>} -->
        <Input
          id="value"
          v-model="state.value"
          dir="ltr"
          label="مبلغ پرداختی"
          type="number"
          separate
        />

        <div class="flex items-center flex-wrap gap-2.5">
          <button
            v-for="(item, index) in options"
            :key="index"
            @click="
              () => {
                state.value = String(item)
              }
            "
            class="text-xs transition-all active:scale-95 duration-300 lg:font-sm cursor-pointer lg:py-1.75 bg-[#F2F2F2] lg:px-5 px-4.25 py-1.25 rounded-full"
          >
            {{ Number(item).toLocaleString() }}
          </button>
        </div>
      </div>

      <Button
        text="شارژ"
        :loading="chargeWalletMutation.isPending.value"
        @click="
          () => {
            chargeWalletMutation.mutate(state.value)
          }
        "
        :disabled="!state.value"
      />
    </div>
  </div>

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
        شده. هیچ پرداخت واقعی انجام نمی‌شود و اطلاعات وارد شده نیز ذخیره نخواهند
        شد.
      </p>

      <p class="text-sm leading-7">
        امیدوارم در نسخه‌های بعدی تجربه بهتری برای شما فراهم کنم. ❤️
      </p>
    </div>
  </Modal> -->
</template>
