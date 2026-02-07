// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const shouldRetry = (failureCount: number, error: unknown) => {
  if (failureCount >= 3) return false

  const err = error as AxiosError<any>
  const status = err.response?.status

  // Don't retry client errors (validation/auth/etc.)
  if (status && status >= 400 && status < 500) return false

  // Retry network errors (no response) or server errors (5xx)
  return true
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000), // 1s,2s,4s,8s
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: shouldRetry,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
  },
})
