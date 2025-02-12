const express = require('express')
const {loginUser,registerUser,changePassword} = require('../controllers/auth-controller.js')
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware.js')

// all routes are related to authentication & authorization

router.post('/register',registerUser)
router.post('/login',loginUser);
router.post('/change-password',authMiddleware,changePassword);

module.exports = router