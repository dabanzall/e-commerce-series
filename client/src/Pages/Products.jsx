import { useState } from 'react'
import { Button } from '../components'

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home",
]

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("default")
  const [search, setSearch] = useState("")
  const [view, setView] = useState("grid")

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">Browse our full collection</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Sidebar — Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">

            {/* Search */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Category</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === cat
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedCategory("All")
                setSearch("")
                setSortBy("default")
              }}
            >
              Clear Filters
            </Button>

          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-800">0</span> products
            </p>
            <div className="flex items-center gap-3">

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Toggle */}
              <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`px-2 py-1 rounded text-sm transition-colors duration-200 ${
                    view === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-2 py-1 rounded text-sm transition-colors duration-200 ${
                    view === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  ☰
                </button>
              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-28 text-center bg-white rounded-2xl border border-gray-100">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No products yet</h3>
            <p className="text-gray-400 text-sm">Products will appear here once the backend is connected.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Products