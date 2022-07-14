const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const router = require('./routes')
const mongoose = require('mongoose');
const cors = require("cors")
const cookieParser = require('cookie-parser')
const server = require('http').createServer(app)
const ACTIONS = require('./actions')

const io = require('socket.io')(server,{
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 5500;
app.use(express.json({limit: "8mb"}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static('storage'))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  
}))
app.use('/api',router);

mongoose.connect('mongodb://0.0.0.0:27017/potcasthouse')
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });

//socket.io configaretin 
const socketUserMapping = {

}

io.on("connect", (socket) =>{
  console.log("Connected to socket...", socket.id);
  socket.on(ACTIONS.JOIN, ({roomId, user})=>{
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach(clientId=> {
      io.to(clientId).emit(ACTIONS.ADD_PEER,{
        peerId: socket.id,
        createOffer: false,
        user: user
      })
    })
    socket.emit(ACTIONS.ADD_PEER, {
      peerId: clients,
      createOffer: false,
      user: socketUserMapping[clients]
    })
    socket.join(roomId)
    console.log(clients)// console.log(clients)// console.log(clients)
  })
 

  // handle rely
  socket.on(ACTIONS.RELAY_ICE, ({peerId, icecandidate})=>{
    io.to(peerId).emit(ACTIONS.RELAY_ICE, {
      peerId: socket.id,
      icecandidate
    })
  })

  // handle rely sdp 
  socket.on(ACTIONS.RELAY_SDP, ({peerId, sessionDescription})=>{
    io.to(peerId).emit(ACTIONS.RELAY_SDP, {
      peerId: socket.id,
      sessionDescription
    })
  })


})

server.listen(PORT, ()=> console.log(`Listen on port ${PORT}`));
