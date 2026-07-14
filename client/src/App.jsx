import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Home, Products, ProductDetail, Cart, Login, Register, NotFound } from './pages'
import Checkout from './pages/Checkout'
import { Dashboard, AdminProducts, AdminOrders } from './pages/admin'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Toaster position="top-right" />
        <Routes>

          {/* Admin Routes — no Navbar/Footer */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* Public Routes — with Navbar/Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App