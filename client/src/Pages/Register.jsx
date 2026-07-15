import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Input, Card, SEO } from '../components'
import { registerUser } from '../services'
import useAuthStore from '../store/authStore'

function Register() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await registerUser(form)
      setAuth(data.user, data.token)
      toast.success(`Welcome, ${data.user.name}!`)
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <SEO
  title="Create Account"
  description="Join ShopZone today and start shopping."
/>
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-black text-blue-600">ShopZone</Link>
          <h1 className="text-3xl font-black text-gray-900 mt-4">Create account</h1>
          <p className="text-gray-500 mt-2">Join ShopZone today</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Daban Zall"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />

            <Button size="lg" onClick={handleSubmit}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </Card>

      </div>
    </div>
  )
}

export default Register