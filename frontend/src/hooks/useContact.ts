import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiResponse, ErrorResponse } from '@/types/types'
import { mainAxios } from '@/api/axiosInstance'

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000' // backend base

export const useContact = () => {
  return useMutation({
    mutationFn: async (
      payload: ContactFormData,
    ): Promise<ApiResponse<{ message: string }>> => {
      const response = await mainAxios.post(
        `${API_BASE_URL}/api/contact`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      return response.data
    },

    onSuccess: (response) => {
      // Your backend returns: { message: "Message sent successfully" }
      toast.success(response.message || 'Message sent successfully')
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      // If Zod fails, your backend returns 400 with { message, errors }
      const message =
        error.response?.data.message ||
        (error.response?.status === 400 ? 'Invalid input' : 'Request failed')

      toast.error(message)
    },
  })
}
