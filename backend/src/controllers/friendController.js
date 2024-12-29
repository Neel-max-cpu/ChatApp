const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

// Send a friend request
const sendFriendRequest = async (req, res) => {
    const { recipientUsername } = req.body;

    try {
        const sender = await User.findById(req.user.id); // Get the logged-in user
        const recipient = await User.findOne({ username: recipientUsername });

        if (!recipient) {
            return res.status(404).json({ error: "Recipient not found" });
        }

        if (sender._id.equals(recipient._id)) {
            return res.status(400).json({ error: "You cannot send a friend request to yourself" });
        }

        const existingRequest = await FriendRequest.findOne({
            sender: sender._id,
            recipient: recipient._id,
            status: 'pending',
        });

        if (existingRequest) {
            return res.status(400).json({ error: "Friend request already sent" });
        }

        const friendRequest = new FriendRequest({
            sender: sender._id,
            recipient: recipient._id,
        });

        await friendRequest.save();
        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Accept or decline a friend request
const   respondToFriendRequest = async (req, res) => {
    const { requestId, status } = req.body; // status can be 'accepted' or 'declined'

    try {
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ error: "Friend request not found" });
        }

        const recipient = await User.findById(req.user.id); // The logged-in user
        const sender = await User.findById(friendRequest.sender); // The user who sent the request

        // Ensure the logged-in user is the recipient of the friend request
        if (!friendRequest.recipient.equals(recipient._id)) {
            return res.status(403).json({ error: "You are not authorized to respond to this request" });
        }

        // Ensure the status is either 'accepted' or 'declined'
        if (status !== 'accepted' && status !== 'declined') {
            return res.status(400).json({ error: "Invalid status" });
        }

        if (status === 'accepted') {
            recipient.friends.push(sender._id);
            sender.friends.push(recipient._id);

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
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const friendRequests = await FriendRequest.find({
            recipient: user._id,
            status: 'pending',
        }).populate('sender', 'username name');

        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendFriendRequest,
    respondToFriendRequest,
    getFriendRequests,
};
