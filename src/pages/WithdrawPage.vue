<script setup lang="ts">
import { reactive } from "vue"
import BackButton from "../components/UI/BackButton.vue"
import Input from "../components/UI/Input.vue"
import BankInfoCard from "../components/cards/BankInfoCard.vue"
import Button from "../components/UI/Button.vue"
import Modal from "../components/UI/Modal.vue"
import { userStore } from "../store/userStore"
import Selectbox from "../components/UI/Selectbox.vue"
import { banks } from "../constants/banks"

const options = [1000000, 2000000, 3000000]

interface State {
  value: string
  openModal: boolean
  confirmModal: boolean
  bank: string
  shaba: string
}

const user = userStore()

const state = reactive<State>({
  value: "",

  openModal: false,
  confirmModal: false,

  bank: user.bank,
  shaba: user.shaba,
})

const bankOptions = banks.map((bank: { fa_name: string }) => ({
  key: bank.fa_name,
  label: bank.fa_name,
}))
</script>

<template>
  <div class="w-full flex flex-col">
    <BackButton text="برداشت از کیف پول" url="/profile" />

    <div class="flex mx-auto max-w-107.25 w-full flex-col gap-8 mt-13">
      <div class="flex flex-col gap-4">
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

      <BankInfoCard v-on:edit="() => (state.openModal = true)" />

      <Modal className="md:min-w-130!" v-model:open="state.openModal">
        <div class="flex flex-col gap-6">
          <Input
            type="number"
            :maxLength="16"
            id="shaba"
            v-model="state.shaba"
            name="shaba"
            label="شماره شبا"
          />

          <Selectbox
            :options="bankOptions"
            v-model="state.bank"
            id="bank"
            label="نام بانک"
          />

          <Button
            text="ثبت ویرایش"
            :disabled="!state.bank || !state.shaba"
            @click="
              () => {
                state.openModal = false
                user.setUserData({
                  ...user,
                  bank: state.bank,
                  shaba: state.shaba,
                })
              }
            "
          />
        </div>
      </Modal>
      <!-- {{ console.log(user) }} -->
      <Button
        text="شارژ"
        @click="() => (state.confirmModal = true)"
        :disabled="!state.value || !state.bank || !state.shaba"
      />
    </div>
  </div>

  <Modal v-model:open="state.confirmModal">
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
        هیچ پرداخت واقعی انجام نمی‌شود و اطلاعات وارد شده نیز ذخیره نخواهند شد.
      </p>

      <p class="text-sm leading-7">
        امیدوارم در نسخه‌های بعدی تجربه بهتری برای شما فراهم کنم. ❤️
      </p>
    </div>
  </Modal>
</template>
