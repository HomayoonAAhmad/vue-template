<script setup lang="ts">
import AssetCard from "../cards/AssetCard.vue"
import WalletCard from "../cards/WalletCard.vue"
import Chart from "../UI/Chart.vue"

const props = defineProps<{
  profit: number
  chartData: { x: string; y: number }[]
}>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <AssetCard unit="میلی گرم" :profit="props.profit" />

    <WalletCard />

    <div
      class="flex md:hidden flex-col mt-3 w-full items-center gap-4 p-1 mb-2"
    >
      <span class="w-full text-xs md:text-sm font-medium">
        نمودار دارایی های شما
      </span>

      <div
        class="flex flex-col gap-4 px-7.5 py-5.75 border w-full border-fifth shadow-sm rounded-xl"
      >
        <Chart :data="props.chartData" />
      </div>
    </div>
  </div>
</template>
