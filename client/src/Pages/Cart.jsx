import { Link } from 'react-router-dom'
import { Button, Card, Badge } from '../components'
import useCartStore from '../store/cartStore'

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">{items.length} items in your cart</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Left — Cart Items */}
        <div className="flex-1 flex flex-col gap-4">

          {items.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-28 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-400 text-sm mb-6">
                Looks like you have not added anything yet.
              </p>
              <Link to="/products">
                <Button>Start Shopping →</Button>
              </Link>
            </Card>
          ) : (
            <>
              {items.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-center gap-4">

                    {/* Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📦
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-blue-600 font-black">${item.price}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>

                  </div>
                </Card>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors self-start font-medium"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Card className="sticky top-24">

            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>

            {/* Summary Lines */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-800">${getTotalPrice()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <Badge color="green">Free</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-semibold text-gray-800">$0.00</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-xl text-blue-600">${getTotalPrice()}</span>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-800 mb-2">Coupon Code</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" variant="secondary">Apply</Button>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout">
              <Button size="lg">Proceed to Checkout →</Button>
            </Link>

            {/* Continue Shopping */}
            <Link to="/products">
              <button className="w-full mt-3 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium">
                ← Continue Shopping
              </button>
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
              <p className="text-xs text-gray-400">🔒 Secure checkout</p>
              <p className="text-xs text-gray-400">↩️ Free returns within 30 days</p>
              <p className="text-xs text-gray-400">🚚 Free shipping over $50</p>
            </div>

          </Card>
        </div>

      </div>
    </div>
  )
}

export default Cart