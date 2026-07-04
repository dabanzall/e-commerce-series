const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'ShopZone API is running!' })
})

// Routes — coming soon
// app.use('/api/products', productRoutes)
// app.use('/api/auth', authRoutes)
// app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})