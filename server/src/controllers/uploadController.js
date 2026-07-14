const ImageKit = require('imagekit')

const imagekit = new ImageKit({
  publicKey: 'public_jqYK3UX90eBDi7RMll8t0DiUARU=',
  privateKey: 'private_yeS2gzm06kYln8Ol6I53oqOZPgU=',
  urlEndpoint: 'https://ik.imagekit.io/fo1y6gumm'
})

// POST /api/upload
const uploadImage = async (req, res) => {
  try {
    const file = req.file

    if (!file) {
      return res.status(400).json({ message: 'No file provided' })
    }

    const result = await imagekit.upload({
      file: file.buffer.toString('base64'),
      fileName: `${Date.now()}_${file.originalname}`,
      folder: '/shopzone/products'
    })

    res.json({
      url: result.url,
      fileId: result.fileId
    })
  } catch (error) {
    console.error('UPLOAD ERROR:', error.message)
    res.status(500).json({ message: 'Upload failed', error: error.message })
  }
}

module.exports = { uploadImage }