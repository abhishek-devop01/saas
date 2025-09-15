require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);


// Simple Test Route
app.get('/', (req, res) => {
    res.send('WisdomConnect Backend Running...');
});

// Connect DB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
