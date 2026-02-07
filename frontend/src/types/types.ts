// Generic API response wrapper (if you use one)
export type ApiResponse<T = unknown> = {
  success?: boolean
  message?: string
  data?: T
  statusCode?: number
  errors?: unknown
}

// Error response from backend
export type ErrorResponse = {
  message?: string
  errors?: Record<string, Array<string>>
}
