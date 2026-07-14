import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/authStore'

function AdminLayout({ children }) {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!user) {
      toast.error('Please login first')
      navigate('/login')
    } else if (user.role !== 'admin') {
      toast.error('Admin access only')
      navigate('/')
    }
  }, [user, navigate])

  const links = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Products", path: "/admin/products", icon: "📦" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
  ]

  if (!user || user.role !== 'admin') return null

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-700">
          <Link to="/" className="text-xl font-black text-blue-400">ShopZone</Link>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>

    </div>
  )
}

export default AdminLayout