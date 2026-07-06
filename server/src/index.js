const express = require('express')
const cors = require('cors')
require('dotenv').config()
const prisma = require('./prisma')
const productRoutes = require('./routes/productRoutes')

const app = express()
const PORT = process.env.PORT || 5000

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})