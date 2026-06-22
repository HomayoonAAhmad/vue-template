<script setup lang="ts">
import { reactive } from "vue"
import Tab from "../components/UI/Tab.vue"

const FILTER_TABS = [
  { id: "INFO", name: "اطلاعات کاربری" },
  { id: "ASSETS", name: "دارایی ها" },
]

interface State {
  activeTab: "INFO" | "ASSETS"
}

const state = reactive<State>({
  activeTab: "ASSETS",
})

const componentMap = {
  INFO: "",
  ASSETS: "SellGoldSection",
}
</script>

<template>
  <div
    className="flex flex-col w-full h-full gap-5.25 max-w-106.5 md:max-w-full mx-auto md:grid md:grid-cols-2"
  >
    <div
      className="md:flex hidden flex-col mt-3 w-full items-center gap-4 p-1 mb-2"
    ></div>

    <div className="flex flex-col w-full h-full gap-5.25">
      <Tab v-model="state.activeTab" :options="FILTER_TABS" />

      <keep-alive>
        <component :is="componentMap[state.activeTab]" />
      </keep-alive>
    </div>
  </div>
</template>
