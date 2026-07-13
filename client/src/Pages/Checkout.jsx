import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Card, Input } from '../components'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import { api } from '../services'

const steps = ['Address', 'Payment', 'Review']

function Checkout() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    country: '',
    zip: '',
  })

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      await api.post('/orders', {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      })
      clearCart()
      toast.success('Order placed successfully! 🎉')
      navigate('/')
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center py-16 px-10">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to checkout</p>
          <Link to="/login">
            <Button>Login to Continue</Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center py-16 px-10">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products before checking out</p>
          <Link to="/products">
            <Button>Shop Now</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">Checkout</h1>

          {/* Steps */}
          <div className="flex items-center gap-3 mt-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`flex items-center gap-2`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    index < currentStep
                      ? "bg-green-500 text-white"
                      : index === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    index === currentStep ? "text-blue-600" : "text-gray-400"
                  }`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px ${index < currentStep ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Left — Step Content */}
        <div className="flex-1">

          {/* Step 1 — Address */}
          {currentStep === 0 && (
            <Card>
              <h2 className="text-xl font-black text-gray-900 mb-6">Shipping Address</h2>
              <div className="flex flex-col gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="Daban Zall"
                  value={address.fullName}
                  onChange={handleAddressChange}
                />
                <Input
                  label="Street Address"
                  name="street"
                  placeholder="123 Main Street"
                  value={address.street}
                  onChange={handleAddressChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    placeholder="New York"
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                  <Input
                    label="ZIP Code"
                    name="zip"
                    placeholder="10001"
                    value={address.zip}
                    onChange={handleAddressChange}
                  />
                </div>
                <Input
                  label="Country"
                  name="country"
                  placeholder="United States"
                  value={address.country}
                  onChange={handleAddressChange}
                />
                <Button size="lg" onClick={() => setCurrentStep(1)}>
                  Continue to Payment →
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2 — Payment */}
          {currentStep === 1 && (
            <Card>
              <h2 className="text-xl font-black text-gray-900 mb-6">Payment Details</h2>
              <div className="flex flex-col gap-4">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    name="expiry"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    placeholder="123"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-700 text-sm font-medium">
                    ⚠️ Real payments will be handled by Stripe in Episode 18
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="lg" onClick={() => setCurrentStep(0)}>
                    ← Back
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep(2)}>
                    Review Order →
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3 — Review */}
          {currentStep === 2 && (
            <Card>
              <h2 className="text-xl font-black text-gray-900 mb-6">Review Order</h2>

              {/* Items */}
              <div className="flex flex-col gap-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                        📦
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Address Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-gray-800 mb-1">Shipping to:</p>
                <p className="text-sm text-gray-500">{address.fullName}</p>
                <p className="text-sm text-gray-500">{address.street}, {address.city} {address.zip}</p>
                <p className="text-sm text-gray-500">{address.country}</p>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" size="lg" onClick={() => setCurrentStep(1)}>
                  ← Back
                </Button>
                <Button size="lg" onClick={handlePlaceOrder}>
                  {loading ? 'Placing Order...' : 'Place Order 🎉'}
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <Card className="sticky top-24">
            <h2 className="text-lg font-black text-gray-900 mb-4">Order Summary</h2>
            <div className="flex flex-col gap-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.name} x{item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-blue-600 text-lg">${getTotalPrice()}</span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Checkout