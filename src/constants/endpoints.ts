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
    },
  },

  TRANSACTIONS: {
    POST: {
      BUY_GOLD: "/transactions/buy",
    },
  },
}
