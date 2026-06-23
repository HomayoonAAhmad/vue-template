export type transactionTypes = {
  id: number
  milligram: number
  amount: number
  type: "INCREASE" | "DECREASE"
  createdAt: string
}

export type withdrawTypes = {
  id: number
  amount: number
  shabaNumber: string
  bankName: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID_TO_USER"
  createdAt: string
}
