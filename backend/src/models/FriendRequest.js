const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
    sender: { type: String, required: true }, // Store username
    recipient: { type: String, required: true }, // Store username
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
