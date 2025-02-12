require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/product-routes')
const bookRoutes = require('./routes/book-routes')
const app = express()

// connect to our database

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`mongoDB connected successfully`)
}).catch((error)=>console.log(error,"mongoDb connecttion error"))

// use middlewares
app.use(express.json());
app.use("/products",productRoutes)
app.use("/reference",bookRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is now running on port ${process.env.PORT}`)
})
