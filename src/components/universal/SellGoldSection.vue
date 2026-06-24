<script setup lang="ts">
import Button from "../UI/Button.vue"

const emit = defineEmits<{
  (e: "edit"): void
}>()
</script>

<template>
  <div class="bg-[#fdf7ee] flex flex-col gap-4 md:gap-5 rounded-lg p-5 md:p-6">
    <p class="text-sm font-semibold px-3 text-primary leading-6">
      تاریخچه خرید شما خالی است و برای سرمایه گذاری مطمئن، همین حالا طلا
      خریداری کنید.
    </p>

    <Button text="خرید طلا" @click="emit('edit')" />
  </div>
</template>
