import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Badge, Card } from '../components'
import useCartStore from '../store/cartStore'

function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [activeTab, setActiveTab] = useState("description")

  const addToCart = useCartStore((state) => state.addToCart)

  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = ["Black", "White", "Blue", "Red"]
  const tabs = ["description", "specs", "reviews"]

  const handleAddToCart = () => {
    addToCart({
      id: 1,
      name: "Product Name",
      price: 99.99,
      quantity,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Product Name</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top Section — Image + Info */}
        <div className="flex flex-col lg:flex-row gap-10 mb-10">

          {/* Left — Image Gallery */}
          <div className="flex-1">
            <Card className="flex items-center justify-center h-96 bg-gray-50">
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="text-8xl">📦</div>
                <p className="text-sm text-gray-400">Product image goes here</p>
              </div>
            </Card>

            {/* Thumbnail Row */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl bg-gray-100 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-colors duration-200 flex items-center justify-center text-gray-300 text-xs"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Badge & Title */}
            <div className="flex items-center gap-2">
              <Badge color="green">In Stock</Badge>
              <Badge color="blue">New</Badge>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Product Name</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Product description will appear here once connected to the backend.
              This is a placeholder for the product details.
            </p>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-black text-blue-600">$99.99</p>
              <p className="text-lg text-gray-400 line-through">$129.99</p>
              <Badge color="red">Save 23%</Badge>
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">
                Color: <span className="font-normal text-gray-500">{selectedColor || "Select a color"}</span>
              </p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-sm border font-medium transition-colors duration-200 ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">
                Size: <span className="font-normal text-gray-500">{selectedSize || "Select a size"}</span>
              </p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-sm border font-medium transition-colors duration-200 ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-lg font-bold text-gray-900 w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <Button size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary">Wishlist ♡</Button>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 mt-2">
              <p className="text-sm text-gray-600">🚚 <span className="font-semibold">Free shipping</span> on orders over $50</p>
              <p className="text-sm text-gray-600">↩️ <span className="font-semibold">Free returns</span> within 30 days</p>
              <p className="text-sm text-gray-600">🔒 <span className="font-semibold">Secure checkout</span> guaranteed</p>
            </div>

          </div>
        </div>

        {/* Tabs Section */}
        <Card className="mb-10">

          {/* Tab Headers */}
          <div className="flex gap-1 border-b border-gray-100 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold capitalize transition-colors duration-200 border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="text-gray-500 text-sm leading-relaxed">
              <p>Full product description will appear here once connected to the backend.</p>
            </div>
          )}
          {activeTab === "specs" && (
            <div className="text-gray-500 text-sm leading-relaxed">
              <p>Product specifications will appear here once connected to the backend.</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <p className="font-bold text-gray-700">No reviews yet</p>
              <p className="text-gray-400 text-sm mt-1">Reviews will appear here once connected to the backend.</p>
            </div>
          )}

        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Related Products</h2>
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-3">🛍️</div>
            <p className="font-bold text-gray-700">No related products yet</p>
            <p className="text-gray-400 text-sm mt-1">Related products will appear here once connected to the backend.</p>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail