const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
        case 'notification':
            console.log('Notification:', message.message);
            break;
        case 'gameStarted':
            console.log('Game started:', message.gameId);
            break;
        case 'cardChecked':
            console.log('Card checked:', message.card);
            break;
        case 'gameCancelled':
            console.log('Game cancelled:', message.gameId);
            break;
        default:
            console.log('Unknown message type:', message);
    }
};

socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

// Existing functions (startGame, checkCard, cancelGame) remain unchanged