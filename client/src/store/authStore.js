import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, token })
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null })
      },

      isAuthenticated: () => {
        return !!localStorage.getItem('token')
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore