const Book = require('../models/book.js')

const getAllBooks = async(req,res)=>{
        try {
            const allBooks = await Book.find({})
            if(allBooks?.length > 0){
                res.status(200).json({
                    success:true,
                    message:'List of books fetched successfully',
                    data:allBooks
                })
            }else{
                res.status(404).json({message:'No Book found in database',success:false})
            }
        } catch (error) {
            console.log(error,"error")
            res.status(500).json({
                success:false,
                message:'Something went wrong ! Please try again'
            })
        }
}

const getSingleBookById = async(req,res)=>{
    try {
        const getCurrentBookId = req.params.id;
        const bookDetailsByID = await Book.findById(getCurrentBookId)
        if(!bookDetailsByID){
            return res.status(404).json({success:false,message:"Cannot find the Book ,Trye different ID"})
        }
        res.status(200).json({success:true,message:'Here is you book',data:bookDetailsByID})
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}

const addNewBook = async(req,res)=>{
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData)

        if(newlyCreatedBook){
            res.status(200).json({
                success:true,
                message:'Book added successfully',
                data:newlyCreatedBook
            })
        }
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}

const updateSingleBook = async(req,res)=>{
    try {
        const currentBookId = req.params.id
        const updatedBookFormData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(currentBookId,updatedBookFormData,{new:true})

        if(!updatedBook){
            return res.status(404).json({success:false,message:"Cannot find the Book ,Trye different ID"})
        }
        res.status(200).json({
            success:true,
            message:'Book Updated successfully',
            data:updatedBook
        })
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}

const deleteBook = async(req,res)=>{
    try {
        const BookId = req.params.id
        const deletedBook = await Book.findByIdAndDelete(BookId)
        if(!deleteBook){
            return res.status(404).json({success:false,message:"Cannot find the Book ,Trye different ID"})
        }
        res.status(200).json({
            success:true,
            message:'Book Deleted successfully',
            data:deletedBook
        })
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({
            success:false,
            message:'Something went wrong ! Please try again'
        })
    }
}

module.exports = {getAllBooks,getSingleBookById,addNewBook,updateSingleBook,deleteBook}