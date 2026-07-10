<script setup lang="ts">
import { reactive } from "vue"
import Tab from "../components/UI/Tab.vue"
// import Button from "../components/UI/Button.vue"
// import { useRouter } from "vue-router"
import TransactionCard from "../components/cards/TransactionCard.vue"
// import { transactiondata } from "../constants/transactiondata"
// import { withdrawdata } from "../constants/withdrawdata"
import WithdrawCard from "../components/cards/WithdrawCard.vue"
import { useQuery } from "@tanstack/vue-query"
import { endpoints } from "../constants/endpoints.ts"
import { apiClient } from "../services/apiClient.ts"
import toast from "vue3-hot-toast"

const FILTER_TABS = [
  { id: "buy", name: "تاریخچه خرید" },
  { id: "withdraw", name: "برداشت ها" },
  { id: "sell", name: "تاریخچه فروش" },
]
interface State {
  activeTab: "buy" | "withdraw" | "sell"
}

const state = reactive<State>({
  activeTab: "buy",
})

// const router = useRouter()

const fetchTransactions = async () => {
  console.count("fetchTransactions")
  const url = endpoints.TRANSACTIONS.GET.TRANSACTIONS_LIST
  const config = {
    params: {
      type: state.activeTab,
    },
  }
  return apiClient
    .get(url, config)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.message)
      return error
    })
}

const { data } = useQuery({
  queryKey: ["get-transactions-list", () => state.activeTab],
  queryFn: fetchTransactions,
  staleTime: 1000 * 60,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
})
</script>

<template>
  <div
    class="flex flex-col w-full items-center justify-center gap-5.25 max-w-106.5 mx-auto"
  >
    <Tab v-model="state.activeTab" :options="FILTER_TABS" />

    <div
      class="w-full flex flex-col gap-5 max-h-[calc(100dvh-240px)] overflow-scroll scrollbar-hidden"
    >
      <template v-if="state.activeTab === 'buy'">
        <TransactionCard
          v-for="item in data?.data"
          :key="item.id"
          :data="item"
        ></TransactionCard>

        <!-- <div
          class="bg-[#fdf7ee] flex flex-col gap-4 md:gap-5 rounded-lg p-5 md:p-6"
        >
          <p class="text-sm font-semibold px-3 text-primary leading-6">
            تاریخچه خرید شما خالی است و برای سرمایه گذاری مطمئن، همین حالا طلا
            خریداری کنید.
          </p>

          <Button text="خرید طلا" @click="() => router.push('/')" />
        </div> -->
      </template>

      <template v-if="state.activeTab === 'sell'">
        <TransactionCard
          v-for="item in data?.data"
          :key="item.id"
          :data="item"
        ></TransactionCard>
      </template>

      <template v-if="state.activeTab === 'withdraw'">
        <WithdrawCard
          v-for="item in data.data"
          :key="item.id"
          :data="item"
        ></WithdrawCard>
      </template>
    </div>
  </div>
</template>
