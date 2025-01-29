const express = require('express');
const {
    sendFriendRequest,
    respondToFriendRequest,
    getFriendRequests,
    getAllFriends,
} = require('../controllers/friendController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Send a friend request
router.post('/send', authenticateUser, sendFriendRequest);

// Accept or decline a friend request
router.put('/respond', authenticateUser, respondToFriendRequest);

// Get all friend requests for a user
router.get('/checkreq', authenticateUser, getFriendRequests);

// Get friends of the logged-in user
router.get('/allfriends', authenticateUser, getAllFriends);

module.exports = router;
