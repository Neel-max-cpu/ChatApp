const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate random username
        const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const username = `${name.slice(0, 4).toLowerCase()}#${randomDigits}`;

        const newUser = new User({ name, email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const forgotPassword = async (req, res) => {
    const { email, username, newPassword, confirmPassword } = req.body;

    try {
        // Check if all fields are provided
        if (!email || !username || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Ensure the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Find the user by email and username
        const user = await User.findOne({ email, username });
        if (!user) {
            return res.status(404).json({ error: 'User not found with this email and username' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();

        // Return success message
        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signup, login, forgotPassword };
