const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    active: { type: Boolean, default: false },
    dealerCard: { type: String, default: null },
    userId: { type: String, required: true }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;