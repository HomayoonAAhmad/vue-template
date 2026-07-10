<script setup lang="ts">
import { computed, reactive } from "vue"
import BackButton from "../components/UI/BackButton.vue"
import Input from "../components/UI/Input.vue"
import BankInfoCard from "../components/cards/BankInfoCard.vue"
import Button from "../components/UI/Button.vue"
import Modal from "../components/UI/Modal.vue"
import { userStore } from "../store/userStore"
import Selectbox from "../components/UI/Selectbox.vue"
import { banks } from "../constants/banks"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { apiClient } from "../services/apiClient.ts"
import { endpoints } from "../constants/endpoints.ts"
import toast from "vue3-hot-toast"

const options = [1000000, 2000000, 3000000]

interface State {
  value: string

  openModal: boolean
  add_card_mode: boolean

  bank: string
  shaba: string
  card_number: string

  selected_card: number | null
}

const user = userStore()

const state = reactive<State>({
  value: "",

  openModal: false,
  add_card_mode: false,

  bank: "",
  shaba: "",
  card_number: "",

  selected_card: Number(localStorage.getItem("last_card")) || null,
})

const bankOptions = banks.map((bank: { fa_name: string }) => ({
  key: bank.fa_name,
  label: bank.fa_name,
}))

const fetchCardsList = async () => {
  const url = endpoints.CARD.GET.LIST
  return apiClient
    .get(url)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.message)
      return error
    })
}

const { isLoading, data, refetch } = useQuery({
  queryKey: ["get-cardsList"],
  queryFn: fetchCardsList,
  staleTime: 1000 * 60,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  // enabled: () => state.openModal,
})

const cardsOption = computed(
  () =>
    data.value?.map(
      (item: { id: number; card_number: string; bank_name: string }) => ({
        key: item.id,
        label: `${item.card_number?.replace(/(.{4})/g, "$1 ").trim()} - ${item.bank_name}`,
      }),
    ) ?? [],
)

const createCard = (data: {
  bank: string
  shaba: string
  card_number: string
}) => {
  const body = {
    shaba: data.shaba,
    bank_name: data.bank,
    card_number: data.card_number,
  }
  const url = endpoints.CARD.POST.CREATE
  return apiClient.post(url, body)
}

const createCardMutation = useMutation({
  mutationFn: createCard,
  onSuccess: (response) => {
    console.log(response)
    refetch()
    state.selected_card = response.data.id
    state.openModal = false
    state.add_card_mode = false
    toast.success(response.data.message)
  },
  onError: (error) => {
    console.log("خطا:", error)
    toast.error(error.message)
  },
})

const selectedCardData = computed(() => {
  return (
    data.value?.find(
      (item: { id: number }) => item.id === state.selected_card,
    ) ?? null
  )
})

const sendWithdrawRequest = (data: { amount: string; cardId: number }) => {
  const body = {
    amount: data.amount,
    card_id: data.cardId,
  }
  const url = endpoints.TRANSACTIONS.POST.WITHDRAW
  return apiClient.post(url, body)
}

const sendWithdrawRequestMutation = useMutation({
  mutationFn: () =>
    sendWithdrawRequest({
      amount: state.value,
      cardId: state.selected_card as number,
    }),
  onSuccess: (response) => {
    console.log()
    localStorage.setItem("last_card", String(state.selected_card))
    toast.success(response.data.message)
  },
  onError: (error) => {
    toast.error(error.message)
  },
})
</script>

<template>
  <div class="w-full flex flex-col">
    <BackButton text="برداشت از کیف پول" url="/profile" />

    <div class="flex mx-auto max-w-107.25 w-full flex-col gap-8 mt-13">
      <div class="flex flex-col gap-4">
        <span class="w-full text-center text-sm font-semibold"
          >موجودی کیف پول: {{ user.wallet_amount.toLocaleString() }}</span
        >
        <Input
          id="value"
          v-model="state.value"
          dir="ltr"
          label="مبلغ درخواستی"
          type="number"
          separate
        />

        <div class="flex items-center flex-wrap gap-2.5">
          <button
            v-for="(item, index) in options"
            :key="index"
            @click="
              () => {
                state.value = String(item)
              }
            "
            class="text-xs transition-all active:scale-95 duration-300 lg:font-sm cursor-pointer lg:py-1.75 bg-[#F2F2F2] lg:px-5 px-4.25 py-1.25 rounded-full"
          >
            {{ Number(item).toLocaleString() }}
          </button>
        </div>
      </div>

      <BankInfoCard
        v-on:edit="() => (state.openModal = true)"
        :loading="isLoading"
        :data="selectedCardData"
      />

      <Modal className="md:min-w-130!" v-model:open="state.openModal">
        <div class="flex flex-col gap-5 mt-4">
          <Selectbox
            v-if="cardsOption?.length && !state.add_card_mode"
            :options="cardsOption"
            v-model="state.selected_card"
            id="selected_card"
            label="انتخاب از کارت های قبلی"
          />

          <div
            v-if="cardsOption?.length && !state.add_card_mode"
            class="flex items-center justify-between gap-4"
          >
            <Button
              text="انتخاب کارت"
              :disabled="!state.selected_card"
              @click="
                () => {
                  state.openModal = false
                }
              "
            />

            <Button
              class="w-full bg-[#e3e3e3]! text-black!"
              text="افزودن کارت جدید"
              @click="
                () => {
                  state.add_card_mode = true
                }
              "
            />
          </div>
          <template
            v-if="
              // (cardsOption?.length && state.selected_card) ||
              !cardsOption?.length || state.add_card_mode
            "
          >
            <Input
              type="number"
              :maxLength="16"
              id="card_number"
              v-model="state.card_number"
              name="card_number"
              label="شماره کارت"
            />

            <Input
              type="number"
              :maxLength="24"
              id="shaba"
              v-model="state.shaba"
              name="shaba"
              label="شماره شبا"
            />

            <Selectbox
              :options="bankOptions"
              v-model="state.bank"
              id="bank"
              label="نام بانک"
            />

            <div class="flex items-center justify-between gap-4">
              <Button
                text="ثبت کارت جدید"
                :loading="createCardMutation.isPending.value"
                :disabled="!state.bank || !state.shaba || !state.card_number"
                @click="
                  () => {
                    createCardMutation.mutate({
                      bank: state.bank,
                      shaba: state.shaba,
                      card_number: state.card_number,
                    })
                  }
                "
              />

              <Button
                text="انصراف"
                class="w-full bg-[#e3e3e3]! text-black!"
                :disabled="createCardMutation.isPending.value"
                @click="
                  () => {
                    state.add_card_mode = false
                  }
                "
              />
            </div>
          </template>
        </div>
      </Modal>

      <Button
        text="شارژ"
        @click="
          () => {
            sendWithdrawRequestMutation.mutate()
          }
        "
        :loading="sendWithdrawRequestMutation.isPending.value"
        :disabled="!state.value || !state.selected_card"
      />
    </div>
  </div>
</template>
