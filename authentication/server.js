require('dotenv').config()
const connectToDb = require('./database/db.js')

const express = require('express')
const app =express()

const PORT = process.env.PORT || 3000

// connect to db
connectToDb()
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})