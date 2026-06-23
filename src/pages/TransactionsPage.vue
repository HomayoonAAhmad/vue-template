<script setup lang="ts">
import { reactive } from "vue"
import Tab from "../components/UI/Tab.vue"
import Button from "../components/UI/Button.vue"
import { useRouter } from "vue-router"
import TransactionCard from "../components/cards/TransactionCard.vue"
import { transactiondata } from "../constants/transactiondata"
import { withdrawdata } from "../constants/withdrawdata"
import WithdrawCard from "../components/cards/WithdrawCard.vue"

const FILTER_TABS = [
  { id: "BUY", name: "تاریخچه خرید" },
  { id: "WITHDRAW", name: "برداشت ها" },
  { id: "SELL", name: "تاریخچه فروش" },
]
interface State {
  activeTab: "BUY" | "WITHDRAW" | "SELL"
}

const state = reactive<State>({
  activeTab: "BUY",
})

const router = useRouter()
</script>

<template>
  <div
    class="flex flex-col w-full items-center justify-center gap-5.25 max-w-106.5 mx-auto"
  >
    <Tab v-model="state.activeTab" :options="FILTER_TABS" />

    <div
      class="w-full flex flex-col gap-5 max-h-[calc(100dvh-240px)] overflow-scroll scrollbar-hidden"
    >
      <template v-if="state.activeTab === 'BUY'">
        <div
          class="bg-[#fdf7ee] flex flex-col gap-4 md:gap-5 rounded-lg p-5 md:p-6"
        >
          <p class="text-sm font-semibold px-3 text-primary leading-6">
            تاریخچه خرید شما خالی است و برای سرمایه گذاری مطمئن، همین حالا طلا
            خریداری کنید.
          </p>

          <Button text="خرید طلا" @click="() => router.push('/')" />
        </div>
      </template>
      <template v-if="state.activeTab === 'SELL'">
        <TransactionCard
          v-for="item in transactiondata"
          :key="item.id"
          :data="item"
        ></TransactionCard>
      </template>

      <template v-if="state.activeTab === 'WITHDRAW'">
        <WithdrawCard
          v-for="item in withdrawdata"
          :key="item.id"
          :data="item"
        ></WithdrawCard>
      </template>
    </div>
  </div>
</template>
