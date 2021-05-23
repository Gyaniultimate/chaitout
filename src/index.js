const path = require("path")
const http = require("http")
const express =  require("express")
const app = express()
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 8000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


io.on('connection', (socket)=>{

    console.log("new websocket connection")
    
    socket.emit('mesage','welcome!')
    socket.broadcast.emit('message','A new user has joined!')

    socket.on('sendMessage', (message)=>{

        io.emit('message', message)
    })

         socket.on('disconnect', ()=>  {
               
            io.emit('message', 'A user has left')

         })

})


server.listen(port, ()=>{

    console.log(`Server is running on port ${port}!`)
})