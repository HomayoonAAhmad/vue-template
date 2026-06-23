<script setup lang="ts">
import { useRouter } from "vue-router"
import Button from "../UI/Button.vue"

const walletAmount = 10000000

const router = useRouter()
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center gap-7 bg-secondary relative py-3 px-4 rounded-xl"
  >
    <div class="flex items-center w-full justify-between">
      <div class="flex items-center gap-1.5">
        <WalletIcon class="size-5" />

        <span class="text-xs md:text-sm font-medium">موجودی کیف پول</span>
      </div>

      <div class="flex items-center gap-1.5">
        <span class="text-sm md:text-md font-medium">
          {{ walletAmount.toLocaleString() }}
        </span>
        <span class="text-[10px] md:text-xs font-medium">ریال</span>
      </div>
    </div>

    <div class="flex z-1 items-center w-full mb-1 gap-3">
      <Button
        class="w-full bg-[#333333]!"
        text="شارژ کیف پول"
        @click="() => router.push('/wallet/charge')"
      />
      <Button
        class="w-full bg-white text-black!"
        text="برداشت از کیف پول"
        @click="() => router.push('/wallet/withdraw')"
      />
    </div>

    <div
      class="aspect-square size-18.75 md:left-60 left-45 bg-primary/5 absolute rounded-lg rotate-45"
    />
    <div
      class="aspect-square size-16 md:left-46 left-34 bg-primary/5 absolute rounded-lg rotate-45"
    />
  </div>
</template>
