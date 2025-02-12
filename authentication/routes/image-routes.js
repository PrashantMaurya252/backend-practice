const express = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middlewares')
const uploadMiddleware =  require('../middlewares/upload-middleware')
const {uploadImage, fetchImageController,deleteImageController} = require('../controllers/image-controller')

const router = express.Router()

// upload the image

router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImage)


// to get all the image
router.get("/get",authMiddleware,fetchImageController);

// delete image
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController)


module.exports = router