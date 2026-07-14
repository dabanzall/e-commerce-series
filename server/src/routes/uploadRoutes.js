const express = require('express')
const router = express.Router()
const multer = require('multer')
const { uploadImage } = require('../controllers/uploadController')
const { protect } = require('../middleware/authMiddleware')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', protect, upload.single('image'), uploadImage)

module.exports = router