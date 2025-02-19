const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, unique: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of friend references
});

module.exports = mongoose.model('User', UserSchema);
