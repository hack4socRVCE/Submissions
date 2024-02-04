const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connectDB");
const Routes = require("./routes/routes");
const ChatRoutes = require("./routes/ChatRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", Routes);
app.use('/chatroom', ChatRoutes);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
  } catch (err) {
    console.log(err);
  }
};

start();

const server = app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});


// socket io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("joinchat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("newmessage", (newMessageRecieved) => {
      let chat = newMessageRecieved.chat;
      if (!chat || !chat.users) return console.log("chat.users not defined");
    
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("Msgrecieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
});
