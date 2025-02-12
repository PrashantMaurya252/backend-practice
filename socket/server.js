const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()

// app.use(express.json())
const server = http.createServer(app)

// initiate socket io and attach this to server
const io = socketIo(server);

app.use(express.static('public'))

const users = new Set()

io.on("connection",(socket)=>{
    console.log('A user is now connected')

    // handle users when they will join the chat
   socket.on('join',(username)=>{
    users.add(username)
    socket.userName = username

    // broadcast to all clients/users that a new user has joined
    io.emit('userJoined',username)

    // send the updatedList to all client
    io.emit('userList',Array.from(users))
   })

   // handle incoming chat message
   socket.on('chatMessage',(message)=>{
    // broadcasr the received message to all connected clients
    io.emit("chatMessage",message)
   })

// handle user disconnection

socket.on('disconnect',()=>{
    console.log('An user is disconnected');
    users.forEach(user=>{if(user === socket.username){
        users.delete(user)
        io.emit('userLeft',user)
        io.emit('userList',Array.from(users))
    }})
})
})



server.listen(3000,()=>{
    console.log('App is listening on port 3000')
})