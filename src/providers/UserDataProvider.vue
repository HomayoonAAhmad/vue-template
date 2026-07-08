<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { watch } from "vue"
import AuthPage from "../pages/AuthPage.vue"
import { apiClient } from "../services/apiClient.ts"
import { userStore } from "../store/userStore"
import { endpoints } from "../constants/endpoints.ts"

const store = userStore()

const getUserData = async () => {
  const url = endpoints.USER.GET.USER_DATA
  return apiClient
    .get(url)
    .then((response) => {
      // console.log(response.data)
      store.setUserData({
        id: response.data.user.id,
        name: response.data.user.name,
        phone: response.data.user.phone,
        wallet_amount: response.data.user.wallet.amount,
        gold_amount: response.data.user.wallet.gold_amount,
      })
    })
    .catch((error) => {
      console.log(error)
      localStorage.clear()
    })
}

const { isLoading, refetch } = useQuery({
  queryKey: ["get-user-data"],
  queryFn: getUserData,
  enabled: store.hasData,
})

watch(
  () => store.hasData,
  (hasData) => {
    if (hasData) {
      refetch()
    }
  },
)
</script>

<template>
  <template v-if="store.hasData && !isLoading">
    <slot />
  </template>

  <template v-if="isLoading">
    <span>loading</span>
  </template>

  <AuthPage v-else />
</template>
