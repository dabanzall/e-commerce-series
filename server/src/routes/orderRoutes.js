const express = require('express')
const router = express.Router()
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.post('/', protect, createOrder)
router.get('/me', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus)

module.exports = router