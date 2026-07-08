<script setup lang="ts">
import { reactive } from "vue"
import Input from "../components/UI/Input.vue"
import Button from "../components/UI/Button.vue"
import { userStore } from "../store/userStore.ts"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { apiClient } from "../services/apiClient.ts"
import { endpoints } from "../constants/endpoints.ts"
import toast from "vue3-hot-toast"

const user = userStore()

interface State {
  // name: string
  // shaba: string
  // national: string
  phone: string
  code: string

  verify: boolean
}

const state = reactive<State>({
  // name: "",
  // shaba: "",
  // national: "",
  phone: "",
  code: "",
  verify: false,
})

const sendOtp = (phoneNumber: string) => {
  return apiClient.post(endpoints.AUTH.POST.REQUEST_OTP, {
    phone: phoneNumber,
  })
}

const requestOtpMutation = useMutation({
  mutationFn: sendOtp,
  onSuccess: (response, variables) => {
    toast.success("کد ارسال شد")
    console.log("موفقیت آمیز:", response.data)
    state.verify = true
  },

  onError: (error, variables) => {
    console.log("خطا:", error)
    toast.error("مشکلی رخ داد")
  },
})

const verifyOtp = (data: { phone: string; code: string }) => {
  return apiClient.post(endpoints.AUTH.POST.VERIFY_OTP, {
    phone: data.phone,
    code: data.code,
  })
}

const verifyOtpMutation = useMutation({
  mutationFn: verifyOtp,
  onSuccess: (response, variables) => {
    toast.success("با موفقیت انجام شد")
    console.log("موفقیت آمیز:", response.data)
    user.setUserData({
      token: response.data.token,
    })
  },

  onError: (error, variables) => {
    console.log("خطا:", error)
    toast.error("مشکلی رخ داد")
  },
})
</script>

<template>
  <div
    class="flex flex-col gap-4 w-full h-full min-h-dvh relative overflow-hidden"
  >
    <div
      class="px-6 md:px-0 w-full max-w-107 min-h-dvh mx-auto flex items-center justify-center flex-col gap-10"
    >
      <!-- <p
        class="bg-gray-200 p-4 text-sm w-full max-w-107 md:mx-auto rounded-xl mt-15 leading-6"
      >
        <strong>توجه:</strong>
        <br />
        این اپلیکیشن صرفاً برای اهداف آزمایشی و ارزیابی رابط کاربری (UI) و تجربه
        کاربری (UX) توسعه داده شده است.
        <br />
        اطلاعات واردشده توسط کاربران در
        <strong>هیچ پایگاه داده</strong> یا <strong>سامانه‌ای</strong> ذخیره
        نمی‌شود و پس از استفاده نگهداری نخواهد شد.
        <br />
        لطفاً از وارد کردن اطلاعات حساس یا محرمانه خودداری کنید. هدف از جمع‌آوری
        این اطلاعات تنها بررسی عملکرد، طراحی و بهبود تجربه کاربری اپلیکیشن است.
        <br />
        با تشکر
      </p> -->

      <div
        class="flex w-full items-center px-5 justify-center flex-col gap-6 md:p-9.5 md:rounded-[22px] md:shadow-md bg-white"
      >
        <span
          class="text-primary font-extrabold text-[19px] text-nowrap md:text-[30px]"
        >
          به <span class="text-secondary">گودو </span>
          خوش آمدید!
        </span>

        <!-- <Input id="name" v-model="state.name" name="name" label="نام شما" /> -->
        <!-- <Input
          type="number"
          :maxLength="16"
          id="shaba"
          v-model="state.shaba"
          name="shaba"
          label="شماره شبا"
        /> -->
        <!-- <Input
          type="number"
          id="national"
          v-model="state.national"
          name="national"
          label="کد ملی"
        /> -->
        <Input
          v-if="!state.verify"
          dir="ltr"
          type="number"
          id="phone"
          v-model="state.phone"
          name="phone"
          label="شماره تماس"
        />

        <template v-else>
          <p class="text-xs font-semibold">
            لطفا کد ارسال شده به پیامک خود را در این مکان وارد کنید!
          </p>
          <Input
            dir="ltr"
            type="number"
            id="code"
            v-model="state.code"
            name="code"
            :max-length="6"
            label="کد یکبار مصرف"
          />
        </template>

        <Button
          text="ارسال کد"
          :loading="requestOtpMutation.isPending.value"
          :disabled="state.verify ? !state.code : !state.phone"
          @click="
            () => {
              if (state.verify) {
                verifyOtpMutation.mutate({
                  phone: state.phone,
                  code: state.code,
                })
              } else {
                requestOtpMutation.mutate(state.phone)
              }
            }
          "
        />
      </div>
    </div>
  </div>
</template>
