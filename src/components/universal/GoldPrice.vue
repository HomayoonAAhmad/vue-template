<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { ref } from "vue"
import { endpoints } from "../../constants/endpoints"
import { apiClient } from "../../services/apiClient"
import { goldStore } from "../../store/goldStore"

const amount = ref<number>(0)

const gold = goldStore()

const getGoldPrice = async () => {
  const url = endpoints.GOLD.GET.GOLD_PRICE
  // "https://Api.BrsApi.ir/Market/Gold_Currency.php?key=BrgLrCK9YblUi3iJe7sYqeRJVu7Zgs7v"
  // const url = "https://api.digikala.com/non-inventory/v1/prices/"
  // const url = "/api/non-inventory/v1/prices/"

  return apiClient
    .get(url)
    .then((response) => {
      // const data = response.data?.gold?.[0]?.price
      // const price = Math.floor(Number(data) / 1000)
      const price = response.data.price
      amount.value = price || 0
      gold.setGoldPrice(price || 0)
      return price
    })
    .catch((err) => {
      console.log(err)
    })
}

const { isPending } = useQuery({
  queryKey: ["get-gold-price"],
  queryFn: getGoldPrice,
  staleTime: 1000 * 60,
  refetchInterval: 1000 * 60,
  // refetchOnWindowFocus: false,
  // refetchOnMount: false,
  // refetchInterval: 60000,
})
</script>

<template>
  <div
    class="bg-third py-3.75 md:py-4 md:px-22.25 px-6 flex items-center justify-between gap-5"
  >
    <div class="flex items-center gap-2">
      <span
        class="bg-white animate-pulse border md:border-1.5 border-secondary aspect-square rounded-full size-3.75 md:size-5 relative flex items-center justify-center"
      >
        <span
          class="bg-secondary aspect-square rounded-full size-2.25 md:size-3 absolute"
        />
      </span>
      <span class="text-xs md:text-[16px] font-medium text-primary">
        قیمت لحظه ای
        <strong class="font-bold"> ۱ میلی گرم </strong>
        طلا
      </span>
    </div>

    <div class="flex items-center gap-2">
      <div class="text-xs md:text-[16px] font-bold text-primary">
        <span v-if="isPending">-</span>
        <span v-else>
          {{ amount.toLocaleString() }}
        </span>
      </div>
      <span class="text-xs md:text-[16px] font-medium text-primary">
        ریال
      </span>
    </div>
  </div>
</template>
