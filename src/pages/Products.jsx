import Card from '../components/Card';
import Button from '../components/Button';

function Products() {
  const products = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {['All', 'Electronics', 'Clothing', 'Books', 'Home'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              category === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition">
            <div className="text-center">
              <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg font-bold text-blue-600 my-2">
                {product.price}
              </p>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;