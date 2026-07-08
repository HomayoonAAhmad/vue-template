import { defineStore } from "pinia"

const authData = JSON.parse(localStorage.getItem("data") || "null")

interface UserData {
  id: number
  name: string
  // shaba: string
  // bank: string
  // national: string
  phone: string
  token: string
  wallet_amount: number
  gold_amount: number
}

export const userStore = defineStore("user", {
  state: (): UserData => ({
    id: authData?.id,
    name: authData?.name || "",
    // shaba: authData?.shaba || "",
    // bank: authData?.bank || "",
    // national: authData?.national || "",
    phone: authData?.phone || "",
    token: authData?.token || "",
    wallet_amount: authData?.wallet_amount || 0,
    gold_amount: authData?.gold_amount || 0,
  }),
  actions: {
    setUserData(data: Partial<UserData>) {
      this.$patch(data)
      localStorage.setItem("data", JSON.stringify(this.$state))
    },
  },
  getters: {
    hasData: (state) => {
      if (state.token) {
        return true
      }
      return false
    },
  },
})
