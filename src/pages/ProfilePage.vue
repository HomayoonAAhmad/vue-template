<script setup lang="ts">
import { computed, reactive } from "vue"
import Tab from "../components/UI/Tab.vue"
import AssetsSection from "../components/universal/AssetsSection.vue"
import InfoSection from "../components/universal/InfoSection.vue"
import { useQuery } from "@tanstack/vue-query"
import { apiClient } from "../services/apiClient.ts"
import toast from "vue3-hot-toast"
import { endpoints } from "../constants/endpoints.ts"
import Chart from "../components/UI/Chart.vue"
import moment from "moment-jalaali"

const FILTER_TABS = [
  { id: "ASSETS", name: "دارایی ها" },
  { id: "INFO", name: "اطلاعات کاربری" },
]

interface State {
  activeTab: "INFO" | "ASSETS"
}

const state = reactive<State>({
  activeTab: "ASSETS",
})

const componentMap = {
  ASSETS: AssetsSection,
  INFO: InfoSection,
}

const fetchUserAssets = async () => {
  const url = endpoints.USER.GET.USER_ASSETS

  return apiClient
    .get(url)
    .then((response) => {
      // console.log(response)
      return response.data
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.message)
      return error
    })
}

const { isLoading, data } = useQuery({
  queryKey: ["fetch-user-assets"],
  queryFn: fetchUserAssets,
  staleTime: 1000 * 60,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
})

const chartData = computed(
  () =>
    data.value?.chart?.map((item: { time: string; asset: number }) => ({
      x: moment(item.time).format("jMM/jDD"),
      y: item.asset,
    })) ?? [],
)
</script>

<template>
  <div
    class="flex flex-col w-full h-full gap-5.25 max-w-106.5 md:max-w-full mx-auto md:grid md:grid-cols-2"
  >
    <div
      class="md:flex hidden flex-col mt-3 w-full items-center gap-4 p-1 mb-2"
    >
      <span class="w-full text-xs md:text-sm font-medium">
        نمودار تغییر دارایی های شما
      </span>

      <div
        class="flex flex-col gap-4 px-7.5 py-5.75 border w-full border-fifth shadow-sm rounded-xl"
      >
        <Chart :data="chartData" />
      </div>
    </div>

    <div class="flex flex-col w-full h-full gap-5.25">
      <Tab v-model="state.activeTab" :options="FILTER_TABS" />

      <Transition name="fade-slide" mode="out-in">
        <keep-alive>
          <component
            :profit="data?.profitPercent ?? 0"
            :chart-data="chartData"
            :is="componentMap[state.activeTab]"
          />
        </keep-alive>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
