<script setup lang="ts">
import axios from "axios"
import { onMounted, reactive } from "vue"
import Chart from "../components/UI/Chart.vue"
import moment from "moment-jalaali"
import Tab from "../components/UI/Tab.vue"
import BuyGoldSection from "../components/universal/BuyGoldSection.vue"
import SellGoldSection from "../components/universal/SellGoldSection.vue"

const options = [
  { id: "BUY", name: "خرید" },
  { id: "SELL", name: "فروش" },
]

interface State {
  chartData: { x: string; y: number }[]
  max_price: number
  min_price: number
  change_percentage: string
  selectedValue: "SELL" | "BUY"
}

const state = reactive<State>({
  chartData: [],
  max_price: 0,
  min_price: 0,
  change_percentage: "",

  selectedValue: "BUY",
})

const actions = {
  setData(data: Omit<State, "selectedValue">) {
    state.chartData = data.chartData
    state.max_price = data.max_price
    state.min_price = data.min_price
    state.change_percentage = data.change_percentage
  },
}

const getChartData = () => {
  const url = "/api/non-inventory/v1/prices/chart/daily/?asset_type=gold18"
  axios
    .get(url)
    .then((response) => {
      const res = response.data
      const data: Omit<State, "selectedValue"> = {
        chartData: res.buckets.map(
          (item: { date_time: string; price: number }) => ({
            x: moment(item.date_time).format("HH:mm"),
            y: item.price,
          }),
        ),
        max_price: res.max_price,
        min_price: res.min_price,
        change_percentage: res.change_percentage,
      }

      actions.setData(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}

onMounted(() => {
  getChartData()
})

const componentMap = {
  BUY: BuyGoldSection,
  SELL: SellGoldSection,
}
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-13.25 max-h-[calc(100dvh-230px)] overflow-scroll scrollbar-hidden"
  >
    <div class="flex flex-col w-full items-center gap-4">
      <span class="w-full text-xs md:text-sm font-medium">
        نمودار قیمت طلا
      </span>

      <div
        class="flex flex-col gap-4 px-7.5 py-5.75 border w-full border-fifth shadow-sm rounded-xl"
      >
        <Chart :data="state.chartData" />

        <div
          class="flex items-center justify-between gap-4 bg-[#F7F8FA] px-8 py-3 rounded-md"
        >
          <div class="flex flex-col gap-2 items-center">
            <span class="text-[10px]">بالاترین قیمت</span>
            <span class="text-xs"
              >{{ state.max_price.toLocaleString() }} ریال</span
            >
          </div>

          <div class="flex flex-col gap-2 items-center">
            <span class="text-[10px]">پایین ترین قیمت</span>
            <span class="text-xs"
              >{{ state.min_price.toLocaleString() }} ریال</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 p-1">
      <span class="w-full text-xs md:text-sm font-medium">
        خرید و فروش طلا
      </span>

      <Tab v-model="state.selectedValue" :options="options" class="mb-3" />

      <keep-alive>
        <component
          :is="componentMap[state.selectedValue]"
          @edit="state.selectedValue = 'BUY'"
        />
      </keep-alive>
    </div>
  </div>
</template>
