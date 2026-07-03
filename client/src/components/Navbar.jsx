import { Link, useLocation } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Navbar() {
  const { pathname } = useLocation()
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
          ShopZone
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart with count badge */}
          <Link
            to="/cart"
            className={`relative text-sm font-medium transition-colors duration-200 ${
              pathname === "/cart"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar