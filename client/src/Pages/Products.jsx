import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, Badge, Button, Input } from '../components'
import { getProducts } from '../services'

const categories = ["All", "Electronics", "Clothing", "Books", "Home"]

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("default")
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', selectedCategory, sortBy],
    queryFn: () => getProducts({
      category: selectedCategory === "All" ? undefined : selectedCategory,
      sort: sortBy === "default" ? undefined : sortBy,
    })
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">All Products</h1>
            <p className="text-gray-500 mt-1">Browse our full collection</p>
          </div>
          <div className="lg:hidden">
            <Button variant="secondary" size="sm" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden"} lg:block`}>
          <Card className="lg:sticky lg:top-24">

            <div className="mb-6">
              <p className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-wide">Search</p>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <p className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-wide">Category</p>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === cat
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-wide">Price Range</p>
              <div className="flex items-center gap-2">
                <Input placeholder="Min" type="number" />
                <span className="text-gray-400 text-sm">—</span>
                <Input placeholder="Max" type="number" />
              </div>
            </div>

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

          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-800">{products?.length || 0}</span> products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-28">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <Card className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Failed to load products</h3>
              <p className="text-gray-400 text-sm">Make sure the server is running</p>
            </Card>
          )}

          {/* Products Grid */}
          {!isLoading && !isError && products?.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-28 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400 text-sm">Try changing your filters</p>
            </Card>
          )}

          {!isLoading && !isError && products?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(p => search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <Card hover>
                      <div className="bg-gray-100 rounded-xl h-48 mb-4 flex items-center justify-center text-5xl">
                        📦
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                        <Badge color="blue">{product.category?.name}</Badge>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{product.description}</p>
                      <p className="text-blue-600 font-black text-lg mb-3">${product.price}</p>
                      <Button size="sm">Add to Cart</Button>
                    </Card>
                  </Link>
                ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Products