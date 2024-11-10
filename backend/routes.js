const express = require('express');
const { createOrUpdateWallet } = require('./wallet');
const { startGame, checkCard, cancelGame } = require('./game');

const router = express.Router();

// Create or update user wallet
router.post('/wallet/:userId', createOrUpdateWallet);

// Game routes
router.post('/startGame', startGame); // Note: Ensure userId is sent in the body
router.post('/checkCard', checkCard); // Ensure gameId and card are sent in the body
router.post('/cancelGame', cancelGame); // Ensure gameId and userId are sent in the body

module.exports = router;