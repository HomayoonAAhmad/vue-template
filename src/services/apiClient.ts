import axios from "axios"

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: "http://10.72.161.60:3000/api/v1",
})

apiClient.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("data") || "null")?.token

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "خطایی رخ داد"

    return Promise.reject(new Error(message))
  },
)
