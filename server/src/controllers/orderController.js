const prisma = require('../prisma')

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items } = req.body
    const userId = req.user.id

    // Calculate total
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      },
      include: { items: true }
    })

    res.status(201).json(order)
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error.message)
    res.status(500).json({ message: 'Failed to create order', error: error.message })
  }
}

// GET /api/orders/me
const getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(orders)
  } catch (error) {
    console.error('GET ORDERS ERROR:', error.message)
    res.status(500).json({ message: 'Failed to get orders', error: error.message })
  }
}

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: { product: true }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    res.json(order)
  } catch (error) {
    console.error('GET ORDER ERROR:', error.message)
    res.status(500).json({ message: 'Failed to get order', error: error.message })
  }
}

// PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status }
    })

    res.json(order)
  } catch (error) {
    console.error('UPDATE ORDER ERROR:', error.message)
    res.status(500).json({ message: 'Failed to update order', error: error.message })
  }
}

module.exports = { createOrder, getMyOrders, getOrderById, updateOrderStatus }