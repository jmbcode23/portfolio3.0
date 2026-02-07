// src/lib/mainAxios.ts
import axios from 'axios'
import type { AxiosError } from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const mainAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000, // 15s is reasonable for portfolio
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // no cookies needed
})

// Optional: small helper to detect "network down / no response"
const isNetworkError = (error: AxiosError) =>
  !error.response &&
  (error.code === 'ERR_NETWORK' || error.message === 'Network Error')

// Response interceptor: normalize errors (nice for UI)
mainAxios.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    // You can customize the message shape here if you want
    if (isNetworkError(error)) {
      error.message =
        'Network error. Please check your connection and try again.'
    }
    return Promise.reject(error)
  },
)
