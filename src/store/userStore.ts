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
}

export const userStore = defineStore("user", {
  state: (): UserData => ({
    id: authData?.name,
    name: authData?.name || "",
    // shaba: authData?.shaba || "",
    // bank: authData?.bank || "",
    // national: authData?.national || "",
    phone: authData?.phone || "",
    token: authData?.token || "",
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
