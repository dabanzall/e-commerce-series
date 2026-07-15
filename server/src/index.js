const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const prisma = require('./prisma')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes
  message: { message: 'Too many requests, please try again later' }
})
app.use(limiter)

// Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // max 10 login attempts per 15 minutes
  message: { message: 'Too many login attempts, please try again later' }
})

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    await prisma.$connect()
    res.json({ message: 'ShopZone API is running! Database connected ✅' })
  } catch (error) {
    res.json({ message: 'Database connection failed ❌', error })
  }
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})