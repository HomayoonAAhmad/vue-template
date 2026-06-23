import { defineStore } from "pinia"

const authData = JSON.parse(localStorage.getItem("data") || "null")

interface UserData {
  name: string
  shaba: string
  national: string
  phone: string
}

export const userStore = defineStore("user", {
  state: (): UserData => ({
    name: authData?.name || "",
    shaba: authData?.shaba || "",
    national: authData?.national || "",
    phone: authData?.phone || "",
  }),
  actions: {
    setUserData(data: Partial<UserData>) {
      this.$patch(data)
      localStorage.setItem("data", JSON.stringify(this.$state))
    },
  },
  getters: {
    hasData: (state) => {
      if (state.name || state.shaba || state.national || state.phone) {
        return true
      }
      return false
    },
  },
})
