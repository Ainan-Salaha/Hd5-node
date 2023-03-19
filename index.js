const express= require('express');
const path=require('path')


const app= express();
const http = require('http').createServer(app)

const PORT = process.env.PORT ||3002


http.listen(PORT,()=>{
    console.log(`Server started @ Port- ${PORT}`)
})
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})


//Socket
const io=require('socket.io')(http)

io.on("connection",(socket)=>{
    console.log("connected...")
    socket.on('message',(msg)=>{
        socket.broadcast.emit("message",msg)
        // console.log(msg)
    })
})



















// app.use(express.static(__dirname+'/public'))

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/index.html'))
// })


// const server=app.listen(PORT,()=>{
//     console.log(`server started @ ${PORT}`)
// })
// const io = socket(server,{cors:({origin:"*"})})

// io.on("connection",(socket)=>{
//     console.log("User is connected to server")
// })
