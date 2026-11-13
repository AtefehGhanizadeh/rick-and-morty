import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
    headers: { Accept: 'application/json' },
  })

  api.interceptors.response.use(
    (response) => response,

    (error: unknown) => {
      if (!axios.isAxiosError(error)) return Promise.reject(error)

      if (error.code === 'ECONNABORTED') {
        return Promise.reject(
          createError({
            status: 504,
            statusText: 'Gateway Timeout',
            message: 'The server took too long to respond.',
          }),
        )
      }

      if (!error.response) {
        return Promise.reject(
          createError({
            status: 503,
            statusText: 'Service Unavailable',
            message: 'Could not reach the server. Check your connection and try again.',
          }),
        )
      }

      return Promise.reject(
        createError({
          status: error.response.status,
          statusText: error.response.statusText,
          message: error.message,
        }),
      )
    },
  )

  return {
    provide: {
      api,
    },
  }
})
