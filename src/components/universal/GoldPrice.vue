<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import { goldStore } from "../../store/goldStore"

const loading = ref<boolean>(false)
const amount = ref<number>(0)

const gold = goldStore()

const getPrice = () => {
  const url =
    "https://Api.BrsApi.ir/Market/Gold_Currency.php?key=BrgLrCK9YblUi3iJe7sYqeRJVu7Zgs7v"
  // const url = "https://api.digikala.com/non-inventory/v1/prices/"
  // const url = "/api/non-inventory/v1/prices/"

  loading.value = true
  axios
  axios
    .get(url)
    .then((response) => {
      const data = response.data?.gold?.[0]?.price
      const price = Math.floor(Number(data) / 1000)
      amount.value = price || 0
      gold.setGoldPrice(price || 0)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getPrice()
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
        <span v-if="loading">-</span>
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
