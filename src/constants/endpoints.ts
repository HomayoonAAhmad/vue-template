export const endpoints = {
  AUTH: {
    POST: {
      REQUEST_OTP: "/auth/send-otp",
      VERIFY_OTP: "/auth/verify-otp",
    },
  },
  GOLD: {
    GET: {
      GOLD_PRICE: "/gold/price",
    },
  },

  USER: {
    GET: {
      USER_DATA: "/user/me",
      USER_ASSETS: "/user/assets",
    },
    POST: {
      CHARGE_WALLET: "/wallet/increase",
    },
  },

  TRANSACTIONS: {
    POST: {
      BUY_GOLD: "/transactions/buy",
      SELL_GOLD: "/transactions/sell",
    },
    GET: {
      SINGLE_TRANSACTION: "/transactions/",
      TRANSACTIONS_LIST: "/transactions/",
    },
  },
}
