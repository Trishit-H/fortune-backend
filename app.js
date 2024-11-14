const http = require('node:http');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

// Fortune router
const fortuneRouter = require('./routes/fortune.route');

// Load environment variables
dotenv.config({ path: './config.env' });

// App configuration
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(helmet());
app.use(cors());

// Test route
app.get('/test', (req, res) => {
  res.status(200).send('<h1>This is a test route</h1>');
});

// Router for getting a fortune
app.use('/api/v1/fortune', fortuneRouter);

// Create a server
const server = http.createServer(app);

// Listen to requests
server.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});

// Graceful shutdown of server
process.on('SIGTERM', () => {
  console.log('SIGTEM recieved, shutting down...');
  server.close(() => {
    console.log('Closed remaining connections!');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT recieved, shutting down...');
  server.close(() => {
    console.log('Closed remaining connections!');
    process.exit(0);
  });
});
