require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const { Server } = require('socket.io');
const initCameraRoutes = require('./routers/cameraRoutes');
const initSocketService = require('./services/socketService');

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5500", // Địa chỉ của client
      methods: ["GET", "POST"]
    }
  });


initCameraRoutes(app, io);
initSocketService(io);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
