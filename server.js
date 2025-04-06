require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const createError = require('http-errors');
const config = require('./config');
const apiRoutes = require('./routes/api_routes');
const socketRoutes = require('./routes/socket_routes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static('public'));

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST']
  }
});

// Routes
app.use('/api', apiRoutes);
socketRoutes(io);

// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error Handler
app.use(errorHandler);

// Start Server
httpServer.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`🌐 Environment: ${config.NODE_ENV}`);
});