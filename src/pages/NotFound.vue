<script setup lang="ts">
import { useRouter } from "vue-router"
import Button from "../components/UI/Button.vue"
import GoldPrice from "../components/universal/GoldPrice.vue"

const router = useRouter()
</script>

<template>
  <div class="flex flex-col w-full h-full min-h-dvh relative">
    <GoldPrice />

    <div
      class="md:px-22.25 md:py-13.5 py-6.75 px-6 flex-1 flex flex-col items-center justify-center w-full max-w-200 mx-auto p-5 md:gap-7.75 h-full"
    >
      <span class="text-3xl font-bold">خطای ۴۰۴ رخ داد!</span>

      <p class="text-[18px] font-semibold text-center max-w-78.5">
        متاسفانه آدرست مورد نظر شما اشتباه وارد شده
      </p>

      <Button text="بازگشت" class="md:w-[70%]" @click="() => router.back()" />
    </div>
  </div>
</template>
