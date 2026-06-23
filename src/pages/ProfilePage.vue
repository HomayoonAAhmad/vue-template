<script setup lang="ts">
import { reactive } from "vue"
import Tab from "../components/UI/Tab.vue"
import AssetsSection from "../components/universal/AssetsSection.vue"
import InfoSection from "../components/universal/InfoSection.vue"

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

      <Transition name="fade-slide" mode="out-in">
        <keep-alive>
          <component :is="componentMap[state.activeTab]" />
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
