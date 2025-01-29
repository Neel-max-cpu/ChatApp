const express = require('express');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


// Socket.io
const http = require('http');
const socketIo = require('socket.io');

const app = express();
connectDB();


// Create an HTTP server to use with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);


app.use(cors());
app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Routes location
const authRoutes = require('./routes/authRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/message');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/message', messageRoutes);

// Socket.IO logic
const userSockets = {}; // Store user socket connections


// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Register user with their socket ID (assuming user sends userId after login)
//   socket.on('register_user', (userId) => {
//     userSockets[userId] = socket.id;
//     console.log(`User ${userId} registered with socket ${socket.id}`);
//   });

//   // Listen for a message and broadcast it to the receiver
//   socket.on('send_message', (data) => {
//     const { senderId, receiverId, message } = data;

//     // Send the message to the receiver
//     if (userSockets[receiverId]) {
//       io.to(userSockets[receiverId]).emit('receive_message', { senderId, message });
//       console.log(`Message sent to ${receiverId}`);
//     }
//   });

//   // Handle user disconnecting
//   socket.on('disconnect', () => {
//     for (const userId in userSockets) {
//       if (userSockets[userId] === socket.id) {
//         delete userSockets[userId]; // Remove user from the socket map
//         console.log(`User ${userId} disconnected`);
//         break;
//       }
//     }
//   });
// });

// Socket.IO logic for handling real-time messages
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', async (data) => {
      const { recipient, message, senderId } = data;

      // Save the message to the database
      const newMessage = new Message({
          sender: senderId,  // Use sender's ObjectId
          recipient,         // Use recipient's ObjectId
          message,
      });

      await newMessage.save();  // Save the message to MongoDB

      // Emit the message to the recipient in real-time
      socket.emit('receive_message', newMessage); // Send to the sender
      socket.broadcast.emit('receive_message', newMessage); // Send to the recipient
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

