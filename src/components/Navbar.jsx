import { NavLink } from 'react-router-dom';
import Button from './Button';
import Badge from './Badge';

function Navbar() {
  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '📦' },
    // Removed '/cart' from here - keeping only the one with badge
  ];


  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            ShopHub
          </NavLink>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                <span>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Only cart link with badge */}
          <div className="flex items-center space-x-4">
            <NavLink to="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              <Badge color="red" className="absolute -top-2 -right-2">
                3
              </Badge>
            </NavLink>
            <NavLink to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;