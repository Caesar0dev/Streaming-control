const Game = require('./models/Game');
const User = require('./models/User');
const { notifyClients } = require('./index'); // Importing the notifyClients function

const startGame = async (req, res) => {
    const { userId } = req.body; // Assuming userId is passed to start the game
    const game = new Game({ active: true, userId });
    await game.save();
    notifyClients({ type: 'gameStarted', gameId: game._id, userId });
    res.json({ message: 'Game started', gameId: game._id });
};

const checkCard = async (req, res) => {
    const { gameId, card } = req.body;
    try {
        const game = await Game.findById(gameId);
        if (!game || !game.active) return res.status(400).send('No active game');

        game.dealerCard = card;
        await game.save();
        notifyClients({ type: 'cardChecked', gameId, card });
        res.json({ message: 'Card checked', card: game.dealerCard });
    } catch (error) {
        res.status(500).json({ message: 'Error checking card', error });
    }
};

const cancelGame = async (req, res) => {
    const { gameId, userId } = req.body;
    try {
        const game = await Game.findById(gameId);
        if (game && game.active) {
            const user = await User.findOne({ userId });
            if (!user) return res.status(404).send('User not found');

            const refundAmount = 100; // example
            user.balance += refundAmount;
            await user.save();

            game.active = false;
            await game.save();
            notifyClients({ type: 'gameCancelled', gameId, userId });
            res.json({ message: 'Game cancelled', newBalance: user.balance });
        } else {
            res.status(400).send('No active game to cancel');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling game', error });
    }
};

module.exports = { startGame, checkCard, cancelGame };