import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const items = get().items
        const existing = items.find((item) => item.id === product.id)

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore