<script setup lang="ts">
import { reactive } from "vue"
import Input from "../components/UI/Input.vue"
import Button from "../components/UI/Button.vue"
import { userStore } from "../store/userStore.ts"

const user = userStore()

interface State {
  name: string
  shaba: string
  national: string
  phone: string
}

const state = reactive<State>({
  name: "",
  shaba: "",
  national: "",
  phone: "",
})
</script>

<template>
  <div
    class="flex flex-col gap-4 w-full h-full min-h-dvh relative overflow-hidden"
  >
    <div
      class="px-6 md:px-0 w-full max-w-107 mx-auto flex items-center justify-center flex-col gap-10"
    >
      <p
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
      </p>

      <div
        class="flex w-full items-center px-5 justify-center flex-col gap-6 md:p-9.5 md:rounded-[22px] md:shadow-md bg-white"
      >
        <span
          class="text-primary font-extrabold text-[19px] text-nowrap md:text-[30px]"
        >
          به <span class="text-secondary">گودو </span>
          خوش آمدید!
        </span>

        <Input id="name" v-model="state.name" name="name" label="نام شما" />
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
          dir="ltr"
          type="number"
          id="phone"
          v-model="state.phone"
          name="phone"
          label="شماره تماس"
        />

        <Button
          text="ثبت اطلاعات"
          :disabled="!state.name || !state.phone"
          @click="
            () => {
              console.log(state)
              user.setUserData(state)
            }
          "
        />
      </div>
    </div>
  </div>
</template>
