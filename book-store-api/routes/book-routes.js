const express = require('express');
const {getAllBooks,getSingleBookById,updateSingleBook,addNewBook,deleteBook} = require('../controllers/book-controller.js')

const router = express.Router()

// all the routes

router.get('/get',getAllBooks)
router.get('/get/:id',getSingleBookById)
router.post('/add',addNewBook)
router.put('/update/:id',updateSingleBook)
router.delete('/delete/:id',deleteBook)

module.exports = router

