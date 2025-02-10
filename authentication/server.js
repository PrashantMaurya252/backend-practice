require('dotenv').config()
const connectToDb = require('./database/db.js')
const authRoutes = require('./routes/auth-routes.js')
const homeRoutes = require('./routes/home-routes.js')
const adminRoutes = require('./routes/admin-routes.js')

const express = require('express')
const app =express()

const PORT = process.env.PORT || 3000

// connect to db


connectToDb()

app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})