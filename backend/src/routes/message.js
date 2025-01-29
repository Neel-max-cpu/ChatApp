// routes/messages.js

const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');

// Fetch messages between two users
router.get('/:recipientId', authenticateUser, async (req, res) => {
    try {
        const senderId = req.user.id;  // Assuming you use JWT and authenticate the user
        const recipientId = req.params.recipientId;

        const messages = await Message.find({
            $or: [
                { sender: senderId, recipient: recipientId },
                { sender: recipientId, recipient: senderId }
            ]
        }).sort({ timestamp: 1 });  // Sort by timestamp (ascending)

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
