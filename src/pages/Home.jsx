import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useState } from 'react';

function Home() {
  const [email, setEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const featuredProducts = [
    { id: 1, name: 'Product 1', price: '$29.99', badge: 'New' },
    { id: 2, name: 'Product 2', price: '$49.99', badge: 'Sale' },
    { id: 3, name: 'Product 3', price: '$19.99', badge: 'Popular' },
  ];

  const categories = [
    { id: 1, name: 'Electronics', icon: '💻', color: 'bg-blue-100' },
    { id: 2, name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
    { id: 3, name: 'Home & Living', icon: '🏠', color: 'bg-green-100' },
    { id: 4, name: 'Books', icon: '📚', color: 'bg-yellow-100' },
  ];

  const promotionalBanners = [
    { id: 1, title: 'Summer Sale', description: 'Up to 50% off', color: 'bg-gradient-to-r from-orange-400 to-red-500', textColor: 'text-white' },
    { id: 2, title: 'Free Shipping', description: 'On orders over $50', color: 'bg-gradient-to-r from-blue-400 to-purple-500', textColor: 'text-white' },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubmitted(true);
      setEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 md:py-32 px-4 rounded-2xl mb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge color="yellow" className="mb-4 inline-block">
            🔥 Limited Time Offer
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-yellow-300">ShopHub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices
          </p>
          <p className="text-lg mb-8 text-blue-50 max-w-2xl mx-auto">
            Shop the latest trends, exclusive collections, and daily deals - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-black text-blue-600 hover:bg-black-100">
              Shop Now
            </Button>
            <Button variant="secondary" size="lg" className="border-2 border-blue text-blue hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-20 -mb-20"></div>
      </section>

      {/* Featured Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Categories</h2>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            View All →
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:scale-105 transition-transform cursor-pointer">
              <div className={`${category.color} p-6 rounded-xl text-center`}>
                <div className="text-4xl md:text-5xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Shop now →</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotionalBanners.map((banner) => (
            <div 
              key={banner.id} 
              className={`${banner.color} ${banner.textColor} p-8 md:p-10 rounded-2xl relative overflow-hidden`}
            >
              <div className="relative z-10">
                <Badge color="white" className="mb-3 inline-block text-xs">
                  Limited Offer
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{banner.title}</h3>
                <p className="text-lg mb-4 opacity-90">{banner.description}</p>
                <Button variant="primary" size="sm" className="bg-white text-gray-800 hover:bg-gray-100">
                  Shop Now →
                </Button>
              </div>
              <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">
                🎉
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            View All →
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-center">
                <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative">
                  <span className="text-6xl">📦</span>
                  <div className="absolute top-2 right-2">
                    <Badge color={product.badge === 'Sale' ? 'red' : 'green'}>
                      {product.badge}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-xl font-bold text-blue-600 my-2">
                  {product.price}
                </p>
                <div className="mt-4">
                  <Button variant="primary" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest updates on new products and upcoming sales
          </p>
          {newsletterSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              ✅ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          )}
          <p className="text-xs text-gray-500 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Responsive styles - Add to index.css */}
      <style jsx>{`
        @media (max-width: 640px) {
          .home-page {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;