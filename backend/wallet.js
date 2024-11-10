const User = require('./models/User');

const createOrUpdateWallet = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
        let user = await User.findOne({ userId });
        if (!user) {
            user = new User({ userId, balance: amount });
        } else {
            user.balance += amount; // Add or deduct
        }
        await user.save();
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error updating wallet', error });
    }
};

module.exports = { createOrUpdateWallet };