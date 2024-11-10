const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const routes = require('./routes');
const { connectToDatabase } = require('./database');

const app = express();
const port = 3000;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(bodyParser.json());
app.use('/api', routes);

// Create a WebSocket server
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Here you can handle messages from clients if needed
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to broadcast messages to all clients
const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

// Example of broadcasting a message (call this when needed)
const notifyClients = (message) => {
    broadcast({ type: 'notification', message });
};

module.exports = { app, wss, notifyClients };