const express = require('express')
const app =express();

// middleware
app.use(express.json())
let books = [
    {id:'1',title:'Book 1'},
    {id:'2',title:'Book 2'},
]

// get all books

// intro route
app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to our bookstore api"
    })
})

// get all books

app.get('/get',(req,res)=>{
    res.json(books)
})

// get single book

app.get('/get/:id',(req,res)=>{
    const book = books.find(book=>book.id=== req.params.id)
    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json({message:'Book not found! Please try with a different Book ID'})
    }
})

// add a book

app.post('/add',(req,res)=>{
    const newBook = {
        id:books.length + 1,
        title:`Book ${books.length + 1}`
    }
    books.push(newBook)
    res.status(200).json(newBook)
})

// update

app.put('/update/:id',(req,res)=>{
    const findCurrentBook = books.find(bookItem =>bookItem.id === req.params.id)
    if(findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBook.title

        res.status(200).json({
            message:`Book with ID ${req.params.id} updated successfully`,
            data:findCurrentBook
        })
    }else{
        res.status(404).json({
            message:'Book not found'
        })
    }
})

// delete 

app.delete('/delete/:id',(req,res)=>{
    const findIndexOfCurrentBook = books.findIndex(item =>item.id === req.params.id)
    if(findIndexOfCurrentBook !== -1){
        const deletedBook = books.splice(findIndexOfCurrentBook,1);
        res.status(200).json({message:"Books deleted successfully",data:deletedBook[0]})
    }else{
        res.status(404).json({
            message:'Book not found'
        })
    }
})

const port =3000
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})