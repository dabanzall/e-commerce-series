import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const exists = get().items.find((item) => item.id === product.id)
        if (exists) return
        set({ items: [...get().items, product] })
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
)

export default useWishlistStore