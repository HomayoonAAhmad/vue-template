export type transactionTypes = {
  id: number
  gold_amount: number
  total_amount: number
  type: "buy" | "sell" | "withdraw" | "deposit"
  created_at: Date
}

export type withdrawTypes = SingleTransaction & {
  bank_card: {
    card_number: string
    shaba: string
    bank_name: string
  }
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
