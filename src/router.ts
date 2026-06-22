import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "./components/layouts/MainLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "", component: MainLayout, children: [] }],
})

export default router
