import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Badge, Card } from '../components'
import { getProducts } from '../services'

const categories = [
  { name: "Electronics", icon: "💻", color: "bg-blue-50 hover:bg-blue-100" },
  { name: "Clothing", icon: "👕", color: "bg-purple-50 hover:bg-purple-100" },
  { name: "Books", icon: "📚", color: "bg-yellow-50 hover:bg-yellow-100" },
  { name: "Home & Garden", icon: "🏡", color: "bg-green-50 hover:bg-green-100" },
]

function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getProducts()
  })

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

          {/* Left — Text */}
          <div className="flex-1 flex flex-col gap-4">
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full w-fit border border-blue-100">
              🚚 Free shipping on orders over $50
            </span>
            <h1 className="text-5xl font-black text-gray-900 leading-tight">
              Shop Everything <br />
              <span className="text-blue-600">You Love</span>
            </h1>
            <p className="text-gray-500 text-base max-w-sm">
              Discover thousands of products at unbeatable prices.
              From electronics to fashion — we have it all.
            </p>
            <div className="flex gap-3 flex-wrap mt-2">
              <Link to="/products">
                <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Shop Now →
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Join Free
                </button>
              </Link>
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-2xl font-black text-gray-900">50K+</p>
                <p className="text-xs text-gray-400">Happy Customers</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-black text-gray-900">10K+</p>
                <p className="text-xs text-gray-400">Products</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-black text-gray-900">99%</p>
                <p className="text-xs text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right — Image Placeholder */}
          <div className="flex-1 w-full">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl h-80 flex flex-col items-center justify-center gap-3">
              <div className="text-7xl">🛍️</div>
              <p className="text-sm font-medium text-blue-400">Hero image goes here</p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Shop by Category</h2>
              <p className="text-gray-500 mt-1">Find exactly what you are looking for</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link to="/products" key={cat.name}>
                <Card hover className={`text-center py-8 ${cat.color}`}>
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-lg">{cat.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Handpicked just for you</p>
            </div>
            <Link to="/products">
              <Button variant="secondary">View All →</Button>
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.slice(0, 4).map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <Card hover>
                    <div className="bg-gray-100 rounded-xl h-40 mb-4 flex items-center justify-center text-5xl">
                      📦
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                      <Badge color="blue">{product.category?.name}</Badge>
                    </div>
                    <p className="text-gray-400 text-xs mb-2 truncate">{product.description}</p>
                    <p className="text-blue-600 font-black mb-3">${product.price}</p>
                    <Button size="sm">Add to Cart</Button>
                  </Card>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <Badge color="yellow">Limited Time</Badge>
            <h2 className="text-4xl font-black text-white mt-3">Get 20% Off</h2>
            <p className="text-gray-400 mt-2 text-lg">
              On your first order. Use code{' '}
              <span className="text-yellow-400 font-black bg-yellow-400/10 px-2 py-0.5 rounded">
                SHOPZONE20
              </span>
            </p>
          </div>
          <Link to="/products">
            <button className="bg-yellow-400 text-gray-900 font-black px-10 py-4 rounded-xl hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg whitespace-nowrap">
              Claim Offer →
            </button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-2">Stay in the Loop</h2>
          <p className="text-blue-100 mb-8">
            Get the latest deals and new arrivals straight to your inbox.
          </p>
          <div className="flex gap-3 bg-white p-2 rounded-xl shadow-lg">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2 text-sm focus:outline-none text-gray-700 bg-transparent"
            />
            <button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap text-sm">
              Subscribe
            </button>
          </div>
          <p className="text-blue-200 text-xs mt-3">No spam ever. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  )
}

export default Home