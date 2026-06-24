import { defineStore } from "pinia"

interface goldData {
  goldPrice: number
}

export const goldStore = defineStore("gold", {
  state: (): goldData => ({
    goldPrice: 0,
  }),
  actions: {
    setGoldPrice(data: number) {
      this.goldPrice = data
    },
  },
})
