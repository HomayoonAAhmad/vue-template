export type transactionTypes = {
  id: number
  gold_amount: number
  total_amount: number
  type: "buy" | "sell" | "withdraw" | "deposit"
  created_at: Date
}

export type withdrawTypes = {
  id: number
  amount: number
  shabaNumber: string
  bankName: string
  status: "pending"
  createdAt: string
}

export type SingleTransaction = {
  total_amount: number
  gold_amount: number
  price_per_milligram: number
  created_at: Date
  type: "buy" | "sell" | "withdraw" | "deposit"
  payment_type: "wallet" | "gateway" | null
  status: "success" | "pending" | "failed"
}
