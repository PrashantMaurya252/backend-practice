const express = require('express');
const {getAllBooks,getSingleBookById,updateSingleBook,addNewBook,deleteBook} = require('../controllers/book-controller.js')

const router = express.Router()

// all the routes

router.get('/get',getAllBooks)
router.get('/get/:id',getSingleBookById)
router.post('/add',updateSingleBook)
router.put('/update/:id',addNewBook)
router.delete('/delete/:id',deleteBook)

module.exports = router

