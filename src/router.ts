import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "./components/layouts/MainLayout.vue"
import DashboardPage from "./pages/DashboardPage.vue"
import ProfilePage from "./pages/ProfilePage.vue"
import TransactionsPage from "./pages/TransactionsPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        { path: "", component: DashboardPage },
        { path: "profile", component: ProfilePage },
        { path: "transactions", component: TransactionsPage },
      ],
    },
  ],
})

export default router
