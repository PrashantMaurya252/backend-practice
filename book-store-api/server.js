const dotenv = require('dotenv')
const express = require('express')
const connectToDB = require('./database/db.js')
const bookRoutes = require('./routes/book-routes.js')
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
connectToDB();

// middleware
app.use(express.json())

// routes here
app.use('/api/books',bookRoutes)

app.listen(PORT,()=>{
    console.log(`Server is runing at PORT ${PORT}`)
})

