const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

// Send a friend request
const sendFriendRequest = async (req, res) => {
    const { recipientUsername } = req.body;

    try {
        const sender = await User.findById(req.user.id); // Logged-in user
        const recipient = await User.findOne({ username: recipientUsername });

        if (!recipient) {
            return res.status(404).json({ error: "Recipient not found" });
        }

        if (sender.username === recipient.username) {
            return res.status(400).json({ error: "You cannot send a friend request to yourself" });
        }

        // Check if a request already exists (in either direction)
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: sender.username, recipient: recipient.username, status: 'pending' },
                { sender: recipient.username, recipient: sender.username, status: 'pending' },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ error: "Friend request already exists" });
        }

        // Create and save the friend request
        const friendRequest = new FriendRequest({
            sender: sender.username,
            recipient: recipient.username,
        });

        await friendRequest.save();
        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Accept or decline a friend request
const respondToFriendRequest = async (req, res) => {
    const { requestId, status } = req.body; // 'accepted' or 'declined'

    try {
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ error: "Friend request not found" });
        }

        const recipient = await User.findById(req.user.id);

        if (!friendRequest.recipient.equals(recipient.username)) {
            return res.status(403).json({ error: "You are not authorized to respond to this request" });
        }

        if (status !== 'accepted' && status !== 'declined') {
            return res.status(400).json({ error: "Invalid status" });
        }

        // Update friends list if accepted
        if (status === 'accepted') {
            const sender = await User.findOne({ username: friendRequest.sender });
            recipient.friends.push(sender.username);
            sender.friends.push(recipient.username);
            await recipient.save();
            await sender.save();
        }

        // Update the request status
        friendRequest.status = status;
        await friendRequest.save();

        res.status(200).json({ message: `Friend request ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get all friend requests for a user
const getFriendRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get incoming requests (where the user is the recipient)
        const incomingRequests = await FriendRequest.find({
            recipient: user.username,
            status: 'pending',
        }).populate('sender', 'username name');

        // Get outgoing requests (where the user is the sender)
        const outgoingRequests = await FriendRequest.find({
            sender: user.username,
            status: 'pending',
        }).populate('recipient', 'username name');

        res.status(200).json({
            incoming: incomingRequests,
            outgoing: outgoingRequests,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    sendFriendRequest,
    respondToFriendRequest,
    getFriendRequests,
};
