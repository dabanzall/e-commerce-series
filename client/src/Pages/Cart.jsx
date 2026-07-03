import { Link } from 'react-router-dom'
import { Button, Card, Badge } from '../components'

function Cart() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">0 items in your cart</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Left — Cart Items */}
        <div className="flex-1">

          {/* Empty State */}
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

        </div>

        {/* Right — Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Card className="sticky top-24">

            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>

            {/* Summary Lines */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-800">$0.00</span>
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
                <span className="font-black text-xl text-blue-600">$0.00</span>
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
              <Button size="lg">
                Proceed to Checkout →
              </Button>
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