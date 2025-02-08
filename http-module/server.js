const http = require('http')

const server = http.createServer((req,res)=>{
    console.log("req",req)
    res.writeHead(200,{"content-type":"text/plain"})
    res.end("Hello node js from http module")
})

const port = 4000
server.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
})