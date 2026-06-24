import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "./components/layouts/MainLayout.vue"
import DashboardPage from "./pages/DashboardPage.vue"
import ProfilePage from "./pages/ProfilePage.vue"
import TransactionsPage from "./pages/TransactionsPage.vue"
import ChargeWalletPage from "./pages/ChargeWalletPage.vue"
import WithdrawPage from "./pages/WithdrawPage.vue"
import NotFound from "./pages/NotFound.vue"
import PortfolioPage from "./pages/PortfolioPage.vue"

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
        { path: "/wallet/charge", component: ChargeWalletPage },
        { path: "/wallet/withdraw", component: WithdrawPage },
        { path: "/me", component: PortfolioPage },
      ],
    },
    // { path: "/me", component: PortfolioPage },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
})

export default router
