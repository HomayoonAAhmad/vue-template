<script setup lang="ts">
import { reactive } from "vue"
import Chart from "../components/UI/Chart.vue"
import Tab from "../components/UI/Tab.vue"
import BuyGoldSection from "../components/universal/BuyGoldSection.vue"
import SellGoldSection from "../components/universal/SellGoldSection.vue"
import { useQuery } from "@tanstack/vue-query"
import { apiClient } from "../services/apiClient.ts"
import { endpoints } from "../constants/endpoints.ts"
import toast from "vue3-hot-toast"
import moment from "moment-jalaali"
import { ChevronDownIcon } from "@heroicons/vue/24/outline"

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
  trend_direction: null | "DOWN" | "UP"
}

const state = reactive<State>({
  chartData: [],
  max_price: 0,
  min_price: 0,
  change_percentage: "",
  trend_direction: null,

  selectedValue: "BUY",
})

// const actions = {
//   setData(data: Omit<State, "selectedValue">) {
//     state.chartData = data.chartData
//     state.max_price = data.max_price
//     state.min_price = data.min_price
//     state.change_percentage = data.change_percentage
//     state.trend_direction = data.trend_direction
//   },
// }

// const getChartData = () => {
//   // const url = "/api/non-inventory/v1/prices/chart/daily/?asset_type=gold18"
//   // const url = "https://api.digikala.com/non-inventory/v1/prices/chart/daily/?asset_type=gold18"
//   const url =
//     "https://Api.BrsApi.ir/Market/Gold_Currency_Pro.php?key=BrgLrCK9YblUi3iJe7sYqeRJVu7Zgs7v&&history=1&symbol=IR_GOLD_18K"
//   axios
//     .get(url)
//     .then((response) => {
//       const res = response.data.history_24h
//       const now = res[0].time_unix
//       const twelveHoursAgo = now - 12 * 60 * 60
//       const last12Hours = res.filter(
//         (item: any) => item.time_unix >= twelveHoursAgo,
//       )
//       const filteredRes = last12Hours
//         .filter((_: any, index: number) => index % 30 === 0)
//         .reverse()

//       const prices = filteredRes.map((item: any) => item.price)
//       const maxPrice = Math.max(...prices)
//       const minPrice = Math.min(...prices)
//       const data: Omit<State, "selectedValue"> = {
//         chartData: filteredRes.map((item: { time: string; price: number }) => ({
//           x: item.time,
//           y: Math.floor(item.price / 1000),
//         })),
//         max_price: Math.floor(maxPrice / 1000),
//         min_price: Math.floor(minPrice / 1000),
//         change_percentage: "0",
//       }

//       actions.setData(data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//     .finally(() => {})
// }

// onMounted(() => {
//   getChartData()
// })

const componentMap = {
  BUY: BuyGoldSection,
  SELL: SellGoldSection,
}

const fetchGoldChart = async () => {
  const url = endpoints.GOLD.GET.GOLD_CHART
  return apiClient
    .get(url)
    .then((response) => {
      const data: Omit<State, "selectedValue"> = {
        chartData: response.data?.buckets?.map(
          (item: { date_time: string; price: number }) => ({
            x: moment(item.date_time).format("HH:mm"),
            y: Math.round(item.price / 10),
          }),
        ),
        max_price: Math.round(response.data?.max_price / 10),
        min_price: Math.round(response.data?.min_price / 10),
        change_percentage: response.data?.change_percentage,
        trend_direction: response.data?.trend_direction,
      }

      // actions.setData(data)

      return data
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.message)
      return error
    })
}

const { data } = useQuery({
  queryKey: ["fetch-gold-chart"],
  queryFn: fetchGoldChart,
  staleTime: 1000 * 60,
  // refetchOnMount: false,
  // refetchOnWindowFocus: false,
  // refetchOnReconnect: false,
})
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-13.25 max-h-[calc(100dvh-230px)] overflow-scroll scrollbar-hidden"
  >
    <div class="flex flex-col w-full items-center gap-4">
      <span class="w-full text-xs md:text-sm font-medium">
        نمودار تغییرات قیمت طلا در ۲۴ ساعت گذشته
      </span>

      <div
        class="flex flex-col gap-4 px-7.5 py-5.75 border w-full border-fifth shadow-sm rounded-xl"
      >
        <Chart :data="data?.chartData || []" />

        <div
          class="flex items-center justify-between gap-4 bg-[#F7F8FA] px-8 py-3 rounded-md"
        >
          <div class="flex flex-col gap-2 items-center">
            <span class="text-[10px]">تغییرات</span>
            <span
              :class="
                state.trend_direction === 'UP'
                  ? 'text-green-500'
                  : 'text-red-500'
              "
              dir="ltr"
              class="text-xs flex items-center gap-0.5"
            >
              <ChevronDownIcon class="aspect-square size-3" />
              {{ data?.change_percentage?.toLocaleString() || "-" }}%
            </span>
          </div>

          <div class="flex flex-col gap-2 items-center">
            <span class="text-[10px]">پایین ترین قیمت</span>
            <span class="text-xs"
              >{{ data?.min_price?.toLocaleString() || "-" }} ریال</span
            >
          </div>

          <div class="flex flex-col gap-2 items-center">
            <span class="text-[10px]">بالاترین قیمت</span>
            <span class="text-xs"
              >{{ data?.max_price?.toLocaleString() || "-" }} ریال</span
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
