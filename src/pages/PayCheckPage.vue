<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import BackButton from "../components/UI/BackButton.vue"
import { useQuery } from "@tanstack/vue-query"
import { endpoints } from "../constants/endpoints.ts"
import { apiClient } from "../services/apiClient.ts"
import InvoiceCard from "../components/cards/InvoiceCard.vue"

const router = useRouter()

const route = useRoute()
const id = route.query.id

const fetchTransaction = async () => {
  const url = endpoints.TRANSACTIONS.GET.SINGLE_TRANSACTION + id
  return apiClient
    .get(url)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}

const { isLoading, data } = useQuery({
  queryKey: ["get-single-transaction"],
  queryFn: fetchTransaction,
})
</script>

<template>
  <div
    class="w-full h-full min-h-dvh mx-auto flex flex-col relative overflow-hidden"
  >
    <div class="w-full absolute top-10 right-10">
      <BackButton text="بازگشت" url="/" />
    </div>

    <div
      className="w-full flex flex-col md:items-center px-10 md:justify-center max-w-130 mb-70 md:mb-75 mx-auto mt-auto"
    >
      <span v-if="isLoading"></span>
      <InvoiceCard v-else :data="data?.data" />
    </div>
  </div>
</template>
