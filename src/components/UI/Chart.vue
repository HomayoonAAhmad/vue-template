<script setup lang="ts">
import { computed } from "vue"
import { Line } from "vue-chartjs"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type TooltipItem,
  type ScriptableContext,
  type ChartDataset,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
)

const props = defineProps<{
  data: { x: string; y: number }[]
  unit?: string
}>()

const chartData = computed(() => {
  const gradientColor = (
    context: ScriptableContext<"line">,
  ): CanvasGradient | string => {
    const chart = context.chart
    const { ctx, chartArea } = chart

    if (!chartArea) return "rgba(15,118,110,0.4)"

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    )

    gradient.addColorStop(0, "rgba(15,118,110,0.4)")
    gradient.addColorStop(1, "rgba(15,118,110,0)")

    return gradient
  }

  return {
    labels: props.data.map((item) => item.x),
    datasets: [
      {
        data: props.data.map((item) => item.y),
        borderColor: "#0f766e",
        borderWidth: 5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointHoverBorderColor: "#e9ba58",
        pointHoverBackgroundColor: "#fff",
        backgroundColor: gradientColor,
      } as ChartDataset<"line", number[]>,
    ],
  }
})

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#eee",
      borderWidth: 1,
      callbacks: {
        title(items: TooltipItem<"line">[]) {
          return `زمان: ${items[0]?.label || ""}`
        },

        label(context: TooltipItem<"line">) {
          const value = context.parsed.y
          if (value === null || value === undefined) {
            return `${props.unit || ""}: N/A`
          }
          return `${props.unit || ""}: ${value.toLocaleString()}`
        },
      },
    },
  },

  scales: {
    y: {
      display: false,
    },

    x: {
      ticks: {
        color: "#6b7280",
        autoSkip: true,
        maxTicksLimit: 6,
      },

      grid: {
        display: false,
      },

      border: {
        color: "#e0e0e0",
        width: 2,
      },
    },
  },
}))
</script>

<template>
  <div class="h-50 w-full">
    <Line :data="chartData" :options="options" />
  </div>
</template>
