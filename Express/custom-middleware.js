const express = require('express')

const app = express()

const requestTimeStampLogger = (req,res,next)=>{
    const timestamps = new Date().toISOString();

    console.log(`${timestamps} from ${req.method} to ${req.url}`)
    next()
}

app.use(requestTimeStampLogger)

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.get('/about',(req,res)=>{
    res.send('About Page')
})

app.listen(3000,()=>{
    console.log('Server is now running at port 3000')
})