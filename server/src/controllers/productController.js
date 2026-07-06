const prisma = require('../prisma')

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, sort } = req.query

    const products = await prisma.product.findMany({
      where: category ? {
        category: { name: category }
      } : {},
      orderBy: sort === 'price-asc' ? { price: 'asc' }
        : sort === 'price-desc' ? { price: 'desc' }
        : sort === 'newest' ? { createdAt: 'desc' }
        : { createdAt: 'asc' },
      include: { category: true }
    })

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error })
  }
}

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error })
  }
}

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, categoryId } = req.body

    const product = await prisma.product.create({
      data: { name, description, price, image, stock, categoryId }
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error })
  }
}

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, image, stock, categoryId } = req.body

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, image, stock, categoryId }
    })

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error })
  }
}

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error })
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}